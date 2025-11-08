import{ create} from "zustand";

export const useToastStore = create((set) => ({
  message: "",
  type: "success", 
  visible: false,
  showToast: (message, type = "success", duration = 3000) => {
    set({ message, type, visible: true });
    setTimeout(() => set({ visible: false }), duration);
  },
}));
