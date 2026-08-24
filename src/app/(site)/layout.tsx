import { Footer, Header, SiteTopbar } from "@/components/layout/site-chrome";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#main-content"
        className="fixed left-4 top-3 z-[1000] -translate-y-[160%] rounded-[10px] bg-white px-3.5 py-2.5 text-sm font-semibold text-slate-900 shadow-xl focus:translate-y-0"
      >
        Үндсэн агуулга руу шилжих
      </a>
      <SiteTopbar />
      <Header />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}
