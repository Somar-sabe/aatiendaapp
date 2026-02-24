// FurnitureLandingScreen.tsx
// ✅ Expo / React Native (copy-paste)
// - Responsive like your HTML: mobile layout (<768) + wide layout (>=768)
// - Images with skeleton shimmer (no libs)
// - Style cards open links (Luxury/Modern/Classic)
// - Services grid + WhatsApp contact
// - "Why AATienda" section + flags
// - FAQ accordion with rotating arrow

import React, { useEffect, useMemo, useRef, useState } from "react";
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

const WA_NUMBER = "+971507108807";
const WA_LINK = `https://wa.me/${WA_NUMBER.replace("+", "")}`;

const COLORS = {
  brown: "#54443D",
  dark: "#141414",
  gray: "#787878",
  lightBorder: "#DDD",
  white: "#fff",
  soft: "rgba(221,221,221,0.25)",
  soft2: "rgba(221,221,221,0.4)",
};

type ImgItem = { id: string; uri: string; alt?: string };
type StepItem = { id: string; title: string; desc: string; img: string };
type CardLink = { id: string; title: string; img: string; url: string };
type Service = { id: string; title: string; img: string };
type FAQ = { id: string; q: string; a: string };

const HERO_MOBILE: ImgItem[] = [
  {
    id: "l",
    uri: "https://cdn.shopify.com/s/files/1/0725/5418/5021/files/02c1c24e4c0ee0e30c57d833e0721198_224bc8ba-8ae4-4ad3-b264-c34ff0637a9e.png?v=1714221371",
  },
  {
    id: "m",
    uri: "https://cdn.shopify.com/s/files/1/0725/5418/5021/files/198371ed65663424e9be2b58bc63675f_c48e596b-1c59-492c-a713-ecfc937ac471.jpg?v=1714221400",
  },
  {
    id: "r",
    uri: "https://cdn.shopify.com/s/files/1/0725/5418/5021/files/efc85d7b0de279ab0238ae62bee0cd60_b1174146-4883-4c0e-a3b6-00c1d459b355.png?v=1714221394",
  },
];

const HERO_DESKTOP: ImgItem[] = [
  {
    id: "1",
    uri: "https://cdn.shopify.com/s/files/1/0725/5418/5021/files/4541a4f7f00c5524f449975bce48e5fc_eb2771dd-11b1-4be2-a21d-a490273abb27.png?v=1714221387",
  },
  {
    id: "2",
    uri: "https://cdn.shopify.com/s/files/1/0725/5418/5021/files/02c1c24e4c0ee0e30c57d833e0721198_224bc8ba-8ae4-4ad3-b264-c34ff0637a9e.png?v=1714221371",
  },
  {
    id: "3",
    uri: "https://cdn.shopify.com/s/files/1/0725/5418/5021/files/198371ed65663424e9be2b58bc63675f_c48e596b-1c59-492c-a713-ecfc937ac471.jpg?v=1714221400",
  },
  {
    id: "4",
    uri: "https://cdn.shopify.com/s/files/1/0725/5418/5021/files/efc85d7b0de279ab0238ae62bee0cd60_b1174146-4883-4c0e-a3b6-00c1d459b355.png?v=1714221394",
  },
  {
    id: "5",
    uri: "https://cdn.shopify.com/s/files/1/0725/5418/5021/files/ce66bdf9dbe982a37d1fa697f110913a_bd886c3a-6f13-4e87-b6c3-f674585a716f.png?v=1714221371",
  },
];

const STEPS: StepItem[] = [
  {
    id: "1",
    title: "step one",
    img: "https://cdn.shopify.com/s/files/1/0725/5418/5021/files/b3971ff9f08c4b5401a891a47e952dc4_c2b1b315-91d9-4edc-b81e-be6a064732a2.jpg?v=1714221368",
    desc: "Choose your preferred style from a variety of options: Luxury, Modern or Classic.",
  },
  {
    id: "2",
    title: "step two",
    img: "https://cdn.shopify.com/s/files/1/0725/5418/5021/files/06e47a55d4a78e65b98e2b0b4547b5ba_aef0d60d-0db9-434f-9e4f-0e6ac95d8ef4.jpg?v=1714221351",
    desc: "Select your home / apartment layout.",
  },
  {
    id: "3",
    title: "step three",
    img: "https://cdn.shopify.com/s/files/1/0725/5418/5021/files/cdff3dac6334a7299ebe11b8ad3e9268_34026401-8e3f-4673-8128-a7a5eca4f353.png?v=1714221398",
    desc: "Checkout and send us your order number through WhatsApp if you want to edit or have any questions.",
  },
];

