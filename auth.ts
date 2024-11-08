// auth.ts
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

declare module "next-auth" {
  interface Session {
    id: string;
  }

  interface JWT {
    id: string;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      async profile(profile) {
        // Return the user profile
        return {
          id: profile.id.toString(),
          name: profile.name,
          email: profile.email,
          image: profile.avatar_url,
        };
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      async profile(profile) {
        // Return the user profile
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "jsmith@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        try {
          const res = await fetch("http://localhost:8080/users/signin", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message || "Invalid credentials");
          }

          const user = await res.json();

          // Fetch the user ID from your server using the email
          const userResponse = await fetch(
            `http://localhost:8080/users?email=${credentials.email}`
          );
          const userData = await userResponse.json();

          if (userData && userData.id) {
            return {
              id: userData.id, // Set the user ID here
              name: user.nom,
              email: user.email,
              image: user.photoProfil,
            };
          }

          return null;
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/session",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id; // Set the user ID in the token
      }

      // Fetch user ID for GitHub and Google sign-ins
      if (account?.provider) {
        const email = user?.email || token.email; // Get the email from the user or token
        if (email) {
          /*
          const userResponse = await fetch(
            `http://localhost:8080/users?email=${email}`
          );
          const userData = await userResponse.json();
          */
          const userData = { id: "51" }; // Mock user data
          if (userData && userData.id) {
            token.id = userData.id; // Set the user ID from the server
          }
        }
      }

      token.exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 14; // Set expiration to 2 weeks
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string; // Set the user ID in the session
        if (token.exp) {
          session.expires = new Date(token.exp * 1000).toISOString(); // Set session expiration
        }
      }
      return session;
    },
  },
});
