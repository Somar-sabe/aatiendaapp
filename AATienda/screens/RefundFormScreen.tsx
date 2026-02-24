// RefundFormScreen.tsx (React Native / Expo)
// Same layout: centered heading, grey labels, 2-column on desktop, 1-column on mobile, big textarea, centered submit button.
// Submission: posts to your backend endpoint (set API_URL). If you want mailto only, I can switch it.

import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
  useWindowDimensions,
  Alert,
  ActivityIndicator,
  Platform,
} from "react-native";
import HeaderUtilityBar from "@/components/HeaderUtilityBar";
import AppHeader from "@/components/AppHeader";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/footer";
const API_URL = "https://partners.aatienda.com/api/refund-request"; // ✅ change to your endpoint

type Payload = {
  name: string;
  email: string;
  order_id: string;
  product_title: string;
  reason: string;
};

export default function RefundFormScreen() {
  const { width } = useWindowDimensions();
  const isMobile = width < 750;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [orderId, setOrderId] = useState("");
  const [productTitle, setProductTitle] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  const buttonWidth = useMemo(() => {
    // match your 30.015vw on desktop; full on mobile
    if (isMobile) return "100%";
    return Math.min(Math.round(width * 0.30015), 520);
  }, [isMobile, width]);

  const horizontalPadding = isMobile ? Math.round(width * 0.06667) : Math.round(width * 0.26867);
  const containerPaddingTop = isMobile ? 24 : 34;
  const containerPaddingBottom = isMobile ? 24 : 34;

  const validateEmail = (v: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v).toLowerCase());

  const onSubmit = async () => {
    if (!email.trim() || !validateEmail(email)) {
      Alert.alert("Error", "Please enter a valid email.");
      return;
    }
    if (!name.trim()) {
      Alert.alert("Error", "Please enter your name.");
      return;
    }
    if (!orderId.trim()) {
      Alert.alert("Error", "Please enter your Order ID.");
      return;
    }
    if (!productTitle.trim()) {
      Alert.alert("Error", "Please enter Product Title.");
      return;
    }
    if (!reason.trim()) {
      Alert.alert("Error", "Please enter the Reason of Return.");
      return;
    }

    const payload: Payload = {
      name: name.trim(),
      email: email.trim(),
      order_id: orderId.trim(),
      product_title: productTitle.trim(),
      reason: reason.trim(),
    };

    try {
      setLoading(true);

      // ✅ send to your backend (PHP/Node/etc)
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || `Request failed (${res.status})`);
      }

      Alert.alert("Submitted", "Your refund request has been sent successfully.");
      setName("");
      setEmail("");
      setOrderId("");
      setProductTitle("");
      setReason("");
    } catch (e: any) {
      Alert.alert("Error", e?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.page} contentContainerStyle={{ paddingBottom: 34 }}>
               
              <HeaderUtilityBar />
              <AppHeader />
      <View
        style={[
          styles.container,
          {
            paddingLeft: horizontalPadding,
            paddingRight: horizontalPadding,
            paddingTop: containerPaddingTop,
            paddingBottom: containerPaddingBottom,
          },
        ]}
      >
        <Text style={styles.heading}>Refund Form</Text>

        {/* Row 1: Name + Email */}
        <View style={[styles.row, isMobile && styles.rowMobile]}>
          <Field
            label="Name"
            value={name}
            onChangeText={setName}
            placeholder="Name"
            autoCapitalize="words"
          />
          <Field
            label="Email *"
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Row 2: Order ID + Product Title */}
        <View style={[styles.row, isMobile && styles.rowMobile]}>
          <Field
            label="Order ID"
            value={orderId}
            onChangeText={setOrderId}
            placeholder="Order ID"
          />
          <Field
            label="Product Title"
            value={productTitle}
            onChangeText={setProductTitle}
            placeholder="Product Title"
          />
        </View>

        {/* Textarea */}
        <View style={styles.textAreaWrap}>
          <Text style={styles.label}>Reason of Return</Text>
          <TextInput
            value={reason}
            onChangeText={setReason}
            placeholder="Reason of Return"
            placeholderTextColor="#B0B0B0"
            multiline
            textAlignVertical="top"
            style={[styles.textArea, { minHeight: isMobile ? 117 : 187 }]}
          />
        </View>

        {/* Button */}
        <View style={styles.buttonRow}>
          <Pressable
            onPress={onSubmit}
            disabled={loading}
            style={({ pressed }) => [
              styles.button,
              { width: buttonWidth },
              pressed && !loading && styles.buttonPressed,
              loading && styles.buttonDisabled,
            ]}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Submit</Text>
            )}
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

function Field(props: {
  label: string;
  value: string;
  onChangeText: (t: string) => void;
  placeholder: string;
  keyboardType?: any;
  autoCapitalize?: any;
}) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        value={props.value}
        onChangeText={props.onChangeText}
        placeholder={props.placeholder}
        placeholderTextColor="#B0B0B0"
        keyboardType={props.keyboardType}
        autoCapitalize={props.autoCapitalize}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: "#fff" },

  container: {
    width: "100%",
  },

  heading: {
    textAlign: "center",
    marginBottom: 24,
    paddingBottom: 0,
    color: "#000",
    fontSize: 18,
    fontWeight: "300",
    textTransform: "uppercase",
    letterSpacing: 0.2,
    // fontFamily: "CormorantGaramond-Regular",
  },

  row: {
    flexDirection: "row",
    gap: 16,
  },
  rowMobile: {
    flexDirection: "column",
    gap: 0,
  },

  field: {
    flex: 1,
    marginBottom: 24,
  },

  label: {
    color: "#B0B0B0",
    fontSize: 14,
    fontWeight: "300",
    lineHeight: 28,
    marginTop: -11,
    // fontFamily: "Poppins-Light",
  },

  input: {
    borderWidth: 1,
    borderColor: "#B0B0B0",
    paddingHorizontal: 16,
    paddingVertical: Platform.select({ ios: 14, android: 12, default: 12 }),
    fontSize: 14,
    color: "#141414",
    // fontFamily: "Poppins-Regular",
  },

  textAreaWrap: {
    marginBottom: 0,
  },

  textArea: {
    borderWidth: 1,
    borderColor: "#B0B0B0",
    paddingHorizontal: 16,
    paddingTop: 18, // similar to your "padding-top: 34px" feel but cleaner in RN
    paddingBottom: 16,
    fontSize: 14,
    color: "#141414",
    // fontFamily: "Poppins-Regular",
  },

  buttonRow: {
    marginTop: 34,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },

  button: {
    backgroundColor: "#54443d",
    paddingVertical: 8,
    paddingHorizontal: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonPressed: { opacity: 0.85 },
  buttonDisabled: { opacity: 0.7 },

  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "300",
    textTransform: "uppercase",
    letterSpacing: 2.1,
    // fontFamily: "Poppins-Light",
  },
});