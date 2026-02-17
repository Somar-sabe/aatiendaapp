import React from "react";
import { View, Text } from "react-native";

export default function AnnouncementBar() {
  return (
    <View style={{ paddingVertical: 8, backgroundColor: "#f1f1f1" }}>
      <Text style={{ textAlign: "center", fontWeight: "600" }}>
        Welcome to Aatienda
      </Text>
    </View>
  );
}