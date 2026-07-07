import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { authConfig } from "@/lib/auth.config";
import type { UserRole } from "@/generated/prisma/client";

declare module "next-auth" {
  interface User {
    role: UserRole;
    username: string;
  }
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: UserRole;
      username: string;
    };
  }
}

const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        username: { label: "Нэвтрэх нэр", type: "text" },
        password: { label: "Нууц үг", type: "password" },
      },
      authorize: async (credentials) => {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const user = await prisma.user.findFirst({
          where: {
            OR: [
              { username: parsed.data.username },
              { email: parsed.data.username },
            ],
            status: "ACTIVE",
          },
        });

        if (!user) return null;

        const valid = await bcrypt.compare(parsed.data.password, user.password);
        if (!valid) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          username: user.username,
        };
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as UserRole;
        session.user.username = token.username as string;
      }
      return session;
    },
  },
});

export function hasPermission(
  role: UserRole,
  action: "manage_users" | "manage_content" | "edit_content" | "manage_settings"
): boolean {
  const permissions: Record<UserRole, string[]> = {
    SUPER_ADMIN: ["manage_users", "manage_content", "edit_content", "manage_settings"],
    ADMIN: ["manage_content", "edit_content"],
    EDITOR: ["edit_content"],
  };
  return permissions[role]?.includes(action) ?? false;
}
