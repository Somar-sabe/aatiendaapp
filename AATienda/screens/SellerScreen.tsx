import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import SellerLandingLikeImage from "@/components/seller";

export default function Seller() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>

        <SellerLandingLikeImage/>
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
