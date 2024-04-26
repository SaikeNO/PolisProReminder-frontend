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

export interface CreateInsurer {
  firstName: string;
  lastName?: string;
  pesel: string;
  phoneNumber?: string;
  email?: string;
}
