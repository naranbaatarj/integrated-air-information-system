import { ContactPageShell } from "./contact-form";
import { getPageContent } from "@/lib/data";

export const metadata = { title: "Холбоо барих" };

export default async function ContactPage() {
  const page = await getPageContent("contact");
  const contactInfo = page?.content
    ? JSON.parse(page.content)
    : {
        organization: "Агаарын чанар, утаанаас сэргийлэх төв",
        address: "Улаанбаатар хот",
        phone: "+976 7011-1234",
        email: "info@agaar.mn",
        hours: "Даваа–Баасан: 09:00–18:00",
        mapUrl: "https://maps.google.com/?q=Ulaanbaatar",
      };

  return <ContactPageShell contactInfo={contactInfo} />;
}
