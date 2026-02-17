import React, { useState } from "react";
import { SvgXml } from "react-native-svg";
import { logoSvg } from "../assets/logo";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RootStackParamList } from "../navigation/StackNavigator";

type NavProp = NativeStackNavigationProp<RootStackParamList>;

type MenuItem = { label: string; handle: string };

const MENU: { label: string; items: MenuItem[] }[] = [
  {
    label: "Men",
    items: [
      { label: "Clothes", handle: "men-clothing" },
      { label: "Shoes", handle: "men-shoes" },
    ],
  },
  {
    label: "Women",
    items: [
      { label: "Clothes", handle: "women-clothing" },
      { label: "Shoes", handle: "women-shoes" },
    ],
  },
  {
    label: "Furniture",
    items: [
      { label: "Sofas", handle: "sofas" },
      { label: "Furniture", handle: "furniture" },
    ],
  },
];

export default function AppHeader() {
  const navigation = useNavigation<NavProp>();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);

  const go = (handle: string, title?: string) => {
    setMenuOpen(false);
    setOpenSection(null);
    navigation.navigate("Collection", { handle, title });
  };

  return (
    <View style={styles.headerContainer}>
      {/* LEFT */}
      <Pressable onPress={() => setMenuOpen(true)}>
        <Ionicons name="menu" size={26} color="#000" />
      </Pressable>

      {/* CENTER */}
      <SvgXml xml={logoSvg} width={120} height={40} />

      {/* RIGHT */}
      <View style={styles.icons}>
        <TouchableOpacity>
          <Ionicons name="search" size={22} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity>
          <Ionicons name="heart-outline" size={22} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
          <MaterialIcons name="shopping-cart" size={22} color="#000" />
        </TouchableOpacity>
      </View>

      {/* DRAWER */}
      {menuOpen && (
        <Pressable style={styles.overlay} onPress={() => setMenuOpen(false)}>
          {/* stop closing when clicking inside drawer */}
          <Pressable style={styles.drawer} onPress={() => {}}>
            {MENU.map((section) => (
              <View key={section.label}>
                <Pressable
                  style={styles.menuItem}
                  onPress={() =>
                    setOpenSection(
                      openSection === section.label ? null : section.label
                    )
                  }
                >
                  <Text style={styles.menuTitle}>{section.label}</Text>
                  <Ionicons
                    name={
                      openSection === section.label
                        ? "chevron-up"
                        : "chevron-down"
                    }
                    size={18}
                    color="#111"
                  />
                </Pressable>

                {openSection === section.label &&
                  section.items.map((it) => (
                    <Pressable
                      key={it.handle}
                      style={styles.subItem}
                      onPress={() => go(it.handle, it.label)}
                    >
                      <Text style={styles.subText}>{it.label}</Text>
                    </Pressable>
                  ))}
              </View>
            ))}
          </Pressable>
        </Pressable>
      )}
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
    backgroundColor: "rgba(0,0,0,0.3)",
    zIndex: 9999,
  },
  drawer: {
    backgroundColor: "#fff",
    width: "78%",
    height: "100%",
    paddingTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  menuTitle: { fontSize: 16, fontWeight: "700" },
  subItem: { paddingLeft: 32, paddingVertical: 12, backgroundColor: "#fafafa" },
  subText: { fontSize: 15, color: "#555" },
});