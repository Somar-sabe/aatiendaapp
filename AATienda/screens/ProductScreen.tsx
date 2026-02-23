import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import { RootStackParamList } from "../navigation/StackNavigator";
import { useCart, CartItemType } from "../context/CartContext";

import ProductDetailsTabs from "../components/ProductDetailsTabs";
import ScreenLayout from "../components/ScreenLayout";

type Props = NativeStackScreenProps<RootStackParamList, "Product">;

const BRAND_BROWN = "#54443D";
const LIGHT_BTN = "#E6E6E6";
const TEXT_GRAY = "#777";
const BORDER = "#E5E5E5";
const PRICE_RED = "#C55A6A";

export default function ProductScreen({ route, navigation }: Props) {
  const { addToCart } = useCart();
  const product = route.params?.product;

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState<"S" | "M" | "XL">("S");

  // ✅ description from Shopify
  const [descHtml, setDescHtml] = useState<string>("");
  const [loadingDesc, setLoadingDesc] = useState(false);

  // ✅ fake compare price (مثل الصورة)
  const compareAt = useMemo(() => {
    const p = Number(product?.price || 0);
    if (!p) return null;
    return String(Math.round(p * 1.12));
  }, [product?.price]);

  // ✅ fetch real description from Shopify by product id inside its collection
  useEffect(() => {
    const loadDesc = async () => {
      // لازم يكون في handle حتى نعرف أي collection نجيب منها
      const handle = (product as any)?.handle;
      if (!product?.id || !handle) return;

      try {
        setLoadingDesc(true);
        const res = await fetch(
          `https://aatienda.com/collections/${handle}/products.json`
        );
        const data = await res.json();
        const found = (data?.products || []).find(
          (p: any) => String(p.id) === String(product.id)
        );
        setDescHtml(found?.body_html || "");
      } catch (e) {
        setDescHtml("");
      } finally {
        setLoadingDesc(false);
      }
    };

    loadDesc();
  }, [product?.id]);

  if (!product) {
    return (
      <ScreenLayout>
        <View style={styles.center}>
          <Text style={{ fontWeight: "700" }}>No product data found.</Text>
          <Pressable style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Text style={{ color: "#fff", fontWeight: "700" }}>Back</Text>
          </Pressable>
        </View>
      </ScreenLayout>
    );
  }

  const productForCart: CartItemType = {
    id: product.id ?? "",
    name: product.name ?? "",
    price: String(product.price ?? "0"),
    option: `Size ${size}`,
    image: product.img ?? "",
    quantity: qty,
  };

  const onAdd = () => {
    addToCart(productForCart);
  };

  const onBuyNow = () => {
    addToCart(productForCart);
    navigation.navigate("Checkout");
  };

  return (
    <ScreenLayout>
      <SafeAreaView style={styles.safe}>
        <View style={styles.container}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            // ✅ مهم جدًا: حتى ما يختفي المحتوى تحت الـ sticky buttons
            contentContainerStyle={[styles.scrollContent, { paddingBottom: 170 }]}
          >
            {/* Breadcrumb */}
            <Text style={styles.breadcrumb}>
              Home {"\u203A"} {productForCart.name}
            </Text>

            {/* Image Frame */}
            <View style={styles.imageFrame}>
              {!!productForCart.image ? (
                <Image
                  source={{ uri: productForCart.image }}
                  style={styles.image}
                  resizeMode="contain"
                />
              ) : (
                <View style={[styles.image, { backgroundColor: "#f1f1f1" }]} />
              )}

              {/* right overlay icons */}
              <View style={styles.imageRightIcons}>
                <Pressable style={styles.iconCircle} onPress={() => {}}>
                  <Ionicons name="share-social-outline" size={20} color="#111" />
                </Pressable>

                <Pressable style={styles.iconCircle} onPress={() => {}}>
                  <Ionicons name="heart-outline" size={22} color="#111" />
                </Pressable>
              </View>

              {/* left zoom icon */}
              <View style={styles.imageLeftIcons}>
                <Pressable style={styles.iconCircleSmall} onPress={() => {}}>
                  <Ionicons name="search" size={16} color="#111" />
                </Pressable>
              </View>
            </View>

            {/* arrows under image left */}
            <View style={styles.arrowsRow}>
              <Pressable style={styles.arrowBtn} onPress={() => {}}>
                <Ionicons name="arrow-back" size={18} color="#111" />
              </Pressable>
              <Pressable style={styles.arrowBtn} onPress={() => {}}>
                <Ionicons name="arrow-forward" size={18} color="#111" />
              </Pressable>
            </View>

            {/* Title */}
            <Text style={styles.title}>{productForCart.name}</Text>

            {/* Price row */}
            <View style={styles.priceRow}>
              <Text style={styles.priceNow}>{productForCart.price} AED</Text>
              {!!compareAt && (
                <Text style={styles.priceOld}>{compareAt} AED</Text>
              )}
            </View>

            {/* Quantity */}
            <Text style={styles.sectionLabel}>Quantity</Text>
            <View style={styles.qtyBox}>
              <Pressable
                style={styles.qtyBtn}
                onPress={() => setQty((q) => Math.max(1, q - 1))}
              >
                <Ionicons name="remove" size={18} color="#666" />
              </Pressable>

              <View style={styles.qtyMid}>
                <Text style={styles.qtyText}>{qty}</Text>
              </View>

              <Pressable
                style={styles.qtyBtn}
                onPress={() => setQty((q) => q + 1)}
              >
                <Ionicons name="add" size={18} color="#666" />
              </Pressable>
            </View>

            {/* Size */}
            <Text style={styles.sizeCaption}>Italian Size MEN</Text>
            <View style={styles.sizeRow}>
              <SizePill value="S" active={size === "S"} onPress={() => setSize("S")} />
              <SizePill value="M" active={size === "M"} onPress={() => setSize("M")} />
              <SizePill value="XL" active={size === "XL"} onPress={() => setSize("XL")} />
            </View>

            {/* Payment methods */}
            <Text style={styles.payCaption}>
              We support the following payment methods:
            </Text>
            <View style={styles.payRow}>
              <PayIcon label="AMEX" />
              <PayIcon label="Pay" />
              <PayIcon label="GPay" />
              <PayIcon label="PayPal" />
              <PayIcon label="VISA" bold />
              <PayIcon label="tamara" />
              <PayIcon label="tabby" />
            </View>

            {/* Tabs (✅ description from shopify + review UI like image) */}
            <ProductDetailsTabs
              descriptionHtml={descHtml}
              loadingDescription={loadingDesc}
            />

            {loadingDesc && !descHtml ? (
              <View style={{ paddingVertical: 10 }}>
                <ActivityIndicator />
              </View>
            ) : null}
          </ScrollView>

          {/* ✅ Sticky bottom bar (always visible) */}
          <View style={styles.stickyBar}>
            <Pressable style={styles.addToCart} onPress={onAdd}>
              <Text style={styles.addToCartText}>ADD TO CART</Text>
            </Pressable>

            <Pressable style={styles.buyNow} onPress={onBuyNow}>
              <Text style={styles.buyNowText}>Buy Now</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </ScreenLayout>
  );
}

