import { PageHero } from "@/components/layout/site-chrome";
import { getPublishedServices } from "@/lib/data";

export const metadata = { title: "Үйлчилгээ" };

export default async function ServicesPage() {
  const services = await getPublishedServices();

  return (
    <>
      <PageHero
        title="Үйлчилгээ"
        description="Утаанаас хамгаалах, урьдчилан сэргийлэхтэй холбоотой үйлчилгээний мэдээлэл"
      />
      <div className="mx-auto max-w-5xl space-y-8 px-4 py-12 sm:px-6">
        {services.map((service) => (
          <article
            key={service.id}
            id={service.slug}
            className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <h2 className="text-xl font-semibold text-slate-900">{service.title}</h2>
            <p className="mt-2 text-slate-600">{service.summary}</p>
            <div
              className="prose-content mt-4"
              dangerouslySetInnerHTML={{ __html: service.content }}
            />
          </article>
        ))}
      </div>
    </>
  );
}
