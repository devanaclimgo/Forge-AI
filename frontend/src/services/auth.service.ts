import { request } from "../lib/http";

export const authService = {
  login: (email: string, password: string) =>
    request<{
      token: string;
      user: {
        id: number;
        name: string;
        email: string;
      };
    }>("/login", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
    }),

  register: (
    name: string,
    email: string,
    password: string,
  ) =>
    request<{
      token: string;
      user: {
        id: number;
        name: string;
        email: string;
      };
    }>("/register", {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    }),
};