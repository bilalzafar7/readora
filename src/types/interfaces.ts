export interface IBook {
  id: string;
  title: string;
  author?: string;
  year?: string;
  cover?: string;
  rating?: number;
  reviewsCount?: number;
  authorBio?: string;
  summary?: string;
}

export interface INavigationProps {
  goBack?: () => void;
  goToDetails?: (book: IBook) => void;
  goToResults?: (query: string, items: IBook[]) => void;
  goToSearch?: () => void;
}
