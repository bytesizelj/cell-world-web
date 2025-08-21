'use client';

import { useState } from 'react';
import { ArrowLeft, Star, Quote, ThumbsUp, Calendar, User } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
const Celly = dynamic(() => import('@/components/CellyAssistant'), { ssr: false });

export default function ReviewsPage() {
  const [filterRating, setFilterRating] = useState('all');

  // Sample reviews data - you can update these with real reviews
  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      date: "August 5, 2025",
      product: "iPhone 15 Pro",
      comment: "Excellent service! Got my new iPhone at a great price. The staff was very knowledgeable and helpful.",
      verified: true,
      helpful: 23
    },
    {
      id: 2,
      name: "Michael Chen",
      rating: 5,
      date: "August 5, 2025",
      product: "Marine GPS Navigator",
      comment: "Best marine equipment store in St. Vincent! Quality products and fair prices.",
      verified: true,
      helpful: 18
    },
    {
      id: 3,
      name: "Jessica Williams",
      rating: 4,
      date: "August 12, 2025",
      product: "Samsung Galaxy S24",
      comment: "Good selection of phones. Quick delivery service. Would recommend!",
      verified: true,
      helpful: 15
    },
    {
      id: 4,
      name: "David Thompson",
      rating: 5,
      date: "August 14, 2025",
      product: "Fishing Rod Professional",
      comment: "Top quality fishing gear! Been shopping here for years. Never disappointed.",
      verified: true,
      helpful: 31
    },
    {
      id: 5,
      name: "Maria Rodriguez",
      rating: 5,
      date: "August 15, 2025",
      product: "Boat Anchor Kit",
      comment: "Celly AI assistant helped me find exactly what I needed. Amazing technology!",
      verified: true,
      helpful: 27
    },
    {
      id: 6,
      name: "James Mitchell",
      rating: 4,
      date: "August 18, 2025",
      product: "Gaming Headset",
      comment: "Great gaming accessories selection. Fast service and competitive prices.",
      verified: true,
      helpful: 12
    }
  ];

  // Calculate stats
  const totalReviews = reviews.length;
  const averageRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1);
  const ratingCounts: Record<number, number> = {
  5: reviews.filter(r => r.rating === 5).length,
  4: reviews.filter(r => r.rating === 4).length,
  3: reviews.filter(r => r.rating === 3).length,
  2: reviews.filter(r => r.rating === 2).length,
  1: reviews.filter(r => r.rating === 1).length,
};

  // Filter reviews
  const filteredReviews = filterRating === 'all' 
    ? reviews 
    : reviews.filter(r => r.rating === parseInt(filterRating));

  return (
  <div className="relative min-h-screen bg-black">
    {/* Background Image */}
<div 
  className="fixed inset-0 z-0"
  style={{
    backgroundImage: 'url(/images/reviews/reviews-bg.jpg)',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    opacity: 0.6  // Increased from 0.3 to 0.6 for clearer image
  }}
/>
    
    {/* Background gradient overlay */}
    <div className="fixed inset-0 z-0">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-yellow-900/20" />
    </div>

      {/* Navigation */}
      <nav className="relative z-20 flex justify-between items-center p-6 bg-black/50 backdrop-blur-sm">
        <div className="flex items-center space-x-4">
          <Link 
            href="/" 
            className="flex items-center space-x-2 text-white hover:text-yellow-400 transition-colors duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
          
          <img 
            src="/images/cell-world-logo.png"
            alt="Cell World"
            style={{ 
              height: '80px',
              width: 'auto', 
              objectFit: 'contain',
              filter: 'drop-shadow(0 0 2px rgba(255,255,255,0.8))'
            }}
          />
        </div>
      </nav>

      {/* Header */}
      <div className="relative z-10 text-center py-8 px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4"
            style={{ 
              color: '#FFD700',
              textShadow: '0 4px 20px rgba(255, 215, 0, 0.4), 0 2px 8px rgba(0,0,0,0.9)' 
            }}>
          Customer Reviews
        </h1>
        <p className="text-lg text-gray-300">Real feedback from our valued customers</p>
      </div>

      {/* Stats Section */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 mb-8">
        <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-xl p-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Overall Rating */}
            <div className="text-center">
              <div className="text-5xl font-bold text-yellow-400 mb-2">{averageRating}</div>
              <div className="flex justify-center mb-2">
                {[1,2,3,4,5].map(i => (
                  <Star 
                    key={i} 
                    className={`w-6 h-6 ${i <= Math.round(parseFloat(averageRating)) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`}
                  />
                ))}
              </div>
              <p className="text-gray-300">Based on {totalReviews} reviews</p>
            </div>

            {/* Rating Breakdown */}
            <div className="space-y-2">
              {[5,4,3,2,1].map(rating => (
                <div key={rating} className="flex items-center gap-2">
                  <span className="text-white w-4">{rating}</span>
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <div className="flex-1 bg-gray-700 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-yellow-400 h-full transition-all duration-500"
                      style={{ width: `${(ratingCounts[rating] / totalReviews) * 100}%` }}
                    />
                  </div>
                  <span className="text-gray-400 text-sm w-8">{ratingCounts[rating]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="relative z-10 flex justify-center mb-8">
        <div className="bg-black/50 backdrop-blur-sm rounded-full p-2 flex gap-2">
          <button
            onClick={() => setFilterRating('all')}
            className={`px-4 py-2 rounded-full transition-all ${
              filterRating === 'all' ? 'bg-yellow-500 text-black' : 'bg-gray-800/50 text-gray-300'
            }`}
          >
            All Reviews
          </button>
          <button
            onClick={() => setFilterRating('5')}
            className={`px-4 py-2 rounded-full transition-all ${
              filterRating === '5' ? 'bg-yellow-500 text-black' : 'bg-gray-800/50 text-gray-300'
            }`}
          >
            5 Stars
          </button>
          <button
            onClick={() => setFilterRating('4')}
            className={`px-4 py-2 rounded-full transition-all ${
              filterRating === '4' ? 'bg-yellow-500 text-black' : 'bg-gray-800/50 text-gray-300'
            }`}
          >
            4 Stars
          </button>
        </div>
      </div>

      {/* Reviews List */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 pb-20">
        <div className="space-y-6">
          {filteredReviews.map((review) => (
            <div 
              key={review.id}
              className="bg-gradient-to-br from-gray-900/60 to-gray-800/60 backdrop-blur-sm rounded-xl p-6 hover:from-gray-900/80 hover:to-gray-800/80 transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold">{review.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Calendar className="w-3 h-3" />
                        <span>{review.date}</span>
                        {review.verified && (
                          <span className="text-green-400 text-xs bg-green-400/20 px-2 py-0.5 rounded-full">
                            ✓ Verified Purchase
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    {[1,2,3,4,5].map(i => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i <= review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`}
                      />
                    ))}
                    <span className="text-gray-400 text-sm ml-2">for {review.product}</span>
                  </div>
                </div>
                <Quote className="w-8 h-8 text-yellow-400/20" />
              </div>
              
              <p className="text-gray-300 mb-4 leading-relaxed">{review.comment}</p>
              
              <div className="flex items-center gap-4 text-sm">
                <button className="flex items-center gap-2 text-gray-400 hover:text-yellow-400 transition-colors">
                  <ThumbsUp className="w-4 h-4" />
                  <span>Helpful ({review.helpful})</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Write Review CTA */}
      <div className="relative z-10 text-center pb-20">
        <div className="bg-gradient-to-r from-yellow-600/20 to-orange-600/20 backdrop-blur-sm rounded-xl p-8 max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-white mb-4">Have you shopped with us?</h3>
          <p className="text-gray-300 mb-6">We'd love to hear about your experience!</p>
          <a 
            href="tel:+17844512261"
            className="inline-block bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold py-3 px-8 rounded-full hover:from-yellow-400 hover:to-orange-400 transition-all duration-300"
          >
            Contact Us to Share Your Review
          </a>
        </div>
      </div>

      <Celly />
    </div>
  );
}