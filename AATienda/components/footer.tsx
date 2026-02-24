import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  TouchableOpacity,
  Linking,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons, Feather, FontAwesome5 } from "@expo/vector-icons";
import type { RootStackParamList } from "@/navigation/StackNavigator";

type Nav = NativeStackNavigationProp<RootStackParamList>;
type SectionKey = "about" | "policies" | "care";

const SOCIAL = {
  facebook: "", // ضع رابطك إذا بدك
  instagram: "",
  youtube: "",
  tiktok: "",
  pinterest: "",
  snapchat: "",
};

export default function Footer() {
  const nav = useNavigation<Nav>();

  const [open, setOpen] = useState<SectionKey | null>(null);
  const toggle = (k: SectionKey) => setOpen((p) => (p === k ? null : k));

  const year = useMemo(() => new Date().getFullYear(), []);
  const [email, setEmail] = useState("");

  // ✅ FIX: navigate using object { name } => solves TS overload issue
  const go = (route: keyof RootStackParamList) => {
    setOpen(null);
    nav.navigate({ name: route } as any);
  };

  // If you ever need params later:
  // const goWithParams = <T extends keyof RootStackParamList>(
  //   route: T,
  //   params: RootStackParamList[T]
  // ) => {
  //   setOpen(null);
  //   nav.navigate({ name: route, params } as any);
  // };

  const openUrl = async (url: string) => {
    try {
      if (!url) return;
      const ok = await Linking.canOpenURL(url);
      if (!ok) return Alert.alert("Can't open link");
      await Linking.openURL(url);
    } catch {
      Alert.alert("Can't open link");
    }
  };

  const onSubmit = () => {
    const v = email.trim();
    if (!v) return Alert.alert("Please enter your email");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v))
      return Alert.alert("Please enter a valid email");

    Alert.alert("Thanks!", "You are subscribed.");
    setEmail("");
  };

  return (
    <View style={styles.wrap}>
      {/* Logo */}
      <View style={styles.logoBox}>
        <Text style={styles.logoMain}>AA Tienda</Text>
        <Text style={styles.logoTag}>Leading The luxury way</Text>
      </View>

      {/* Copyright */}
      <Text style={styles.copy}>© {year} AATienda. All rights reserved.</Text>

      {/* Subscribe */}
      <Text style={styles.subscribeTitle}>
        Subscribe To Get Once-In-A-{"\n"}Lifetime Deals
      </Text>

      <View style={styles.subscribeRow}>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email address"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
          returnKeyType="done"
          onSubmitEditing={onSubmit}
        />
        <Pressable style={styles.submitBtn} onPress={onSubmit}>
          <Text style={styles.submitText}>Submit</Text>
        </Pressable>
      </View>

      {/* Accordion */}
      <View style={styles.accordion}>
        <AccordionRow
          title="About AATIENDA"
          open={open === "about"}
          onPress={() => toggle("about")}
        >
          <Pressable style={styles.linkRow} onPress={() => go("AboutAATienda")}>
            <Text style={styles.linkText}>About us</Text>
          </Pressable>

          <Pressable style={styles.linkRow} onPress={() => go("Seller")}>
            <Text style={styles.linkText}>Affiliate Program</Text>
          </Pressable>

          <Pressable
            style={styles.linkRow}
            onPress={() => go("AATiendaBusiness" as any)}
          >
            <Text style={styles.linkText}>Become a partner</Text>
          </Pressable>

          <Pressable
            style={styles.linkRow}
            onPress={() => go("MainAccount" as any)}
          >
            <Text style={styles.linkText}>My Account</Text>
          </Pressable>
        </AccordionRow>

        <AccordionRow
          title="Policies"
          open={open === "policies"}
          onPress={() => toggle("policies")}
        >
          <Pressable style={styles.linkRow} onPress={() => go("RefundForm")}>
            <Text style={styles.linkText}>Refund Form</Text>
          </Pressable>

          <Pressable
            style={styles.linkRow}
            onPress={() => go("PrivacyPolicy" as any)}
          >
            <Text style={styles.linkText}>Privacy Policy</Text>
          </Pressable>

          <Pressable
            style={styles.linkRow}
            onPress={() => go("TermsOfService")}
          >
            <Text style={styles.linkText}>Terms of Service</Text>
          </Pressable>

          <Pressable
            style={styles.linkRow}
            onPress={() => go("ShippingPolicy")}
          >
            <Text style={styles.linkText}>Shipping Policy</Text>
          </Pressable>

          <Pressable style={styles.linkRow} onPress={() => go("RefundPolicy")}>
            <Text style={styles.linkText}>Returns & Refunds</Text>
          </Pressable>
        </AccordionRow>

        <AccordionRow
          title="Customer Care"
          open={open === "care"}
          onPress={() => toggle("care")}
        >
          <Pressable
            style={styles.linkRow}
            onPress={() =>
              openUrl(
                "https://wa.me/+971507108807?text=Hello%20AATienda%20Support"
              )
            }
          >
            <Text style={styles.linkText}>Contact Us</Text>
          </Pressable>

          <Pressable style={styles.linkRow} onPress={() => go("Faqs")}>
            <Text style={styles.linkText}>FAQ</Text>
          </Pressable>

          <Pressable
            style={styles.linkRow}
            onPress={() => go("GoldDiamondSteps")}
          >
            <Text style={styles.linkText}>Gold & Diamond Steps</Text>
          </Pressable>
        </AccordionRow>
      </View>

      {/* Contact */}
      <View style={styles.contactBox}>
        <View style={styles.contactRow}>
          <Feather name="mail" size={22} color="#111" />
          <Text
            style={styles.contactText}
            onPress={() => openUrl("mailto:store@aatienda.com")}
          >
            store@aatienda.com
          </Text>
        </View>

        <View style={styles.contactRow}>
          <FontAwesome5 name="whatsapp" size={22} color="#111" />
          <Text
            style={styles.contactText}
            onPress={() => openUrl("tel:+971507108807")}
          >
            (+971) 50 710 8807
          </Text>
        </View>
      </View>

      {/* Social */}
      <Text style={styles.follow}>Follow us on:</Text>
      <View style={styles.socialRow}>
        <SocialIcon
          name="logo-facebook"
          onPress={() => openUrl(SOCIAL.facebook)}
          disabled={!SOCIAL.facebook}
        />
        <SocialIcon
          name="logo-instagram"
          onPress={() => openUrl(SOCIAL.instagram)}
          disabled={!SOCIAL.instagram}
        />
        <SocialIcon
          name="logo-youtube"
          onPress={() => openUrl(SOCIAL.youtube)}
          disabled={!SOCIAL.youtube}
        />
        <SocialIcon
          name="logo-tiktok"
          onPress={() => openUrl(SOCIAL.tiktok)}
          disabled={!SOCIAL.tiktok}
        />
        <SocialIcon
          name="logo-pinterest"
          onPress={() => openUrl(SOCIAL.pinterest)}
          disabled={!SOCIAL.pinterest}
        />
        <SocialIcon
          name="logo-snapchat"
          onPress={() => openUrl(SOCIAL.snapchat)}
          disabled={!SOCIAL.snapchat}
        />
      </View>

      {/* Payment title */}
      <Text style={styles.payTitle}>
        MULTIPLE PAYMENT METHODS{"\n"}FOR YOUR CONVENIENCE
      </Text>

      <View style={styles.payRow}>
        <PayPill label="Pay" />
        <PayPill label="GPay" />
        <PayPill label="VISA" bold />
        <PayPill label="tabby" />
        <PayPill label="tamara" />
      </View>
    </View>
  );
}

