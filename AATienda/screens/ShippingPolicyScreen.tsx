// ShippingPolicyScreen.tsx (React Native / Expo)
// Copy-paste ready. Same policy layout: headings + paragraphs + bullet lists.

import React, { useMemo } from "react";
import { View, Text, StyleSheet, ScrollView, useWindowDimensions } from "react-native";

export default function ShippingPolicyScreen() {
  const { width } = useWindowDimensions();
  const isMobile = width < 749;

  const H1 = useMemo(() => [styles.h1, isMobile && styles.h1Mobile], [isMobile]);
  const H2 = useMemo(() => [styles.h2, isMobile && styles.h2Mobile], [isMobile]);
  const P = useMemo(() => [styles.p, isMobile && styles.pMobile], [isMobile]);

  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.content}>
      <Text style={H1}>Shipping Policy</Text>

      <Text style={P}>
        Orders placed on AA Tienda are delivered every day of the week, with the actual delivery
        schedule depending on the selected service, item origin, and destination. We aim to provide
        flexible delivery options and work with reliable shipping partners for prompt dispatch and
        timely delivery. You can find the estimated delivery timeframe during checkout or upon order
        confirmation.
      </Text>

      <Text style={H2}>Delivery timings</Text>

      <Text style={styles.subhead}>AA Tienda Fashion items</Text>
      <View style={styles.list}>
        <Bullet text="Next day delivery in UAE." isMobile={isMobile} />
        <Bullet text="GCC: 4 to 7 days." isMobile={isMobile} />
        <Bullet text="Worldwide: 6 to 9 days." isMobile={isMobile} />
      </View>

      <Text style={styles.subhead}>Fashion Branded items</Text>
      <View style={styles.list}>
        <Bullet text="2–5 business days within the EU." isMobile={isMobile} />
        <Bullet text="5–10 business days outside the EU." isMobile={isMobile} />
      </View>

      <Text style={styles.subhead}>Furniture packages</Text>
      <View style={styles.list}>
        <Bullet text="7–15 business working days (Assembly included)." isMobile={isMobile} />
      </View>

      <Text style={styles.subhead}>Ready-Made Furniture Items</Text>
      <View style={styles.list}>
        <Bullet text="5–10 business working days (customized made in UAE — Assembly included)." isMobile={isMobile} />
        <Bullet text="15–45 business working days (upon supplier confirmation) ordered from outside UAE — Assembly NOT provided." isMobile={isMobile} />
      </View>

      <Text style={styles.subhead}>Perfume Items</Text>
      <Text style={P}>
        For international branded perfumes (like Chanel, Dior, etc), shipping is available only in
        the UAE.
      </Text>
      <View style={styles.list}>
        <Bullet text="UAE: 2 to 3 working days." isMobile={isMobile} />
        <Bullet text="GCC: Not available for now." isMobile={isMobile} />
      </View>

      <Text style={styles.subhead}>Electronics Items</Text>
      <View style={styles.list}>
        <Bullet text="UAE: 37 to 42 working days." isMobile={isMobile} />
        <Bullet text="GCC & Worldwide: 52 to 57 working days." isMobile={isMobile} />
        <Bullet text="Africa and South America: 67 working days." isMobile={isMobile} />
      </View>

      <Text style={P}>Any customization request takes extra 10 working days.</Text>

      <Text style={styles.subhead}>Marketing Services</Text>
      <Text style={P}>
        Depends on the service and the duration is mentioned under each service description.
      </Text>

      <Text style={styles.subhead}>Jewelry</Text>
      <View style={styles.list}>
        <Bullet text="UAE: 2 to 3 working days." isMobile={isMobile} />
        <Bullet text="GCC: 5 to 7 working days." isMobile={isMobile} />
        <Bullet text="Worldwide: 10 to 15 working days." isMobile={isMobile} />
      </View>
      <Text style={P}>
        Customized order takes 1 to 3 weeks depending on the jewelry design.
      </Text>

      <Text style={styles.subhead}>Crystals Mirror</Text>
      <View style={styles.list}>
        <Bullet text="Worldwide: 15 working days." isMobile={isMobile} />
      </View>

      <Text style={H2}>We are unable to ship to</Text>
      <View style={styles.list}>
        <Bullet text="Iran" isMobile={isMobile} />
        <Bullet text="Lebanon" isMobile={isMobile} />
        <Bullet text="Syria" isMobile={isMobile} />
        <Bullet text="North Korea" isMobile={isMobile} />
      </View>

      <Text style={P}>
        Delivery times are estimated based on dispatch of the package and should be considered
        approximate. While we strive to provide accurate estimates, AA Tienda cannot be held
        responsible for delays caused by customs clearance processes or payment issues. We are
        committed to making every effort to minimize delays and ensure a smooth delivery process.
      </Text>

      <Text style={P}>
        Depending on your location, orders can be delivered by different couriers such as DHL,
        Aramex, and FedEx.
      </Text>

      <Text style={P}>
        Please be advised that deliveries may experience delays during promotional activities, sale
        seasons, and bank holidays. A re-delivery charge may be imposed if your order cannot be
        accepted at the address provided on the confirmed delivery date.
      </Text>

      <Text style={H2}>General Delivery Conditions</Text>
      <Text style={P}>
        We are dedicated to meeting estimated delivery timelines provided in your order confirmation
        or displayed on our website. However, these timelines are estimates and not binding
        commitments. Time shall not be deemed as of the essence regarding delivery.
      </Text>

      <Text style={P}>
        Delivery timelines commence from the order confirmation date. If we are unable to deliver
        your order within 30 days of order confirmation, we will issue a full refund promptly.
      </Text>

      <Text style={P}>
        We cannot be held responsible for delivery failures due to circumstances beyond our
        reasonable control. This includes situations where you are unavailable to receive the
        delivery or request a postponement.
      </Text>

      <Text style={P}>
        Our priority is to ensure a smooth and efficient delivery process. While unforeseen factors
        may occasionally impact delivery timelines, we are dedicated to resolving any delivery issues
        promptly and ensuring your satisfaction.
      </Text>

      <View style={{ height: 24 }} />
    </ScrollView>
  );
}

