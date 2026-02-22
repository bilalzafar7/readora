import React, { useMemo, useState } from 'react';
import { StatusBar, useColorScheme, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
} from 'react-native-paper';
import SearchScreen from './src/screens/SearchScreen';
import ResultsScreen from './src/screens/ResultsScreen';
import BookDetailsScreen from './src/screens/BookDetailsScreen';
import { IBook } from './src/types/interfaces';
import { THEME_COLORS } from './src/constants';
import { ScreenName } from './src/enums/screens';
import { IconAdapter } from './src/shared/components/IconAdapter';

export default function App() {
  const isDark = useColorScheme() === 'dark';
  const theme = useMemo(() => {
    const base = isDark ? MD3DarkTheme : MD3LightTheme;
    return {
      ...base,
      colors: {
        ...base.colors,
        primary: THEME_COLORS.primary,
      },
    };
  }, [isDark]);

  const [screen, setScreen] = useState<ScreenName>(ScreenName.SEARCH);
  const [pickedBook, setPickedBook] = useState<IBook | null>(null);
  const [results, setResults] = useState<IBook[]>([]);
  const [query, setQuery] = useState('');

  const goToSearch = () => setScreen(ScreenName.SEARCH);
  const goToResults = (q: string, items: IBook[]) => {
    setQuery(q);
    setResults(items);
    setScreen(ScreenName.RESULTS);
  };
  const goToDetails = (book: IBook) => {
    setPickedBook(book);
    setScreen(ScreenName.DETAILS);
  };
  const goBack = () => {
    if (screen === ScreenName.DETAILS) setScreen(results.length ? ScreenName.RESULTS : ScreenName.SEARCH);
    else if (screen === ScreenName.RESULTS) setScreen(ScreenName.SEARCH);
  };

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <PaperProvider
        theme={theme}
        settings={{
          icon: IconAdapter,
        }}
      >
        <View style={{ flex: 1 }}>
          {screen === ScreenName.SEARCH && (
            <SearchScreen
              goToDetails={goToDetails}
              goToResults={goToResults}
            />
          )}
          {screen === ScreenName.RESULTS && (
            <ResultsScreen
              query={query}
              items={results}
              goBack={goBack}
              goToDetails={goToDetails}
            />
          )}
          {screen === ScreenName.DETAILS && pickedBook && (
            <BookDetailsScreen
              book={pickedBook}
              goBack={goBack}
              goToSearch={goToSearch}
            />
          )}
        </View>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
