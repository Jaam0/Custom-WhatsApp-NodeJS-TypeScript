import { Status } from '../enums/status.enum';

export interface MessageInterface {
  id?: number;
  message: string;
  description: string;
  status: Status.Active | Status.Disable;
  createdAt?: string;
  updatedAt?: string;
}
