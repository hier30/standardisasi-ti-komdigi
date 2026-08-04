import fs from "node:fs";
import path from "node:path";
import ts from "typescript";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const sourcePath = path.join(root, "lib", "internal-data.ts");
const source = fs.readFileSync(sourcePath, "utf8");
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
const tempPath = path.join(root, "scripts", ".internal-data.generated.mjs");
fs.writeFileSync(tempPath, compiled, "utf8");
const data = await import(`${pathToFileURL(tempPath).href}?t=${Date.now()}`);

const q = (value) => value === undefined || value === null || value === "" ? "null" : `'${String(value).replaceAll("'", "''")}'`;
const b = (value) => value ? "true" : "false";
const arr = (values) => `array[${values.map(q).join(", ")}]::text[]`;
const rows = [];

rows.push("begin;");
const doc = data.portalDocument;
rows.push(`insert into public.documents (id, document_name, document_number, standardization_number, issuing_unit, established_date, effective_date, status, purpose, scope, attachment_information) values (${q(doc.id)}, ${q(doc.documentName)}, ${q(doc.documentNumber)}, ${q(doc.standardizationNumber)}, ${q(doc.issuingUnit)}, ${q(doc.establishedDate)}, ${q(doc.effectiveDate)}, ${q(doc.status)}, ${q(doc.purpose)}, ${q(doc.scope)}, ${q(doc.attachmentInformation)}) on conflict (id) do update set document_name=excluded.document_name, standardization_number=excluded.standardization_number, issuing_unit=excluded.issuing_unit, status=excluded.status, purpose=excluded.purpose, scope=excluded.scope, attachment_information=excluded.attachment_information;`);

