// FurnitureScreen.tsx
// ✅ Expo / React Native (copy-paste)
// - Mobile layout (<749) + Desktop layout (>=749)
// - Banner with overlay card + Explore on mobile
// - Categories grid: 1 col on mobile, 2 cols on desktop
// - Skeleton shimmer for all images (no libs)
// - Opens Shopify links with Linking

import React, { useEffect, useRef, useState } from "react";
import HeaderUtilityBar from "@/components/HeaderUtilityBar";
import AppHeader from "@/components/AppHeader";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/footer";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  Linking,
  Animated,
  Easing,
  useWindowDimensions,
  Platform,
} from "react-native";

const COLORS = {
  brown: "#54443D",
  white: "#fff",
  lightText: "#B0B0B0",
  overlay: "rgba(0,0,0,0.4)",
};

const BANNER =
  "https://cdn.shopify.com/s/files/1/0725/5418/5021/files/a8c5eda69779da081b32734d5d73df87.jpg?v=1709103222";

const PACKAGES_URL = "https://aatienda.com/pages/furniture-packages";

type Category = {
  id: string;
  title: string;
  img: string;
  url: string;
};

const CATEGORIES: Category[] = [
  {
    id: "beds",
    title: "Beds",
    url: "https://aatienda.com/collections/beds-sets",
    img: "https://cdn.shopify.com/s/files/1/0725/5418/5021/files/cb4c7d4f073040f7d1a15a559e8fe716.png?v=1707167970",
  },
  {
    id: "dining",
    title: "Dining Tables",
    url: "https://aatienda.com/collections/dining-tables",
    img: "https://cdn.shopify.com/s/files/1/0725/5418/5021/files/9893b65590a12d5a40fed79392069511.png?v=1707167965",
  },
  {
    id: "sofas",
    title: "Sofas",
    url: "https://aatienda.com/collections/sofas",
    img: "https://cdn.shopify.com/s/files/1/0725/5418/5021/files/b23cda471a1f6c1d3bb7a2cc5ad0cdb1.png?v=1707168747",
  },
  {
    id: "mirrors",
    title: "Mirrors",
    url: "https://aatienda.com/collections/mirrors",
    img: "https://cdn.shopify.com/s/files/1/0725/5418/5021/files/26488ac7db151b07387bf66bedb6188f.png?v=1707168747",
  },
  {
    id: "coffee",
    title: "Coffee Tables",
    url: "https://aatienda.com/collections/coffee-tables",
    img: "https://cdn.shopify.com/s/files/1/0725/5418/5021/files/c3eb73755a67c59644d1b2a8bd8da274.png?v=1707168747",
  },
  {
    id: "night",
    title: "Night Stands",
    url: "https://aatienda.com/collections/night-stands",
    img: "https://cdn.shopify.com/s/files/1/0725/5418/5021/files/dd61ecdd806542d9dd17e45f110f6581.png?v=1707168745",
  },
];

