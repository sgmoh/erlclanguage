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
  return (
    <section className="pt-28 pb-20 md:pt-36 md:pb-32 relative z-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-poppins font-bold text-white mb-4 leading-tight">
            A powerful Discord utility bot with <span className="gradient-text">advanced moderation</span> tools
          </h1>
          <p className="text-lg md:text-xl text-light-gray mb-8 max-w-2xl mx-auto">
            Enhance your Discord server with moderation tools, image processing, and more.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button asChild size="xl">
              <a href="https://discord.com/api/oauth2/authorize" target="_blank" rel="noopener noreferrer">
                Add to Discord
              </a>
            </Button>
            <Button asChild variant="outline" size="xl">
              <a href="#commands">View Commands</a>
            </Button>
          </div>
          
          <BotStats 
            serverCount={botStats?.serverCount} 
            userCount={botStats?.userCount} 
            commandCount={botStats?.commandCount}
            isLoading={isLoading}
          />

          {/* Bot Uptime */}
          <div className="mt-8 bg-dark-light rounded-xl p-6 max-w-md mx-auto border border-primary shadow-lg">
            <h2 className="text-lg font-semibold text-white mb-2">Bot Uptime</h2>
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
