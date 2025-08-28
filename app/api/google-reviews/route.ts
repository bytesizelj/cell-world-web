import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Cell World St. Vincent Place ID (confirmed from your Google Maps URL)
    const PLACE_ID = 'ChIJ5wLjTtRRR4wR3B2JeRCLxFM';
    const API_KEY = 'AIzaSyB6XxgZF7jeGL6uAv-_E33JWDWg9QsO3wU';
    
    // Fetch place details including reviews from Google Places API
    const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=name,rating,user_ratings_total,reviews,url,opening_hours,formatted_phone_number&reviews_sort=most_relevant&key=${API_KEY}`;
    
    console.log('Fetching Google Reviews for Cell World...');
    
    const response = await fetch(detailsUrl, {
      headers: {
        'Content-Type': 'application/json',
      },
      // Cache for 1 hour to avoid hitting API limits
      next: { revalidate: 3600 }
    });
    
    const data = await response.json();
    
    console.log('API Response Status:', data.status);
    
    if (data.status !== 'OK') {
      console.error('Google Places API Error:', data);
      throw new Error(`Google API error: ${data.status} - ${data.error_message || 'Unknown error'}`);
    }
    
    // Return the formatted data
    return NextResponse.json({
      success: true,
      data: {
        name: data.result.name || 'Cell World St. Vincent',
        rating: data.result.rating || 0,
        totalRatings: data.result.user_ratings_total || 0,
        reviews: data.result.reviews || [],
        googleMapsUrl: data.result.url || 'https://maps.app.goo.gl/pApc6mjSsBE2WeQE7',
        openingHours: data.result.opening_hours?.weekday_text || [],
        phoneNumber: data.result.formatted_phone_number || '784-451-2261'
      }
    });
  } catch (error) {
    console.error('Error fetching Google reviews:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch reviews',
        details: 'Check console for more information'
      },
      { status: 500 }
    );
  }
}