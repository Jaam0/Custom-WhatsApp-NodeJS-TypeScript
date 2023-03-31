import color, { red } from 'colors';
import * as pkg from 'whatsapp-web.js';
const { Client, LocalAuth, MessageMedia } = pkg;
import { createSpinner } from 'nanospinner';
import qrcode from 'qrcode-terminal';
import { DropStrEnd, theTime } from '../utils/others.handle';
import { SubStrExt } from '../interfaces/substr.interface';
import { createExcel } from '../utils/excel.handle';
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
      Sound();
      const { from, body, notifyName } = msj._data;
      data.from = from;
      data.name = notifyName;
      data.message = body;

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
        Morning: async () => {
          const answer = greetingsSubst(messageAnswer.message, notifyName, Greetings.Morning);
          await cachingAnswer(from, answer, GreetingsRealName.Morning);
          await message(from, answer);
        },
        Afternoon: async () => {
          const answer = greetingsSubst(messageAnswer.message, notifyName, Greetings.Afternoon);
          await cachingAnswer(from, answer, GreetingsRealName.Afternoon);
          await message(from, answer);
        },
        Night: async () => {
          const answer = greetingsSubst(messageAnswer.message, notifyName, Greetings.Night);
          await cachingAnswer(from, answer, GreetingsRealName.Night);
          await message(from, answer);
        },
      };

      if (time in response) {

        //TODO: To check if I already sent the first message to the contact
        const keyFromRedis = await gettingKey(from);

        // If keyFromRedis is true doesn't send the answer again
        if (keyFromRedis) return console.log(keyFromRedis);
        //Working on............
        await response[time]();
      }
    } catch (error) {
      console.log(error);
    }

    await saveOnDB(data);
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

const cachingAnswer = async (from: string, answer: string, status: GreetingsRealName) => {
  const redis = new Redis(from, answer, status);
  await redis.Caching();
};

const gettingKey = async (from: string): Promise<AnswerCachingInterface> => {
  const redis = new Redis(from);
  const res = await redis.GetKey();
  return JSON.parse(res);
};
export { customWhatsApp, message, getBodyMessageFromDB };
