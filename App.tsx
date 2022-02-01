import React, { useRef } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigation from './src/navigation/RootNavigation'
import { navigationRef } from './src/helper/navigation';
import { NavigationState } from '@react-navigation/core';

// Gets the current screen from navigation state
// @ts-ignore
const getActiveRoute = (state: NavigationState) => {
  const route = state.routes[state.index];

  if (route.state) {
    // Dive into nested navigators
    return getActiveRoute(route.state as NavigationState);
  }

  return route;
};

export default function App() {
  const routeNameRef = useRef<string>();

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current = navigationRef?.current?.getCurrentRoute()?.name;
      }}
      onStateChange={(state) => {
        const previousRouteName = routeNameRef.current;
        const { name: currentRouteName, params } = getActiveRoute(
          state as NavigationState,
        );

        routeNameRef.current = currentRouteName;
      }}
    >
      <RootNavigation />
    </NavigationContainer>     
  );
}

const Styles = StyleSheet.create({
  iconMore: {
    width: 24,
    height: 24,
    tintColor: 'white',
  },
});