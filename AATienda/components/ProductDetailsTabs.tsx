import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

type TabKey = "description" | "shipping" | "return" | "reviews";

const BRAND_BROWN = "#54443D";
const TAB_BG = "#F3F3F3";
const BORDER = "#E5E5E5";

export default function ProductDetailsTabs() {
  const [activeTab, setActiveTab] = useState<TabKey>("description");

  return (
    <View style={styles.wrap}>
      <View style={styles.tabsRow}>
        <Tab title="Description" active={activeTab === "description"} onPress={() => setActiveTab("description")} />
        <Tab title="Shipping" active={activeTab === "shipping"} onPress={() => setActiveTab("shipping")} />
        <Tab title="Return" active={activeTab === "return"} onPress={() => setActiveTab("return")} />
        <Tab title="Reviews" active={activeTab === "reviews"} onPress={() => setActiveTab("reviews")} />
      </View>

      <View style={styles.contentBox}>
        {activeTab === "description" && (
          <Text style={styles.contentText}>
            Unleash your sophisticated edge with a premium slim-fitting men’s shirt.
            Expert tailoring meets casual elegance in a crisp cotton blend, perfect for a polished look.
          </Text>
        )}

        {activeTab === "shipping" && (
          <Text style={styles.contentText}>
            Delivery within 2–4 business days inside UAE.{"\n"}
            International shipping available.{"\n"}
            Easy returns within 14 days.
          </Text>
        )}

        {activeTab === "return" && (
          <Text style={styles.contentText}>
            Returns accepted within 14 days in original condition. Refunds are processed after inspection.
          </Text>
        )}

        {activeTab === "reviews" && (
          <Text style={styles.contentText}>
            No reviews yet. Be the first to review this product.
          </Text>
        )}
      </View>
    </View>
  );
}

function Tab({
  title,
  active,
  onPress,
}: {
  title: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.tab, active ? styles.tabActive : styles.tabIdle]}
    >
      <Text style={[styles.tabText, active ? styles.tabTextActive : styles.tabTextIdle]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: { marginTop: 18 },
  tabsRow: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    flexWrap: "wrap",
  },
  tab: {
    paddingHorizontal: 16,
    height: 38,
    borderRadius: 2,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: BORDER,
  },
  tabActive: { backgroundColor: BRAND_BROWN, borderColor: BRAND_BROWN },
  tabIdle: { backgroundColor: TAB_BG },

  tabText: { fontSize: 13, fontWeight: "700" },
  tabTextActive: { color: "#fff" },
  tabTextIdle: { color: "#555" },

  contentBox: {
    marginTop: 12,
    paddingHorizontal: 6,
  },
  contentText: {
    color: "#777",
    fontSize: 13,
    lineHeight: 20,
    textAlign: "left",
  },
});