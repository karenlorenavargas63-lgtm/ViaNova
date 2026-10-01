import React from 'react';
import { LoginScreen } from './LoginScreen';
import { UserProfile } from '../types';

interface RegisterScreenProps {
  onRegisterSuccess: (user: UserProfile) => void;
  onLoginSuccess: (user: UserProfile) => void;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({
  onRegisterSuccess,
  onLoginSuccess,
}) => {
  return (
    <LoginScreen
      onLoginSuccess={onLoginSuccess}
      onRegisterSuccess={onRegisterSuccess}
    />
  );
};
