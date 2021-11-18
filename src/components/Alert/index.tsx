import React from 'react';
import AwesomeAlert from 'react-native-awesome-alerts';
import { useTheme } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';

interface AlertProps {
  isAlertVisible: boolean;
  title?: string;
  message?: string;
  buttonText?: string;
  backgroundColor?: string;
  buttonColor?: string;
  closeAlert: () => void;
}

export function Alert({
  isAlertVisible,
  backgroundColor,
  buttonColor,
  buttonText,
  message,
  title,
  closeAlert,
}: AlertProps) {
  const theme = useTheme();

  return (
    <AwesomeAlert
      show={isAlertVisible}
      showProgress={false}
      title={title || undefined}
      message={message || undefined}
      closeOnTouchOutside={false}
      closeOnHardwareBackPress={false}
      showCancelButton={false}
      showConfirmButton
      confirmText={buttonText || 'Confirmar'}
      confirmButtonColor={buttonColor || theme.colors.main}
      onConfirmPressed={closeAlert}
      contentContainerStyle={{
        backgroundColor: backgroundColor || theme.colors.background_primary,
        borderRadius: 0,
        paddingTop: 0,
      }}
      confirmButtonStyle={{
        borderRadius: 0,
      }}
      confirmButtonTextStyle={{
        fontFamily: theme.fonts.primary_500,
        fontSize: RFValue(12),
        color: theme.colors.shape,
      }}
      titleStyle={{
        fontFamily: theme.fonts.secondary_500,
        fontSize: RFValue(20),
        color: theme.colors.title,
      }}
      messageStyle={{
        fontFamily: theme.fonts.secondary_400,
        fontSize: RFValue(15),
        color: theme.colors.text,
      }}
    />
  );
}
