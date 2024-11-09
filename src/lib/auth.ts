import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import type { Provider } from "next-auth/providers"
import Google from "next-auth/providers/google"
import { prisma } from "./prisma"
import { PrismaAdapter } from "@auth/prisma-adapter"
import bcrypt from "bcryptjs"

const providers: Provider[] = [
  Credentials({
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials) {
      const existingUser = await prisma.user.findUnique({
        where: {
          email: credentials.email as string,
        }
      });

      const passwordMatches = await bcrypt.compare(credentials.password as string, existingUser?.password as string)

      if (!existingUser || !passwordMatches) {
        throw new Error("Invalid email or password")
      }

      return existingUser

    },
  }),
  GitHub,
  Google
]

export const providerMap = providers
  .map((provider) => {
    if (typeof provider === "function") {
      const providerData = provider()
      return {
        id: providerData.id, name: providerData.name, icon:
          providerData.name === "Google" ? '/icons/google.svg' :
            providerData.name === "GitHub" ? '/icons/github.svg' : null
      }
    } else {
      return { id: provider.id, name: provider.name }
    }
  })
  .filter((provider) => provider.id !== "credentials")

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers,
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/signin",
  },
})

