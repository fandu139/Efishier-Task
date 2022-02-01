import React from 'react';
import { StackActions, CommonActions, NavigationContainerRef } from '@react-navigation/native';

export const navigationRef = React.createRef<NavigationContainerRef>();

/**
 * Navigate to screen
 * @param name
 * @param params
 */
export const navigate = (name: string, params?: Record<string, unknown>): void => {
  navigationRef.current?.navigate(name, params);
};

export const setParams = (params: Record<string, unknown>): void => {
  navigationRef.current?.setParams(params);
};

export const goBack = (): void => {
  navigationRef.current?.goBack();
};

/**
 * https://reactnavigation.org/docs/stack-actions/#replace
 * @param name
 * @param params
 */
export const replace = (name: string, params?: Record<string, unknown>): void => {
  navigationRef.current?.dispatch(StackActions.replace(name, params));
};

/**
 * https://reactnavigation.org/docs/stack-actions/#push
 * @param name
 * @param params
 */
export const push = (name: string, params?: Record<string, unknown>): void => {
  navigationRef.current?.dispatch(StackActions.push(name, params));
};

/**
 * https://reactnavigation.org/docs/stack-actions/#pop
 * @param totalScreen
 */
export const pop = (totalScreen: number): void => {
  let popScreen = 1;
  if (totalScreen) popScreen = totalScreen;
  navigationRef.current?.dispatch(StackActions.pop(popScreen));
};

/**
 * https://reactnavigation.org/docs/stack-actions/#poptotop
 */
export const popToHome = (): void => {
  navigationRef.current?.dispatch(StackActions.popToTop());
};

/**
 * Go back to previous screen without destroying all stack, appending current payload
 * to existing screen payload
 * @param name
 * @param payload
 */
export const reset = (name: string, payload: Record<string, unknown>): void => {
  navigationRef.current?.dispatch((state) => {
    const currentRoutes = state.routes;
    const targetRouteIndex = currentRoutes.findIndex((item) => item.name === name);
    currentRoutes.splice(1 + targetRouteIndex);

    currentRoutes[targetRouteIndex] = {
      ...currentRoutes[targetRouteIndex],
      params: {
        ...currentRoutes[targetRouteIndex].params,
        ...payload,
      },
    };

    return CommonActions.reset({
      ...state,
      routes: currentRoutes,
      index: targetRouteIndex,
    });
  });
};
