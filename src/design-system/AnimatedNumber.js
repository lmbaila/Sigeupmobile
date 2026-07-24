import React, { useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';
import AppText from './AppText';

export default function AnimatedNumber({
  value,
  formatter = (v) => String(Math.round(v)),
  duration = 700,
  variant = 'display',
  color,
  style,
  ...rest
}) {
  const animated = useRef(new Animated.Value(0)).current;
  const [display, setDisplay] = useState(formatter(0));

  useEffect(() => {
    const listenerId = animated.addListener(({ value: current }) => setDisplay(formatter(current)));
    Animated.timing(animated, {
      toValue: value || 0,
      duration,
      useNativeDriver: false,
    }).start();
    return () => animated.removeListener(listenerId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <AppText variant={variant} color={color} style={style} {...rest}>
      {display}
    </AppText>
  );
}
