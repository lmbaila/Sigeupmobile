import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Circle } from 'react-native-svg';
import { radius } from './tokens';

const { width } = Dimensions.get('window');

export default function GradientHeader({ colors, children, style }) {
  return (
    <LinearGradient
      colors={colors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.container, style]}
    >
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <Svg width="100%" height="100%">
          <Circle cx={width * 0.92} cy={36} r={64} fill="rgba(255,255,255,0.10)" />
          <Circle cx={width * 0.1} cy={210} r={100} fill="rgba(255,255,255,0.06)" />
          <Circle cx={width * 0.75} cy={190} r={26} fill="rgba(255,255,255,0.12)" />
        </Svg>
      </View>
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomLeftRadius: radius.lg * 1.6,
    borderBottomRightRadius: radius.lg * 1.6,
    overflow: 'hidden',
  },
});
