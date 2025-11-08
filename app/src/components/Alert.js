import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

let setGlobalAlertState = null;

// 📦 Global Alert Component
export const CustomConfirmAlertProvider = () => {
  const [alert, setAlert] = useState({
    visible: false,
    title: "",
    message: "",
    confirmText: "",
    cancelText: "",
    onConfirm: null,
  });

  setGlobalAlertState = setAlert;

  const handleClose = () => setAlert((prev) => ({ ...prev, visible: false }));

  if (!alert.visible) return null;

  return (
    <Modal transparent animationType="fade" visible={alert.visible}>
      <View style={styles.overlay}>
        <View style={styles.box}>
          <Text style={styles.title}>{alert.title}</Text>
          <Text style={styles.message}>{alert.message}</Text>

          <View style={styles.buttonsRow}>
            <TouchableOpacity style={[styles.button, styles.cancel]} onPress={handleClose}>
              <Text style={styles.cancelText}>{alert.cancelText || "Cancel"}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.confirm]}
              onPress={() => {
                handleClose();
                alert.onConfirm && alert.onConfirm();
              }}
            >
              <Text style={styles.confirmText}>{alert.confirmText || "OK"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

// ⚡ Simple function to trigger alert globally
export const CustomConfirmAlert = ({
  title,
  message,
  confirmText = "OK",
  cancelText = "Cancel",
  onConfirm,
}) => {
  if (setGlobalAlertState) {
    setGlobalAlertState({
      visible: true,
      title,
      message,
      confirmText,
      cancelText,
      onConfirm,
    });
  } else {
    console.warn("⚠️ CustomConfirmAlertProvider not mounted yet!");
  }
};

// 💅 Styles
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    width: width * 0.8,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 8,
    color: "#111827",
  },
  message: {
    fontSize: 16,
    color: "#4b5563",
    textAlign: "center",
    marginBottom: 20,
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: "center",
  },
  cancel: {
    backgroundColor: "#e5e7eb",
  },
  confirm: {
    backgroundColor: "#ef4444",
  },
  cancelText: {
    color: "#374151",
    fontWeight: "600",
  },
  confirmText: {
    color: "#fff",
    fontWeight: "600",
  },
});
