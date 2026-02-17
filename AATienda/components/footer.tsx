import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  TouchableOpacity,
  Linking,
} from "react-native";
import { Ionicons, Feather, FontAwesome5 } from "@expo/vector-icons";

type SectionKey = "about" | "policies" | "care";

export default function Footer() {
  const [open, setOpen] = useState<SectionKey | null>(null);
  const toggle = (k: SectionKey) => setOpen((p) => (p === k ? null : k));

  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <View style={styles.wrap}>
      {/* Logo */}
      <View style={styles.logoBox}>
        <Text style={styles.logoMain}>AA Tienda</Text>
        <Text style={styles.logoTag}>Leading The luxury way</Text>
      </View>

      {/* Copyright */}
      <Text style={styles.copy}>@{year} AATienda All right reserved</Text>

      {/* Subscribe */}
      <Text style={styles.subscribeTitle}>
        Subscribe To Get Once-In-A-{"\n"}Lifetime Deals
      </Text>

      <View style={styles.subscribeRow}>
        <TextInput
          placeholder=""
          placeholderTextColor="#999"
          style={styles.input}
        />
        <Pressable style={styles.submitBtn}>
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
          <Pressable style={styles.linkRow} onPress={() => {}}>
            <Text style={styles.linkText}>Our Story</Text>
          </Pressable>
          <Pressable style={styles.linkRow} onPress={() => {}}>
            <Text style={styles.linkText}>Brands</Text>
          </Pressable>
        </AccordionRow>

        <AccordionRow
          title="Policies"
          open={open === "policies"}
          onPress={() => toggle("policies")}
        >
          <Pressable style={styles.linkRow} onPress={() => {}}>
            <Text style={styles.linkText}>Shipping Policy</Text>
          </Pressable>
          <Pressable style={styles.linkRow} onPress={() => {}}>
            <Text style={styles.linkText}>Returns & Refunds</Text>
          </Pressable>
          <Pressable style={styles.linkRow} onPress={() => {}}>
            <Text style={styles.linkText}>Privacy Policy</Text>
          </Pressable>
        </AccordionRow>

        <AccordionRow
          title="Customer Care"
          open={open === "care"}
          onPress={() => toggle("care")}
        >
          <Pressable style={styles.linkRow} onPress={() => {}}>
            <Text style={styles.linkText}>Contact Us</Text>
          </Pressable>
          <Pressable style={styles.linkRow} onPress={() => {}}>
            <Text style={styles.linkText}>FAQ</Text>
          </Pressable>
        </AccordionRow>
      </View>

      {/* Contact */}
      <View style={styles.contactBox}>
        <View style={styles.contactRow}>
          <Feather name="mail" size={22} color="#111" />
          <Text
            style={styles.contactText}
            onPress={() => Linking.openURL("mailto:store@aatienda.com")}
          >
            store@aatienda.com
          </Text>
        </View>

        <View style={styles.contactRow}>
          <FontAwesome5 name="whatsapp" size={22} color="#111" />
          <Text
            style={styles.contactText}
            onPress={() => Linking.openURL("tel:+971507108807")}
          >
            (+971) 50 710 8807
          </Text>
        </View>
      </View>

      {/* Social */}
      <Text style={styles.follow}>Follow us on:</Text>
      <View style={styles.socialRow}>
        <SocialIcon name="logo-facebook" onPress={() => {}} />
        <SocialIcon name="logo-instagram" onPress={() => {}} />
        <SocialIcon name="logo-youtube" onPress={() => {}} />
        <SocialIcon name="logo-tiktok" onPress={() => {}} />
        <SocialIcon name="logo-pinterest" onPress={() => {}} />
        <SocialIcon name="logo-snapchat" onPress={() => {}} />
      </View>

      {/* Payment title */}
      <Text style={styles.payTitle}>
        MULTIPLE PAYMENT METHODS{"\n"}FOR YOUR CONVENIENCE
      </Text>

      {/* Payment icons row (placeholders) */}
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
}: {
  name: any;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity activeOpacity={0.85} style={styles.socialBtn} onPress={onPress}>
      <Ionicons name={name} size={18} color="#333" />
    </TouchableOpacity>
  );
}

function PayPill({ label, bold }: { label: string; bold?: boolean }) {
  return (
    <View style={styles.payPill}>
      <Text style={[styles.payText, bold && { fontWeight: "800" }]}>{label}</Text>
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