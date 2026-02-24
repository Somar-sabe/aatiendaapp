// TermsOfServiceScreen.tsx (React Native / Expo)
// Copy-paste ready. Same policy-page style: headings + paragraphs + bullets + links (email/website).

import React, { useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Linking,
  useWindowDimensions,
} from "react-native";
import HeaderUtilityBar from "@/components/HeaderUtilityBar";
import AppHeader from "@/components/AppHeader";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/footer";
const WEBSITE = "https://aatienda.com";

export default function TermsOfServiceScreen() {
  const { width } = useWindowDimensions();
  const isMobile = width < 749;

  const H1 = useMemo(() => [styles.h1, isMobile && styles.h1Mobile], [isMobile]);
  const H2 = useMemo(() => [styles.h2, isMobile && styles.h2Mobile], [isMobile]);
  const P = useMemo(() => [styles.p, isMobile && styles.pMobile], [isMobile]);

  const openWebsite = async () => {
    try {
      const can = await Linking.canOpenURL(WEBSITE);
      if (can) await Linking.openURL(WEBSITE);
    } catch {}
  };

  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.content}>
              <AnnouncementBar />
              <HeaderUtilityBar />
              <AppHeader />
      <Text style={H1}>Terms of Service</Text>

      <Text style={P}>
        Welcome to{" "}
        <Text style={styles.link} onPress={openWebsite}>
          www.AATienda.com
        </Text>
        , where luxury leads the way. Our goal is to provide our customers with an effortless
        shopping experience, and we hope you enjoy everything our website has to offer.
      </Text>

      <Text style={P}>
        AATienda.com is owned and operated by Aya Abdalla General Trading LLC, trading as AA TIENDA,
        and its affiliates and subsidiaries in the United Arab Emirates. Aya Abdalla General Trading
        LLC is a limited liability company incorporated under the laws of the United Arab Emirates
        with commercial license number 1067313 and registered office in Dubai. AATienda is also a
        registered company in the United Kingdom with license number 14662931 and registered office
        in Derby, UK, DE23 6UX.
      </Text>

      <Text style={P}>
        These terms and any other terms of use on the website constitute the website terms that
        govern your use of our website and services. These terms are available in English. We may
        change these terms and conditions without notice by posting updated terms on the website, so
        we recommend checking regularly for updates. By placing an order on our website, you agree
        to the latest version of the website terms. If a change in the law requires us to change the
        terms after you have placed an order, we will apply the updated terms to your order.
        Otherwise, the version posted at the time of your order will apply. If you do not agree to
        be bound by the website terms, you should not use the website and leave it immediately.
      </Text>

      <Text style={H2}>Eligibility</Text>
      <Text style={P}>
        We aim to make AATienda and its associated services available to as many as possible.
        However, we do require that you are at least 18 years of age, to be able to lawfully:
      </Text>
      <View style={styles.list}>
        <Bullet text="make payments through one of our accepted tender types" isMobile={isMobile} />
        <Bullet text="agree to these terms" isMobile={isMobile} />
        <Bullet text="enter into binding orders with us" isMobile={isMobile} />
      </View>

      <Text style={P}>
        To fully utilize the features and services of this website, you can either use it as a guest
        or create an account and register your details. You are responsible for ensuring that any
        personal and payment details you provide are valid, accurate, and complete. Keep your
        account details and password confidential and secure, and notify us immediately if you
        suspect any compromise. By registering or placing an order, you warrant that you meet the
        eligibility criteria and that the information you provide is accurate. Commercial entities
        are eligible to register. We are committed to complying with our Privacy Policy but are not
        responsible for any loss due to misuse of your details.
      </Text>

      <Text style={H2}>Registration</Text>
      <Text style={P}>
        To access features and services, you may use guest checkout or create an account. It is your
        responsibility to ensure personal and payment information is accurate, complete, and
        up-to-date. Customer service representatives will never ask for your password. If you suspect
        your account has been compromised, please contact us immediately. By registering or placing
        an order, you acknowledge you meet eligibility requirements and that all information provided
        is accurate and belongs to you.
      </Text>

      <Text style={H2}>Orders</Text>
      <Text style={P}>
        By placing an order, you agree to purchase the items specified at the stated price, including
        delivery charges, taxes, and duties (if applicable), subject to your rights to cancel or
        return the items. Our acceptance of an order is at our discretion and may be withheld for
        reasons including ineligibility, inability to verify payment authorisation, suspected fraud,
        shipping restrictions, and stock availability. Items in your basket are not reserved until
        the order is paid for.
      </Text>

      <Text style={P}>
        Availability information is provided to help estimate likelihood of stock at the time of
        purchase, but inventory levels can change. If an item becomes unavailable after you place an
        order, we will inform you.
      </Text>

      <Text style={P}>
        After you place an order, you will receive an email acknowledging receipt. This does not
        confirm acceptance. Your order is accepted only when we send a dispatch confirmation for the
        relevant item(s). No third party, other than us, has authority to confirm acceptance.
      </Text>

      <Text style={H2}>Complimentary gifts</Text>
      <Text style={P}>
        Enjoy a complimentary gift with purchases made on AATienda. Items purchased may be
        non-returnable if the gift’s packaging is tampered with or opened.
      </Text>

      <Text style={H2}>Pre-Order Items</Text>
      <Text style={P}>
        Pre-order items provide early access to collections. Delivery will occur when items become
        available. Availability is subject to delivery for pre-order items, and only online payment
        is accepted.
      </Text>

      <Text style={H2}>Cancellation Policy</Text>
      <Text style={P}>
        Your Pre-Order item can be cancelled at any time up to 30 days prior to delivery. All refunds
        will be issued as AATienda Store Credit.
      </Text>

      <Text style={H2}>Refund Policy for Pre-Orders</Text>
      <Text style={P}>
        For pre-order items, refunds will be issued as store credit only. The refunded amount will be
        credited to your AATienda store credit account and will not be transferred to your bank for
        debit/credit card/Apple Pay transactions. The refunded amount will not appear on your bank
        statement. You can use the refunded amount as store credit for future purchases on the
        AATienda platform.
      </Text>

      <Text style={H2}>Payment</Text>
      <Text style={P}>
        We accept Apple Pay, Visa, Mastercard, American Express, and online credit. Payment is
        processed at the time of order. By entering payment details, you confirm you are authorised
        to use them. We may decline orders where payment is not authorised, the payment method is
        invalid, or we suspect you are not authorised to use it. We may suspend or terminate payment
        options on your account and refuse use if we suspect fraudulent or suspicious activity.
      </Text>

      <Text style={P}>
        Our website may contain links to third-party websites owned and operated by others. We do not
        control or endorse their content, policies, or practices. Please read all third-party terms
        and privacy policies carefully.
      </Text>

      <Text style={H2}>Prices</Text>
      <Text style={P}>
        Website prices are shown in AED and do not include additional costs such as delivery charges,
        taxes, or duties. These will be displayed at checkout. If you pay using a currency other
        than AED, your card issuer will apply the exchange rate at the time of payment.
      </Text>

      <Text style={styles.subhead}>If the order has already been processed</Text>
      <View style={styles.list}>
        <Bullet
          text="We may cancel the order (or part of it), collect incorrectly priced item(s), and issue a full refund including delivery fees, taxes, and duties (if applicable)."
          isMobile={isMobile}
        />
        <Bullet
          text="If the price you paid is lower than actual price, we will honour the paid price."
          isMobile={isMobile}
        />
        <Bullet
          text="If the price you paid is higher than actual price, we will refund the difference."
          isMobile={isMobile}
        />
        <Bullet
          text="If not yet processed, we will inform you of the correct price and proceed only after your confirmation, or you may cancel and receive a full refund."
          isMobile={isMobile}
        />
      </View>

      <Text style={H2}>Promotional Codes and Discounts</Text>
      <Text style={P}>
        Promo codes are subject to specific terms, valid until a set date, one-time use only,
        non-redeemable for cash, cannot be combined with other offers, non-transferable, and for
        personal use only.
      </Text>

      <Text style={H2}>Cancellation</Text>
      <Text style={P}>
        You may contact us at any time to cancel or modify your order before it is marked as
        “Processed” on our online tracking system. If the order has already been processed, please
        accept delivery and initiate a return.
      </Text>

      <Text style={H2}>Product Liability</Text>
      <Text style={P}>
        By placing an order, you accept that the manufacturer holds responsibility for the products
        and that we are not liable for product liability issues, except as outlined in the Returns
        section (where applicable).
      </Text>

      <Text style={H2}>Content</Text>
      <Text style={P}>
        “Content” includes graphics, photographs, sounds, music, videos, audio, and text, plus
        related intellectual property rights. We take care to ensure information is accurate, but we
        cannot guarantee content is error-free, that the website will be free of errors, or that
        servers are free of viruses or harmful components. We recommend up-to-date virus checking
        software.
      </Text>

      <Text style={H2}>User Generated Content</Text>
      <Text style={P}>
        By submitting a review, you are responsible for your contribution and grant us the right to
        use it, including republishing in any form or media. We may remove content we believe is
        unlawful, defamatory, racist, libellous, promotes hatred or violence, infringes intellectual
        property, contains personal data, or is advertising. Do not post confidential information.
      </Text>

      <Text style={H2}>Third Party Sites</Text>
      <Text style={P}>
        We may link to third-party resources. We are not responsible for their content, accuracy,
        availability, privacy policies, advertising, products, materials, or services, and we are
        not responsible for damage, loss, or offence caused by reliance on them.
      </Text>

      <Text style={H2}>Descriptions</Text>
      <Text style={P}>
        Product descriptions are believed accurate at publication. Colours and resolution may vary by
        device. Measurements and weights are approximate.
      </Text>

      <Text style={H2}>The Sustainability Clause</Text>
      <Text style={P}>
        “Sustainability” refers to brands adopting eco-friendly processes and contributing to a
        greener planet. We highlight labels making efforts towards sustainability in their own ways.
      </Text>

      <Text style={H2}>No Warranty</Text>
      <Text style={P}>
        Your use of the website is at your sole risk. The website is provided “as is” and “as
        available.” We may restrict or terminate access at any time. Except as required by law, we do
        not warrant uninterrupted access, security, virus-free operation, or that information is
        accurate, adequate, useful, timely, reliable, or complete. Downloads are at your own risk.
      </Text>

      <Text style={H2}>Liability</Text>
      <Text style={P}>
        We are not liable for indirect, special, incidental, or consequential losses arising from
        your use or inability to use the website, except for death or personal injury resulting from
        our negligence or as required by law. Liability is limited to the amount paid for the
        product(s) giving rise to the claim. This does not affect rights under applicable law.
      </Text>

      <Text style={H2}>Indemnity</Text>
      <Text style={P}>
        You agree to indemnify and hold us harmless, including our directors, agents, affiliates,
        licensors, and suppliers, from claims, damages, costs, and expenses (including legal fees)
        arising from your use of the website and/or breach of these terms.
      </Text>

      <Text style={H2}>Entire Agreement</Text>
      <Text style={P}>
        These Website Terms represent the exclusive agreement between us regarding use of the
        Website and purchases, replacing all prior proposals and agreements.
      </Text>

      <Text style={H2}>No Agency</Text>
      <Text style={P}>
        Nothing in these terms creates an agency, partnership, or joint enterprise between us.
      </Text>

      <Text style={H2}>No Waiver</Text>
      <Text style={P}>
        Delay or failure to exercise rights or remedies is not a waiver. Rights and remedies are
        cumulative and not exclusive.
      </Text>

      <Text style={H2}>Illegality</Text>
      <Text style={P}>
        If any provision is illegal or unenforceable, remaining terms remain in full force and
        effect.
      </Text>

      <Text style={H2}>Language</Text>
      <Text style={P}>
        Website terms are available in English and Arabic. In case of any conflict, the English
        version shall apply.
      </Text>

      <Text style={H2}>Disputes and Governing Law</Text>
      <Text style={P}>
        Website Terms are subject to the laws of the United Arab Emirates and the emirate of Dubai,
        and any disputes are exclusively under the jurisdiction of Dubai courts in Dubai, United Arab
        Emirates.
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

  link: {
    color: "#54443d",
    textDecorationLine: "underline",
    fontWeight: "700",
  },

  list: { marginTop: 4, marginBottom: 6 },

  bulletRow: { flexDirection: "row", alignItems: "flex-start", marginBottom: 8 },
  bulletDot: { color: "#787878", fontSize: 16, lineHeight: 20, marginRight: 10 },
  bulletDotMobile: { fontSize: 15 },
  bulletText: { flex: 1, color: "#787878", fontSize: 14, lineHeight: 20 },
  bulletTextMobile: { fontSize: 13, lineHeight: 19 },
});