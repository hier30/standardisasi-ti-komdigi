"use client";

import { DocumentForm } from "@/components/admin-forms";
import { usePortal } from "@/components/providers/portal-provider";
import { PageHeader } from "@/components/portal-components";

export default function AdminDocumentPage() {
  const { state } = usePortal();
  return <><PageHeader eyebrow="Referensi" title="Kelola Informasi Dokumen" description="Perbarui metadata utama yang ditampilkan pada halaman referensi." /><DocumentForm initial={state.document} /></>;
}
