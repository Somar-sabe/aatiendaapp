import React, { useMemo, useState } from "react";
import { View, Text, Pressable, StyleSheet, ActivityIndicator } from "react-native";

type TabKey = "description" | "shipping" | "return" | "reviews";

const BRAND_BROWN = "#54443D";
const TAB_BG = "#F3F3F3";
const BORDER = "#E5E5E5";
const TEXT = "#777";

function stripHtml(html: string) {
  if (!html) return "";
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}

export default function ProductDetailsTabs({
  descriptionHtml,
  loadingDescription,
}: {
  descriptionHtml?: string;
  loadingDescription?: boolean;
}) {
  const [activeTab, setActiveTab] = useState<TabKey>("description");

  const descriptionText = useMemo(() => {
    const t = stripHtml(descriptionHtml || "");
    return t || "No description available for this product.";
  }, [descriptionHtml]);

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
          loadingDescription ? (
            <View style={{ paddingVertical: 18 }}>
              <ActivityIndicator />
            </View>
          ) : (
            <Text style={styles.contentText}>{descriptionText}</Text>
          )
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

        {activeTab === "reviews" && <ReviewsLikeImage />}
      </View>
    </View>
  );
}

function ReviewsLikeImage() {
  const rows = [
    { stars: 5, pct: 0 },
    { stars: 4, pct: 0 },
    { stars: 3, pct: 0 },
    { stars: 2, pct: 0 },
    { stars: 1, pct: 0 },
  ];

  return (
    <View style={styles.reviewBox}>
      <Text style={styles.reviewTitle}>Rating</Text>

      {rows.map((r) => (
        <View key={r.stars} style={styles.reviewRow}>
          <Text style={styles.star}>★</Text>
          <Text style={styles.starNum}>{r.stars}</Text>

          <View style={styles.barTrack}>
            <View style={[styles.barFill, { width: `${r.pct}%` }]} />
          </View>

          <Text style={styles.count}>0</Text>
        </View>
      ))}

      <Pressable style={styles.writeReview}>
        <Text style={styles.writeText}>Write review</Text>
        <Text style={styles.plus}>＋</Text>
      </Pressable>
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
    <Pressable onPress={onPress} style={[styles.tab, active ? styles.tabActive : styles.tabIdle]}>
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
    color: TEXT,
    fontSize: 13,
    lineHeight: 20,
    textAlign: "left",
  },

  // ✅ Reviews like screenshot
  reviewBox: {
    backgroundColor: "#fff",
    borderRadius: 6,
    padding: 14,
    borderWidth: 1,
    borderColor: BORDER,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  reviewTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#444",
    marginBottom: 10,
  },
  reviewRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginVertical: 6,
  },
  star: { color: "#B3B3B3", fontSize: 14 },
  starNum: { width: 14, color: "#777", fontWeight: "700" },

  barTrack: {
    flex: 1,
    height: 10,
    backgroundColor: "#E7E7E7",
    borderRadius: 8,
    overflow: "hidden",
  },
  barFill: { height: "100%", backgroundColor: "#BFBFBF" },

  count: { width: 16, textAlign: "right", color: "#777", fontWeight: "700" },

  writeReview: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: BORDER,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  writeText: { color: "#555", fontWeight: "700" },
  plus: { color: "#555", fontWeight: "900", fontSize: 18, marginTop: -2 },
});
