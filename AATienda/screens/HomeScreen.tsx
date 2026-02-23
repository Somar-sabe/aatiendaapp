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
      "https://cdn.shopify.com/s/files/1/0725/5418/5021/files/0f7e4cecba751c3e65eec7552a6a0355.jpg?v=1718023264",
  },
  {
    id: "2",
    title: "Sleeveless Mini Crepe",
    price: "238",
    image:
      "https://cdn.shopify.com/s/files/1/0725/5418/5021/products/8032308160218_3.jpg?v=1687355907",
  },
  {
    id: "3",
    title: "Carmelean Abaya",
    price: "1,800",
    image:
      "https://cdn.shopify.com/s/files/1/0725/5418/5021/products/8685f44c01f5d32c13d9e59cea8e99ff.jpg?v=1709032650",
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

       
        <LuxurySection />
        <DoublePromoCards
  left={{
    id: "1",
    title: "Modular sofa",
    image: "https://cdn.shopify.com/s/files/1/0725/5418/5021/files/img_1.png?v=1726734147",
    onPress: () => navigation.navigate("Collection", { handle: "furniture", title: "Furniture" }),
  }}
  right={{
    id: "2",
    title: "Revolve perfume",
    image: "https://cdn.shopify.com/s/files/1/0725/5418/5021/files/img_2.png?v=1726734148",
    onPress: () => navigation.navigate("Collection", { handle: "perfume", title: "Perfume" }),
  }}
/>
        <TravelSlider />
        <Footer />
      </ScrollView>
    </View>
  );
}