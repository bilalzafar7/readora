import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export function IconAdapter(props: { name: string | number; color?: string; size?: number }) {
  return (
    <MaterialCommunityIcons
      name={String(props.name)}
      color={props.color}
      size={props.size ?? 24}
    />
  );
}
