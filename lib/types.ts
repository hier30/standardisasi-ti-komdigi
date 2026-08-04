export type StandardStatus = "berlaku" | "draft" | "ditinjau" | "arsip";

export interface StandardDetail {
  id: string;
  label: string;
  minimumValue: string;
  recommendedValue?: string;
  unit?: string;
  notes?: string;
  sortOrder: number;
}

export interface Standard {
  id: string;
  documentId: string;
  categoryId: string;
  subcategoryId?: string;
  sourceNumber: string;
  name: string;
  slug: string;
  description: string;
  purpose?: string;
  scope?: string;
  technicalProvisions?: string;
  implementationNotes?: string;
  version: string;
  status: StandardStatus;
  effectiveDate: string;
  reviewDate: string;
  documentReference: string;
  sortOrder: number;
  isPublished: boolean;
  updatedAt: string;
  details: StandardDetail[];
}

export interface Subcategory {
  id: string;
  categoryId: string;
  name: string;
  slug: string;
  description: string;
  sortOrder: number;
  isActive: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  sortOrder: number;
  isActive: boolean;
  updatedAt: string;
}

export interface CompetencyRole {
  id: string;
  documentId: string;
  sourceNumber: string;
  name: string;
  slug: string;
  description: string;
  level: string;
  sortOrder: number;
  isActive: boolean;
  tags: string[];
  competencies: { id: string; number: string; description: string; group: string; tags: string[] }[];
}

export interface ObsoleteCriterion {
  id: string;
  sourceNumber: string;
  name: string;
  deviceType: string;
  description: string;
  conditionType: "vendor_support" | "age" | "mtbf_warranty";
  operator: "eq" | "gt" | "lt";
  conditionValue: string;
  conditionUnit?: string;
  requiresWarrantyExpired: boolean;
  sortOrder: number;
  isActive: boolean;
}

export interface DocumentSection {
  id: string;
  sectionNumber: string;
  title: string;
  content: string;
  sortOrder: number;
}

export interface PortalDocument {
  id: string;
  documentName: string;
  documentNumber: string;
  standardizationNumber: string;
  issuingUnit: string;
  establishedDate: string;
  effectiveDate: string;
  status: string;
  purpose: string;
  scope: string;
  attachmentInformation: string;
  sections: DocumentSection[];
  references: { name: string; section: string }[];
  definitions: { term: string; definition: string }[];
}

export interface AuditLog {
  id: string;
  user: string;
  entityType: string;
  entityId: string;
  entityName: string;
  action: string;
  oldData?: unknown;
  newData?: unknown;
  createdAt: string;
}

export interface PortalState {
  standards: Standard[];
  categories: Category[];
  subcategories: Subcategory[];
  roles: CompetencyRole[];
  obsoleteCriteria: ObsoleteCriterion[];
  document: PortalDocument;
  auditLogs: AuditLog[];
}
