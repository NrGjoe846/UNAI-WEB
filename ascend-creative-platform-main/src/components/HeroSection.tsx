import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="min-h-screen bg-background bg-hero-pattern bg-cover bg-center bg-fixed relative">
      <div className="absolute inset-0 bg-gradient-radial from-background/50 to-background/90" />
      
      <div className="max-w-7xl mx-auto px-4 pt-32 pb-20 relative">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground animate-fade-up">
            Delivering IT solutions that
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"> evolve your future products.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 mb-8 animate-fade-up [animation-delay:200ms]">
            Custom websites designed to grow your business and engage your audience with modern technology
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up [animation-delay:400ms]">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary-hover text-white group relative overflow-hidden px-8 py-6
                         transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(155,135,245,0.5)]"
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:bg-primary/10 px-8 py-6"
            >
              Learn More
            </Button>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center animate-fade-up [animation-delay:600ms]">
          {[
            { number: "500+", label: "Projects Completed" },
            { number: "100%", label: "Client Satisfaction" },
            { number: "24/7", label: "Support Available" },
            { number: "50+", label: "Expert Team" },
          ].map((stat, index) => (
            <div key={index} className="p-6 rounded-lg bg-card/50 backdrop-blur-sm">
              <h3 className="text-3xl font-bold text-primary mb-2">{stat.number}</h3>
              <p className="text-gray-300">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};