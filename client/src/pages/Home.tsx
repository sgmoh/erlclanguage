import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import BackgroundAnimation from "@/components/SnowAnimation";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import CommandsSection from "@/components/CommandsSection";
import CommunityPhrasesSection from "@/components/JoinLeaveSection";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";
import { BotStats } from "@shared/schema";

export default function Home() {
  const { data: botStats, isLoading } = useQuery<BotStats>({
    queryKey: ["/api/bot-stats"],
  });

  return (
    <div className="min-h-screen bg-dark text-light-gray font-inter relative overflow-x-hidden">
      <BackgroundAnimation />
      <Navbar />
      <HeroSection botStats={botStats} isLoading={isLoading} />
      <CommunityPhrasesSection />
      <CommandsSection />
      <CallToAction />
      <Footer />
    </div>
  );
}
