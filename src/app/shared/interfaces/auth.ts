type UserRole = 'ADMIN' | 'AGENT' | 'USER';

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  roles: UserRole[];
}

export interface Credentials {
  email: string;
  password: string;
}

export interface ChangePassword {
  currentPassword: string;
  newPassword: string;
}

export interface LoginResponse {
  tokenType: string;
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
}
