import React from 'react';

import {
  Container,
  ImageIndexes,
  ImageIndex,
  CarImageWrapper,
  CarImage,
} from './styles';

interface ImageSliderProps {
  imagesUrl: string[];
}

export function ImageSlider({ imagesUrl }: ImageSliderProps) {
  return (
    <Container>
      <ImageIndexes>
        <ImageIndex isActive />
        <ImageIndex isActive={false} />
        <ImageIndex isActive={false} />
        <ImageIndex isActive={false} />
      </ImageIndexes>

      <CarImageWrapper>
        <CarImage source={{ uri: imagesUrl[0] }} resizeMode="contain" />
      </CarImageWrapper>
    </Container>
  );
}
