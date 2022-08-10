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

import withAuth, { NextRequestWithAuth } from "next-auth/middleware";

export default withAuth(
    function middleware(req: NextRequestWithAuth) {
        console.log(req.nextauth.token);
    },
    {
        secret: process.env.NEXTAUTH_SECRET,
        callbacks: {
            authorized: ({ req, token }) => {
                return !!token;
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

export const config = {
    matcher: [
        "/dashboard/:path*"
    ]
}