function Bullet({ text, isMobile }: { text: string; isMobile: boolean }) {
  return (
    <View style={styles.bulletRow}>
      <Text style={[styles.bulletDot, isMobile && styles.bulletDotMobile]}>•</Text>
      <Text style={[styles.bulletText, isMobile && styles.bulletTextMobile]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: "#fff" },
  content: { paddingHorizontal: 24, paddingTop: 24, paddingBottom: 32 },

  h1: {
    color: "#141414",
    fontSize: 28,
    fontWeight: "300",
    textTransform: "uppercase",
    marginBottom: 14,
    letterSpacing: 0.5,
    // fontFamily: "CormorantGaramond-Regular",
  },
  h1Mobile: { fontSize: 22 },

  h2: {
    color: "#141414",
    fontSize: 16,
    fontWeight: "700",
    textTransform: "uppercase",
    marginTop: 18,
    marginBottom: 10,
    letterSpacing: 0.4,
    // fontFamily: "Poppins-SemiBold",
  },
  h2Mobile: { fontSize: 15 },

  subhead: {
    color: "#141414",
    fontSize: 14,
    fontWeight: "700",
    marginTop: 10,
    marginBottom: 6,
    // fontFamily: "Poppins-SemiBold",
  },

  p: {
    color: "#787878",
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 20,
    marginBottom: 10,
    // fontFamily: "Poppins-Regular",
  },
  pMobile: { fontSize: 13, lineHeight: 19 },

  list: { marginTop: 4, marginBottom: 6 },

  bulletRow: { flexDirection: "row", alignItems: "flex-start", marginBottom: 8 },
  bulletDot: { color: "#787878", fontSize: 16, lineHeight: 20, marginRight: 10 },
  bulletDotMobile: { fontSize: 15 },
  bulletText: { flex: 1, color: "#787878", fontSize: 14, lineHeight: 20 },
  bulletTextMobile: { fontSize: 13, lineHeight: 19 },
});