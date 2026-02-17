import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking } from "react-native";

export default function LuxurySection() {
  return (
    <View style={styles.cont}>
      <View style={styles.imageSection}>
        <Image
          source={{ uri: "https://cdn.shopify.com/s/files/1/0725/5418/5021/files/4112881_1.png?v=1726720610" }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <View style={styles.textSection}>
        <Text style={styles.title}>
          Where Luxury <Text style={styles.desktopBreak}>Meets Unmatched Quality</Text>
        </Text>
        <Text style={styles.subtitle}>
          Shop From the Best Luxuries Brands in the World
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => Linking.openURL('https://aatienda.com/collections/men-clothing')}
        >
          <Text style={styles.buttonText}>Shop now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cont: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageSection: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
  },
  textSection: {
    flex: 1,
    paddingLeft: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  desktopBreak: {
    // أي ستايل إضافي لو حاب
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