/** ----- Small helpers ----- */

function AccordionRow({
  title,
  open,
  onPress,
  children,
}: {
  title: string;
  open: boolean;
  onPress: () => void;
  children: React.ReactNode;
}) {
  return (
    <View>
      <Pressable style={styles.accHead} onPress={onPress}>
        <Text style={styles.accTitle}>{title}</Text>
        <Ionicons
          name={open ? "chevron-up" : "chevron-down"}
          size={18}
          color="#333"
        />
      </Pressable>

      {open && <View style={styles.accBody}>{children}</View>}
    </View>
  );
}

function SocialIcon({
  name,
  onPress,
  disabled,
}: {
  name: any;
  onPress: () => void;
  disabled?: boolean;
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={[styles.socialBtn, disabled && styles.socialBtnDisabled]}
      onPress={onPress}
      disabled={disabled}
    >
      <Ionicons name={name} size={18} color={disabled ? "#999" : "#333"} />
    </TouchableOpacity>
  );
}

function PayPill({ label, bold }: { label: string; bold?: boolean }) {
  return (
    <View style={styles.payPill}>
      <Text style={[styles.payText, bold && { fontWeight: "800" }]}>
        {label}
      </Text>
    </View>
  );
}

/** ----- Styles ----- */

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: "#fff",
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 26,
    alignItems: "center",
  },

  logoBox: { alignItems: "center", marginTop: 6 },
  logoMain: {
    fontSize: 34,
    fontWeight: "500",
    letterSpacing: 0.5,
    color: "#4a3f3a",
  },
  logoTag: {
    marginTop: 2,
    fontSize: 13,
    color: "#cc2b2b",
    fontWeight: "600",
  },

  copy: {
    marginTop: 14,
    fontSize: 12,
    color: "#111",
    fontWeight: "500",
  },

  subscribeTitle: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: "500",
    color: "#111",
    textAlign: "center",
    lineHeight: 22,
  },

  subscribeRow: {
    width: "100%",
    marginTop: 14,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#d6d6d6",
    borderRadius: 2,
    overflow: "hidden",
  },
  input: {
    flex: 1,
    height: 42,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
  },
  submitBtn: {
    height: 42,
    paddingHorizontal: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4a3f3a",
  },
  submitText: { color: "#fff", fontWeight: "600", fontSize: 13 },

  accordion: { width: "100%", marginTop: 16 },
  accHead: {
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  accTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111",
  },
  accBody: {
    width: "100%",
    paddingBottom: 6,
  },
  linkRow: { paddingVertical: 10, alignItems: "center" },
  linkText: { color: "#444", fontSize: 14, fontWeight: "500" },

  contactBox: { width: "100%", marginTop: 8, alignItems: "center" },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 10,
  },
  contactText: { fontSize: 14, color: "#111", fontWeight: "600" },

  follow: {
    marginTop: 18,
    fontSize: 13,
    color: "#111",
    fontWeight: "500",
  },
  socialRow: {
    marginTop: 10,
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap",
    justifyContent: "center",
  },
  socialBtn: {
    width: 40,
    height: 34,
    borderRadius: 4,
    backgroundColor: "#e9e9e9",
    alignItems: "center",
    justifyContent: "center",
  },
  socialBtnDisabled: {
    backgroundColor: "#f2f2f2",
  },

  payTitle: {
    marginTop: 18,
    fontSize: 12,
    letterSpacing: 3,
    fontWeight: "800",
    color: "#111",
    textAlign: "center",
    lineHeight: 20,
  },
  payRow: {
    marginTop: 14,
    flexDirection: "row",
    gap: 14,
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  payPill: {
    height: 18,
    paddingHorizontal: 8,
    borderRadius: 3,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
    justifyContent: "center",
  },
  payText: { fontSize: 10, color: "#111", fontWeight: "700" },
});