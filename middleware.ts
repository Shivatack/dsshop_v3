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
import withAuth from "next-auth/middleware";

export default withAuth(
    async function middleware() {
        return NextResponse.next();
    },
    {
        secret: process.env.NEXTAUTH_SECRET,
        callbacks: {
            authorized: ({ token }) => {
                return !!token;
            }
        }
    }
)

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/shipping/:path*",
        "/payment/:path*",
        "/placeorder/:path*"
    ]
}






// export { default } from "next-auth/middleware";

// export const config = { matcher: ["/dashboard/:path*"] };
