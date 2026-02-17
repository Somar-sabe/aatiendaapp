import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RootStackParamList } from "../navigation/StackNavigator";

import AnnouncementBar from "../components/AnnouncementBar";
import HeaderUtilityBar from "../components/HeaderUtilityBar";
import AppHeader from "../components/AppHeader";

type RouteProps = RouteProp<RootStackParamList, "Collection">;
type NavProps = NativeStackNavigationProp<RootStackParamList, "Collection">;

type Product = { id: string; title: string; image: string; price: string };

export default function CollectionScreen() {
  const route = useRoute<RouteProps>();
  const navigation = useNavigation<NavProps>();

  const { handle, title } = route.params;

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

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

      const mapped: Product[] = (data?.products || []).map((p: any) => ({
        id: String(p.id),
        title: p.title ?? "",
        image: p.images?.[0]?.src ?? "",
        price: String(p.variants?.[0]?.price ?? "0"),
      }));

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

  return (
    <View style={styles.container}>
      <AnnouncementBar />
      <AppHeader />
      <HeaderUtilityBar />

      {!!title && <Text style={styles.pageTitle}>{title}</Text>}

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.85}
            onPress={() =>
              navigation.navigate("Product", {
                product: {
                  id: item.id,
                  name: item.title,
                  price: item.price, // keep string to match your RootStackParamList
                  img: item.image,
                },
              })
            }
          >
            <Image source={{ uri: item.image }} style={styles.image} />

            <Text numberOfLines={2} style={styles.title}>
              {item.title}
            </Text>

            <Text style={styles.price}>AED {item.price}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },

  pageTitle: {
    paddingHorizontal: 12,
    paddingTop: 10,
    fontSize: 18,
    fontWeight: "800",
  },

  listContent: { padding: 12 },
  row: { justifyContent: "space-between", marginBottom: 12 },

  card: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    marginHorizontal: 6, // instead of gap for max compatibility
  },

  image: { width: "100%", height: 150, borderRadius: 8, marginBottom: 8 },
  title: { fontSize: 14, fontWeight: "600", color: "#333", textAlign: "center" },
  price: { fontSize: 14, fontWeight: "bold", color: "#B6515D", marginTop: 4 },
});