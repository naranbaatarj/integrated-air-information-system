import { prisma } from "@/lib/prisma";
import { ContentStatus } from "@/generated/prisma/client";

export async function getTodayAirQuality(location = "Улаанбаатар") {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return prisma.airQuality.findFirst({
    where: { date: today, location },
    orderBy: { createdAt: "desc" },
  });
}

export async function getLatestNews(limit = 6) {
  return prisma.news.findMany({
    where: { status: ContentStatus.PUBLISHED },
    include: { category: true, createdBy: { select: { name: true } } },
    orderBy: { publishedAt: "desc" },
    take: limit,
  });
}

export async function getPublishedServices() {
  return prisma.service.findMany({
    where: { status: ContentStatus.PUBLISHED },
    orderBy: { sortOrder: "asc" },
  });
}

export async function getPublishedGuidelines(limit?: number) {
  return prisma.guideline.findMany({
    where: { status: ContentStatus.PUBLISHED },
    include: { category: true },
    orderBy: { publishedAt: "desc" },
    take: limit,
  });
}

export async function getPublishedHomeGuides() {
  return prisma.homeGuide.findMany({
    where: { status: ContentStatus.PUBLISHED },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  });
}

export async function getPageContent(slug: string) {
  return prisma.page.findFirst({
    where: { slug, status: ContentStatus.PUBLISHED },
  });
}

export async function getDashboardStats() {
  const [newsCount, guidelineCount, userCount, latestNews, todayAqi, latestContact] =
    await Promise.all([
      prisma.news.count(),
      prisma.guideline.count(),
      prisma.user.count({ where: { status: "ACTIVE" } }),
      prisma.news.findFirst({
        orderBy: { createdAt: "desc" },
        include: { createdBy: { select: { name: true } } },
      }),
      getTodayAirQuality(),
      prisma.contactMessage.findFirst({ orderBy: { createdAt: "desc" } }),
    ]);

  return { newsCount, guidelineCount, userCount, latestNews, todayAqi, latestContact };
}

export async function searchContent(query: string) {
  const q = query.trim();
  if (!q) return { news: [], guidelines: [], openInfos: [], services: [] };

  const contains = { contains: q };

  const [news, guidelines, openInfos, services] = await Promise.all([
    prisma.news.findMany({
      where: {
        status: ContentStatus.PUBLISHED,
        OR: [{ title: contains }, { summary: contains }],
      },
      include: { category: true },
      take: 10,
    }),
    prisma.guideline.findMany({
      where: {
        status: ContentStatus.PUBLISHED,
        OR: [{ title: contains }, { summary: contains }],
      },
      include: { category: true },
      take: 10,
    }),
    prisma.openInfo.findMany({
      where: {
        status: ContentStatus.PUBLISHED,
        OR: [{ title: contains }, { summary: contains }],
      },
      include: { category: true },
      take: 10,
    }),
    prisma.service.findMany({
      where: {
        status: ContentStatus.PUBLISHED,
        OR: [{ title: contains }, { summary: contains }],
      },
      take: 10,
    }),
  ]);

  return { news, guidelines, openInfos, services };
}