const STYLES_CARDS: CardLink[] = [
  {
    id: "lux",
    title: "Luxury",
    img: "https://cdn.shopify.com/s/files/1/0725/5418/5021/files/69ec6bf69fadc82c6e6d13df464b8510_9063bee6-82f1-4e83-ac39-d5ca7834d1c0.jpg?v=1714221359",
    url: "https://aatienda.com/products/luxury-style",
  },
  {
    id: "mod",
    title: "Modern",
    img: "https://cdn.shopify.com/s/files/1/0725/5418/5021/files/f656ab6fabf5486d4c883d96b0862976_391b33ae-37d1-4748-b38d-3f52106e57a1.jpg?v=1714221357",
    url: "https://aatienda.com/products/modern-style",
  },
  {
    id: "cls",
    title: "Classic",
    img: "https://cdn.shopify.com/s/files/1/0725/5418/5021/files/e25d0811b2fc6250f76b0b885a839efe_e35a44dd-3d16-4169-9308-fd497ad1dc8c.jpg?v=1714221363",
    url: "https://aatienda.com/products/classic-style",
  },
];

const SERVICES: Service[] = [
  {
    id: "curt",
    title: "Curtains",
    img: "https://cdn.shopify.com/s/files/1/0725/5418/5021/files/c14c528b95395fc9f6cfeb383a25e93b_cf3aacb3-1313-4b93-8d65-983128dfda4f.jpg?v=1714221354",
  },
  {
    id: "matt",
    title: "Mattresses",
    img: "https://cdn.shopify.com/s/files/1/0725/5418/5021/files/1b2f0211d37791e6773510f95e926fcc_e072ca45-c377-489b-b184-bbe1727e141d.jpg?v=1714221347",
  },
  {
    id: "deco",
    title: "Decorations",
    img: "https://cdn.shopify.com/s/files/1/0725/5418/5021/files/bc8c55c8ed8539840a3d6591e735f269_3522d038-23a9-43cc-af71-495d12411f7a.jpg?v=1714221358",
  },
  {
    id: "appl",
    title: "Appliances",
    img: "https://cdn.shopify.com/s/files/1/0725/5418/5021/files/0c936814507fac9e52e0ae045450675b_c36bcfd8-b16e-4d81-90fa-d27183ed1853.jpg?v=1714221347",
  },
  {
    id: "cutl",
    title: "Cutlery",
    img: "https://cdn.shopify.com/s/files/1/0725/5418/5021/files/d720e109b55a7cbddb3166bf510456de_648dfeec-fc08-46c4-a780-09f72c1004c4.jpg?v=1714221383",
  },
];

const FLAGS: ImgItem[] = [
  {
    id: "uae",
    uri: "https://cdn.shopify.com/s/files/1/0725/5418/5021/files/Group_200_page-0001.jpg?v=1708005864",
  },
  {
    id: "ksa",
    uri: "https://cdn.shopify.com/s/files/1/0725/5418/5021/files/Group_7_page-0001.jpg?v=1708005864",
  },
  {
    id: "oman",
    uri: "https://cdn.shopify.com/s/files/1/0725/5418/5021/files/Page-1_page-0001.jpg?v=1708005864",
  },
  {
    id: "qatar",
    uri: "https://cdn.shopify.com/s/files/1/0725/5418/5021/files/Group_201_page-0001.jpg?v=1708005864",
  },
  {
    id: "bahrain",
    uri: "https://cdn.shopify.com/s/files/1/0725/5418/5021/files/Group_202_page-0001.jpg?v=1708005864",
  },
];

