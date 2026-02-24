// GoldDiamondStepsScreen.tsx
// ✅ Expo / React Native screen (copy-paste)
// - Same content/logic as your HTML steps page
// - Responsive: desktop/web-like layout on wide screens, stacked cards on mobile
// - WhatsApp button opens chat

import React, { useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
  Linking,
  useWindowDimensions,
  Platform,
} from "react-native";

const WA_NUMBER = "+971507108807";
const WA_LINK = `https://wa.me/${WA_NUMBER.replace("+", "")}`;

type Step = {
  id: string;
  title: string;
  desc: string;
  image: string;
};

const STEPS: Step[] = [
  {
    id: "1",
    title: "Step One",
    desc: "Send us the design, the material you want and your address through WhatsApp",
    image:
      "https://cdn.shopify.com/s/files/1/0725/5418/5021/files/034f981cf2c2133f9d59305dbfae6843.png?v=1707827594",
  },
  {
    id: "2",
    title: "Step Two",
    desc: "If the design is approved, we will send you the confirmation and total price within 3 working days.",
    image:
      "https://cdn.shopify.com/s/files/1/0725/5418/5021/files/f6cef56ed0ed613088686376b1f80311.jpg?v=1707827595",
  },
  {
    id: "3",
    title: "Step Three",
    desc: "Your customized jewelry will be delivered to your doorstep within 3 weeks.",
    image:
      "https://cdn.shopify.com/s/files/1/0725/5418/5021/files/ce572f9f57694bd6ab8817450873edca.png?v=1707827595",
  },
];

export default function GoldDiamondStepsScreen() {
  const { width } = useWindowDimensions();
  const isWide = width >= 750; // like your CSS breakpoint

  const heroPadding = useMemo(() => (isWide ? 24 : 16), [isWide]);

  const openWhatsApp = async () => {
    const canOpen = await Linking.canOpenURL(WA_LINK);
    if (canOpen) return Linking.openURL(WA_LINK);
    // fallback
    return Linking.openURL(`https://api.whatsapp.com/send?phone=${WA_NUMBER.replace("+", "")}`);
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.page,
        { paddingHorizontal: heroPadding, paddingTop: heroPadding, paddingBottom: 28 },
      ]}
      showsVerticalScrollIndicator={false}
    >
      {/* Optional small header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Gold & Diamond Custom Order</Text>
        <Text style={styles.headerSub}>
          Follow these simple steps and we’ll take care of the rest.
        </Text>
      </View>

      {/* Steps */}
      {isWide ? (
        <View style={styles.wideContainer}>
          {STEPS.map((s) => (
            <WideRow key={s.id} step={s} />
          ))}
        </View>
      ) : (
        <View style={styles.mobileContainer}>
          {STEPS.map((s) => (
            <MobileCard key={s.id} step={s} />
          ))}
        </View>
      )}

      {/* Contact buttons */}
      <View style={[styles.contactRow, !isWide && { marginTop: 0 }]}>
        <Pressable
          onPress={openWhatsApp}
          style={({ pressed }) => [styles.iconBtn, pressed && styles.pressed]}
          accessibilityRole="button"
          accessibilityLabel="Open WhatsApp chat"
        >
          <Text style={styles.iconBtnText}>WA</Text>
        </Pressable>

        <Pressable
          onPress={openWhatsApp}
          style={({ pressed }) => [styles.chatBtn, pressed && styles.pressed]}
          accessibilityRole="button"
          accessibilityLabel="Chat with us now on WhatsApp"
        >
          <Text style={styles.chatBtnText}>Chat with us now</Text>
          <Text style={styles.arrow}>→</Text>
        </Pressable>
      </View>

      {/* Safe bottom spacing for iOS */}
      <View style={{ height: Platform.OS === "ios" ? 12 : 6 }} />
    </ScrollView>
  );
}

