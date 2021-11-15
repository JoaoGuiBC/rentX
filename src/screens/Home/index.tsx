import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';

import { Header } from '../../components/Header';
import { Car } from '../../components/Car';
import { Load } from '../../components/Load';

import { api } from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';
import { RootStackParamList } from '../../routes/stack.routes';

import { Container, CarList } from './styles';

type HomeNavigation = StackNavigationProp<RootStackParamList, 'Home'>;

export function Home() {
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { navigate } = useNavigation<HomeNavigation>();

  function handleGoToCarDetails(car: CarDTO) {
    navigate('CarDetails', { car });
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
    </Container>
  );
}
