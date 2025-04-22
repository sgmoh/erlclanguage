import React from "react";

const communityPhrases = [
  { phrase: "dis bad", meaning: "This is not good or I don't like this situation" },
  { phrase: "ima cry", meaning: "I'm disappointed or upset about something" },
  { phrase: "crime when", meaning: "When is the next criminal activity happening in ERLC?" },
  { phrase: "to medal", meaning: "To achieve recognition or receive an award" },
  { phrase: "aired", meaning: "Ignored or dismissed by someone" }
];

const communityMessages = [
  { user: "stermix", message: "omg this guy cant crime ima cry" },
  { user: "itsgalaxy_x", message: "dis bad, nah ima pass out fr?" },
  { user: "stermix", message: "crime when? yes aired to medal ez son" },
  { user: "itsgalaxy_x", message: "ima coma one star main" },
  { user: "stermix", message: "that dude just aired me completely, dis bad" }
];

export default function CommunityPhrasesSection() {
  return (
    <section className="py-16 md:py-24 bg-dark relative z-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto relative">
          {/* Background blurred gradient */}
          <div className="absolute -inset-10 bg-gradient-to-tr from-primary/5 to-primary/10 blur-3xl rounded-full opacity-70"></div>
          
          <div className="relative p-8 backdrop-blur-sm">
            <div className="text-center mb-12 relative">
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>
              <h2 className="text-2xl md:text-3xl font-poppins font-bold text-white mb-3 relative">Community Language Guide</h2>
              <p className="text-light-gray relative">
                Our community has developed its own unique way of communicating. Here's how to speak like a true Erlc Language member.
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row items-start gap-6 relative">
              {/* Phrases Dictionary */}
              <div className="md:w-1/2 relative float-slow">
                <h3 className="text-xl font-semibold text-white mb-6 text-center">Phrases Dictionary</h3>
                <ul className="space-y-5">
                  {communityPhrases.map((item, index) => (
                    <li 
                      key={index} 
                      className="relative p-4 overflow-hidden group"
                      style={{ 
                        animation: `float ${2 + index * 0.2}s ease-in-out infinite alternate`
                      }}
                    >
                      <div className="absolute inset-0 bg-dark-light/30 rounded-2xl blur-sm"></div>
                      <div className="absolute inset-0 border border-primary/20 rounded-2xl group-hover:border-primary/60 transition-all duration-300"></div>
                      <div className="relative">
                        <span className="text-primary font-mono font-bold block mb-2 text-lg">"{item.phrase}"</span>
                        <span className="text-light-gray text-sm">{item.meaning}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Phrases In Action */}
              <div className="md:w-1/2 relative float-medium">
                <h3 className="text-xl font-semibold text-white mb-6 text-center">Phrases In Action</h3>
                <div className="relative">
                  <div className="absolute inset-0 bg-dark-light/10 rounded-2xl blur-lg"></div>
                  <div className="relative backdrop-blur-sm p-5 rounded-2xl">
                    <div className="font-mono text-sm text-light-gray space-y-4">
                      {communityMessages.map((entry, index) => (
                        <div 
                          key={index} 
                          className="relative hover:-translate-y-1 transition-transform duration-300"
                        >
                          <span className="text-primary font-semibold">[{entry.user}]:</span> {entry.message.split(/(dis bad|ima cry|crime when|to medal|aired)/).map((part, i) => 
                            part.match(/(dis bad|ima cry|crime when|to medal|aired)/) ? 
                              <span key={i} className="text-white font-bold">{part}</span> : part
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
