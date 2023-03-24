import { Status } from '../../enums/status.enum';
import { DataTypes } from 'sequelize';
import { Source } from '../../database/db';

const Message = Source.define(
  'message',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    message: {
      type: DataTypes.STRING(1000),
    },
    description: {
      type: DataTypes.STRING(500),
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

Message.sync()
  .then(() => {
    console.log(`Table message was synchronized`);
  })
  .catch((err) => {
    console.error('Something was wrong trying to sync the tabla message', err);
  });

export { Message };
