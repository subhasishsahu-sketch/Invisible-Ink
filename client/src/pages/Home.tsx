import Header from "@/components/Header";
import Hero from "@/components/Hero";
import EncodeSection from "@/components/EncodeSection";
import DecodeSection from "@/components/DecodeSection";
import ProblemsAndSolutions from "@/components/ProblemsAndSolutions";
import UseCases from "@/components/UseCases";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        <Hero />
        <EncodeSection />
        <DecodeSection />
        <ProblemsAndSolutions />
        <UseCases />
      </main>
      <Footer />
    </div>
  );
}
