"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { initialPortalState } from "@/lib/internal-data";
import { createClient, hasSupabaseEnv } from "@/lib/supabase/client";
import type { Category, CompetencyRole, ObsoleteCriterion, PortalDocument, PortalState, Standard, Subcategory } from "@/lib/types";
import { newId } from "@/lib/utils";

const STORAGE_KEY = "komdigi-portal-demo-state-v1";
const SESSION_KEY = "komdigi-portal-demo-admin";

interface PortalContextValue {
  state: PortalState;
  mode: "demo" | "supabase";
  isAdmin: boolean;
  ready: boolean;
  login: (email: string, password: string, remember: boolean) => Promise<{ error?: string }>;
  logout: () => Promise<void>;
  saveStandard: (standard: Standard, action?: string) => Promise<void>;
  archiveStandard: (id: string) => Promise<void>;
  deleteStandard: (id: string) => Promise<void>;
  saveCategory: (category: Category) => Promise<void>;
  deleteCategory: (id: string) => Promise<{ error?: string }>;
  saveSubcategory: (subcategory: Subcategory) => Promise<void>;
  deleteSubcategory: (id: string) => Promise<{ error?: string }>;
  saveRole: (role: CompetencyRole) => Promise<void>;
  deleteRole: (id: string) => Promise<void>;
  saveCriterion: (criterion: ObsoleteCriterion) => Promise<void>;
  deleteCriterion: (id: string) => Promise<void>;
  saveDocument: (document: PortalDocument) => Promise<void>;
  resetDemo: () => void;
}

const PortalContext = createContext<PortalContextValue | null>(null);

type DbRow = Record<string, unknown>;
const dbText = (row: DbRow, key: string) => String(row[key] ?? "");
const dbNumber = (row: DbRow, key: string) => Number(row[key] ?? 0);
const dbBoolean = (row: DbRow, key: string) => Boolean(row[key]);
const dbRows = (value: unknown) => Array.isArray(value) ? value as DbRow[] : [];
const toError = (error: { message?: string; details?: string; hint?: string; code?: string }, fallback: string) => new Error([error.message || fallback, error.details, error.hint, error.code ? `Kode: ${error.code}` : undefined].filter(Boolean).join(" "));
type BrowserSupabaseClient = NonNullable<ReturnType<typeof createClient>>;

async function requireAdminSession(supabase: BrowserSupabaseClient) {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) throw new Error("Sesi admin tidak aktif. Silakan login ulang lalu coba simpan lagi.");

  const { data: profile, error: profileError } = await supabase.from("profiles").select("role").eq("id", userData.user.id).single();
  if (profileError) throw toError(profileError, "Gagal memverifikasi hak akses admin.");
  if (profile?.role !== "admin") throw new Error("Akun ini tidak memiliki hak akses admin.");
}

