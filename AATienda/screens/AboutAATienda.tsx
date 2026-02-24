// AboutAATienda.tsx
import React, { useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  useWindowDimensions,
  Platform,
} from "react-native";
import HeaderUtilityBar from "@/components/HeaderUtilityBar";
import AppHeader from "@/components/AppHeader";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/footer";
const IMAGE_URL =
  "https://cdn.shopify.com/s/files/1/0725/5418/5021/files/Rectangle_85_page-0001.jpg?v=1707804420";

const LOGO_URL =
  "https://cdn.shopify.com/s/files/1/0725/5418/5021/files/AA_Tienda_Primary_Logo_White_e605d73b-4adf-46bb-aaf7-b173c373c000.png?v=1698240249";

const TITLE_1 = "Welcome to AA Tienda Family";

const MOBILE_INTRO =
  "AA Tienda is a UK/UAE Luxury Marketplace that connects carefully selected sellers with their premium and luxurious products and services to both individual consumers (B2C) and businesses (B2B). It offers a wide range selection for browsing and purchasing.";

const DESKTOP_P1 =
  "Allow us to present to you an emerging luminary in the realm of fashion and luxury - Aya Abdalla, the mastermind behind AA Tienda. This visionary businessperson, from Dubai, is not your run-of-the-mill fashion enthusiast, but rather an impressive powerhouse.";

const DESKTOP_P2 =
  "AA Tienda is a UK/UAE Marketplace platform that connects carefully selected sellers with their premium products and services to both individual consumers (B2C) and businesses (B2B). It offers a wide range selection for browsing and purchasing.\n\nWe strive to become the world's most trusted luxury full-solution Marketplace platform.";

const VISION =
  "Empower both customers and businesses owners with our cutting-edge Marketplace solutions.";

const MISSION = [
  "To become the preferred destination for high-quality products and services, offering an extensive selection to ensure convenience, reliability, and satisfaction.",
  "To be the trusted partner that enables businesses of all sizes to realize their full potential, enhancing their online presence and driving growth.",
  "To operate ethically and sustainably, ensuring all our products are responsibly sourced.",
  "We commit to driving client satisfaction by either manufacturing or sourcing exactly what they need.",
];

export default function AboutAATienda() {
  const { width } = useWindowDimensions();
  const isMobile = width < 749;

  const desktopImageHeight = useMemo(() => {
    // matches ~41.069vw from HTML
    return Math.round(width * 0.41069);
  }, [width]);

  return (
    <ScrollView
      style={styles.page}
      contentContainerStyle={styles.pageContent}
      showsVerticalScrollIndicator={false}
    >
              <HeaderUtilityBar />
              <AnnouncementBar />
              <AppHeader />
      {isMobile ? (
        // ✅ MOBILE (same as your "mobile-about")
        <View style={styles.mobileWrap}>
          <View style={styles.mobileHero}>
            <Image source={{ uri: IMAGE_URL }} style={styles.mobileImage} />
            <View style={styles.mobileOverlay}>
              <Image source={{ uri: LOGO_URL }} style={styles.mobileLogo} />
            </View>
          </View>

          <View style={styles.mobileTextContainer}>
            <Text style={styles.title}>{"Welcome to AA Tienda Family"}</Text>
            <Text style={styles.subtext}>{MOBILE_INTRO}</Text>

            <Text style={[styles.title, styles.sectionPad]}>Vision</Text>
            <Text style={styles.subtext}>{VISION}</Text>

            <Text style={[styles.title, styles.sectionPad]}>Mission</Text>

            <View style={styles.list}>
              {MISSION.map((item, idx) => (
                <View key={`${idx}`} style={styles.listRow}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.listText}>{item}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      ) : (
        // ✅ DESKTOP/TABLET (same as your "wrapper" with left image + right text)
        <View style={styles.desktopWrap}>
          <View style={styles.leftCol}>
            <View style={[styles.desktopHero, { height: desktopImageHeight }]}>
              <Image source={{ uri: IMAGE_URL }} style={styles.desktopImage} />
              <View style={styles.desktopOverlay}>
                <Image source={{ uri: LOGO_URL }} style={styles.desktopLogo} />
              </View>
            </View>
          </View>

          <View style={styles.rightCol}>
            <Text style={styles.title}>{TITLE_1}</Text>

            <Text style={styles.subtext}>{DESKTOP_P1}</Text>
            <Text style={styles.subtext}>{DESKTOP_P2}</Text>

            <Text style={[styles.title, styles.sectionPad]}>Vision</Text>
            <Text style={styles.subtext}>{VISION}</Text>

            <Text style={[styles.title, styles.sectionPad]}>Mission</Text>

            <View style={styles.list}>
              {MISSION.map((item, idx) => (
                <View key={`${idx}`} style={styles.listRow}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.listText}>{item}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      )}
       <Footer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#fff",
  },
  pageContent: {
    paddingBottom: 24,
  },

  // --------- MOBILE ----------
  mobileWrap: {
    width: "100%",
  },
  mobileHero: {
    width: "100%",
    position: "relative",
  },
  mobileImage: {
    width: "100%",
    height: 277,
    resizeMode: "cover",
  },
  mobileOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 277,
    justifyContent: "flex-end",
    paddingBottom: 18,
    paddingHorizontal: 24,
    // your HTML places logo with translateY; this gives same "over image" feel
  },
  mobileLogo: {
    width: "100%",
    height: 40.5,
    resizeMode: "contain",
  },
  mobileTextContainer: {
    paddingHorizontal: 24,
    paddingTop: 24,
    marginTop: -21, // matches your .text-container { margin-top: -21px; }
  },

  // --------- DESKTOP ----------
  desktopWrap: {
    width: "100%",
    flexDirection: "row",
    overflow: "hidden",
  },
  leftCol: {
    width: "50%",
    paddingLeft: 34,
    paddingRight: 17,
  },
  rightCol: {
    width: "50%",
    paddingLeft: 17,
    paddingRight: 34,
  },
  desktopHero: {
    width: "100%",
    position: "relative",
  },
  desktopImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  desktopOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: Math.round(-0.7 * 10), // keep overlay visually "on" the image
    // We'll just anchor near bottom, similar to your HTML "bottom: 70%"
    top: 0,
    justifyContent: "flex-end",
    padding: 10,
  },
  desktopLogo: {
    width: "100%",
    height: 40.5,
    resizeMode: "contain",
  },

  // --------- TYPOGRAPHY ----------
  title: {
    color: "#000",
    fontSize: 18,
    fontWeight: Platform.select({ ios: "500", android: "500", default: "500" }),
    textTransform: "uppercase",
    letterSpacing: 0.2,
    marginBottom: 0,
    paddingBottom: 7,
    // If you already loaded fonts, set them here:
    // fontFamily: "CormorantGaramond-Medium",
  },
  subtext: {
    color: "#787878",
    fontSize: 14,
    fontWeight: Platform.select({ ios: "300", android: "300", default: "300" }),
    lineHeight: 20,
    marginBottom: 0,
    paddingBottom: 7,
    // fontFamily: "Poppins-Light",
  },
  sectionPad: {
    paddingTop: 14,
  },

  // --------- LIST ----------
  list: {
    paddingTop: 2,
  },
  listRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingBottom: 14,
  },
  bullet: {
    color: "#787878",
    fontSize: 14,
    lineHeight: 20,
    marginRight: 10,
  },
  listText: {
    flex: 1,
    color: "#787878",
    fontSize: 14,
    lineHeight: 20,
    fontWeight: Platform.select({ ios: "300", android: "300", default: "300" }),
  },
});