// MainAccountScreen.tsx (React Native / Expo)
// Noon-style account page (sidebar on tablet/desktop, bottom tabs on mobile)
// Sections: Orders, Returns, Payments, Profile, Addresses + Sign out
// NOTE: This is UI only. Wire your real data + auth (Shopify customer / your backend) where marked.

import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  useWindowDimensions,
  FlatList,
  Platform,
} from "react-native";
import HeaderUtilityBar from "@/components/HeaderUtilityBar";
import AppHeader from "@/components/AppHeader";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/footer";
type PaneKey = "orders" | "returns" | "payments" | "profile" | "addresses";

type Order = {
  id: string;
  name: string; // order number like "#1001"
  date: string; // "Feb 24, 2026"
  paymentStatus: string; // "Paid"
  fulfillmentStatus: string; // "Fulfilled"
  total: string; // "AED 320.00"
};

type Props = {
  // Replace with your real customer object
  customer?: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    defaultAddress?: string;
    addressesCount?: number;
  };

  // Replace with your real orders
  orders?: Order[];

  // Replace with your navigation / auth handlers
  onManageAddresses?: () => void;
  onOpenReturnsPage?: () => void;
  onOpenPaymentsInfo?: () => void;
  onStartShopping?: () => void;
  onSignOut?: () => void;
};

const defaultCustomer = {
  firstName: "User",
  lastName: "",
  email: "user@email.com",
  phone: "",
  defaultAddress: "",
  addressesCount: 0,
};

const demoOrders: Order[] = []; // leave empty to show "No orders yet"

