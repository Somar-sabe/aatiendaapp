import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  useWindowDimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/StackNavigator";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type Category = { id: string; title: string; image: string; handle: string };

const categories: Category[] = [
  {
    id: "1",
    title: "Men",
    image:
      "https://cdn.shopify.com/s/files/1/0725/5418/5021/files/men_img_3x_60ac147d-84fb-4672-89f6-a65b7fd39316.jpg?v=1728473063",
    handle: "men",
  },
  {
    id: "2",
    title: "Women",
    image:
      "https://cdn.shopify.com/s/files/1/0725/5418/5021/files/Frame_1321316343_3x_1.jpg?v=1728374877",
    handle: "women",
  },
  {
    id: "3",
    title: "Baby",
    image:
      "https://cdn.shopify.com/s/files/1/0725/5418/5021/files/Frame_1321316344.png?v=1726704715",
    handle: "baby",
  },
  {
    id: "4",
    title: "Furniture",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80",
    handle: "furniture",
  },
  {
    id: "5",
    title: "Gold &\nDiamonds",
    image:
      "https://images.unsplash.com/photo-1601121141461-9d6647bca1a3?auto=format&fit=crop&w=600&q=80",
    handle: "gold-diamonds",
  },
  {
    id: "6",
    title: "Perfume",
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=600&q=80",
    handle: "perfume",
  },
  {
    id: "7",
    title: "Electronics",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
    handle: "electronics",
  },
  {
    id: "8",
    title: "Furniture\nPackages",
    image:
      "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?auto=format&fit=crop&w=600&q=80",
    handle: "furniture-packages",
  },
  {
    id: "9",
    title: "Services",
    image:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=600&q=80",
    handle: "services",
  },
];

export default function CategoryGrid() {
  const navigation = useNavigation<NavigationProp>();
  const { width } = useWindowDimensions();

  // match the screenshot spacing
  const H_PADDING = 26;
  const GAP = 18;
  const ITEM_SIZE = Math.floor((width - H_PADDING * 2 - GAP * 2) / 3);

  return (
    <View style={[styles.container, { paddingHorizontal: H_PADDING }]}>
      <Text style={styles.header}>Shop By Categories</Text>

      <FlatList
        data={categories}
        keyExtractor={(i) => i.id}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={{ gap: GAP }}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.85}
            style={[styles.item, { width: ITEM_SIZE }]}
            onPress={() =>
              navigation.navigate("Collection", {
                handle: item.handle,
                title: item.title.replace("\n", " "),
              })
            }
          >
            <View
              style={[
                styles.imageWrap,
                { width: ITEM_SIZE, height: ITEM_SIZE, borderRadius: 10 },
              ]}
            >
              <Image
                source={{ uri: item.image }}
                style={styles.image}
                resizeMode="cover"
              />
            </View>

            <Text style={styles.title} numberOfLines={2}>
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    marginBottom: 18,
  },
  header: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
    color: "#111",
    marginBottom: 18,
  },
  listContent: {
    paddingBottom: 10,
    rowGap: 26, // vertical spacing between rows (like the screenshot)
  },
  item: {
    alignItems: "center",
  },
  imageWrap: {
    overflow: "hidden",
    backgroundColor: "#F2F2F2",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  title: {
    marginTop: 8,
    fontSize: 13,
    fontWeight: "500",
    color: "#111",
    textAlign: "center",
    lineHeight: 16,
  },
});