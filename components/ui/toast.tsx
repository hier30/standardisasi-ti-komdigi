"use client";

import { CheckCircle2, XCircle } from "lucide-react";
import { createContext, useCallback, useContext, useMemo, useState } from "react";

type ToastItem = { id: number; message: string; type: "success" | "error" };
const ToastContext = createContext<{ toast: (message: string, type?: ToastItem["type"]) => void } | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);
  const toast = useCallback((message: string, type: ToastItem["type"] = "success") => {
    const id = Date.now();
    setItems((current) => [...current, { id, message, type }]);
    window.setTimeout(() => setItems((current) => current.filter((item) => item.id !== id)), 3200);
  }, []);
  const value = useMemo(() => ({ toast }), [toast]);
  return <ToastContext.Provider value={value}>{children}<div className="fixed bottom-5 right-5 z-[100] grid w-[min(360px,calc(100vw-2rem))] gap-2" aria-live="polite">{items.map((item) => {
    const Icon = item.type === "success" ? CheckCircle2 : XCircle;
    return <div key={item.id} className={`flex items-center gap-3 rounded-lg border bg-white p-4 text-sm font-medium shadow-lg ${item.type === "success" ? "border-[#b8e4c7] text-[#126b36]" : "border-[#ffb4ab] text-[#93000a]"}`}><Icon className="size-5 shrink-0" />{item.message}</div>;
  })}</div></ToastContext.Provider>;
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast harus digunakan di dalam ToastProvider");
  return context;
}