const FAQS: FAQ[] = [
  {
    id: "1",
    q: "What AATIENDA are offering?",
    a: "AATienda is a furnishing service, which means we can furnish the full apartment in 3 to 5 days. We have ready items to deliver and customization services based on client requirements.",
  },
  {
    id: "2",
    q: "What does the whole process look like?",
    a: "It is a very easy process. Drop us a message on WhatsApp and our team will contact you immediately.",
  },
  {
    id: "3",
    q: "Are delivery and set up included in the package price?",
    a: "Yes, delivery and installation are included for the packages. Please double check with us, as we are not providing installation for individual items.",
  },
  {
    id: "4",
    q: "Can I customize my furniture package?",
    a: "Sure. We have our own manufacturer — we can customize any kind of furniture. Send your design, sizes, specifications, and pictures. For customization, please contact us on WhatsApp.",
  },
  {
    id: "5",
    q: "Do you have showroom?",
    a: "AATIENDA is an e-commerce platform. We work with manufacturers and partners. Our main business is with hotels, resorts, holiday homes, and short rental property companies. We can provide pictures based on request.",
  },
];

export default function FurnitureLandingScreen() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const isWide = width >= 1000;

  const pagePad = isMobile ? 24 : 34;

  const openUrl = async (url: string) => {
    const can = await Linking.canOpenURL(url);
    if (can) return Linking.openURL(url);
  };

  const openWhatsApp = async () => {
    const url = WA_LINK;
    const can = await Linking.canOpenURL(url);
    if (can) return Linking.openURL(url);
    return Linking.openURL(`https://api.whatsapp.com/send?phone=${WA_NUMBER.replace("+", "")}`);
  };

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 40, backgroundColor: COLORS.white }}
      showsVerticalScrollIndicator={false}
    >
              <AnnouncementBar />
              <HeaderUtilityBar />
              <AppHeader />
      {/* Title */}
      <View style={[styles.center, { paddingTop: isMobile ? 24 : 34 }]}>
        <Text style={[styles.firstText, { fontSize: isMobile ? 22 : 32 }]}>
          Furnish an entire home
        </Text>
      </View>

      {/* Subtitle lines */}
      <View style={styles.center}>
        <Text style={styles.secondText}>✓ IN 3 EASY STEPS</Text>
      </View>
      <View style={styles.center}>
        <Text style={styles.secondText}>🚚 3 TO 5 DAYS DELIVERY ONLY</Text>
      </View>

      {/* HERO IMAGES */}
      <View style={{ marginTop: isMobile ? 34 : 44 }}>
        {isMobile ? (
          <MobileHero />
        ) : (
          <DesktopHero isWide={isWide} />
        )}
      </View>

      {/* STEPS */}
      <View style={{ paddingHorizontal: isMobile ? 24 : 34, marginTop: isMobile ? 44 : 64 }}>
        <View
          style={[
            styles.stepsWrap,
            { flexDirection: isMobile ? "column" : "row", gap: isMobile ? 24 : 34 },
          ]}
        >
          {STEPS.map((s) => (
            <StepCard key={s.id} step={s} mobile={isMobile} />
          ))}
        </View>
      </View>

      {/* CHOOSE STYLE + SERVICES */}
      <View style={[styles.sectionSoft, { marginTop: isMobile ? 0 : 0 }]}>
        <View style={{ paddingHorizontal: isMobile ? 24 : 34, paddingTop: isMobile ? 24 : 64 }}>
          <SectionTitle
            title="Choose your Style"
            centered={!isMobile}
            showLine={!isMobile}
          />

          <View
            style={[
              styles.cardsRow,
              {
                flexDirection: isMobile ? "column" : "row",
                gap: isMobile ? 24 : 17,
                marginTop: isMobile ? 24 : 14,
              },
            ]}
          >
            {STYLES_CARDS.map((c) => (
              <Pressable
                key={c.id}
                onPress={() => openUrl(c.url)}
                style={({ pressed }) => [styles.styleCard, pressed && styles.pressed]}
              >
                <ShimmerImage uri={c.img} height={isMobile ? 354 : 466} />
                <View style={styles.overlay}>
                  <Text style={[styles.styleText, { fontSize: isMobile ? 22 : 32 }]}>
                    {c.title}
                  </Text>
                  {!isMobile && (
                    <View style={styles.selectPill}>
                      <Text style={styles.selectPillText}>select this style</Text>
                    </View>
                  )}
                </View>
              </Pressable>
            ))}
          </View>

          <SectionTitle
            title="Need additional services? Message us"
            centered={!isMobile}
            showLine={!isMobile}
            style={{ marginTop: isMobile ? 0 : 0 }}
          />

          <View
            style={[
              styles.servicesGrid,
              {
                marginTop: 14,
                gap: isMobile ? 24 : 17,
                flexDirection: "row",
                flexWrap: "wrap",
              },
            ]}
          >
            {SERVICES.map((s) => (
              <View
                key={s.id}
                style={[
                  styles.serviceCard,
                  { width: isMobile ? "100%" : "31.8%" },
                ]}
              >
                <ShimmerImage uri={s.img} height={isMobile ? 118 : Math.max(120, Math.round(width * 0.086))} />
                <View style={styles.overlay2}>
                  <Text style={styles.servicesText}>{s.title}</Text>
                </View>
              </View>
            ))}

            <View
              style={[
                styles.paddedContact,
                { width: isMobile ? "100%" : "31.8%", height: isMobile ? 118 : Math.max(120, Math.round(width * 0.086)) },
              ]}
            >
              <Pressable
                onPress={openWhatsApp}
                style={({ pressed }) => [styles.contactBtn, pressed && styles.pressed]}
              >
                <Text style={styles.contactBtnText}>contact us</Text>
                <Text style={styles.contactArrow}>→</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>

      {/* B2B BOX (mobile) / IMAGE + OVERLAY (desktop) */}
      {isMobile ? (
        <View
          style={[
            styles.b2bMobileBox,
            {
              marginHorizontal: 24,
              marginTop: 55,
              marginBottom: 24,
              padding: 20,
            },
          ]}
        >
          <Text style={styles.b2bTitle}>Need B2B Furnishing for:</Text>
          <Text style={styles.b2bDesc}>
            Airbnb, Holiday Homes, Hotels, Resorts, Towers and Restaurants?
          </Text>

          <Pressable onPress={openWhatsApp} style={({ pressed }) => [styles.contactBtn, pressed && styles.pressed]}>
            <Text style={styles.contactBtnText}>contact us</Text>
            <Text style={styles.contactArrow}>→</Text>
          </Pressable>
        </View>
      ) : (
        <View style={{ marginTop: 34, paddingHorizontal: 34, paddingBottom: 64 }}>
          <View style={styles.b2bWrap}>
            <ShimmerImage
              uri="https://cdn.shopify.com/s/files/1/0725/5418/5021/files/Union3_page-0001.jpg?v=1707731183"
              height={Math.max(220, Math.round(width * 0.28))}
            />
            <View style={styles.b2bOverlay}>
              <Text style={styles.b2bTitleDesk}>Need B2B Furnishing for:</Text>
              <Text style={styles.b2bDescDesk}>
                Airbnb, Holiday Homes, Hotels, Resorts,{"\n"}Towers and Restaurants?
              </Text>
              <Pressable onPress={openWhatsApp} style={({ pressed }) => [styles.contactBtn, pressed && styles.pressed]}>
                <Text style={styles.contactBtnText}>contact us</Text>
                <Text style={styles.contactArrow}>→</Text>
              </Pressable>
            </View>
          </View>
        </View>
      )}

      {/* WHY SECTION */}
      <View style={{ paddingHorizontal: isMobile ? 24 : 34 }}>
        <View style={styles.whyWrap}>
          <ShimmerImage
            uri={
              isMobile
                ? "https://cdn.shopify.com/s/files/1/0725/5418/5021/files/bg_1_7188fa04-a8a5-463a-88ba-08363a3b16bb.png?v=1708005289"
                : "https://cdn.shopify.com/s/files/1/0725/5418/5021/files/bg_2_a8464c62-4877-4b48-a8c4-4aea449d2699.png?v=1708005289"
            }
            height={isMobile ? 299 : 259}
          />
          <View style={styles.whyOverlay}>
            <Text style={[styles.whyText, { marginTop: isMobile ? 34 : 3, marginBottom: isMobile ? 8 : 28 }]}>
              Why AATienda ?
            </Text>

            {isMobile ? (
              <View style={{ gap: 14, paddingHorizontal: Math.round(width * 0.121) }}>
                <WhyLine text="Move-in a complete furnished home" />
                <WhyLine text="Get the best deals on your furniture" />
                <WhyLine text="Get a free interior solution from professionals" />
                <Text style={[styles.whySmall, { textAlign: "center", marginTop: 5 }]}>Available in:</Text>
                <View style={styles.flagsRow}>
                  {FLAGS.map((f) => (
                    <Image key={f.id} source={{ uri: f.uri }} style={styles.flagImgMobile} resizeMode="cover" />
                  ))}
                </View>
              </View>
            ) : (
              <>
                <View style={styles.whyRowDesk}>
                  <Text style={styles.whyDeskP}>🏠 Move-in a complete furnished home</Text>
                  <View style={styles.hrVert} />
                  <Text style={styles.whyDeskP}>✓ Get the best deals on your furniture</Text>
                  <View style={styles.hrVert} />
                  <Text style={styles.whyDeskP}>★ Get a free interior solution from professionals</Text>
                </View>

                <Text style={[styles.whyDeskP, { marginTop: 5, textAlign: "center" }]}>Available in:</Text>

                <View style={styles.flagsRow}>
                  {FLAGS.map((f) => (
                    <Image key={f.id} source={{ uri: f.uri }} style={styles.flagImgDesk} resizeMode="cover" />
                  ))}
                </View>
              </>
            )}
          </View>
        </View>
      </View>

      {/* FAQ */}
      <View style={{ paddingHorizontal: isMobile ? 24 : 34, paddingTop: 64 }}>
        <Text style={styles.questionTitle}>Have a Question?</Text>
        <View style={{ gap: isMobile ? 24 : 24 }}>
          {FAQS.map((f) => (
            <FaqItem key={f.id} item={f} />
          ))}
        </View>
      </View>
       <Footer />
    </ScrollView>
  );
}

