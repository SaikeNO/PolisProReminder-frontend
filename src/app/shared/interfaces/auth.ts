type UserRole = 'ADMIN' | 'AGENT' | 'USER';

export interface UserBase {
  firstName: string;
  lastName: string;
}

export interface User extends UserBase {
  id: string;
  email: string;
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
