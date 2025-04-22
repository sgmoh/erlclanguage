import { Button } from "@/components/ui/button";
import BotStats from "@/components/BotStats";
import { formatUptimeString } from "@/lib/utils";
import { BotStats as BotStatsType } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";

interface HeroSectionProps {
  botStats?: BotStatsType;
  isLoading: boolean;
}

export default function HeroSection({ botStats, isLoading }: HeroSectionProps) {
  // ERLC Language community phrases
  const phrases = [
    "dis bad",
    "ima cry",
    "crime when",
    "to medal",
    "aired"
  ];

  return (
    <section className="pt-28 pb-20 md:pt-36 md:pb-32 relative z-10" id="phrases">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-poppins font-bold text-white mb-4 leading-tight">
            <span className="gradient-text">Erlc Language</span>
          </h1>
          <p className="text-lg md:text-xl text-light-gray mb-8 max-w-2xl mx-auto">
            dis bad • ima cry • crime when • to medal • aired
          </p>
          
          {/* Phrases display - more floating style */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            {phrases.map((phrase, index) => (
              <div 
                key={index} 
                className="relative bg-transparent px-5 py-3 transform hover:-translate-y-2 hover:rotate-1 transition-all duration-300"
                style={{
                  animation: `float ${2 + index * 0.5}s ease-in-out infinite alternate`,
                }}
              >
                <span className="absolute inset-0 bg-dark-light opacity-60 rounded-full blur-sm"></span>
                <span className="absolute inset-0 border border-primary/40 rounded-full"></span>
                <p className="relative text-white font-mono text-lg font-semibold">"{phrase}"</p>
              </div>
            ))}
          </div>
          
          {/* Add floating animation keyframes to index.css later */}
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button asChild size="xl">
              <a href="https://discord.com/invitation-link" target="_blank" rel="noopener noreferrer">
                Join Our Community
              </a>
            </Button>
            <Button asChild variant="outline" size="xl">
              <a href="#community">Learn More</a>
            </Button>
          </div>
          
          <BotStats 
            serverCount={botStats?.serverCount} 
            userCount={botStats?.userCount} 
            commandCount={botStats?.commandCount}
            isLoading={isLoading}
          />

          {/* Server Online Since - with floating style */}
          <div className="mt-12 max-w-md mx-auto relative">
            <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl"></div>
            <div className="relative py-6 float-slow">
              <h2 className="text-lg font-semibold text-white mb-2">Server Online Since</h2>
              {isLoading ? (
                <Skeleton className="h-10 w-[250px] mx-auto bg-dark-lighter" />
              ) : (
                <div className="font-poppins text-primary text-2xl font-bold uptime-display">
                  {botStats 
                    ? formatUptimeString(botStats.uptimeDays, botStats.uptimeHours, botStats.uptimeMinutes) 
                    : "Fetching uptime..."}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
