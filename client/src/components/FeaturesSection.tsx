import React from "react";

interface Feature {
  icon: string;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: "fa-shield-alt",
    title: "Advanced Moderation",
    description: "Powerful tools to manage your server with ease including kick, ban, and purge commands."
  },
  {
    icon: "fa-image",
    title: "Image Processing",
    description: "Create and manipulate images directly within Discord with simple commands."
  },
  {
    icon: "fa-history",
    title: "Detailed Logs",
    description: "Keep track of all server activities with comprehensive join/leave and moderation logs."
  },
  {
    icon: "fa-bolt",
    title: "Fast Response",
    description: "High uptime and quick response to all commands for a seamless experience."
  },
  {
    icon: "fa-robot",
    title: "Custom Automations",
    description: "Create automated responses and actions based on specific triggers in your server."
  },
  {
    icon: "fa-users",
    title: "User Management",
    description: "Easily manage roles, permissions, and user activity across your server."
  }
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-16 md:py-24 bg-dark relative z-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold text-white mb-4">Awesome Features</h2>
          <p className="text-light-gray max-w-2xl mx-auto">Discover what makes ERLC LANGUAGE Bot special</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-dark-light rounded-xl p-6 shadow-lg border border-dark-lighter hover:border-primary transition duration-300"
            >
              <div className="text-primary text-3xl mb-4">
                <i className={`fas ${feature.icon}`}></i>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-light-gray">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