async function fetchSupabaseState(): Promise<PortalState> {
  const supabase = createClient();
  if (!supabase) return initialPortalState;
  const [documentResult, categoryResult, subcategoryResult, standardResult, roleResult, criterionResult, auditResult] = await Promise.all([
    supabase.from("documents").select("*, document_sections(*)").limit(1).single(),
    supabase.from("categories").select("*").order("sort_order"),
    supabase.from("subcategories").select("*").order("sort_order"),
    supabase.from("standards").select("*, standard_details(*)").is("deleted_at", null).order("sort_order"),
    supabase.from("competency_roles").select("*, competencies(*)").order("sort_order"),
    supabase.from("obsolete_criteria").select("*").order("sort_order"),
    supabase.from("audit_logs").select("*").order("created_at", { ascending: false }).limit(250),
  ]);
  const failure = [documentResult, categoryResult, subcategoryResult, standardResult, roleResult, criterionResult].find((result) => result.error);
  if (failure?.error) throw toError(failure.error, "Gagal memuat data Supabase.");

  const documentRow = documentResult.data as unknown as DbRow;
  const document: PortalDocument = {
    id: dbText(documentRow, "id"), documentName: dbText(documentRow, "document_name"), documentNumber: dbText(documentRow, "document_number"), standardizationNumber: dbText(documentRow, "standardization_number"), issuingUnit: dbText(documentRow, "issuing_unit"), establishedDate: dbText(documentRow, "established_date"), effectiveDate: dbText(documentRow, "effective_date"), status: dbText(documentRow, "status"), purpose: dbText(documentRow, "purpose"), scope: dbText(documentRow, "scope"), attachmentInformation: dbText(documentRow, "attachment_information"),
    sections: dbRows(documentRow.document_sections).sort((a, b) => dbNumber(a, "sort_order") - dbNumber(b, "sort_order")).map((row) => ({ id: dbText(row, "id"), sectionNumber: dbText(row, "section_number"), title: dbText(row, "title"), content: dbText(row, "content"), sortOrder: dbNumber(row, "sort_order") })),
    references: initialPortalState.document.references,
    definitions: initialPortalState.document.definitions,
  };
  const categories = ((categoryResult.data ?? []) as unknown as DbRow[]).map((row) => ({ id: dbText(row, "id"), name: dbText(row, "name"), slug: dbText(row, "slug"), description: dbText(row, "description"), icon: dbText(row, "icon"), sortOrder: dbNumber(row, "sort_order"), isActive: dbBoolean(row, "is_active"), updatedAt: dbText(row, "updated_at") }));
  const subcategories = ((subcategoryResult.data ?? []) as unknown as DbRow[]).map((row) => ({ id: dbText(row, "id"), categoryId: dbText(row, "category_id"), name: dbText(row, "name"), slug: dbText(row, "slug"), description: dbText(row, "description"), sortOrder: dbNumber(row, "sort_order"), isActive: dbBoolean(row, "is_active") }));
  const standards = ((standardResult.data ?? []) as unknown as DbRow[]).map((row) => ({
    id: dbText(row, "id"), documentId: dbText(row, "document_id"), categoryId: dbText(row, "category_id"), subcategoryId: dbText(row, "subcategory_id") || undefined, sourceNumber: dbText(row, "source_number"), name: dbText(row, "name"), slug: dbText(row, "slug"), description: dbText(row, "description"), purpose: dbText(row, "purpose"), scope: dbText(row, "scope"), technicalProvisions: dbText(row, "technical_provisions"), implementationNotes: dbText(row, "implementation_notes"), version: dbText(row, "version"), status: dbText(row, "status") as Standard["status"], effectiveDate: dbText(row, "effective_date"), reviewDate: dbText(row, "review_date"), documentReference: dbText(row, "document_reference"), sortOrder: dbNumber(row, "sort_order"), isPublished: dbBoolean(row, "is_published"), updatedAt: dbText(row, "updated_at"),
    details: dbRows(row.standard_details).sort((a, b) => dbNumber(a, "sort_order") - dbNumber(b, "sort_order")).map((detail) => ({ id: dbText(detail, "id"), label: dbText(detail, "label"), minimumValue: dbText(detail, "minimum_value"), recommendedValue: dbText(detail, "recommended_value"), unit: dbText(detail, "unit"), notes: dbText(detail, "notes"), sortOrder: dbNumber(detail, "sort_order") })),
  }));
  const roles = ((roleResult.data ?? []) as unknown as DbRow[]).map((row) => ({
    id: dbText(row, "id"), documentId: dbText(row, "document_id"), sourceNumber: dbText(row, "source_number"), name: dbText(row, "name"), slug: dbText(row, "slug"), description: dbText(row, "description"), level: dbText(row, "level"), sortOrder: dbNumber(row, "sort_order"), isActive: dbBoolean(row, "is_active"), tags: Array.isArray(row.tags) ? row.tags.map(String) : [],
    competencies: dbRows(row.competencies).sort((a, b) => dbNumber(a, "sort_order") - dbNumber(b, "sort_order")).map((item) => ({ id: dbText(item, "id"), number: dbText(item, "competency_number"), description: dbText(item, "description"), group: dbText(item, "group_id") === "group-basic" ? "Kompetensi Dasar" : "Kompetensi Teknis dan Profesional", tags: Array.isArray(item.tags) ? item.tags.map(String) : [] })),
  }));
  const obsoleteCriteria = ((criterionResult.data ?? []) as unknown as DbRow[]).map((row) => ({ id: dbText(row, "id"), sourceNumber: dbText(row, "source_number"), name: dbText(row, "name"), deviceType: dbText(row, "device_type"), description: dbText(row, "description"), conditionType: dbText(row, "condition_type") as ObsoleteCriterion["conditionType"], operator: dbText(row, "operator") as ObsoleteCriterion["operator"], conditionValue: dbText(row, "condition_value"), conditionUnit: dbText(row, "condition_unit") || undefined, requiresWarrantyExpired: dbBoolean(row, "requires_warranty_expired"), sortOrder: dbNumber(row, "sort_order"), isActive: dbBoolean(row, "is_active") }));
  const auditLogs = ((auditResult.data ?? []) as unknown as DbRow[]).map((row) => ({ id: dbText(row, "id"), user: dbText(row, "user_id") || "Sistem", entityType: dbText(row, "entity_type"), entityId: dbText(row, "entity_id"), entityName: dbText(row, "entity_id"), action: dbText(row, "action"), oldData: row.old_data, newData: row.new_data, createdAt: dbText(row, "created_at") }));
  return { document, categories, subcategories, standards, roles, obsoleteCriteria, auditLogs };
}

