import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";
import { StressDefinition } from "@/components/sections/StressDefinition";
import { EngineTimeline } from "@/components/sections/EngineTimeline";
import { MonthlyPerformance } from "@/components/sections/MonthlyPerformance";
import { BenchmarkComparison } from "@/components/sections/BenchmarkComparison";
import { NAVPerformance } from "@/components/sections/NAVPerformance";
import { StressTest2022 } from "@/components/sections/StressTest2022";
import { Governance } from "@/components/sections/Governance";
import { InvestmentFramework } from "@/components/sections/InvestmentFramework";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-institutional-white flex flex-col">
      <Header />
      <Hero />
      <StressDefinition />
      <EngineTimeline />
      <MonthlyPerformance />
      <BenchmarkComparison />
      <NAVPerformance />
      <StressTest2022 />
      <div style={{ display: "none" }}>
        <Governance />
        <InvestmentFramework />
        <Footer />
      </div>
    </main>
  );
}

