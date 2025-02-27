import React from 'react';
import { BadgeCheck, Cloud, Leaf, Zap } from 'lucide-react';

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const features: Feature[] = [
  {
    title: 'Sustainable',
    description: 'Proprietary fabrics created from renewable materials and responsibly made.',
    icon: <Leaf className="w-12 h-12 text-yellow-500" />
  },
  {
    title: 'Comfort',
    description: 'The primary attribute of every Misfit garment is our signature-soft feel and better wearing experience.',
    icon: <Cloud className="w-12 h-12 text-lime-500" />
  },
  {
    title: 'Versatile',
    description: 'Thoughtfully designed for greater flexibility and adaptability in modern life.',
    icon: <BadgeCheck className="w-12 h-12 text-yellow-500" />
  },
  {
    title: 'Performance',
    description: 'Features that are lasting, for the life cycle of the product, and less reliant on chemical performance treatments.',
    icon: <Zap className="w-12 h-12 text-lime-500" />
  }
];

const ActivewearFeatures = () => {
  return (
    <section className="w-full bg-gray-700 py-60 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-white text-center mb-16">
          Activewear for a Better Future
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center"
            >
              <div className="mb-4">
                {feature.icon}
              </div>
              <h3 className="text-white text-xl font-semibold mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-300 text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ActivewearFeatures;