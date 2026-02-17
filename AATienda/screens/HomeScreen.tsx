import React from "react";
import { ScrollView, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/StackNavigator";

import WhatsNewToday from "@/components/WhatsNewToday";
import Footer from "@/components/footer";
import AnnouncementBar from "../components/AnnouncementBar";
import HeaderUtilityBar from "../components/HeaderUtilityBar";
import AppHeader from "../components/AppHeader";
import SliderGallery from "../components/SliderGallery";
import CategoryGrid from "../components/CategoryGrid";
import TravelSlider from "@/components/TravelSlider";
import LuxurySection from "@/components/LuxurySection";
import WeeklySellerSection from "@/components/WeeklySellerSection";
import DoublePromoCards from "@/components/DoublePromoCards";

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Home">;
};

const WHATS_NEW = [
  {
    id: "1",
    title: "Ava oversized linen kaftan",
    price: "1,322",
    image:
      "https://images.unsplash.com/photo-1520975958225-2b36b0f1a1f9?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "2",
    title: "Sleeveless Mini Crepe",
    price: "238",
    image:
      "https://images.unsplash.com/photo-1520975682071-a7a6d7b1d3a5?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "3",
    title: "Carmelean Abaya",
    price: "1,800",
    image:
      "https://images.unsplash.com/photo-1520975752241-7a75f1d8a7c1?auto=format&fit=crop&w=900&q=80",
  },
];

export default function HomeScreen({ navigation }: Props) {
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <AnnouncementBar />
      <HeaderUtilityBar />
      <AppHeader />

      <ScrollView showsVerticalScrollIndicator={false}>
        <SliderGallery navigation={navigation} />
        <CategoryGrid />

        <WhatsNewToday
          data={WHATS_NEW}
          onPressShopNow={() =>
            navigation.navigate("Collection", { handle: "new", title: "Whats New" })
          }
          onPressItem={(p) =>
            navigation.navigate("Product", {
              product: { id: p.id, name: p.title, price: p.price, img: p.image },
            })
          }
        />

        <WeeklySellerSection />
        <LuxurySection />
        <DoublePromoCards
  left={{
    id: "1",
    title: "Modular sofa",
    image: "https://YOUR_IMAGE_1",
    onPress: () => navigation.navigate("Collection", { handle: "furniture", title: "Furniture" }),
  }}
  right={{
    id: "2",
    title: "Revolve perfume",
    image: "https://YOUR_IMAGE_2",
    onPress: () => navigation.navigate("Collection", { handle: "perfume", title: "Perfume" }),
  }}
/>
        <TravelSlider />
        <Footer />
      </ScrollView>
    </View>
  );
}