import React, { useMemo, useState } from "react";
import { SvgXml } from "react-native-svg";
import { logoSvg } from "../assets/logo";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  ScrollView,
  Modal,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/StackNavigator";
import SearchOverlay from "./SearchOverlay";

// ✅ cart drawer
import CartDrawer from "./CartDrawer";

type NavProp = NativeStackNavigationProp<RootStackParamList>;

type DrawerLink = { label: string; handle?: string };

type DrawerSection = {
  label: string;
  handle?: string; // optional parent collection
  children?: DrawerLink[];
};

const WOMEN_CHILDREN: DrawerLink[] = [
  { label: "Abayas & Kaftans", handle: "abayas-kaftans" },
  { label: "Clothing", handle: "women-clothing" },
  { label: "Bags", handle: "women-bags" },
  { label: "Shoes", handle: "women-shoes" },
  { label: "Jewelry", handle: "women-jewelry" },
  { label: "Watches", handle: "women-watches" },
  { label: "Accessories", handle: "women-accessories" },
  { label: "Sunglasses & Frames", handle: "women-sunglasses-frames" },
];

const MEN_CHILDREN: DrawerLink[] = [
  { label: "Clothing", handle: "men-clothing" },
  { label: "Shoes", handle: "men-shoes" },
  { label: "Bags", handle: "men-bags" },
  { label: "Watches", handle: "men-watches" },
  { label: "Accessories", handle: "men-accessories" },
  { label: "Sunglasses & Frames", handle: "men-sunglasses-frames" },
];

const FURNITURE_CHILDREN: DrawerLink[] = [
  { label: "Beds", handle: "beds" },
  { label: "Sofas", handle: "sofas" },
  { label: "Dining Tables", handle: "diningtables" },
  { label: "Mirrors", handle: "mirrors" },
  { label: "Night Stands", handle: "nightstands" },
];

const GOLD_CHILDREN: DrawerLink[] = [
  { label: "Bracelets", handle: "bracelets" },
  { label: "Rings", handle: "rings" },
  { label: "Earrings", handle: "earrings" },
  { label: "Necklaces", handle: "necklaces" },
];
const SECTIONS: DrawerSection[] = [
  { label: "Women", handle: "women", children: WOMEN_CHILDREN },
  { label: "Men", handle: "men", children: MEN_CHILDREN },
  { label: "Baby", handle: "baby" },
  { label: "Furniture", handle: "furniture", children: FURNITURE_CHILDREN },
  { label: "Electronics", handle: "electronics" },
  { label: "Gold & Diamonds", handle: "gold-diamonds", children: GOLD_CHILDREN },
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
const [searchOpen, setSearchOpen] = useState(false);
const [searchText, setSearchText] = useState("");
  // ✅ which section is expanded (Women / Men)
  const [openSection, setOpenSection] = useState<string | null>("Women"); // default open like screenshot

  const goCollection = (handle?: string, title?: string) => {
    if (!handle) return;
    setMenuOpen(false);
    setCartOpen(false);
    navigation.navigate("Collection", { handle, title });
  };

  const toggleSection = (label: string) => {
    setOpenSection((prev) => (prev === label ? null : label));
  };

  const womenOpen = openSection === "Women";
  const menOpen = openSection === "Men";

  const renderSectionRow = (sec: DrawerSection) => {
    const isExpandable = !!sec.children?.length;
    const isOpen = openSection === sec.label;

    return (
      <View key={sec.label}>
        <Pressable
          style={styles.linkRow}
          onPress={() => {
            if (isExpandable) toggleSection(sec.label);
            else goCollection(sec.handle, sec.label);
          }}
        >
          <Text style={styles.linkText}>{sec.label}</Text>

          {isExpandable ? (
            <Ionicons
              name={isOpen ? "chevron-down" : "chevron-forward"}
              size={18}
              color="#999"
            />
          ) : (
            <Ionicons name="chevron-forward" size={18} color="#999" />
          )}
        </Pressable>

        {/* ✅ children list like screenshot */}
        {isExpandable && isOpen && (
          <View style={styles.childrenWrap}>
            {sec.children!.map((ch) => (
              <Pressable
                key={ch.label}
                style={styles.childRow}
                onPress={() => goCollection(ch.handle, ch.label)}
              >
                <Text style={styles.childText}>{ch.label}</Text>
                <Ionicons name="chevron-forward" size={16} color="#b0b0b0" />
              </Pressable>
            ))}
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.headerContainer}>
      {/* LEFT */}
      <Pressable
        onPress={() => {
          setCartOpen(false);
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
 <TouchableOpacity
  hitSlop={10}
  onPress={() => {
    setMenuOpen(false);
    setCartOpen(false);
    setSearchOpen(true);
  }}
>
  <Ionicons name="search" size={22} color="#000" />
</TouchableOpacity>


        <TouchableOpacity hitSlop={10} onPress={() => {}}>
          <Ionicons name="heart-outline" size={22} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity
          hitSlop={10}
          onPress={() => {
            setMenuOpen(false);
            setCartOpen(true);
          }}
        >
          <MaterialIcons name="shopping-cart" size={22} color="#000" />
        </TouchableOpacity>
      </View>

      {/* ✅ MENU DRAWER */}
      <Modal
        visible={menuOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setMenuOpen(false)}
      >
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
                <Text style={styles.currencyText}>EUR</Text>
                <Ionicons name="chevron-down" size={16} color="#222" />
              </Pressable>
            </View>

            {/* Login button */}
            <Pressable
              style={styles.loginBtn}
              onPress={() => {
                setMenuOpen(false);
                // navigation.navigate("Login"); // if you have Login screen
              }}
            >
              <Text style={styles.loginText}>Login/ Register</Text>
              <Ionicons name="person-outline" size={16} color="#fff" />
            </Pressable>

            {/* Links list */}
            <ScrollView showsVerticalScrollIndicator={false} style={styles.list}>
              {SECTIONS.map(renderSectionRow)}

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
                <Text style={styles.sellText}>Sell on AATienda</Text>
              </Pressable>

              <View style={{ height: 24 }} />
            </ScrollView>

            {/* small edge handle */}
            <View style={styles.edgeHandle}>
              <Ionicons name="chevron-forward" size={16} color="#666" />
            </View>
          </Pressable>
        </Pressable>
      </Modal>

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
      <SearchOverlay
  open={searchOpen}
  onClose={() => setSearchOpen(false)}
  value={searchText}
  onChange={setSearchText}
  onSubmit={() => {
    // ✅ هون بتقرر شو تعمل لما يعمل Search
    // مثال: روح على Collection handle ثابت للبحث (إذا عندك شاشة Search خاصة)
    // navigation.navigate("Search" as any, { q: searchText });

    // حاليا بس سكّر
    setSearchOpen(false);
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

  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.35)" },

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

  // ✅ Nested children styling like screenshot
  childrenWrap: {
    paddingLeft: 6,
    paddingRight: 6,
    paddingBottom: 6,
  },
  childRow: {
    paddingHorizontal: 14,
    height: 38,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  childText: {
    color: "#444",
    fontSize: 14,
    fontWeight: "500",
    opacity: 0.95,
  },

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
