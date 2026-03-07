import React, { useEffect, useRef, useState } from 'react';
import { Star, MapPin, Clock } from 'lucide-react';

const TopRecommendations = ({ selectedTags }: { selectedTags: string[] }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const destinations = [
    {
      name: "Santorini, Greece",
      image: "https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=800",
      rating: 4.9,
      duration: "5-7 days",
      description: "Stunning sunsets, white-washed buildings, and crystal-clear waters make this a perfect romantic getaway.",
      tags: ["Romantic", "Beach", "Culture"]
    },
    {
      name: "Swiss Alps, Switzerland",
      image: "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=800",
      rating: 4.8,
      duration: "7-10 days",
      description: "Breathtaking mountain landscapes, pristine lakes, and world-class skiing adventures await.",
      tags: ["Adventure", "Mountains", "Nature"]
    },
    {
      name: "Kyoto, Japan",
      image: "https://images.pexels.com/photos/2437299/pexels-photo-2437299.jpeg?auto=compress&cs=tinysrgb&w=800",
      rating: 4.9,
      duration: "4-6 days",
      description: "Ancient temples, traditional gardens, and rich cultural experiences in Japan's former capital.",
      tags: ["Culture", "History", "Spiritual"]
    },
    {
      name: "Bali, Indonesia",
      image: "https://images.pexels.com/photos/2474690/pexels-photo-2474690.jpeg?auto=compress&cs=tinysrgb&w=800",
      rating: 4.7,
      duration: "6-8 days",
      description: "Tropical paradise with lush rice terraces, beautiful beaches, and vibrant local culture.",
      tags: ["Tropical", "Beach", "Wellness"]
    },
    {
      name: "Iceland",
      image: "https://images.pexels.com/photos/1433052/pexels-photo-1433052.jpeg?auto=compress&cs=tinysrgb&w=800",
      rating: 4.8,
      duration: "8-10 days",
      description: "Land of fire and ice with spectacular waterfalls, geysers, and the magical Northern Lights.",
      tags: ["Adventure", "Nature", "Unique"]
    },
    {
      name: "Dubai, UAE",
      image: "https://images.pexels.com/photos/1430677/pexels-photo-1430677.jpeg?auto=compress&cs=tinysrgb&w=800",
      rating: 4.6,
      duration: "4-5 days",
      description: "Futuristic cityscape, luxury shopping, and desert adventures in this modern metropolis.",
      tags: ["Luxury", "Modern", "Shopping"]
    }
  ];

  const filteredDestinations = destinations.filter((dest) =>
    selectedTags.length === 0 ||
    selectedTags.some((tag) => dest.tags.includes(tag))
  );

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-purple-50 via-white to-purple-50 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-purple-600 mb-4">
            Top Recommendations
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the world's most amazing destinations curated by our AI
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {filteredDestinations.map((destination, index) => (
            <div
              key={index}
              className={`transform transition-all duration-700 delay-${index * 100} ${
                isVisible
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-10 opacity-0'
              }`}
            >
              <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                <div className="relative overflow-hidden">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors duration-300">
                      {destination.name}
                    </h3>
                    <div className="flex items-center text-yellow-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm font-semibold ml-1">{destination.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-500 text-sm mb-3">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="mr-4">Popular</span>
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{destination.duration}</span>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {destination.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {destination.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 bg-purple-100 text-purple-600 text-xs font-semibold rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredDestinations.length === 0 && (
            <div className="col-span-full text-center text-gray-600 text-lg">
              No destinations found matching your selected tags.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TopRecommendations;
