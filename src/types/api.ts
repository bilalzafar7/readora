// Based on the user provided JSON response
export interface GoogleBookVolumeInfo {
  title: string;
  subtitle?: string;
  authors?: string[];
  publisher?: string;
  publishedDate?: string;
  description?: string;
  industryIdentifiers?: Array<{ type: string; identifier: string }>;
  pageCount?: number;
  categories?: string[];
  averageRating?: number;
  ratingsCount?: number;
  imageLinks?: {
    smallThumbnail?: string;
    thumbnail?: string;
  };
  language?: string;
  previewLink?: string;
  infoLink?: string;
}

export interface GoogleBookItem {
  kind: string;
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: GoogleBookVolumeInfo;
}

export interface GoogleBooksResponse {
  kind: string;
  totalItems: number;
  items?: GoogleBookItem[];
}
