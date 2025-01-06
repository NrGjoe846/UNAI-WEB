import { Layout, Code, Palette, Globe } from "lucide-react";
import { ServiceCard } from "@/components/ServiceCard";

export const ServicesSection = () => {
  return (
    <section id="services" className="py-20 px-4 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 animate-fade-in">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <ServiceCard
            title="Web Design"
            description="Beautiful, responsive websites that capture your brand's essence"
            Icon={Layout}
          />
          <ServiceCard
            title="Development"
            description="Custom web applications built with modern technologies"
            Icon={Code}
          />
          <ServiceCard
            title="Branding"
            description="Cohesive brand identity design that sets you apart"
            Icon={Palette}
          />
          <ServiceCard
            title="SEO"
            description="Optimize your site for better search engine rankings"
            Icon={Globe}
          />
        </div>
      </div>
    </section>
  );
};