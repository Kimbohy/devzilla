import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub,
    Google,
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
        // Call your API endpoint for authentication
        const res = await fetch("https://your-api.com/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });

        const user = await res.json();

        // If the response is successful and contains user data, return the user object
        if (res.ok && user) {
          return user; // Ensure your API returns user data in the expected format
          /*
           * expected format to match with the default format of next-auth
          {
            "user" : {
              "name": "John Doe",
              "email": "johnDoe@gmail.com",
              "image": "https://lh3.googleusercontent.com/a/ACg8ocJukODtRmUsVI1-fTI1oiEfKeoEFlz4_KYQHppMAh_EY8WClw=s96-c"
              },
              "expires":"2024-12-04T08:31:45.110Z"
          }  
           */
        }

        // If authentication fails, return null
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/session", // Use your custom sign-in page
  },
});
