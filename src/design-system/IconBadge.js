import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { radius } from './tokens';

const SIZES = {
  sm: 32,
  md: 44,
  lg: 56,
};

export default function IconBadge({ icon, color, backgroundColor, size = 'md', style }) {
  const dimension = SIZES[size] || SIZES.md;
  return (
    <View
      style={[
        styles.base,
        {
          width: dimension,
          height: dimension,
          borderRadius: radius.md,
          backgroundColor: backgroundColor || `${color}1F`,
        },
        style,
      ]}
    >
      <MaterialIcons name={icon} size={dimension * 0.5} color={color} />
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
