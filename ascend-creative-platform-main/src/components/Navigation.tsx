import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="fixed w-full bg-background/80 backdrop-blur-lg z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Ascend
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#services" className="text-gray-300 hover:text-primary transition-colors">Services</a>
            <a href="#about" className="text-gray-300 hover:text-primary transition-colors">About</a>
            <a href="#portfolio" className="text-gray-300 hover:text-primary transition-colors">Portfolio</a>
            <a href="#contact" className="text-gray-300 hover:text-primary transition-colors">Contact</a>
            <Button className="bg-primary hover:bg-primary-hover text-white">
              Get Started
            </Button>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-300 hover:text-primary"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-lg border-t border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a
              href="#services"
              className="block px-3 py-2 text-gray-300 hover:text-primary"
              onClick={toggleMenu}
            >
              Services
            </a>
            <a
              href="#about"
              className="block px-3 py-2 text-gray-300 hover:text-primary"
              onClick={toggleMenu}
            >
              About
            </a>
            <a
              href="#portfolio"
              className="block px-3 py-2 text-gray-300 hover:text-primary"
              onClick={toggleMenu}
            >
              Portfolio
            </a>
            <a
              href="#contact"
              className="block px-3 py-2 text-gray-300 hover:text-primary"
              onClick={toggleMenu}
            >
              Contact
            </a>
            <div className="px-3 py-2">
              <Button className="w-full bg-primary hover:bg-primary-hover text-white">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};