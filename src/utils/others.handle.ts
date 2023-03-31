import { Greetings } from '../enums/greetings.enum';
import { SubStrExt } from '../interfaces/substr.interface';

const DropStrEnd = (str: string): SubStrExt => {
  return {
    phone: str.substring(0, str.length - 5),
    ext: str.substring(str.length - 5),
  };
};

const greetingsSubst = (answer: string, name: string, greeting: Greetings): string => {
  return answer.replace('@welcome', greeting).replace('@name', name);
};
const theTime = (): string => {
  const dbTime = {
    morning: {
      start: 0,
      end: 1159,
    },
    afternoon: {
      start: 1200,
      end: 1859,
    },
    night: {
      start: 1900,
      end: 2359,
    },
  };

  const now = new Date();
  const hourWithMinutes = Number(`${now.getHours()}${now.getMinutes()}`);

  if (hourWithMinutes >= dbTime.morning.start && hourWithMinutes <= dbTime.morning.end) {
    return 'Morning';
  } else if (hourWithMinutes >= dbTime.afternoon.start && hourWithMinutes <= dbTime.afternoon.end) {
    return 'Afternoon';
  }
  return 'Night';
};

export { DropStrEnd, theTime, greetingsSubst };
