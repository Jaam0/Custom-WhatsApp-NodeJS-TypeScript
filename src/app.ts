import 'dotenv/config'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import { customWhatsApp } from './services/whasApp.services';
import { DataBase } from './database/db';
import { Redis } from './database/redis';

import { Status } from './enums/status.enum';
import { Message } from './models/dbModels/messages.model';
import { MessageInterface } from './interfaces/message.interface';

const conn = new DataBase();
conn.ProveConexionDB();
customWhatsApp();