export function PortalProvider({ children }: { children: React.ReactNode }) {
  const mode = hasSupabaseEnv() ? "supabase" : "demo";
  const [state, setState] = useState<PortalState>(initialPortalState);
  const [isAdmin, setIsAdmin] = useState(false);
  const [ready, setReady] = useState(mode === "demo");
  const refreshSupabase = useCallback(async () => {
    const next = await fetchSupabaseState();
    setState(next);
  }, []);

  useEffect(() => {
    if (mode === "demo") {
      const timer = window.setTimeout(() => {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (stored) {
          try {
            setState(JSON.parse(stored) as PortalState);
          } catch {
            window.localStorage.removeItem(STORAGE_KEY);
          }
        }
        setIsAdmin(Boolean(window.localStorage.getItem(SESSION_KEY) || window.sessionStorage.getItem(SESSION_KEY)));
        setReady(true);
      }, 0);
      return () => window.clearTimeout(timer);
    }

    const supabase = createClient();
    void Promise.all([supabase!.auth.getUser(), fetchSupabaseState()]).then(async ([{ data }, next]) => {
      setState(next);
      if (!data.user) {
        setIsAdmin(false);
        return;
      }
      const { data: profile } = await supabase!.from("profiles").select("role").eq("id", data.user.id).single();
      setIsAdmin(profile?.role === "admin");
    }).finally(() => setReady(true));
  }, [mode, refreshSupabase]);

  useEffect(() => {
    if (ready && mode === "demo") window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [mode, ready, state]);

  const appendAudit = useCallback((current: PortalState, entityType: string, entityId: string, entityName: string, action: string, oldData?: unknown, newData?: unknown) => ({
    ...current,
    auditLogs: [
      { id: newId("audit"), user: mode === "demo" ? "Admin Demo" : "Admin", entityType, entityId, entityName, action, oldData, newData, createdAt: new Date().toISOString() },
      ...current.auditLogs,
    ],
  }), [mode]);

  const login = useCallback(async (email: string, password: string, remember: boolean) => {
    if (!email || !password) return { error: "Email dan kata sandi wajib diisi." };
    if (mode === "demo") {
      const storage = remember ? window.localStorage : window.sessionStorage;
      storage.setItem(SESSION_KEY, email);
      setIsAdmin(true);
      return {};
    }
    const supabase = createClient();
    const { data: signInData, error } = await supabase!.auth.signInWithPassword({ email, password });
    if (error) return { error: "Email atau kata sandi tidak sesuai." };
    if (!signInData.session) return { error: "Sesi login tidak berhasil dibuat. Coba masuk ulang." };
    const { data: userData } = await supabase!.auth.getUser();
    const { data: profile } = await supabase!.from("profiles").select("role").eq("id", userData.user?.id || "").single();
    if (profile?.role !== "admin") {
      await supabase!.auth.signOut();
      return { error: "Akun ini tidak memiliki hak akses admin." };
    }
    await refreshSupabase();
    setIsAdmin(true);
    return {};
  }, [mode, refreshSupabase]);

  const logout = useCallback(async () => {
    window.localStorage.removeItem(SESSION_KEY);
    window.sessionStorage.removeItem(SESSION_KEY);
    if (mode === "supabase") await createClient()?.auth.signOut();
    setIsAdmin(false);
  }, [mode]);

  const saveStandard = useCallback(async (standard: Standard, action = "update") => {
    if (mode === "supabase") {
      const supabase = createClient()!;
      await requireAdminSession(supabase);
      const payload = {
        id: standard.id, document_id: standard.documentId, category_id: standard.categoryId,
        subcategory_id: standard.subcategoryId || null, source_number: standard.sourceNumber,
        name: standard.name, slug: standard.slug, description: standard.description,
        purpose: standard.purpose || null, scope: standard.scope || null,
        technical_provisions: standard.technicalProvisions || null,
        implementation_notes: standard.implementationNotes || null, version: standard.version,
        status: standard.status, effective_date: standard.effectiveDate, review_date: standard.reviewDate,
        document_reference: standard.documentReference, sort_order: standard.sortOrder,
        is_published: standard.isPublished, updated_at: new Date().toISOString(),
      };
      const { error } = await supabase.from("standards").upsert(payload);
      if (error) throw toError(error, "Gagal menyimpan standar.");
      const { error: deleteDetailError } = await supabase.from("standard_details").delete().eq("standard_id", standard.id);
      if (deleteDetailError) throw toError(deleteDetailError, "Gagal memperbarui detail teknis.");
      if (standard.details.length) {
        const { error: detailError } = await supabase.from("standard_details").insert(standard.details.map((detail) => ({
          id: detail.id, standard_id: standard.id, label: detail.label,
          minimum_value: detail.minimumValue, recommended_value: detail.recommendedValue || null,
          unit: detail.unit || null, notes: detail.notes || null, sort_order: detail.sortOrder,
        })));
        if (detailError) throw toError(detailError, "Gagal menyimpan detail teknis.");
      }
    }
    setState((current) => {
      const old = current.standards.find((item) => item.id === standard.id);
      const next = { ...current, standards: old ? current.standards.map((item) => item.id === standard.id ? standard : item) : [standard, ...current.standards] };
      return appendAudit(next, "standard", standard.id, standard.name, action, old, standard);
    });
  }, [appendAudit, mode]);

  const archiveStandard = useCallback(async (id: string) => {
    const item = state.standards.find((standard) => standard.id === id);
    if (item) await saveStandard({ ...item, status: item.status === "arsip" ? "draft" : "arsip", isPublished: false, updatedAt: new Date().toISOString() }, item.status === "arsip" ? "restore" : "archive");
  }, [saveStandard, state.standards]);

  const deleteStandard = useCallback(async (id: string) => {
    const item = state.standards.find((standard) => standard.id === id);
    if (!item) return;
    if (mode === "supabase") {
      const supabase = createClient()!;
      await requireAdminSession(supabase);
      const { error } = await supabase.from("standards").update({ deleted_at: new Date().toISOString(), is_published: false }).eq("id", id);
      if (error) throw toError(error, "Gagal menghapus standar.");
    }
    setState((current) => appendAudit({ ...current, standards: current.standards.filter((standard) => standard.id !== id) }, "standard", id, item.name, "delete", item));
  }, [appendAudit, mode, state.standards]);

  const saveCategory = useCallback(async (category: Category) => {
    if (mode === "supabase") {
      const supabase = createClient()!;
      await requireAdminSession(supabase);
      const { error } = await supabase.from("categories").upsert({ id: category.id, name: category.name, slug: category.slug, description: category.description, icon: category.icon, sort_order: category.sortOrder, is_active: category.isActive, updated_at: new Date().toISOString() });
      if (error) throw toError(error, "Gagal menyimpan kategori.");
    }
    setState((current) => {
      const old = current.categories.find((item) => item.id === category.id);
      const next = { ...current, categories: old ? current.categories.map((item) => item.id === category.id ? category : item) : [...current.categories, category] };
      return appendAudit(next, "category", category.id, category.name, old ? "update" : "create", old, category);
    });
  }, [appendAudit, mode]);

  const deleteCategory = useCallback(async (id: string) => {
    if (state.standards.some((standard) => standard.categoryId === id)) return { error: "Kategori masih digunakan oleh standar dan tidak dapat dihapus." };
    const category = state.categories.find((item) => item.id === id);
    if (!category) return {};
    if (mode === "supabase") {
      const supabase = createClient()!;
      await requireAdminSession(supabase);
      const { error } = await supabase.from("categories").delete().eq("id", id);
      if (error) return { error: error.message };
    }
    setState((current) => appendAudit({ ...current, categories: current.categories.filter((item) => item.id !== id) }, "category", id, category.name, "delete", category));
    return {};
  }, [appendAudit, mode, state.categories, state.standards]);

  const saveSubcategory = useCallback(async (subcategory: Subcategory) => {
    if (mode === "supabase") {
      const supabase = createClient()!;
      await requireAdminSession(supabase);
      const { error } = await supabase.from("subcategories").upsert({ id: subcategory.id, category_id: subcategory.categoryId, name: subcategory.name, slug: subcategory.slug, description: subcategory.description, sort_order: subcategory.sortOrder, is_active: subcategory.isActive });
      if (error) throw toError(error, "Gagal menyimpan subkategori.");
    }
    setState((current) => {
      const old = current.subcategories.find((item) => item.id === subcategory.id);
      const next = { ...current, subcategories: old ? current.subcategories.map((item) => item.id === subcategory.id ? subcategory : item) : [...current.subcategories, subcategory] };
      return appendAudit(next, "subcategory", subcategory.id, subcategory.name, old ? "update" : "create", old, subcategory);
    });
  }, [appendAudit, mode]);

  const deleteSubcategory = useCallback(async (id: string) => {
    if (state.standards.some((standard) => standard.subcategoryId === id)) return { error: "Subkategori masih digunakan oleh standar dan tidak dapat dihapus." };
    const subcategory = state.subcategories.find((item) => item.id === id);
    if (!subcategory) return {};
    if (mode === "supabase") {
      const supabase = createClient()!;
      await requireAdminSession(supabase);
      const { error } = await supabase.from("subcategories").delete().eq("id", id);
      if (error) return { error: error.message };
    }
    setState((current) => appendAudit({ ...current, subcategories: current.subcategories.filter((item) => item.id !== id) }, "subcategory", id, subcategory.name, "delete", subcategory));
    return {};
  }, [appendAudit, mode, state.standards, state.subcategories]);

  const saveRole = useCallback(async (role: CompetencyRole) => {
    if (mode === "supabase") {
      const supabase = createClient()!;
      await requireAdminSession(supabase);
      const { error } = await supabase.from("competency_roles").upsert({ id: role.id, document_id: role.documentId, source_number: role.sourceNumber, name: role.name, slug: role.slug, description: role.description, level: role.level, tags: role.tags, sort_order: role.sortOrder, is_active: role.isActive });
      if (error) throw toError(error, "Gagal menyimpan role kompetensi.");
      const { error: deleteCompetencyError } = await supabase.from("competencies").delete().eq("role_id", role.id);
      if (deleteCompetencyError) throw toError(deleteCompetencyError, "Gagal memperbarui kompetensi.");
      if (role.competencies.length) {
        const { error: competencyError } = await supabase.from("competencies").insert(role.competencies.map((item, index) => ({ id: item.id, role_id: role.id, group_id: item.group === "Kompetensi Dasar" ? "group-basic" : "group-technical", competency_number: item.number, description: item.description, tags: item.tags, sort_order: index + 1 })));
        if (competencyError) throw toError(competencyError, "Gagal menyimpan kompetensi.");
      }
    }
    setState((current) => {
      const old = current.roles.find((item) => item.id === role.id);
      return appendAudit({ ...current, roles: old ? current.roles.map((item) => item.id === role.id ? role : item) : [...current.roles, role] }, "competency_role", role.id, role.name, old ? "update" : "create", old, role);
    });
  }, [appendAudit, mode]);

  const deleteRole = useCallback(async (id: string) => {
    const role = state.roles.find((item) => item.id === id);
    if (!role) return;
    if (mode === "supabase") {
      const supabase = createClient()!;
      await requireAdminSession(supabase);
      const { error } = await supabase.from("competency_roles").delete().eq("id", id);
      if (error) throw toError(error, "Gagal menghapus role kompetensi.");
    }
    setState((current) => appendAudit({ ...current, roles: current.roles.filter((item) => item.id !== id) }, "competency_role", id, role.name, "delete", role));
  }, [appendAudit, mode, state.roles]);

  const saveCriterion = useCallback(async (criterion: ObsoleteCriterion) => {
    if (mode === "supabase") {
      const supabase = createClient()!;
      await requireAdminSession(supabase);
      const { error } = await supabase.from("obsolete_criteria").upsert({ id: criterion.id, source_number: criterion.sourceNumber, name: criterion.name, device_type: criterion.deviceType, description: criterion.description, condition_type: criterion.conditionType, operator: criterion.operator, condition_value: criterion.conditionValue, condition_unit: criterion.conditionUnit || null, requires_warranty_expired: criterion.requiresWarrantyExpired, sort_order: criterion.sortOrder, is_active: criterion.isActive });
      if (error) throw toError(error, "Gagal menyimpan kriteria obsolete.");
    }
    setState((current) => {
      const old = current.obsoleteCriteria.find((item) => item.id === criterion.id);
      return appendAudit({ ...current, obsoleteCriteria: old ? current.obsoleteCriteria.map((item) => item.id === criterion.id ? criterion : item) : [...current.obsoleteCriteria, criterion] }, "obsolete_criterion", criterion.id, criterion.name, old ? "update" : "create", old, criterion);
    });
  }, [appendAudit, mode]);

  const deleteCriterion = useCallback(async (id: string) => {
    const criterion = state.obsoleteCriteria.find((item) => item.id === id);
    if (!criterion) return;
    if (mode === "supabase") {
      const supabase = createClient()!;
      await requireAdminSession(supabase);
      const { error } = await supabase.from("obsolete_criteria").delete().eq("id", id);
      if (error) throw toError(error, "Gagal menghapus kriteria obsolete.");
    }
    setState((current) => appendAudit({ ...current, obsoleteCriteria: current.obsoleteCriteria.filter((item) => item.id !== id) }, "obsolete_criterion", id, criterion.name, "delete", criterion));
  }, [appendAudit, mode, state.obsoleteCriteria]);

  const saveDocument = useCallback(async (document: PortalDocument) => {
    if (mode === "supabase") {
      const supabase = createClient()!;
      await requireAdminSession(supabase);
      const { error } = await supabase.from("documents").upsert({ id: document.id, document_name: document.documentName, document_number: document.documentNumber, standardization_number: document.standardizationNumber, issuing_unit: document.issuingUnit, established_date: document.establishedDate, effective_date: document.effectiveDate, status: document.status, purpose: document.purpose, scope: document.scope, attachment_information: document.attachmentInformation });
      if (error) throw toError(error, "Gagal menyimpan dokumen.");
      const { error: deleteSectionError } = await supabase.from("document_sections").delete().eq("document_id", document.id);
      if (deleteSectionError) throw toError(deleteSectionError, "Gagal memperbarui bagian dokumen.");
      if (document.sections.length) {
        const { error: sectionError } = await supabase.from("document_sections").insert(document.sections.map((section) => ({ id: section.id, document_id: document.id, section_number: section.sectionNumber, title: section.title, content: section.content, sort_order: section.sortOrder })));
        if (sectionError) throw toError(sectionError, "Gagal menyimpan bagian dokumen.");
      }
    }
    setState((current) => appendAudit({ ...current, document }, "document", document.id, document.documentName, "update", current.document, document));
  }, [appendAudit, mode]);

  const resetDemo = useCallback(() => {
    window.localStorage.removeItem(STORAGE_KEY);
    setState(initialPortalState);
  }, []);

  const value = useMemo<PortalContextValue>(() => ({ state, mode, isAdmin, ready, login, logout, saveStandard, archiveStandard, deleteStandard, saveCategory, deleteCategory, saveSubcategory, deleteSubcategory, saveRole, deleteRole, saveCriterion, deleteCriterion, saveDocument, resetDemo }), [state, mode, isAdmin, ready, login, logout, saveStandard, archiveStandard, deleteStandard, saveCategory, deleteCategory, saveSubcategory, deleteSubcategory, saveRole, deleteRole, saveCriterion, deleteCriterion, saveDocument, resetDemo]);

  return <PortalContext.Provider value={value}>{children}</PortalContext.Provider>;
}

export function usePortal() {
  const context = useContext(PortalContext);
  if (!context) throw new Error("usePortal harus digunakan di dalam PortalProvider");
  return context;
}
