import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import Animated from 'react-native-reanimated';
import { RectButton } from 'react-native-gesture-handler';

import { CarDTO } from '../../dtos/CarDTO';

const AnimatedButton = Animated.createAnimatedComponent(RectButton);

export const Container = styled.View`
  flex: 1;

  background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const CarList = styled(FlatList as new () => FlatList<CarDTO>).attrs({
  contentContainerStyle: {
    padding: 24,
  },
  showsVerticalScrollIndicator: true,
})``;

export const MyCarsButtonView = styled(Animated.View)`
  position: absolute;
  bottom: 13px;
  right: 22px;
`;

export const MyCarsButton = styled(AnimatedButton)`
  width: 60px;
  height: 60px;

  border-radius: 30px;

  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => theme.colors.main};
`;
