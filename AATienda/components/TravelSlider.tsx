import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Pressable,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/StackNavigator";

type Nav = NativeStackNavigationProp<RootStackParamList>;

const { width } = Dimensions.get("window");

type Slide = {
  id: string;
  image: string;
  title: string;
  description: string;
  buttonText: string;
  collectionHandle: string; // ✅ navigate inside app
  collectionTitle?: string;
};

export default function TravelSlider() {
  const navigation = useNavigation<Nav>();

  const slides: Slide[] = useMemo(
    () => [
      {
        id: "1",
        image:
          "https://cdn.shopify.com/s/files/1/0725/5418/5021/files/Property_1_slider2safo.png?v=1728300715",
        title: "Travel\nto The Best Destinations",
        description: "Evening Desert Safari with Dinner (Premium Camp)",
        buttonText: "Explore the World",
        collectionHandle: "travel-and-entertainment",
        collectionTitle: "Travel & Entertainment",
      },
      {
        id: "2",
        image:
          "https://cdn.shopify.com/s/files/1/0725/5418/5021/files/Property_1_slider_1safe.png?v=1728300715",
        title: "Travel\nto The Best Destinations",
        description:
          "Experience Adventure, Culture, and Tranquility in\nEnchanting Destinations",
        buttonText: "Explore the World",
        collectionHandle: "travel-and-entertainment",
        collectionTitle: "Travel & Entertainment",
      },
    ],
    []
  );

  const listRef = useRef<FlatList<Slide>>(null);
  const [index, setIndex] = useState(0);

  // ✅ Auto slide
  useEffect(() => {
    const t = setInterval(() => {
      const next = (index + 1) % slides.length;
      setIndex(next);
      listRef.current?.scrollToIndex({ index: next, animated: true });
    }, 4000);

    return () => clearInterval(t);
  }, [index, slides.length]);

  const onScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const x = e.nativeEvent.contentOffset.x;
    const next = Math.round(x / width);
    setIndex(next);
  };

  const goToCollection = (handle: string, title?: string) => {
    navigation.navigate("Collection", {
      handle,
      title: title || handle,
    });
  };

  return (
    <View style={styles.wrap}>
      <FlatList
        ref={listRef}
        data={slides}
        keyExtractor={(i) => i.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onScrollEnd}
        getItemLayout={(_, i) => ({ length: width, offset: width * i, index: i })}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => goToCollection(item.collectionHandle, item.collectionTitle)}
            style={styles.slide}
          >
            <Image source={{ uri: item.image }} style={styles.image} />

            {/* overlay center */}
            <View style={styles.centerOverlay}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.desc}>{item.description}</Text>

              <View style={styles.btn}>
                <Text style={styles.btnText}>{item.buttonText}</Text>
              </View>
            </View>

            {/* dark overlay */}
            <View style={styles.darkLayer} />
          </Pressable>
        )}
      />

      {/* Dots */}
      <View style={styles.dotsRow}>
        {slides.map((_, i) => (
          <View key={i} style={[styles.dot, i === index ? styles.dotOn : styles.dotOff]} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: "100%",
    height: 340,
    position: "relative",
    backgroundColor: "#fff",
  },

  slide: {
    width,
    height: 340,
    position: "relative",
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  darkLayer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.18)",
  },

  centerOverlay: {
    position: "absolute",
    left: 18,
    right: 18,
    top: 0,
    bottom: 0,
    zIndex: 5,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "800",
    textAlign: "center",
    lineHeight: 28,
  },

  desc: {
    marginTop: 12,
    color: "rgba(255,255,255,0.95)",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
    lineHeight: 18,
  },

  btn: {
    marginTop: 16,
    height: 38,
    paddingHorizontal: 22,
    borderRadius: 3,
    backgroundColor: "#E6E6E6",
    alignItems: "center",
    justifyContent: "center",
  },

  btnText: {
    color: "#111",
    fontWeight: "800",
    fontSize: 13,
  },

  dotsRow: {
    position: "absolute",
    bottom: 14,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    zIndex: 10,
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  dotOn: {
    backgroundColor: "#EDEDED",
  },
  dotOff: {
    backgroundColor: "rgba(255,255,255,0.35)",
  },
});