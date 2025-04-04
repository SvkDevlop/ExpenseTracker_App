import React from 'react';
// import { View, Text } from 'react-native'
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {Provider} from 'react-redux';
import HomeScreen from './src/components/HomeScreen';
import AddExpenseScreen from './src/components/AddExpenseScreen';
import ExpenseListScreen from './src/components/ExpenseListScreen';
import ExpenseDetail from './src/components/ExpenseDetail';
import store from './src/redux/store';
import SplashScreen from './src/components/SplashScreen';
import ReportScreen from './src/components/ReportScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName="Splash"
          >
          <Stack.Screen name="Splash" component={SplashScreen} />


          <Stack.Screen name="HomeScreen" component={HomeScreen} />

          <Stack.Screen name="ExpenseDetail" component={ExpenseDetail} />
          <Stack.Screen name="AddExpense" component={AddExpenseScreen} />
          <Stack.Screen name="ReportScreen" component={ReportScreen} />

          <Stack.Screen
            name="ExpenseListScreen"
            component={ExpenseListScreen}
          />
        </Stack.Navigator>

        {/* <Drawer.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
 <Drawer.Screen name="Home" component={HomeScreen} />
 <Drawer.Screen name="AddExpense" component={AddExpenseScreen} />
 <Drawer.Screen name="Report" component={StatisticsScreen} />
</Drawer.Navigator> */}
      </NavigationContainer>
    </Provider>
  );
};

export default App;
