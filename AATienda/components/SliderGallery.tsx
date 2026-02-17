import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
} from "react-native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/StackNavigator";

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Home">;
};

const { width } = Dimensions.get("window");

type Slide = {
  id: string;
  handle: string;
  image: string;
  title: string;
};

const slides: Slide[] = [
  {
    id: "1",
    handle: "electronic",
    image:
      "https://cdn.shopify.com/s/files/1/0725/5418/5021/files/reszie1440x500.jpg?v=1737103213",
    title: "Electronics",
  },
  {
    id: "2",
    handle: "abaya",
    image:
      "https://cdn.shopify.com/s/files/1/0725/5418/5021/files/Property_1_slider1_5080a59d-bc80-4dfd-bbcc-3e6483f5f9c8.png?v=1738162767",
    title: "Abaya",
  },
  {
    id: "3",
    handle: "clothes",
    image:
      "https://cdn.shopify.com/s/files/1/0725/5418/5021/files/Property_1_slider2_d1ede9b2-26e5-461a-9482-4530c478f2ec.png?v=1738162767",
    title: "Clothes",
  },
];

export default function SliderGallery({ navigation }: Props) {
  const flatListRef = useRef<FlatList<Slide>>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      const next = (currentIndex + 1) % slides.length;
      setCurrentIndex(next);
      flatListRef.current?.scrollToIndex({ index: next, animated: true });
    }, 4000);

    return () => clearInterval(id);
  }, [currentIndex]);

  const renderItem = ({ item }: { item: Slide }) => (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.slide}
      onPress={() =>
        navigation.navigate("Collection", {
          handle: item.handle,
          title: item.title,
        })
      }
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.overlay} />
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Shop Now</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      ref={flatListRef}
      data={slides}
      keyExtractor={(i) => i.id}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      renderItem={renderItem}
      getItemLayout={(_, index) => ({
        length: width,
        offset: width * index,
        index,
      })}
    />
  );
}

const styles = StyleSheet.create({
  slide: { width, height: Math.round((width * 9) / 16), overflow: "hidden" },
  image: { width, height: "100%", resizeMode: "cover" },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.25)",
  },
  content: { position: "absolute", bottom: 18, left: 16, right: 16 },
  title: { color: "#fff", fontSize: 22, fontWeight: "700", marginBottom: 10 },
  button: {
    alignSelf: "flex-start",
    backgroundColor: "#54443D",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  buttonText: { color: "#fff", fontWeight: "700" },
});