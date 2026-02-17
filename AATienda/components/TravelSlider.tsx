import React from "react";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Linking, Dimensions } from "react-native";

const { width } = Dimensions.get('window');

export default function TravelSlider() {
  const slides = [
    {
      id: 1,
      image: "https://cdn.shopify.com/s/files/1/0725/5418/5021/files/Property_1_slider_1safe.png?v=1728300715",
      title: "Travel\n to The Best Destinations",
      description: "Experience Adventure, Culture, and Tranquility in\n Enchanting Destinations",
      buttonText: "Explore the World",
      link: "https://aatienda.com/collections/travel-and-entertainment",
    },
    {
      id: 2,
      image: "https://cdn.shopify.com/s/files/1/0725/5418/5021/files/Property_1_slider2safo.png?v=1728300715",
      title: "Travel\n to The Best Destinations",
      description: "Evening Desert Safari with Dinner (Premium Camp)",
      buttonText: "Explore the World",
      link: "https://aatienda.com/collections/travel-and-entertainment",
    },
  ];

  return (
    <ScrollView 
      horizontal 
      pagingEnabled 
      showsHorizontalScrollIndicator={false} 
      style={styles.sliderContainer}
    >
      {slides.map((slide) => (
        <TouchableOpacity
          key={slide.id}
          activeOpacity={0.9}
          onPress={() => Linking.openURL(slide.link)}
        >
          <View style={styles.slide}>
            <Image source={{ uri: slide.image }} style={styles.image} />
            <View style={styles.overlay}>
              <Text style={styles.title}>{slide.title}</Text>
              <Text style={styles.description}>{slide.description}</Text>
              <View style={styles.button}>
                <Text style={styles.buttonText}>{slide.buttonText}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  sliderContainer: {
    width: '100%',
  },
  slide: {
    width: width,
    height: 300,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
