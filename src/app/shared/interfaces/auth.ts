export type UserRole = 'Admin' | 'Agent' | 'Assistant';

export interface UserInfo {
  firstName: string;
  lastName: string;
}

export interface BaseUser extends UserInfo {
  id: string;
  email: string;
}

export interface User extends BaseUser {
  isEmailConfirmed: boolean;
  isLockedOut: boolean;
  roles: UserRole[];
}

export interface Credentials {
  email: string;
  password: string;
}

export interface ChangeEmail {
  newEmail: string;
}

export interface ChangePassword {
  oldPassword: string;
  newPassword: string;
}

export interface LoginResponse {
  tokenType: string;
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
}
