import { auth, hasPermission } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { UserRole } from "@/generated/prisma/client";

export async function requireAdmin(action: "manage_users" | "manage_content" | "edit_content") {
  const session = await auth();
  if (!session?.user) {
    return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }

  if (!hasPermission(session.user.role as UserRole, action)) {
    return { error: NextResponse.json({ error: "Forbidden" }, { status: 403 }) };
  }

  return { session };
}
