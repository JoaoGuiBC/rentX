import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation, useRoute } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { format } from 'date-fns';

import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Button } from '../../components/Button';
import { Alert } from '../../components/Alert';

import { RootStackParamList } from '../../routes/stack.routes';
import { CarDTO } from '../../dtos/CarDTO';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { getPlatformDate } from '../../utils/getPlataformDate';
import { api } from '../../services/api';

import {
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Accessories,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal,
  Footer,
} from './styles';

type SchedulingDetailsNavigation = StackNavigationProp<
  RootStackParamList,
  'SchedulingDetails'
>;

interface RouteParams {
  car: CarDTO;
  dates: string[];
}

interface RentalPeriodInterface {
  start: string;
  end: string;
}

export function SchedulingDetails() {
  const [isLoading, setIsloading] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriodInterface>(
    {} as RentalPeriodInterface
  );

  const theme = useTheme();
  const route = useRoute();
  const { car, dates } = route.params as RouteParams;
  const { navigate, goBack } = useNavigation<SchedulingDetailsNavigation>();

  const rentTotal = Number(dates.length * car.rent.price);

  async function handleConfirmRental() {
    try {
      setIsloading(true);
      const schedulesByCar = await api.get(`/schedules_bycars/${car.id}`);

      const unavailableDates = [
        ...schedulesByCar.data.unavailable_dates,
        ...dates,
      ];

      const startDate = format(
        getPlatformDate(new Date(dates[0])),
        'dd/MM/yyyy'
      );
      const endDate = format(
        getPlatformDate(new Date(dates[dates.length - 1])),
        'dd/MM/yyyy'
      );

      await api.post('/schedules_byuser', {
        user_id: 1,
        car,
        startDate,
        endDate,
      });

      await api.put(`/schedules_bycars/${car.id}`, {
        id: car.id,
        unavailable_dates: unavailableDates,
      });

      navigate('SchedulingComplete');
    } catch (_) {
      setIsAlertVisible(true);
    } finally {
      setIsloading(false);
    }
  }

  function handleGoBack() {
    goBack();
  }

  function handleCloseAlert() {
    setIsAlertVisible(false);
  }

  useEffect(() => {
    setRentalPeriod({
      start: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
      end: format(
        getPlatformDate(new Date(dates[dates.length - 1])),
        'dd/MM/yyyy'
      ),
    });
  }, []);

  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" />

      <Alert
        isAlertVisible={isAlertVisible}
        closeAlert={handleCloseAlert}
        title="Erro"
        message="Não foi possível agendar o aluguel, tente novamente mais tarde"
      />

      <Header>
        <BackButton onPress={handleGoBack} />
      </Header>

      <CarImages>
        <ImageSlider imagesUrl={car.photos} />
      </CarImages>

      <Content>
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

        <RentalPeriod>
          <CalendarIcon>
            <Feather
              name="calendar"
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>{rentalPeriod.start}</DateValue>
          </DateInfo>

          <Feather
            name="chevron-right"
            size={RFValue(10)}
            color={theme.colors.text}
          />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue>{rentalPeriod.end}</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>{`R$ ${car.rent.price} x${dates.length} diárias`}</RentalPriceQuota>
            <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>

      <Footer>
        <Button
          title="Alugar agora"
          color={theme.colors.success}
          onPress={handleConfirmRental}
          enabled={!isLoading}
          loading={isLoading}
        />
      </Footer>
    </Container>
  );
}
