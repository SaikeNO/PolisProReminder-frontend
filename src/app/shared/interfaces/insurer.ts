import { Policy } from './policy';

export interface Insurer {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  pesel: string;
  postalCode: string | null;
  city: string | null;
  street: string | null;
  policies?: Policy[];
}

export interface CreateInsurer {
  firstName: string;
  lastName: string | null;
  pesel: string;
  phoneNumber: string | null;
  email: string | null;
  postalCode: string | null;
  city: string | null;
  street: string | null;
}
