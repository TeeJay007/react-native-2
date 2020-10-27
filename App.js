import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomePage from './pages/HomePage';
import RecipePage from './pages/RecipePage';
import CategoryPage from './pages/CategoryPage';

const Stack = createStackNavigator();

const App = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Visos Kategorijos">
                <Stack.Screen name="Visos Kategorijos" component={HomePage} />
                <Stack.Screen name="Kategorija" component={CategoryPage} />
                <Stack.Screen name="Receptas" component={RecipePage} />
            </Stack.Navigator>
        </NavigationContainer>
    )
};

export default App;