export default function MainAccountScreen({
  customer = defaultCustomer,
  orders = demoOrders,
  onManageAddresses,
  onOpenReturnsPage,
  onOpenPaymentsInfo,
  onStartShopping,
  onSignOut,
}: Props) {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 990;
  const isMobile = width < 990;

  const [active, setActive] = useState<PaneKey>("orders");

  const initialLetter = (customer.firstName?.trim()?.[0] || "U").toUpperCase();
  const fullName = `${customer.firstName || ""} ${customer.lastName || ""}`.trim();

  const NAV_BLOCKS = useMemo(
    () => [
      {
        title: "My Orders",
        items: [
          { key: "orders" as const, label: "Orders", icon: "box" as const },
          { key: "returns" as const, label: "Returns", icon: "rotate" as const },
          { key: "payments" as const, label: "Payments", icon: "card" as const },
        ],
      },
      {
        title: "My Account",
        items: [
          { key: "profile" as const, label: "Profile", icon: "user" as const },
          { key: "addresses" as const, label: "Addresses", icon: "pin" as const },
        ],
      },
    ],
    []
  );

  const renderPane = () => {
    switch (active) {
      case "orders":
        return (
          <Card>
            <CardHead title="Orders" subtitle={`Last updated: ${formatToday()}`} />
            {orders?.length ? (
              <OrdersTable orders={orders} />
            ) : (
              <EmptyOrders onStartShopping={onStartShopping} />
            )}
          </Card>
        );

      case "returns":
        return (
          <Card>
            <CardHead title="Returns" subtitle="Easy return policy" />
            <TwoCol isDesktop={isDesktop}>
              <InfoBox title="How returns work">
                <Bullet text="Open the order details from Orders." />
                <Bullet text="Contact support to request return (or add return app later)." />
                <Bullet text="We’ll share pickup / drop-off instructions." />
              </InfoBox>

              <InfoBox title="Need help?">
                <Text style={styles.mutedText}>
                  If you want a real returns workflow like noon, we can connect an app or create a
                  custom form page.
                </Text>
                <BtnGhost label="Open returns page" onPress={onOpenReturnsPage} />
              </InfoBox>
            </TwoCol>
          </Card>
        );

      case "payments":
        return (
          <Card>
            <CardHead title="Payments" subtitle="Your payment info" />
            <TwoCol isDesktop={isDesktop}>
              <InfoBox title="Payment methods">
                <Text style={styles.mutedText}>
                  Shopify doesn’t expose saved cards to apps/themes for security. You can show
                  available methods at checkout or add a payments info page.
                </Text>
                <BtnGhost label="Payment info" onPress={onOpenPaymentsInfo} />
              </InfoBox>

              <InfoBox title="Invoices">
                <Text style={styles.mutedText}>
                  Want “Download invoice” per order? We can add a button inside order details.
                </Text>
                <BtnGhost label="Go to orders" onPress={() => setActive("orders")} />
              </InfoBox>
            </TwoCol>
          </Card>
        );

      case "profile":
        return (
          <Card>
            <CardHead title="Profile" subtitle="Your info" />
            <TwoCol isDesktop={isDesktop}>
              <InfoBox title="Account">
                <KeyValue k="Name" v={fullName || "—"} />
                <KeyValue k="Email" v={customer.email || "—"} />
                <KeyValue k="Phone" v={customer.phone || "Not added"} muted={!customer.phone} />
                <BtnGhost
                  label={`Manage addresses (${customer.addressesCount ?? 0})`}
                  onPress={onManageAddresses}
                />
              </InfoBox>

              <InfoBox title="Default address">
                <View style={styles.addressBox}>
                  <Text style={customer.defaultAddress ? styles.addressText : styles.mutedText}>
                    {customer.defaultAddress || "No address yet."}
                  </Text>
                </View>
                <Btn label="Add / edit addresses" onPress={onManageAddresses} />
              </InfoBox>
            </TwoCol>
          </Card>
        );

      case "addresses":
        return (
          <Card>
            <CardHead title="Addresses" subtitle="Manage your addresses" />
            <Text style={styles.mutedText}>
              Open your addresses screen here (Shopify / your backend). This screen is UI-ready.
            </Text>
            <View style={{ height: 10 }} />
            <Btn label="Manage addresses" onPress={onManageAddresses} />
          </Card>
        );
    }
  };

  return (
    <View style={styles.page}>
               
              <HeaderUtilityBar />
              <AppHeader />
      <View style={[styles.shell, isDesktop ? styles.shellDesktop : styles.shellMobile]}>
        {/* Sidebar on desktop */}
        {isDesktop && (
          <View style={styles.aside}>
            <View style={styles.profileCard}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{initialLetter}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.hello}>
                  Hello{customer.firstName ? `, ${customer.firstName}` : ""}!
                </Text>
                <Text style={styles.email}>{customer.email}</Text>
              </View>
            </View>

            <View style={styles.navCard}>
              {NAV_BLOCKS.map((block) => (
                <View key={block.title} style={styles.navBlock}>
                  <Text style={styles.navTitle}>{block.title}</Text>
                  {block.items.map((it) => (
                    <NavItem
                      key={it.key}
                      label={it.label}
                      icon={it.icon}
                      active={active === it.key}
                      onPress={() => setActive(it.key)}
                    />
                  ))}
                </View>
              ))}

              <View style={styles.navBlock}>
                <NavItem
                  label="Sign out"
                  icon="logout"
                  danger
                  active={false}
                  onPress={onSignOut}
                />
              </View>
            </View>
          </View>
        )}

        {/* Main */}
        <View style={styles.main}>
          <View style={styles.topbar}>
            <Text style={styles.title}>My Account</Text>

            <View style={styles.actions}>
              <BtnGhost
                label={`Manage addresses (${customer.addressesCount ?? 0})`}
                onPress={onManageAddresses}
              />
            </View>
          </View>

          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ paddingBottom: isMobile ? 86 : 20 }}
            showsVerticalScrollIndicator={false}
          >
            {renderPane()}
          </ScrollView>
        </View>
      </View>

      {/* Bottom tabs on mobile */}
      {isMobile && (
        <View style={styles.bottomTabs}>
          <TabBtn label="Orders" active={active === "orders"} onPress={() => setActive("orders")} />
          <TabBtn
            label="Returns"
            active={active === "returns"}
            onPress={() => setActive("returns")}
          />
          <TabBtn
            label="Payments"
            active={active === "payments"}
            onPress={() => setActive("payments")}
          />
          <TabBtn
            label="Profile"
            active={active === "profile"}
            onPress={() => setActive("profile")}
          />
          <TabBtn
            label="Sign out"
            active={false}
            danger
            onPress={onSignOut}
          />
        </View>
      )}
    </View>
  );
}

/* -------------------- UI Bits -------------------- */

function Card({ children }: { children: React.ReactNode }) {
  return <View style={styles.card}>{children}</View>;
}

function CardHead({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <View style={styles.cardHead}>
      <Text style={styles.h2}>{title}</Text>
      {subtitle ? <Text style={styles.mutedSmall}>{subtitle}</Text> : null}
    </View>
  );
}

function TwoCol({ isDesktop, children }: { isDesktop: boolean; children: React.ReactNode }) {
  return (
    <View style={[styles.grid2, !isDesktop && styles.grid2Mobile]}>
      {children}
    </View>
  );
}

function InfoBox({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.infoBox}>
      <Text style={styles.infoTitle}>{title}</Text>
      {children}
    </View>
  );
}

function Bullet({ text }: { text: string }) {
  return (
    <View style={styles.bulletRow}>
      <Text style={styles.bulletDot}>•</Text>
      <Text style={styles.bulletText}>{text}</Text>
    </View>
  );
}

