import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Pressable,
  ImageBackground,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

type Product = {
  id: string;
  title: string;
  image: string;
  saleLabel?: string;
  price: string; // sale price
  compareAt?: string; // old price
  discountPrice?: string; // bottom red price
  discountCompareAt?: string; // bottom old
};

const TABS = ["CLOTHING", "BAGS", "SHOES", "WATCHES"] as const;

const PRODUCTS: Product[] = [
  {
    id: "1",
    title: "Dolce &...",
    image:
      "https://images.unsplash.com/photo-1520975693411-b28b3f3fa3b4?auto=format&fit=crop&w=900&q=80",
    saleLabel: "SALE",
    price: "€492",
    compareAt: "€114",
    discountPrice: "€622",
    discountCompareAt: "€1.114",
  },
  {
    id: "2",
    title: "Dolce &...",
    image:
      "https://images.unsplash.com/photo-1520975958221-5a4b2db0f2b1?auto=format&fit=crop&w=900&q=80",
    saleLabel: "SALE",
    price: "€273",
    compareAt: "€749",
    discountPrice: "€475",
    discountCompareAt: "€749",
  },
];

export default function JustForYouSection() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("CLOTHING");

  const cardW = useMemo(() => {
    const gap = 14;
    const pad = 14;
    return Math.floor((width - pad * 2 - gap) / 2);
  }, []);

  return (
    <View style={styles.wrap}>
      {/* TOP SALE BANNER */}
      <ImageBackground
        source={{
          uri: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1400&q=80",
        }}
        style={styles.banner}
        resizeMode="cover"
      >
        <View style={styles.bannerOverlay} />
        <View style={styles.bannerContent}>
          <Text style={styles.bannerSmall}>UP TO</Text>
          <Text style={styles.bannerBig}>70%</Text>
          <Text style={styles.bannerSmallInline}>SALE</Text>
          <Text style={styles.bannerDesc}>
            Catch the MADNESS SALE before it ends.
          </Text>

          <Pressable style={styles.shopNowBtn}>
            <Text style={styles.shopNowText}>SHOP NOW</Text>
          </Pressable>
        </View>
      </ImageBackground>

      {/* JUST FOR YOU + SHOP ALL */}
      <View style={styles.rowTitle}>
        <Text style={styles.justForYou}>JUST FOR YOU</Text>
        <Pressable style={styles.shopAllBtn}>
          <Text style={styles.shopAllText}>SHOP ALL →</Text>
        </Pressable>
      </View>

      {/* ARROWS */}
      <View style={styles.arrowsRow}>
        <Pressable style={styles.arrowBtn}>
          <Ionicons name="arrow-back" size={16} color="#111" />
        </Pressable>
        <Pressable style={styles.arrowBtn}>
          <Ionicons name="arrow-forward" size={16} color="#111" />
        </Pressable>
      </View>

      {/* PRODUCTS OF THE WEEK HEADER */}
      <View style={styles.powHeader}>
        <Text style={styles.powText}>PRODUCTS OF THE WEEK</Text>
      </View>

      {/* TABS */}
      <View style={styles.tabsRow}>
        {TABS.map((t) => {
          const active = t === tab;
          return (
            <Pressable
              key={t}
              onPress={() => setTab(t)}
              style={[styles.tab, active && styles.tabActive]}
            >
              <Text style={[styles.tabText, active && styles.tabTextActive]}>
                {t}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* PRODUCT GRID */}
      <FlatList
        data={PRODUCTS}
        keyExtractor={(i) => i.id}
        numColumns={2}
        scrollEnabled={false}
        columnWrapperStyle={{ gap: 14 }}
        contentContainerStyle={{ paddingHorizontal: 14, paddingBottom: 16 }}
        renderItem={({ item }) => (
          <View style={[styles.card, { width: cardW }]}>
            <View style={styles.imageBox}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <Pressable style={styles.heartBtn}>
                <Ionicons name="heart-outline" size={18} color="#222" />
              </Pressable>
            </View>

            {/* SALE + PRICES row */}
            <View style={styles.priceRowTop}>
              {!!item.saleLabel && (
                <View style={styles.saleBadge}>
                  <Text style={styles.saleBadgeText}>{item.saleLabel}</Text>
                </View>
              )}

              <View style={styles.rightPrices}>
                <Text style={styles.priceNow}>{item.price}</Text>
                {!!item.compareAt && (
                  <Text style={styles.priceOld}>{item.compareAt}</Text>
                )}
              </View>
            </View>

            {/* Bottom prices */}
            <View style={styles.priceRowBottom}>
              {!!item.discountPrice && (
                <Text style={styles.discountNow}>{item.discountPrice}</Text>
              )}
              {!!item.discountCompareAt && (
                <Text style={styles.discountOld}>{item.discountCompareAt}</Text>
              )}
            </View>

            <Text style={styles.prodTitle} numberOfLines={1}>
              {item.title}
            </Text>

            {/* Buttons */}
            <Pressable style={styles.addBtn}>
              <Text style={styles.addBtnText}>ADD TO CART</Text>
            </Pressable>

            <Pressable style={styles.quickBtn}>
              <Text style={styles.quickBtnText}>QUICK VIEW</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: "#fff",
  },

  /* Banner */
  banner: {
    width: "100%",
    height: Math.round(width * 0.62),
    justifyContent: "center",
  },
  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.20)",
  },
  bannerContent: {
    alignItems: "center",
    paddingHorizontal: 18,
  },
  bannerSmall: {
    color: "#fff",
    fontWeight: "700",
    letterSpacing: 2,
    fontSize: 14,
  },
  bannerBig: {
    color: "#fff",
    fontWeight: "900",
    fontSize: 48,
    marginTop: 2,
    lineHeight: 52,
  },
  bannerSmallInline: {
    color: "#fff",
    fontWeight: "700",
    letterSpacing: 2,
    fontSize: 16,
    marginTop: 4,
  },
  bannerDesc: {
    color: "#fff",
    marginTop: 10,
    fontSize: 13,
    fontWeight: "600",
  },
  shopNowBtn: {
    marginTop: 14,
    backgroundColor: "rgba(60,45,40,0.85)",
    paddingHorizontal: 22,
    paddingVertical: 10,
  },
  shopNowText: {
    color: "#fff",
    fontWeight: "800",
    letterSpacing: 1,
    fontSize: 12,
  },

  /* Title row */
  rowTitle: {
    paddingHorizontal: 14,
    paddingTop: 14,
    paddingBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  justForYou: {
    fontSize: 18,
    fontWeight: "900",
    color: "#111",
    letterSpacing: 1,
  },
  shopAllBtn: {
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  shopAllText: {
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 2,
    color: "#222",
  },

  /* arrows */
  arrowsRow: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 14,
    paddingBottom: 12,
  },
  arrowBtn: {
    width: 46,
    height: 40,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.25)",
    alignItems: "center",
    justifyContent: "center",
  },

  /* Products of week */
  powHeader: {
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e9e9e9",
  },
  powText: {
    fontSize: 14,
    fontWeight: "800",
    letterSpacing: 3,
    color: "#8a5a3a",
  },

  /* Tabs */
  tabsRow: {
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: "#e9e9e9",
  },
  tab: {
    flex: 1,
    height: 36,
    backgroundColor: "#bdbdbd",
    alignItems: "center",
    justifyContent: "center",
  },
  tabActive: {
    backgroundColor: "#111",
  },
  tabText: {
    color: "#fff",
    fontWeight: "900",
    letterSpacing: 2,
    fontSize: 11,
  },
  tabTextActive: {
    color: "#fff",
  },

  /* Product Card */
  card: {
    backgroundColor: "#fff",
    paddingTop: 10,
  },
  imageBox: {
    width: "100%",
    height: Math.round(width * 0.52),
    backgroundColor: "#f3f3f3",
    position: "relative",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  heartBtn: {
    position: "absolute",
    top: 10,
    left: 10,
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },

  priceRowTop: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  saleBadge: {
    backgroundColor: "#b04a55",
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  saleBadgeText: {
    color: "#fff",
    fontWeight: "900",
    fontSize: 11,
    letterSpacing: 1,
  },
  rightPrices: {
    alignItems: "flex-end",
  },
  priceNow: {
    color: "#111",
    fontWeight: "900",
    fontSize: 13,
  },
  priceOld: {
    marginTop: 2,
    color: "#666",
    textDecorationLine: "line-through",
    fontSize: 11,
    fontWeight: "700",
  },

  priceRowBottom: {
    marginTop: 10,
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
  },
  discountNow: {
    color: "#b04a55",
    fontWeight: "900",
    fontSize: 12,
  },
  discountOld: {
    color: "#666",
    textDecorationLine: "line-through",
    fontSize: 12,
    fontWeight: "700",
  },

  prodTitle: {
    marginTop: 14,
    color: "#333",
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 10,
  },

  addBtn: {
    height: 42,
    backgroundColor: "#5a4b45",
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
    height: 42,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.35)",
    alignItems: "center",
    justifyContent: "center",
  },
  quickBtnText: {
    color: "#444",
    fontWeight: "900",
    letterSpacing: 1,
    fontSize: 12,
  },
});
