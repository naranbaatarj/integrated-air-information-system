import { AirQualityLevel } from "@/generated/prisma/client";

export const AQI_LABELS: Record<AirQualityLevel, string> = {
  GOOD: "Сайн",
  MODERATE: "Хэвийн",
  UNHEALTHY_SENSITIVE: "Бага бохирдолтой",
  UNHEALTHY: "Бохирдолтой",
  VERY_UNHEALTHY: "Маш их бохирдолтой",
  HAZARDOUS: "Аюултай",
};

export const AQI_COLORS: Record<
  AirQualityLevel,
  { bg: string; text: string; border: string; ring: string }
> = {
  GOOD: {
    bg: "bg-emerald-500",
    text: "text-emerald-700",
    border: "border-emerald-500",
    ring: "ring-emerald-200",
  },
  MODERATE: {
    bg: "bg-yellow-400",
    text: "text-yellow-800",
    border: "border-yellow-400",
    ring: "ring-yellow-200",
  },
  UNHEALTHY_SENSITIVE: {
    bg: "bg-orange-500",
    text: "text-orange-800",
    border: "border-orange-500",
    ring: "ring-orange-200",
  },
  UNHEALTHY: {
    bg: "bg-red-500",
    text: "text-red-700",
    border: "border-red-500",
    ring: "ring-red-200",
  },
  VERY_UNHEALTHY: {
    bg: "bg-purple-600",
    text: "text-purple-800",
    border: "border-purple-600",
    ring: "ring-purple-200",
  },
  HAZARDOUS: {
    bg: "bg-rose-900",
    text: "text-rose-900",
    border: "border-rose-900",
    ring: "ring-rose-200",
  },
};

export function getAqiLevel(aqi: number): AirQualityLevel {
  if (aqi <= 50) return "GOOD";
  if (aqi <= 100) return "MODERATE";
  if (aqi <= 150) return "UNHEALTHY_SENSITIVE";
  if (aqi <= 200) return "UNHEALTHY";
  if (aqi <= 300) return "VERY_UNHEALTHY";
  return "HAZARDOUS";
}

export function getDefaultRecommendation(level: AirQualityLevel): string {
  const recommendations: Record<AirQualityLevel, string> = {
    GOOD: "Агаарын чанар сайн байна. Гадаа амьдралын идэвхтэй үйл ажиллагаа хийхэд тохиромжтой.",
    MODERATE:
      "Мэдрэмтгий бүлгийн иргэд урт хугацаагаар гадаа байхыг хязгаарлахыг зөвлөж байна.",
    UNHEALTHY_SENSITIVE:
      "Өндөр настан, хүүхэд, амьсгалын замын өвчтэй иргэд гадаа гарахаас зайлсхий.",
    UNHEALTHY:
      "Бүх иргэд гадаа гарахаас зайлсхийж, цонх хаах, агаар шүүгч ашиглахыг зөвлөж байна.",
    VERY_UNHEALTHY:
      "Гадаа гарахыг хатуу хоригло. Гэртээ үлдэж, цонх, хаалгыг хааж, агаар шүүгч ашиглана уу.",
    HAZARDOUS:
      "Яаралтай анхааруулга! Гадаа гарахыг бүрэн хоригло. Эрүүл мэндийн байгууллагад хандаарай.",
  };
  return recommendations[level];
}