function MobileCard({ step }: { step: Step }) {
  return (
    <View style={styles.mobileCard}>
      <Image source={{ uri: step.image }} style={styles.mobileImg} resizeMode="cover" />

      <Text style={styles.stepTitle}>
        {step.title}
      </Text>

      <Text style={styles.stepDesc}>
        {step.desc}{" "}
        {step.id === "1" ? <Text style={styles.whatsGreen}>WhatsApp</Text> : null}
      </Text>
    </View>
  );
}

function WideRow({ step }: { step: Step }) {
  return (
    <View style={styles.wideRow}>
      <View style={styles.wideText}>
        <Text style={styles.stepTitleWide}>{step.title}</Text>
        <Text style={styles.stepDescWide}>
          {step.desc}{" "}
          {step.id === "1" ? <Text style={styles.whatsGreen}>WhatsApp</Text> : null}
        </Text>
      </View>

      <Image source={{ uri: step.image }} style={styles.wideImg} resizeMode="cover" />
    </View>
  );
}

const BROWN = "#54443D";
const LIGHT_BG = "rgba(221,221,221,0.18)";
const LIGHT_BG_MOBILE = "rgba(221,221,221,0.4)";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#fff",
  },

  header: {
    marginBottom: 14,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111",
  },
  headerSub: {
    marginTop: 6,
    fontSize: 13,
    color: "#6b7280",
    lineHeight: 18,
  },

  wideContainer: {
    gap: 14,
  },
  mobileContainer: {
    gap: 24,
    paddingBottom: 6,
  },

  // WIDE ROW
  wideRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 24,
    backgroundColor: LIGHT_BG,
    padding: 18,
  },
  wideText: {
    flex: 1,
  },
  wideImg: {
    width: 360,
    height: 160,
    borderRadius: 2,
  },
  stepTitleWide: {
    color: BROWN,
    fontSize: 16,
    letterSpacing: 3.04,
    textTransform: "uppercase",
    // Cormorant Garamond if available in your app; otherwise system font will be used
    fontFamily: Platform.select({ ios: "Cormorant Garamond", android: "Cormorant Garamond" }) as any,
    fontWeight: "500",
    marginBottom: 10,
  },
  stepDescWide: {
    color: "#000",
    fontSize: 14,
    lineHeight: 28,
    fontFamily: Platform.select({ ios: "Poppins", android: "Poppins" }) as any,
    fontWeight: "300",
  },

  // MOBILE CARD
  mobileCard: {
    backgroundColor: LIGHT_BG_MOBILE,
  },
  mobileImg: {
    width: "100%",
    height: 154,
  },
  stepTitle: {
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 14,
    color: BROWN,
    fontSize: 16,
    letterSpacing: 3.04,
    textTransform: "uppercase",
    fontFamily: Platform.select({ ios: "Cormorant Garamond", android: "Cormorant Garamond" }) as any,
    fontWeight: "500",
  },
  stepDesc: {
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 10,
    paddingBottom: 32,
    color: "#000",
    fontSize: 14,
    lineHeight: 28,
    fontFamily: Platform.select({ ios: "Poppins", android: "Poppins" }) as any,
    fontWeight: "300",
  },

  whatsGreen: {
    color: "#25D366",
    fontWeight: "600",
  },

  // CONTACT
  contactRow: {
    marginTop: 21,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    flexWrap: "wrap",
  },
  iconBtn: {
    width: 37,
    height: 37,
    backgroundColor: BROWN,
    alignItems: "center",
    justifyContent: "center",
  },
  iconBtnText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 12,
    letterSpacing: 0.5,
  },
  chatBtn: {
    height: 37,
    width: 243,
    backgroundColor: BROWN,
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  chatBtnText: {
    color: "#fff",
    fontSize: 14,
    letterSpacing: 2.1,
    textTransform: "uppercase",
    fontFamily: Platform.select({ ios: "Poppins", android: "Poppins" }) as any,
    fontWeight: "300",
  },
  arrow: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    marginTop: -1,
  },

  pressed: {
    opacity: 0.85,
  },
});