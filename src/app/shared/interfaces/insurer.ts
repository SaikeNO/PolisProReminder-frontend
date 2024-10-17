import { Policy } from './policy';

export interface BaseInsurer {
  id: string;
  phoneNumber: string;
  email: string;
  postalCode: string | null;
  city: string | null;
  street: string | null;
  policies: Policy[];
}

export interface IndividualInsurer extends BaseInsurer {
  firstName: string;
  lastName: string | null;
  pesel: string;
}

export interface BusinessInsurer extends BaseInsurer {
  name: string;
  nip: string | null;
  regon: string | null;
}

export interface CreateBaseInsurer {
  phoneNumber: string | null;
  email: string | null;
  postalCode: string | null;
  city: string | null;
  street: string | null;
}

export interface CreateIndividualInsurer extends CreateBaseInsurer {
  pesel: string;
  firstName: string;
  lastName: string | null;
}

export interface CreateBusinessInsurer extends CreateBaseInsurer {
  name: string;
  nip: string | null;
  regon: string | null;
}

export interface InsurerBasicInfo {
  id: string;
  name: string;
}
