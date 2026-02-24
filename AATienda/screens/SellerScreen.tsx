import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import SellerLandingLikeImage from "@/components/seller";
import HeaderUtilityBar from "@/components/HeaderUtilityBar";
import AppHeader from "@/components/AppHeader";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/footer";
export default function Seller() {
  return (
    <SafeAreaView style={styles.safe}>
            <AnnouncementBar />
            <HeaderUtilityBar />
            <AppHeader />
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
