import React, { useMemo, useState } from 'react';
import { Image, View } from 'react-native';
import {
  Appbar,
  Button,
  Card,
  Divider,
  ActivityIndicator,
  IconButton,
  Text,
} from 'react-native-paper';
import { IBook } from '../types/interfaces';
import { RatingStars } from '../shared/components/RatingStars';

type Props = {
  book: IBook;
  goBack: () => void;
  goToSearch: () => void;
};

export default function BookDetailsScreen({ book, goBack, goToSearch }: Props) {
  const [imgLoading, setImgLoading] = useState(!!book.cover);
  const [imgError, setImgError] = useState(false);
  const [imgVersion, setImgVersion] = useState(0);
  const imageUriWithVersion = useMemo(() => {
    if (!book.cover) return undefined;
    const sep = book.cover.includes('?') ? '&' : '?';
    return `${book.cover}${sep}v=${imgVersion}`;
  }, [book.cover, imgVersion]);

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header mode="center-aligned">
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title={book.title} />
        <Appbar.Action icon="magnify" onPress={goToSearch} />
      </Appbar.Header>
      <View style={{ padding: 16 }}>
        <Card mode="elevated" style={{ borderRadius: 16 }}>
          <Card.Content>
            {book.cover && (
              <View style={{ alignItems: 'center', marginTop: 8 }}>
                <View style={{ width: 200, height: 280 }}>
                  <Image
                    source={{ uri: imageUriWithVersion }}
                    style={{ width: '100%', height: '100%', borderRadius: 16 }}
                    resizeMode="cover"
                    onLoadStart={() => {
                      setImgLoading(true);
                      setImgError(false);
                    }}
                    onLoadEnd={() => setImgLoading(false)}
                    onError={() => {
                      setImgLoading(false);
                      setImgError(true);
                    }}
                  />
                  {imgLoading && (
                    <View
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <ActivityIndicator />
                    </View>
                  )}
                  {imgError && !imgLoading && (
                    <View
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <IconButton
                        icon="reload"
                        size={28}
                        onPress={() => {
                          setImgLoading(true);
                          setImgError(false);
                          setImgVersion(v => v + 1);
                        }}
                      />
                    </View>
                  )}
                </View>
              </View>
            )}
            <View style={{ gap: 4, marginTop: 16 }}>
              <Text variant="titleLarge" style={{ textAlign: 'center' }}>
                {book.title}
              </Text>
              {book.author && (
                <Text
                  variant="bodyMedium"
                  style={{ textAlign: 'center', opacity: 0.7 }}
                >
                  {book.author}
                </Text>
              )}
              {!!book.year && (
                <Text
                  variant="bodySmall"
                  style={{ textAlign: 'center', opacity: 0.6 }}
                >
                  Published in {book.year}
                </Text>
              )}
              {typeof book.rating === 'number' && (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                    marginTop: 6,
                  }}
                >
                  <RatingStars rating={book.rating} />
                  <Text variant="bodySmall" style={{ opacity: 0.7 }}>
                    {book.rating.toFixed(1)}
                    {typeof book.reviewsCount === 'number'
                      ? ` (${book.reviewsCount} reviews)`
                      : ''}
                  </Text>
                </View>
              )}
            </View>
            <Divider style={{ marginVertical: 16 }} />
            {book.authorBio && (
              <>
                <Text variant="titleMedium" style={{ marginBottom: 6 }}>
                  About the author
                </Text>
                <Text variant="bodyMedium" style={{ opacity: 0.8 }}>
                  {book.authorBio}
                </Text>
              </>
            )}
            {book.summary && (
              <>
                <Text variant="titleMedium" style={{ marginTop: 16, marginBottom: 6 }}>
                  Overview
                </Text>
                <Text variant="bodyMedium" style={{ opacity: 0.8 }}>
                  {book.summary}
                </Text>
              </>
            )}
          </Card.Content>
          <Card.Actions style={{ padding: 16 }}>
            <Button
              mode="contained"
              icon="check"
              style={{ flex: 1 }}
              contentStyle={{ paddingVertical: 6 }}
              onPress={() => {}}
            >
              Book Read
            </Button>
          </Card.Actions>
        </Card>
      </View>
    </View>
  );
}
