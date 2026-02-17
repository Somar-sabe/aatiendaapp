import "react-native-reanimated";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider, DarkTheme, DefaultTheme } from "@react-navigation/native";
import { useColorScheme } from "react-native";

import StackNavigator from "../navigation/StackNavigator";
import { CartProvider } from "../context/CartContext"; // ✅ عدّل المسار لو مختلف

export default function RootLayout() {
  const scheme = useColorScheme();

  return (
    <ThemeProvider value={scheme === "dark" ? DarkTheme : DefaultTheme}>
      <CartProvider>
        <StackNavigator />
      </CartProvider>

      <StatusBar style="auto" />
    </ThemeProvider>
  );
}