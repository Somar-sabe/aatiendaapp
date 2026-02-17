import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/StackNavigator";

type Nav = NativeStackNavigationProp<RootStackParamList>;

type Item = {
  id: string;
  title: string;
  image: string;
  handle: string; // ✅ we navigate by handle
};

const DATA: Item[] = [
  {
    id: "1",
    title: "Men",
    handle: "men",
    image:
      "https://cdn.shopify.com/s/files/1/0725/5418/5021/files/men_img_3x_60ac147d-84fb-4672-89f6-a65b7fd39316.jpg?v=1728473063",
  },
  {
    id: "2",
    title: "Women",
    handle: "women",
    image:
      "https://cdn.shopify.com/s/files/1/0725/5418/5021/files/Frame_1321316343_3x_1.jpg?v=1728374877",
  },
  {
    id: "3",
    title: "Perfume",
    handle: "perfume",
    image:
      "https://cdn.shopify.com/s/files/1/0725/5418/5021/files/Frame_1321316348.png?v=1726704716",
  },
];

export default function WeeklySellerSection() {
  const navigation = useNavigation<Nav>();

  const goToCollection = (item: Item) => {
    navigation.navigate("Collection", {
      handle: item.handle,
      title: item.title,
    });
  };

  const renderItem = ({ item }: { item: Item }) => {
    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.85}
        onPress={() => goToCollection(item)}
      >
        <Image source={{ uri: item.image }} style={styles.image} />
        <Text style={styles.title} numberOfLines={1}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Weekly Sellers</Text>

      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 12, gap: 12 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 14,
  },
  header: {
    fontSize: 18,
    fontWeight: "700",
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  card: {
    width: 140,
    borderRadius: 12,
    backgroundColor: "#fff",
    overflow: "hidden",
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 110,
    resizeMode: "cover",
  },
  title: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    fontSize: 14,
    fontWeight: "600",
    color: "#222",
  },
});