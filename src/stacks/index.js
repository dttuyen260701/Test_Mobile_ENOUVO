import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native'
import { DetailScreen, HomeScreen } from '../screens';

const Stack = createNativeStackNavigator();

const screenOptions = ({route}) => ({
  headerShown: false,
})

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName={'HomeScreen'}
        screenOptions = {screenOptions}
      >
        <Stack.Screen
          name= {'HomeScreen'}
          component = {HomeScreen}
        />
        <Stack.Screen
          name= {'DetailScreen'}
          component = {DetailScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Routes