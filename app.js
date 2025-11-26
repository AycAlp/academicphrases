import React, { useState, useEffect } from 'react';
import { Heart, ChevronDown, ChevronUp, Search, Star, Book, X } from 'lucide-react';

const AcademicPhrasesApp = () => {
  const [favorites, setFavorites] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('browse');
  const [selectedPhrase, setSelectedPhrase] = useState(null);

  // Load favorites from storage
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const result = await window.storage.get('academic-favorites');
        if (result && result.value) {
          setFavorites(JSON.parse(result.value));
        }
      } catch (error) {
        console.log('No favorites yet');
      }
    };
    loadFavorites();
  }, []);

  // Sample sentences for each phrase pattern
  const getSampleSentence = (phrase) => {
    const samples = {
      'is fundamental to': 'Effective communication is fundamental to successful teamwork in any organization.',
      'has a pivotal role in': 'Technology has a pivotal role in shaping modern education systems.',
      'is frequently prescribed for': 'This medication is frequently prescribed for patients with chronic pain.',
      'is fast becoming a key instrument in': 'Artificial intelligence is fast becoming a key instrument in medical diagnosis.',
      'plays a critical role in the maintenance of': 'Regular exercise plays a critical role in the maintenance of cardiovascular health.',
      'have emerged as powerful platforms for': 'Social media networks have emerged as powerful platforms for political mobilization.',
      'is essential for a wide range of': 'Digital literacy is essential for a wide range of professional careers.',
      'can play an important role in addressing the issue of': 'Renewable energy can play an important role in addressing the issue of climate change.',
      'plays a crucial role in regulating': 'The liver plays a crucial role in regulating blood sugar levels.',
      'is a common condition which has considerable impact on': 'Depression is a common condition which has considerable impact on quality of life.',
      'has become a central issue for': 'Data privacy has become a central issue for technology companies.',
      'is among the most important factors for': 'Early childhood education is among the most important factors for long-term academic success.',
      'is important for a wide range of': 'Statistical analysis is important for a wide range of scientific research.',
      'is a growing body of literature that recognises the importance of': 'There is a growing body of literature that recognises the importance of mental health in the workplace.',
      'is an important component in': 'Carbon dioxide is an important component in the Earth\'s climate system.',
      'has been thought of as a key factor in': 'Investment in infrastructure has been thought of as a key factor in economic development.',
      'are one of the most widely used': 'Antibiotics are one of the most widely used groups of medications in modern medicine.',
      
      'A key aspect of': 'A key aspect of sustainable development is balancing economic growth with environmental protection.',
      'is of interest because': 'This phenomenon is of interest because it challenges existing theoretical frameworks.',
      'is a classic problem in': 'The traveling salesman problem is a classic problem in computer science.',
      'A primary concern of': 'A primary concern of urban planning is ensuring adequate housing for all residents.',
      'is a dominant feature of': 'High unemployment is a dominant feature of post-industrial economies.',
      'is an important aspect of': 'Cultural sensitivity is an important aspect of international business.',
      'is a fundamental property of': 'Plasticity is a fundamental property of neural networks.',
      'are central to': 'The concepts of supply and demand are central to economic theory.',
      'is at the heart of our understanding of': 'The scientific method is at the heart of our understanding of the natural world.',
      'is a continuing concern within': 'Investigating gender inequality is a continuing concern within sociology.',
      'is a major area of interest within': 'Machine learning is a major area of interest within artificial intelligence.',
      'has been studied by many researchers using': 'Climate change has been studied by many researchers using various modeling techniques.',
      'has been an object of research since': 'Quantum mechanics has been an object of research since the early 20th century.',
      'has been the subject of many classic studies in': 'Memory retention has been the subject of many classic studies in cognitive psychology.',
      'has been instrumental in our understanding of': 'The discovery of DNA structure has been instrumental in our understanding of genetics.',
      'provides a useful account of how': 'The theory of evolution provides a useful account of how species adapt to their environments.',
      'is the concept of': 'Central to the entire discipline of economics is the concept of scarcity.',
      'is an increasingly important area in': 'Cybersecurity is an increasingly important area in information technology.',
      'has long been a question of great interest in': 'The nature versus nurture debate has long been a question of great interest in psychology.',
      
      'have subscribed to the belief that': 'Traditionally, educators have subscribed to the belief that rote learning is essential.',
      'was one of the most important events of': 'The oil crisis was one of the most important events of the 1970s.',
      'there has been an increasing interest in': 'In recent years, there has been an increasing interest in sustainable architecture.',
      'seems to have heightened the need for': 'Recent developments in cybersecurity seem to have heightened the need for stronger regulations.',
      'have seen a growing trend towards': 'The last two decades have seen a growing trend towards remote work arrangements.',
      'have shown an increased interest in': 'Recently, researchers have shown an increased interest in gut microbiome research.',
      'has been a dramatic increase in': 'Over the past century, there has been a dramatic increase in global life expectancy.',
      'have led to a proliferation of studies that': 'Recent trends in gene editing have led to a proliferation of studies that explore CRISPR applications.',
      'proved an important': 'The epistolary novel proved an important literary genre in the early Victorian period.',
      'has seen the rapid development of': 'The past decade has seen the rapid development of renewable energy technologies.',
      'has been attracting a lot of interest': 'Since it was reported in 2005, graphene has been attracting a lot of interest.',
      'has been presented around the theme of': 'A considerable literature has been presented around the theme of organizational culture.',
      
      'One of the main obstacles': 'One of the main obstacles to implementing universal healthcare is the financial burden on governments.',
      'One of the greatest challenges': 'One of the greatest challenges facing modern agriculture is water scarcity.',
      'A key issue is': 'A key issue is the safe disposal of nuclear waste materials.',
      'The main disadvantage of': 'The main disadvantage of solar energy is its dependence on weather conditions.',
      'is associated with increased risk of': 'Smoking is associated with increased risk of cardiovascular disease.',
      'is a common disorder characterised by': 'Anxiety is a common disorder characterised by persistent worry and fear.',
      'can impair': 'It is now well established that chronic stress can impair immune system function.',
      'is a common, chronic disease of': 'Asthma is a common, chronic disease of childhood affecting millions globally.',
      'has led to the declines in': 'Habitat loss has led to the declines in the populations of many bird species.',
      'is a growing public health concern': 'Antibiotic resistance is a growing public health concern worldwide.',
      'is one of the most frequently stated problems with': 'Poor user interface is one of the most frequently stated problems with legacy software systems.',
      
      'A much debated question seems to be whether': 'A much debated question seems to be whether artificial intelligence will replace human workers.',
      'One major issue in early': 'One major issue in early stem cell research concerned ethical considerations.',
      'there has been little agreement on what': 'To date there has been little agreement on what constitutes effective teacher training.',
      'has grown in importance in light of': 'The issue has grown in importance in light of recent climate-related disasters.',
      'the relative importance of': 'In the literature on child development, the relative importance of genetics is debated.',
      'has already drawn attention to the paradox in': 'One observer has already drawn attention to the paradox in modern consumer behavior.',
      'have been raised about the use of': 'Questions have been raised about the use of animal subjects in cosmetics testing.',
      'a debate is taking place between': 'In many universities, a debate is taking place between traditionalists and reformers concerning curriculum design.',
      'continues about the best strategies for': 'Debate continues about the best strategies for the management of chronic pain.',
      'has recently been challenged by': 'This concept has recently been challenged by neuroscience studies demonstrating brain plasticity.',
      
      'This paper argues that': 'This paper argues that social media has fundamentally altered political discourse.',
      'The central thesis of this paper is that': 'The central thesis of this paper is that climate change requires immediate global action.',
      
      'The specific objective of this study was to': 'The specific objective of this study was to examine the effects of sleep deprivation on cognitive performance.',
      'An objective of this study was to investigate': 'An objective of this study was to investigate the relationship between diet and heart disease.',
      'This thesis will examine': 'This thesis will examine the way in which the digital revolution has transformed education.',
      'set out to investigate': 'This study set out to investigate the usefulness of telemedicine in rural healthcare.',
      'seeks to explain': 'This dissertation seeks to explain the development of democratic institutions in post-colonial states.',
      'seeks to examine': 'This case study seeks to examine the changing nature of workplace dynamics.',
      'are to determine whether': 'The objectives of this research are to determine whether remote learning is as effective as traditional methods.',
      
      'will refer to': 'Throughout this paper, the term "digital native" will refer to individuals born after 1990.',
      'can be defined as follows': 'According to Smith (2002), sustainability can be defined as follows: "meeting present needs without compromising future generations."',
      'will be used to refer to': 'In this article, the abbreviation AI will be used to refer to artificial intelligence.',
      'is a relatively new name for': 'The term "gig economy" is a relatively new name for freelance work arrangements.'
    };

    // Try to find exact match first
    for (let key in samples) {
      if (phrase.includes(key)) {
        return samples[key];
      }
    }
    
    // Return a generic sample if no match found
    return `This phrase can be used to ${phrase.toLowerCase()} in academic writing contexts.`;
  };

  const phrasesData = [
    {
      category: "Establishing Topic Importance for the World",
      phrases: [
        "X is fundamental to …",
        "X has a pivotal role in …",
        "X is frequently prescribed for …",
        "X is fast becoming a key instrument in ...",
        "X plays a critical role in the maintenance of …",
        "Xs have emerged as powerful platforms for …",
        "X is essential for a wide range of technologies.",
        "X can play an important role in addressing the issue of …",
        "There is evidence that X plays a crucial role in regulating …",
        "X is a common condition which has considerable impact on …",
        "In the new global economy, X has become a central issue for ...",
        "Evidence suggests that X is among the most important factors for …",
        "X is important for a wide range of scientific and industrial processes.",
        "There is a growing body of literature that recognises the importance of …",
        "X is an important component in the climate system, and plays a key role in Y.",
        "In the history of development economics, X has been thought of as a key factor in …",
        "Xs are one of the most widely used groups of Y and have been extensively used for …"
      ]
    },
    {
      category: "Establishing Topic Importance for the Discipline",
      phrases: [
        "A key aspect of X is …",
        "X is of interest because …",
        "X is a classic problem in …",
        "A primary concern of X is …",
        "X is a dominant feature of …",
        "X is an important aspect of …",
        "X is a fundamental property of …",
        "The concepts of X and Y are central to …",
        "X is at the heart of our understanding of …",
        "Investigating X is a continuing concern within …",
        "X is a major area of interest within the field of …",
        "X has been studied by many researchers using …",
        "X has been an object of research since the 1960s.",
        "X has been the subject of many classic studies in …",
        "X has been instrumental in our understanding of …",
        "The theory of X provides a useful account of how …",
        "Central to the entire discipline of X is the concept of …",
        "X is an increasingly important area in applied linguistics.",
        "X has long been a question of great interest in a wide range of fields."
      ]
    },
    {
      category: "Establishing Topic Importance (Time Frame)",
      phrases: [
        "Traditionally, Xs have subscribed to the belief that …",
        "One of the most important events of the 1970s was …",
        "In recent years, there has been an increasing interest in …",
        "Recent developments in X seems to have heightened the need for …",
        "The last two decades have seen a growing trend towards …",
        "Recently, researchers have shown an increased interest in ...",
        "Over the past century, there has been a dramatic increase in …",
        "Recent trends in X have led to a proliferation of studies that ...",
        "X proved an important literary genre in the early Y community.",
        "The past decade has seen the rapid development of X in many …",
        "Since it was reported in 2005, X has been attracting a lot of interest.",
        "A considerable literature has been presented around the theme of …"
      ]
    },
    {
      category: "Highlighting an Important Problem",
      phrases: [
        "One of the main obstacles …",
        "One of the greatest challenges …",
        "A key issue is the safe disposal of …",
        "The main disadvantage of X is that …",
        "X is associated with increased risk of …",
        "X is a common disorder characterised by …",
        "It is now well established that X can impair …",
        "X is a common, chronic disease of childhood.",
        "X has led to the declines in the populations of …",
        "X is a growing public health concern worldwide.",
        "X is one of the most frequently stated problems with …"
      ]
    },
    {
      category: "Highlighting a Controversy",
      phrases: [
        "A much debated question seems to be whether …",
        "One major issue in early X research concerned ...",
        "To date there has been little agreement on what ...",
        "The issue has grown in importance in light of recent ...",
        "In the literature on X, the relative importance of Y is debated.",
        "One observer has already drawn attention to the paradox in ...",
        "Questions have been raised about the use of animal subjects in ...",
        "In many Xs, a debate is taking place between Ys and Zs concerning ...",
        "Debate continues about the best strategies for the management of ...",
        "This concept has recently been challenged by X studies demonstrating ..."
      ]
    },
    {
      category: "Focus, Aim, and Argument",
      phrases: [
        "This paper argues that ...",
        "The central thesis of this paper is that ..."
      ]
    },
    {
      category: "Stating Research Purpose",
      phrases: [
        "The specific objective of this study was to …",
        "An objective of this study was to investigate ...",
        "This thesis will examine the way in which the ...",
        "This study set out to investigate the usefulness of ...",
        "This dissertation seeks to explain the development of ...",
        "This case study seeks to examine the changing nature of ...",
        "The objectives of this research are to determine whether ..."
      ]
    },
    {
      category: "Explaining Keywords and Defining Terms",
      phrases: [
        "Throughout this paper, the term X will refer to ...",
        "According to Smith (2002), X can be defined as follows: ' ... '",
        "In this article, the abbreviation XYZ will be used to refer to ...",
        "Throughout this dissertation, the term X will be used to refer to ...",
        "The term X is a relatively new name for ..., commonly referred to as ..."
      ]
    }
  ];

  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const addToFavorites = async (phrase, category) => {
    const newFavorite = {
      id: Date.now(),
      phrase,
      category,
      sample: getSampleSentence(phrase),
      addedAt: new Date().toISOString()
    };
    
    const updatedFavorites = [...favorites, newFavorite];
    setFavorites(updatedFavorites);
    
    try {
      await window.storage.set('academic-favorites', JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error('Failed to save favorite:', error);
    }
    
    setSelectedPhrase(newFavorite);
    setTimeout(() => setSelectedPhrase(null), 3000);
  };

  const removeFromFavorites = async (id) => {
    const updatedFavorites = favorites.filter(f => f.id !== id);
    setFavorites(updatedFavorites);
    
    try {
      await window.storage.set('academic-favorites', JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error('Failed to remove favorite:', error);
    }
  };

  const isFavorite = (phrase) => {
    return favorites.some(f => f.phrase === phrase);
  };

  const filteredPhrases = phrasesData.map(category => ({
    ...category,
    phrases: category.phrases.filter(phrase =>
      phrase.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.phrases.length > 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-indigo-600 text-white p-4 shadow-lg">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Book className="w-7 h-7" />
          Academic Phrases for the Introduction
        </h1>
        <p className="text-indigo-100 text-sm mt-1">Master introduction writing with key phrases</p>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white shadow-sm border-b">
        <div className="flex">
          <button
            onClick={() => setActiveTab('browse')}
            className={`flex-1 py-3 px-4 font-medium transition-colors ${
              activeTab === 'browse'
                ? 'text-indigo-600 border-b-2 border-indigo-600'
                : 'text-gray-600'
            }`}
          >
            Browse Phrases
          </button>
          <button
            onClick={() => setActiveTab('favorites')}
            className={`flex-1 py-3 px-4 font-medium transition-colors flex items-center justify-center gap-2 ${
              activeTab === 'favorites'
                ? 'text-indigo-600 border-b-2 border-indigo-600'
                : 'text-gray-600'
            }`}
          >
            <Star className="w-4 h-4" />
            My Favorites ({favorites.length})
          </button>
        </div>
      </div>

      {/* Success notification */}
      {selectedPhrase && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-xl animate-bounce">
          ✓ Added to favorites!
        </div>
      )}

      {/* Browse Tab */}
      {activeTab === 'browse' && (
        <div className="p-4">
          {/* Search Bar */}
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search phrases..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            {filteredPhrases.map((category, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleCategory(category.category)}
                  className="w-full px-4 py-4 flex items-center justify-between bg-gradient-to-r from-indigo-50 to-blue-50 hover:from-indigo-100 hover:to-blue-100 transition-colors"
                >
                  <span className="font-semibold text-gray-800 text-left">
                    {category.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-indigo-600 text-white px-2 py-1 rounded-full">
                      {category.phrases.length}
                    </span>
                    {expandedCategories[category.category] ? (
                      <ChevronUp className="w-5 h-5 text-indigo-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-indigo-600" />
                    )}
                  </div>
                </button>
                
                {expandedCategories[category.category] && (
                  <div className="p-3 space-y-2">
                    {category.phrases.map((phrase, pIdx) => (
                      <div
                        key={pIdx}
                        className="flex items-start justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <span className="text-gray-700 flex-1">{phrase}</span>
                        <button
                          onClick={() => addToFavorites(phrase, category.category)}
                          disabled={isFavorite(phrase)}
                          className={`ml-3 p-2 rounded-full transition-all ${
                            isFavorite(phrase)
                              ? 'bg-pink-100 text-pink-600 cursor-not-allowed'
                              : 'bg-white text-gray-400 hover:bg-pink-50 hover:text-pink-600'
                          }`}
                        >
                          <Heart
                            className="w-5 h-5"
                            fill={isFavorite(phrase) ? 'currentColor' : 'none'}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Favorites Tab */}
      {activeTab === 'favorites' && (
        <div className="p-4">
          {favorites.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No favorites yet</p>
              <p className="text-gray-400 text-sm mt-2">
                Add phrases from the Browse tab to see them here
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {favorites.map((favorite) => (
                <div key={favorite.id} className="bg-white rounded-lg shadow-md p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="text-xs text-indigo-600 font-medium mb-1">
                        {favorite.category}
                      </div>
                      <div className="text-gray-800 font-medium mb-2">
                        {favorite.phrase}
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromFavorites(favorite.id)}
                      className="ml-3 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="bg-indigo-50 rounded-lg p-3 border-l-4 border-indigo-400">
                    <div className="text-xs text-indigo-700 font-semibold mb-1">
                      EXAMPLE:
                    </div>
                    <div className="text-sm text-gray-700 italic">
                      {favorite.sample}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AcademicPhrasesApp;