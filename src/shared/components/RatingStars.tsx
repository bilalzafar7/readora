import React from 'react';
import { View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export function RatingStars({ rating = 0 }: { rating?: number }) {
  const stars = Array.from({ length: 5 }).map((_, i) => {
    const diff = rating - i;
    const name =
      diff >= 1 ? 'star' : diff >= 0.5 ? 'star-half-full' : 'star-outline';
    return (
      <MaterialCommunityIcons
        key={i}
        name={name}
        size={18}
        color="#f2c94c"
        style={{ marginRight: 2 }}
      />
    );
  });
  return <View style={{ flexDirection: 'row' }}>{stars}</View>;
}
