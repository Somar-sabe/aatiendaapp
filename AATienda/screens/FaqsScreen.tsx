// FaqsScreen.tsx (React Native / Expo)
// Copy-paste ready. Same layout + banner overlay + accordion with rotating arrow + Contact Us button.

import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Pressable,
  LayoutAnimation,
  Platform,
  UIManager,
  Linking,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import HeaderUtilityBar from "@/components/HeaderUtilityBar";
import AppHeader from "@/components/AppHeader";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/footer";

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const BANNER_URL =
  "https://cdn.shopify.com/s/files/1/0725/5418/5021/files/501089097d5100ff8a7eb250450a9ffb.jpg?v=1707745437";

const CONTACT_URL = "https://aatienda.com/pages/contact";

type FaqItem = { q: string; a: string };

const FAQS: FaqItem[] = [
  {
    q: "Are the products you sell original?",
    a: "All products we have in our Platform for branded items fashion catalog are 100% authentic products and are purchased directly from the brands, licensees, or official authorized distributors.",
  },
  {
    q: "Are the prices with or without VAT?",
    a: "Since we are providing a B2B and B2C partnership, we do not include VAT. All the prices you see is without VAT however there is taxes and duties will be applicable will be invoiced to you directly from the freighter company. For more information please contact the local customs authority as each country has different customs regulations.",
  },
  {
    q: "Do you accept returns?",
    a: "Our return policy allows returns within 7 days from the delivery date.",
  },
];

function ArrowIcon({ rotated }: { rotated: boolean }) {
  return (
    <View style={[styles.arrowWrap, rotated && styles.arrowRotated]}>
               
              <HeaderUtilityBar />
              <AppHeader />
      <Svg width={12} height={12} viewBox="0 0 12 12" fill="none">
        <Path d="M0 3L6 9L12 3H0Z" fill="#787878" />
      </Svg>
    </View>
  );
}

export default function FaqsScreen() {
  const { width } = useWindowDimensions();
  const isMobile = width < 749;

  // Match your CSS heights:
  // desktop: 11.567vw, mobile: 43.333vw
  const bannerHeight = useMemo(() => {
    const vw = isMobile ? 0.43333 : 0.11567;
    return Math.round(width * vw);
  }, [width, isMobile]);

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  const onContact = async () => {
    try {
      const can = await Linking.canOpenURL(CONTACT_URL);
      if (can) await Linking.openURL(CONTACT_URL);
    } catch {}
  };

  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.pageContent}>
      {/* Banner */}
      <View style={[styles.bannerWrap, { paddingHorizontal: isMobile ? 24 : 34, paddingTop: isMobile ? 24 : 34 }]}>
        <ImageBackground
          source={{ uri: BANNER_URL }}
          style={[styles.banner, { height: bannerHeight }]}
          imageStyle={styles.bannerImage}
        >
          <View style={styles.overlay}>
            <Text style={styles.faqText}>Need Help?</Text>
            <Text style={[styles.faqTitle, isMobile && styles.faqTitleMobile]}>
              Check our FAQ
            </Text>
          </View>
        </ImageBackground>
      </View>

      {/* FAQ list */}
      <View style={[styles.content, { paddingHorizontal: isMobile ? 24 : 34, paddingTop: 0 }]}>
        {FAQS.map((item, idx) => {
          const opened = openIndex === idx;
          return (
            <View key={`${idx}`} style={styles.faqItem}>
              <Pressable onPress={() => toggle(idx)} style={styles.questionRow}>
                <ArrowIcon rotated={opened} />
                <Text style={[styles.questionText, isMobile && styles.questionTextMobile]}>
                  {item.q}
                </Text>
              </Pressable>

              <View style={[styles.hr, { marginRight: isMobile ? 0 : 34 }]} />

              {opened && (
                <View style={styles.answerCard}>
                  <Text style={[styles.answerText, isMobile && styles.answerTextMobile]}>
                    {item.a}
                  </Text>
                </View>
              )}
            </View>
          );
        })}

        <Text style={styles.contactText}>Have other questions?</Text>

        <Pressable onPress={onContact} style={({ pressed }) => [styles.contactBtn, pressed && styles.btnPressed]}>
          <Text style={styles.contactBtnText}>Contact Us</Text>
        </Pressable>
      </View>
       <Footer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: "#fff" },
  pageContent: { paddingBottom: 34 },

  bannerWrap: {
    width: "100%",
  },
  banner: {
    width: "100%",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  bannerImage: {
    resizeMode: "cover",
  },

  overlay: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
  },

  faqText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "300",
    textTransform: "uppercase",
    letterSpacing: 2.1,
    marginTop: 24,
    // fontFamily: "Poppins-Light",
  },
  faqTitle: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "300",
    textTransform: "uppercase",
    marginTop: -16,
    // fontFamily: "CormorantGaramond-Regular",
  },
  faqTitleMobile: {
    fontSize: 22,
    // whiteSpace doesn't exist in RN; single line is handled by numberOfLines on Text if you want:
    // But we'll keep it flexible.
  },

  content: {
    width: "100%",
  },

  faqItem: {
    marginTop: -14, // matches .card-question spacing feel
    marginBottom: 24,
  },

  questionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },

  arrowWrap: {
    marginRight: 14,
    transform: [{ rotate: "0deg" }],
  },
  arrowRotated: {
    transform: [{ rotate: "180deg" }],
  },

  questionText: {
    color: "#141414",
    fontSize: 16,
    fontWeight: "400",
    flex: 1,
    // fontFamily: "Poppins-Regular",
  },
  questionTextMobile: {
    fontSize: 14,
  },

  hr: {
    height: 1,
    backgroundColor: "#e7e7e7",
    marginBottom: 34,
  },

  answerCard: {
    marginTop: -14,
    paddingTop: 6,
    paddingBottom: 12,
  },
  answerText: {
    color: "#787878",
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 20,
    // fontFamily: "Poppins-Regular",
  },
  answerTextMobile: {
    fontSize: 14, // your css says 14 for card; keep same
  },

  contactText: {
    color: "#787878",
    fontSize: 14,
    fontWeight: "400",
    marginBottom: 14,
    // fontFamily: "Poppins-Regular",
  },

  contactBtn: {
    alignSelf: "flex-start",
    backgroundColor: "#54443d",
    paddingVertical: 8,
    paddingHorizontal: 24,
  },
  btnPressed: {
    opacity: 0.85,
  },
  contactBtnText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "300",
    textTransform: "uppercase",
    letterSpacing: 2.1,
    // fontFamily: "Poppins-Light",
  },
});