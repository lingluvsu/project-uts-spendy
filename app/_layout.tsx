import { Stack, Redirect, useSegments } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { TransactionProvider } from './context/TransactionContext';

export const MOCK_AUTH_STATE = {
  isLoggedIn: false,
  setIsLoggedIn: (_value: boolean) => {}
};

function useAuth() {
  const [isLogged, setIsLogged] = useState(MOCK_AUTH_STATE.isLoggedIn);

  useEffect(() => {
    MOCK_AUTH_STATE.setIsLoggedIn = (value: boolean) => {
      MOCK_AUTH_STATE.isLoggedIn = value;
      setIsLogged(value);
    };
    return () => {
      MOCK_AUTH_STATE.setIsLoggedIn = (_value: boolean) => {};
    }
  }, []);

  return { isLogged };
}

export default function RootLayout() {
  const { isLogged } = useAuth();
  const segments = useSegments();
  const inAuthGroup = segments[0] === 'auth';
  if (!isLogged && !inAuthGroup) {
    return <Redirect href="/auth" />;
  }
  if (isLogged && inAuthGroup) {
    return <Redirect href="/(tabs)" />;
  }

  return (
    <TransactionProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="auth" options={{ headerShown: false }} />
      </Stack>
    </TransactionProvider>
  );
}