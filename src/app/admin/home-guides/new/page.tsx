import { AdminPageLayout } from "@/components/admin/admin-shell";
import { HomeGuideForm } from "../home-guide-form";

export const metadata = { title: "Шинэ заавар нэмэх" };

export default function NewHomeGuidePage() {
  return (
    <AdminPageLayout>
      <h1 className="mb-6 text-2xl font-bold">Шинэ заавар зөвлөгөө нэмэх</h1>
      <HomeGuideForm />
    </AdminPageLayout>
  );
}
