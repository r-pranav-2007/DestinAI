import React, { useState, useEffect, useRef } from 'react';
import { Search, Loader, ArrowRight, Plane, Globe, MapPin } from 'lucide-react';

const TryItNow = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [preferences, setPreferences] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!preferences.trim()) return;
    
    setIsLoading(true);
    setShowResult(false);
    
    // Simulate AI processing
    setTimeout(() => {
      setIsLoading(false);
      setShowResult(true);
    }, 2000);
  };

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-white via-green-50 to-blue-50 relative overflow-hidden">
      {/* Moving background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 right-10 animate-fly">
          <Plane className="w-16 h-16 text-blue-500" />
        </div>
        <div className="absolute bottom-20 left-10 animate-spin-slow">
          <Globe className="w-20 h-20 text-green-500" />
        </div>
        <div className="absolute top-1/2 right-1/4 animate-bounce-slow">
          <MapPin className="w-12 h-12 text-purple-500" />
        </div>
        <div className="absolute top-20 left-1/4 animate-float-delayed">
          <svg className="w-16 h-16 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12,2L13.09,8.26L22,9L17,14L18.18,23L12,19.77L5.82,23L7,14L2,9L10.91,8.26L12,2Z"/>
          </svg>
        </div>
        <div className="absolute bottom-32 right-16 animate-pulse-slow">
          <svg className="w-14 h-14 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12,2C13.1,2 14,2.9 14,4C14,5.1 13.1,6 12,6C10.9,6 10,5.1 10,4C10,2.9 10.9,2 12,2M21,9V7L15,1H5C3.89,1 3,1.89 3,3V21A2,2 0 0,0 5,23H19A2,2 0 0,0 21,21V9M19,9H14V4H19V9Z"/>
          </svg>
        </div>
      </div>
      
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className={`text-center mb-12 transform transition-all duration-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <h2 className="text-4xl md:text-5xl font-bold text-purple-600 mb-4">
              Try It Now
            </h2>
            <p className="text-xl text-gray-600">
              Experience the power of AI-driven travel recommendations
            </p>
          </div>

          <div className={`transform transition-all duration-700 delay-300 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div className="bg-gradient-to-br from-purple-50 to-white p-8 md:p-12 rounded-3xl shadow-xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="preferences" className="block text-lg font-semibold text-gray-800 mb-3">
                    Describe your ideal travel experience:
                  </label>
                  <textarea
                    id="preferences"
                    value={preferences}
                    onChange={(e) => setPreferences(e.target.value)}
                    placeholder="e.g., I love beaches, adventure sports, local food, and prefer warm weather. Budget is around $2000 for a week-long trip..."
                    className="w-full p-4 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors duration-300 resize-none h-32 text-gray-700"
                    disabled={isLoading}
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={!preferences.trim() || isLoading}
                  className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:hover:scale-100 disabled:hover:shadow-none flex items-center justify-center gap-3"
                >
                  {isLoading ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      AI is thinking...
                    </>
                  ) : (
                    <>
                      <Search className="w-5 h-5" />
                      Get My Recommendations
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>

              {/* Demo Result */}
              {showResult && (
                <div className="mt-8 p-6 bg-white rounded-xl shadow-lg animate-fadeIn">
                  <h3 className="text-xl font-bold text-purple-600 mb-4">🎯 Perfect Match Found!</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <span className="font-semibold text-gray-800">Top Recommendation:</span>
                      <span className="text-gray-600">Maldives - Perfect for beach lovers with luxury resorts and water sports</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="font-semibold text-gray-800">Match Score:</span>
                      <span className="text-green-600 font-semibold">94%</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="font-semibold text-gray-800">Best Time:</span>
                      <span className="text-gray-600">November - April</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-4 italic">
                    * This is a demo. The full system provides detailed itineraries, budget breakdowns, and booking options.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TryItNow;