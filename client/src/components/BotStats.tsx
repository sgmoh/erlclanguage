import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface BotStatsProps {
  serverCount?: number;
  userCount?: number;
  commandCount?: number;
  isLoading: boolean;
}

export default function BotStats({ 
  serverCount = 0, 
  userCount = 0, 
  commandCount = 0, 
  isLoading 
}: BotStatsProps) {
  const [counts, setCounts] = useState({
    members: 0,
    messages: 0,
    phrases: 0,
  });

  useEffect(() => {
    if (!isLoading) {
      // Animation for counters
      const duration = 2000; // animation duration in ms
      const stepTime = 50; // update interval in ms
      const steps = duration / stepTime;
      
      let currentStep = 0;
      
      // Using userCount as members, commandCount as phrases, and serverCount * 125 as messages
      const messagesCount = serverCount * 125;
      
      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        
        setCounts({
          members: Math.floor(userCount * progress),
          messages: Math.floor(messagesCount * progress),
          phrases: Math.floor(commandCount * progress),
        });
        
        if (currentStep >= steps) {
          setCounts({
            members: userCount,
            messages: messagesCount,
            phrases: commandCount,
          });
          clearInterval(timer);
        }
      }, stepTime);
      
      return () => clearInterval(timer);
    }
  }, [isLoading, serverCount, userCount, commandCount]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto" id="community">
      <StatCard 
        value={counts.members} 
        label="Community Members" 
        isLoading={isLoading}
      />
      <StatCard 
        value={counts.messages} 
        label="Messages Sent" 
        isLoading={isLoading}
      />
      <StatCard 
        value={counts.phrases} 
        label="Unique Phrases" 
        isLoading={isLoading}
      />
    </div>
  );
}

interface StatCardProps {
  value: number;
  label: string;
  isLoading: boolean;
}

function StatCard({ value, label, isLoading }: StatCardProps) {
  return (
    <div className="relative group">
      {/* Blurred background */}
      <div className="absolute inset-0 bg-primary/5 rounded-full blur-lg group-hover:bg-primary/10 transition-all duration-500"></div>
      
      {/* Main content */}
      <div className="relative p-6 backdrop-blur-sm hover:-translate-y-1 transition duration-300 float-medium">
        {isLoading ? (
          <Skeleton className="h-10 w-20 mb-2 bg-dark-lighter/50" />
        ) : (
          <div className="font-poppins font-bold text-4xl text-white mb-2">
            {value.toLocaleString()}
          </div>
        )}
        <div className="text-light-gray">{label}</div>
      </div>
    </div>
  );
}
