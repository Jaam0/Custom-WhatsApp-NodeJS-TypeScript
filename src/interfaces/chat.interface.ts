import { Status } from '../enums/status.enum';

export interface ChatInterface {
  id?: number;
  from: string;
  name: string;
  message: string;
  status?: Status.Active | Status.Disable;
}
