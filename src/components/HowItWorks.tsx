import React, { useEffect, useRef, useState } from 'react';
import { User, Brain, MapPin, Sparkles, Zap, Target } from 'lucide-react';

const HowItWorks = () => {
  const [visibleSteps, setVisibleSteps] = useState<boolean[]>([false, false, false]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Stagger the animation of steps
            setTimeout(() => setVisibleSteps(prev => [true, prev[1], prev[2]]), 100);
            setTimeout(() => setVisibleSteps(prev => [prev[0], true, prev[2]]), 400);
            setTimeout(() => setVisibleSteps(prev => [prev[0], prev[1], true]), 700);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const steps = [
    {
      icon: User,
      title: "Tell Us Your Preferences",
      description: "Share your travel style and interests with our smart system.",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: Brain,
      title: "AI Processes Your Data",
      description: "Our machine learning algorithm analyzes available destinations to find your perfect match.",
      color: "bg-purple-100 text-purple-600"
    },
    {
      icon: MapPin,
      title: "Get Personalized Results",
      description: "Receive tailored destination recommendations with detailed insights and travel tips.",
      color: "bg-green-100 text-green-600"
    }
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-gray-50 via-white to-purple-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 animate-float">
          <Sparkles className="w-20 h-20 text-purple-500" />
        </div>
        <div className="absolute bottom-10 right-10 animate-float-delayed">
          <Zap className="w-16 h-16 text-blue-500" />
        </div>
        <div className="absolute top-1/2 left-1/4 animate-pulse-slow">
          <Target className="w-24 h-24 text-green-500" />
        </div>
        <div className="absolute top-20 right-1/4 animate-bounce-slow">
          <svg className="w-16 h-16 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M21 16v6h-2v-6h-2l3-4 3 4h-2zM14 14.5c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2zM12 3L2 12h3v8h14v-8h3L12 3z"/>
          </svg>
        </div>
        <div className="absolute bottom-32 left-10 animate-wave">
          <svg className="w-12 h-12 text-cyan-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </div>
      </div>
      
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-purple-600 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Three simple steps to discover your next adventure destination
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className={`transform transition-all duration-700 ${
                  visibleSteps[index] 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-10 opacity-0'
                }`}
              >
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 h-full">
                  <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center mb-6 mx-auto`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                  <div className="mt-6 text-center">
                    <span className="inline-block w-8 h-1 bg-purple-600 rounded-full"></span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;