import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-dark-light bg-opacity-90 backdrop-blur-sm py-4 shadow-lg">
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-white font-poppins font-bold text-xl md:text-2xl">
            <span className="text-primary">ERLC</span> LANGUAGE BOT
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <a href="#features" className="hidden md:block text-light-gray hover:text-white transition duration-200">
            Features
          </a>
          <a href="#commands" className="hidden md:block text-light-gray hover:text-white transition duration-200">
            Commands
          </a>
          <Button asChild>
            <a href="https://discord.com/api/oauth2/authorize" target="_blank" rel="noopener noreferrer">
              Add to Discord
            </a>
          </Button>
        </div>
      </div>
    </nav>
  );
}
