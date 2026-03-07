import React, { useEffect, useRef, useState } from 'react';
import { GraduationCap, Code, Heart } from 'lucide-react';

const About = () => {
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
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-8">
        <div className="absolute top-20 right-20 animate-float">
          <svg className="w-18 h-18 text-purple-300" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z"/>
          </svg>
        </div>
        <div className="absolute bottom-16 left-16 animate-spin-slow">
          <svg className="w-16 h-16 text-green-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8Z"/>
          </svg>
        </div>
        <div className="absolute top-1/3 left-10 animate-bounce-slow">
          <svg className="w-14 h-14 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M21,16V14L13,9V7A1,1 0 0,0 12,6A1,1 0 0,0 11,7V9L3,14V16L11,13.5V19L8,20.5V22L12,21L16,22V20.5L13,19V13.5L21,16Z"/>
          </svg>
        </div>
      </div>
      
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className={`transform transition-all duration-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <h2 className="text-4xl md:text-5xl font-bold text-purple-600 mb-8">
              About the Project
            </h2>
          </div>

          <div className={`transform transition-all duration-700 delay-300 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl">
              <div className="flex justify-center mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                    <GraduationCap className="w-8 h-8 text-purple-600" />
                  </div>
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <Code className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                    <Heart className="w-8 h-8 text-red-600" />
                  </div>
                </div>
              </div>

              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  <strong className="text-purple-600">DestinAI</strong> is an innovative machine learning project 
                  developed as part of our college coursework. This intelligent travel recommender system 
                  combines the power of artificial intelligence with real-world travel data to create 
                  personalized destination suggestions.
                </p>
                
                <p>
                  Our system uses advanced algorithms including collaborative filtering, content-based 
                  recommendation, and natural language processing to understand user preferences and 
                  match them with the perfect travel destinations from around the world.
                </p>
                
                <p>
                  The project demonstrates practical applications of machine learning in the travel industry, 
                  showcasing how AI can enhance user experience and provide valuable, personalized recommendations 
                  that save time and improve travel planning decisions.
                </p>
              </div>

              <div className="mt-8 p-6 bg-purple-50 rounded-xl">
                <p className="text-purple-800 font-semibold">
                  🎓 Academic Project | Machine Learning & Data Science
                </p>
                <p className="text-purple-600 text-sm mt-2">
                  Developed to explore the intersection of AI technology and travel personalization
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;