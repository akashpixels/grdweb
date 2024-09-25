// src/toastUtils.ts
import toast, { ToastOptions } from "react-hot-toast";

type ToastType = "success" | "error" | "default";

export const showToast = (type: ToastType, message: string, options: ToastOptions = {}): void => {
  const toastOptions: ToastOptions = {
    duration: 4000,
    position: "top-center",
    ...options,
  };

  switch (type) {
    case "success":
      toast.success(message, toastOptions);
      break;
    case "error":
      toast.error(message, toastOptions);
      break;
    default:
      toast(message, toastOptions);
      break;
  }
};
