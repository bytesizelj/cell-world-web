'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Star, Quote, ThumbsUp, Calendar, User, Loader2, MapPin, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
const Celly = dynamic(() => import('@/components/CellyAssistant'), { ssr: false });

// Type definitions for Google Reviews
interface GoogleReview {
  author_name: string;
  author_url?: string;
  rating: number;
  time: number;
  relative_time_description: string;
  text: string;
  profile_photo_url?: string;
}

interface GoogleReviewsData {
  name: string;
  rating: number;
  totalRatings: number;
  reviews: GoogleReview[];
  googleMapsUrl: string;
  openingHours?: string[];
  phoneNumber?: string;
}

export default function ReviewsPage() {
  const [googleReviews, setGoogleReviews] = useState<GoogleReviewsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterRating, setFilterRating] = useState('all');

  // Fetch Google Reviews on component mount
  useEffect(() => {
    fetchGoogleReviews();
  }, []);

  const fetchGoogleReviews = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/google-reviews');
      const data = await response.json();
      
      if (data.success && data.data) {
        setGoogleReviews(data.data);
        console.log(`Loaded ${data.data.reviews?.length || 0} reviews from Google`);
      } else {
        throw new Error(data.error || 'Failed to load reviews');
      }
    } catch (error) {
      console.error('Error loading reviews:', error);
      setError(error instanceof Error ? error.message : 'Failed to load reviews');
      // Fallback to sample data if API fails
      setGoogleReviews(getSampleData());
    } finally {
      setLoading(false);
    }
  };

  // Sample data fallback (in case API fails)
  const getSampleData = (): GoogleReviewsData => ({
    name: 'Cell World St. Vincent',
    rating: 4.8,
    totalRatings: 45,
    googleMapsUrl: 'https://maps.app.goo.gl/pApc6mjSsBE2WeQE7',
    reviews: [
      {
        author_name: "Sarah Johnson",
        rating: 5,
        time: Date.now() / 1000,
        relative_time_description: "2 weeks ago",
        text: "Excellent service! Got my new iPhone at a great price. The staff was very knowledgeable and helpful.",
        profile_photo_url: undefined
      },
      {
        author_name: "Michael Chen",
        rating: 5,
        time: Date.now() / 1000,
        relative_time_description: "1 month ago",
        text: "Best marine equipment store in St. Vincent! Quality products and fair prices.",
        profile_photo_url: undefined
      }
    ]
  });

  // Convert Google reviews to display format
  const reviews = googleReviews?.reviews?.map((review, index) => ({
    id: index + 1,
    name: review.author_name,
    rating: review.rating,
    date: review.relative_time_description,
    comment: review.text,
    profilePhoto: review.profile_photo_url,
    authorUrl: review.author_url
  })) || [];

  // Filter reviews by rating
  const filteredReviews = filterRating === 'all' 
    ? reviews 
    : reviews.filter(r => r.rating === parseInt(filterRating));

  // Calculate rating distribution
  const ratingCounts: Record<number, number> = {
    5: reviews.filter(r => r.rating === 5).length,
    4: reviews.filter(r => r.rating === 4).length,
    3: reviews.filter(r => r.rating === 3).length,
    2: reviews.filter(r => r.rating === 2).length,
    1: reviews.filter(r => r.rating === 1).length,
  };

  const totalReviews = googleReviews?.totalRatings || 0;
  const averageRating = googleReviews?.rating || 0;

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
          opacity: 0.6
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
        <p className="text-lg text-gray-300">
          Real feedback from our valued Google Reviews
        </p>
        {googleReviews && (
          <div className="flex items-center justify-center gap-2 mt-2">
            <MapPin className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-gray-400">{googleReviews.name}</span>
          </div>
        )}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="relative z-10 flex flex-col items-center justify-center py-20">
          <Loader2 className="w-10 h-10 text-yellow-400 animate-spin mb-4" />
          <p className="text-gray-300">Loading Google Reviews...</p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="relative z-10 max-w-2xl mx-auto px-4 py-10">
          <div className="bg-red-900/30 border border-red-500 rounded-lg p-6 text-center">
            <p className="text-red-400 mb-2">Unable to load live Google Reviews</p>
            <p className="text-gray-300 text-sm">Showing sample reviews instead</p>
          </div>
        </div>
      )}

      {/* Stats Section */}
      {!loading && googleReviews && (
        <div className="relative z-10 max-w-6xl mx-auto px-4 mb-8">
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-xl p-6">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Overall Rating */}
              <div className="text-center">
                <div className="text-5xl font-bold text-yellow-400 mb-2">
                  {averageRating.toFixed(1)}
                </div>
                <div className="flex justify-center mb-2">
                  {[1,2,3,4,5].map(i => (
                    <Star 
                      key={i} 
                      className={`w-6 h-6 ${i <= Math.round(averageRating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`}
                    />
                  ))}
                </div>
                <p className="text-gray-300">
                  Based on {totalReviews} Google reviews
                </p>
                <a 
                  href={googleReviews.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-yellow-400 hover:text-yellow-300 text-sm mt-2"
                >
                  View on Google Maps
                  <ExternalLink className="w-3 h-3" />
                </a>
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
                        style={{ 
                          width: totalReviews > 0 
                            ? `${(ratingCounts[rating] / reviews.length) * 100}%` 
                            : '0%' 
                        }}
                      />
                    </div>
                    <span className="text-gray-400 text-sm w-8">
                      {ratingCounts[rating]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filter */}
      {!loading && reviews.length > 0 && (
        <div className="relative z-10 flex justify-center mb-8">
          <div className="bg-black/50 backdrop-blur-sm rounded-full p-2 flex gap-2">
            <button
              onClick={() => setFilterRating('all')}
              className={`px-4 py-2 rounded-full transition-all ${
                filterRating === 'all' ? 'bg-yellow-500 text-black' : 'bg-gray-800/50 text-gray-300'
              }`}
            >
              All Reviews ({reviews.length})
            </button>
            {ratingCounts[5] > 0 && (
              <button
                onClick={() => setFilterRating('5')}
                className={`px-4 py-2 rounded-full transition-all ${
                  filterRating === '5' ? 'bg-yellow-500 text-black' : 'bg-gray-800/50 text-gray-300'
                }`}
              >
                5 Stars ({ratingCounts[5]})
              </button>
            )}
            {ratingCounts[4] > 0 && (
              <button
                onClick={() => setFilterRating('4')}
                className={`px-4 py-2 rounded-full transition-all ${
                  filterRating === '4' ? 'bg-yellow-500 text-black' : 'bg-gray-800/50 text-gray-300'
                }`}
              >
                4 Stars ({ratingCounts[4]})
              </button>
            )}
          </div>
        </div>
      )}

      {/* Reviews List */}
      {!loading && filteredReviews.length > 0 && (
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
                      {/* Profile Photo or Avatar */}
                      {review.profilePhoto ? (
                        <img 
                          src={review.profilePhoto}
                          alt={review.name}
                          className="w-10 h-10 rounded-full object-cover"
                          onError={(e) => {
                            // Fallback if image fails to load
                            (e.target as HTMLImageElement).style.display = 'none';
                            (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                          }}
                        />
                      ) : null}
                      <div className={`w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center ${review.profilePhoto ? 'hidden' : ''}`}>
                        <User className="w-6 h-6 text-black" />
                      </div>
                      <div>
                        {review.authorUrl ? (
                          <a 
                            href={review.authorUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white font-bold hover:text-yellow-400 transition-colors"
                          >
                            {review.name}
                          </a>
                        ) : (
                          <h3 className="text-white font-bold">{review.name}</h3>
                        )}
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Calendar className="w-3 h-3" />
                          <span>{review.date}</span>
                          <span className="text-green-400 text-xs bg-green-400/20 px-2 py-0.5 rounded-full">
                            ✓ Google Verified
                          </span>
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
                    </div>
                  </div>
                  <Quote className="w-8 h-8 text-yellow-400/20" />
                </div>
                
                <p className="text-gray-300 mb-4 leading-relaxed whitespace-pre-wrap">
                  {review.comment}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Reviews Message */}
      {!loading && filteredReviews.length === 0 && (
        <div className="relative z-10 max-w-2xl mx-auto px-4 py-10 text-center">
          <p className="text-gray-400 mb-4">No reviews found for the selected filter.</p>
          <button 
            onClick={() => setFilterRating('all')}
            className="text-yellow-400 hover:text-yellow-300"
          >
            Show all reviews
          </button>
        </div>
      )}

      {/* Write Review CTA */}
      <div className="relative z-10 text-center pb-20">
        <div className="bg-gradient-to-r from-yellow-600/20 to-orange-600/20 backdrop-blur-sm rounded-xl p-8 max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-white mb-4">
            Have you shopped with us?
          </h3>
          <p className="text-gray-300 mb-6">
            We'd love to hear about your experience!
          </p>
          <a 
            href={googleReviews?.googleMapsUrl || 'https://maps.app.goo.gl/pApc6mjSsBE2WeQE7'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold py-3 px-8 rounded-full hover:from-yellow-400 hover:to-orange-400 transition-all duration-300"
          >
            Leave a Review on Google
          </a>
        </div>
      </div>

      <Celly />
    </div>
  );
}