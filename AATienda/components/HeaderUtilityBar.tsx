import React from "react";
import { View, Text } from "react-native";

export default function HeaderUtilityBar() {
  return (
    <View style={{ paddingVertical: 8, backgroundColor: "#000" }}>
      <Text style={{ textAlign: "center", color: "#fff" }}>
        Hurry up! Limited time offer .. Additional 5% off on every perfume Using code: SAVE5
      </Text>
    </View>
  );
}