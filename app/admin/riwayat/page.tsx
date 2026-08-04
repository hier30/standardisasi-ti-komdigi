"use client";

import { useMemo, useState } from "react";
import { usePortal } from "@/components/providers/portal-provider";
import { AuditLogTable, EmptyState, PageHeader } from "@/components/portal-components";
import { Input, Select } from "@/components/ui/input";

export default function AdminHistoryPage() {
  const { state } = usePortal(); const [action, setAction] = useState(""); const [entity, setEntity] = useState(""); const [admin, setAdmin] = useState(""); const [from, setFrom] = useState(""); const [to, setTo] = useState("");
  const logs = useMemo(() => state.auditLogs.filter((log) => (!action || log.action === action) && (!entity || log.entityType === entity) && (!admin || log.user.toLowerCase().includes(admin.toLowerCase())) && (!from || log.createdAt.slice(0, 10) >= from) && (!to || log.createdAt.slice(0, 10) <= to)), [action, admin, entity, from, state.auditLogs, to]);
  const actions = Array.from(new Set(state.auditLogs.map((log) => log.action))); const entities = Array.from(new Set(state.auditLogs.map((log) => log.entityType)));
  return <><PageHeader eyebrow="Audit Log" title="Riwayat Perubahan" description="Catatan create, update, publish, archive, restore, duplicate, dan delete untuk seluruh entitas." /><div className="mb-5 grid gap-3 rounded-xl border border-[#d8dadd] bg-white p-4 md:grid-cols-2 xl:grid-cols-5"><Input value={admin} onChange={(event) => setAdmin(event.target.value)} placeholder="Filter admin..." /><Select value={action} onChange={(event) => setAction(event.target.value)}><option value="">Semua aksi</option>{actions.map((item) => <option key={item}>{item}</option>)}</Select><Select value={entity} onChange={(event) => setEntity(event.target.value)}><option value="">Semua entitas</option>{entities.map((item) => <option key={item}>{item}</option>)}</Select><Input type="date" value={from} onChange={(event) => setFrom(event.target.value)} aria-label="Tanggal awal" /><Input type="date" value={to} onChange={(event) => setTo(event.target.value)} aria-label="Tanggal akhir" /></div>{logs.length ? <AuditLogTable logs={logs} /> : <EmptyState title="Riwayat tidak ditemukan" />}</>;
}
