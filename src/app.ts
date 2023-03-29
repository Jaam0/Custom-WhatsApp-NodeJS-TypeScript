import 'dotenv/config'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import { customWhatsApp } from './services/whasApp.services';
import { DataBase } from './database/db';

import { Status } from './enums/status.enum';
import { Message } from './models/dbModels/messages.model';
import { MessageInterface } from './interfaces/message.interface';
import { Json } from 'sequelize/types/utils';


const conn = new DataBase();
conn.ProveConexionDB();
customWhatsApp();

// const insert = async () => {
//   const { message, description, status }: MessageInterface = {
//     message: `@welcome *@name*,\n\nDios te bendiga.Espero que estés muy bien. En este momento no te puedo atender, debajo te dejo algunas opciones para saber cuál es el nivel de urgencia que tiene este mensaje.
//           \n*1* - Alta \n*2* - Media \n*3* - Baja
//           \nTrataré de responderte lo más antes posible.
//           \n*Nota*: _Puedes seleccionar el numero (1,2 o 3) o el nombre (Alta, Media o Baja) de la opción_. `,
//     description: 'Este es el mensaje principal que se mostrara cuando me escriban',
//     status: Status.Active,
//   };

//   const res = await Message.create({ message, description, status });
// };


// const show = async () => {
//   const res: any = await Message.findAll();
//   console.log(JSON.stringify(res));
// };

