import { PageHero, ContentCard } from "@/components/layout/site-chrome";
import { searchContent } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "Хайлт" };

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const results = await searchContent(q);

  const total =
    results.news.length +
    results.guidelines.length +
    results.openInfos.length +
    results.services.length;

  return (
    <>
      <PageHero title="Хайлт" description="Мэдээ, зөвлөгөө, нээлттэй мэдээлэл, үйлчилгээ хайх" />
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <form className="mb-8">
          <div className="flex gap-2">
            <input
              name="q"
              defaultValue={q}
              placeholder="Хайх үгээ оруулна уу..."
              className="flex-1 rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-sky-500"
            />
            <button
              type="submit"
              className="rounded-lg bg-sky-600 px-5 py-2.5 font-medium text-white hover:bg-sky-700"
            >
              Хайх
            </button>
          </div>
        </form>

        {q && (
          <p className="mb-6 text-sm text-slate-600">
            &quot;{q}&quot; хайлтаар {total} үр дүн олдлоо
          </p>
        )}

        <div className="space-y-10">
          {results.news.length > 0 && (
            <Section title="Мэдээ">
              <div className="grid gap-4">
                {results.news.map((item) => (
                  <ContentCard
                    key={item.id}
                    title={item.title}
                    summary={item.summary}
                    href={`/news/${item.slug}`}
                    date={item.publishedAt ? formatDate(item.publishedAt) : undefined}
                    category={item.category?.name}
                  />
                ))}
              </div>
            </Section>
          )}
          {results.guidelines.length > 0 && (
            <Section title="Заавар, зөвлөгөө">
              <div className="grid gap-4">
                {results.guidelines.map((item) => (
                  <ContentCard
                    key={item.id}
                    title={item.title}
                    summary={item.summary}
                    href={`/guidelines/${item.slug}`}
                    date={item.publishedAt ? formatDate(item.publishedAt) : undefined}
                    category={item.category?.name}
                  />
                ))}
              </div>
            </Section>
          )}
          {results.openInfos.length > 0 && (
            <Section title="Нээлттэй мэдээлэл">
              <div className="grid gap-4">
                {results.openInfos.map((item) => (
                  <ContentCard
                    key={item.id}
                    title={item.title}
                    summary={item.summary}
                    href={`/open-info/${item.slug}`}
                    date={item.publishedAt ? formatDate(item.publishedAt) : undefined}
                    category={item.category?.name}
                  />
                ))}
              </div>
            </Section>
          )}
          {results.services.length > 0 && (
            <Section title="Үйлчилгээ">
              <div className="grid gap-4">
                {results.services.map((item) => (
                  <ContentCard
                    key={item.id}
                    title={item.title}
                    summary={item.summary}
                    href={`/services#${item.slug}`}
                  />
                ))}
              </div>
            </Section>
          )}
          {q && total === 0 && (
            <p className="text-center text-slate-600">Хайлтын үр дүн олдсонгүй.</p>
          )}
        </div>
      </div>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold text-slate-900">{title}</h2>
      {children}
    </section>
  );
}
