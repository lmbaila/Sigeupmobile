import React, { useState, useEffect, useRef, useContext } from 'react';
import {
  View,
  AccessibilityInfo,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TextInput,
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Circle } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import DoubleClick from 'react-native-double-tap';
import AuthContext from '../../contexts/auth';
import { speckNormal } from '../../helpers';
import { AppText, Button, colors, gradients, spacing, radius } from '../../design-system';

const logo = require('../../assets/logo/logo.png');
const { width, height } = Dimensions.get('window');

export default function Login() {
  const insets = useSafeAreaInsets();
  const { signIn, talkContext, errorMessage, loadingContext, talk } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const passwordInputRef = useRef();

  useEffect(() => {
    AccessibilityInfo.isScreenReaderEnabled().then((enabled) => {
      if (enabled) talkContext(false);
    });
  }, []);

  function handleSignin() {
    Keyboard.dismiss();
    speckNormal('Processando', talk);
    signIn(username, password);
  }

  function toggleTalk() {
    talkContext(!talk);
    speckNormal(talk ? 'narrador de tela inactivo' : 'narrador de tela activo', true);
  }

  return (
    <TouchableWithoutFeedback delayLongPress={3000} onPress={Keyboard.dismiss} onLongPress={toggleTalk}>
      <View style={styles.flex}>
        <LinearGradient colors={gradients.hero} style={styles.background}>
          <View style={StyleSheet.absoluteFill} pointerEvents="none">
            <Svg width="100%" height="100%">
              <Circle cx={width * 0.88} cy={height * 0.1} r={90} fill="rgba(255,255,255,0.08)" />
              <Circle cx={width * 0.08} cy={height * 0.32} r={130} fill="rgba(255,255,255,0.05)" />
              <Circle cx={width * 0.85} cy={height * 0.42} r={50} fill="rgba(255,255,255,0.07)" />
            </Svg>
          </View>

          <View style={[styles.brand, { paddingTop: insets.top + spacing.xl }]}>
            <View style={styles.logoRing}>
              <Image source={logo} style={styles.logo} accessibilityLabel="Logótipo SIGEUP" />
            </View>
            <AppText variant="title" color={colors.textOnPrimary} style={styles.appName}>
              SIGEUP Mobile
            </AppText>
            <AppText variant="body" color="rgba(255,255,255,0.75)">
              Universidade Pedagógica de Maputo
            </AppText>
          </View>

          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <View style={[styles.card, { paddingBottom: insets.bottom + spacing.lg }]}>
              <View style={styles.grabber} />

              {!!errorMessage && (
                <View
                  style={styles.errorBanner}
                  accessible
                  accessibilityRole="alert"
                  accessibilityHint={errorMessage}
                >
                  <MaterialIcons name="error-outline" size={18} color={colors.error} />
                  <AppText variant="caption" color={colors.error} style={styles.errorText}>
                    {errorMessage}
                  </AppText>
                </View>
              )}

              <View style={styles.inputWrapper}>
                <MaterialIcons name="person" color={colors.textSecondary} size={22} style={styles.icon} />
                <TextInput
                  style={styles.input}
                  placeholder="Utilizador"
                  placeholderTextColor={colors.textTertiary}
                  autoCapitalize="none"
                  keyboardType="numbers-and-punctuation"
                  maxLength={13}
                  returnKeyType="next"
                  onSubmitEditing={() => passwordInputRef.current.focus()}
                  accessibilityHint="digite o código de estudante"
                  onChangeText={setUsername}
                  onFocus={() => speckNormal('digite o código de estudante', talk)}
                />
              </View>
              <View style={styles.inputWrapper}>
                <MaterialIcons name="lock" color={colors.textSecondary} size={22} style={styles.icon} />
                <TextInput
                  style={styles.input}
                  placeholder="Senha"
                  placeholderTextColor={colors.textTertiary}
                  autoCapitalize="none"
                  autoCorrect={false}
                  maxLength={30}
                  secureTextEntry
                  returnKeyType="send"
                  onChangeText={setPassword}
                  onSubmitEditing={handleSignin}
                  onFocus={() => speckNormal('digite a senha', talk)}
                  ref={passwordInputRef}
                  accessibilityHint="digite a senha"
                />
              </View>

              <DoubleClick
                singleTap={() => {
                  if (talk) {
                    speckNormal('botão entrar, prima duas vezes para autenticar', talk);
                  } else {
                    handleSignin();
                  }
                }}
                doubleTap={handleSignin}
              >
                <Button
                  title="ENTRAR"
                  loading={loadingContext}
                  onPress={handleSignin}
                  style={styles.submitButton}
                  accessibilityHint="botão entrar, prima duas vezes para autenticar"
                />
              </DoubleClick>
            </View>
          </KeyboardAvoidingView>
        </LinearGradient>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'space-between',
  },
  brand: {
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  logoRing: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  logo: {
    width: 64,
    height: 64,
    resizeMode: 'contain',
  },
  appName: {
    marginBottom: spacing.xs,
  },
  card: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: radius.lg * 1.5,
    borderTopRightRadius: radius.lg * 1.5,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
  },
  grabber: {
    width: 40,
    height: 4,
    borderRadius: radius.pill,
    backgroundColor: colors.border,
    alignSelf: 'center',
    marginBottom: spacing.lg,
  },
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${colors.error}14`,
    borderRadius: radius.md,
    padding: spacing.sm,
    marginBottom: spacing.md,
  },
  errorText: {
    marginLeft: spacing.xs,
    flexShrink: 1,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
    height: 52,
  },
  icon: {
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.textPrimary,
  },
  submitButton: {
    marginTop: spacing.xs,
  },
});
