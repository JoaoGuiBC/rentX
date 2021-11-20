import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { FlatList, StatusBar } from 'react-native';
import { useTheme } from 'styled-components';
import { BackButton } from '../../components/BackButton';
import { Car } from '../../components/Car';

import { CarDTO } from '../../dtos/CarDTO';
import { RootStackParamList } from '../../routes/stack.routes';
import { api } from '../../services/api';

import {
  Container,
  Header,
  Title,
  Subtitle,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsQuantity,
} from './styles';

type MyCarsNavigation = StackNavigationProp<RootStackParamList, 'MyCars'>;

interface carsProps {
  id: number;
  use_id: number;
  car: CarDTO;
}

export function MyCars() {
  const [cars, setCars] = useState<carsProps[]>([]);
  const [isLoading, setIsloading] = useState(true);

  const theme = useTheme();
  const { goBack } = useNavigation<MyCarsNavigation>();

  function handleGoBack() {
    goBack();
  }

  useEffect(() => {
    async function getCars() {
      try {
        const response = await api.get<carsProps[]>(
          '/schedules_byuser?user_id=1'
        );

        setCars(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsloading(false);
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

      <Header>
        <BackButton color={theme.colors.shape} onPress={handleGoBack} />

        <Title>
          Seus agendamentos, {'\n'}
          estão aqui.
        </Title>

        <Subtitle>Conforto, segurança e praticidade.</Subtitle>
      </Header>

      <Content>
        <Appointments>
          <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
          <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
        </Appointments>

        <FlatList
          data={cars}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <Car
              brand={item.car.brand}
              name={item.car.name}
              rent={{
                period: item.car.rent.period,
                price: item.car.rent.price,
              }}
              fuelType={item.car.fuel_type}
              thumbnail={item.car.thumbnail}
              onPress={() => {}}
            />
          )}
        />
      </Content>
    </Container>
  );
}
