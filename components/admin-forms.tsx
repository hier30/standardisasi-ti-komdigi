"use client";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { Plus, Save, Trash2 } from "lucide-react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { usePortal } from "@/components/providers/portal-provider";
import { Button } from "@/components/ui/button";
import { Field, Input, Select, Textarea } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast";
import type { Category, CompetencyRole, ObsoleteCriterion, PortalDocument, Standard, Subcategory } from "@/lib/types";
import { newId, slugify } from "@/lib/utils";

const detailSchema = z.object({ id: z.string(), label: z.string().min(1, "Label wajib diisi"), minimumValue: z.string().min(1, "Nilai wajib diisi"), recommendedValue: z.string().optional(), unit: z.string().optional(), notes: z.string().optional(), sortOrder: z.number() });
const standardSchema = z.object({
  id: z.string(), sourceNumber: z.string().min(1, "Nomor sumber wajib diisi"), name: z.string().min(3, "Nama minimal 3 karakter"), slug: z.string().min(3, "Slug wajib diisi"), categoryId: z.string().min(1, "Kategori wajib dipilih"), subcategoryId: z.string().optional(), description: z.string().min(10, "Deskripsi minimal 10 karakter"), purpose: z.string().optional(), scope: z.string().optional(), technicalProvisions: z.string().optional(), implementationNotes: z.string().optional(), version: z.string().min(1), effectiveDate: z.string().min(1), reviewDate: z.string().min(1), documentReference: z.string().min(1), details: z.array(detailSchema).min(1, "Minimal satu detail teknis"),
});
type StandardValues = z.infer<typeof standardSchema>;
const getErrorMessage = (error: unknown) => error instanceof Error ? error.message : "Terjadi kesalahan saat menyimpan standar.";
const uniqueCustomSourceNumber = (standards: Standard[]) => {
  const used = new Set(standards.map((standard) => standard.sourceNumber));
  let sourceNumber = `custom-${Date.now().toString(36)}`;
  let index = 1;
  while (used.has(sourceNumber)) {
    sourceNumber = `custom-${Date.now().toString(36)}-${index}`;
    index += 1;
  }
  return sourceNumber;
};

