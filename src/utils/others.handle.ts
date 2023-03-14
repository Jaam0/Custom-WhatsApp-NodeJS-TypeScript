import moment from 'moment'
import { SubStrExt } from 'src/interfaces/substr.interface';
import { CustomTime } from '../models/CustomTime.class';

const DropStrEnd = (str: string): SubStrExt => {
  return {
    phone: str.substring(0, str.length - 5),
    ext: str.substring(str.length - 5),
  };
};
const getTime = (): CustomTime => {
  const customTime = new CustomTime();
  const hora: number = Number(
    `${moment().hour()}${moment().minute()}${moment().second()}${moment().millisecond()}`
  );

  if (hora >= 18000000 && hora <= 235959999) {
    customTime.timeStart = 18000000;
    customTime.timeEnd = 235959999;
    customTime.realTime = hora;
    customTime.status = 'Night';
    customTime.statusTime = 'PM';
  } else if (hora >= 12000000 && hora <= 175959999) {
    customTime.timeStart = 12000000;
    customTime.timeEnd = 175959999;
    customTime.realTime = hora;
    customTime.status = 'Afternoon';
    customTime.statusTime = 'PM';
  } else {
    customTime.timeStart = 100000000;
    customTime.timeEnd = 115959999;
    customTime.realTime = hora;
    customTime.status = 'Morning';
    customTime.statusTime = 'AM';
  }
  return customTime;
};

export { DropStrEnd, getTime };
