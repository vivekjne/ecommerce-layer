import { createCookieSessionStorage } from "react-router";

type SessionData = {
  userId: string;
  cart: Record<string, number>; // product slug -> quantity
};

type SessionFlash = { message: string };

export const { getSession, commitSession, destroySession } = createCookieSessionStorage<SessionData, SessionFlash>({
  cookie: {
    name: "__nova",
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secrets: ["demo-secret-change-me"],
    secure: false,
  },
});
