import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, Zap, Target, Shield } from 'lucide-react';

const WhyDestinAI = () => {
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

  const benefits = [
    {
      icon: Sparkles,
      title: "AI-Powered Personalization",
      description: "Advanced machine learning algorithms understand your unique travel preferences and style.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Zap,
      title: "Lightning Fast Results",
      description: "Get instant recommendations in seconds, not hours of research and planning.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Target,
      title: "Precision Matching",
      description: "Our system considers hundreds of factors to find destinations that truly match your desires.",
      gradient: "from-green-500 to-teal-500"
    },
    {
      icon: Shield,
      title: "Trusted & Reliable",
      description: "Built on proven machine learning models with data from thousands of satisfied travelers.",
      gradient: "from-orange-500 to-red-500"
    }
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-white via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 bg-purple-400 rounded-full animate-blob"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-blue-400 rounded-full animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/3 w-28 h-28 bg-pink-400 rounded-full animate-blob animation-delay-4000"></div>
        <div className="absolute top-1/3 right-10 animate-float">
          <svg className="w-20 h-20 text-green-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14,6L10.25,11L13.1,14.8L11.5,16C9.81,13.75 7,10 7,10L1,18H23L14,6Z"/>
          </svg>
        </div>
        <div className="absolute bottom-10 right-1/3 animate-spin-slow">
          <svg className="w-14 h-14 text-orange-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8Z"/>
          </svg>
        </div>
      </div>
      
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-purple-600 mb-4">
            Why Choose DestinAI?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the future of travel planning with our intelligent recommendation system
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className={`transform transition-all duration-700 delay-${index * 100} ${
                  isVisible 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-10 opacity-0'
                }`}
              >
                <div className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 border border-gray-100 h-full">
                  <div className={`w-14 h-14 bg-gradient-to-r ${benefit.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-3 group-hover:text-purple-600 transition-colors duration-300">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyDestinAI;