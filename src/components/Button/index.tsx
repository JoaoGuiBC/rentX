import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { Container, Title } from './styles';

interface ButtonProps extends RectButtonProps {
  title: string;
  color?: string;
  enabled?: boolean;
}

export function Button({ title, color, enabled = true, ...rest }: ButtonProps) {
  return (
    <Container
      color={color}
      enabled={enabled}
      style={{ opacity: enabled ? 1 : 0.5 }}
      {...rest}
    >
      <Title>{title}</Title>
    </Container>
  );
}