function SizePill({
  value,
  active,
  onPress,
}: {
  value: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.sizePill,
        active ? styles.sizePillActive : styles.sizePillIdle,
      ]}
    >
      <Text
        style={[
          styles.sizeText,
          active ? styles.sizeTextActive : styles.sizeTextIdle,
        ]}
      >
        {value}
      </Text>
    </Pressable>
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
  safe: { flex: 1, backgroundColor: "#fff" },
  container: { flex: 1, backgroundColor: "#fff" },
  scrollContent: { paddingHorizontal: 14, paddingTop: 10 },

  center: { flex: 1, alignItems: "center", justifyContent: "center", gap: 12 },
  backBtn: {
    backgroundColor: BRAND_BROWN,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 8,
  },

  breadcrumb: {
    color: "#8a8a8a",
    fontSize: 13,
    fontWeight: "500",
    marginBottom: 10,
  },

  imageFrame: {
    width: "100%",
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: BORDER,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  image: { width: "92%", height: "92%" },

  imageRightIcons: {
    position: "absolute",
    right: 10,
    top: 10,
    gap: 12,
    alignItems: "center",
  },
  imageLeftIcons: {
    position: "absolute",
    left: 10,
    top: 10,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.95)",
    borderWidth: 1,
    borderColor: BORDER,
    alignItems: "center",
    justifyContent: "center",
  },
  iconCircleSmall: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "rgba(255,255,255,0.95)",
    borderWidth: 1,
    borderColor: BORDER,
    alignItems: "center",
    justifyContent: "center",
  },

  arrowsRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
    marginBottom: 8,
  },
  arrowBtn: {
    width: 44,
    height: 36,
    borderWidth: 1,
    borderColor: "#222",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },

  title: {
    marginTop: 14,
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
    textAlign: "center",
    lineHeight: 22,
  },

  priceRow: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "baseline",
    gap: 14,
  },
  priceNow: { fontSize: 16, fontWeight: "800", color: PRICE_RED },
  priceOld: {
    fontSize: 14,
    color: "#666",
    textDecorationLine: "line-through",
    fontWeight: "600",
  },

  sectionLabel: {
    marginTop: 18,
    textAlign: "center",
    color: TEXT_GRAY,
    fontWeight: "600",
    fontSize: 13,
  },

  qtyBox: {
    marginTop: 10,
    alignSelf: "center",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#bdbdbd",
    height: 42,
    width: 150,
    backgroundColor: "#fff",
  },
  qtyBtn: { width: 46, alignItems: "center", justifyContent: "center" },
  qtyMid: {
    flex: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "#bdbdbd",
    alignItems: "center",
    justifyContent: "center",
  },
  qtyText: { fontWeight: "700", color: "#222", fontSize: 14 },

  sizeCaption: {
    marginTop: 16,
    textAlign: "center",
    color: "#8a8a8a",
    fontSize: 12,
    fontWeight: "600",
  },
  sizeRow: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  sizePill: {
    minWidth: 38,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
  },
  sizePillActive: { backgroundColor: BRAND_BROWN },
  sizePillIdle: { backgroundColor: "#9B9B9B" },
  sizeText: { fontSize: 12, fontWeight: "800" },
  sizeTextActive: { color: "#fff" },
  sizeTextIdle: { color: "#fff" },

  payCaption: {
    marginTop: 18,
    textAlign: "center",
    fontSize: 12,
    color: "#777",
    fontWeight: "600",
  },
  payRow: {
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
  },
  payIcon: {
    height: 22,
    paddingHorizontal: 10,
    borderRadius: 4,
    backgroundColor: "#EFEFEF",
    alignItems: "center",
    justifyContent: "center",
  },
  payIconText: { fontSize: 10, color: "#111", fontWeight: "700" },

  stickyBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 14,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: BORDER,
    gap: 10,
  },
  addToCart: {
    height: 46,
    backgroundColor: BRAND_BROWN,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 2,
  },
  addToCartText: {
    color: "#fff",
    fontWeight: "800",
    letterSpacing: 2,
    fontSize: 12,
  },
  buyNow: {
    height: 46,
    backgroundColor: LIGHT_BTN,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 2,
  },
  buyNowText: { color: "#111", fontWeight: "800", fontSize: 13 },
});
