import React from "react";
import FirstSection from "@/components/Firstmen";
import JustForYouSection from "@/components/secondmen";
import { View, StyleSheet, SafeAreaView } from "react-native";
import HeaderUtilityBar from "@/components/HeaderUtilityBar";
import AppHeader from "@/components/AppHeader";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/footer";
export default function WomenScreen() {
  return (
    <SafeAreaView style={styles.safe}>
               
              <HeaderUtilityBar />
              <AppHeader />
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