export default function FurnitureScreen() {
  const { width } = useWindowDimensions();
  const isMobile = width < 749;

  const openUrl = async (url: string) => {
    const can = await Linking.canOpenURL(url);
    if (can) return Linking.openURL(url);
  };

  const bannerHeight = isMobile ? 487 : 518;
  const categoryHeight = isMobile ? 164 : 341;

  return (
    <ScrollView
      contentContainerStyle={{ backgroundColor: COLORS.white, paddingBottom: 32 }}
      showsVerticalScrollIndicator={false}
    >
               
              <HeaderUtilityBar />
              <AppHeader />
      {/* Banner */}
      <View style={[styles.bannerWrap, { marginBottom: isMobile ? 0 : 64 }]}>
        <ShimmerImage uri={BANNER} height={bannerHeight} />

        {/* Overlay */}
        {isMobile ? (
          <Pressable onPress={() => openUrl(PACKAGES_URL)} style={({ pressed }) => [styles.mobileOverlay, pressed && styles.pressed]}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.containerText, { fontSize: 12, marginTop: 12, letterSpacing: 0 }]}>
                Discover our
              </Text>
              <Text style={[styles.containerTitle, { fontSize: 22, marginTop: -4 }]}>
                FURNITURE
              </Text>
              <Text
                style={[
                  styles.containerText,
                  {
                    fontSize: 12,
                    marginTop: -14,
                    textAlign: "center",
                    marginLeft: -55,
                    letterSpacing: 0,
                  },
                ]}
              >
                Packages
              </Text>
            </View>

            <View style={styles.exploreRow}>
              <Text style={styles.exploreText}>Explore</Text>
              <Text style={styles.exploreArrow}>→</Text>
            </View>
          </Pressable>
        ) : (
          <View style={styles.desktopWrapper}>
            <Pressable onPress={() => openUrl(PACKAGES_URL)} style={({ pressed }) => [styles.desktopContentBox, pressed && styles.pressed]}>
              <Text style={styles.containerText}>Discover our</Text>
              <Text style={styles.containerTitle}>FURNITURE</Text>
              <Text style={[styles.containerText, { marginTop: -20 }]}>Packages</Text>
            </Pressable>
          </View>
        )}
      </View>

      {/* Categories Grid */}
      <View style={{ paddingHorizontal: isMobile ? 24 : 0 }}>
        <View
          style={[
            styles.grid,
            {
              margin: isMobile ? 0 : 0,
              paddingHorizontal: isMobile ? 0 : 0,
              gap: 0,
            },
          ]}
        >
          {CATEGORIES.map((c) => (
            <Pressable
              key={c.id}
              onPress={() => openUrl(c.url)}
              style={({ pressed }) => [
                styles.card,
                {
                  width: isMobile ? "100%" : "50%",
                  height: categoryHeight,
                },
                pressed && styles.pressed,
              ]}
            >
              <ShimmerImage uri={c.img} height={categoryHeight} />

              <View
                style={[
                  styles.catOverlay,
                  {
                    width: isMobile ? 164 : 248,
                    height: isMobile ? 66 : 114,
                    left: isMobile ? 18 : 34,
                    paddingLeft: isMobile ? 24 : 34,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.catTitle,
                    {
                      fontSize: isMobile ? 14 : 22,
                      paddingTop: isMobile ? 20 : 0,
                      marginBottom: isMobile ? -8 : 0,
                      letterSpacing: isMobile ? 2.66 : 0,
                    },
                  ]}
                  numberOfLines={1}
                >
                  {c.title}
                </Text>

                <View
                  style={[
                    styles.catHr,
                    { width: isMobile ? 72 : 124, marginTop: isMobile ? 12 : 6 },
                  ]}
                />
              </View>
            </Pressable>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

/* ---------------- Shimmer Image (no libs) ---------------- */

function ShimmerImage({ uri, height }: { uri: string; height: number }) {
  const [loaded, setLoaded] = useState(false);
  const shimmer = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(shimmer, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    if (!loaded) loop.start();
    return () => loop.stop();
  }, [loaded, shimmer]);

  const translateX = shimmer.interpolate({
    inputRange: [0, 1],
    outputRange: [-240, 240],
  });

  return (
    <View style={[styles.imgWrap, { height }]}>
      {!loaded ? (
        <View style={styles.skeletonBase}>
          <Animated.View style={[styles.skeletonWave, { transform: [{ translateX }] }]} />
        </View>
      ) : null}

      <Image
        source={{ uri }}
        style={[styles.img, { opacity: loaded ? 1 : 0 }]}
        resizeMode="cover"
        onLoadEnd={() => setLoaded(true)}
      />
    </View>
  );
}

/* ---------------- Styles ---------------- */

const styles = StyleSheet.create({
  pressed: { opacity: 0.86 },

  bannerWrap: {
    position: "relative",
  },

  desktopWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },

  desktopContentBox: {
    backgroundColor: COLORS.brown,
    marginLeft: 34,
    paddingVertical: 135,
    paddingHorizontal: 79,
    justifyContent: "center",
  },

  mobileOverlay: {
    position: "absolute",
    width: 280,
    height: 99,
    left: "50%",
    top: "50%",
    transform: [{ translateX: -140 }, { translateY: -49.5 }],
    backgroundColor: COLORS.brown,
    paddingLeft: 15,
    flexDirection: "row",
    alignItems: "center",
  },

  containerText: {
    color: COLORS.lightText,
    fontSize: 14,
    fontWeight: "300",
    textTransform: "uppercase",
    letterSpacing: 2.1,
    textAlign: "center",
    marginTop: -50,
    fontFamily: Platform.select({ ios: "Poppins", android: "Poppins" }) as any,
  },

  containerTitle: {
    color: COLORS.white,
    fontSize: 32,
    fontWeight: "300",
    textTransform: "uppercase",
    marginTop: -23,
    fontFamily: Platform.select({ ios: "Cormorant Garamond", android: "Cormorant Garamond" }) as any,
  },

  exploreRow: {
    position: "absolute",
    right: 12,
    bottom: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  exploreText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: "300",
    textTransform: "uppercase",
    fontFamily: Platform.select({ ios: "Poppins", android: "Poppins" }) as any,
  },
  exploreArrow: {
    color: COLORS.white,
    fontSize: 14,
    marginTop: -1,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  card: {
    position: "relative",
    overflow: "hidden",
  },

  catOverlay: {
    position: "absolute",
    top: "50%",
    transform: [{ translateY: -57 }],
    backgroundColor: COLORS.overlay,
    justifyContent: "center",
  },

  catTitle: {
    color: COLORS.white,
    fontWeight: "300",
    textTransform: "uppercase",
    fontFamily: Platform.select({ ios: "Cormorant Garamond", android: "Cormorant Garamond" }) as any,
  },

  catHr: {
    height: 1,
    borderColor: "rgba(255,255,255,0.3)",
    borderWidth: 0.5,
    opacity: 0.9,
  },

  /* image + skeleton */
  imgWrap: {
    width: "100%",
    overflow: "hidden",
    backgroundColor: "#f2f2f2",
  },
  img: {
    width: "100%",
    height: "100%",
  },
  skeletonBase: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#edefef",
    overflow: "hidden",
  },
  skeletonWave: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 140,
    height: "100%",
    backgroundColor: "rgba(255,255,255,0.55)",
  },
});