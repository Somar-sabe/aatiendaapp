import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Pressable,
  SafeAreaView,
  ScrollView,
} from "react-native";

type Props = {
  onStartSelling?: () => void;
};

export default function SellerLandingLikeImage({ onStartSelling }: Props) {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.page} showsVerticalScrollIndicator={false}>
        {/* HERO */}
        <ImageBackground
          // Replace with your real image (local require or remote URL)
          source={{
            uri: "https://cdn.shopify.com/s/files/1/0725/5418/5021/files/hero_section_3x_6bd10015-1095-4593-bea3-724c678e2414.png?v=1728545356",
          }}
          style={styles.hero}
          imageStyle={styles.heroImg}
          resizeMode="cover"
        >
          {/* subtle dark overlay for readability */}
          <View style={styles.heroOverlay} />

          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>Grow your business{"\n"}with AATienda</Text>

            <Pressable
              onPress={onStartSelling}
              style={({ pressed }) => [
                styles.cta,
                pressed && { opacity: 0.9, transform: [{ scale: 0.99 }] },
              ]}
            >
              <Text style={styles.ctaText}>Start Selling</Text>
            </Pressable>
          </View>
        </ImageBackground>

        {/* CONTENT */}
        <View style={styles.content}>
          <Text style={styles.h2}>Millions of global buyers</Text>
          <Text style={styles.p}>
            We’re one of the world’s largest marketplaces, connecting you with buyers near and far.
          </Text>

          <Text style={[styles.h2, { marginTop: 22 }]}>We’ve got your back</Text>
          <Text style={styles.p}>
            You’re protected by policies, monitoring, and a customer support team created to keep you and our
            community safe.
          </Text>

          <Text style={[styles.h2, { marginTop: 22 }]}>A community of sellers</Text>
          <Text style={styles.p}>
            Connect with other sellers through hosted meetups, community forums, seller events, and more.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  page: { paddingBottom: 28 },

  hero: {
    width: "100%",
    height: 260,
    justifyContent: "flex-end",
  },
  heroImg: {
    // gives the “photo hero” feel
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.20)",
  },
  heroContent: {
    paddingHorizontal: 18,
    paddingBottom: 18,
    alignItems: "center",
    gap: 12,
  },
  heroTitle: {
    color: "#fff",
    fontSize: 28,
    lineHeight: 34,
    fontWeight: "800",
    textAlign: "center",
    textShadowColor: "rgba(0,0,0,0.35)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  cta: {
    backgroundColor: "#ECECEC",
    borderRadius: 3, // squared-ish like the screenshot
    paddingVertical: 12,
    paddingHorizontal: 22,
    minWidth: 210,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.12)",
  },
  ctaText: {
    color: "#111",
    fontWeight: "700",
    fontSize: 14,
    letterSpacing: 0.2,
  },

  content: {
    paddingHorizontal: 22,
    paddingTop: 26,
  },
  h2: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "800",
    color: "#111",
    marginBottom: 10,
  },
  p: {
    fontSize: 16,
    lineHeight: 24,
    color: "#444",
  },
});