// PrivacyPolicyScreen.tsx (React Native / Expo)
// Copy-paste ready. Clean "policy page" layout with headings, paragraphs, bullets, and mailto link.

import React, { useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Linking,
  useWindowDimensions,
  Platform,
} from "react-native";
import HeaderUtilityBar from "@/components/HeaderUtilityBar";
import AppHeader from "@/components/AppHeader";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/footer";
const EMAIL = "privacy@aatienda.com";

export default function PrivacyPolicyScreen() {
  const { width } = useWindowDimensions();
  const isMobile = width < 749;

  const H1 = useMemo(() => [styles.h1, isMobile && styles.h1Mobile], [isMobile]);
  const P = useMemo(() => [styles.p, isMobile && styles.pMobile], [isMobile]);
  const H2 = useMemo(() => [styles.h2, isMobile && styles.h2Mobile], [isMobile]);

  const openEmail = async () => {
    const url = `mailto:${EMAIL}`;
    try {
      const can = await Linking.canOpenURL(url);
      if (can) await Linking.openURL(url);
    } catch {}
  };

  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.content}>
               
              <HeaderUtilityBar />
              <AppHeader />
      <Text style={H1}>Privacy Policy</Text>

      <Text style={P}>
        At AATIENDA, we value your privacy and are committed to protecting it. Our Privacy Policy
        explains how we collect and use your personal data. We collect information for specific
        purposes and only share it when necessary. Our website and services are not intended for use
        by children. If you have any questions about our privacy policy, please contact our data
        protection officer at{" "}
        <Text style={styles.link} onPress={openEmail}>
          {EMAIL}
        </Text>
        .
      </Text>

      <Text style={H2}>THIRD PARTY WEBSITES</Text>
      <Text style={P}>
        Our website may have links to third-party websites, including our Partners, advertisers, and
        affiliates. It's important to note that our Privacy Policy doesn't apply to these websites.
        We're not responsible for their privacy policies or practices, so we encourage you to review
        their policies before sharing any personal data with them.
      </Text>

      <Text style={H2}>1. WHAT DO YOU USE MY INFORMATION FOR?</Text>
      <Text style={P}>
        You can provide us with information about yourself in several ways, such as creating an
        account on our website, placing an order, filling out online forms (such as registration,
        surveys, and competitions), opting in to receive newsletters and special offers,
        participating in social media functions, or communicating with us via email, telephone,
        instant messaging apps, or social media.
      </Text>

      <Text style={P}>
        The information you provide us may include your name, address, phone number, email address,
        date of birth, gender, purchase history, shopping preferences, images, and financial
        information (such as credit or debit card details, which are held by our payment
        processors). If you create an account, you can also choose to share your photograph and
        nickname, and invite friends to shop at our website. Please obtain permission from your
        friends before sharing their contact details with us and only forward emails to those who
        have consented to receive them.
      </Text>

      <Text style={P}>
        We may also receive information about you from other sources, such as other accounts you use
        to log in to our website (e.g., Apple ID or Google Sign In), data brokers, our partners,
        social media providers (such as Facebook and Twitter), advertising networks, analytics
        partners, and payment and delivery service providers.
      </Text>

      <Text style={P}>
        We may use data appending services to supplement the information you provide us with
        additional data from public or social graph sources. This helps us to provide you with more
        relevant content and promotions, and to comply with legal obligations such as sanctions
        laws. We may use this data to better understand your interests, provide product
        recommendations and advertising, and enhance the security of our website. The data we append
        may include household size, income, or profession, and may be associated with your personal
        information such as your name, email, address, or phone number.
      </Text>

      <Text style={P}>
        Each time you visit our website, our servers automatically create and record certain
        information, which includes cookies and device information.
      </Text>

      <Text style={styles.subhead}>Cookies</Text>
      <Text style={P}>
        Cookies are small text files that can help improve your experience on the website by
        storing information such as your location or language preferences, and ensuring that items
        in your cart are not lost while navigating between pages. We may also use cookies to provide
        you with tailored advertising.
      </Text>

      <Text style={styles.subhead}>Device information</Text>
      <Text style={P}>
        Device information provided by your device (such as type, IP address, location, browser,
        mobile network provider, pages visited, time zone, and crash/download error reports) will
        vary depending on your operating system and device settings.
      </Text>

      <Text style={H2}>2. WHO DO YOU SHARE MY INFORMATION WITH?</Text>
      <Text style={P}>
        We use your information in various ways to provide services such as ordering and receiving
        products, administering your AAtienda account, and optimizing your experience. Additionally,
        we may use your personal information, including your name, email address, and address, to
        send you occasional updates, news, and offers via email, post, or other media, tailored to
        your preferences. You can modify your preferences or opt-out of email marketing
        communications in your account’s profile management section or by following opt-out
        instructions in promotional emails.
      </Text>

      <Text style={P}>
        If your country is covered by these services, we may use your information to offer shopping
        recommendations and personal styling services, resulting in an improved and interactive
        shopping experience for you. Third-party providers will also be involved in providing these
        services and acting as processors.
      </Text>

      <Text style={P}>
        We work with third-party service providers to deliver ads that are most relevant to you on
        different devices and across our own and other websites and mobile apps. These providers may
        use information about your visits to our website or use of our mobile app, as well as your
        interactions with other websites or apps, to target ads for products available from AAtienda
        or our partners.
      </Text>

      <Text style={P}>
        We conduct research, analysis, and surveys on your website usage and preferences, monitor
        your spending on our website to determine your eligibility for our programs, and use your
        information to confirm your identity and perform credit or anti-fraud checks to safeguard
        your financial security and ours.
      </Text>

      <Text style={styles.subhead}>Examples of processing purposes</Text>
      <View style={styles.list}>
        <Bullet
          text="To register and manage your AAtienda account on our website: we collect your name, email, password, and other details such as phone number, address, and gender that you choose to provide. Legal basis: performance of a contract."
          isMobile={isMobile}
        />
        <Bullet
          text="To fulfil purchases: we collect your name, address, phone number, and order details (products, size, and price). Legal basis: performance of a contract."
          isMobile={isMobile}
        />
        <Bullet
          text="To collect payment: we transfer payment information to authorized payment providers; we do not store this information ourselves. Legal basis: performance of a contract and legitimate interests."
          isMobile={isMobile}
        />
        <Bullet
          text="To administer, maintain and optimise our website and services: device information, cookie identifiers and browsing information. Legal basis: legitimate interests."
          isMobile={isMobile}
        />
        <Bullet
          text="To perform fraud and credit checks: identity and transaction-related information and publicly available information where applicable. Legal basis: legitimate interests and/or legal obligations."
          isMobile={isMobile}
        />
        <Bullet
          text="To send marketing communications and personalised offers: contact details, preferences, and usage data (where permitted). Legal basis: legitimate interests and/or consent."
          isMobile={isMobile}
        />
        <Bullet
          text="To manage loyalty programs and personalised recommendations: account and preference information, purchase and browsing behaviour. Legal basis: legitimate interests."
          isMobile={isMobile}
        />
        <Bullet
          text="To conduct research and analysis: usage data and feedback to improve our services. Legal basis: legitimate interests."
          isMobile={isMobile}
        />
      </View>

      <Text style={H2}>3. HOW DO YOU STORE MY INFORMATION?</Text>
      <Text style={P}>
        In order to provide our services and maintain our website, we collaborate with a number of
        carefully selected third parties. We may share your information with these third parties in
        limited circumstances and only to the extent required to provide their services.
      </Text>

      <Text style={styles.subhead}>Types of third-party providers</Text>
      <View style={styles.list}>
        <Bullet text="Courier companies for delivery (access to order information such as name and address)." isMobile={isMobile} />
        <Bullet text="Payment providers (e.g., UAE and US) to process payments; provider depends on your location." isMobile={isMobile} />
        <Bullet text="Anti-fraud and credit check providers for security and fraud prevention." isMobile={isMobile} />
        <Bullet text="Customer service management providers to support you and improve service quality." isMobile={isMobile} />
        <Bullet text="Analytics and search providers (e.g., Google) to optimise and improve our website." isMobile={isMobile} />
        <Bullet text="Marketing tools and performance marketing/recommendations providers for ads and personalisation." isMobile={isMobile} />
        <Bullet text="Research companies for surveys and studies about website usage and services." isMobile={isMobile} />
        <Bullet text="IT/technology providers supporting our infrastructure and data storage." isMobile={isMobile} />
      </View>

      <Text style={P}>
        We may share information with advertising and social media partners to select and serve
        relevant ads. We may also enrich or match data with other sources to better understand
        customer interests and deliver personalised offers.
      </Text>

      <Text style={P}>
        If we consider corporate transactions (e.g., mergers, acquisitions, reorganisations, asset
        sales), we may transfer information to assess and undertake such transactions.
      </Text>

      <Text style={P}>
        We may also be required to share information with regulators or law enforcement agencies
        where required by law, a court order, or legal process, and where appropriate we will attempt
        to notify you (unless prohibited).
      </Text>

      <Text style={P}>
        We may aggregate and anonymise information to create datasets about usage and purchasing
        behaviour. These datasets do not identify you personally but may be shared with select third
        parties for business insights.
      </Text>

      <Text style={H2}>4. COOKIES</Text>
      <Text style={P}>
        We use technology such as cookies to collect information and store your online preferences.
        We use both session cookies (expire when you close your browser) and persistent cookies
        (remain until they expire or you delete them).
      </Text>

      <View style={styles.list}>
        <Bullet
          title="Strictly necessary cookies:"
          text="Essential to enable site features (e.g., remembering login details or basket items) and help assess security and fraud prevention."
          isMobile={isMobile}
        />
        <Bullet
          title="Performance cookies:"
          text="Collect anonymous information on how you use our website (e.g., Google Analytics) to improve navigation and measure campaign effectiveness."
          isMobile={isMobile}
        />
        <Bullet
          title="Functionality cookies:"
          text="Remember choices such as country, language, and search parameters to provide a more tailored experience."
          isMobile={isMobile}
        />
        <Bullet
          title="Targeting/advertising cookies:"
          text="Collect browsing habits and limited aggregated demographic info to show more relevant ads and limit repetition; usually placed by third-party networks."
          isMobile={isMobile}
        />
      </View>

      <Text style={P}>
        You can opt-out of Google Analytics cookies using the Google Analytics opt-out browser add-on.
        For other types of cookies, you can remove them through your browser settings. Rejecting
        cookies does not guarantee you will stop seeing ads; it means opted-out companies will no
        longer deliver ads based on your web preferences, and you may see more irrelevant ads.
      </Text>

      <Text style={H2}>5. SECURITY</Text>
      <Text style={P}>
        Ensuring the security of your personal information is of utmost importance to us. We employ
        reasonable measures such as TLS encryption during ordering, unique username/password access
        for your account, and not retaining credit/debit card details that could be used for fraud
        (such as CVV). We also monitor our systems for vulnerabilities and attacks. However, internet
        transmission is not entirely secure and any transmission is at your own risk.
      </Text>

      <Text style={H2}>6. HOW LONG WILL YOU STORE MY INFORMATION FOR?</Text>
      <Text style={P}>
        We keep the data you provide for as long as you have an AAtienda account with us, and
        afterwards for as long as you may have questions or claims related to our services, subject
        to any legal retention requirements. You can ask us to delete your data in certain
        circumstances. If you stop using our services, we may keep your information in aggregated
        and anonymised form.
      </Text>

      <Text style={H2}>7. WHAT ARE MY PRIVACY RIGHTS?</Text>
      <Text style={P}>
        You have certain rights concerning personal data we hold about you. Some rights apply only
        in specific circumstances. We will ask you to verify your identity before responding. If you
        authorised someone else to make a request, they must present valid power of attorney. We
        respond without undue delay and within at least one month (may be extended by two months in
        some circumstances). To exercise any rights, contact{" "}
        <Text style={styles.link} onPress={openEmail}>
          {EMAIL}
        </Text>
        .
      </Text>

      <View style={styles.list}>
        <Bullet title="Access:" text="Know whether we process your personal data and receive details on what we hold, how we use it, and who we share it with." isMobile={isMobile} />
        <Bullet title="Portability:" text="Receive a subset of your data in a structured, commonly used, machine-readable format and request transfer where technically feasible." isMobile={isMobile} />
        <Bullet title="Correction:" text="Correct inaccurate or incomplete personal data in your account or by contacting us." isMobile={isMobile} />
        <Bullet title="Erasure:" text="Request deletion in certain circumstances (e.g., no longer necessary or consent withdrawn), subject to legal grounds to retain data." isMobile={isMobile} />
        <Bullet
          title="Restriction:"
          text="Request we stop processing (storage only) in cases such as disputed accuracy, unlawful processing, legal claims, or objections to legitimate interest."
          isMobile={isMobile}
        />
        <Bullet
          title="Marketing preferences & objection:"
          text="Object to promotional processing at any time via account preferences or the unsubscribe link in marketing emails; you may still receive order/policy emails."
          isMobile={isMobile}
        />
      </View>

      <Text style={H2}>8. UPDATES TO THIS POLICY</Text>
      <Text style={P}>
        This privacy policy may be updated from time to time and changes will be posted on this
        page. If there are significant changes to how we handle personal data, we will notify you by
        email or through other appropriate means. Please check this page regularly to stay informed.
      </Text>

      <View style={styles.footerSpace} />
    </ScrollView>
  );
}

function Bullet({
  title,
  text,
  isMobile,
}: {
  title?: string;
  text: string;
  isMobile: boolean;
}) {
  return (
    <View style={styles.bulletRow}>
      <Text style={[styles.bulletDot, isMobile && styles.bulletDotMobile]}>•</Text>
      <Text style={[styles.bulletText, isMobile && styles.bulletTextMobile]}>
        {!!title && <Text style={styles.bulletTitle}>{title} </Text>}
        {text}
      </Text>
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

  link: {
    color: "#54443d",
    textDecorationLine: "underline",
    fontWeight: "600",
  },

  list: {
    marginTop: 4,
    marginBottom: 6,
  },

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
    // fontFamily: "Poppins-Regular",
  },
  bulletTextMobile: { fontSize: 13, lineHeight: 19 },

  bulletTitle: {
    color: "#141414",
    fontWeight: "700",
    textTransform: "uppercase",
  },

  footerSpace: { height: 24 },
});