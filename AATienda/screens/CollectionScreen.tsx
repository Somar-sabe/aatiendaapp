import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Pressable,
  Dimensions,
} from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import { RootStackParamList } from "../navigation/StackNavigator";

import AnnouncementBar from "../components/AnnouncementBar";
import HeaderUtilityBar from "../components/HeaderUtilityBar";
import AppHeader from "../components/AppHeader";

type RouteProps = RouteProp<RootStackParamList, "Collection">;
type NavProps = NativeStackNavigationProp<RootStackParamList, "Collection">;

type Product = {
  id: string;
  title: string;
  image: string;
  price: string;
  compareAt?: string; // optional (Shopify may not provide)
  onSale?: boolean;
};

const BRAND_BROWN = "#54443D";
const SALE_RED = "#B04A55";
const BORDER = "rgba(0,0,0,0.18)";
const { width } = Dimensions.get("window");

function toNumber(v: string) {
  const n = Number(String(v).replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

export default function CollectionScreen() {
  const route = useRoute<RouteProps>();
  const navigation = useNavigation<NavProps>();
  const { handle, title } = route.params;

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // sizes like screenshot
  const GAP = 14;
  const PAD = 14;
  const CARD_W = useMemo(() => {
    return Math.floor((width - PAD * 2 - GAP) / 2);
  }, []);
  const IMG_H = Math.round(CARD_W * 1.05);

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handle]);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `https://aatienda.com/collections/${handle}/products.json`
      );
      const data = await res.json();

      const mapped: Product[] = (data?.products || []).map((p: any) => {
        const price = String(p.variants?.[0]?.price ?? "0");

        // Compare-at price is not always present in storefront JSON.
        // If it exists, we show SALE + strike-through like screenshot.
        const compareAt = String(
          p.variants?.[0]?.compare_at_price ?? p.variants?.[0]?.compareAtPrice ?? ""
        ).trim();

        const onSale =
          !!compareAt && toNumber(compareAt) > 0 && toNumber(compareAt) > toNumber(price);

        return {
          id: String(p.id),
          title: p.title ?? "",
          image: p.images?.[0]?.src ?? "",
          price,
          compareAt: compareAt || undefined,
          onSale,
        };
      });

      setProducts(mapped);
    } catch (e) {
      console.log("Error loading collection", e);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const renderHeader = () => (
    <View>
      <HeaderUtilityBar />
      <AnnouncementBar />
      <AppHeader />

      {/* Banner like screenshot */}
      <View style={styles.bannerWrap}>
        <Image
          source={{
            uri:
              products?.[0]?.image ||
              "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1400&q=80",
          }}
          style={styles.bannerImg}
        />
        <View style={styles.bannerOverlay} />
        <Text style={styles.bannerTitle}>{(title || handle || "").toUpperCase()}</Text>
      </View>

      {/* FILTER & SORT row */}
      <Pressable style={styles.filterBar} onPress={() => {}}>
        <Ionicons name="options-outline" size={18} color="#222" />
        <Text style={styles.filterText}>FILTER &amp; SORT</Text>
      </Pressable>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={renderHeader}
        data={products}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{ gap: GAP, paddingHorizontal: PAD }}
        contentContainerStyle={{ paddingBottom: 22 }}
        renderItem={({ item }) => (
          <View style={{ width: CARD_W, marginTop: 14 }}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() =>
                navigation.navigate("Product", {
                  product: {
                    id: item.id,
                    name: item.title,
                    price: item.price,
                    img: item.image,
                  },
                })
              }
            >
              {/* product image box */}
              <View style={[styles.imageBox, { height: IMG_H }]}>
                <Image source={{ uri: item.image }} style={styles.image} />

                {/* heart icon */}
                <Pressable style={styles.heartBtn} onPress={() => {}}>
                  <Ionicons name="heart-outline" size={20} color="#222" />
                </Pressable>
              </View>

              {/* SALE + small price row */}
              <View style={styles.topPriceRow}>
                {item.onSale ? (
                  <View style={styles.saleRowLeft}>
                    <View style={styles.saleBadge}>
                      <Text style={styles.saleBadgeText}>SALE</Text>
                    </View>

                    <View style={styles.smallPricePill}>
                      <Text style={styles.smallPriceText}>
                        €{Math.round(toNumber(item.price))}
                      </Text>
                    </View>
                  </View>
                ) : (
                  <View />
                )}

                {/* (keep right empty like screenshot spacing) */}
                <View />
              </View>

              {/* big price row (red + strike) */}
              <View style={styles.bigPriceRow}>
                <Text style={styles.bigPriceNow}>
                  €{Math.round(toNumber(item.price))}
                </Text>

                {!!item.compareAt && (
                  <Text style={styles.bigPriceOld}>
                    €{Math.round(toNumber(item.compareAt))}
                  </Text>
                )}
              </View>

              {/* title */}
              <Text style={styles.prodTitle} numberOfLines={1}>
                {item.title}
              </Text>
            </TouchableOpacity>

            {/* Buttons under products (like screenshot) */}
            <Pressable style={styles.addBtn} onPress={() => {}}>
              <Text style={styles.addBtnText}>ADD TO CART</Text>
            </Pressable>

            <Pressable style={styles.quickBtn} onPress={() => {}}>
              <Text style={styles.quickBtnText}>QUICK VIEW</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },

  /* Banner */
  bannerWrap: {
    marginTop: 10,
    marginHorizontal: 14,
    height: 140,
    overflow: "hidden",
    backgroundColor: "#eee",
    position: "relative",
  },
  bannerImg: { width: "100%", height: "100%", resizeMode: "cover" },
  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.25)",
  },
  bannerTitle: {
    position: "absolute",
    alignSelf: "center",
    top: "40%",
    color: "#fff",
    fontSize: 20,
    fontWeight: "900",
    letterSpacing: 2,
  },

  /* filter bar */
  filterBar: {
    marginTop: 12,
    marginHorizontal: 14,
    backgroundColor: "#EFEFEF",
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  filterText: {
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 3,
    color: "#222",
  },

  /* product card parts */
  imageBox: {
    width: "100%",
    backgroundColor: "#f6f6f6",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  image: { width: "100%", height: "100%", resizeMode: "contain" },

  heartBtn: {
    position: "absolute",
    top: 10,
    left: 8,
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
  },

  topPriceRow: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  saleRowLeft: { flexDirection: "row", alignItems: "center", gap: 8 },
  saleBadge: {
    backgroundColor: SALE_RED,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  saleBadgeText: {
    color: "#fff",
    fontWeight: "900",
    fontSize: 11,
    letterSpacing: 1,
  },
  smallPricePill: {
    backgroundColor: "#9E9E9E",
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  smallPriceText: {
    color: "#fff",
    fontWeight: "900",
    fontSize: 11,
  },

  bigPriceRow: {
    marginTop: 10,
    flexDirection: "row",
    gap: 14,
    alignItems: "center",
  },
  bigPriceNow: {
    color: SALE_RED,
    fontWeight: "900",
    fontSize: 13,
  },
  bigPriceOld: {
    color: "#666",
    fontWeight: "800",
    fontSize: 13,
    textDecorationLine: "line-through",
  },

  prodTitle: {
    marginTop: 12,
    color: "#333",
    fontSize: 14,
    fontWeight: "600",
  },

  addBtn: {
    marginTop: 12,
    height: 44,
    backgroundColor: BRAND_BROWN,
    alignItems: "center",
    justifyContent: "center",
  },
  addBtnText: {
    color: "#fff",
    fontWeight: "900",
    letterSpacing: 1,
    fontSize: 12,
  },

  quickBtn: {
    marginTop: 10,
    height: 44,
    borderWidth: 1,
    borderColor: BORDER,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  quickBtnText: {
    color: "#555",
    fontWeight: "900",
    letterSpacing: 1,
    fontSize: 12,
  },
});
