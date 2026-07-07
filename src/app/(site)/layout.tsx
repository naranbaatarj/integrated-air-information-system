import { AirPollutionBanner } from "@/components/layout/air-pollution-banner";
import { Footer, Header } from "@/components/layout/site-chrome";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <AirPollutionBanner />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