/* ---------------- Components ---------------- */

function MobileHero() {
  // 3 columns: small - big - small (like your mobile layout)
  return (
    <View style={styles.mobileHeroRow}>
      <View style={[styles.mobileHeroCol, { width: "18%", marginTop: 41 }]}>
        <ShimmerImage uri={HERO_MOBILE[0].uri} height={Math.round(360)} />
      </View>
      <View style={[styles.mobileHeroCol, { width: "60%" }]}>
        <ShimmerImage uri={HERO_MOBILE[1].uri} height={Math.round(450)} />
      </View>
      <View style={[styles.mobileHeroCol, { width: "22%", marginTop: 41 }]}>
        <ShimmerImage uri={HERO_MOBILE[2].uri} height={Math.round(360)} />
      </View>
    </View>
  );
}

function DesktopHero({ isWide }: { isWide: boolean }) {
  // 5 images for wide, 3 for smaller desktop/tablet
  const list = isWide ? HERO_DESKTOP : HERO_DESKTOP.slice(1, 4);

  return (
    <View style={[styles.desktopHeroRow, { paddingHorizontal: isWide ? Math.round(0.10662 * 100) : 34 }]}>
      {list.map((it, idx) => (
        <View key={it.id} style={[styles.desktopHeroCol, idx % 2 === 1 && styles.colLow]}>
          <ShimmerImage uri={it.uri} height={323} />
        </View>
      ))}
    </View>
  );
}

