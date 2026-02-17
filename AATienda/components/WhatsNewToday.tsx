import React, { useMemo, useRef, useState } from "react";
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
import { Ionicons } from "@expo/vector-icons";

type Item = {
  id: string;
  title: string;
  price: string; // "1,322" or "1322"
  image: string;
  liked?: boolean;
};

type Props = {
  data: Item[];
  onPressItem?: (item: Item) => void;
  onToggleLike?: (item: Item) => void;
  onPressShopNow?: () => void;
};

const { width } = Dimensions.get("window");
const BRAND_BROWN = "#54443D";

export default function WhatsNewToday({
  data,
  onPressItem,
  onToggleLike,
  onPressShopNow,
}: Props) {
  const listRef = useRef<FlatList<Item>>(null);
  const [index, setIndex] = useState(0);

  const layout = useMemo(() => {
    const H_PADDING = 14;
    const GAP = 12;
    const VISIBLE = 3;

    const cardW = Math.floor((width - H_PADDING * 2 - GAP * (VISIBLE - 1)) / VISIBLE);
    const cardH = Math.round(cardW * 1.25);
    const snap = cardW + GAP;

    return { H_PADDING, GAP, VISIBLE, cardW, cardH, snap };
  }, []);

  const canScroll = data.length > 3;

  const goNext = () => {
    if (!canScroll) return;

    const maxIndex = Math.max(0, data.length - 3);
    const next = index + 1 > maxIndex ? 0 : index + 1;

    setIndex(next);
    listRef.current?.scrollToOffset({
      offset: next * layout.snap,
      animated: true,
    });
  };

  const onScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const x = e.nativeEvent.contentOffset.x;
    const newIndex = Math.round(x / layout.snap);
    setIndex(newIndex);
  };

  return (
    <View style={styles.wrap}>
      {/* Top text */}
      <Text style={styles.title}>Whats New Today</Text>
      <Text style={styles.subTitle}>Discover what just landed at AA Tienda</Text>

      <Pressable style={styles.shopNow} onPress={onPressShopNow}>
        <Text style={styles.shopNowText}>Shop Now</Text>
      </Pressable>

      {/* Slider */}
      <View style={{ position: "relative", marginTop: 14 }}>
        <FlatList
          ref={listRef}
          data={data}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: layout.H_PADDING,
            paddingBottom: 6,
          }}
          ItemSeparatorComponent={() => <View style={{ width: layout.GAP }} />}
          keyExtractor={(it) => it.id}
          snapToInterval={layout.snap}
          decelerationRate="fast"
          onMomentumScrollEnd={onScrollEnd}
          renderItem={({ item }) => (
            <Pressable
              style={[styles.card, { width: layout.cardW }]}
              onPress={() => onPressItem?.(item)}
            >
              <View style={[styles.imageBox, { height: layout.cardH }]}>
                <Image source={{ uri: item.image }} style={styles.image} />

                <Pressable
                  style={styles.heart}
                  onPress={() => onToggleLike?.(item)}
                  hitSlop={10}
                >
                  <Ionicons
                    name={item.liked ? "heart" : "heart-outline"}
                    size={18}
                    color="#333"
                  />
                </Pressable>
              </View>

              <Text style={styles.name} numberOfLines={2}>
                {item.title}
              </Text>

              <Text style={styles.price}>{item.price} AED</Text>
            </Pressable>
          )}
        />

        {/* Right circular arrow */}
        {canScroll && (
          <Pressable style={styles.nextBtn} onPress={goNext} hitSlop={10}>
            <Ionicons name="chevron-forward" size={18} color="#666" />
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: "#F7F7F7",
    paddingTop: 20,
    paddingBottom: 14,
  },

  title: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
    color: "#111",
  },

  subTitle: {
    marginTop: 6,
    textAlign: "center",
    fontSize: 13,
    color: "#777",
    fontWeight: "500",
  },

  shopNow: {
    marginTop: 14,
    alignSelf: "center",
    backgroundColor: BRAND_BROWN,
    paddingHorizontal: 26,
    height: 40,
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 160,
  },

  shopNowText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 13,
  },

  card: {
    backgroundColor: "transparent",
  },

  imageBox: {
    borderRadius: 4,
    overflow: "hidden",
    backgroundColor: "#f3f3f3",
    position: "relative",
  },

  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  heart: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.85)",
    alignItems: "center",
    justifyContent: "center",
  },

  name: {
    marginTop: 10,
    fontSize: 13,
    fontWeight: "600",
    color: "#222",
    textAlign: "center",
    lineHeight: 18,
    minHeight: 36,
    paddingHorizontal: 4,
  },

  price: {
    marginTop: 6,
    fontSize: 13,
    fontWeight: "700",
    color: "#333",
    textAlign: "center",
  },

  nextBtn: {
    position: "absolute",
    right: 6,
    top: "32%",
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#EDEDED",
    alignItems: "center",
    justifyContent: "center",
  },
});