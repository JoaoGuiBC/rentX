import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;

  background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const CarList = styled.FlatList.attrs({
  contentContainerStyle: {
    padding: 24,
  },
  showsVerticalScrollIndicator: true,
})``;