function StepCard({ step, mobile }: { step: StepItem; mobile: boolean }) {
  return (
    <View style={[styles.stepCard, { flex: mobile ? 0 : 1 }]}>
      <ShimmerImage uri={step.img} height={mobile ?  Math.round(0.77222 * 400) : 280} />
      <Text style={styles.stepTitle}>{step.title}</Text>
      <Text style={styles.stepDesc}>{step.desc}</Text>
    </View>
  );
}

function SectionTitle({
  title,
  centered,
  showLine,
  style,
}: {
  title: string;
  centered?: boolean;
  showLine?: boolean;
  style?: any;
}) {
  return (
    <View style={[styles.sectionTitleRow, centered && { justifyContent: "center" }, style]}>
      <Text style={styles.chooseText}>{title}</Text>
      {showLine ? <View style={styles.hLine} /> : null}
    </View>
  );
}

function WhyLine({ text }: { text: string }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "flex-start", gap: 10 }}>
      <Text style={{ color: "#fff", marginTop: -1 }}>•</Text>
      <Text style={styles.whySmall}>{text}</Text>
    </View>
  );
}

function FaqItem({ item }: { item: FAQ }) {
  const [open, setOpen] = useState(false);
  const rot = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(rot, {
      toValue: open ? 1 : 0,
      duration: 220,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [open, rot]);

  const rotate = rot.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  return (
    <View>
      <Pressable onPress={() => setOpen((v) => !v)} style={({ pressed }) => [styles.faqHeader, pressed && styles.pressed]}>
        <Animated.Text style={[styles.faqArrow, { transform: [{ rotate }] }]}>▼</Animated.Text>
        <Text style={styles.faqQ}>{item.q}</Text>
      </Pressable>

      <View style={styles.faqHr} />

      {open ? (
        <View style={styles.faqBody}>
          <Text style={styles.faqA}>{item.a}</Text>
        </View>
      ) : null}
    </View>
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
    outputRange: [-200, 200],
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
  center: { alignItems: "center", justifyContent: "center" },

  firstText: {
    color: "#000",
    fontWeight: "300",
    textTransform: "uppercase",
    marginBottom: 4,
    fontFamily: Platform.select({ ios: "Cormorant Garamond", android: "Cormorant Garamond" }) as any,
  },
  secondText: {
    color: COLORS.brown,
    fontSize: 14,
    textTransform: "uppercase",
    letterSpacing: 2.1,
    fontWeight: "300",
    fontFamily: Platform.select({ ios: "Poppins", android: "Poppins" }) as any,
    marginTop: 8,
  },

  mobileHeroRow: {
    flexDirection: "row",
    gap: 17,
    paddingHorizontal: 0,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  mobileHeroCol: {
    overflow: "hidden",
  },

  desktopHeroRow: {
    flexDirection: "row",
    gap: 17,
    justifyContent: "center",
    paddingLeft: 34,
    paddingRight: 34,
  },
  desktopHeroCol: { flex: 1 },
  colLow: { marginTop: 64 },

  stepsWrap: {
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  stepCard: {
    width: "100%",
  },
  stepTitle: {
    marginTop: 24,
    marginBottom: 6,
    color: COLORS.brown,
    fontSize: 16,
    letterSpacing: 3.04,
    textTransform: "uppercase",
    fontWeight: "500",
    fontFamily: Platform.select({ ios: "Cormorant Garamond", android: "Cormorant Garamond" }) as any,
  },
  stepDesc: {
    color: "#000",
    fontSize: 14,
    lineHeight: 28,
    fontWeight: "300",
    marginTop: 6,
    marginBottom: 24,
    fontFamily: Platform.select({ ios: "Poppins", android: "Poppins" }) as any,
  },

  sectionSoft: {
    backgroundColor: COLORS.soft,
    marginTop: 0,
    paddingBottom: 24,
  },
  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 34,
    marginBottom: 14,
  },
  chooseText: {
    color: "#000",
    fontSize: 32,
    fontWeight: "300",
    textTransform: "uppercase",
    fontFamily: Platform.select({ ios: "Cormorant Garamond", android: "Cormorant Garamond" }) as any,
  },
  hLine: {
    height: 2,
    backgroundColor: COLORS.brown,
    width: 104,
    marginTop: 14,
  },

  cardsRow: {
    width: "100%",
  },
  styleCard: {
    flex: 1,
    overflow: "hidden",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.30)",
    alignItems: "center",
    justifyContent: "center",
  },
  styleText: {
    color: "#fff",
    fontWeight: "300",
    textTransform: "uppercase",
    fontFamily: Platform.select({ ios: "Cormorant Garamond", android: "Cormorant Garamond" }) as any,
  },
  selectPill: {
    position: "absolute",
    bottom: 34,
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 24,
  },
  selectPillText: {
    color: COLORS.brown,
    fontSize: 14,
    textTransform: "uppercase",
    letterSpacing: 2.1,
    fontWeight: "300",
    fontFamily: Platform.select({ ios: "Poppins", android: "Poppins" }) as any,
  },

  servicesGrid: {
    width: "100%",
    paddingBottom: 64,
  },
  serviceCard: {
    overflow: "hidden",
  },
  overlay2: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.40)",
    alignItems: "center",
    justifyContent: "center",
  },
  servicesText: {
    color: "#fff",
    fontSize: 16,
    letterSpacing: 3.04,
    textTransform: "uppercase",
    fontWeight: "500",
    fontFamily: Platform.select({ ios: "Cormorant Garamond", android: "Cormorant Garamond" }) as any,
  },

  paddedContact: {
    borderWidth: 1,
    borderColor: COLORS.lightBorder,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  contactBtn: {
    backgroundColor: COLORS.brown,
    paddingVertical: 8,
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  contactBtnText: {
    color: "#fff",
    fontSize: 14,
    textTransform: "uppercase",
    letterSpacing: 2.1,
    fontWeight: "300",
    fontFamily: Platform.select({ ios: "Poppins", android: "Poppins" }) as any,
  },
  contactArrow: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    marginTop: -1,
  },

  b2bMobileBox: {
    backgroundColor: COLORS.soft2,
    alignItems: "center",
    justifyContent: "center",
    height: 176,
    gap: 8,
  },
  b2bTitle: {
    color: "#000",
    fontSize: 14,
    fontStyle: "italic",
    textTransform: "uppercase",
    letterSpacing: 1,
    fontFamily: Platform.select({ ios: "Cormorant Garamond", android: "Cormorant Garamond" }) as any,
  },
  b2bDesc: {
    color: "#000",
    fontSize: 12,
    lineHeight: 24,
    textAlign: "center",
    fontWeight: "300",
    fontFamily: Platform.select({ ios: "Poppins", android: "Poppins" }) as any,
    marginBottom: 6,
  },

  b2bWrap: {
    position: "relative",
    overflow: "hidden",
  },
  b2bOverlay: {
    position: "absolute",
    top: 18,
    left: "50%",
    transform: [{ translateX: -150 }],
    width: 300,
    backgroundColor: COLORS.soft2,
    paddingVertical: 18,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  b2bTitleDesk: {
    color: "#000",
    fontSize: 18,
    fontStyle: "italic",
    textTransform: "uppercase",
    letterSpacing: 2,
    fontFamily: Platform.select({ ios: "Cormorant Garamond", android: "Cormorant Garamond" }) as any,
    marginBottom: 8,
  },
  b2bDescDesk: {
    color: "#000",
    fontSize: 12,
    lineHeight: 22,
    textAlign: "center",
    fontWeight: "300",
    fontFamily: Platform.select({ ios: "Poppins", android: "Poppins" }) as any,
    marginBottom: 10,
  },

  whyWrap: {
    position: "relative",
    overflow: "hidden",
    marginTop: 0,
  },
  whyOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 18,
  },
  whyText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "300",
    textTransform: "uppercase",
    fontFamily: Platform.select({ ios: "Cormorant Garamond", android: "Cormorant Garamond" }) as any,
  },
  whySmall: {
    color: "#fff",
    fontSize: 11,
    lineHeight: 16,
    fontWeight: "300",
    fontFamily: Platform.select({ ios: "Poppins", android: "Poppins" }) as any,
  },
  whyRowDesk: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 18,
    paddingHorizontal: 40,
  },
  whyDeskP: {
    color: "#fff",
    fontSize: 12,
    lineHeight: 22,
    fontWeight: "300",
    fontFamily: Platform.select({ ios: "Poppins", android: "Poppins" }) as any,
  },
  hrVert: {
    width: 1,
    height: 20,
    backgroundColor: "rgba(255,255,255,0.7)",
  },
  flagsRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginTop: 10,
  },
  flagImgMobile: {
    width: 24,
    height: 24,
    borderRadius: 2,
  },
  flagImgDesk: {
    width: 34,
    height: 34,
    borderRadius: 2,
  },

  questionTitle: {
    color: COLORS.dark,
    fontSize: 22,
    fontWeight: "300",
    textTransform: "uppercase",
    fontFamily: Platform.select({ ios: "Cormorant Garamond", android: "Cormorant Garamond" }) as any,
    marginBottom: 34,
  },
  faqHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingVertical: 6,
  },
  faqArrow: {
    color: COLORS.gray,
    fontSize: 12,
    marginTop: 2,
  },
  faqQ: {
    color: COLORS.dark,
    fontSize: 16,
    fontWeight: "400",
    fontFamily: Platform.select({ ios: "Poppins", android: "Poppins" }) as any,
    flex: 1,
  },
  faqHr: {
    height: 1,
    backgroundColor: "rgba(0,0,0,0.12)",
    marginTop: 10,
    marginBottom: 10,
  },
  faqBody: {
    backgroundColor: "#f7f7f7",
    padding: 12,
    borderRadius: 6,
  },
  faqA: {
    color: COLORS.dark,
    fontSize: 12,
    lineHeight: 18,
    fontFamily: Platform.select({ ios: "Poppins", android: "Poppins" }) as any,
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
    width: 120,
    height: "100%",
    backgroundColor: "rgba(255,255,255,0.55)",
  },

  pressed: { opacity: 0.85 },
});