import { User } from './user';

export interface loginResponse {
  token: string;
  user: User;
}
