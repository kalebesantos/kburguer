import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const secret = process.env.PAINEL_SECRET;
  const pathname = request.nextUrl.pathname;

  // protege qualquer rota que comece com /painel
  if (pathname.startsWith("/painel")) {
    if (!secret || !pathname.includes(secret)) {
      const url = request.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

// 👇 ISSO AQUI É O QUE FALTAVA
export const config = {
  matcher: ["/painel/:path*"],
};
