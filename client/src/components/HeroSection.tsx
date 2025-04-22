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
          
          {/* Phrases display */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
            {phrases.map((phrase, index) => (
              <div key={index} className="bg-dark-light rounded-lg p-4 border border-primary/30 hover:border-primary transition-all duration-300">
                <p className="text-white font-mono text-lg font-semibold">"{phrase}"</p>
              </div>
            ))}
          </div>
          
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

          {/* Server Online Since */}
          <div className="mt-8 bg-dark-light rounded-xl p-6 max-w-md mx-auto border border-primary shadow-lg">
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
    </section>
  );
}
