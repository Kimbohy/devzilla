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
          type: "email",
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

          // Log the response status and body for debugging
          console.log("Response status:", res.status);
          const data = await res.json();
          console.log("Response data:", data);

          if (!res.ok) {
            throw new Error(data.message || "Invalid credentials");
          }

          // Assuming the response returns user data directly
          if (data && data.id) {
            return {
              id: data.id,
              name: data.nom,
              email: data.email,
              image: data.photoProfil,
            };
          }

          return null;
        } catch (error) {
          console.error("Authentication error:", error);
          throw new Error("An error occurred during authentication.");
        }
      },
    }),
  ],
  pages: {
    signIn: "/session",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }

      token.exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 14; // Set expiration to 2 weeks
      return token;
    },
    async session({ session, token }) {
      try {
        const response = await fetch(
          `http://localhost:8080/users?userEmail=${session?.user?.email}&status=1`
        );
        const data = await response.json();
        // console.log("User data:", data.data);

        session.user.id = data?.data?._id;
      } catch (error) {
        console.error("Failed to fetch user email:", error); // Log error if the request fails
      }

      if (token) {
        // session.user.id = token.id as string; // Set the user ID in the session
        // if (token.exp) {
        //   session.expires = new Date(token.exp * 1000).toISOString(); // Set session expiration
        // }
        // expire on 2025-12-31
      }
      return session;
    },
  },
});
