import React, { useEffect, useRef, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Pressable,
  Keyboard,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  open: boolean;
  onClose: () => void;
  value: string;
  onChange: (v: string) => void;
  onSubmit?: () => void;
};

export default function SearchOverlay({
  open,
  onClose,
  value,
  onChange,
  onSubmit,
}: Props) {
  const inputRef = useRef<TextInput>(null);
  const fade = useRef(new Animated.Value(0)).current;
  const [mounted, setMounted] = useState(open);

  useEffect(() => {
    if (open) {
      setMounted(true);
      Animated.timing(fade, {
        toValue: 1,
        duration: 160,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => inputRef.current?.focus(), 50);
      });
    } else {
      Animated.timing(fade, {
        toValue: 0,
        duration: 140,
        useNativeDriver: true,
      }).start(() => setMounted(false));
    }
  }, [open, fade]);

  if (!mounted) return null;

  return (
    <Animated.View style={[styles.overlay, { opacity: fade }]}>
      {/* click outside = close */}
      <Pressable style={styles.backdrop} onPress={() => { Keyboard.dismiss(); onClose(); }} />

      {/* top bar */}
      <View style={styles.topBar}>
        <TextInput
          ref={inputRef}
          placeholder="Search"
          placeholderTextColor="#666"
          value={value}
          onChangeText={onChange}
          returnKeyType="search"
          onSubmitEditing={() => {
            Keyboard.dismiss();
            onSubmit?.();
          }}
          style={styles.input}
        />

        <Pressable
          style={styles.iconBtn}
          onPress={() => {
            Keyboard.dismiss();
            onSubmit?.();
          }}
          hitSlop={10}
        >
          <Ionicons name="search" size={20} color="#111" />
        </Pressable>

        <Pressable
          style={styles.iconBtn}
          onPress={() => {
            Keyboard.dismiss();
            onClose();
          }}
          hitSlop={10}
        >
          <Ionicons name="close" size={22} color="#111" />
        </Pressable>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 99999,
    elevation: 99999,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.45)", // dim like screenshot
  },

  topBar: {
    marginTop: 0,
    backgroundColor: "#fff",
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.15)",
  },

  input: {
    flex: 1,
    height: 44,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.25)",
    paddingHorizontal: 12,
    borderRadius: 2,
    color: "#111",
    backgroundColor: "#fff",
  },

  iconBtn: {
    width: 40,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
});
