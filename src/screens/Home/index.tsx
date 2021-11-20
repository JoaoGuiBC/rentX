import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import { Header } from '../../components/Header';
import { Car } from '../../components/Car';
import { Load } from '../../components/Load';

import { api } from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';
import { RootStackParamList } from '../../routes/stack.routes';

import { Container, CarList, MyCarsButton } from './styles';

type HomeNavigation = StackNavigationProp<RootStackParamList, 'Home'>;

export function Home() {
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { navigate } = useNavigation<HomeNavigation>();
  const theme = useTheme();

  function handleGoToCarDetails(car: CarDTO) {
    navigate('CarDetails', { car });
  }
  function handleGoToMyCars() {
    navigate('MyCars');
  }

  useEffect(() => {
    async function getCars() {
      try {
        const response = await api.get<CarDTO[]>('/cars');

        setCars(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    getCars();
  }, []);

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header />

      {isLoading ? (
        <Load />
      ) : (
        <CarList
          data={cars}
          keyExtractor={(car) => car.id}
          renderItem={({ item }) => (
            <Car
              brand={item.brand}
              name={item.name}
              rent={{
                period: item.rent.period,
                price: item.rent.price,
              }}
              fuelType={item.fuel_type}
              thumbnail={item.thumbnail}
              onPress={() => handleGoToCarDetails(item)}
            />
          )}
        />
      )}

      <MyCarsButton onPress={handleGoToMyCars}>
        <Ionicons name="ios-car-sport" size={32} color={theme.colors.shape} />
      </MyCarsButton>
    </Container>
  );
}
