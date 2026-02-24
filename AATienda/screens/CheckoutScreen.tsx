import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  Linking,
  StyleSheet,
} from "react-native";
import { useCart, type CartItemType } from "../context/CartContext";
import { createCheckout } from "../api/checkout";
import HeaderUtilityBar from "@/components/HeaderUtilityBar";
import AppHeader from "@/components/AppHeader";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/footer";

function priceToNumber(price: string) {
  const n = Number(String(price).replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

export default function CheckoutScreen() {
  const { items, clearCart, totalPrice } = useCart();

  const handlePayment = async () => {
    if (!items || items.length === 0) {
      Alert.alert("Your cart is empty");
      return;
    }

    try {
      const lines = items.map((item: CartItemType) => ({
        id: item.id,
        title: item.name,
        price: priceToNumber(item.price),
        qty: item.quantity,
        image: item.image,
      }));

      const url = await createCheckout(lines);

      if (url) {
        await Linking.openURL(url);
        clearCart();
      } else {
        Alert.alert("Payment Failed", "Unable to create checkout session");
      }
    } catch (e) {
      console.log(e);
      Alert.alert("Payment Failed", "Something went wrong");
    }
  };

  return (
    <View style={styles.container}>
             
            <HeaderUtilityBar />
            <AppHeader />
      <Text style={styles.title}>Checkout</Text>

      <FlatList
        data={items}
        keyExtractor={(i: CartItemType) => `${i.id}-${i.option ?? ""}`}
        renderItem={({ item }: { item: CartItemType }) => (
          <View style={styles.row}>
            <Text style={styles.left}>
              {item.name} × {item.quantity}
            </Text>
            <Text style={styles.right}>
              AED {priceToNumber(item.price).toFixed(2)}
            </Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={{ color: "#777", marginTop: 12 }}>
            Your cart is empty.
          </Text>
        }
      />

      <Text style={styles.total}>
        Total: AED {priceToNumber(String(totalPrice)).toFixed(2)}
      </Text>

      <TouchableOpacity style={styles.payBtn} onPress={handlePayment}>
        <Text style={styles.payText}>Pay Now</Text>
      </TouchableOpacity>
       <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 20 },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    gap: 12,
  },

  left: {
    flex: 1,
    color: "#111",
    fontWeight: "600",
  },

  right: {
    color: "#111",
    fontWeight: "800",
  },

  total: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: "800",
  },

  payBtn: {
    backgroundColor: "#000",
    padding: 15,
    marginTop: 18,
    borderRadius: 8,
  },

  payText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "800",
  },
});
