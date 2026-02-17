import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCart } from "../context/CartContext";

const BRAND_BROWN = "#54443D";
const BORDER = "#E6E6E6";

type Props = {
  open: boolean;
  onClose: () => void;
  onGoToCart: () => void; // View Bag
  onCheckout: () => void; // Checkout
};

function priceToNumber(price: string) {
  const n = Number(String(price).replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

export default function CartDrawer({ open, onClose, onGoToCart, onCheckout }: Props) {
  const { items, updateQuantity, removeFromCart } = useCart();

  return (
    <Modal
      visible={open}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        {/* stop closing when clicking inside drawer */}
        <Pressable style={styles.drawer} onPress={() => {}}>
          {/* Header */}
          <View style={styles.headerRow}>
            <Text style={styles.headerTitle}>Your cart</Text>
            <Pressable onPress={onClose} hitSlop={10} style={styles.closeBtn}>
              <Ionicons name="close" size={18} color="#111" />
            </Pressable>
          </View>

          {/* Table head */}
          <View style={styles.tableHead}>
            <Text style={styles.tableHeadText}>PRODUCT</Text>
            <Text style={styles.tableHeadText}>TOTAL</Text>
          </View>

          <View style={styles.hr} />

          {/* Items */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 170 }}
          >
            {items.length === 0 ? (
              <View style={{ padding: 18 }}>
                <Text style={{ color: "#666", fontWeight: "600" }}>
                  Your cart is empty.
                </Text>
              </View>
            ) : (
              items.map((it) => {
                const unit = priceToNumber(it.price || "0");
                const lineTotal = (unit * (it.quantity || 1)).toFixed(0);

                return (
                  <View key={`${it.id}-${it.option ?? ""}`} style={styles.itemRow}>
                    {/* image */}
                    <View style={styles.thumbBox}>
                      {!!it.image ? (
                        <Image source={{ uri: it.image }} style={styles.thumb} />
                      ) : (
                        <View style={[styles.thumb, { backgroundColor: "#f2f2f2" }]} />
                      )}
                    </View>

                    {/* middle */}
                    <View style={styles.mid}>
                      <Text style={styles.name} numberOfLines={3}>
                        {it.name}
                      </Text>

                      <Text style={styles.smallPrice}>{it.price} AED</Text>

                      {/* qty box */}
                      <View style={styles.qtyBox}>
                        <Pressable
                          style={styles.qtyBtn}
                          onPress={() => updateQuantity(it.id, Math.max(1, it.quantity - 1))}
                          hitSlop={8}
                        >
                          <Ionicons name="remove" size={18} color="#777" />
                        </Pressable>

                        <View style={styles.qtyMid}>
                          <Text style={styles.qtyText}>{it.quantity}</Text>
                        </View>

                        <Pressable
                          style={styles.qtyBtn}
                          onPress={() => updateQuantity(it.id, it.quantity + 1)}
                          hitSlop={8}
                        >
                          <Ionicons name="add" size={18} color="#777" />
                        </Pressable>
                      </View>
                    </View>

                    {/* right total + trash */}
                    <View style={styles.rightCol}>
                      <Text style={styles.totalText}>{lineTotal} AED</Text>

                      <Pressable
                        style={styles.trash}
                        onPress={() => removeFromCart(it.id)}
                        hitSlop={10}
                      >
                        <Ionicons name="trash-outline" size={18} color="#777" />
                      </Pressable>
                    </View>
                  </View>
                );
              })
            )}
          </ScrollView>

          {/* Sticky bottom */}
          <View style={styles.bottom}>
            <View style={styles.bottomDivider} />

            <Text style={styles.estTitle}>Estimated total</Text>
            <Text style={styles.estSub}>
              Tax included and shipping and discounts calculated at checkout
            </Text>

            <Pressable style={styles.checkoutBtn} onPress={onCheckout}>
              <Text style={styles.checkoutText}>Checkout</Text>
            </Pressable>

            <Pressable style={styles.viewBagBtn} onPress={onGoToCart}>
              <Text style={styles.viewBagText}>View Bag</Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
  },

  drawer: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: "78%",
    backgroundColor: "#fff",
  },

  headerRow: {
    paddingHorizontal: 14,
    paddingTop: 18,
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: { fontSize: 18, fontWeight: "700", color: "#111" },
  closeBtn: {
    width: 26,
    height: 26,
    borderWidth: 1,
    borderColor: "#111",
    alignItems: "center",
    justifyContent: "center",
  },

  tableHead: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tableHeadText: { fontSize: 12, fontWeight: "700", color: "#999", letterSpacing: 0.5 },
  hr: { height: 1, backgroundColor: BORDER },

  itemRow: {
    paddingHorizontal: 14,
    paddingVertical: 14,
    flexDirection: "row",
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
  },

  thumbBox: {
    width: 64,
    height: 64,
    borderWidth: 1,
    borderColor: BORDER,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  thumb: { width: 58, height: 58, resizeMode: "contain" },

  mid: { flex: 1 },
  name: { fontSize: 14, fontWeight: "600", color: "#111", lineHeight: 18 },
  smallPrice: { marginTop: 6, fontSize: 12, fontWeight: "600", color: "#999" },

  qtyBox: {
    marginTop: 10,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#BDBDBD",
    height: 38,
    width: 150,
    backgroundColor: "#fff",
  },
  qtyBtn: { width: 44, alignItems: "center", justifyContent: "center" },
  qtyMid: {
    flex: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "#BDBDBD",
    alignItems: "center",
    justifyContent: "center",
  },
  qtyText: { fontWeight: "800", color: "#111" },

  rightCol: { width: 70, alignItems: "flex-end", justifyContent: "space-between" },
  totalText: { fontSize: 12, fontWeight: "700", color: "#111" },
  trash: { paddingTop: 8 },

  bottom: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 14,
    paddingBottom: 16,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: BORDER,
  },

  bottomDivider: {
    height: 10,
    borderRadius: 6,
    backgroundColor: "#7A6E6A",
    marginTop: 10,
    marginBottom: 18,
  },

  estTitle: { fontSize: 14, fontWeight: "700", color: "#333" },
  estSub: { marginTop: 6, fontSize: 12, color: "#888", lineHeight: 16 },

  checkoutBtn: {
    marginTop: 14,
    height: 44,
    backgroundColor: BRAND_BROWN,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  checkoutText: { color: "#fff", fontWeight: "800" },

  viewBagBtn: {
    marginTop: 10,
    height: 44,
    backgroundColor: "#111",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  viewBagText: { color: "#fff", fontWeight: "800" },
});