function KeyValue({ k, v, muted }: { k: string; v: string; muted?: boolean }) {
  return (
    <View style={styles.kvRow}>
      <Text style={styles.kvK}>{k}</Text>
      <Text style={[styles.kvV, muted && styles.kvMuted]}>{v}</Text>
    </View>
  );
}

function Btn({ label, onPress }: { label: string; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.btn, pressed && styles.pressed]}>
      <Text style={styles.btnText}>{label}</Text>
    </Pressable>
  );
}

function BtnGhost({ label, onPress }: { label: string; onPress?: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.btnGhost, pressed && styles.pressed]}
    >
      <Text style={styles.btnGhostText}>{label}</Text>
    </Pressable>
  );
}

function NavItem({
  label,
  icon,
  active,
  danger,
  onPress,
}: {
  label: string;
  icon: "box" | "rotate" | "card" | "user" | "pin" | "logout";
  active: boolean;
  danger?: boolean;
  onPress?: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.navItem,
        active && styles.navItemActive,
        danger && styles.navItemDanger,
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.navIcon}>
        <Text style={[styles.navIconText, danger && { color: "#b42318" }]}>{iconSymbol(icon)}</Text>
      </View>
      <Text style={[styles.navLabel, danger && { color: "#b42318" }]}>{label}</Text>
    </Pressable>
  );
}

function TabBtn({
  label,
  active,
  danger,
  onPress,
}: {
  label: string;
  active: boolean;
  danger?: boolean;
  onPress?: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.tabBtn,
        active && styles.tabBtnActive,
        danger && styles.tabBtnDanger,
        pressed && styles.pressed,
      ]}
    >
      <Text style={[styles.tabText, active && styles.tabTextActive, danger && styles.tabTextDanger]}>
        {label}
      </Text>
    </Pressable>
  );
}

function OrdersTable({ orders }: { orders: Order[] }) {
  return (
    <View style={styles.tableWrap}>
      <View style={styles.tableHeader}>
        <Text style={[styles.th, { flex: 1.1 }]}>Order</Text>
        <Text style={[styles.th, { flex: 1 }]}>Date</Text>
        <Text style={[styles.th, { flex: 1 }]}>Payment</Text>
        <Text style={[styles.th, { flex: 1.1 }]}>Fulfillment</Text>
        <Text style={[styles.th, { flex: 0.9, textAlign: "right" }]}>Total</Text>
      </View>

      <FlatList
        data={orders}
        keyExtractor={(it) => it.id}
        renderItem={({ item }) => (
          <View style={styles.tr}>
            <Text style={[styles.tdLink, { flex: 1.1 }]}>{item.name}</Text>
            <Text style={[styles.td, { flex: 1 }]}>{item.date}</Text>
            <View style={{ flex: 1 }}>
              <Pill text={item.paymentStatus} />
            </View>
            <View style={{ flex: 1.1 }}>
              <Pill text={item.fulfillmentStatus} soft />
            </View>
            <Text style={[styles.tdStrong, { flex: 0.9, textAlign: "right" }]}>{item.total}</Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.line} />}
      />
    </View>
  );
}

function Pill({ text, soft }: { text: string; soft?: boolean }) {
  return (
    <View style={[styles.pill, soft && styles.pillSoft]}>
      <Text style={styles.pillText}>{text}</Text>
    </View>
  );
}

function EmptyOrders({ onStartShopping }: { onStartShopping?: () => void }) {
  return (
    <View style={styles.empty}>
      <View style={styles.emptyIcon}>
        <Text style={{ fontSize: 22, opacity: 0.35 }}>🧾</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.emptyTitle}>No orders yet</Text>
        <Text style={styles.emptySub}>When you place an order, it will appear here.</Text>
        <Btn label="Start shopping" onPress={onStartShopping} />
      </View>
    </View>
  );
}

/* -------------------- Helpers -------------------- */

function formatToday() {
  // quick, no libs
  const d = new Date();
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const mm = months[d.getMonth()];
  const dd = String(d.getDate()).padStart(2, "0");
  const yy = d.getFullYear();
  return `${mm} ${dd}, ${yy}`;
}

function iconSymbol(icon: string) {
  switch (icon) {
    case "box":
      return "📦";
    case "rotate":
      return "↩️";
    case "card":
      return "💳";
    case "user":
      return "👤";
    case "pin":
      return "📍";
    case "logout":
      return "🚪";
    default:
      return "•";
  }
}

