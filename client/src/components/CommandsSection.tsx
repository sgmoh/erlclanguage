import React from "react";
import { Button } from "@/components/ui/button";

interface Command {
  name: string;
  title: string;
  description: string;
  usage: string;
}

const commands: Command[] = [
  {
    name: "?kick",
    title: "Kick User",
    description: "Removes a user from the server. They can rejoin with a new invite.",
    usage: "?kick @user [reason]"
  },
  {
    name: "?ban",
    title: "Ban User",
    description: "Permanently removes a user and prevents them from rejoining the server.",
    usage: "?ban @user [reason]"
  },
  {
    name: "?purge",
    title: "Purge Messages",
    description: "Deletes a specified number of messages from the current channel.",
    usage: "?purge [number]"
  },
  {
    name: "?logs",
    title: "Server Logs",
    description: "View and manage server logs including moderation actions and user activities.",
    usage: "?logs [type] [number]"
  }
];

export default function CommandsSection() {
  return (
    <section id="commands" className="py-16 md:py-24 bg-dark-light relative z-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold text-white mb-4">Community Bot</h2>
          <p className="text-light-gray max-w-2xl mx-auto">
            Our server features a custom bot to enhance the community experience
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto bg-dark p-6 rounded-xl border border-primary/40 shadow-lg mb-12">
          <p className="text-light-gray mb-6">
            The ERLC LANGUAGE community includes a custom Discord bot that helps with moderation and community management. 
            Here are some of the most useful commands our bot offers:
          </p>
        
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {commands.map((command, index) => (
              <div 
                key={index} 
                className="bg-dark-light rounded-xl p-5 shadow-lg border border-dark-lighter hover:border-primary transition duration-300 command-card"
              >
                <div className="flex items-start">
                  <div className="text-primary font-mono font-bold text-lg mr-3">{command.name}</div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">{command.title}</h3>
                    <p className="text-light-gray text-sm">{command.description}</p>
                    <div className="mt-2 text-xs text-primary font-mono">Usage: {command.usage}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-light-gray mb-4">Want to see all the available bot commands?</p>
          <Button>
            View All Commands
          </Button>
        </div>
      </div>
    </section>
  );
}
