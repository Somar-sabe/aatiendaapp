import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/StackNavigator";
import HeaderUtilityBar from "@/components/HeaderUtilityBar";
import AppHeader from "@/components/AppHeader";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/footer";

type Nav = NativeStackNavigationProp<RootStackParamList, "Login">;

const BG =
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1400&q=80";

export default function LoginScreen() {
  const navigation = useNavigation<Nav>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSignIn = async () => {
    // TODO: connect your auth API
    // For now just demo:
    if (!email.trim() || !password.trim()) return;
    // navigation.replace("Home"); // if you want
    alert("Signed in (demo).");
  };

  return (
    <ImageBackground source={{ uri: BG }} style={styles.bg} resizeMode="cover">
             
            <HeaderUtilityBar />
            <AppHeader />
      <View style={styles.overlay} />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          {/* Top Back */}
          <Pressable style={styles.backRow} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={18} color="#fff" />
            <Text style={styles.backText}>BACK</Text>
          </Pressable>

          {/* Center block */}
          <View style={styles.center}>
            <Text style={styles.brand}>AA Tienda</Text>

            <Text style={styles.title}>LOGIN OR CREATE NEW{"\n"}ACCOUNT</Text>

            {/* Email */}
            <View style={styles.field}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder=""
                placeholderTextColor="rgba(255,255,255,0.5)"
                autoCapitalize="none"
                keyboardType="email-address"
                style={styles.input}
              />
              <View style={styles.line} />
            </View>

            {/* Password */}
            <View style={styles.field}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder=""
                placeholderTextColor="rgba(255,255,255,0.5)"
                secureTextEntry
                style={styles.input}
              />
              <View style={styles.line} />
            </View>

            <Pressable onPress={() => alert("Forgot password (TODO)")}>
              <Text style={styles.forgot}>FORGOT YOUR PASSWORD?</Text>
            </Pressable>

            {/* Sign in */}
            <Pressable style={styles.signInBtn} onPress={onSignIn}>
              <Text style={styles.signInText}>SIGN IN</Text>
            </Pressable>

            {/* Create account */}
            <Pressable
              style={styles.createBtn}
              onPress={() => navigation.navigate("Register")}
            >
              <Text style={styles.createText}>CREATE ACCOUNT</Text>
            </Pressable>

            {/* Social */}
            <Text style={styles.or}>OR CONTINUE WITH</Text>

            <View style={styles.socialRow}>
              <Pressable style={styles.socialBtn} onPress={() => alert("Apple (TODO)")}>
                <Ionicons name="logo-apple" size={22} color="#111" />
              </Pressable>
              <Pressable style={styles.socialBtn} onPress={() => alert("Facebook (TODO)")}>
                <Ionicons name="logo-facebook" size={22} color="#1877F2" />
              </Pressable>
              <Pressable style={styles.socialBtn} onPress={() => alert("Google (TODO)")}>
                <Ionicons name="logo-google" size={22} color="#DB4437" />
              </Pressable>
            </View>
          </View>

          <View style={{ height: 30 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const BRAND = "#6d5a52";

const styles = StyleSheet.create({
  bg: { flex: 1 },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.55)",
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 30,
  },

  backRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 6,
  },
  backText: {
    color: "#fff",
    fontWeight: "800",
    letterSpacing: 1,
    fontSize: 12,
  },

  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 26,
  },

  brand: {
    color: "#fff",
    fontSize: 40,
    fontWeight: "300",
    letterSpacing: 1,
    marginBottom: 14,
  },

  title: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: 1.5,
    marginBottom: 26,
    lineHeight: 26,
  },

  field: {
    width: "100%",
    maxWidth: 360,
    marginBottom: 18,
  },
  label: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 8,
    letterSpacing: 1,
  },
  input: {
    color: "#fff",
    fontSize: 16,
    paddingVertical: 8,
  },
  line: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.5)",
    marginTop: 6,
  },

  forgot: {
    color: "#fff",
    fontWeight: "800",
    letterSpacing: 1.4,
    fontSize: 12,
    marginTop: 6,
    marginBottom: 18,
  },

  signInBtn: {
    width: "100%",
    maxWidth: 360,
    height: 48,
    backgroundColor: BRAND,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  signInText: { color: "#fff", fontWeight: "900", letterSpacing: 2 },

  createBtn: {
    width: "100%",
    maxWidth: 360,
    height: 48,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.85)",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 14,
  },
  createText: { color: "#fff", fontWeight: "900", letterSpacing: 2 },

  or: {
    marginTop: 22,
    color: "#fff",
    fontWeight: "900",
    letterSpacing: 1.8,
    fontSize: 12,
  },

  socialRow: { flexDirection: "row", gap: 14, marginTop: 14 },
  socialBtn: {
    width: 52,
    height: 52,
    borderRadius: 6,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});