import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ className, ...props }, ref) => (
  <input ref={ref} className={cn("h-11 w-full rounded-lg border border-[#c3c6d2] bg-white px-3 text-sm text-[#191c1e] outline-none placeholder:text-[#737782] focus:border-[#013f82] focus:ring-2 focus:ring-[#eaf3fb] disabled:bg-[#eceef1]", className)} {...props} />
));
Input.displayName = "Input";

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(({ className, ...props }, ref) => (
  <textarea ref={ref} className={cn("min-h-28 w-full rounded-lg border border-[#c3c6d2] bg-white p-3 text-sm text-[#191c1e] outline-none placeholder:text-[#737782] focus:border-[#013f82] focus:ring-2 focus:ring-[#eaf3fb]", className)} {...props} />
));
Textarea.displayName = "Textarea";

export function Select({ className, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className={cn("h-11 w-full rounded-lg border border-[#c3c6d2] bg-white px-3 text-sm text-[#191c1e] outline-none focus:border-[#013f82] focus:ring-2 focus:ring-[#eaf3fb]", className)} {...props} />;
}

export function Field({ label, error, children, className }: { label: string; error?: string; children: React.ReactNode; className?: string }) {
  return <label className={cn("grid gap-1.5 text-sm font-semibold text-[#191c1e]", className)}><span>{label}</span>{children}{error ? <span className="text-xs font-normal text-[#ba1a1a]">{error}</span> : null}</label>;
}
