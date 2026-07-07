import { PageHero } from "@/components/layout/site-chrome";
import { getPageContent } from "@/lib/data";

export const metadata = { title: "Бидний тухай" };

type AboutContent = {
  intro: string;
  mission: string;
  goals: string[];
  activities: string[];
};

export default async function AboutPage() {
  const page = await getPageContent("about");
  const content: AboutContent = page?.content
    ? JSON.parse(page.content)
    : {
        intro: "",
        mission: "",
        goals: [],
        activities: [],
      };

  return (
    <>
      <PageHero
        title="Бидний тухай"
        description="Байгууллага, системийн зорилго, үйл ажиллагааны чиглэл"
      />
      <div className="mx-auto max-w-4xl space-y-10 px-4 py-12 sm:px-6">
        <section>
          <h2 className="text-xl font-semibold">Танилцуулга</h2>
          <p className="mt-3 leading-relaxed text-slate-700">{content.intro}</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold">Эрхэм зорилго</h2>
          <p className="mt-3 leading-relaxed text-slate-700">{content.mission}</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold">Зорилт</h2>
          <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
            {content.goals.map((goal) => (
              <li key={goal}>{goal}</li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-semibold">Үйл ажиллагааны чиглэл</h2>
          <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
            {content.activities.map((activity) => (
              <li key={activity}>{activity}</li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
