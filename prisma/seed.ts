import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import { PrismaClient } from "../src/generated/prisma/client";
import { DEFAULT_CO_POISONING_OPTIONS } from "../src/lib/co-poisoning-options";

const adapter = new PrismaLibSql({
  url: process.env.DATABASE_URL ?? "file:./dev.db",
});
const prisma = new PrismaClient({ adapter });

async function main() {
  const password = await bcrypt.hash("admin123", 12);

  const superAdmin = await prisma.user.upsert({
    where: { email: "admin@agaar.mn" },
    update: {},
    create: {
      name: "Системийн админ",
      email: "admin@agaar.mn",
      username: "admin",
      password,
      role: "SUPER_ADMIN",
      status: "ACTIVE",
    },
  });

  const categories = [
    { name: "Утааны сэрэмжлүүлэг", slug: "utaa-seremzhluuleg", type: "NEWS" as const },
    { name: "Эрүүл мэндийн зөвлөгөө", slug: "eruul-mendiin-zovlogoo", type: "NEWS" as const },
    { name: "Агаарын чанар", slug: "agaariin-chanar", type: "NEWS" as const },
    { name: "Гэрийн нөхцөлд авах арга хэмжээ", slug: "geriin-nuhtsol", type: "GUIDELINE" as const },
    { name: "Хүүхдийг утаанаас хамгаалах", slug: "huuhed-hamgaalah", type: "GUIDELINE" as const },
    { name: "Тайлан", slug: "tailan", type: "OPEN_INFO" as const },
    { name: "Судалгаа", slug: "sudalgaa", type: "OPEN_INFO" as const },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }

  const newsCategory = await prisma.category.findFirst({
    where: { slug: "agaariin-chanar" },
  });

  await prisma.news.upsert({
    where: { slug: "agaariin-chanar-shinechlelt" },
    update: {},
    create: {
      title: "Улаанбаатар хотын агаарын чанарын мэдээлэл шинэчлэгдлээ",
      slug: "agaariin-chanar-shinechlelt",
      summary:
        "Өнөөдрийн агаарын чанарын индексийн мэдээлэл иргэдэд нээлттэй боллоо.",
      content:
        "<p>Улаанбаатар хотын агаарын чанарын мэдээллийг өдөр бүр шинэчлэн хүргэх систем ашиглалтад орлоо. Иргэд манай вебсайтаар дамжуулан агаарын чанарын индекс, PM2.5, PM10 зэрэг үзүүлэлтүүдийг харах боломжтой.</p>",
      categoryId: newsCategory?.id,
      status: "PUBLISHED",
      publishedAt: new Date(),
      createdById: superAdmin.id,
    },
  });

  const guidelineCategory = await prisma.category.findFirst({
    where: { slug: "geriin-nuhtsol" },
  });

  await prisma.guideline.upsert({
    where: { slug: "geriin-nuhtsol-zovlogoo" },
    update: {},
    create: {
      title: "Гэртээ утаанаас хамгаалах арга хэмжээ",
      slug: "geriin-nuhtsol-zovlogoo",
      summary: "Утааны өндөр үед гэртээ авах энгийн арга хэмжээнүүд.",
      content:
        "<ul><li>Цонх, хаалгыг сайтар хаах</li><li>Агаар шүүгч ашиглах</li><li>Гадаа гарахаас зайлсхийх</li><li>Амны хаалт зөв хэрэглэх</li></ul>",
      categoryId: guidelineCategory?.id,
      status: "PUBLISHED",
      publishedAt: new Date(),
      createdById: superAdmin.id,
    },
  });

  await prisma.service.upsert({
    where: { slug: "agaariin-chanar-medeelel" },
    update: {},
    create: {
      title: "Агаарын чанарын мэдээлэл хүргэх",
      slug: "agaariin-chanar-medeelel",
      summary: "Өдөр бүр агаарын чанарын индексийн мэдээллийг иргэдэд хүргэнэ.",
      content:
        "<p>Манай байгууллага агаарын чанарын мэдээллийг өдөр бүр шинэчлэн, олон нийтэд ойлгомжтой хэлбэрээр хүргэдэг.</p>",
      status: "PUBLISHED",
      sortOrder: 1,
      createdById: superAdmin.id,
    },
  });

  await prisma.service.upsert({
    where: { slug: "irged-zovlogoo" },
    update: {},
    create: {
      title: "Иргэдэд зөвлөгөө өгөх",
      slug: "irged-zovlogoo",
      summary: "Утаанаас хамгаалах, эрүүл мэндээ хамгаалах зөвлөгөө.",
      content:
        "<p>Мэргэжилтнүүдийн зөвлөгөө, гарын авлага, сургалтын мэдээллийг үзүүлнэ.</p>",
      status: "PUBLISHED",
      sortOrder: 2,
      createdById: superAdmin.id,
    },
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const stations = [
    { location: "Улаанбаатар", aqi: 156, pm25: 68.5, pm10: 112.3, offset: 0 },
    { location: "Баянзүрх дүүрэг", aqi: 156, pm25: 68.5, pm10: 112.3, offset: 0 },
    { location: "Сүхбаатар дүүрэг", aqi: 142, pm25: 61.2, pm10: 98.4, offset: -1 },
    { location: "Хан-Уул дүүрэг", aqi: 98, pm25: 34.9, pm10: 72.1, offset: -2 },
    { location: "Сонгинохайрхан", aqi: 188, pm25: 81.4, pm10: 128.6, offset: 1 },
  ];

  for (const station of stations) {
    await prisma.airQuality.upsert({
      where: {
        date_location: { date: today, location: station.location },
      },
      update: {},
      create: {
        date: today,
        location: station.location,
        aqi: station.aqi,
        pm25: station.pm25,
        pm10: station.pm10,
        temperature: -8 + station.offset,
        humidity: 45,
        status:
          station.aqi <= 50
            ? "GOOD"
            : station.aqi <= 100
              ? "MODERATE"
              : station.aqi <= 150
                ? "UNHEALTHY_SENSITIVE"
                : station.aqi <= 200
                  ? "UNHEALTHY"
                  : station.aqi <= 300
                    ? "VERY_UNHEALTHY"
                    : "HAZARDOUS",
        recommendation:
          "Бүх иргэд гадаа гарахаас зайлсхийж, цонх хаах, агаар шүүгч ашиглахыг зөвлөж байна.",
      },
    });
  }

  for (let daysAgo = 1; daysAgo <= 13; daysAgo++) {
    const date = new Date(today);
    date.setDate(date.getDate() - daysAgo);
    const variance = Math.sin(daysAgo * 0.8) * 18;
    const aqi = Math.max(40, Math.min(220, Math.round(156 + variance)));
    await prisma.airQuality.upsert({
      where: {
        date_location: { date, location: "Улаанбаатар" },
      },
      update: {},
      create: {
        date,
        location: "Улаанбаатар",
        aqi,
        pm25: Math.round(aqi * 0.44 * 10) / 10,
        pm10: Math.round(aqi * 0.72 * 10) / 10,
        temperature: -12 + daysAgo,
        humidity: 40 + (daysAgo % 5) * 3,
        status:
          aqi <= 50
            ? "GOOD"
            : aqi <= 100
              ? "MODERATE"
              : aqi <= 150
                ? "UNHEALTHY_SENSITIVE"
                : "UNHEALTHY",
        recommendation:
          "Бүх иргэд гадаа гарахаас зайлсхийж, цонх хаах, агаар шүүгч ашиглахыг зөвлөж байна.",
      },
    });
  }

  // Legacy single-record upsert removed — stations + history above

  await prisma.page.upsert({
    where: { slug: "about" },
    update: {},
    create: {
      title: "Бидний тухай",
      slug: "about",
      content: JSON.stringify({
        intro:
          "Манай байгууллага иргэдэд утаа, агаарын бохирдлоос урьдчилан сэргийлэх мэдээ, зөвлөгөө, үйлчилгээний мэдээллийг нэгдсэн байдлаар хүргэх зорилготой.",
        mission:
          "Иргэд утаа, агаарын бохирдлоос сэргийлэх мэдээллийг нэг дороос авах боломжтой болгох.",
        goals: [
          "Агаарын чанарын мэдээллийг өдөр бүр хүргэх",
          "Утаанаас хамгаалах зөвлөмжийг олон нийтэд түгээх",
          "Нээлттэй, ил тод мэдээлэл хүргэх",
        ],
        activities: [
          "Агаарын чанарын мэдээлэл хүргэх",
          "Иргэдэд зөвлөгөө өгөх",
          "Сургалт, мэдээлэл түгээх",
        ],
      }),
      status: "PUBLISHED",
    },
  });

  await prisma.page.upsert({
    where: { slug: "contact" },
    update: {},
    create: {
      title: "Холбоо барих",
      slug: "contact",
      content: JSON.stringify({
        organization: "Агаарын чанар, утаанаас сэргийлэх төв",
        address: "Улаанбаатар хот, Сүхбаатар дүүрэг",
        phone: "+976 7011-1234",
        email: "info@agaar.mn",
        hours: "Даваа–Баасан: 09:00–18:00",
        mapUrl: "https://maps.google.com/?q=Ulaanbaatar",
      }),
      status: "PUBLISHED",
    },
  });

  const settings = [
    { key: "site_name", value: "Агаар — Утаанаас сэргийлэх систем" },
    { key: "site_description", value: "Утаа, агаарын бохирдлоос урьдчилан сэргийлэх мэдээ, зөвлөгөө" },
    { key: "max_upload_size_mb", value: "10" },
  ];

  for (const setting of settings) {
    await prisma.setting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting,
    });
  }

  const homeGuideCount = await prisma.homeGuide.count();
  if (homeGuideCount === 0) {
    await prisma.homeGuide.createMany({
      data: [
        {
          question: "Агаарын чанарын индексийг хэрхэн унших вэ?",
          content:
            "<p>Агаарын чанарын индекс (AQI) нь агаарын бохирдлын түвшинг 0–500 хүртэлх тоогоор илэрхийлдэг. 0–50 сайн, 51–100 дунд, 101–150 мэдрэмтгий бүлэгт хортой, 151–200 хортой гэж үнэлнэ. Манай нүүр хуудсан дээр өдөр бүрийн AQI-г харах боломжтой.</p>",
          videoUrl: "https://www.youtube.com/watch?v=HhAzfKUTccs",
          linkUrl: "/air-quality",
          linkLabel: "Дэлгэрэнгүй заавар харах",
          sortOrder: 1,
          status: "PUBLISHED",
        },
        {
          question: "Утааны өндөр үед гадаа гарахаас хэрхэн зайлсхийх вэ?",
          content:
            "<p>AQI 150-аас дээш үед гадаа гарахаас зайлсхийж, цонх хаалгыг сайтар хааж, агаар шүүгч ашиглаарай. Зайлшгүй гарах тохиолдолд N95 амны хаалт зөв хэрэглэнэ.</p>",
          sortOrder: 2,
          status: "PUBLISHED",
        },
        {
          question: "Амны хаалтыг зөв хэрэглэх арга",
          content:
            "<p>Амны хаалтыг нүүрний хэмжээнд тааруулж, хамар, амныхаа дээгүүр бүрэн наалдуулна. Хэрэглэхээс өмнө гараа угааж, хаалтыг гэмтэлгүй байлгана.</p>",
          linkUrl: "/guidelines",
          linkLabel: "Дэлгэрэнгүй заавар харах",
          sortOrder: 3,
          status: "PUBLISHED",
        },
        {
          question: "Гэртээ агаар цэвэрлэх арга хэмжээ",
          content:
            "<p>Цонх, хаалгыг сайтар хааж, агаар шүүгч ашиглах, чийгшил ихтэй үед чийгшил арилгагч ашиглах, утаа гардаг зуух, пийшнийг зөв ашиглах зэрэг арга хэмжээ авна.</p>",
          sortOrder: 4,
          status: "PUBLISHED",
        },
        {
          question: "Хүүхэд, өндөр настан утаанаас хэрхэн хамгаалах вэ?",
          content:
            "<p>Хүүхэд, өндөр настан, жирэмсэн эхчүүд утаанд илүү мэдрэмтгий байдаг тул AQI өндөр үед гадаа гарахаас зайлсхийж, гэртээ агаар цэвэрлэгч ашиглаж, эмчийн зөвлөгөөг дагана.</p>",
          sortOrder: 5,
          status: "PUBLISHED",
        },
      ],
    });
  }

  const optionCount = await prisma.coPoisoningOption.count();
  if (optionCount === 0) {
    await prisma.coPoisoningOption.createMany({
      data: DEFAULT_CO_POISONING_OPTIONS.map((o) => ({
        category: o.category,
        label: o.label,
        code: o.code ?? null,
        sortOrder: o.sortOrder,
        status: "ACTIVE" as const,
      })),
    });
  }

  console.log("Seed completed. Admin login: admin / admin123");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
