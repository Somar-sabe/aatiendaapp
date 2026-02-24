import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Pressable,
  Image,
  useWindowDimensions,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/StackNavigator";

type Nav = NativeStackNavigationProp<RootStackParamList>;

type Money = { amount: string; currencyCode: string };

type RelatedProduct = {
  id: string;
  title: string;
  handle: string;
  vendor?: string;
  image?: { url: string; altText?: string | null };
  price?: Money;
  compareAtPrice?: Money | null;
};

type Props = {
  productIdGid: string; // Shopify GID: "gid://shopify/Product/123..."
  heading?: string; // default: "You may also like"
  paddingTop?: number; // like Shopify section padding
  paddingBottom?: number;
  showVendor?: boolean;
  limitMobile?: number; // default 2
  limitDesktop?: number; // default 4
};

const SHOPIFY_DOMAIN = "YOUR_SHOP.myshopify.com"; // ✅ change
const STOREFRONT_TOKEN = "YOUR_STOREFRONT_TOKEN"; // ✅ change
const API_VERSION = "2025-01"; // can be any supported version

async function shopifyRequest<T>(query: string, variables: Record<string, any>) {
  const res = await fetch(`https://${SHOPIFY_DOMAIN}/api/${API_VERSION}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  const json = await res.json();
  if (!res.ok || json.errors) {
    throw new Error(json.errors?.[0]?.message || `Shopify error: ${res.status}`);
  }
  return json.data as T;
}

const RECOMMENDATIONS_QUERY = `
query RelatedProducts($productId: ID!, $limit: Int!) {
  productRecommendations(productId: $productId) {
    id
    title
    handle
    vendor
    featuredImage { url altText }
    priceRange { minVariantPrice { amount currencyCode } }
    compareAtPriceRange { minVariantPrice { amount currencyCode } }
  }
}
`;

function formatMoney(m?: Money) {
  if (!m) return "";
  const amount = Number(m.amount || 0);
  // keep simple like Shopify cards
  return `${amount.toFixed(2)} ${m.currencyCode}`;
}

export default function RelatedProductsSection({
  productIdGid,
  heading = "You may also like",
  paddingTop = 18,
  paddingBottom = 18,
  showVendor = false,
  limitMobile = 2,
  limitDesktop = 4,
}: Props) {
  const nav = useNavigation<Nav>();
  const { width } = useWindowDimensions();

  // mimic Shopify: >= 750px => desktop/tablet behavior
  const isDesktop = width >= 750;
  const columns = isDesktop ? 4 : 2;
  const limit = isDesktop ? limitDesktop : limitMobile;

  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<RelatedProduct[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await shopifyRequest<{
          productRecommendations: Array<{
            id: string;
            title: string;
            handle: string;
            vendor: string;
            featuredImage?: { url: string; altText?: string | null } | null;
            priceRange: { minVariantPrice: Money };
            compareAtPriceRange?: { minVariantPrice?: Money | null } | null;
          }>;
        }>(RECOMMENDATIONS_QUERY, { productId: productIdGid, limit });

        const mapped: RelatedProduct[] = (data.productRecommendations || []).map((p) => ({
          id: p.id,
          title: p.title,
          handle: p.handle,
          vendor: p.vendor,
          image: p.featuredImage ? { url: p.featuredImage.url, altText: p.featuredImage.altText } : undefined,
          price: p.priceRange?.minVariantPrice,
          compareAtPrice: p.compareAtPriceRange?.minVariantPrice || null,
        }));

        // ✅ Shopify-like: show up to 2 on mobile, up to 4 on desktop
        const sliced = mapped.slice(0, limit);

        if (mounted) setItems(sliced);
      } catch (e: any) {
        if (mounted) setError(e?.message || "Failed to load recommendations");
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [productIdGid, limit]);

  const data = useMemo(() => items, [items]);

  if (loading) {
    return (
      <View style={[styles.section, { paddingTop, paddingBottom }]}>
        <Text style={styles.heading}>{heading}</Text>
        <View style={styles.loadingRow}>
          <ActivityIndicator />
        </View>
      </View>
    );
  }

  if (error || data.length === 0) {
    // Shopify hides section if none
    return null;
  }

  const renderItem = ({ item }: { item: RelatedProduct }) => {
    const priceText = formatMoney(item.price);
    const compareText = item.compareAtPrice ? formatMoney(item.compareAtPrice) : "";
    const onSale =
      item.compareAtPrice && Number(item.compareAtPrice.amount) > Number(item.price?.amount || 0);

    return (
      <Pressable
  style={({ pressed }) => [styles.card, pressed && { opacity: 0.85 }]}
  onPress={() => {
    nav.navigate("Product", {
      product: {
        id: item.id,
        name: item.title,
        price: formatMoney(item.price),
        img: item.image?.url || "",
        handle: item.handle,
      },
    });
  }}
>
        <View style={styles.mediaWrap}>
          {item.image?.url ? (
            <Image source={{ uri: item.image.url }} style={styles.image} resizeMode="cover" />
          ) : (
            <View style={[styles.image, styles.imagePlaceholder]} />
          )}

          {onSale ? (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>SALE</Text>
            </View>
          ) : null}
        </View>

        <View style={styles.info}>
          {showVendor && item.vendor ? <Text style={styles.vendor}>{item.vendor}</Text> : null}
          <Text numberOfLines={2} style={styles.title}>
            {item.title}
          </Text>

          <View style={styles.priceRow}>
            <Text style={styles.price}>{priceText}</Text>
            {onSale ? <Text style={styles.compareAt}>{compareText}</Text> : null}
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={[styles.section, { paddingTop, paddingBottom }]}>
      <Text style={styles.heading}>{heading}</Text>

      <FlatList
        data={data}
        key={columns} // ✅ force re-layout when columns change
        numColumns={columns}
        keyExtractor={(it) => it.id}
        renderItem={renderItem}
        scrollEnabled={false} // ✅ like Shopify section (inside product page scroll)
        columnWrapperStyle={columns > 1 ? styles.row : undefined}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 16,
  },
  heading: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
    color: "#111",
  },
  loadingRow: {
    paddingVertical: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  listContent: {
    paddingBottom: 4,
  },
  row: {
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 12,
  },

  card: {
    flex: 1,
    borderRadius: 14,
    overflow: "hidden",
    backgroundColor: "rgba(0,0,0,0.03)",
    // if you want visible border like Shopify:
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(0,0,0,0.12)",
  },

  mediaWrap: {
    width: "100%",
    aspectRatio: 1, // ✅ square like common Shopify cards
    backgroundColor: "rgba(0,0,0,0.04)",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imagePlaceholder: {
    backgroundColor: "rgba(0,0,0,0.06)",
  },

  badge: {
    position: "absolute",
    left: 10,
    top: 10,
    backgroundColor: "#111",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
  },
  badgeText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
  },

  info: {
    padding: 10,
    gap: 6,
  },
  vendor: {
    fontSize: 12,
    color: "rgba(0,0,0,0.55)",
  },
  title: {
    fontSize: 13,
    fontWeight: "600",
    color: "#111",
    lineHeight: 18,
    minHeight: 36, // keeps cards aligned
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  price: {
    fontSize: 13,
    fontWeight: "700",
    color: "#111",
  },
  compareAt: {
    fontSize: 12,
    color: "rgba(0,0,0,0.55)",
    textDecorationLine: "line-through",
  },
});