export function StandardForm({ initial }: { initial?: Standard }) {
  const { state, saveStandard } = usePortal();
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<StandardValues>({ resolver: zodResolver(standardSchema), defaultValues: initial ? { ...initial } : { id: newId("std"), sourceNumber: uniqueCustomSourceNumber(state.standards), name: "", slug: "", categoryId: "", subcategoryId: "", description: "", purpose: "Menjadi acuan teknis yang seragam, aman, efisien, dan konsisten di lingkungan KOMDIGI.", scope: "", technicalProvisions: "", implementationNotes: "", version: "2025.1", effectiveDate: new Date().toISOString().slice(0, 10), reviewDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().slice(0, 10), documentReference: state.document.standardizationNumber, details: [{ id: newId("detail"), label: "", minimumValue: "", recommendedValue: "", unit: "", notes: "", sortOrder: 1 }] } });
  const fields = useFieldArray({ control: form.control, name: "details" });
  const selectedCategory = useWatch({ control: form.control, name: "categoryId" });
  const name = useWatch({ control: form.control, name: "name" });
  useEffect(() => { if (!initial && name) form.setValue("slug", slugify(name), { shouldDirty: true }); }, [form, initial, name]);
  useEffect(() => { const handler = (event: BeforeUnloadEvent) => { if (form.formState.isDirty) event.preventDefault(); }; window.addEventListener("beforeunload", handler); return () => window.removeEventListener("beforeunload", handler); }, [form.formState.isDirty]);
  const submit = (intent: "draft" | "publish") => form.handleSubmit(async (values) => {
    try {
      const now = new Date().toISOString();
      const sourceNumber = initial ? values.sourceNumber : uniqueCustomSourceNumber(state.standards);
      await saveStandard({ ...values, sourceNumber, documentId: state.document.id, status: intent === "publish" ? "berlaku" : "draft", isPublished: intent === "publish", sortOrder: initial?.sortOrder || state.standards.length + 1, updatedAt: now, details: values.details.map((detail, index) => ({ ...detail, sortOrder: index + 1 })) }, intent === "publish" ? "publish" : initial ? "update" : "create");
      toast(intent === "publish" ? "Standar berhasil dipublikasikan." : "Draft standar berhasil disimpan.");
      form.reset(values);
      router.push("/admin/standar");
    } catch (error) {
      console.error(error);
      toast(getErrorMessage(error), "error");
    }
  });
  return <form onSubmit={submit("draft")} className="grid gap-6"><section className="grid gap-4 rounded-xl border border-[#d8dadd] bg-white p-5 md:grid-cols-2">
    <Field label="Versi" error={form.formState.errors.version?.message}><Input {...form.register("version")} /></Field>
    <Field label="Nama Standar" error={form.formState.errors.name?.message} className="md:col-span-2"><Input {...form.register("name")} /></Field><Field label="Slug" error={form.formState.errors.slug?.message} className="md:col-span-2"><Input {...form.register("slug")} /></Field>
    <Field label="Kategori" error={form.formState.errors.categoryId?.message}><Select {...form.register("categoryId")}><option value="">Pilih kategori</option>{state.categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</Select></Field><Field label="Subkategori"><Select {...form.register("subcategoryId")}><option value="">Tanpa subkategori</option>{state.subcategories.filter((sub) => !selectedCategory || sub.categoryId === selectedCategory).map((sub) => <option key={sub.id} value={sub.id}>{sub.name}</option>)}</Select></Field>
    <Field label="Tanggal Berlaku"><Input type="date" {...form.register("effectiveDate")} /></Field><Field label="Tanggal Tinjau"><Input type="date" {...form.register("reviewDate")} /></Field>
    <Field label="Deskripsi" error={form.formState.errors.description?.message} className="md:col-span-2"><Textarea {...form.register("description")} /></Field><Field label="Tujuan"><Textarea {...form.register("purpose")} /></Field><Field label="Ruang Lingkup"><Textarea {...form.register("scope")} /></Field><Field label="Ketentuan Teknis"><Textarea {...form.register("technicalProvisions")} /></Field><Field label="Catatan Implementasi"><Textarea {...form.register("implementationNotes")} /></Field><Field label="Referensi Dokumen" className="md:col-span-2"><Input {...form.register("documentReference")} /></Field>
  </section><section className="rounded-xl border border-[#d8dadd] bg-white p-5"><div className="flex items-center justify-between gap-3"><div><h2 className="font-heading text-xl font-semibold text-[#00295a]">Detail Teknis</h2><p className="mt-1 text-sm text-[#434750]">Tambahkan seluruh atribut dan nilai dari tabel sumber.</p></div><Button type="button" variant="outline" onClick={() => fields.append({ id: newId("detail"), label: "", minimumValue: "", recommendedValue: "", unit: "", notes: "", sortOrder: fields.fields.length + 1 })}><Plus className="size-4" />Tambah detail</Button></div><div className="mt-5 grid gap-4">{fields.fields.map((field, index) => <div key={field.id} className="grid gap-3 rounded-lg border border-[#d8dadd] bg-[#f7f9fc] p-4 md:grid-cols-2"><Field label={`Label ${index + 1}`} error={form.formState.errors.details?.[index]?.label?.message}><Input {...form.register(`details.${index}.label`)} /></Field><Field label="Satuan"><Input {...form.register(`details.${index}.unit`)} /></Field><Field label="Nilai/Ketentuan" error={form.formState.errors.details?.[index]?.minimumValue?.message}><Textarea {...form.register(`details.${index}.minimumValue`)} /></Field><Field label="Rekomendasi (jika ada)"><Textarea {...form.register(`details.${index}.recommendedValue`)} /></Field><Field label="Catatan" className="md:col-span-2"><Input {...form.register(`details.${index}.notes`)} /></Field><div className="md:col-span-2 flex justify-end"><Button type="button" variant="danger" size="sm" disabled={fields.fields.length === 1} onClick={() => fields.remove(index)}><Trash2 className="size-4" />Hapus detail</Button></div></div>)}</div></section>
    <div className="sticky bottom-3 flex flex-wrap justify-end gap-3 rounded-xl border border-[#d8dadd] bg-white/95 p-4 shadow-lg backdrop-blur"><Button type="button" variant="outline" onClick={() => router.back()}>Batal</Button><Button type="submit" variant="outline" disabled={form.formState.isSubmitting}><Save className="size-4" />Simpan Draft</Button><Button type="button" onClick={submit("publish")} disabled={form.formState.isSubmitting}><Save className="size-4" />Publikasikan</Button></div>
  </form>;
}

const categorySchema = z.object({ name: z.string().min(2), slug: z.string().min(2), description: z.string().min(5), icon: z.string(), sortOrder: z.number(), isActive: z.boolean() });
export function CategoryForm({ initial, onDone }: { initial?: Category; onDone: () => void }) {
  const { saveCategory } = usePortal();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof categorySchema>>({ resolver: zodResolver(categorySchema), defaultValues: initial || { name: "", slug: "", description: "", icon: "boxes", sortOrder: 1, isActive: true } });
  return <form className="grid gap-4" onSubmit={form.handleSubmit(async (value) => {
    await saveCategory({ id: initial?.id || newId("cat"), updatedAt: new Date().toISOString(), ...value });
    toast("Kategori berhasil disimpan.");
    onDone();
  })}>
    <Field label="Nama"><Input {...form.register("name")} /></Field>
    <Field label="Slug"><Input {...form.register("slug")} /></Field>
    <Field label="Deskripsi"><Textarea {...form.register("description")} /></Field>
    <div className="grid grid-cols-2 gap-3"><Field label="Ikon"><Select {...form.register("icon")}><option value="boxes">Boxes</option><option value="server">Server</option><option value="code">Code</option><option value="shield">Shield</option><option value="database">Database</option></Select></Field><Field label="Urutan"><Input type="number" {...form.register("sortOrder", { valueAsNumber: true })} /></Field></div>
    <label className="flex items-center gap-2 text-sm font-semibold"><input type="checkbox" {...form.register("isActive")} />Aktif</label>
    <Button type="submit"><Save className="size-4" />Simpan</Button>
  </form>;
}

const subcategorySchema = z.object({ categoryId: z.string().min(1), name: z.string().min(2), slug: z.string().min(2), description: z.string().min(5), sortOrder: z.number(), isActive: z.boolean() });
export function SubcategoryForm({ initial, categoryId, onDone }: { initial?: Subcategory; categoryId?: string; onDone: () => void }) {
  const { state, saveSubcategory } = usePortal();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof subcategorySchema>>({ resolver: zodResolver(subcategorySchema), defaultValues: initial || { categoryId: categoryId || "", name: "", slug: "", description: "Standar subkategori sesuai dokumen ST-002.", sortOrder: 1, isActive: true } });
  return <form className="grid gap-4" onSubmit={form.handleSubmit(async (value) => {
    await saveSubcategory({ id: initial?.id || newId("sub"), ...value });
    toast("Subkategori berhasil disimpan.");
    onDone();
  })}>
    <Field label="Kategori"><Select {...form.register("categoryId")}><option value="">Pilih kategori</option>{state.categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</Select></Field>
    <Field label="Nama"><Input {...form.register("name")} /></Field>
    <Field label="Slug"><Input {...form.register("slug")} /></Field>
    <Field label="Deskripsi"><Textarea {...form.register("description")} /></Field>
    <Field label="Urutan"><Input type="number" {...form.register("sortOrder", { valueAsNumber: true })} /></Field>
    <label className="flex items-center gap-2 text-sm font-semibold"><input type="checkbox" {...form.register("isActive")} />Aktif</label>
    <Button type="submit"><Save className="size-4" />Simpan Subkategori</Button>
  </form>;
}

const roleSchema = z.object({ sourceNumber: z.string().min(1), name: z.string().min(2), slug: z.string().min(2), description: z.string().min(5), level: z.string(), tagsText: z.string(), isActive: z.boolean(), competencies: z.array(z.object({ id: z.string(), number: z.string(), description: z.string().min(3), group: z.string(), tagsText: z.string() })) });
export function CompetencyForm({ initial, onDone }: { initial?: CompetencyRole; onDone: () => void }) {
  const { state, saveRole } = usePortal();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof roleSchema>>({ resolver: zodResolver(roleSchema), defaultValues: initial ? { ...initial, tagsText: initial.tags.join(", "), competencies: initial.competencies.map((item) => ({ ...item, tagsText: item.tags.join(", ") })) } : { sourceNumber: String(state.roles.length + 1), name: "", slug: "", description: "", level: "Profesional", tagsText: "", isActive: true, competencies: [{ id: newId("comp"), number: "1", description: "", group: "Kompetensi Teknis dan Profesional", tagsText: "" }] } });
  const fields = useFieldArray({ control: form.control, name: "competencies" });
  return <form className="grid gap-4" onSubmit={form.handleSubmit(async (value) => {
    const { tagsText, competencies, ...rest } = value;
    await saveRole({ id: initial?.id || newId("role"), documentId: state.document.id, sortOrder: initial?.sortOrder || state.roles.length + 1, tags: tagsText.split(",").map((tag) => tag.trim()).filter(Boolean), competencies: competencies.map(({ tagsText: itemTags, ...item }) => ({ ...item, tags: itemTags.split(",").map((tag) => tag.trim()).filter(Boolean) })), ...rest });
    toast("Role kompetensi berhasil disimpan.");
    onDone();
  })}>
    <div className="grid gap-3 md:grid-cols-2"><Field label="Nama Role"><Input {...form.register("name")} /></Field><Field label="Level"><Select {...form.register("level")}><option>Dasar</option><option>Profesional</option></Select></Field><Field label="Slug" className="md:col-span-2"><Input {...form.register("slug")} /></Field></div>
    <Field label="Deskripsi"><Textarea {...form.register("description")} /></Field>
    <Field label="Tags Role (pisahkan koma)"><Input {...form.register("tagsText")} /></Field>
    <div className="grid gap-3">{fields.fields.map((field, index) => <div key={field.id} className="grid gap-2 rounded-lg border border-[#d8dadd] bg-[#f7f9fc] p-3 md:grid-cols-[80px_1fr_220px_auto]"><Input {...form.register(`competencies.${index}.number`)} aria-label="Nomor" /><Textarea {...form.register(`competencies.${index}.description`)} aria-label="Deskripsi kompetensi" /><div className="grid gap-2"><Select {...form.register(`competencies.${index}.group`)} aria-label="Kelompok kompetensi"><option>Kompetensi Dasar</option><option>Kompetensi Teknis dan Profesional</option></Select><Input {...form.register(`competencies.${index}.tagsText`)} placeholder="Tags, pisahkan koma" /></div><Button type="button" variant="danger" size="icon" onClick={() => fields.remove(index)} aria-label="Hapus kompetensi"><Trash2 className="size-4" /></Button></div>)}</div>
    <Button type="button" variant="outline" onClick={() => fields.append({ id: newId("comp"), number: String(fields.fields.length + 1), description: "", group: "Kompetensi Teknis dan Profesional", tagsText: "" })}><Plus className="size-4" />Tambah Kompetensi</Button>
    <label className="flex items-center gap-2 text-sm font-semibold"><input type="checkbox" {...form.register("isActive")} />Aktif</label>
    <Button type="submit"><Save className="size-4" />Simpan Role</Button>
  </form>;
}

const criterionSchema = z.object({ sourceNumber: z.string().min(1), name: z.string().min(2), deviceType: z.string(), description: z.string().min(5), conditionType: z.enum(["vendor_support", "age", "mtbf_warranty"]), operator: z.enum(["eq", "gt", "lt"]), conditionValue: z.string().min(1), conditionUnit: z.string().optional(), requiresWarrantyExpired: z.boolean(), sortOrder: z.number(), isActive: z.boolean() });
export function ObsoleteCriterionForm({ initial, onDone }: { initial?: ObsoleteCriterion; onDone: () => void }) {
  const { saveCriterion, state } = usePortal();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof criterionSchema>>({ resolver: zodResolver(criterionSchema), defaultValues: initial || { sourceNumber: String(state.obsoleteCriteria.length + 1), name: "", deviceType: "semua", description: "", conditionType: "age", operator: "gt", conditionValue: "", conditionUnit: "tahun", requiresWarrantyExpired: false, sortOrder: state.obsoleteCriteria.length + 1, isActive: true } });
  return <form className="grid gap-4" onSubmit={form.handleSubmit(async (value) => {
    await saveCriterion({ id: initial?.id || newId("obs"), ...value });
    toast("Kriteria obsolete berhasil disimpan.");
    onDone();
  })}>
    <div className="grid gap-3 md:grid-cols-2"><Field label="Nama"><Input {...form.register("name")} /></Field><Field label="Jenis Perangkat"><Select {...form.register("deviceType")}><option value="semua">Semua</option><option value="server">Server</option><option value="network">Network device</option></Select></Field><Field label="Tipe Kondisi"><Select {...form.register("conditionType")}><option value="vendor_support">Dukungan vendor</option><option value="age">Usia</option><option value="mtbf_warranty">MTBF dan garansi</option></Select></Field><Field label="Operator"><Select {...form.register("operator")}><option value="eq">Sama dengan</option><option value="gt">Lebih dari</option><option value="lt">Kurang dari</option></Select></Field><Field label="Nilai"><Input {...form.register("conditionValue")} /></Field><Field label="Satuan"><Input {...form.register("conditionUnit")} /></Field><Field label="Urutan"><Input type="number" {...form.register("sortOrder", { valueAsNumber: true })} /></Field></div>
    <Field label="Deskripsi"><Textarea {...form.register("description")} /></Field>
    <label className="flex items-center gap-2 text-sm font-semibold"><input type="checkbox" {...form.register("requiresWarrantyExpired")} />Harus lewat masa garansi</label>
    <label className="flex items-center gap-2 text-sm font-semibold"><input type="checkbox" {...form.register("isActive")} />Aktif</label>
    <Button type="submit"><Save className="size-4" />Simpan Kriteria</Button>
  </form>;
}

export function DocumentForm({ initial }: { initial: PortalDocument }) {
  const { saveDocument } = usePortal();
  const { toast } = useToast();
  const form = useForm<PortalDocument>({ defaultValues: initial });
  return <form className="grid gap-5" onSubmit={form.handleSubmit(async (value) => { await saveDocument({ ...value, sections: initial.sections }); toast("Informasi dokumen berhasil diperbarui."); })}>
    <section className="grid gap-4 rounded-xl border border-[#d8dadd] bg-white p-5 md:grid-cols-2"><Field label="Nama Dokumen" className="md:col-span-2"><Input {...form.register("documentName")} /></Field><Field label="Nomor Dokumen"><Input {...form.register("documentNumber")} /></Field><Field label="Nomor Standardisasi"><Input {...form.register("standardizationNumber")} /></Field><Field label="Unit Penerbit"><Input {...form.register("issuingUnit")} /></Field><Field label="Status"><Input {...form.register("status")} /></Field><Field label="Tanggal Ditetapkan"><Input type="date" {...form.register("establishedDate")} /></Field><Field label="Tanggal Berlaku"><Input type="date" {...form.register("effectiveDate")} /></Field><Field label="Tujuan"><Textarea {...form.register("purpose")} /></Field><Field label="Ruang Lingkup"><Textarea {...form.register("scope")} /></Field><Field label="Informasi Lampiran" className="md:col-span-2"><Input {...form.register("attachmentInformation")} /></Field></section>
    <div className="flex justify-end"><Button type="submit"><Save className="size-4" />Simpan Dokumen</Button></div>
  </form>;
}
