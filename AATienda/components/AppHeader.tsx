import React, { useState } from "react";
import { SvgXml } from "react-native-svg";
import { logoSvg } from "../assets/logo";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/StackNavigator";

// ✅ cart drawer
import CartDrawer from "./CartDrawer";

type NavProp = NativeStackNavigationProp<RootStackParamList>;

type DrawerLink = { label: string; handle?: string };

const MAIN_LINKS: DrawerLink[] = [
  { label: "Women", handle: "women" },
  { label: "Men", handle: "men" },
  { label: "Baby", handle: "baby" },
  { label: "Furniture", handle: "furniture" },
  { label: "Electronics", handle: "electronics" },
  { label: "Gold & Diamonds", handle: "gold-diamonds" },
  { label: "Perfume", handle: "perfume" },
  { label: "Best Sellers", handle: "best-sellers" },
];

const B2B_LINKS: DrawerLink[] = [
  { label: "Electronics", handle: "b2b-electronics" },
  { label: "Furniture Packages", handle: "furniture-packages" },
  { label: "Services", handle: "services" },
];

export default function AppHeader() {
  const navigation = useNavigation<NavProp>();

  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const goCollection = (handle?: string, title?: string) => {
    if (!handle) return;
    setMenuOpen(false);
    setCartOpen(false);
    navigation.navigate("Collection", { handle, title });
  };

  return (
    <View style={styles.headerContainer}>
      {/* LEFT */}
      <Pressable
        onPress={() => {
          setCartOpen(false); // ✅ لا يفتحوا سوا
          setMenuOpen(true);
        }}
        hitSlop={10}
      >
        <Ionicons name="menu" size={26} color="#000" />
      </Pressable>

      {/* CENTER */}
      <SvgXml xml={logoSvg} width={120} height={40} />

      {/* RIGHT */}
      <View style={styles.icons}>
        <TouchableOpacity hitSlop={10} onPress={() => {}}>
          <Ionicons name="search" size={22} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity hitSlop={10} onPress={() => {}}>
          <Ionicons name="heart-outline" size={22} color="#000" />
        </TouchableOpacity>

        {/* ✅ basket opens cart drawer */}
        <TouchableOpacity
          hitSlop={10}
          onPress={() => {
            setMenuOpen(false); // ✅ لا يفتحوا سوا
            setCartOpen(true);
          }}
        >
          <MaterialIcons name="shopping-cart" size={22} color="#000" />
        </TouchableOpacity>
      </View>

      {/* MENU DRAWER */}
      {menuOpen && (
        <Pressable style={styles.overlay} onPress={() => setMenuOpen(false)}>
          <Pressable style={styles.drawer} onPress={() => {}}>
            {/* Top row: language + currency */}
            <View style={styles.topRow}>
              <Pressable style={styles.langBtn} onPress={() => {}}>
                <Text style={styles.flag}>🇺🇸</Text>
                <Text style={styles.topText}>EN</Text>
                <Ionicons name="chevron-down" size={16} color="#222" />
              </Pressable>

              <Pressable style={styles.currencyBtn} onPress={() => {}}>
                <Text style={styles.currencyText}>AED</Text>
                <Ionicons name="chevron-down" size={16} color="#222" />
              </Pressable>
            </View>

            {/* Login button */}
            <Pressable style={styles.loginBtn} onPress={() => {}}>
              <Text style={styles.loginText}>Login/ Register</Text>
              <Ionicons name="person-outline" size={16} color="#fff" />
            </Pressable>

            {/* Links list */}
            <ScrollView showsVerticalScrollIndicator={false} style={styles.list}>
              {MAIN_LINKS.map((it) => (
                <Pressable
                  key={it.label}
                  style={styles.linkRow}
                  onPress={() => goCollection(it.handle, it.label)}
                >
                  <Text style={styles.linkText}>{it.label}</Text>
                  <Ionicons name="chevron-forward" size={18} color="#999" />
                </Pressable>
              ))}

              <Text style={styles.sectionTitle}>B2B categories</Text>

              {B2B_LINKS.map((it) => (
                <Pressable
                  key={it.label}
                  style={styles.linkRow}
                  onPress={() => goCollection(it.handle, it.label)}
                >
                  <Text style={styles.linkText}>{it.label}</Text>
                </Pressable>
              ))}

              <Pressable style={styles.sellRow} onPress={() => {}}>
                <Text style={styles.sellText}>Sell on AAtiend a</Text>
              </Pressable>

              <View style={{ height: 24 }} />
            </ScrollView>

            {/* small edge handle */}
            <View style={styles.edgeHandle}>
              <Ionicons name="chevron-forward" size={16} color="#666" />
            </View>
          </Pressable>
        </Pressable>
      )}

      {/* ✅ CART DRAWER */}
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        onGoToCart={() => {
          setCartOpen(false);
          navigation.navigate("Cart");
        }}
        onCheckout={() => {
          setCartOpen(false);
          navigation.navigate("Checkout");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 56,
    paddingHorizontal: 14,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 4,
    zIndex: 1000,
  },
  icons: { flexDirection: "row", gap: 16 },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.35)",
    zIndex: 9999,
  },

  drawer: {
    backgroundColor: "#DADADA",
    width: "72%",
    height: "100%",
    paddingTop: 14,
    paddingBottom: 16,
    position: "relative",
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    alignItems: "center",
    marginBottom: 10,
  },

  langBtn: { flexDirection: "row", alignItems: "center", gap: 6 },
  flag: { fontSize: 14 },
  topText: { fontSize: 13, fontWeight: "700", color: "#222" },

  currencyBtn: { flexDirection: "row", alignItems: "center", gap: 6 },
  currencyText: { fontSize: 12, fontWeight: "700", color: "#777" },

  loginBtn: {
    marginHorizontal: 14,
    marginTop: 6,
    backgroundColor: "#222",
    borderRadius: 6,
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  loginText: { color: "#fff", fontWeight: "800", fontSize: 13 },

  list: { marginTop: 12 },

  linkRow: {
    paddingHorizontal: 14,
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  linkText: { color: "#444", fontSize: 15, fontWeight: "500" },

  sectionTitle: {
    marginTop: 14,
    marginBottom: 6,
    paddingHorizontal: 14,
    color: "#333",
    fontWeight: "800",
  },

  sellRow: { paddingHorizontal: 14, paddingTop: 16 },
  sellText: { fontSize: 15, fontWeight: "800", color: "#333" },

  edgeHandle: {
    position: "absolute",
    right: -10,
    top: "34%",
    width: 20,
    height: 54,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: "#DADADA",
    alignItems: "center",
    justifyContent: "center",
    borderLeftWidth: 1,
    borderLeftColor: "rgba(0,0,0,0.08)",
  },
});