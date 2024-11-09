import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

const validateUser = async (email: string, password: string) => {
  // Example: Replace this with your actual user validation logic
  const respons = await fetch("https://ta-lenta.onrender.com/users/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const user = await respons.json();

  if (user.success) {
    return user.data;
  }
  return null;
};

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHub,
    Google,
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "your-email@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await validateUser(
          credentials.email as string,
          credentials.password as string
        );
        if (user) {
          return user;
        } else {
          throw new Error("Invalid email or password");
        }
      },
    }),
  ],
  pages: {
    error: "/auth/error", // Error page URL
  },
});
