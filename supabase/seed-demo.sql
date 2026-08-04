-- Safe public-demo seed. This file intentionally excludes the complete internal document text.
insert into public.documents (id, document_name, standardization_number, issuing_unit, status)
values ('doc-demo', 'Contoh Dokumen Standardisasi TI', 'DEMO-ST-001', 'Unit Demo', 'Berlaku')
on conflict (id) do nothing;

insert into public.categories (id, name, slug, description, icon, sort_order, is_active)
values ('cat-demo', 'Kategori Demo', 'kategori-demo', 'Data contoh aman untuk presentasi publik.', 'boxes', 1, true)
on conflict (id) do nothing;

insert into public.standards (id, document_id, category_id, source_number, name, slug, description, version, status, sort_order, is_published)
values ('std-demo', 'doc-demo', 'cat-demo', 'D.1', 'Standar Perangkat Demo', 'standar-perangkat-demo', 'Contoh standar tanpa informasi internal.', '1.0', 'berlaku', 1, true)
on conflict (id) do nothing;
