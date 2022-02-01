import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FishPriceListScreen from '../screens/FishPrice/List';
import FishPriceFilterScreen from '../screens/FishPrice/Filter';
import AddDataScreen from '../screens/FishPrice/AddData';

const Stack = createNativeStackNavigator();

const RootNavigation = () => {
  return (
    <Stack.Navigator initialRouteName={"FishPriceListScreen"}>
      <Stack.Screen
        name="FishPriceListScreen"
        component={FishPriceListScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FishPriceFilterScreen"
        component={FishPriceFilterScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddDataScreen"
        component={AddDataScreen}
        options={{ title: '' }}
      />
    </Stack.Navigator>
  )
};

export default RootNavigation;