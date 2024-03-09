import { Policy } from './policy';

export interface Insurer {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  pesel: string;
  policies?: Policy[];
}
