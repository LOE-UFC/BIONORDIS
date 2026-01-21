import { auth } from "@/auth";

export default auth;

export const config = {
  // Esse matcher diz: "Rode o middleware em tudo, MENOS arquivos estáticos e imagens"
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};