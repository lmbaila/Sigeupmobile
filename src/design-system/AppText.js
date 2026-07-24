import React from 'react';
import { Text } from 'react-native';
import { colors, typography } from './tokens';

const HEADER_VARIANTS = ['display', 'title'];

export default function AppText({ variant = 'body', color, style, children, ...rest }) {
  const variantStyle = typography[variant] || typography.body;
  return (
    <Text
      accessibilityRole={HEADER_VARIANTS.includes(variant) ? 'header' : undefined}
      style={[variantStyle, { color: color || colors.textPrimary }, style]}
      {...rest}
    >
      {children}
    </Text>
  );
}
