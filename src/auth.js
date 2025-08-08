import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { SupabaseAdapter } from "@auth/supabase-adapter";

export const { handlers, auth } = NextAuth({
    providers: [
        GitHub({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        Google({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
    ],
    adapter: SupabaseAdapter({
        url: process.env.SUPABASE_URL,
        secret: process.env.SUPABASE_SERVICE_ROLE_KEY,
    }),
    session: {
        strategy: "database", // Store sessions in Supabase
    },
    callbacks: {
        async session({ session, user }) {
            // Pass user data to session
            session.user.id = user.id;
            session.user.email = user.email;
            session.user.name = user.name;
            session.user.image = user.image;
            return session;
        },
        async redirect({ url, baseUrl }) {
            // Redirect to homepage after sign-in
            return baseUrl; // Redirects to "/"
        },
        async signIn({ user, account, profile }) {
            // Optional: Log or process user data
            console.log("signIn callback:", { user, account, profile });
            return true; // Allow sign-in
        },
    },
    pages: {
        signIn: "/", // Custom sign-in page
    },
});