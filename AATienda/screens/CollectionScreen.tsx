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
  Modal,
} from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import { RootStackParamList } from "../navigation/StackNavigator";

import AnnouncementBar from "../components/AnnouncementBar";
import HeaderUtilityBar from "../components/HeaderUtilityBar";
import AppHeader from "../components/AppHeader";

import { useCart } from "../context/CartContext";

type RouteProps = RouteProp<RootStackParamList, "Collection">;
type NavProps = NativeStackNavigationProp<RootStackParamList, "Collection">;

type Product = {
  id: string;
  title: string;
  image: string;
  price: string;
  compareAt?: string;
  onSale?: boolean;
  createdAt?: string; // for date sorts if exists
};

const BRAND_BROWN = "#54443D";
const SALE_RED = "#B04A55";
const BORDER = "rgba(0,0,0,0.18)";
const { width, height } = Dimensions.get("window");

function toNumber(v: string) {
  const n = Number(String(v).replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

type SortKey =
  | "BEST_SELLING"
  | "FEATURED"
  | "AZ"
  | "ZA"
  | "PRICE_LOW"
  | "PRICE_HIGH"
  | "DATE_OLD"
  | "DATE_NEW";

const SORT_LABEL: Record<SortKey, string> = {
  BEST_SELLING: "BEST SELLING",
  FEATURED: "FEATURED",
  AZ: "ALPHABETICALLY, A–Z",
  ZA: "ALPHABETICALLY, Z–A",
  PRICE_LOW: "PRICE, LOW TO HIGH",
  PRICE_HIGH: "PRICE, HIGH TO LOW",
  DATE_OLD: "DATE, OLD TO NEW",
  DATE_NEW: "DATE, NEW TO OLD",
};

export default function CollectionScreen() {
  const route = useRoute<RouteProps>();
  const navigation = useNavigation<NavProps>();
  const { handle, title } = route.params;

  const { addToCart } = useCart();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Filter/Sort UI state
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  // applied sort (what user applied)
  const [sortApplied, setSortApplied] = useState<SortKey>("BEST_SELLING");
  // draft sort (inside sidebar before apply)
  const [sortDraft, setSortDraft] = useState<SortKey>("BEST_SELLING");

  const GAP = 14;
  const PAD = 14;
  const CARD_W = useMemo(() => Math.floor((width - PAD * 2 - GAP) / 2), []);
  const IMG_H = Math.round(CARD_W * 1.05);

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handle]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch(`https://aatienda.com/collections/${handle}/products.json`);
      const data = await res.json();

      const mapped: Product[] = (data?.products || []).map((p: any) => {
        const price = String(p.variants?.[0]?.price ?? "0");
        const compareAt = String(
          p.variants?.[0]?.compare_at_price ??
            p.variants?.[0]?.compareAtPrice ??
            ""
        ).trim();

        const onSale =
          !!compareAt &&
          toNumber(compareAt) > 0 &&
          toNumber(compareAt) > toNumber(price);

        return {
          id: String(p.id),
          title: p.title ?? "",
          image: p.images?.[0]?.src ?? "",
          price,
          compareAt: compareAt || undefined,
          onSale,
          createdAt: p.created_at,
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

  // ✅ Apply sorting to products (client-side)
  const visibleProducts = useMemo(() => {
    const arr = [...products];

    switch (sortApplied) {
      case "AZ":
        return arr.sort((a, b) => a.title.localeCompare(b.title));
      case "ZA":
        return arr.sort((a, b) => b.title.localeCompare(a.title));
      case "PRICE_LOW":
        return arr.sort((a, b) => toNumber(a.price) - toNumber(b.price));
      case "PRICE_HIGH":
        return arr.sort((a, b) => toNumber(b.price) - toNumber(a.price));
      case "DATE_OLD":
        return arr.sort(
          (a, b) =>
            new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime()
        );
      case "DATE_NEW":
        return arr.sort(
          (a, b) =>
            new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
        );
      // BEST_SELLING / FEATURED: Shopify products.json doesn’t provide best-selling order reliably
      case "FEATURED":
      case "BEST_SELLING":
      default:
        return arr;
    }
  }, [products, sortApplied]);

  const addItemToCart = (item: Product) => {
    addToCart({
      id: item.id,
      name: item.title,
      price: String(Math.round(toNumber(item.price))),
      image: item.image,
      quantity: 1,
      option: "",
    } as any);
  };

  const buyNow = (item: Product) => {
    addItemToCart(item);
    navigation.navigate("Checkout");
  };

  const openFilter = () => {
    setSortDraft(sortApplied); // load current into draft
    setSortOpen(false);
    setFilterOpen(true);
  };

  const closeFilter = () => {
    setSortOpen(false);
    setFilterOpen(false);
  };

  const onRemoveAll = () => {
    setSortDraft("BEST_SELLING");
    // لاحقاً تقدر تمسح filters كمان
  };

  const onApply = () => {
    setSortApplied(sortDraft);
    closeFilter();
  };

  const renderHeader = () => (
    <View>
      <HeaderUtilityBar />
       
      <AppHeader />

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

      <Pressable style={styles.filterBar} onPress={openFilter}>
        <Ionicons name="options-outline" size={18} color="#222" />
        <Text style={styles.filterText}>FILTER &amp; SORT</Text>
      </Pressable>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={renderHeader}
        data={visibleProducts}
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
                    handle: handle, 
                  },
                })
              }
            >
              <View style={[styles.imageBox, { height: IMG_H }]}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <Pressable style={styles.heartBtn} onPress={() => {}}>
                  <Ionicons name="heart-outline" size={20} color="#222" />
                </Pressable>
              </View>

              <View style={styles.topPriceRow}>
                {item.onSale ? (
                  <View style={styles.saleRowLeft}>
                    <View style={styles.saleBadge}>
                      <Text style={styles.saleBadgeText}>SALE</Text>
                    </View>

                    <View style={styles.smallPricePill}>
                      <Text style={styles.smallPriceText}>
                        AED {Math.round(toNumber(item.price))}
                      </Text>
                    </View>
                  </View>
                ) : (
                  <View />
                )}
                <View />
              </View>

              <View style={styles.bigPriceRow}>
                <Text style={styles.bigPriceNow}>
                  AED {Math.round(toNumber(item.price))}
                </Text>
                {!!item.compareAt && (
                  <Text style={styles.bigPriceOld}>
                    AED {Math.round(toNumber(item.compareAt))}
                  </Text>
                )}
              </View>

              <Text style={styles.prodTitle} numberOfLines={1}>
                {item.title}
              </Text>
            </TouchableOpacity>

            <Pressable style={styles.addBtn} onPress={() => addItemToCart(item)}>
              <Text style={styles.addBtnText}>ADD TO CART</Text>
            </Pressable>

            <Pressable style={styles.quickBtn} onPress={() => buyNow(item)}>
              <Text style={styles.quickBtnText}>BUY NOW</Text>
            </Pressable>
          </View>
        )}
      />

      {/* ✅ Filter & Sort Sidebar (Modal) */}
      <Modal visible={filterOpen} transparent animationType="fade" onRequestClose={closeFilter}>
        <Pressable style={styles.sheetOverlay} onPress={closeFilter}>
          {/* stop closing when clicking inside */}
          <Pressable style={styles.sheet} onPress={() => {}}>
            {/* Header */}
            <View style={styles.sheetHeader}>
              <View style={{ alignItems: "center", flex: 1 }}>
                <Text style={styles.sheetTitle}>Filter and sort</Text>
                <Text style={styles.sheetSub}>{visibleProducts.length} products</Text>
              </View>

              <Pressable style={styles.closeBtn} onPress={closeFilter}>
                <Ionicons name="close" size={18} color="#111" />
              </Pressable>
            </View>

            {/* List */}
            <View style={styles.sheetBody}>
              <RowItem label="Availability" />
              <RowItem label="Price" />
              <RowItem label="Brand" />
              <RowItem label="Type" />

              {/* Sort dropdown like screenshot */}
              <View style={styles.sortRow}>
                <Text style={styles.sortLabel}>Sort by:</Text>

                <Pressable
                  style={styles.sortSelect}
                  onPress={() => setSortOpen((s) => !s)}
                >
                  <Text style={styles.sortSelectText}>{SORT_LABEL[sortDraft]}</Text>
                  <Ionicons name="chevron-down" size={16} color="#444" />
                </Pressable>
              </View>

              {sortOpen && (
                <View style={styles.sortDropdown}>
                  {(Object.keys(SORT_LABEL) as SortKey[]).map((k) => {
                    const active = sortDraft === k;
                    return (
                      <Pressable
                        key={k}
                        style={[styles.sortOpt, active && styles.sortOptActive]}
                        onPress={() => {
                          setSortDraft(k);
                          setSortOpen(false);
                        }}
                      >
                        <Text style={[styles.sortOptText, active && styles.sortOptTextActive]}>
                          {SORT_LABEL[k]}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              )}
            </View>

            {/* Footer buttons */}
            <View style={styles.sheetFooter}>
              <Pressable style={styles.removeAll} onPress={onRemoveAll}>
                <Text style={styles.removeAllText}>Remove all</Text>
              </Pressable>

              <Pressable style={styles.applyBtn} onPress={onApply}>
                <Text style={styles.applyText}>Apply</Text>
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

function RowItem({ label }: { label: string }) {
  return (
    <Pressable style={styles.sheetRow} onPress={() => {}}>
      <Text style={styles.sheetRowText}>{label}</Text>
      <Ionicons name="chevron-forward" size={18} color="#777" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },

  bannerWrap: {
    marginTop: 10,
    marginHorizontal: 14,
    height: 140,
    overflow: "hidden",
    backgroundColor: "#eee",
    position: "relative",
  },
  bannerImg: { width: "100%", height: "100%", resizeMode: "cover" },
  bannerOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.25)" },
  bannerTitle: {
    position: "absolute",
    alignSelf: "center",
    top: "40%",
    color: "#fff",
    fontSize: 20,
    fontWeight: "900",
    letterSpacing: 2,
  },

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
  filterText: { fontSize: 12, fontWeight: "900", letterSpacing: 3, color: "#222" },

  imageBox: {
    width: "100%",
    backgroundColor: "#f6f6f6",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  image: { width: "100%", height: "100%", resizeMode: "cover" },
  heartBtn: { position: "absolute", top: 10, left: 8, width: 34, height: 34, alignItems: "center", justifyContent: "center" },

  topPriceRow: { marginTop: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  saleRowLeft: { flexDirection: "row", alignItems: "center", gap: 8 },
  saleBadge: { backgroundColor: SALE_RED, paddingHorizontal: 10, paddingVertical: 6 },
  saleBadgeText: { color: "#fff", fontWeight: "900", fontSize: 11, letterSpacing: 1 },
  smallPricePill: { backgroundColor: "#9E9E9E", paddingHorizontal: 10, paddingVertical: 6 },
  smallPriceText: { color: "#fff", fontWeight: "900", fontSize: 11 },

  bigPriceRow: { marginTop: 10, flexDirection: "row", gap: 14, alignItems: "center" },
  bigPriceNow: { color: SALE_RED, fontWeight: "900", fontSize: 13 },
  bigPriceOld: { color: "#666", fontWeight: "800", fontSize: 13, textDecorationLine: "line-through" },

  prodTitle: { marginTop: 12, color: "#333", fontSize: 14, fontWeight: "600" },

  addBtn: { marginTop: 12, height: 44, backgroundColor: BRAND_BROWN, alignItems: "center", justifyContent: "center" },
  addBtnText: { color: "#fff", fontWeight: "900", letterSpacing: 1, fontSize: 12 },

  quickBtn: { marginTop: 10, height: 44, borderWidth: 1, borderColor: BORDER, alignItems: "center", justifyContent: "center", backgroundColor: "#fff" },
  quickBtnText: { color: "#555", fontWeight: "900", letterSpacing: 1, fontSize: 12 },

  /* ===== Filter Sheet styles (match screenshot) ===== */
  sheetOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "flex-end",
  },

  // panel that slides from bottom in screenshot? actually looks like full height panel.
  // We'll do full height sheet with margin top like screenshot.
  sheet: {
    height: height * 0.92,
    backgroundColor: "#fff",
  },

  sheetHeader: {
    height: 70,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
  },
  sheetTitle: { fontSize: 14, fontWeight: "800", color: "#222" },
  sheetSub: { marginTop: 4, fontSize: 12, color: "#999", fontWeight: "600" },
  closeBtn: {
    position: "absolute",
    right: 14,
    top: 18,
    width: 26,
    height: 26,
    borderWidth: 1,
    borderColor: "#111",
    alignItems: "center",
    justifyContent: "center",
  },

  sheetBody: { paddingTop: 10 },

  sheetRow: {
    height: 54,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sheetRowText: { fontSize: 14, color: "#777", fontWeight: "600" },

  sortRow: {
    marginTop: 10,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  sortLabel: { fontSize: 13, color: "#777", fontWeight: "700" },
  sortSelect: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#bbb",
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sortSelectText: { fontSize: 12, color: "#111", fontWeight: "800", letterSpacing: 2 },

  sortDropdown: {
    marginTop: 8,
    marginHorizontal: 18,
    borderWidth: 1,
    borderColor: "#bbb",
    backgroundColor: "#fff",
  },
  sortOpt: { paddingVertical: 12, paddingHorizontal: 12 },
  sortOptActive: { backgroundColor: "#BFE3F6" }, // blue highlight like screenshot
  sortOptText: { fontSize: 12, fontWeight: "800", letterSpacing: 1, color: "#111" },
  sortOptTextActive: { color: "#111" },

  sheetFooter: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 70,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    gap: 12,
    backgroundColor: "#fff",
  },
  removeAll: {
    flex: 1,
    height: 44,
    borderWidth: 1,
    borderColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  removeAllText: { color: "#777", fontWeight: "700" },

  applyBtn: {
    flex: 1,
    height: 44,
    backgroundColor: BRAND_BROWN,
    alignItems: "center",
    justifyContent: "center",
  },
  applyText: { color: "#fff", fontWeight: "800" },
});
