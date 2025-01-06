import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { ServicesSection } from "@/components/ServicesSection";
import { PortfolioSection } from "@/components/PortfolioSection";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

const Index = () => {
  const { toast } = useToast();

  const handleContact = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 scroll-smooth">
      <Navigation />
      <HeroSection />
      <ServicesSection />
      <PortfolioSection />
      
      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">About Ascend Web Studio</h2>
            <p className="text-gray-600 mb-8">
              We're passionate about creating exceptional digital experiences that help businesses thrive online. 
              Our team combines creativity with technical expertise to deliver websites that not only look great 
              but also perform excellently.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Get In Touch</h2>
          <form onSubmit={handleContact} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                rows={4}
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary-hover text-white"
            >
              Send Message
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Index;