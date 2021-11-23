import React, { useEffect } from 'react';
import {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import BrandSvg from '../../assets/brand.svg';
import LogoSvg from '../../assets/logo.svg';

import { Container, AnimatedView } from './styles';

export function Splash() {
  const splashAnimation = useSharedValue(0);

  const brandStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value, [0, 25], [1, 0]),
    };
  });

  const logoStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        splashAnimation.value,
        [25, 50, 60, 75],
        [0, 1, 1, 0]
      ),
    };
  });

  useEffect(() => {
    splashAnimation.value = withTiming(75, { duration: 4000 });
  }, []);

  return (
    <Container>
      <AnimatedView style={brandStyle}>
        <BrandSvg width={80} height={50} />
      </AnimatedView>

      <AnimatedView style={logoStyle}>
        <LogoSvg width={180} height={20} />
      </AnimatedView>
    </Container>
  );
}
