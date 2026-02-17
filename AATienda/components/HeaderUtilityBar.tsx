import React from "react";
import { View, Text } from "react-native";

export default function HeaderUtilityBar() {
  return (
    <View style={{ paddingVertical: 8, backgroundColor: "#fff" }}>
      <Text style={{ textAlign: "center", color: "#666" }}>
        Free delivery on selected items
      </Text>
    </View>
  );
}