export type LoginDto = { email: string; password: string };

export type RegisterDto = { email: string; password: string; name?: string };
export type User = { id: string; email: string; name?: string };

export type LoginResponse = {
  accessToken: string;
  refreshToken?: string;
  user: User;
};

