import React, { useRef } from 'react';
import { Animated, Pressable } from 'react-native';
import * as Haptics from 'expo-haptics';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function PressableScale({
  children,
  onPress,
  style,
  scaleTo = 0.96,
  haptic = true,
  disabled,
  ...rest
}) {
  const scale = useRef(new Animated.Value(1)).current;

  function animateTo(value) {
    Animated.spring(scale, {
      toValue: value,
      useNativeDriver: true,
      speed: 40,
      bounciness: 6,
    }).start();
  }

  function handlePress(event) {
    if (haptic) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    }
    onPress?.(event);
  }

  return (
    <AnimatedPressable
      onPress={handlePress}
      onPressIn={() => animateTo(scaleTo)}
      onPressOut={() => animateTo(1)}
      disabled={disabled}
      style={[{ transform: [{ scale }] }, style]}
      {...rest}
    >
      {children}
    </AnimatedPressable>
  );
}
