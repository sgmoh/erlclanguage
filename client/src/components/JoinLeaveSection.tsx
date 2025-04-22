import React from "react";

const communityPhrases = [
  { phrase: "dis bad", meaning: "This is not good or I don't like this situation" },
  { phrase: "ima cry", meaning: "I'm disappointed or upset about something" },
  { phrase: "crime when", meaning: "When is the next criminal activity happening in ERLC?" },
  { phrase: "to medal", meaning: "To achieve recognition or receive an award" },
  { phrase: "aired", meaning: "Ignored or dismissed by someone" }
];

const communityMessages = [
  { user: "ERLCPlayer123", message: "ima cry, they just closed the hospital right as I got there" },
  { user: "Liberty_Cop", message: "dis bad, everybody keeps running through red lights" },
  { user: "GameMaster456", message: "crime when? I'm bored and want some action" },
  { user: "RookieFireman", message: "I got to medal yesterday for saving 10 citizens!" },
  { user: "CoolDriver", message: "I said hi to that new player and got aired completely :(" }
];

export default function CommunityPhrasesSection() {
  return (
    <section className="py-16 md:py-24 bg-dark relative z-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto bg-dark-light rounded-xl p-8 border border-primary shadow-lg">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-poppins font-bold text-white mb-3">Community Language Guide</h2>
            <p className="text-light-gray">
              Our community has developed its own unique way of communicating. Here's how to speak like a true ERLC LANGUAGE member.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row items-start">
            <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0">
              <h3 className="text-xl font-semibold text-white mb-4">Phrases Dictionary</h3>
              <ul className="space-y-4">
                {communityPhrases.map((item, index) => (
                  <li key={index} className="bg-dark p-3 rounded-lg border border-dark-lighter">
                    <span className="text-primary font-mono font-bold block mb-1">"{item.phrase}"</span>
                    <span className="text-light-gray text-sm">{item.meaning}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:w-1/2 bg-dark p-4 rounded-lg border border-dark-lighter">
              <h3 className="text-xl font-semibold text-white mb-4">Phrases In Action</h3>
              <div className="font-mono text-sm text-light-gray">
                {communityMessages.map((entry, index) => (
                  <div 
                    key={index} 
                    className={`mb-3 pb-3 ${index < communityMessages.length - 1 ? 'border-b border-dark-lighter' : ''}`}
                  >
                    <span className="text-primary font-semibold">[{entry.user}]:</span> {entry.message.split(/(dis bad|ima cry|crime when|to medal|aired)/).map((part, i) => 
                      part.match(/(dis bad|ima cry|crime when|to medal|aired)/) ? <span key={i} className="text-white font-bold">{part}</span> : part
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
