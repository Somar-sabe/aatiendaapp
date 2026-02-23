import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import CollectionScreen from "../screens/CollectionScreen";
import ProductScreen from "../screens/ProductScreen";
import CartScreen from "../screens/CartScreen";
import CheckoutScreen from "../screens/CheckoutScreen";

// ✅ ADD THESE IMPORTS
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";

export type RootStackParamList = {
  Home: undefined;
  Collection: { handle: string; title?: string };
  
    Product: {
  product: { id: string; name: string; price: string; img: string; handle?: string };
};

 
  Cart: undefined;
  Checkout: undefined;

  // ✅ ADD THESE ROUTES
  Login: undefined;
  Register: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Collection" component={CollectionScreen} />
      <Stack.Screen name="Product" component={ProductScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />

      {/* ✅ ADD THESE SCREENS */}
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}