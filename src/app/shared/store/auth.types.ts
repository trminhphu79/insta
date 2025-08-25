export type LoginDto = { email: string; password: string };

export type RegisterDto = { email: string; password: string; username?: string };
export type User = { id: string; email: string; username?: string };

export type LoginResponse = {
  accessToken: string;
  refreshToken?: string;
  user: User;
};

