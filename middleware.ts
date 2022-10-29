// import withAuth from "next-auth/middleware";

// // More on how NextAuth.js middleware works: https://next-auth.js.org/configuration/nextjs#middleware
// export default withAuth({
//     secret: process.env.NEXTAUTH_SECRET,
//     callbacks: {
//         authorized({ token, req }) {
//             // `/admin` requires admin role
//             if (req.nextUrl.pathname === "/admin") {
//                 return token?.userRole === "admin"
//             }
//             // `/dashboard` only requires the user to be logged in
//             return !!token
//             // return true;
//         },
//     },
// })

// export const config = { matcher: ["/admin", "/dashboard"] }

import { NextResponse } from "next/server";
import { getSession, GetSessionParams } from "next-auth/react";
import { NextURL } from "next/dist/server/web/next-url";
import withAuth, { NextRequestWithAuth } from "next-auth/middleware";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./pages/api/auth/[...nextauth]";

export default withAuth(
    async function middleware(req: NextRequestWithAuth) {
        return NextResponse.next();
        // if (session)
        // {
        //     console.log("SUCCESS");

        //     return NextResponse.next();
        // } else {
        //     const signInPage = "/api/auth/signin";
        //     const signInURL = new NextURL(signInPage, req.nextUrl.origin);
        //     signInURL.searchParams.append("callbackUrl", req.url);
        //     return NextResponse.rewrite(signInURL);
        // }
    },
    {
        secret: process.env.NEXTAUTH_SECRET,
        callbacks: {
            authorized: ({ req, token }) => {
                // console.log(req);
                // console.log(token);
                // return !!token;
                return true;
            }
        }
    }
)
//     request: NextRequest) {
//     if (request.nextUrl.pathname.startsWith('/dashboard')) {
//         console.log(request);
//         return NextResponse.redirect(new URL("/", request.url));
//     }
// }

// export const config = {
//     matcher: [
//         "/dashboard/:path*"
//     ]
// }
