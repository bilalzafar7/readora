import { API_CONFIG } from '../config/api';
import { GoogleBooksResponse, GoogleBookItem } from '../types/api';
import { IBook } from '../types/interfaces';

const BASE_URL = `${API_CONFIG.BASE_URL}/volumes`;

// Helper to map API response to our IBook interface
const mapGoogleBookToIBook = (item: GoogleBookItem): IBook => {
  const { volumeInfo, id } = item;
  const year = volumeInfo.publishedDate
    ? volumeInfo.publishedDate.split('-')[0]
    : undefined;

  // Use HTTPS for images if available, otherwise fallback or use http
  let cover = volumeInfo.imageLinks?.thumbnail || volumeInfo.imageLinks?.smallThumbnail;
  if (cover && cover.startsWith('http://')) {
    cover = cover.replace('http://', 'https://');
  }

  return {
    id,
    title: volumeInfo.title,
    author: volumeInfo.authors?.join(', '),
    year,
    cover: cover,
    rating: volumeInfo.averageRating,
    reviewsCount: volumeInfo.ratingsCount,
    summary: volumeInfo.description,
  };
};

export const searchBooks = async (
  query: string,
  startIndex: number = 0,
  maxResults: number = API_CONFIG.MAX_RESULTS
): Promise<{ items: IBook[]; totalItems: number }> => {
  if (!query.trim()) {
    return { items: [], totalItems: 0 };
  }

  try {
    const url = `${BASE_URL}?q=${encodeURIComponent(
      query
    )}&startIndex=${startIndex}&maxResults=${maxResults}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data: GoogleBooksResponse = await response.json();

    const items = (data.items || []).map(mapGoogleBookToIBook);
    
    return {
      items,
      totalItems: data.totalItems,
    };
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};
