import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import { supabaseServer } from "@/lib/supabase-server"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          // Check user in database
          const { data: user, error } = await supabaseServer
            .from("users")
            .select("*")
            .eq("email", credentials.email)
            .single()

          if (error || !user) {
            return null
          }

          // In production, you'd verify the password hash
          // For demo purposes, we'll use simple validation
          const validCredentials = [
            { email: "john.doe@company.com", password: "demo123", role: "employee" },
            { email: "jane.smith@company.com", password: "demo123", role: "employee" },
            { email: "admin@company.com", password: "admin123", role: "admin" },
          ]

          const validUser = validCredentials.find(
            (cred) => cred.email === credentials.email && cred.password === credentials.password,
          )

          if (validUser) {
            return {
              id: user.id,
              email: user.email,
              name: user.name,
              role: user.role,
              department: user.department,
            }
          }

          return null
        } catch (error) {
          console.error("Auth error:", error)
          return null
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.department = user.department
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!
        session.user.role = token.role as string
        session.user.department = token.department as string
      }
      return session
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }
