import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
  ImageBackground,
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
  // layout type to match your screenshots
  variant: "light-right" | "full-center" | "light-circle-right" | "full-center-warm";
  titleLines: string[];
  cta: string;
  // for background or right image
  bg?: string;
  right?: string;
};

const slides: Slide[] = [
  {
    id: "1",
    handle: "watches",
    variant: "light-right",
    titleLines: ["Discover the latest", "Watches Collection"],
    cta: "Discover Now",
    right:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "2",
    handle: "furniture",
    variant: "full-center",
    titleLines: ["Experience Elegance", "with Luxury Furniture"],
    cta: "Discover Now",
    bg: "https://images.unsplash.com/photo-1549187774-b4e9b0445b41?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "3",
    handle: "mens-shirts",
    variant: "light-circle-right",
    titleLines: ["Choose from the", "Stunning Collection", "of Men's Shirts"],
    cta: "Discover Now",
    right:
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "4",
    handle: "perfume",
    variant: "full-center-warm",
    titleLines: ["Choose the Perfume That", "Matches Your Personality"],
    cta: "Discover Now",
    bg: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "5",
    handle: "watches",
    variant: "light-right",
    titleLines: ["Discover the latest", "Watches Collection"],
    cta: "Discover Now",
    right:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80",
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
    }, 4500);

    return () => clearInterval(id);
  }, [currentIndex]);

  const go = (item: Slide) => {
    navigation.navigate("Collection", {
      handle: item.handle,
      title: item.titleLines.join(" "),
    });
  };

  const renderLightRight = (item: Slide) => (
    <TouchableOpacity activeOpacity={0.9} style={styles.slide} onPress={() => go(item)}>
      <View style={[styles.card, styles.cardLight]}>
        <View style={styles.leftText}>
          {item.titleLines.map((t, i) => (
            <Text key={i} style={[styles.lightTitle, i === 0 ? styles.lightTitleTop : null]}>
              {t}
            </Text>
          ))}

          <View style={styles.ctaOutline}>
            <Text style={styles.ctaOutlineText}>{item.cta}</Text>
          </View>
        </View>

        <View style={styles.rightImageWrap}>
          <Image source={{ uri: item.right! }} style={styles.rightImage} />
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderLightCircleRight = (item: Slide) => (
    <TouchableOpacity activeOpacity={0.9} style={styles.slide} onPress={() => go(item)}>
      <View style={[styles.card, styles.cardLight]}>
        <View style={[styles.leftText, { paddingRight: 10 }]}>
          {item.titleLines.map((t, i) => (
            <Text key={i} style={styles.lightTitle}>
              {t}
            </Text>
          ))}

          <View style={styles.ctaOutline}>
            <Text style={styles.ctaOutlineText}>{item.cta}</Text>
          </View>
        </View>

        <View style={styles.circleWrap}>
          <Image source={{ uri: item.right! }} style={styles.circleImage} />
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderFullCenter = (item: Slide, warm = false) => (
    <TouchableOpacity activeOpacity={0.9} style={styles.slide} onPress={() => go(item)}>
      <ImageBackground source={{ uri: item.bg! }} style={styles.bg} resizeMode="cover">
        <View
          style={[
            styles.bgOverlay,
            warm ? styles.bgOverlayWarm : styles.bgOverlayDark,
          ]}
        />

        <View style={styles.centerContent}>
          {item.titleLines.map((t, i) => (
            <Text key={i} style={styles.centerTitle}>
              {t}
            </Text>
          ))}

          <View style={styles.ctaOutlineOnBg}>
            <Text style={styles.ctaOutlineOnBgText}>{item.cta}</Text>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );

  const renderItem = ({ item }: { item: Slide }) => {
    if (item.variant === "light-right") return renderLightRight(item);
    if (item.variant === "light-circle-right") return renderLightCircleRight(item);
    if (item.variant === "full-center") return renderFullCenter(item, false);
    return renderFullCenter(item, true);
  };

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
      onMomentumScrollEnd={(e) => {
        const idx = Math.round(e.nativeEvent.contentOffset.x / width);
        setCurrentIndex(idx);
      }}
    />
  );
}

const CARD_H = 150;

const styles = StyleSheet.create({
  slide: {
    width,
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 10,
  },

  // shared containers
  card: {
    height: CARD_H,
    borderRadius: 6,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
  },

  cardLight: {
    backgroundColor: "#EDEDED",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.08)",
  },

  leftText: {
    flex: 1,
    paddingLeft: 18,
    paddingRight: 12,
    justifyContent: "center",
  },

  lightTitleTop: {
    marginBottom: 2,
  },

  lightTitle: {
    color: "#222",
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "500",
  },

  ctaOutline: {
    marginTop: 10,
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.55)",
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 3,
    backgroundColor: "rgba(255,255,255,0.4)",
  },
  ctaOutlineText: {
    color: "#222",
    fontWeight: "600",
    fontSize: 13,
  },

  rightImageWrap: {
    width: 150,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 10,
  },
  rightImage: {
    width: 140,
    height: 110,
    resizeMode: "contain",
  },

  circleWrap: {
    width: 150,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 10,
  },
  circleImage: {
    width: 120,
    height: 120,
    borderRadius: 999,
    resizeMode: "cover",
  },

  // full background styles
  bg: {
    height: CARD_H,
    borderRadius: 6,
    overflow: "hidden",
    justifyContent: "center",
  },

  bgOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  bgOverlayDark: {
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  bgOverlayWarm: {
    backgroundColor: "rgba(120, 70, 50, 0.38)",
  },

  centerContent: {
    paddingHorizontal: 18,
    alignItems: "center",
  },

  centerTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
    lineHeight: 20,
  },

  ctaOutlineOnBg: {
    marginTop: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.7)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 3,
    backgroundColor: "rgba(0,0,0,0.12)",
  },
  ctaOutlineOnBgText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 13,
  },
});
