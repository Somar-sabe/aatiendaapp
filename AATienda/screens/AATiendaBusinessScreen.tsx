// AATiendaBusinessScreen.tsx (React Native / Expo)
// Copy-paste ready. Same sections: Hero w/ overlay + 3 benefits (row on desktop, column on mobile)
// + "It's easy to start" image + steps + Seller FAQs accordion (plus/minus).
// Buttons open the register page in browser.
import HeaderUtilityBar from "@/components/HeaderUtilityBar";
import AppHeader from "@/components/AppHeader";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/footer";
import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  useWindowDimensions,
  Linking,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const HERO_IMG =
  "https://cdn.shopify.com/s/files/1/0725/5418/5021/files/hero_section_3x_6bd10015-1095-4593-bea3-724c678e2414.png?v=1728545356";

const START_IMG =
  "https://cdn.shopify.com/s/files/1/0725/5418/5021/files/Frame_1321316367_3x_c3cfe2c9-9217-4082-a748-7447f8afa93a.png?v=1728632453";

const REGISTER_URL = "https://partners.aatienda.com/register.php";

const BENEFITS = [
  {
    title: "Millions of global buyers",
    text: "We’re one of the world’s largest marketplaces, connecting you with buyers near and far.",
  },
  {
    title: "We’ve got your back",
    text: "You’re protected by policies, monitoring, and a customer support team created to keep you and our community safe.",
  },
  {
    title: "A community of sellers",
    text: "Connect with other sellers through hosted meetups, community forums, seller events, and more.",
  },
];

const STEPS = [
  {
    n: "1",
    title: "Create a business selling account",
    text: "This step requires you have your bank account or credit card information, tax information, and government ID.",
  },
  {
    n: "2",
    title: "Set up your account policies",
    text: "Pick your shipping, return, and payment policy preferences that will then be used for your listings.",
  },
  {
    n: "3",
    title: "Upload your inventory",
    text: "Use our suite of tools to onboard your inventory and start selling!",
  },
];

const FAQS = [
  {
    q: "How much does it cost to sell on AATienda ?",
    a: "There is an annual subscription fee. Plus an average commission ranging from 5% to 25% per order, depending on the category. Please contact our team through contact form or our chat for more detail.",
  },
  {
    q: "Should I register as a business?",
    a: "Yes, all types of businesses, including LLCs, sole proprietorships, publicly traded companies, non-profits, and others, should register as a business on AATienda.",
  },
  {
    q: "How do I get paid from buyers?",
    a: "Payments are processed automatically and will be transferred to the bank account you registered with us on a weekly basis.",
  },
  {
    q: "What can I sell on AATienda?",
    a: "You can sell nearly any product or service, whether for B2B or B2C, including homemade goods and used or unused items. However, we do prohibit items that violate laws or infringe on intellectual property rights.",
  },
  {
    q: "How do I create an account?",
    a: 'To register as a business, select "Create a Business Account" on the registration page. We will request additional details, such as your business name, type, address, and supporting documents, along with your business account information.',
  },
  {
    q: "What information do I need to list an item?",
    a: "You will need pictures, a product title, a product description, and item specifics. Examples of effective listing titles include categories like Fashion, Furniture, and Service Names..",
  },
];

