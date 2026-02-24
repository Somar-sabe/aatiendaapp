import React, { useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "../navigation/StackNavigator";
import ScreenLayout from "../components/ScreenLayout";
import HeaderUtilityBar from "@/components/HeaderUtilityBar";
import AppHeader from "@/components/AppHeader";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/footer";
import { useCart } from "../context/CartContext";

type Props = NativeStackScreenProps<RootStackParamList, "Cart">;

const BRAND_BROWN = "#54443D";
const BORDER = "#E5E5E5";
const TEXT_GRAY = "#777";
const PRICE_RED = "#C55A6A";

export default function CartScreen({ navigation }: Props) {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();

  const itemCount = items?.reduce((a: number, it: any) => a + (it.quantity || 0), 0) || 0;

  const suggested = useMemo(
    () => [
      {
        id: "s1",
        title: "& Berry — ...",
        price: "450",
        image:
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
      },
      {
        id: "s2",
        title: "& Joury — ...",
        price: "500",
        image:
          "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=600&q=80",
      },
    ],
    []
  );

  return (
    <ScreenLayout scroll={false} showFooter={false}>
            <AnnouncementBar />
            <HeaderUtilityBar />
            <AppHeader />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.page}
      >
        <Text style={styles.cartTitle}>
          Your cart{" "}
          <Text style={styles.cartCount}>{itemCount} item(s)</Text>
        </Text>

        {/* Cart items */}
        <View style={{ marginTop: 14 }}>
          {items?.map((it: any) => (
            <View key={it.id} style={styles.card}>
              <View style={styles.cardInner}>
                <View style={styles.thumbWrap}>
                  {!!it.image ? (
                    <Image source={{ uri: it.image }} style={styles.thumb} />
                  ) : (
                    <View style={[styles.thumb, { backgroundColor: "#f1f1f1" }]} />
                  )}
                </View>

                <View style={styles.info}>
                  <Text style={styles.name} numberOfLines={3}>
                    {it.name}
                  </Text>

                  <Text style={styles.price}>{Number(it.price || 0)} AED</Text>

                  {/* Qty box */}
                  <View style={styles.qtyBox}>
                    <Pressable
                      style={styles.qtyBtn}
                      onPress={() =>
                        updateQuantity(it.id, Math.max(1, (it.quantity || 1) - 1))
                      }
                    >
                      <Ionicons name="remove" size={16} color="#666" />
                    </Pressable>

                    <View style={styles.qtyMid}>
                      <Text style={styles.qtyText}>{it.quantity || 1}</Text>
                    </View>

                    <Pressable
                      style={styles.qtyBtn}
                      onPress={() => updateQuantity(it.id, (it.quantity || 1) + 1)}
                    >
                      <Ionicons name="add" size={16} color="#666" />
                    </Pressable>
                  </View>
                </View>
              </View>

              {/* bottom actions */}
              <View style={styles.cardActions}>
                <Pressable
                  style={styles.actionBtn}
                  onPress={() => removeFromCart(it.id)}
                >
                  <Ionicons name="trash-outline" size={16} color="#444" />
                  <Text style={styles.actionText}>Remove</Text>
                </Pressable>

                <Pressable style={styles.actionBtn} onPress={() => {}}>
                  <Ionicons name="heart-outline" size={16} color="#444" />
                  <Text style={styles.actionText}>ADD To Wishlist</Text>
                </Pressable>
              </View>
            </View>
          ))}
        </View>

        {/* Continue shopping */}
        <Pressable
          style={styles.continueBtn}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.continueText}>Continue shopping</Text>
        </Pressable>

        {/* Order summary */}
        <View style={styles.summaryWrap}>
          <Text style={styles.summaryTitle}>Order summary</Text>

          <View style={styles.sumRow}>
            <Text style={styles.sumLabel}>Subtotal</Text>
            <Text style={styles.sumValue}>{Number(totalPrice || 0)} AED</Text>
          </View>

          <View style={styles.sumRow}>
            <Text style={styles.sumLabel}>Shipping</Text>
            <Text style={styles.sumValue}>0</Text>
          </View>

          <View style={[styles.sumRow, { marginTop: 6 }]}>
            <Text style={styles.sumLabel}>Grand Total</Text>
            <Text style={styles.sumTotal}>{Number(totalPrice || 0)} AED</Text>
          </View>

          <Text style={styles.payCaption}>
            WE SUPPORT THE FOLLOWING{"\n"}PAYMENT METHODS:
          </Text>

          <View style={styles.payRow}>
            <PayIcon label="tabby" />
            <PayIcon label="Pay" />
            <PayIcon label="GPay" />
            <PayIcon label="VISA" bold />
            <PayIcon label="tamara" />
          </View>

          <Pressable
            style={styles.checkoutBtn}
            onPress={() => navigation.navigate("Checkout")}
          >
            <Text style={styles.checkoutText}>Checkout</Text>
          </Pressable>
        </View>

        {/* Suggested */}
        <View style={styles.suggestWrap}>
          <Text style={styles.suggestTitle}>Suggested items for you</Text>

          <View style={styles.suggestRow}>
            {suggested.map((p) => (
              <View key={p.id} style={styles.suggestCard}>
                <View style={styles.suggestImageWrap}>
                  <Image source={{ uri: p.image }} style={styles.suggestImage} />
                  <Pressable style={styles.suggestHeart} onPress={() => {}}>
                    <Ionicons name="heart-outline" size={18} color="#333" />
                  </Pressable>
                </View>

                <Text style={styles.suggestPrice}>{p.price} AED</Text>
                <Text style={styles.suggestName} numberOfLines={1}>
                  {p.title}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Footer (like screenshot bottom) */}
        <Footer />
      </ScrollView>
    </ScreenLayout>
  );
}

function PayIcon({ label, bold }: { label: string; bold?: boolean }) {
  return (
    <View style={styles.payIcon}>
      <Text style={[styles.payIconText, bold && { fontWeight: "900" }]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    paddingHorizontal: 14,
    paddingTop: 22,
    paddingBottom: 24,
    backgroundColor: "#fff",
  },

  cartTitle: {
    textAlign: "left",
    fontSize: 16,
    fontWeight: "800",
    color: "#111",
  },
  cartCount: {
    fontSize: 13,
    fontWeight: "600",
    color: TEXT_GRAY,
  },

  card: {
    width: "100%",
    borderWidth: 1,
    borderColor: BORDER,
    backgroundColor: "#fff",
    padding: 12,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
    marginBottom: 14,
  },
  cardInner: { flexDirection: "row", gap: 12 },
  thumbWrap: {
    width: 90,
    height: 90,
    borderWidth: 1,
    borderColor: BORDER,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  thumb: { width: 78, height: 78, resizeMode: "contain" },

  info: { flex: 1, paddingRight: 6 },
  name: { fontSize: 14, fontWeight: "700", color: "#111", lineHeight: 19 },
  price: {
    marginTop: 8,
    fontSize: 13,
    fontWeight: "800",
    color: PRICE_RED,
  },

  qtyBox: {
    marginTop: 10,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#bdbdbd",
    height: 34,
    width: 120,
    backgroundColor: "#fff",
  },
  qtyBtn: { width: 36, alignItems: "center", justifyContent: "center" },
  qtyMid: {
    flex: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "#bdbdbd",
    alignItems: "center",
    justifyContent: "center",
  },
  qtyText: { fontWeight: "800", color: "#222", fontSize: 13 },

  cardActions: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: BORDER,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionBtn: { flexDirection: "row", gap: 8, alignItems: "center" },
  actionText: { color: "#444", fontWeight: "600", fontSize: 12 },

  continueBtn: {
    marginTop: 10,
    alignSelf: "center",
    width: "86%",
    height: 46,
    backgroundColor: BRAND_BROWN,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 2,
  },
  continueText: { color: "#fff", fontWeight: "800", fontSize: 13 },

  summaryWrap: { marginTop: 38, alignItems: "center" },
  summaryTitle: {
    fontSize: 18,
    fontWeight: "500",
    color: "#111",
    marginBottom: 18,
  },
  sumRow: {
    width: "72%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  sumLabel: { color: "#777", fontWeight: "600" },
  sumValue: { color: "#333", fontWeight: "600" },
  sumTotal: { color: "#111", fontWeight: "900" },

  payCaption: {
    marginTop: 18,
    textAlign: "center",
    fontSize: 11,
    letterSpacing: 3,
    fontWeight: "900",
    color: "#111",
    lineHeight: 18,
  },
  payRow: {
    marginTop: 14,
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap",
    justifyContent: "center",
  },
  payIcon: {
    height: 22,
    paddingHorizontal: 10,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  payIconText: { fontSize: 10, color: "#111", fontWeight: "700" },

  checkoutBtn: {
    marginTop: 18,
    width: "86%",
    height: 46,
    backgroundColor: BRAND_BROWN,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 2,
  },
  checkoutText: { color: "#fff", fontWeight: "800", letterSpacing: 1 },

  suggestWrap: { marginTop: 40 },
  suggestTitle: {
    fontSize: 40,
    fontWeight: "500",
    color: BRAND_BROWN,
    marginBottom: 14,
  },
  suggestRow: { flexDirection: "row", gap: 14 },

  suggestCard: { width: "47%" },
  suggestImageWrap: { position: "relative" },
  suggestImage: { width: "100%", height: 160, borderRadius: 2 },
  suggestHeart: {
    position: "absolute",
    top: 8,
    left: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.9)",
    alignItems: "center",
    justifyContent: "center",
  },
  suggestPrice: { marginTop: 10, fontWeight: "800", color: "#111" },
  suggestName: { marginTop: 6, color: "#333", fontWeight: "600" },
});