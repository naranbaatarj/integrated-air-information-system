import { prisma } from "@/lib/prisma";

export async function logActivity(params: {
  userId: string;
  action: string;
  entity: string;
  entityId?: string;
  details?: string;
  ipAddress?: string;
}) {
  await prisma.activityLog.create({ data: params });
}