export default function AATiendaBusinessScreen() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const heroHeight = useMemo(() => {
    // HTML desktop hero: 600px; mobile same image but scale with width
    if (isMobile) return Math.round(width * 0.95);
    return 600;
  }, [isMobile, width]);

  const startImgSize = useMemo(() => {
    // Desktop: 626x564 in CSS; Mobile: full width
    if (isMobile) return { w: width, h: Math.round(width * 0.9) };
    return { w: 626, h: 564 };
  }, [isMobile, width]);

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const openRegister = async () => {
    try {
      const can = await Linking.canOpenURL(REGISTER_URL);
      if (can) await Linking.openURL(REGISTER_URL);
    } catch {}
  };

  const toggleFaq = (idx: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpenFaq((prev) => (prev === idx ? null : idx));
  };

  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.pageContent}>
          <AnnouncementBar />
          <HeaderUtilityBar />
          <AppHeader />
      {/* HERO */}
      <ImageBackground source={{ uri: HERO_IMG }} style={[styles.hero, { height: heroHeight }]}>
        <View style={styles.heroOverlay}>
          <Text style={[styles.heroTitle, !isMobile && { width: 584, height: 144, fontSize: 48, lineHeight: 72 }]}>
            Grow your business with AATienda
          </Text>

          <Pressable onPress={openRegister} style={({ pressed }) => [styles.heroBtn, pressed && styles.pressed]}>
            <Text style={styles.heroBtnText}>Start Selling</Text>
          </Pressable>
        </View>
      </ImageBackground>

      {/* BENEFITS */}
      <View style={[styles.section, { paddingHorizontal: isMobile ? 16 : 34 }]}>
        <View style={[styles.benefitsRow, isMobile && styles.benefitsCol]}>
          {BENEFITS.map((b, idx) => (
            <View key={idx} style={styles.benefitCard}>
              <Text style={[styles.milion, !isMobile && { paddingLeft: 40 }]}>{b.title}</Text>
              <Text style={[styles.meleon, !isMobile && { paddingLeft: 36 }]}>{b.text}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* START SECTION (desktop = image left + steps right) */}
      <View style={[styles.section, { paddingHorizontal: isMobile ? 0 : 34 }]}>
        {!isMobile ? (
          <View style={styles.startRow}>
            <View style={{ position: "relative" }}>
              <Image source={{ uri: START_IMG }} style={{ width: startImgSize.w, height: startImgSize.h }} />
              <View style={[styles.centerOverlay, { top: "50%" }]}>
                <Text style={styles.overlayTex}>It’s easy To start{"\n"}Your Business</Text>
              </View>
            </View>

            <View style={styles.stepsCol}>
              {STEPS.map((s, idx) => (
                <View key={idx} style={{ marginBottom: 18 }}>
                  <View style={styles.stepHead}>
                    <View style={styles.stepNum}>
                      <Text style={styles.stepNumText}>{s.n}</Text>
                    </View>
                    <Text style={styles.milion}>{s.title}</Text>
                  </View>
                  <Text style={styles.meleon}>{s.text}</Text>
                </View>
              ))}
            </View>
          </View>
        ) : (
          // MOBILE: image + overlay + steps below (like your second section)
          <View>
            <View style={{ position: "relative" }}>
              <Image source={{ uri: START_IMG }} style={{ width: startImgSize.w, height: startImgSize.h }} />
              <View style={[styles.centerOverlay, { top: "8%" }]}>
                <Text style={styles.overlayTex}>It’s easy To start{"\n"}Your Business</Text>
              </View>
            </View>

            <View style={{ padding: 16 }}>
              {STEPS.map((s, idx) => (
                <View key={idx} style={{ marginBottom: 18 }}>
                  <View style={styles.stepHead}>
                    <View style={styles.stepNum}>
                      <Text style={styles.stepNumText}>{s.n}</Text>
                    </View>
                    <Text style={styles.milion}>{s.title}</Text>
                  </View>
                  <Text style={styles.meleon}>{s.text}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </View>

      {/* SELLER FAQS (Accordion) */}
      <View style={[styles.accordiWrap, { paddingHorizontal: isMobile ? 16 : 34 }]}>
        <Text style={styles.faqTitle}>Seller FAQs</Text>

        {FAQS.map((f, idx) => {
          const opened = openFaq === idx;
          return (
            <View key={idx} style={[styles.accordiItem, !isMobile && styles.accordiItemDesktop]}>
              <Pressable onPress={() => toggleFaq(idx)} style={styles.accordiHeader}>
                <Text style={styles.accordiHeaderText}>{f.q}</Text>
                <Text style={styles.accordiPlus}>{opened ? "−" : "+"}</Text>
              </Pressable>

              {opened && (
                <View style={styles.accordiContent}>
                  <Text style={styles.accordiContentText}>{f.a}</Text>
                </View>
              )}
            </View>
          );
        })}
      </View>

      <View style={{ height: 24 }} />
       <Footer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: "#fff" },
  pageContent: { paddingBottom: 24 },

  hero: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  heroOverlay: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -0.5 }, { translateY: -0.5 }], // not real; RN ignores pixel-less translate
    // We'll center using wrapper instead:
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 16,
  },

  heroTitle: {
    color: "#fff",
    fontFamily: Platform.select({ ios: "System", android: "System", default: "System" }) as any,
    fontSize: 24,
    fontWeight: "600",
    lineHeight: 36,
    textAlign: "center",
    marginBottom: 10,
    width: 287,
  },

  heroBtn: {
    width: 180,
    height: 32,
    paddingHorizontal: 8,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },
  heroBtnText: {
    color: "#141414",
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 21.7,
  },
  pressed: { opacity: 0.85 },

  section: { width: "100%" },

  benefitsRow: {
    flexDirection: "row",
    gap: 20,
    alignItems: "flex-start",
    marginTop: 20,
    marginBottom: 20,
  },
  benefitsCol: {
    flexDirection: "column",
    gap: 20,
    alignItems: "center",
  },
  benefitCard: {
    flex: 1,
  },

  milion: {
    color: "#141414",
    fontSize: 24,
    fontWeight: "600",
    lineHeight: 28.8,
  },
  meleon: {
    color: "#292929",
    fontSize: 18,
    fontWeight: "400",
    lineHeight: 27.9,
    paddingLeft: 36,
    marginTop: 6,
  },

  startRow: {
    width: "100%",
    flexDirection: "row",
    gap: 20,
  },

  centerOverlay: {
    position: "absolute",
    left: "50%",
    transform: [{ translateX: -0.5 }], // RN ignores this kind; keep center using width
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  overlayTex: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "600",
    lineHeight: 36,
    textAlign: "center",
    width: 287,
  },

  stepsCol: {
    flex: 1,
    padding: 16,
    gap: 20,
  },

  stepHead: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  stepNum: {
    width: 40,
    height: 40,
    backgroundColor: "#292929",
    justifyContent: "center",
    alignItems: "center",
  },
  stepNumText: {
    color: "#ddd",
    fontSize: 20,
    fontWeight: "400",
  },

  accordiWrap: {
    width: "100%",
    backgroundColor: "#fafafa",
    paddingVertical: 20,
  },
  faqTitle: {
    color: "#141414",
    textAlign: "center",
    fontSize: 22,
    fontWeight: "600",
    lineHeight: 33,
    marginBottom: 16,
  },

  accordiItem: {
    backgroundColor: "#fafafa",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    overflow: "hidden",
    marginBottom: 10,
  },
  accordiItemDesktop: {
    borderWidth: 0,
  },

  accordiHeader: {
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  accordiHeaderText: {
    color: "#141414",
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 24.8,
    flex: 1,
    paddingRight: 12,
  },
  accordiPlus: {
    fontSize: 20,
    color: "#141414",
    fontWeight: "600",
  },

  accordiContent: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    backgroundColor: "#fafafa",
  },
  accordiContentText: {
    color: "#333",
    fontSize: 16,
    lineHeight: 24,
  },
});