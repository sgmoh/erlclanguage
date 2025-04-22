import React from "react";
import { Button } from "@/components/ui/button";

export default function CallToAction() {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-r from-dark-light to-dark relative z-10">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-poppins font-bold text-white mb-6">
          Join our Erlc Language community
        </h2>
        <p className="text-light-gray max-w-2xl mx-auto mb-8 text-lg">
          Connect with fellow ERLC players and learn our unique phrases
        </p>
        <Button 
          asChild 
          size="xl" 
          className="animate-bounce-slow"
        >
          <a 
            href="https://discord.com/api/oauth2/authorize" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Join our Discord
          </a>
        </Button>
      </div>
    </section>
  );
}
