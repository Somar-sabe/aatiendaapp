import React from "react";
import FirstSection from "@/components/Firstmen";
import JustForYouSection from "@/components/secondmen";
import { View, StyleSheet, SafeAreaView } from "react-native";

export default function MenScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <FirstSection />
        <JustForYouSection />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
  },
});
