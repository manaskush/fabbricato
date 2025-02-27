import React from 'react';
import Image from 'next/image';

interface FeaturedInProps {
  className?: string;
}

const FeaturedIn: React.FC<FeaturedInProps> = ({ className = '' }) => {
  const featuredLogos = [
    { name: 'Hindustan Times', logo: '/images/hindustan-times.jpeg', alt: 'Hindustan Times logo' },
    { name: 'Amar Ujala', logo: '/images/amar-ujala.jpeg', alt: 'Amar Ujala logo' },
    { name: 'Dainik Jagran', logo: '/images/dainik-jagran.jpeg', alt: 'Danik Jagram logo' },
    
  ];

  return (
    <section className={`py-8 sm:py-10 md:py-12 px-4 ${className}`}>
      <div className="container mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-10 md:mb-14 text-center">Our Company is featured In</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex lg:flex-wrap justify-center items-center gap-6 sm:gap-8 md:gap-10 lg:gap-14">
          {featuredLogos.map((logo) => (
            <div 
              key={logo.name} 
              className="flex items-center justify-center h-16 sm:h-20 md:h-24"
            >
              <div className="relative w-32 sm:w-40 md:w-48 lg:w-56 h-full">
                <Image 
                  src={logo.logo} 
                  alt={logo.alt}
                  fill
                  sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, (max-width: 1024px) 192px, 224px"
                  style={{ objectFit: 'contain' }}
                  className="transition-opacity duration-300 hover:opacity-80"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedIn;