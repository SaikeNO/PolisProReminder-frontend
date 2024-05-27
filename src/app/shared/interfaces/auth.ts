export interface User {
  firstName: string;
  lastName: string;
  email: string;
  role: 'ADMIN' | 'AGENT' | 'USER';
  superior?: User;
}

export interface Credentials {
  name: string;
  password: string;
}

export interface ResetPassword {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface Token {
  token: string;
}
