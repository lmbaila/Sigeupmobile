import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import PressableScale from './PressableScale';
import AppText from './AppText';
import { colors, radius, shadow, spacing } from './tokens';

const ICONS = {
  Início: 'home',
  Notas: 'fact-check',
  Financeiro: 'account-balance-wallet',
  Mais: 'more-horiz',
};

export default function TabBar({ state, navigation }) {
  const insets = useSafeAreaInsets();
  const [tabWidth, setTabWidth] = useState(0);
  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (tabWidth) {
      Animated.spring(translateX, {
        toValue: state.index * tabWidth,
        useNativeDriver: true,
        speed: 16,
        bounciness: 8,
      }).start();
    }
  }, [state.index, tabWidth]);

  return (
    <View style={[styles.wrapper, { paddingBottom: Math.max(insets.bottom, spacing.sm) }]}>
      <View
        style={styles.bar}
        onLayout={(event) => {
          const width = event.nativeEvent.layout.width / state.routes.length;
          setTabWidth(width);
        }}
      >
        {!!tabWidth && (
          <Animated.View
            style={[
              styles.indicator,
              { width: tabWidth - spacing.sm, transform: [{ translateX }] },
            ]}
          />
        )}
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const color = isFocused ? colors.primary : colors.textTertiary;

          function onPress() {
            Haptics.selectionAsync().catch(() => {});
            const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          }

          return (
            <PressableScale
              key={route.key}
              onPress={onPress}
              haptic={false}
              scaleTo={0.92}
              style={styles.tab}
              accessibilityRole="button"
              accessibilityState={{ selected: isFocused }}
              accessibilityLabel={route.name}
            >
              <MaterialIcons name={ICONS[route.name]} size={22} color={color} />
              <AppText variant="caption" color={color} style={styles.label}>
                {route.name}
              </AppText>
            </PressableScale>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: spacing.lg,
  },
  bar: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: radius.pill,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.xs,
    ...shadow.floating,
  },
  indicator: {
    position: 'absolute',
    top: spacing.xs,
    left: spacing.xs / 2,
    bottom: spacing.xs,
    backgroundColor: `${colors.primary}14`,
    borderRadius: radius.pill,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
  },
  label: {
    marginTop: 2,
    fontWeight: '600',
  },
});
