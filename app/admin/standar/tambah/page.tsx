import { StandardForm } from "@/components/admin-forms";
import { Breadcrumb, PageHeader } from "@/components/portal-components";

export default function AddStandardPage() {
  return <><Breadcrumb items={[{ label: "Admin", href: "/admin" }, { label: "Kelola Standar", href: "/admin/standar" }, { label: "Tambah" }]} /><PageHeader title="Tambah Standardisasi TI Komdigi" description="Masukkan metadata, ketentuan, dan seluruh detail teknis standar." /><StandardForm /></>;
}
