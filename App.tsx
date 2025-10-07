import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './components/screens/Home';
import MyCart from './components/screens/MyCart';
import ProductInfo from './components/screens/ProductionInfo';
import Register from './components/screens/Register';

// Định nghĩa kiểu cho các màn hình trong Stack Navigator
type StackParamList = {
  Home: undefined;
  MyCart: undefined;
  ProductInfo: undefined;
};

// Tạo Stack Navigator với kiểu đã định nghĩa
const Stack = createNativeStackNavigator<StackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="MyCart" component={MyCart} />
        <Stack.Screen name="ProductInfo" component={ProductInfo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
