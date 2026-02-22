import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { Appbar, List, ProgressBar, Text } from 'react-native-paper';
import { IBook } from '../types/interfaces';
import { THEME_COLORS } from '../constants';
import { searchBooks } from '../services/bookService';

type Props = {
  query: string;
  items: IBook[];
  goBack: () => void;
  goToDetails: (book: IBook) => void;
};

export default function ResultsScreen({
  query,
  items: initialItems,
  goBack,
  goToDetails,
}: Props) {
  const [items, setItems] = useState<IBook[]>(initialItems);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Reset state when query changes (though usually ResultsScreen is unmounted/remounted)
  useEffect(() => {
    setItems(initialItems);
    setHasMore(true);
  }, [query, initialItems]);

  const loadMore = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    // API uses startIndex, so we calculate next index based on current items length
    const nextIndex = items.length;

    try {
      const { items: newItems, totalItems } = await searchBooks(query, nextIndex);
      
      if (newItems.length === 0 || items.length + newItems.length >= totalItems) {
        setHasMore(false);
      }
      
      setItems(prev => [...prev, ...newItems]);
    } catch (error) {
      console.error('Failed to load more books', error);
      // Optional: show toast or error message
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }: { item: IBook }) => (
    <List.Item
      title={item.title}
      description={item.author ? `by ${item.author}` : undefined}
      titleStyle={{ color: THEME_COLORS.primary }}
      left={props => <List.Icon {...props} icon="book" />}
      onPress={() => goToDetails(item)}
    />
  );

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header mode="center-aligned">
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title="Results" />
      </Appbar.Header>
      
      <View style={{ padding: 8, flex: 1 }}>
        <Text style={{ margin: 8 }} variant="labelLarge">
          Showing results for “{query}”
        </Text>
        
        {items.length === 0 && !loading && (
          <View style={{ alignItems: 'center', marginTop: 32 }}>
            <Text variant="bodyLarge" style={{ marginTop: 8 }}>
              No results found
            </Text>
          </View>
        )}

        <FlatList
          data={items}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={renderItem}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            loading ? (
              <View style={{ padding: 16 }}>
                <ProgressBar indeterminate color={THEME_COLORS.primary} />
              </View>
            ) : null
          }
        />
      </View>
    </View>
  );
}
