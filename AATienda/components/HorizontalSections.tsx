import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Linking } from "react-native";

export default function HorizontalSections() {
  const sections = [
    {
      id: 1,
      title: "Modular sofa",
      image: "https://cdn.shopify.com/s/files/1/0725/5418/5021/files/img_1.png?v=1726734147",
      link: "https://aatienda.com/collections/sofas",
    },
    {
      id: 2,
      title: "Revolve perfume",
      image: "https://cdn.shopify.com/s/files/1/0725/5418/5021/files/img_2.png?v=1726734148",
      link: "https://aatienda.com/collections/perfume",
    },
  ];

  return (
    <ScrollView horizontal={true} style={styles.horizontalSections} showsHorizontalScrollIndicator={false}>
      {sections.map((section) => (
        <View key={section.id} style={styles.horizontalSection}>
          <Image source={{ uri: section.image }} style={styles.image} resizeMode="contain" />
          <Text style={styles.title}>{section.title}</Text>
          <TouchableOpacity onPress={() => Linking.openURL(section.link)}>
            <Text style={styles.link}>Shop now</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  horizontalSections: {
    paddingVertical: 20,
  },
  horizontalSection: {
    width: 200,
    marginRight: 15,
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  link: {
    fontSize: 14,
    color: '#007BFF',
  },
});
