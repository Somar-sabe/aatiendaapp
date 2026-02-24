import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";

 
import AppHeader from "./AppHeader";
import HeaderUtilityBar from "./HeaderUtilityBar";
import Footer from "./footer";

export default function ScreenLayout({
  children,
  scroll = true,
  showFooter = true, // ✅ NEW
}: {
  children: React.ReactNode;
  scroll?: boolean;
  showFooter?: boolean; // ✅ NEW
}) {
  return (
    <View style={styles.container}>
         <HeaderUtilityBar />
       
      <AppHeader />
   

      {scroll ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {children}
          {showFooter ? <Footer /> : null} {/* ✅ */}
        </ScrollView>
      ) : (
        <View style={styles.body}>
          {children}
          {showFooter ? <Footer /> : null} {/* ✅ */}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  scrollContent: { paddingBottom: 16 },
  body: { flex: 1 },
});