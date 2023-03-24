import { Status } from '../enums/status.enum';

export interface MessageInterface {
  message: string;
  description: string;
  status: Status.Active | Status.Disable;
}
