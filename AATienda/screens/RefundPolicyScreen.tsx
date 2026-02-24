// RefundPolicyScreen.tsx (React Native / Expo)
// Copy-paste ready. Same clean policy layout (headings + paragraphs + bullets) + email/phone links.

import React, { useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Linking,
  useWindowDimensions,
  Platform,
} from "react-native";

const PHONE = "+971507108807";
const EMAIL_STORE = "Store@aatienda.com";

export default function RefundPolicyScreen() {
  const { width } = useWindowDimensions();
  const isMobile = width < 749;

  const H1 = useMemo(() => [styles.h1, isMobile && styles.h1Mobile], [isMobile]);
  const H2 = useMemo(() => [styles.h2, isMobile && styles.h2Mobile], [isMobile]);
  const P = useMemo(() => [styles.p, isMobile && styles.pMobile], [isMobile]);

  const openPhone = async () => {
    const url = `tel:${PHONE}`;
    try {
      const can = await Linking.canOpenURL(url);
      if (can) await Linking.openURL(url);
    } catch {}
  };

  const openEmail = async () => {
    const url = `mailto:${EMAIL_STORE}`;
    try {
      const can = await Linking.canOpenURL(url);
      if (can) await Linking.openURL(url);
    } catch {}
  };

  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.content}>
      <Text style={H1}>Refund Policy</Text>

      <Text style={P}>
        To be eligible for a refund, all Fashion items, including promotional gift items that come
        with the order, must be returned within 7 days of receiving the order.
      </Text>

      <Text style={P}>We accept returns and issue refunds under the following conditions:</Text>
      <View style={styles.list}>
        <Bullet text="The item must be unused and in its original packaging." isMobile={isMobile} />
        <Bullet text="The product must have a manufacturing defect." isMobile={isMobile} />
        <Bullet text="The item received is not suitable or the wrong size/item." isMobile={isMobile} />
        <Bullet text="The return is made within 7 days of order receipt." isMobile={isMobile} />
      </View>

      <Text style={P}>
        Please note that these are the general conditions applicable to returns.
      </Text>

      <Text style={P}>
        Items must be returned unaltered, unused, and in fully saleable condition, including shoes
        without any sole or other damage, or in the condition in which they were received from us or
        our agents. Items must be returned in their original packaging, including all brand and
        product labels/tags/instructions and authenticity cards (if provided), with swimwear having
        the original hygiene liner attached accompanied by the original order confirmation.
      </Text>

      <Text style={P}>
        Please double-check your returns before shipping them out, as we cannot be held responsible
        for the return of non-AA Tienda items. Shipping/taxes cost are non-refundable.
      </Text>

      <Text style={H2}>Furniture items</Text>
      <Text style={P}>
        All of our products are Made to Order, hence AATIENDA will not accept any returns unless the
        delivered product has a manufacturing defect. In that case, AATIENDA will bear full
        responsibility and repair the product or replace the product depending on the depth of the
        defect. An agent from our partners will be sent to assess the manufacturing defect and
        advise you accordingly.
      </Text>

      <Text style={H2}>Damages and issues</Text>
      <Text style={P}>
        Please inspect your order upon reception and contact us immediately if the item is defective,
        damaged, or if you receive the wrong item so that we can evaluate the issue and make it
        right.
      </Text>

      <Text style={H2}>Exchanges</Text>
      <Text style={P}>
        The fastest way to ensure you get what you want is to return the item you have, and once the
        return is accepted, make a separate purchase for the new item.
      </Text>

      <Text style={H2}>European Union 14-day cooling off period</Text>
      <Text style={P}>
        Notwithstanding the above, if the merchandise is being shipped into the European Union, you
        have the right to cancel or return your order within 14 days, for any reason and without a
        justification. Your item must be in the same condition that you received it, unworn or
        unused, with tags, and in its original packaging. You’ll also need the receipt or proof of
        purchase.
      </Text>

      <Text style={H2}>Refunds</Text>
      <Text style={P}>
        We will notify you once we’ve received and inspected your return, and let you know if the
        refund was approved or not. If approved, you’ll be automatically refunded on your original
        payment method within 10 business days. Please remember it can take some time for your bank
        or credit card company to process and post the refund too.
      </Text>

      <Text style={P}>
        Refunds will only be processed after the item/s returned have been approved. After approval,
        we will issue a refund of the full face value of undamaged items excluding the cost of
        shipping and custom charges which will be solely borne by the customer. For declined
        returns, the order will be shipped to the buyer and any additional shipping charges will be
        charged.
      </Text>

      <Text style={P}>
        Any returns that are due with customs charges will be covered by the customer, either by
        invoice or deducted from the original refund. To offer a faster refund we recommend selecting
        the option of the sender paying for all customs duties.
      </Text>

      <Text style={styles.subhead}>Your refund will be processed via the following methods:</Text>
      <Text style={P}>
        If you opt for store credit, the full refund value will be credited to your AATienda account
        after we approve the returned item/s. You can use this refund value for future purchases on
        AA Tienda without any time limit. As a result, you will not see a refund on your bank
        statement since the refund value will not be transferred to the issuing debit or credit card
        bank.
      </Text>

      <Text style={H2}>Damaged Goods / Incorrectly-Fulfilled Orders</Text>
      <Text style={P}>
        If you receive a damaged item or an incorrect order, please use the returns process to
        arrange for its return. The item must be returned in the same condition it was received
        within 3 days of receipt for a full refund, including applicable delivery charges, fees,
        taxes, and duties. A replacement may be available, and defective items may also benefit from
        a manufacturer's warranty.
      </Text>

      <Text style={H2}>To initiate a return or refund</Text>
      <Text style={P}>Please email AA Tienda Customer Service with the following information:</Text>

      <View style={styles.list}>
        <Bullet text="The item(s) you wish to return or exchange." isMobile={isMobile} />
        <Bullet text="The desired size for exchange." isMobile={isMobile} />
        <Bullet text="Your email/contact number/detailed address." isMobile={isMobile} />
        <Bullet
          text="Bank details in English (Name, Bank Name, swift code, IBAN) if requesting a refund."
          isMobile={isMobile}
        />
      </View>

      <Text style={P}>
        An email will be sent to you if your request has missing details. After receiving the email
        of pick up from Aramex and the time has been confirmed by your side via email, please
        package up the item(s). Once you receive the email from Aramex confirming the pickup time,
        please package up your item(s).
      </Text>

      <Text style={P}>
        Refunds are typically processed within 7–14 business days after we receive your package, and
        will be issued in the same way you originally paid.
      </Text>

      <Text style={H2}>Shoes</Text>
      <Text style={P}>
        We only accept returns on shoes if their packaging is in brand-new condition without any
        damage. We will not accept items with scuffing, scratches, dents, visible signs of wear, or
        any other type of damage, and will return them to the customer with a rejected refund
        request.
      </Text>

      <Text style={P}>
        Damaged packaging (such as shoe boxes) may prevent resale and result in a partial refund.
        Our agents may inspect returned items at the point of collection, but this initial
        inspection does not guarantee your eligibility for a full refund.
      </Text>

      <Text style={P}>
        Returns are not accepted for beauty products (including skincare, haircare, make-up, and
        perfume), underwear, and earrings, unless the product was damaged during shipping and retains
        its original packaging.
      </Text>

      <Text style={P}>
        We reserve the right to monitor returns and refuse orders from customers with excessive
        returns. This returns section does not affect any consumer rights you may have under UAE law.
      </Text>

      <Text style={H2}>Exchanges</Text>
      <Text style={P}>
        Unfortunately, we cannot offer exchanges at this time. Instead, please follow the returns
        process and place a new order for any replacement items.
      </Text>

      <Text style={H2}>Manufacturing Defects</Text>
      <Text style={P}>
        In addition to our 7-day returns policy, certain products may have a manufacturer's warranty.
        If you believe your product has a manufacturing defect, please contact AATienda customer care
        for assistance.
      </Text>

      <Text style={P}>
        If more than 15 business days have passed since we approved your return, please contact us
        below:
      </Text>

      <View style={styles.contactBox}>
        <Text style={styles.contactLine}>
          Phone contact:{" "}
          <Text style={styles.link} onPress={openPhone}>
            {PHONE}
          </Text>
        </Text>
        <Text style={styles.contactLine}>
          Email Contact:{" "}
          <Text style={styles.link} onPress={openEmail}>
            {EMAIL_STORE}
          </Text>
        </Text>
      </View>

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
  content: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
  },

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
    marginTop: 8,
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

  bulletRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  bulletDot: {
    color: "#787878",
    fontSize: 16,
    lineHeight: 20,
    marginRight: 10,
  },
  bulletDotMobile: { fontSize: 15 },
  bulletText: {
    flex: 1,
    color: "#787878",
    fontSize: 14,
    lineHeight: 20,
  },
  bulletTextMobile: { fontSize: 13, lineHeight: 19 },

  contactBox: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  contactLine: {
    color: "#787878",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 6,
  },
  link: {
    color: "#54443d",
    textDecorationLine: "underline",
    fontWeight: "700",
  },
});