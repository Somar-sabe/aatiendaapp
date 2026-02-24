import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import CollectionScreen from "../screens/CollectionScreen";
import ProductScreen from "../screens/ProductScreen";
import CartScreen from "../screens/CartScreen";
import CheckoutScreen from "../screens/CheckoutScreen";
import Seller from "@/screens/SellerScreen";
import MenScreen from "@/screens/MenScreen";
import WomenScreen from "@/screens/WomenScreen";
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
  Seller: undefined;
  Login: undefined;
  Register: undefined;
  Men: undefined;
  Women: undefined;
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
      <Stack.Screen name="Seller" component={Seller} />
      <Stack.Screen name="Men" component={MenScreen} />
      <Stack.Screen name="Women" component={WomenScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}