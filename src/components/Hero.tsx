import React, { useEffect, useState } from 'react';
import { Plane, MapPin, Sparkles, Globe, Heart, ChevronLeft, ChevronRight } from 'lucide-react';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Vibrant travel images for carousel
  const heroImages = [
    {
      url: "/11111.JPG",
      alt: "Beautiful travel destination"
    },
    {
      url: "/22222.JPG",
      alt: "Stunning landscape view"
    },
    {
      url: "/33333.JPG",
      alt: "Amazing travel experience"
    },
    {
      url: "/44444.JPG",
      alt: "Incredible destination view"
    },
    {
      url: "/55555.PNG",
      alt: "Breathtaking travel scene"
    }
  ];

  useEffect(() => {
    setIsLoaded(true);
    
    // Auto-advance carousel
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Mountain landscape background */}
      <div className="absolute inset-0">
        <img
          src="ChatGPT Image Aug 12, 2025, 11_47_21 PM.png"
          alt="Stunning mountain landscape with snow and clouds"
          className="w-full h-full object-cover relative z-0"
          style={{
            filter: 'blur(0 px) brightness(0.9)',
            pointerEvents: 'none'
          }}
        />
      </div>

      {/* Enhanced overlay for better text visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 z-5"></div>

      <div className="relative z-10 container mx-auto px-6 pt-32 pb-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Heading with Animation */}
          <div 
            className={`transform transition-all duration-1000 ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="relative w-16 h-16 md:w-20 md:h-20">
                {/* Outer rotating ring */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 rounded-full animate-spin-slow opacity-80"></div>
                
                {/* Inner logo container */}
                <div className="absolute inset-1 bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 rounded-full flex items-center justify-center shadow-2xl">
                  {/* Central globe with orbiting elements */}
                  <div className="relative">
                    <Globe className="w-6 h-6 md:w-8 md:h-8 text-white animate-pulse" />
                    
                    {/* Orbiting plane */}
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-white rounded-full flex items-center justify-center animate-spin">
                      <Plane className="w-2 h-2 text-purple-600 transform rotate-45" />
                    </div>
                    
                    {/* Orbiting heart */}
                    <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-r from-pink-400 to-red-400 rounded-full flex items-center justify-center animate-bounce">
                      <Heart className="w-2 h-2 text-white fill-current" />
                    </div>
                    
                    {/* Sparkle effects */}
                    <div className="absolute -top-1 -left-1">
                      <Sparkles className="w-3 h-3 text-yellow-300 animate-twinkle" />
                    </div>
                    <div className="absolute -bottom-1 -right-1">
                      <Sparkles className="w-2 h-2 text-cyan-300 animate-twinkle delay-500" />
                    </div>
                  </div>
                </div>
                
                {/* Pulsing glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-ping opacity-20"></div>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-purple-600 leading-tight text-shadow-purple">
                DestinAI
              </h1>
            </div>
            <p className="text-4xl md:text-5xl text-white mb-8 font-semibold text-shadow-strong">
              A Smart Travel Recommender
            </p>
          </div>

          {/* Enhanced Subheading with travel stats */}
          <div 
            className={`transform transition-all duration-1000 delay-300 ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <p className="text-3xl md:text-4xl text-white mb-10 font-medium text-shadow-soft">
              Your Next Adventure Starts Here
            </p>
            
            {/* Travel stats with icons */}
            <div className="flex justify-center items-center gap-8 mb-8 flex-wrap">
              <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <Globe className="w-5 h-5 text-purple-500" />
                <span className="text-gray-700 font-semibold text-shadow-soft">70+ Destinations</span>
              </div>
              <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <Heart className="w-5 h-5 text-pink-500 fill-current" />
                <span className="text-gray-700 font-semibold text-shadow-soft">Personalized</span>
              </div>
              <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <Sparkles className="w-5 h-5 text-green-500" />
                <span className="text-gray-700 font-semibold text-shadow-soft">Smart Matching</span>
              </div>
            </div>
          </div>

          {/* Enhanced CTA Button */}
          <div 
            className={`transform transition-all duration-1000 delay-600 ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <button 
              onClick={() => {
                const destinationSection = document.getElementById('destination-finder');
                if (destinationSection) {
                  destinationSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="group relative bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 hover:from-purple-700 hover:via-pink-700 hover:to-purple-700 text-white px-12 py-6 rounded-full text-xl font-semibold transition-all duration-500 transform hover:scale-110 hover:shadow-2xl overflow-hidden"
            >
              {/* Button glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-xl"></div>
              
              {/* Button content */}
              <div className="relative flex items-center gap-3">
                <Sparkles className="w-6 h-6 animate-spin-slow" />
                <span>Discover Your Dream Destination</span>
                <div className="transform group-hover:translate-x-2 transition-transform duration-300">
                  <Plane className="w-6 h-6" />
                </div>
              </div>
              
              {/* Animated border */}
              <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping opacity-0 group-hover:opacity-100"></div>
            </button>
          </div>
        </div>

        {/* Sleek and Elegant Hero Image Section */}
        <div 
          className={`mt-20 transform transition-all duration-1000 delay-900 ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <div className="relative max-w-5xl mx-auto">
            {/* Elegant Image Carousel */}
            <div className="relative group overflow-hidden rounded-3xl shadow-2xl">
              {/* Glass morphism container */}
              <div className="relative bg-black/10 backdrop-blur-md border border-white/20 rounded-3xl overflow-hidden">
                <img 
                  src={heroImages[currentImageIndex].url}
                  alt={heroImages[currentImageIndex].alt}
                  className="w-full h-80 md:h-96 object-cover transition-all duration-700 transform group-hover:scale-105"
                />
                
                {/* Elegant gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                
                {/* Subtle inner glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5"></div>
                
                {/* Sleek navigation arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 border border-white/20 shadow-lg opacity-0 group-hover:opacity-100"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 border border-white/20 shadow-lg opacity-0 group-hover:opacity-100"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                
                {/* Elegant dots indicator */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {heroImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-500 backdrop-blur-sm border border-white/30 ${
                        index === currentImageIndex 
                          ? 'bg-white scale-125 shadow-lg shadow-white/50' 
                          : 'bg-white/40 hover:bg-white/70 hover:scale-110'
                      }`}
                    />
                  ))}
                </div>
                
                {/* Elegant corner accents */}
                <div className="absolute top-3 left-3 w-6 h-6 border-l-2 border-t-2 border-white/30 rounded-tl-lg"></div>
                <div className="absolute top-3 right-3 w-6 h-6 border-r-2 border-t-2 border-white/30 rounded-tr-lg"></div>
                <div className="absolute bottom-3 left-3 w-6 h-6 border-l-2 border-b-2 border-white/30 rounded-bl-lg"></div>
                <div className="absolute bottom-3 right-3 w-6 h-6 border-r-2 border-b-2 border-white/30 rounded-br-lg"></div>
              </div>

              {/* Outer glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;