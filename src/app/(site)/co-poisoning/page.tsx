import { CoPoisoningPublicSection } from "@/components/co-poisoning/co-poisoning-public-section";

export const metadata = {
  title: "Угаарын хийн хордлого",
  description:
    "Угаарын хийн хордлогын статистик, шалтгаан, байршил болон урьдчилан сэргийлэх зөвлөмж",
};

export default function CoPoisoningPublicPage() {
  return <CoPoisoningPublicSection variant="page" />;
}
