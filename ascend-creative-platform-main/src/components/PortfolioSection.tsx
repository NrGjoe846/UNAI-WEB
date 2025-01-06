import { Cake, Smartphone, Computer, Camera, Utensils, Diamond, Car } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const portfolioItems = [
  {
    title: "Sweet Delights Bakery",
    description: "A modern website for a local bakery showcasing their delicious products",
    icon: Cake,
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    link: "https://kzmgtqoxjwgo1nawz9t2.lite.vusercontent.net/"
  },
  {
    title: "Mobile Tech Hub",
    description: "E-commerce platform for mobile services and accessories",
    icon: Smartphone,
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    link: "https://kzmihwyzsxshtjtcky0y.lite.vusercontent.net/"
  },
  {
    title: "TechPro Solutions",
    description: "Computer sales and service website with online booking system",
    icon: Computer,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    link: "https://kzmjedyq47ebog5n7yoj.lite.vusercontent.net/"
  },
  {
    title: "Capture Moments",
    description: "Event planning and photography services showcase",
    icon: Camera,
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    link: "https://kzmol893l5d5xkgnijci.lite.vusercontent.net/"
  },
  {
    title: "Flavor Fusion",
    description: "Restaurant website with online menu and reservation system",
    icon: Utensils,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    link: "https://kzmncyy09vlxmnhxjg53.lite.vusercontent.net/"
  },
  {
    title: "Elegant Gems",
    description: "Luxury jewelry shop with product catalog",
    icon: Diamond,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    link: "https://kzmis30yx2n5q0d9uij2.lite.vusercontent.net/"
  },
  {
    title: "AutoMod Custom",
    description: "Automobile modification and customization services",
    icon: Car,
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
    link: "https://kzmq9apawzj3t980zr73.lite.vusercontent.net/"
  }
];

export const PortfolioSection = () => {
  return (
    <section id="portfolio" className="py-20 px-4 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Our Portfolio</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item, index) => (
            <a 
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              key={index}
              className="group transform transition-all duration-300 hover:scale-105"
            >
              <Card className="h-full overflow-hidden transition-shadow duration-300 hover:shadow-lg">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-lg
                                transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(155,135,245,0.5)]">
                    <item.icon className="w-6 h-6 text-primary transition-colors duration-300 group-hover:text-accent" />
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="transition-colors duration-300 group-hover:text-primary">
                    {item.title}
                  </CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
