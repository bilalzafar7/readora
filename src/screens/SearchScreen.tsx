import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { Appbar, List, ProgressBar, Text, TextInput } from 'react-native-paper';
import { THEME_COLORS } from '../constants';
import { searchBooks } from '../services/bookService';
import { IBook } from '../types/interfaces';

type Props = {
  goBack?: () => void;
  goToDetails: (book: IBook) => void;
  goToResults?: (query: string, items: IBook[]) => void;
};

export default function SearchScreen({
  goBack,
  goToDetails,
  goToResults,
}: Props) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<IBook[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Debounce ref
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Clear previous timeout
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (query.trim().length < 2) {
      setResults([]);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    // Debounce API call (500ms)
    timeoutRef.current = setTimeout(async () => {
      try {
        const { items } = await searchBooks(query);
        setResults(items);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch books. Please try again.');
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [query]);

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header mode="center-aligned">
        {goBack && <Appbar.BackAction onPress={goBack} />}
        <Appbar.Content title="Search Book" />
      </Appbar.Header>
      <View style={{ padding: 16, gap: 12 }}>
        <TextInput
          mode="outlined"
          value={query}
          onChangeText={setQuery}
          placeholder="Book title or author"
          left={<TextInput.Icon icon="magnify" />}
          onSubmitEditing={() => {
            if (goToResults) goToResults(query, results);
          }}
          theme={{ colors: { primary: THEME_COLORS.primary }, roundness: 24 }}
          style={{ backgroundColor: THEME_COLORS.surface }}
        />
        
        {loading && <ProgressBar indeterminate color={THEME_COLORS.primary} />}
        
        {error && (
          <Text style={{ color: 'red', textAlign: 'center', marginTop: 8 }}>
            {error}
          </Text>
        )}

        {!loading && !error && query.length >= 2 && results.length === 0 && (
          <View style={{ alignItems: 'center', marginTop: 32 }}>
            <Text variant="bodyLarge" style={{ marginTop: 8 }}>
              No books found
            </Text>
          </View>
        )}

        <View style={{ paddingTop: 4 }}>
          {results.map(b => (
            <List.Item
              key={b.id}
              title={b.title}
              description={b.author ? `by ${b.author}` : undefined}
              titleStyle={{ color: THEME_COLORS.primary }}
              left={props => <List.Icon {...props} icon="book-open-page-variant" />}
              onPress={() => goToDetails(b)}
            />
          ))}
        </View>
      </View>
    </View>
  );
}
