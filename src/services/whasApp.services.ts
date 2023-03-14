import color from 'colors';
import * as pkg from 'whatsapp-web.js';
const { Client, LocalAuth, MessageMedia } = pkg;
import { createSpinner } from 'nanospinner';
import qrcode from 'qrcode-terminal';
import { DropStrEnd, getTime } from '../utils/others.handle';
import { SubStrExt } from '../interfaces/substr.interface';
import { createExcel } from '../utils/excel.handle';
import { Extensions } from '../enums/extension.enum';

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

const ListenMessage = () => {
  client.on('message', (msj: any) => {
    const { from, body, notifyName } = msj._data;
    console.log(
      `${color.green('From')}:${from}, ${color.green('Name')}:${notifyName}, ${color.green(
        'Message'
      )}:${body}`
    );

    const res: SubStrExt = DropStrEnd(from);
    const { status } = getTime();

    switch (body) {
      case 'Hola':
        message(from, 'Enviando una img');
        sendMedia(from, 'Js.png');
        break;
      case 'Klk':
        message(from, 'Bien gracias a Dios y tu?');
        break;
    }
    createExcel(from, notifyName, body);
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

export { customWhatsApp };
