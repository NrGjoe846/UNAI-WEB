import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  Icon: LucideIcon;
}

export const ServiceCard = ({ title, description, Icon }: ServiceCardProps) => {
  return (
    <div className="group bg-card p-6 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(155,135,245,0.15)]">
      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
        <Icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
      </div>
      <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};