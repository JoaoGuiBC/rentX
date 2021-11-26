import React from 'react';
import { StatusBar } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from 'styled-components';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Button } from '../../components/Button';

import { RootStackParamList } from '../../routes/stack.routes';
import { CarDTO } from '../../dtos/CarDTO';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

import {
  Container,
  Header,
  AnimatedHeader,
  CarImages,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Accessories,
  About,
  Footer,
} from './styles';

type CarDetailsNavigation = StackNavigationProp<
  RootStackParamList,
  'CarDetails'
>;

interface RouteParams {
  car: CarDTO;
}

export function CarDetails() {
  const { navigate, goBack } = useNavigation<CarDetailsNavigation>();
  const route = useRoute();
  const { car } = route.params as RouteParams;
  const theme = useTheme();

  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const headerStyleAnimation = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, 200],
        [200, 70],
        Extrapolate.CLAMP
      ),
    };
  });

  const sliderCarsStyleAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value, [0, 150], [1, 0], Extrapolate.CLAMP),
    };
  });

  function handleConfirmRental() {
    navigate('Scheduling', { car });
  }

  function handleGoBack() {
    goBack();
  }

  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" />

      <AnimatedHeader
        style={[
          headerStyleAnimation,
          { backgroundColor: theme.colors.background_secondary },
        ]}
      >
        <Header>
          <BackButton onPress={handleGoBack} />
        </Header>

        <CarImages style={[sliderCarsStyleAnimation]}>
          <ImageSlider imagesUrl={car.photos} />
        </CarImages>
      </AnimatedHeader>

      <Animated.ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: getStatusBarHeight() + 160,
        }}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>R$ {car.rent.price}</Price>
          </Rent>
        </Details>

        <Accessories>
          {car.accessories.map((accessory) => (
            <Accessory
              key={accessory.type}
              name={accessory.name}
              icon={getAccessoryIcon(accessory.type)}
            />
          ))}
        </Accessories>

        <About>{car.about}</About>
        <About>{car.about}</About>
        <About>{car.about}</About>
      </Animated.ScrollView>

      <Footer>
        <Button
          title="Escolher período do aluguel"
          onPress={handleConfirmRental}
        />
      </Footer>
    </Container>
  );
}
