import React from "react";

const logFeatures = [
  "Customizable welcome messages",
  "Detailed user information on join",
  "Account age verification",
  "Invite tracking system"
];

const logEntries = [
  { time: "11:42:23", message: "User DiscordUser#1234 joined the server" },
  { time: "11:43:15", message: "Welcome message sent to DiscordUser#1234" },
  { time: "12:31:07", message: "User GamerTag#5678 left the server" },
  { time: "13:24:51", message: "User NewMember#9012 joined using invite code discord.gg/erlc" }
];

export default function JoinLeaveSection() {
  return (
    <section className="py-16 md:py-24 bg-dark relative z-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto bg-dark-light rounded-xl p-8 border border-primary shadow-lg">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0">
              <h2 className="text-2xl md:text-3xl font-poppins font-bold text-white mb-4">Join/Leave Logs</h2>
              <p className="text-light-gray mb-6">
                Keep track of all members joining and leaving your server with customizable notifications and detailed logs.
              </p>
              <ul className="space-y-3">
                {logFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <i className="fas fa-check-circle text-primary mt-1 mr-2"></i>
                    <span className="text-light-gray">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:w-1/2 bg-dark p-4 rounded-lg border border-dark-lighter">
              <div className="font-mono text-sm text-light-gray">
                {logEntries.map((entry, index) => (
                  <div 
                    key={index} 
                    className={`mb-3 pb-3 ${index < logEntries.length - 1 ? 'border-b border-dark-lighter' : ''}`}
                  >
                    <span className="text-primary font-semibold">[{entry.time}]</span> {entry.message.split(/(#\d+)/).map((part, i) => 
                      part.match(/#\d+/) ? <span key={i} className="text-white">{part}</span> : part
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
