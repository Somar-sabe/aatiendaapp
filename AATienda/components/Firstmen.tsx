import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const HERO_HEIGHT = Math.round(width * 0.55);
const TILE_HEIGHT = Math.round(width * 0.45);

export default function FirstSection() {
  const [slideIndex, setSlideIndex] = useState(0);

  const slides = [
    {
      small: "Check Our New",
      big: "ITEMS",
      cta: "EXPLORE MORE →",
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80",
    },
    {
      small: "Personalize your",
      big: "MOOD",
      cta: "CHECK OUR COLLECTION →",
      image:
        "https://images.unsplash.com/photo-1520975867597-0f1c4a2b7a6a?auto=format&fit=crop&w=900&q=80",
    },
  ];

  const slide = slides[slideIndex];

  const prev = () =>
    setSlideIndex((i) => (i - 1 + slides.length) % slides.length);

  const next = () =>
    setSlideIndex((i) => (i + 1) % slides.length);

  return (
    <View style={styles.wrapper}>
      {/* QUOTE LINE */}
      <View style={styles.quoteRow}>
        <View style={styles.line} />
        <Text style={styles.quoteText}>“OH, HOW ELEGANT YOU ARE!”</Text>
        <View style={styles.line} />
      </View>

      {/* HERO */}
      <View style={[styles.hero, { height: HERO_HEIGHT }]}>
        <View style={styles.heroLeft}>
          <Text style={styles.heroSmall}>{slide.small}</Text>
          <Text style={styles.heroBig}>{slide.big}</Text>
          <Text style={styles.heroCta}>{slide.cta}</Text>
        </View>

        <View style={styles.heroRight}>
          <Image source={{ uri: slide.image }} style={styles.heroImage} />
        </View>
      </View>

      {/* ARROWS */}
      <View style={styles.arrowRow}>
        <ArrowBtn direction="left" onPress={prev} />
        <ArrowBtn direction="right" onPress={next} />
      </View>

      {/* 2 GRID IMAGES */}
      <View style={[styles.gridRow, { height: TILE_HEIGHT }]}>
        <View style={styles.gridItem}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=900&q=80",
            }}
            style={styles.gridImage}
          />
          <View style={styles.gridLabel}>
            <Text style={styles.gridLabelText}>ACCESSORIES</Text>
          </View>
        </View>

        <View style={styles.gridItem}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=80",
            }}
            style={styles.gridImage}
          />
          <View style={styles.gridLabel}>
            <Text style={styles.gridLabelText}>SUNGLASSES</Text>
          </View>
        </View>
      </View>

      {/* BOTTOM ARROWS */}
      <View style={styles.arrowRow}>
        <ArrowBtn direction="left" onPress={() => {}} />
        <ArrowBtn direction="right" onPress={() => {}} />
      </View>
    </View>
  );
}

function ArrowBtn({
  direction,
  onPress,
}: {
  direction: "left" | "right";
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={styles.arrowBtn} onPress={onPress}>
      <Ionicons
        name={direction === "left" ? "arrow-back" : "arrow-forward"}
        size={18}
        color="#111"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#fff",
  },

  /* Quote */
  quoteRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  line: {
    height: 1,
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  quoteText: {
    marginHorizontal: 12,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
  },

  /* Hero */
  hero: {
    flexDirection: "row",
    backgroundColor: "#5a4b45",
  },
  heroLeft: {
    flex: 1,
    paddingLeft: 16,
    justifyContent: "center",
  },
  heroSmall: {
    color: "#fff",
    fontSize: 12,
    fontStyle: "italic",
  },
  heroBig: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "800",
    marginTop: 2,
  },
  heroCta: {
    color: "#fff",
    fontSize: 11,
    marginTop: 8,
    fontWeight: "700",
  },
  heroRight: {
    width: width * 0.42,
    backgroundColor: "#fff",
  },
  heroImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },

  /* Arrows */
  arrowRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 14,
    paddingVertical: 14,
  },
  arrowBtn: {
    width: 44,
    height: 40,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.3)",
    alignItems: "center",
    justifyContent: "center",
  },

  /* Grid */
  gridRow: {
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 8,
  },
  gridItem: {
    flex: 1,
    overflow: "hidden",
  },
  gridImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  gridLabel: {
    position: "absolute",
    left: 10,
    right: 10,
    bottom: 12,
    height: 34,
    backgroundColor: "rgba(0,0,0,0.45)",
    alignItems: "center",
    justifyContent: "center",
  },
  gridLabelText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 2,
  },
});
