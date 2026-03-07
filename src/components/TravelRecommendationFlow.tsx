import React, { useState, useEffect, useRef } from 'react';
import { Search, Loader, ArrowRight, MapPin, Tag, Star, Users, DollarSign, Calendar, Clock, X } from 'lucide-react';
import { destinationsData, Destination } from '../data/destinations';

interface ScoredDestination extends Destination {
  score: number;
  rating: number;
  matchingTags: string[];
}

interface ItineraryDay {
  day: number;
  activities: string[];
}

const TravelRecommendationFlow = () => {
  const [step, setStep] = useState<'category' | 'group-budget' | 'tags' | 'results'>('category');
  const [selectedCategory, setSelectedCategory] = useState<'Domestic' | 'International' | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [budgetRange, setBudgetRange] = useState<{ min: number; max: number }>({ min: 10000, max: 500000 });
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<ScoredDestination[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState<ScoredDestination | null>(null);
  const [showItinerary, setShowItinerary] = useState(false);
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

  const groupOptions = [
    { id: 'bachelor', label: 'Bachelor', emoji: '🎉', description: 'Fun with friends' },
    { id: 'family', label: 'Family', emoji: '👨‍👩‍👧‍👦', description: 'Perfect for all ages' },
    { id: 'couple', label: 'Couple', emoji: '💕', description: 'Romantic getaway' },
    { id: 'field-trip', label: 'Field Trip', emoji: '🎓', description: 'Educational adventure' },
    { id: 'solo', label: 'Solo', emoji: '🧳', description: 'Independent exploration' }
  ];

  const formatBudget = (amount: number): string => {
    if (amount >= 500000) return '₹5,00,000+';
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const handleBudgetChange = (type: 'min' | 'max', value: number) => {
    setBudgetRange(prev => {
      if (type === 'min') {
        return { ...prev, min: Math.min(value, prev.max) };
      } else {
        return { ...prev, max: Math.max(value, prev.min) };
      }
    });
  };

  const tagCategories = [
    {
      emoji: '🏝️',
      title: 'Nature & Landscape',
      tags: ['beach', 'island', 'mountains', 'hills', 'desert', 'snow', 'lakes', 'scenic', 'nature', 'tropical']
    },
    {
      emoji: '🌆',
      title: 'Urban & Modern',
      tags: ['urban', 'technology', 'modern', 'entertainment']
    },
    {
      emoji: '🎭',
      title: 'Culture & Heritage',
      tags: ['culture', 'heritage', 'architecture', 'history', 'traditional', 'temples', 'museums', 'art', 'markets']
    },
    {
      emoji: '💃',
      title: 'Activities & Vibe',
      tags: ['adventure', 'romantic', 'party', 'nightlife', 'relaxation', 'peaceful', 'unique']
    },
    {
      emoji: '🍽️',
      title: 'Food & Shopping',
      tags: ['food', 'shopping', 'coffee']
    }
  ];

  const generateItinerary = (destination: ScoredDestination): ItineraryDay[] => {
    const itineraries: { [key: string]: ItineraryDay[] } = {
      'Andaman Islands': [
        { day: 1, activities: ['Arrive at Port Blair, check into beachfront resort', 'Visit Cellular Jail National Memorial', 'Sunset at Corbyn\'s Cove Beach with coconut water'] },
        { day: 2, activities: ['Scuba diving at Havelock Island', 'Lunch at beachside shack', 'Elephant Beach snorkeling adventure'] },
        { day: 3, activities: ['Radhanagar Beach relaxation', 'Local seafood cooking class', 'Departure with sand between your toes'] }
      ],
      'Goa': [
        { day: 1, activities: ['Beach hopping: Baga to Calangute', 'Sunset cruise with live music', 'Night market exploration in Anjuna'] },
        { day: 2, activities: ['Old Goa heritage walk', 'Spice plantation tour with traditional lunch', 'Beach party at Tito\'s Lane'] },
        { day: 3, activities: ['Water sports at Candolim Beach', 'Portuguese architecture photography', 'Farewell feni tasting session'] }
      ],
      'Jaipur': [
        { day: 1, activities: ['Amber Fort elephant ride', 'City Palace royal tour', 'Hawa Mahal pink city sunset'] },
        { day: 2, activities: ['Jaigarh Fort adventure', 'Local bazaar shopping spree', 'Traditional Rajasthani dinner show'] },
        { day: 3, activities: ['Jantar Mantar astronomical wonders', 'Block printing workshop', 'Departure with royal memories'] }
      ],
      'Kashmir': [
        { day: 1, activities: ['Dal Lake shikara ride', 'Mughal Gardens stroll', 'Houseboat dinner under stars'] },
        { day: 2, activities: ['Gulmarg gondola cable car', 'Snow activities and photography', 'Local Kashmiri wazwan feast'] },
        { day: 3, activities: ['Pahalgam valley exploration', 'Betaab Valley Bollywood locations', 'Departure with mountain memories'] }
      ],
      'Kerala': [
        { day: 1, activities: ['Alleppey backwater houseboat cruise', 'Traditional Kerala lunch on water', 'Sunset over coconut groves'] },
        { day: 2, activities: ['Munnar tea plantation tour', 'Spice garden exploration', 'Ayurvedic massage session'] },
        { day: 3, activities: ['Kochi Chinese fishing nets', 'Fort Kochi heritage walk', 'Kathakali dance performance'] }
      ],
      'Maldives': [
        { day: 1, activities: ['Seaplane transfer to resort', 'Overwater villa check-in', 'Sunset dolphin watching cruise'] },
        { day: 2, activities: ['Snorkeling in coral gardens', 'Private beach picnic', 'Underwater restaurant dinner'] },
        { day: 3, activities: ['Spa treatment with ocean views', 'Water sports adventure', 'Departure with tan lines and memories'] }
      ],
      'Bali': [
        { day: 1, activities: ['Ubud rice terrace sunrise', 'Traditional Balinese cooking class', 'Monkey Forest sanctuary visit'] },
        { day: 2, activities: ['Temple hopping: Tanah Lot & Uluwatu', 'Kecak fire dance performance', 'Beachside seafood dinner'] },
        { day: 3, activities: ['Volcano sunrise trek at Mount Batur', 'Coffee plantation tour', 'Beach club relaxation in Seminyak'] }
      ],
      'Paris': [
        { day: 1, activities: ['Eiffel Tower morning visit', 'Seine River cruise with wine', 'Montmartre evening stroll'] },
        { day: 2, activities: ['Louvre Museum art exploration', 'Latin Quarter café hopping', 'Notre-Dame sunset views'] },
        { day: 3, activities: ['Versailles palace day trip', 'Champs-Élysées shopping', 'Farewell dinner at bistro'] }
      ],
      'Tokyo': [
        { day: 1, activities: ['Tsukiji Fish Market sushi breakfast', 'Senso-ji Temple traditional experience', 'Shibuya crossing night lights'] },
        { day: 2, activities: ['Mount Fuji day trip', 'Onsen hot spring relaxation', 'Harajuku street fashion tour'] },
        { day: 3, activities: ['Robot Restaurant show', 'Ginza luxury shopping', 'Farewell ramen crawl'] }
      ],
      'Dubai': [
        { day: 1, activities: ['Burj Khalifa observation deck', 'Dubai Mall aquarium visit', 'Desert safari with camel riding'] },
        { day: 2, activities: ['Palm Jumeirah helicopter tour', 'Gold Souk bargaining adventure', 'Luxury yacht dinner cruise'] },
        { day: 3, activities: ['Ski Dubai indoor snow experience', 'Spice Souk aromatic exploration', 'Departure from future city'] }
      ]
    };

    // Return specific itinerary if available, otherwise generate a generic one
    if (itineraries[destination.Name]) {
      return itineraries[destination.Name];
    }

    // Generic itinerary based on destination tags
    const tags = destination.Tags.toLowerCase().split(',').map(t => t.trim());
    const activities: string[] = [];

    if (tags.includes('beach')) {
      activities.push('Beach relaxation and water sports', 'Sunset beach walk', 'Beachside dining experience');
    }
    if (tags.includes('culture')) {
      activities.push('Cultural site exploration', 'Local museum visit', 'Traditional performance show');
    }
    if (tags.includes('adventure')) {
      activities.push('Adventure activity experience', 'Outdoor exploration', 'Thrilling local adventure');
    }
    if (tags.includes('food')) {
      activities.push('Local cuisine tasting tour', 'Cooking class experience', 'Street food exploration');
    }
    if (tags.includes('nature')) {
      activities.push('Nature walk and photography', 'Scenic viewpoint visit', 'Wildlife observation');
    }

    // Default activities if no specific tags match
    if (activities.length === 0) {
      activities.push('City exploration and sightseeing', 'Local attraction visits', 'Cultural immersion experience');
    }

    return [
      { day: 1, activities: [activities[0] || 'Arrival and city orientation', activities[1] || 'Local landmark visit', 'Welcome dinner at popular restaurant'] },
      { day: 2, activities: [activities[1] || 'Main attraction exploration', activities[2] || 'Cultural experience', 'Evening entertainment'] },
      { day: 3, activities: [activities[2] || 'Final sightseeing', 'Souvenir shopping', 'Departure with amazing memories'] }
    ];
  };

  const getFunnyClosingLine = (destination: ScoredDestination): string => {
    const lines = [
      "Your Instagram is about to glow up ✨",
      "Pack your bags and your sense of adventure! 🎒",
      "Warning: May cause severe wanderlust addiction 🌍",
      "Your friends will be so jealous they'll need therapy 😎",
      "Prepare for the best 'I told you so' moment ever! 🎉",
      "Your passport is about to get its workout 📸",
      "Get ready to become that friend with amazing travel stories 🗣️",
      "Your future self will thank you (and so will your camera roll) 📱",
      "Time to make some memories that'll last longer than your phone battery! 🔋",
      "Adventure level: About to be legendary 🏆"
    ];
    
    return lines[Math.floor(Math.random() * lines.length)];
  };

  const getTagEmoji = (tag: string): string => {
    const tagEmojiMap: { [key: string]: string } = {
      'beach': '🏖️', 'island': '🏝️', 'mountains': '⛰️', 'hills': '🏔️', 'desert': '🏜️',
      'snow': '❄️', 'lakes': '🏞️', 'scenic': '🌅', 'nature': '🌿', 'water': '💧',
      'tropical': '🌴', 'urban': '🏙️', 'skyline': '🌃', 'technology': '💻',
      'modern': '🏢', 'safe': '🛡️', 'entertainment': '🎭', 'culture': '🎨',
      'heritage': '🏛️', 'architecture': '🏗️', 'history': '📜', 'traditional': '🏮',
      'temples': '⛩️', 'museums': '🏛️', 'art': '🎨', 'festivals': '🎉',
      'markets': '🛒', 'adventure': '🎯', 'romantic': '💕', 'party': '🎉',
      'nightlife': '🌙', 'relaxation': '🧘', 'honeymoon': '💑', 'serene': '🕊️',
      'unique': '✨', 'food': '🍽️', 'shopping': '🛍️', 'beer': '🍺',
      'luxury': '💎', 'diverse': '🌈', 'hot': '🌡️', 'winter': '🌨️', 'rainy': '🌧️',
      'india': '🇮🇳', 'asia': '🌏', 'europe': '🇪🇺', 'africa': '🌍', 'netherlands': '🇳🇱'
    };
    return tagEmojiMap[tag.toLowerCase()] || '🏷️';
  };

  const handleCategorySelect = (category: 'Domestic' | 'International') => {
    setSelectedCategory(category);
    setStep('group-budget');
  };

  const handleGroupBudgetNext = () => {
    if (selectedGroup) {
      setStep('tags');
    }
  };

  const handleTagToggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else if (selectedTags.length < 5) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const calculateTagMatches = (destinationTags: string, selectedTags: string[]) => {
    if (!destinationTags || selectedTags.length === 0) {
      return { score: 0.1, matchingTags: [] };
    }
    
    const destTagsArray = destinationTags
      .toLowerCase()
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);
    
    const matchingTags: string[] = [];
    let score = 0;
    
    selectedTags.forEach(selectedTag => {
      const selectedLower = selectedTag.toLowerCase();
      
      if (destTagsArray.includes(selectedLower)) {
        matchingTags.push(selectedTag);
        score += 2;
        return;
      }
      
      const hasPartialMatch = destTagsArray.some(destTag => {
        return destTag.includes(selectedLower) || 
               selectedLower.includes(destTag);
      });
      
      if (hasPartialMatch) {
        matchingTags.push(selectedTag);
        score += 1;
      }
    });
    
    if (matchingTags.length > 1) {
      score += matchingTags.length * 0.5;
    }
    
    return { score, matchingTags };
  };

  const generateRandomRating = (): number => {
    return Math.round((Math.random() * (5.0 - 4.5) + 4.5) * 10) / 10;
  };

  const renderStarRating = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center gap-1">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
        ))}
        {hasHalfStar && (
          <div className="relative">
            <Star className="w-5 h-5 text-gray-300" />
            <div className="absolute inset-0 overflow-hidden w-1/2">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            </div>
          </div>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} className="w-5 h-5 text-gray-300" />
        ))}
        <span className="ml-2 text-lg font-bold text-gray-800">{rating}</span>
      </div>
    );
  };

  const searchDestinations = async () => {
    if (!selectedCategory) return;

    if (selectedTags.length === 0) {
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 5000);
      return;
    }

    setShowWarning(false);
    setIsLoading(true);

    try {
      const categoryFiltered = destinationsData.filter(dest => 
        dest.Category === selectedCategory
      );

      const scoredResults: ScoredDestination[] = categoryFiltered
        .map(dest => {
          const { score, matchingTags } = calculateTagMatches(dest.Tags, selectedTags);
          
          return {
            ...dest,
            score,
            rating: generateRandomRating(),
            matchingTags
          };
        })
        .sort((a, b) => {
          if (Math.abs(b.score - a.score) > 0.1) {
            return b.score - a.score;
          }
          return a.Name.localeCompare(b.Name);
        });

      const finalResults = scoredResults.slice(0, 5);
      setResults(finalResults);
      setStep('results');
      
      setTimeout(() => {
        const resultsSection = document.querySelector('[data-results-section]');
        if (resultsSection) {
          resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } catch (error) {
      console.error('Error searching destinations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDestinationClick = (destination: ScoredDestination) => {
    setSelectedDestination(destination);
    setShowItinerary(true);
  };

  const closeItinerary = () => {
    setShowItinerary(false);
    setSelectedDestination(null);
  };

  const resetFlow = () => {
    setStep('category');
    setSelectedCategory(null);
    setSelectedGroup(null);
    setBudgetRange({ min: 10000, max: 500000 });
    setSelectedTags([]);
    setResults([]);
    setShowItinerary(false);
    setSelectedDestination(null);
  };

  const domesticCount = destinationsData.filter(d => d.Category === 'Domestic').length;
  const internationalCount = destinationsData.filter(d => d.Category === 'International').length;

  return (
    <section id="destination-finder" ref={sectionRef} className="py-20 bg-gradient-to-br from-purple-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 animate-float">
          <MapPin className="w-16 h-16 text-purple-500" />
        </div>
        <div className="absolute bottom-20 right-20 animate-bounce-slow">
          <Search className="w-18 h-18 text-blue-500" />
        </div>
        <div className="absolute top-1/2 right-10 animate-pulse-slow">
          <Tag className="w-14 h-14 text-green-500" />
        </div>
      </div>

      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-purple-600 mb-4">
            Find Your Perfect Destination
          </h2>
          <p className="text-xl text-gray-600">
            Let AI help you discover amazing places based on your preferences
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Step 1: Category Selection */}
          {step === 'category' && (
            <div className={`transform transition-all duration-700 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Choose Your Travel Type
                </h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <button
                  onClick={() => handleCategorySelect('Domestic')}
                  className="group relative bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 border-2 border-purple-200 hover:border-purple-400 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 opacity-0 group-hover:opacity-25 transition-all duration-500 rounded-3xl"></div>
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 opacity-0 group-hover:opacity-40 blur-xl transition-all duration-500 animate-pulse"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000 ease-out"></div>
                  
                  <div className="relative z-10">
                    <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">🇮🇳</div>
                    <h4 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-purple-700 transition-colors duration-300">
                      Domestic
                    </h4>
                    <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                      Explore beautiful destinations within India
                    </p>
                    <div className="mt-4 text-sm font-semibold text-purple-600 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                      {domesticCount} Amazing Places ✨
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => handleCategorySelect('International')}
                  className="group relative bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 border-2 border-blue-200 hover:border-pink-400 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-25 transition-all duration-500 rounded-3xl"></div>
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-40 blur-xl transition-all duration-500 animate-pulse"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000 ease-out"></div>
                  
                  <div className="relative z-10">
                    <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">🌐</div>
                    <h4 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-pink-700 transition-colors duration-300">
                      International
                    </h4>
                    <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                      Discover amazing places around the world
                    </p>
                    <div className="mt-4 text-sm font-semibold text-pink-600 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                      {internationalCount} Global Destinations ✨
                    </div>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Group and Budget Selection */}
          {step === 'group-budget' && (
            <div className="animate-fadeIn">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Tell us about your trip
                </h3>
                <p className="text-gray-600">
                  Help us personalize your experience
                </p>
              </div>

              <div className="space-y-8">
                {/* Group Selection */}
                <div className="bg-white p-6 rounded-2xl shadow-lg">
                  <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Users className="w-6 h-6 text-purple-600" />
                    Who's traveling?
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {groupOptions.map((group) => (
                      <button
                        key={group.id}
                        onClick={() => setSelectedGroup(group.id)}
                        className={`p-4 rounded-xl text-center transition-all duration-300 transform hover:scale-105 ${
                          selectedGroup === group.id
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white ring-4 ring-purple-200 shadow-lg'
                            : 'bg-gradient-to-r from-blue-100 to-purple-100 text-purple-700 hover:from-purple-200 hover:to-pink-200 hover:shadow-md'
                        }`}
                      >
                        <div className="text-2xl mb-2">{group.emoji}</div>
                        <div className="font-semibold text-sm">{group.label}</div>
                        <div className="text-xs opacity-80">{group.description}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Budget Selection */}
                <div className="bg-white p-6 rounded-2xl shadow-lg">
                  <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <DollarSign className="w-6 h-6 text-green-600" />
                    What's your budget range?
                  </h4>
                  
                  <div className="space-y-6">
                    {/* Budget Range Display */}
                    <div className="text-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-2 border-green-200">
                      <p className="text-lg font-bold text-green-700">
                        Your budget range is from {formatBudget(budgetRange.min)} to {formatBudget(budgetRange.max)}
                      </p>
                    </div>

                    {/* Dual Handle Range Slider */}
                    <div className="space-y-4">
                      <div className="relative px-4">
                        {/* Slider Track */}
                        <div className="relative h-3 bg-gradient-to-r from-green-200 to-emerald-200 rounded-lg">
                          {/* Active Range */}
                          <div 
                            className="absolute h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg"
                            style={{
                              left: `${((budgetRange.min - 10000) / (500000 - 10000)) * 100}%`,
                              width: `${((budgetRange.max - budgetRange.min) / (500000 - 10000)) * 100}%`
                            }}
                          ></div>
                        </div>
                        
                        {/* Dual Range Sliders */}
                        <div className="relative -mt-3">
                          {/* Minimum Handle - Lower z-index */}
                          <input
                            type="range"
                            min="10000"
                            max="500000"
                            step="10000"
                            value={budgetRange.min}
                            onChange={(e) => handleBudgetChange('min', parseInt(e.target.value))}
                            className="absolute w-full h-3 appearance-none bg-transparent cursor-pointer range-slider range-slider-min"
                          />
                          
                          {/* Maximum Handle - Higher z-index */}
                          <input
                            type="range"
                            min="10000"
                            max="500000"
                            step="10000"
                            value={budgetRange.max}
                            onChange={(e) => handleBudgetChange('max', parseInt(e.target.value))}
                            className="absolute w-full h-3 appearance-none bg-transparent cursor-pointer range-slider range-slider-max"
                          />
                        </div>
                        
                        {/* Value Labels */}
                        <div className="relative mt-6">
                          <div 
                            className="absolute transform -translate-x-1/2"
                            style={{ left: `${((budgetRange.min - 10000) / (500000 - 10000)) * 100}%` }}
                          >
                            <div className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm font-bold shadow-lg">
                              {formatBudget(budgetRange.min)}
                            </div>
                            <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-green-600 mx-auto"></div>
                          </div>
                          
                          <div 
                            className="absolute transform -translate-x-1/2"
                            style={{ left: `${((budgetRange.max - 10000) / (500000 - 10000)) * 100}%` }}
                          >
                            <div className="bg-emerald-600 text-white px-3 py-1 rounded-lg text-sm font-bold shadow-lg">
                              {formatBudget(budgetRange.max)}
                            </div>
                            <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-emerald-600 mx-auto"></div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Range Labels */}
                      <div className="flex justify-between text-xs text-gray-500 px-4">
                        <span>₹10,000</span>
                        <span>₹5,00,000+</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center gap-4 mt-8">
                <button
                  onClick={() => setStep('category')}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  Back
                </button>
                <button
                  onClick={handleGroupBudgetNext}
                  disabled={!selectedGroup}
                  className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 disabled:from-gray-400 disabled:to-gray-400 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:hover:scale-100"
                >
                  Continue
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Tag Selection */}
          {step === 'tags' && (
            <div className="animate-fadeIn">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  What interests you? (Select up to 5 tags)
                </h3>
                <p className="text-purple-600 font-semibold">
                  Selected: {selectedTags.length}/5
                </p>
              </div>

              <div className="space-y-6">
                {tagCategories.map((category, categoryIndex) => (
                  <div key={categoryIndex} className="bg-white p-6 rounded-2xl shadow-lg">
                    <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <span className="text-2xl">{category.emoji}</span>
                      {category.title}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {category.tags.map((tag, tagIndex) => {
                        const isSelected = selectedTags.includes(tag);
                        const isDisabled = !isSelected && selectedTags.length >= 5;
                        
                        return (
                          <button
                            key={tagIndex}
                            onClick={() => handleTagToggle(tag)}
                            disabled={isDisabled}
                            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                              isSelected
                                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white ring-4 ring-purple-200 shadow-lg'
                                : isDisabled
                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                : 'bg-gradient-to-r from-blue-100 to-purple-100 text-purple-700 hover:from-purple-200 hover:to-pink-200 hover:shadow-md'
                            }`}
                          >
                            {getTagEmoji(tag)} {tag}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Warning message */}
              {showWarning && (
                <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl animate-pulse">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">⚠️</div>
                    <div>
                      <h4 className="text-red-800 font-bold text-lg">Please Select Your Preferences</h4>
                      <p className="text-red-600">
                        You need to select at least one tag to get personalized destination recommendations!
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-center gap-4 mt-8">
                <button
                  onClick={() => setStep('group-budget')}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  Back
                </button>
                <button
                  onClick={searchDestinations}
                  disabled={isLoading}
                  className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 disabled:from-gray-400 disabled:to-gray-400 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:hover:scale-100"
                >
                  {isLoading ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      Searching...
                    </>
                  ) : (
                    <>
                      <Search className="w-5 h-5" />
                      Find Destinations
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Results */}
          {step === 'results' && (
            <div className="animate-fadeIn" data-results-section>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  🎯 Perfect Destinations for You!
                </h3>
                <p className="text-gray-600">
                  Top recommendations based on your {selectedCategory} preferences
                </p>
              </div>

              <div className="space-y-8">
                {results.map((destination, index) => (
                  <div
                    key={destination.ID}
                    className={`bg-gradient-to-br from-white via-purple-50 to-pink-50 rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-fadeIn border-2 cursor-pointer ${
                      destination.score > 0 ? 'border-green-200 hover:border-green-300' : 'border-purple-200 hover:border-purple-300'
                    }`}
                    style={{ animationDelay: `${index * 150}ms` }}
                    onClick={() => handleDestinationClick(destination)}
                  >
                    {/* Large destination image */}
                    <div className="relative h-64 md:h-80 overflow-hidden">
                      <img
                        src={destination.ImageURL}
                        alt={destination.Name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          console.error(`Failed to load image for ${destination.Name}:`, destination.ImageURL);
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                      
                      {/* Popular destination badge */}
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                        ⭐ Recommended
                      </div>

                      {/* Click to view itinerary hint */}
                      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm text-purple-700 px-3 py-2 rounded-full font-semibold text-sm shadow-lg">
                        📅 Click for itinerary
                      </div>
                    </div>

                    <div className="p-6 md:p-8">
                      {/* Destination name with location pin */}
                      <div className="flex items-center gap-3 mb-4">
                        <MapPin className="w-6 h-6 text-purple-600 flex-shrink-0" />
                        <h4 className="text-2xl md:text-3xl font-bold text-gray-800">
                          {destination.Name}
                        </h4>
                      </div>

                      {/* Category label */}
                      <div className="mb-4">
                        <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm ${
                          destination.Category === 'International' 
                            ? 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700' 
                            : 'bg-gradient-to-r from-orange-100 to-red-100 text-orange-700'
                        }`}>
                          {destination.Category === 'International' ? '🌐' : '🇮🇳'} {destination.Category}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-gray-700 text-lg leading-relaxed mb-6">
                        {destination.Description}
                      </p>

                      {/* All destination tags */}
                      <div className="mb-6">
                        <p className="text-sm font-semibold text-gray-700 mb-3">
                          🏷️ Available experiences:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {destination.Tags.split(',').map((tag, tagIndex) => {
                            const cleanTag = tag.trim();
                            const isMatching = destination.matchingTags.some(mt => 
                              mt.toLowerCase() === cleanTag.toLowerCase()
                            );
                            
                            return (
                              <span
                                key={tagIndex}
                                className={`inline-flex items-center gap-1 px-3 py-2 text-sm font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-md ${
                                  isMatching
                                    ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 ring-2 ring-green-200 shadow-md'
                                    : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600'
                                }`}
                              >
                                {getTagEmoji(cleanTag)} {cleanTag}
                                {isMatching && <span className="text-green-600">✓</span>}
                              </span>
                            );
                          })}
                        </div>
                      </div>

                      {/* Star rating */}
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Traveler Rating</p>
                          {renderStarRating(destination.rating)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-8">
                <button
                  onClick={resetFlow}
                  className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  🔄 Search Again
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Itinerary Modal */}
      {showItinerary && selectedDestination && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="relative p-6 border-b border-gray-200">
              <button
                onClick={closeItinerary}
                className="absolute top-4 right-4 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-300"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">
                    3-Day Itinerary for {selectedDestination.Name}
                  </h3>
                  <p className="text-gray-600">
                    Your perfect adventure awaits!
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Destination Image */}
              <div className="mb-6 rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={selectedDestination.ImageURL}
                  alt={selectedDestination.Name}
                  className="w-full h-48 object-cover"
                />
              </div>

              {/* Itinerary Days */}
              <div className="space-y-6">
                {generateItinerary(selectedDestination).map((day, index) => (
                  <div key={day.day} className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">{day.day}</span>
                      </div>
                      <h4 className="text-xl font-bold text-gray-800">
                        Day {day.day}
                      </h4>
                    </div>
                    
                    <div className="space-y-3">
                      {day.activities.map((activity, actIndex) => (
                        <div key={actIndex} className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center mt-1 shadow-sm">
                            <Clock className="w-3 h-3 text-purple-600" />
                          </div>
                          <p className="text-gray-700 leading-relaxed">
                            {activity}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Fun Closing Line */}
              <div className="mt-8 p-6 bg-gradient-to-r from-purple-100 via-pink-100 to-purple-100 rounded-2xl text-center">
                <p className="text-lg font-bold text-purple-700">
                  {getFunnyClosingLine(selectedDestination)}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center gap-4 mt-6">
                <button
                  onClick={closeItinerary}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  Close
                </button>
                <button
                  onClick={resetFlow}
                  className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  🔄 Plan Another Trip
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default TravelRecommendationFlow;