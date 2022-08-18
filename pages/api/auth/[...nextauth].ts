import prisma from '../../../lib/prisma';
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
        updateAge: 24 * 60 * 60 // 24 hours
    },
    // Configure one or more authentication providers
    providers: [
        // CredentialsProvider({
        //     id: 'Credentials',
        //     // The name to display on the sign in form (e.g. 'Sign in with...')
        //     name: 'Credentials',
        //     // The credentials is used to generate a suitable form on the sign in page.
        //     // You can specify whatever fields you are expecting to be submitted.
        //     // e.g. domain, username, password, 2FA token, etc.
        //     // You can pass any HTML attribute to the <input> tag through the object.
        //     credentials: {
        //         email: { label: "Email", type: "email", placeholder: "example@sample.com" },
        //         password: {  label: "Password", type: "password" }
        //     },
        //     type: "credentials",
        //     async authorize(credentials, req) {
        //         // You need to provide your own logic here that takes the credentials
        //         // submitted and returns either a object representing a user or value
        //         // that is false/null if the credentials are invalid.
        //         // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        //         // You can also use the `req` object to obtain additional parameters
        //         // (i.e., the request IP address)
        //         console.log(credentials);
        //         const res = await fetch("/your/endpoint", {
        //             method: 'POST',
        //             body: JSON.stringify(credentials),
        //             headers: { "Content-Type": "application/json" }
        //         })
        //         const user = await res.json()

        //         // If no error and we have user data, return it
        //         if (res.ok && user) {
        //             return user
        //         }
        //         // Return null if user data could not be retrieved
        //         return null
        //     }
        // }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        })
        // ...add more providers here
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async signIn({ account, profile }) {
            if (account.provider === "google") {
                return profile.email_verified && profile.email.endsWith("@gmail.com");
            }
            return true;
        },
    }
}

export default NextAuth(authOptions);