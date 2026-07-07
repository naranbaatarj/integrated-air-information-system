import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import { PrismaClient } from "../src/generated/prisma/client";

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

  await prisma.airQuality.upsert({
    where: {
      date_location: { date: today, location: "Улаанбаатар" },
    },
    update: {},
    create: {
      date: today,
      location: "Улаанбаатар",
      aqi: 156,
      pm25: 68.5,
      pm10: 112.3,
      temperature: -8,
      humidity: 45,
      status: "UNHEALTHY",
      recommendation:
        "Бүх иргэд гадаа гарахаас зайлсхийж, цонх хаах, агаар шүүгч ашиглахыг зөвлөж байна.",
    },
  });

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

  console.log("Seed completed. Admin login: admin / admin123");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
