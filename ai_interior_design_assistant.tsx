import React, { useState } from 'react';
import { Home, Palette, Layout, Lightbulb, Sofa, Camera, Sparkles, ArrowRight } from 'lucide-react';

const InteriorDesignAssistant = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [roomType, setRoomType] = useState('');
  const [stylePreference, setStylePreference] = useState('');
  const [colorScheme, setColorScheme] = useState('');
  const [budget, setBudget] = useState('');
  const [recommendations, setRecommendations] = useState(null);

  const roomTypes = [
    'Living Room', 'Bedroom', 'Kitchen', 'Bathroom', 'Dining Room', 
    'Home Office', 'Kids Room', 'Guest Room'
  ];

  const styles = [
    'Modern', 'Scandinavian', 'Industrial', 'Bohemian', 'Traditional',
    'Minimalist', 'Mid-Century Modern', 'Farmhouse', 'Art Deco', 'Eclectic'
  ];

  const colorSchemes = [
    'Neutral & Warm', 'Bold & Vibrant', 'Monochromatic', 'Earthy Tones',
    'Pastel & Soft', 'Black & White', 'Blue & White', 'Green & Natural'
  ];

  const budgetRanges = ['Under $1,000', '$1,000-$5,000', '$5,000-$15,000', '$15,000+'];

  const generateRecommendations = () => {
    if (!roomType || !stylePreference || !colorScheme || !budget) {
      alert('Please fill in all fields to get personalized recommendations!');
      return;
    }

    const recommendations = {
      colors: getColorRecommendations(colorScheme, stylePreference),
      furniture: getFurnitureRecommendations(roomType, stylePreference, budget),
      lighting: getLightingRecommendations(roomType, stylePreference),
      decor: getDecorRecommendations(stylePreference, colorScheme),
      layout: getLayoutTips(roomType)
    };

    setRecommendations(recommendations);
    setActiveTab('recommendations');
  };

  const getColorRecommendations = (scheme, style) => {
    const colorMap = {
      'Neutral & Warm': ['Warm white', 'Beige', 'Soft gray', 'Cream'],
      'Bold & Vibrant': ['Deep teal', 'Mustard yellow', 'Coral', 'Navy blue'],
      'Monochromatic': ['Charcoal', 'Medium gray', 'Light gray', 'White'],
      'Earthy Tones': ['Terracotta', 'Forest green', 'Warm brown', 'Sand'],
      'Pastel & Soft': ['Blush pink', 'Sage green', 'Lavender', 'Butter yellow'],
      'Black & White': ['Pure white', 'Charcoal black', 'Light gray', 'Cream'],
      'Blue & White': ['Navy blue', 'Sky blue', 'Crisp white', 'Light blue'],
      'Green & Natural': ['Forest green', 'Sage', 'Natural wood', 'Cream white']
    };
    return colorMap[scheme] || ['White', 'Gray', 'Beige', 'Black'];
  };

  const getFurnitureRecommendations = (room, style, budget) => {
    const furnitureMap = {
      'Living Room': ['Comfortable sofa', 'Coffee table', 'Accent chairs', 'Entertainment unit', 'Area rug'],
      'Bedroom': ['Platform bed', 'Nightstands', 'Dresser', 'Reading chair', 'Full-length mirror'],
      'Kitchen': ['Kitchen island', 'Bar stools', 'Pendant lighting', 'Open shelving', 'Dining table'],
      'Bathroom': ['Vanity cabinet', 'Mirror with lighting', 'Storage baskets', 'Shower curtain', 'Bath mat'],
      'Dining Room': ['Dining table', 'Dining chairs', 'Sideboard', 'Chandelier', 'Area rug'],
      'Home Office': ['Ergonomic desk', 'Office chair', 'Bookshelf', 'Task lighting', 'Storage solutions']
    };
    return furnitureMap[room] || ['Essential furniture pieces for your space'];
  };

  const getLightingRecommendations = (room, style) => {
    return [
      'Layer different types of lighting (ambient, task, accent)',
      'Consider natural light patterns throughout the day',
      'Use warm white bulbs (2700K-3000K) for cozy spaces',
      'Add dimmer switches for flexibility',
      'Include table lamps for ambient lighting'
    ];
  };

  const getDecorRecommendations = (style, colors) => {
    return [
      'Add plants for natural elements and air purification',
      'Use throw pillows and blankets for texture and color',
      'Incorporate artwork that reflects your personality',
      'Add mirrors to enhance natural light and space',
      'Include personal items and meaningful objects'
    ];
  };

  const getLayoutTips = (room) => {
    const layoutMap = {
      'Living Room': [
        'Create conversation areas with furniture groupings',
        'Ensure clear pathways through the space',
        'Position seating to face each other or the focal point',
        'Leave 18 inches between sofa and coffee table'
      ],
      'Bedroom': [
        'Place bed away from direct sunlight',
        'Ensure bedside tables are within arm\'s reach',
        'Create a reading nook if space allows',
        'Keep pathways clear around the bed'
      ],
      'Kitchen': [
        'Follow the work triangle principle (sink, stove, fridge)',
        'Ensure adequate counter space for food prep',
        'Keep frequently used items within easy reach',
        'Consider traffic flow through the kitchen'
      ]
    };
    return layoutMap[room] || ['Consider functionality and flow in your layout'];
  };

  const TabButton = ({ id, icon: Icon, label, isActive }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
        isActive 
          ? 'bg-blue-600 text-white shadow-lg' 
          : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
      }`}
    >
      <Icon size={20} />
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-full">
              <Home className="text-white" size={32} />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI Interior Design Assistant
            </h1>
          </div>
          <p className="text-gray-600 text-lg">Transform your space with personalized design recommendations</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          <TabButton id="home" icon={Home} label="Home" isActive={activeTab === 'home'} />
          <TabButton id="room-planner" icon={Layout} label="Room Planner" isActive={activeTab === 'room-planner'} />
          <TabButton id="color-picker" icon={Palette} label="Colors" isActive={activeTab === 'color-picker'} />
          <TabButton id="style-guide" icon={Sparkles} label="Style Guide" isActive={activeTab === 'style-guide'} />
          <TabButton id="recommendations" icon={Lightbulb} label="My Recommendations" isActive={activeTab === 'recommendations'} />
        </div>

        {/* Content Areas */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {activeTab === 'home' && (
            <div className="text-center">
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full text-blue-800 font-medium mb-6">
                  <Sparkles size={20} />
                  Welcome to Your Design Journey
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Let's Design Your Dream Space</h2>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                  Our AI-powered assistant will help you create beautiful, functional spaces tailored to your style, 
                  budget, and needs. Get started by exploring our tools or jump straight to the Room Planner!
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
                  <Layout className="text-blue-600 mb-4 mx-auto" size={48} />
                  <h3 className="font-bold text-lg mb-2">Room Planning</h3>
                  <p className="text-gray-600">Get layout suggestions and furniture recommendations</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl">
                  <Palette className="text-purple-600 mb-4 mx-auto" size={48} />
                  <h3 className="font-bold text-lg mb-2">Color Harmony</h3>
                  <p className="text-gray-600">Discover perfect color combinations for your space</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
                  <Sparkles className="text-green-600 mb-4 mx-auto" size={48} />
                  <h3 className="font-bold text-lg mb-2">Style Matching</h3>
                  <p className="text-gray-600">Find your design style and get curated suggestions</p>
                </div>
              </div>

              <button
                onClick={() => setActiveTab('room-planner')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-lg transition-all flex items-center gap-2 mx-auto"
              >
                Start Planning Your Room
                <ArrowRight size={20} />
              </button>
            </div>
          )}

          {activeTab === 'room-planner' && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-center">Room Planning Assistant</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Room Type</label>
                    <select
                      value={roomType}
                      onChange={(e) => setRoomType(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select a room type</option>
                      {roomTypes.map(room => (
                        <option key={room} value={room}>{room}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Design Style</label>
                    <select
                      value={stylePreference}
                      onChange={(e) => setStylePreference(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Choose your style</option>
                      {styles.map(style => (
                        <option key={style} value={style}>{style}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Color Preference</label>
                    <select
                      value={colorScheme}
                      onChange={(e) => setColorScheme(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select color scheme</option>
                      {colorSchemes.map(scheme => (
                        <option key={scheme} value={scheme}>{scheme}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range</label>
                    <select
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select budget range</option>
                      {budgetRanges.map(range => (
                        <option key={range} value={range}>{range}</option>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={generateRecommendations}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <Lightbulb size={20} />
                    Generate Design Recommendations
                  </button>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="font-bold text-lg mb-4">Design Tips</h3>
                  <div className="space-y-3 text-sm text-gray-600">
                    <p>• Consider the room's natural light when choosing colors</p>
                    <p>• Measure your space before selecting furniture</p>
                    <p>• Mix textures and patterns for visual interest</p>
                    <p>• Leave some negative space - don't overcrowd</p>
                    <p>• Invest in key pieces that will last</p>
                    <p>• Add personal touches that reflect your personality</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'color-picker' && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-center">Color Harmony Guide</h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {colorSchemes.map(scheme => (
                  <div
                    key={scheme}
                    className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      colorScheme === scheme ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setColorScheme(scheme)}
                  >
                    <div className="flex space-x-2 mb-3">
                      {getColorRecommendations(scheme, '').slice(0, 4).map((color, index) => (
                        <div
                          key={index}
                          className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                          style={{
                            backgroundColor: color.toLowerCase().includes('white') ? '#ffffff' :
                                           color.toLowerCase().includes('black') ? '#000000' :
                                           color.toLowerCase().includes('gray') ? '#6b7280' :
                                           color.toLowerCase().includes('blue') ? '#3b82f6' :
                                           color.toLowerCase().includes('green') ? '#10b981' :
                                           color.toLowerCase().includes('yellow') ? '#f59e0b' :
                                           color.toLowerCase().includes('red') ? '#ef4444' :
                                           color.toLowerCase().includes('purple') ? '#8b5cf6' :
                                           color.toLowerCase().includes('pink') ? '#ec4899' :
                                           color.toLowerCase().includes('brown') ? '#a3765b' : '#6b7280'
                          }}
                        />
                      ))}
                    </div>
                    <h3 className="font-medium text-sm">{scheme}</h3>
                  </div>
                ))}
              </div>

              {colorScheme && (
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="font-bold text-lg mb-4">Colors for "{colorScheme}"</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {getColorRecommendations(colorScheme, '').map((color, index) => (
                      <div key={index} className="text-center">
                        <div
                          className="w-20 h-20 rounded-lg border-2 border-white shadow-md mx-auto mb-2"
                          style={{
                            backgroundColor: color.toLowerCase().includes('white') ? '#ffffff' :
                                           color.toLowerCase().includes('black') ? '#000000' :
                                           color.toLowerCase().includes('gray') ? '#6b7280' :
                                           color.toLowerCase().includes('blue') ? '#3b82f6' :
                                           color.toLowerCase().includes('green') ? '#10b981' :
                                           color.toLowerCase().includes('yellow') ? '#f59e0b' :
                                           color.toLowerCase().includes('red') ? '#ef4444' :
                                           color.toLowerCase().includes('purple') ? '#8b5cf6' :
                                           color.toLowerCase().includes('pink') ? '#ec4899' :
                                           color.toLowerCase().includes('brown') ? '#a3765b' : '#6b7280'
                          }}
                        />
                        <p className="text-sm font-medium">{color}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'style-guide' && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-center">Interior Design Styles</h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {styles.map(style => (
                  <div
                    key={style}
                    className={`p-6 border-2 rounded-xl cursor-pointer transition-all ${
                      stylePreference === style ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setStylePreference(style)}
                  >
                    <h3 className="font-bold text-lg mb-3">{style}</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {style === 'Modern' && 'Clean lines, minimal clutter, neutral colors with bold accents'}
                      {style === 'Scandinavian' && 'Light woods, whites, cozy textiles, functional design'}
                      {style === 'Industrial' && 'Raw materials, metal accents, exposed brick, urban feel'}
                      {style === 'Bohemian' && 'Eclectic mix, vibrant colors, layered textiles, global influences'}
                      {style === 'Traditional' && 'Classic furniture, rich colors, elegant details, timeless appeal'}
                      {style === 'Minimalist' && 'Less is more, clean spaces, neutral palette, functional pieces'}
                      {style === 'Mid-Century Modern' && 'Retro furniture, bold patterns, warm woods, geometric shapes'}
                      {style === 'Farmhouse' && 'Rustic charm, natural materials, vintage pieces, cozy atmosphere'}
                      {style === 'Art Deco' && 'Glamorous details, metallic finishes, bold geometry, luxury feel'}
                      {style === 'Eclectic' && 'Mix of styles, personal collections, creative combinations, unique character'}
                    </p>
                    <div className="text-xs text-gray-500">
                      Key elements: 
                      {style === 'Modern' && ' Glass, steel, concrete, open floor plans'}
                      {style === 'Scandinavian' && ' Hygge, natural light, simple forms'}
                      {style === 'Industrial' && ' Metal, leather, dark colors, factory elements'}
                      {style === 'Bohemian' && ' Patterns, plants, vintage finds, artistic pieces'}
                      {style === 'Traditional' && ' Symmetry, rich fabrics, antiques, formal layouts'}
                      {style === 'Minimalist' && ' White spaces, hidden storage, quality over quantity'}
                      {style === 'Mid-Century Modern' && ' Teak wood, bold colors, iconic furniture'}
                      {style === 'Farmhouse' && ' Shiplap, barn doors, mason jars, natural textures'}
                      {style === 'Art Deco' && ' Gold accents, velvet, mirrors, dramatic lighting'}
                      {style === 'Eclectic' && ' Personal style, mixed periods, collected over time'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'recommendations' && recommendations && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-center">Your Personalized Design Recommendations</h2>
              
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl mb-8">
                <h3 className="font-bold text-lg mb-2">Your Selections:</h3>
                <div className="flex flex-wrap gap-4 text-sm">
                  <span className="bg-blue-100 px-3 py-1 rounded-full">🏠 {roomType}</span>
                  <span className="bg-purple-100 px-3 py-1 rounded-full">🎨 {stylePreference}</span>
                  <span className="bg-green-100 px-3 py-1 rounded-full">🌈 {colorScheme}</span>
                  <span className="bg-yellow-100 px-3 py-1 rounded-full">💰 {budget}</span>
                </div>
              </div>

              <div className="space-y-8">
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <Palette className="text-blue-600" size={20} />
                    Recommended Colors
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {recommendations.colors.map((color, index) => (
                      <div key={index} className="text-center">
                        <div
                          className="w-16 h-16 rounded-lg border-2 border-white shadow-md mx-auto mb-2"
                          style={{
                            backgroundColor: color.toLowerCase().includes('white') ? '#ffffff' :
                                           color.toLowerCase().includes('black') ? '#000000' :
                                           color.toLowerCase().includes('gray') ? '#6b7280' :
                                           color.toLowerCase().includes('blue') ? '#3b82f6' :
                                           color.toLowerCase().includes('green') ? '#10b981' :
                                           color.toLowerCase().includes('yellow') ? '#f59e0b' :
                                           color.toLowerCase().includes('red') ? '#ef4444' :
                                           color.toLowerCase().includes('purple') ? '#8b5cf6' :
                                           color.toLowerCase().includes('pink') ? '#ec4899' :
                                           color.toLowerCase().includes('brown') ? '#a3765b' : '#6b7280'
                          }}
                        />
                        <p className="text-xs font-medium">{color}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <Sofa className="text-green-600" size={20} />
                    Furniture Essentials
                  </h3>
                  <ul className="grid md:grid-cols-2 gap-2">
                    {recommendations.furniture.map((item, index) => (
                      <li key={index} className="flex items-center gap-2 text-gray-700">
                        <div className="w-2 h-2 bg-green-400 rounded-full" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <Lightbulb className="text-yellow-600" size={20} />
                    Lighting Suggestions
                  </h3>
                  <ul className="space-y-2">
                    {recommendations.lighting.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-700">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <Sparkles className="text-purple-600" size={20} />
                    Decor & Styling
                  </h3>
                  <ul className="space-y-2">
                    {recommendations.decor.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-700">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <Layout className="text-indigo-600" size={20} />
                    Layout Tips
                  </h3>
                  <ul className="space-y-2">
                    {recommendations.layout.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-700">
                        <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 flex-shrink-0" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 text-center">
                <button
                  onClick={() => {
                    setRoomType('');
                    setStylePreference('');
                    setColorScheme('');
                    setBudget('');
                    setRecommendations(null);
                    setActiveTab('room-planner');
                  }}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-bold hover:shadow-lg transition-all"
                >
                  Plan Another Room
                </button>
              </div>
            </div>
          )}

          {activeTab === 'recommendations' && !recommendations && (
            <div className="text-center py-12">
              <Lightbulb className="text-gray-400 mx-auto mb-4" size={64} />
              <h3 className="text-xl font-bold text-gray-600 mb-2">No Recommendations Yet</h3>
              <p className="text-gray-500 mb-6">Complete the Room Planner to get your personalized design recommendations!</p>
              <button
                onClick={() => setActiveTab('room-planner')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg transition-all"
              >
                Start Room Planning
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InteriorDesignAssistant;