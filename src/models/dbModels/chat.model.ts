import { Status } from '../../enums/status.enum';
import { DataTypes } from 'sequelize';
import { DataBase } from '../../database/db';

const DB = new DataBase();

const Chat = DB.Source().define(
  'chat',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    from: {
      type: DataTypes.STRING(20),
    },
    name: {
      type: DataTypes.STRING(60),
    },
    message: {
      type: DataTypes.STRING(1000),
    },
    status: {
      type: DataTypes.STRING(7),
      defaultValue: Status.Active,
    },
  },
  {
    timestamps: true,
  }
);

Chat.sync()
  .then(() => {
    console.log(`Table message was synchronized`);
  })
  .catch((err) => {
    console.error('Something was wrong trying to sync the tabla message', err);
  });

export { Chat };