/* -------------------- Styles -------------------- */

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: "#f6f7f9" },

  shell: {
    flex: 1,
    width: "100%",
    alignSelf: "center",
    maxWidth: 1200,
    gap: 18,
    paddingHorizontal: 14,
    paddingVertical: 18,
  },
  shellDesktop: { flexDirection: "row" },
  shellMobile: { flexDirection: "column" },

  aside: { width: 320 },
  main: { flex: 1, minWidth: 0 },

  profileCard: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 14,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 999,
    backgroundColor: "#FEEE00",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { color: "#111827", fontWeight: "900", fontSize: 18 },
  hello: { color: "#111827", fontWeight: "900", lineHeight: 18 },
  email: { color: "#6b7280", fontSize: 13, marginTop: 2 },

  navCard: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 14,
    padding: 10,
  },
  navBlock: { marginBottom: 10 },
  navTitle: {
    color: "#6b7280",
    fontSize: 12,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontWeight: "700",
  },
  navItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 12,
  },
  navItemActive: { backgroundColor: "#fff7b3", borderWidth: 1, borderColor: "#ffe680" },
  navItemDanger: {},
  navIcon: { width: 20, alignItems: "center" },
  navIconText: { fontSize: 14 },
  navLabel: { color: "#111827", fontWeight: "700" },

  topbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    marginHorizontal: 4,
    marginBottom: 14,
  },
  title: { fontSize: 26, fontWeight: "900", color: "#111827" },
  actions: { flexDirection: "row", flexWrap: "wrap", gap: 10 },

  card: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
    shadowColor: "#111827",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    ...Platform.select({ android: { elevation: 2 } }),
  },
  cardHead: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 12,
  },
  h2: { fontSize: 18, fontWeight: "900", color: "#111827" },
  mutedSmall: { color: "#6b7280", fontSize: 13 },

  btn: {
    backgroundColor: "#FEEE00",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    alignSelf: "flex-start",
  },
  btnText: { color: "#111827", fontWeight: "900" },
  btnGhost: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    alignSelf: "flex-start",
  },
  btnGhostText: { color: "#111827", fontWeight: "900" },
  pressed: { opacity: 0.85 },

  grid2: { flexDirection: "row", gap: 12 },
  grid2Mobile: { flexDirection: "column" },

  infoBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    padding: 12,
    backgroundColor: "#fff",
  },
  infoTitle: { fontWeight: "900", marginBottom: 8, color: "#111827" },

  mutedText: { color: "#6b7280", fontSize: 13, lineHeight: 18, marginBottom: 10 },

  bulletRow: { flexDirection: "row", alignItems: "flex-start", marginBottom: 8 },
  bulletDot: { color: "#6b7280", marginRight: 10, lineHeight: 18 },
  bulletText: { flex: 1, color: "#6b7280", fontSize: 13, lineHeight: 18 },

  kvRow: { flexDirection: "row", paddingVertical: 6 },
  kvK: { width: 110, color: "#6b7280", fontSize: 13 },
  kvV: { flex: 1, color: "#111827", fontWeight: "700", fontSize: 14 },
  kvMuted: { color: "#6b7280", fontWeight: "600" },

  addressBox: {
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#e5e7eb",
    borderRadius: 12,
    padding: 12,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  addressText: { color: "#111827", fontSize: 14, lineHeight: 20 },

  tableWrap: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    overflow: "hidden",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#fffbe6",
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  th: { color: "#111827", fontWeight: "900", fontSize: 13 },
  tr: { flexDirection: "row", paddingHorizontal: 12, paddingVertical: 12, alignItems: "center" },
  td: { color: "#111827", fontSize: 14 },
  tdLink: { color: "#111827", fontSize: 14, fontWeight: "900" },
  tdStrong: { color: "#111827", fontSize: 14, fontWeight: "900" },
  line: { height: 1, backgroundColor: "#e5e7eb" },

  pill: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "#fff7b3",
    borderWidth: 1,
    borderColor: "#ffe680",
  },
  pillSoft: { backgroundColor: "#f3f4f6", borderColor: "#e5e7eb" },
  pillText: { fontSize: 12, fontWeight: "900", color: "#111827" },

  empty: {
    flexDirection: "row",
    gap: 14,
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#e5e7eb",
    backgroundColor: "#fff",
  },
  emptyIcon: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: "#f3f4f6",
    alignItems: "center",
    justifyContent: "center",
  },
  emptyTitle: { fontSize: 16, fontWeight: "900", color: "#111827", marginBottom: 4 },
  emptySub: { color: "#6b7280", fontSize: 13, marginBottom: 10, lineHeight: 18 },

  bottomTabs: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    paddingHorizontal: 8,
    paddingVertical: 10,
    flexDirection: "row",
    gap: 8,
    justifyContent: "space-between",
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  tabBtnActive: { backgroundColor: "#fff7b3", borderColor: "#ffe680" },
  tabBtnDanger: { borderColor: "#ffd1d1", backgroundColor: "#fff" },
  tabText: { fontSize: 12, fontWeight: "900", color: "#111827" },
  tabTextActive: { color: "#111827" },
  tabTextDanger: { color: "#b42318" },
});