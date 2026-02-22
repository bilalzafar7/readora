import { IBook } from './interfaces';

// We now use an Enum for screens, but keep a type alias if needed for compat.
import { ScreenName } from '../enums/screens';

export type RootStackParamList = {
  [ScreenName.SEARCH]: undefined;
  [ScreenName.RESULTS]: { query: string; items: IBook[] };
  [ScreenName.DETAILS]: { book: IBook };
};
