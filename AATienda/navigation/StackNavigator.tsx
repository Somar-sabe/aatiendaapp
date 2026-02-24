// StackNavigator.tsx
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

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";

// ✅ All Additional Screens
import FurnitureLandingScreen from "@/screens/FurnitureLandingScreen";
import FurnitureScreen from "@/screens/FurnitureScreen";

import ShippingPolicyScreen from "@/screens/ShippingPolicyScreen";
import RefundFormScreen from "@/screens/RefundFormScreen";
import AboutAATienda from "@/screens/AboutAATienda";
import FaqsScreen from "@/screens/FaqsScreen";
import GoldDiamondStepsScreen from "@/screens/GoldDiamondStepsScreen";
import TermsOfServiceScreen from "@/screens/TermsOfServiceScreen";
import RefundPolicyScreen from "@/screens/RefundPolicyScreen";

import AATiendaBusinessScreen from "@/screens/AATiendaBusinessScreen";
import PrivacyPolicyScreen from "@/screens/PrivacyPolicyScreen";
import MainAccountScreen from "@/screens/MainAccountScreen";

export type RootStackParamList = {
  Home: undefined;

  Collection: { handle: string; title?: string };

  Product: {
    product: {
      id: string;
      name: string;
      price: string;
      img: string;
      handle?: string;
    };
  };

  Cart: undefined;
  Checkout: undefined;

  Seller: undefined;
  Men: undefined;
  Women: undefined;

  Login: undefined;
  Register: undefined;

  // ✅ Furniture
  Furniture: undefined;
  FurnitureLanding: undefined;

  // ✅ Informational Pages
  AboutAATienda: undefined;
  Faqs: undefined;
  GoldDiamondSteps: undefined;
  AATiendaBusiness: undefined;
  MainAccount: undefined;

  // ✅ Policies
  ShippingPolicy: undefined;
  TermsOfService: undefined;
  RefundPolicy: undefined;
  PrivacyPolicy: undefined;

  // ✅ Refund Form
  RefundForm: undefined;
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

      {/* ✅ Furniture */}
      <Stack.Screen name="Furniture" component={FurnitureScreen} />
      <Stack.Screen name="FurnitureLanding" component={FurnitureLandingScreen} />

      {/* ✅ Informational */}
      <Stack.Screen name="AboutAATienda" component={AboutAATienda} />
      <Stack.Screen name="Faqs" component={FaqsScreen} />
      <Stack.Screen name="GoldDiamondSteps" component={GoldDiamondStepsScreen} />
      <Stack.Screen name="AATiendaBusiness" component={AATiendaBusinessScreen} />
      <Stack.Screen name="MainAccount" component={MainAccountScreen} />

      {/* ✅ Policies */}
      <Stack.Screen name="ShippingPolicy" component={ShippingPolicyScreen} />
      <Stack.Screen name="TermsOfService" component={TermsOfServiceScreen} />
      <Stack.Screen name="RefundPolicy" component={RefundPolicyScreen} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />

      {/* ✅ Refund */}
      <Stack.Screen name="RefundForm" component={RefundFormScreen} />
    </Stack.Navigator>
  );
}