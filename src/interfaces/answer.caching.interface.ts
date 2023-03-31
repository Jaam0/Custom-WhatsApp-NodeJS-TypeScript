import { GreetingsRealName } from '../enums/greetings.enum';

export interface AnswerCachingInterface {
  to: string;
  answer: string;
  status: GreetingsRealName;
}
