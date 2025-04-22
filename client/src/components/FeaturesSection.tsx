import React from "react";

interface Feature {
  icon: string;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: "fa-comments",
    title: "Unique Language",
    description: "Experience our community's distinctive phrases like 'dis bad', 'ima cry', and 'crime when'."
  },
  {
    icon: "fa-gamepad",
    title: "ERLC Gaming",
    description: "Join fellow Emergency Response: Liberty County players and share your gaming experiences."
  },
  {
    icon: "fa-users",
    title: "Active Community",
    description: "Connect with members who share your interests and make new friends in our active server."
  },
  {
    icon: "fa-calendar",
    title: "Regular Events",
    description: "Participate in community events, game nights, and special themed discussions."
  },
  {
    icon: "fa-hands-helping",
    title: "Helpful Resources",
    description: "Access guides, tips, and strategies for ERLC and other games shared by community members."
  },
  {
    icon: "fa-robot",
    title: "Custom Bot",
    description: "Our server has a dedicated bot for language detection, moderation, and community management."
  }
];

export default function FeaturesSection() {
  return (
    <section className="py-16 md:py-24 bg-dark relative z-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold text-white mb-4">Community Highlights</h2>
          <p className="text-light-gray max-w-2xl mx-auto">Discover what makes the ERLC LANGUAGE community special</p>
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
