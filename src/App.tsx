import React from 'react';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import WhyDestinAI from './components/WhyDestinAI';
import TravelRecommendationFlow from './components/TravelRecommendationFlow';
import About from './components/About';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <HowItWorks />
      <WhyDestinAI />
      <TravelRecommendationFlow />
      <About />
      <Footer />
    </div>
  );
}

export default App;