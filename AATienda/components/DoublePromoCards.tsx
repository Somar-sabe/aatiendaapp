import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");
const BRAND_BROWN = "#54443D";

type Card = {
  id: string;
  title: string;
  image: string;
  onPress?: () => void;
};

type Props = {
  left: Card;
  right: Card;
};

export default function DoublePromoCards({ left, right }: Props) {
  return (
    <View style={styles.wrap}>
      <PromoCard {...left} />
      <PromoCard {...right} />
    </View>
  );
}

function PromoCard({ title, image, onPress }: Card) {
  return (
    <View style={styles.card}>
      <View style={styles.imageBox}>
        <Image source={{ uri: image }} style={styles.image} />
      </View>

      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>

      <Pressable style={styles.btn} onPress={onPress}>
        <Text style={styles.btnText}>Shop now</Text>
      </Pressable>
    </View>
  );
}

const GAP = 14;
const PAD = 14;
const CARD_W = Math.floor((width - PAD * 2 - GAP) / 2);

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    gap: GAP,
    paddingHorizontal: PAD,
    paddingVertical: 12,
    backgroundColor: "#fff",
  },

  card: {
    width: CARD_W,
    alignItems: "center",
  },

  imageBox: {
    width: "100%",
    height: 130,
    borderRadius: 4, // مثل الصورة (خفيف)
    overflow: "hidden",
    backgroundColor: "#f2f2f2",
  },

  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  title: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "500",
    color: "#111",
    textAlign: "center",
  },

  btn: {
    marginTop: 10,
    height: 34,
    paddingHorizontal: 22,
    borderRadius: 3,
    backgroundColor: BRAND_BROWN,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 110,
  },

  btnText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 12,
    letterSpacing: 0.5,
  },
});