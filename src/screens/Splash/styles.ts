import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';

export const Container = styled.View`
  flex: 1;
  position: relative;

  justify-content: center;

  background-color: ${({ theme }) => theme.colors.header};
`;

export const AnimatedView = styled(Animated.View)`
  position: absolute;

  align-self: center;
`;
