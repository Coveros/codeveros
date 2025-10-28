export interface Registration {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface AuthUser {
  _id: string;
  username: string;
}

export interface LoginResponse {
  token: string;
  user: AuthUser;
}
