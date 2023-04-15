import color, { red } from 'colors';
import * as pkg from 'whatsapp-web.js';
const { Client, LocalAuth, MessageMedia } = pkg;
import { createSpinner } from 'nanospinner';
import qrcode from 'qrcode-terminal';
import { DropStrEnd, theTime } from '../utils/others.handle';
import { SubStrExt } from '../interfaces/substr.interface';
import { Extensions } from '../enums/extension.enum';
import { Sound } from '../utils/sound.handle';
import { ChatInterface } from '../interfaces/chat.interface';
import { Chat } from '../models/dbModels/chat.model';
import { Message } from '../models/dbModels/messages.model';
import { Status } from '../enums/status.enum';
import { MessageInterface } from '../interfaces/message.interface';
import { Greetings, GreetingsRealName } from '../enums/greetings.enum';
import { greetingsSubst } from '../utils/others.handle';
import { Redis } from '../database/redis';
import { AnswerCachingInterface } from '../interfaces/answer.caching.interface';

let client: any;
let ext: string;

const customWhatsApp = async () => {
  client = new Client({
    authStrategy: new LocalAuth({ clientId: 'client-one' }),
  });

  client.on('qr', (qr: string) => {
    qrcode.generate(qr, { small: true });
  });

  const spinner = createSpinner(
    `${color.green('Loading')}... ${color.yellow('Validating session with WhatsApp')}`
  ).start();
  client.on('ready', () => {
    console.log('');
    spinner.stop();
    console.clear();
    console.log('Client is ready!'.green);
    console.log('');
    console.log('Chats:'.bgGreen);
    ListenMessage();
  });
  client.initialize();
};

const ListenMessage = async () => {
  const data: ChatInterface = {
    from: '',
    name: '',
    message: '',
  };
  const messageAnswer: MessageInterface = {
    id: 0,
    message: '',
    description: '',
    status: Status.Active,
    createdAt: '',
    updatedAt: '',
  };
  client.on('message', async (msj: any) => {
    try {
      const { from, body, notifyName } = msj._data;
      data.from = from;
      data.name = notifyName;
      data.message = body;
      ext = DropStrEnd(data.from).ext;

      console.log(
        `${color.green('From')}:${from}, ${color.green('Name')}:${notifyName}, ${color.green(
          'Message'
        )}:${body}`
      );

      await getBodyMessageFromDB().then((data) => {
        messageAnswer.id = data.id;
        messageAnswer.message = data.message;
        messageAnswer.description = data.description;
        messageAnswer.status = data.Status;
        messageAnswer.createdAt = data.createdAt;
        messageAnswer.updatedAt = data.updatedAt;
      });

      const res: SubStrExt = DropStrEnd(from);
      const time = theTime();

      const response = {
        Morning: async (opt?: boolean) => {
          if (opt) {
            const rowKey = await gettingKey(
              from,
              GreetingsRealName.Night,
              GreetingsRealName.Morning
            );
            const answerFromRedis = greetingsSubst(rowKey.answer, notifyName, Greetings.Morning);
            await message(from, answerFromRedis);
          } else {
            const answer = greetingsSubst(messageAnswer.message, notifyName, Greetings.Morning);
            await cachingAnswer(from, messageAnswer.message, GreetingsRealName.Morning);
            await message(from, answer);
          }
        },
        Afternoon: async (opt?: boolean) => {
          if (opt) {
            const rowKey = await gettingKey(
              from,
              GreetingsRealName.Night,
              GreetingsRealName.Afternoon
            );
            const answerFromRedis = greetingsSubst(rowKey.answer, notifyName, Greetings.Afternoon);
            await message(from, answerFromRedis);
          } else {
            const answer = greetingsSubst(messageAnswer.message, notifyName, Greetings.Afternoon);
            await cachingAnswer(from, messageAnswer.message, GreetingsRealName.Afternoon);
            await message(from, answer);
          }
        },
        Night: async (opt?: boolean) => {
          if (opt) {
            const rowKey = await gettingKey(from, GreetingsRealName.Night, GreetingsRealName.Night);
            const answerFromRedis = greetingsSubst(rowKey.answer, notifyName, Greetings.Night);
            await message(from, answerFromRedis);
          } else {
            const answer = greetingsSubst(messageAnswer.message, notifyName, Greetings.Night);
            await cachingAnswer(from, messageAnswer.message, GreetingsRealName.Night);
            await message(from, answer);
          }
        },
      };

      const response2 = {
        1: async () => {
          Sound('youGotmail.wav');
          await message(from, 'En breve te atendemos - Alta');
        },
        Alta: async () => {
          Sound('youGotmail.wav');
          await message(from, 'En breve te atendemos - Alta');
        },
        2: async () => {
          Sound('youGotmail.wav');
          await message(from, 'En unos minutos te atendemos - Media');
        },
        Media: async () => {
          Sound('youGotmail.wav');
          await message(from, 'En unos minutos te atendemos - Media');
        },
        3: async () => {
          Sound('youGotmail.wav');
          await message(from, 'Desde que termine de una tarea te le atiendo - Baja');
        },
        Baja: async () => {
          Sound('youGotmail.wav');
          await message(from, 'Desde que termine de una tarea te le atiendo - Baja');
        },
      };

      if (time in response && ext === Extensions.contact) {
        const keyFromRedis = await gettingKey(from, body, time);

        if (keyFromRedis) {
          if (Object.hasOwn(response2, body)) {
            await saveOnDB(data);
            await response2[body]();
          } else {
            await saveOnDB(data);
            return true;
          }
        } else {
          if (ext === Extensions.contact) {
            await saveOnDB(data);
            await response[time]();
          }
          return false;
        }
      }
    } catch (error) {
      console.log(error);
    }
  });
};

const message = (from: string, body: string) => {
  const { ext } = DropStrEnd(from);

  if (ext === Extensions.contact) {
    client.sendMessage(from, body);
  }
  return false;
};

const sendMedia = (from: string, file: string) => {
  const mediaFile = MessageMedia.fromFilePath(`./media/${file}`);
  client.sendMessage(from, mediaFile);
};

const saveOnDB = async ({
  from,
  name,
  message,
  status = Status.Active,
}: ChatInterface): Promise<void> => {
  try {
    const res = await Chat.create({ from, name, message, status });
  } catch (err) {
    console.log(`Something happened saving on database - Table Chat - Error: ${err}`);
  }
};

const getBodyMessageFromDB = async () => {
  try {
    const res: any = await Message.findOne({ where: { status: Status.Active } });
    return res;
  } catch (err) {
    console.log(`Something happened finding on database - Table Chat - Error: ${err}`);
  }
};

const cachingAnswer = async (from: string, answer: string, status: GreetingsRealName | string) => {
  const redis = new Redis(from, answer, status);
  await redis.Caching();
};

const gettingKey = async (
  from: string | string[],
  answer: string,
  status: GreetingsRealName | string
): Promise<AnswerCachingInterface> => {
  const redis = new Redis(from, answer, status);
  const res = await redis.GetKey();
  return JSON.parse(res);
};
export { customWhatsApp, message, getBodyMessageFromDB };
