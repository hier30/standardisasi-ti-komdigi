"use client";

import { useParams } from "next/navigation";
import { StandardForm } from "@/components/admin-forms";
import { usePortal } from "@/components/providers/portal-provider";
import { Breadcrumb, EmptyState, PageHeader } from "@/components/portal-components";

export default function EditStandardPage() {
  const { id } = useParams<{ id: string }>();
  const { state } = usePortal();
  const standard = state.standards.find((item) => item.id === id);
  if (!standard) return <EmptyState title="Standar tidak ditemukan" />;
  return <><Breadcrumb items={[{ label: "Admin", href: "/admin" }, { label: "Kelola Standar", href: "/admin/standar" }, { label: standard.name }]} /><PageHeader title={`Edit ${standard.name}`} description={`Referensi ${standard.documentReference}`} /><StandardForm initial={standard} /></>;
}
