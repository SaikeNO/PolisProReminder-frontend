export interface User {
  firstName: string;
  lastName: string;
  email: string;
  role: 'ADMIN' | 'AGENT' | 'USER';
  superior?: User;
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