const extraSections = [
  { id: "section-1-5", sectionNumber: "1.5", title: "Referensi", content: doc.references.map((item, index) => `${index + 1}. ${item.name} - ${item.section}`).join("\n"), sortOrder: 5 },
  { id: "section-1-6", sectionNumber: "1.6", title: "Istilah dan Definisi/Pengertian Umum", content: doc.definitions.map((item, index) => `${index + 1}. ${item.term}: ${item.definition}`).join("\n"), sortOrder: 6 },
];
for (const section of [...doc.sections, ...extraSections]) rows.push(`insert into public.document_sections (id, document_id, section_number, title, content, sort_order) values (${q(section.id)}, ${q(doc.id)}, ${q(section.sectionNumber)}, ${q(section.title)}, ${q(section.content)}, ${section.sortOrder}) on conflict (id) do update set title=excluded.title, content=excluded.content, sort_order=excluded.sort_order;`);
for (const item of data.categories) rows.push(`insert into public.categories (id, name, slug, description, icon, sort_order, is_active) values (${q(item.id)}, ${q(item.name)}, ${q(item.slug)}, ${q(item.description)}, ${q(item.icon)}, ${item.sortOrder}, ${b(item.isActive)}) on conflict (id) do update set name=excluded.name, slug=excluded.slug, description=excluded.description, icon=excluded.icon, sort_order=excluded.sort_order, is_active=excluded.is_active;`);
for (const item of data.subcategories) rows.push(`insert into public.subcategories (id, category_id, name, slug, description, sort_order, is_active) values (${q(item.id)}, ${q(item.categoryId)}, ${q(item.name)}, ${q(item.slug)}, ${q(item.description)}, ${item.sortOrder}, ${b(item.isActive)}) on conflict (id) do update set category_id=excluded.category_id, name=excluded.name, slug=excluded.slug, description=excluded.description, sort_order=excluded.sort_order, is_active=excluded.is_active;`);
for (const item of data.standards) {
  rows.push(`insert into public.standards (id, document_id, category_id, subcategory_id, source_number, name, slug, description, technical_provisions, implementation_notes, purpose, scope, version, status, effective_date, review_date, document_reference, sort_order, is_published) values (${q(item.id)}, ${q(item.documentId)}, ${q(item.categoryId)}, ${q(item.subcategoryId)}, ${q(item.sourceNumber)}, ${q(item.name)}, ${q(item.slug)}, ${q(item.description)}, ${q(item.technicalProvisions)}, ${q(item.implementationNotes)}, ${q(item.purpose)}, ${q(item.scope)}, ${q(item.version)}, ${q(item.status)}, ${q(item.effectiveDate)}, ${q(item.reviewDate)}, ${q(item.documentReference)}, ${item.sortOrder}, ${b(item.isPublished)}) on conflict (id) do update set category_id=excluded.category_id, subcategory_id=excluded.subcategory_id, name=excluded.name, slug=excluded.slug, description=excluded.description, technical_provisions=excluded.technical_provisions, purpose=excluded.purpose, scope=excluded.scope, version=excluded.version, status=excluded.status, effective_date=excluded.effective_date, review_date=excluded.review_date, document_reference=excluded.document_reference, sort_order=excluded.sort_order, is_published=excluded.is_published, deleted_at=null;`);
  for (const detail of item.details) rows.push(`insert into public.standard_details (id, standard_id, label, minimum_value, recommended_value, unit, notes, sort_order) values (${q(detail.id)}, ${q(item.id)}, ${q(detail.label)}, ${q(detail.minimumValue)}, ${q(detail.recommendedValue)}, ${q(detail.unit)}, ${q(detail.notes)}, ${detail.sortOrder}) on conflict (id) do update set label=excluded.label, minimum_value=excluded.minimum_value, recommended_value=excluded.recommended_value, unit=excluded.unit, notes=excluded.notes, sort_order=excluded.sort_order;`);
}
rows.push("insert into public.competency_groups (id, name, description, sort_order) values ('group-basic', 'Kompetensi Dasar', 'Kompetensi dasar dan prasyarat role.', 1), ('group-technical', 'Kompetensi Teknis dan Profesional', 'Kompetensi teknis dan profesional sesuai role.', 2) on conflict (id) do update set name=excluded.name, description=excluded.description, sort_order=excluded.sort_order;");
for (const role of data.competencyRoles) {
  rows.push(`insert into public.competency_roles (id, document_id, source_number, name, slug, description, level, tags, sort_order, is_active) values (${q(role.id)}, ${q(role.documentId)}, ${q(role.sourceNumber)}, ${q(role.name)}, ${q(role.slug)}, ${q(role.description)}, ${q(role.level)}, ${arr(role.tags)}, ${role.sortOrder}, ${b(role.isActive)}) on conflict (id) do update set name=excluded.name, slug=excluded.slug, description=excluded.description, level=excluded.level, tags=excluded.tags, sort_order=excluded.sort_order, is_active=excluded.is_active;`);
  for (const item of role.competencies) rows.push(`insert into public.competencies (id, role_id, group_id, competency_number, description, tags, sort_order) values (${q(item.id)}, ${q(role.id)}, ${q(item.group === "Kompetensi Dasar" ? "group-basic" : "group-technical")}, ${q(item.number)}, ${q(item.description)}, ${arr(item.tags)}, ${Number(item.number)}) on conflict (id) do update set competency_number=excluded.competency_number, description=excluded.description, tags=excluded.tags, sort_order=excluded.sort_order;`);
}
for (const item of data.obsoleteCriteria) rows.push(`insert into public.obsolete_criteria (id, source_number, name, device_type, description, condition_type, operator, condition_value, condition_unit, requires_warranty_expired, sort_order, is_active) values (${q(item.id)}, ${q(item.sourceNumber)}, ${q(item.name)}, ${q(item.deviceType)}, ${q(item.description)}, ${q(item.conditionType)}, ${q(item.operator)}, ${q(item.conditionValue)}, ${q(item.conditionUnit)}, ${b(item.requiresWarrantyExpired)}, ${item.sortOrder}, ${b(item.isActive)}) on conflict (id) do update set name=excluded.name, device_type=excluded.device_type, description=excluded.description, condition_type=excluded.condition_type, operator=excluded.operator, condition_value=excluded.condition_value, condition_unit=excluded.condition_unit, requires_warranty_expired=excluded.requires_warranty_expired, sort_order=excluded.sort_order, is_active=excluded.is_active;`);
rows.push("commit;");
rows.unshift("-- Generated from lib/internal-data.ts. Do not edit by hand.\n-- Contains the complete internal content extracted from ST-002/SJ.7/KITG/07/2024-01.");
fs.writeFileSync(path.join(root, "supabase", "seed.sql"), `${rows.join("\n\n")}\n`, "utf8");
fs.unlinkSync(tempPath);
console.log(`Generated supabase/seed.sql with ${data.standards.length} standards, ${data.standards.reduce((sum, item) => sum + item.details.length, 0)} details, ${data.competencyRoles.length} roles, and ${data.competencyRoles.reduce((sum, role) => sum + role.competencies.length, 0)} competencies.`);
