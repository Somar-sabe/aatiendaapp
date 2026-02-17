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

type Nav = NativeStackNavigationProp<RootStackParamList, "Register">;

const BG =
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1400&q=80";

export default function RegisterScreen() {
  const navigation = useNavigation<Nav>();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onCreate = async () => {
    // TODO: connect your register API
    if (!fullName.trim() || !email.trim() || !password.trim()) return;
    alert("Account created (demo).");
    navigation.replace("Login"); // or navigation.goBack()
  };

  return (
    <ImageBackground source={{ uri: BG }} style={styles.bg} resizeMode="cover">
      <View style={styles.overlay} />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <Pressable style={styles.backRow} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={18} color="#fff" />
            <Text style={styles.backText}>BACK</Text>
          </Pressable>

          <View style={styles.center}>
            <Text style={styles.brand}>AA Tienda</Text>
            <Text style={styles.title}>CREATE NEW{"\n"}ACCOUNT</Text>

            {/* Full name */}
            <View style={styles.field}>
              <Text style={styles.label}>Full Name</Text>
              <TextInput
                value={fullName}
                onChangeText={setFullName}
                autoCapitalize="words"
                style={styles.input}
              />
              <View style={styles.line} />
            </View>

            {/* Email */}
            <View style={styles.field}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
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
                secureTextEntry
                style={styles.input}
              />
              <View style={styles.line} />
            </View>

            <Pressable style={styles.createBtn} onPress={onCreate}>
              <Text style={styles.createText}>CREATE ACCOUNT</Text>
            </Pressable>

            <Pressable onPress={() => navigation.replace("Login")}>
              <Text style={styles.haveAccount}>Already have an account? SIGN IN</Text>
            </Pressable>
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

  createBtn: {
    width: "100%",
    maxWidth: 360,
    height: 48,
    backgroundColor: BRAND,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  createText: { color: "#fff", fontWeight: "900", letterSpacing: 2 },

  haveAccount: {
    marginTop: 18,
    color: "#fff",
    fontWeight: "800",
    letterSpacing: 1,
    fontSize: 12,
  },
});