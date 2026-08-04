"use client";

import { X } from "lucide-react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export function Dialog({ open, title, description, children, onClose }: { open: boolean; title: string; description?: string; children: React.ReactNode; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const handler = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, open]);
  if (!open) return null;
  return <div className="fixed inset-0 z-[80] grid place-items-center bg-[#001b3e]/45 p-4" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
    <div role="dialog" aria-modal="true" aria-labelledby="dialog-title" className="max-h-[90vh] w-full max-w-2xl overflow-auto rounded-xl border border-[#c3c6d2] bg-white shadow-[0_12px_24px_rgba(0,0,0,.14)]">
      <div className="sticky top-0 flex items-start justify-between gap-4 border-b border-[#e0e3e6] bg-white p-5">
        <div><h2 id="dialog-title" className="font-heading text-xl font-bold text-[#00295a]">{title}</h2>{description ? <p className="mt-1 text-sm text-[#434750]">{description}</p> : null}</div>
        <Button variant="ghost" size="icon" onClick={onClose} aria-label="Tutup dialog"><X className="size-5" /></Button>
      </div>
      <div className="p-5">{children}</div>
    </div>
  </div>;
}

export function ConfirmDialog({ open, title, description, confirmLabel = "Hapus", onConfirm, onClose }: { open: boolean; title: string; description: string; confirmLabel?: string; onConfirm: () => void; onClose: () => void }) {
  return <Dialog open={open} title={title} description={description} onClose={onClose}>
    <div className="flex justify-end gap-3"><Button variant="outline" onClick={onClose}>Batal</Button><Button variant="danger" onClick={onConfirm}>{confirmLabel}</Button></div>
  </Dialog>;
}
