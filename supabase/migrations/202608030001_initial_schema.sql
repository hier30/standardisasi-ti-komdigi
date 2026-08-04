create extension if not exists pgcrypto;

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text not null,
  role text not null default 'viewer' check (role in ('admin', 'viewer')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.documents (
  id text primary key,
  document_name text not null,
  document_number text,
  standardization_number text not null unique,
  issuing_unit text not null,
  established_date date,
  effective_date date,
  status text not null default 'draft',
  purpose text,
  scope text,
  attachment_information text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.document_sections (
  id text primary key,
  document_id text not null references public.documents(id) on delete cascade,
  parent_id text references public.document_sections(id) on delete cascade,
  section_number text not null,
  title text not null,
  content text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (document_id, section_number)
);

create table public.categories (
  id text primary key,
  name text not null unique,
  slug text not null unique,
  description text,
  icon text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.subcategories (
  id text primary key,
  category_id text not null references public.categories(id) on delete restrict,
  name text not null,
  slug text not null unique,
  description text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (category_id, name)
);

create table public.standards (
  id text primary key,
  document_id text not null references public.documents(id) on delete restrict,
  category_id text not null references public.categories(id) on delete restrict,
  subcategory_id text references public.subcategories(id) on delete set null,
  source_number text not null,
  name text not null,
  slug text not null unique,
  description text not null,
  minimum_requirement text,
  recommended_specification text,
  technical_provisions text,
  implementation_notes text,
  purpose text,
  scope text,
  version text not null default '1.0',
  status text not null default 'draft' check (status in ('berlaku', 'draft', 'ditinjau', 'arsip')),
  effective_date date,
  review_date date,
  document_reference text,
  sort_order integer not null default 0,
  is_published boolean not null default false,
  created_by uuid references auth.users(id) on delete set null,
  updated_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz,
  unique (document_id, source_number)
);

create table public.standard_details (
  id text primary key,
  standard_id text not null references public.standards(id) on delete cascade,
  label text not null,
  minimum_value text not null,
  recommended_value text,
  unit text,
  notes text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (standard_id, sort_order)
);

create table public.competency_roles (
  id text primary key,
  document_id text not null references public.documents(id) on delete restrict,
  source_number text not null,
  name text not null,
  slug text not null unique,
  description text,
  level text,
  tags text[] not null default '{}',
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (document_id, source_number)
);

create table public.competency_groups (
  id text primary key,
  name text not null unique,
  description text,
  sort_order integer not null default 0
);

create table public.competencies (
  id text primary key,
  role_id text not null references public.competency_roles(id) on delete cascade,
  group_id text references public.competency_groups(id) on delete set null,
  competency_number text not null,
  description text not null,
  tags text[] not null default '{}',
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (role_id, competency_number)
);

create table public.obsolete_criteria (
  id text primary key,
  source_number text not null unique,
  name text not null,
  device_type text not null,
  description text not null,
  condition_type text not null check (condition_type in ('vendor_support', 'age', 'mtbf_warranty')),
  operator text not null check (operator in ('eq', 'gt', 'lt')),
  condition_value text not null,
  condition_unit text,
  requires_warranty_expired boolean not null default false,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  entity_type text not null,
  entity_id text not null,
  action text not null,
  old_data jsonb,
  new_data jsonb,
  created_at timestamptz not null default now()
);

create index standards_public_idx on public.standards (is_published, status, deleted_at);
create index standards_category_idx on public.standards (category_id, subcategory_id);
create index standards_search_idx on public.standards using gin (to_tsvector('simple', coalesce(name, '') || ' ' || coalesce(description, '')));
create index standard_details_standard_idx on public.standard_details (standard_id, sort_order);
create index competencies_role_idx on public.competencies (role_id, sort_order);
create index audit_logs_lookup_idx on public.audit_logs (entity_type, action, created_at desc);

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin');
$$;

create or replace function public.write_audit_log()
returns trigger language plpgsql security definer set search_path = public as $$
declare
  action_name text;
  record_id text;
begin
  record_id := coalesce(new.id::text, old.id::text);
  if tg_op = 'INSERT' then
    action_name := 'create';
  elsif tg_op = 'DELETE' then
    action_name := 'delete';
  elsif to_jsonb(new)->>'deleted_at' is not null and to_jsonb(old)->>'deleted_at' is null then
    action_name := 'delete';
  elsif to_jsonb(new)->>'status' = 'arsip' and coalesce(to_jsonb(old)->>'status', '') <> 'arsip' then
    action_name := 'archive';
  elsif coalesce(to_jsonb(old)->>'status', '') = 'arsip' and to_jsonb(new)->>'status' <> 'arsip' then
    action_name := 'restore';
  elsif to_jsonb(new)->>'is_published' = 'true' and coalesce(to_jsonb(old)->>'is_published', 'false') = 'false' then
    action_name := 'publish';
  else
    action_name := 'update';
  end if;
  insert into public.audit_logs (user_id, entity_type, entity_id, action, old_data, new_data)
  values (auth.uid(), tg_table_name, record_id, action_name, case when tg_op = 'INSERT' then null else to_jsonb(old) end, case when tg_op = 'DELETE' then null else to_jsonb(new) end);
  return coalesce(new, old);
end;
$$;

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name, email, role)
  values (new.id, new.raw_user_meta_data->>'full_name', coalesce(new.email, ''), 'viewer')
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();

do $$
declare table_name text;
begin
  foreach table_name in array array['profiles','documents','document_sections','categories','subcategories','standards','standard_details','competency_roles','competencies','obsolete_criteria']
  loop
    execute format('create trigger set_%1$s_updated_at before update on public.%1$I for each row execute procedure public.set_updated_at()', table_name);
  end loop;
end $$;

create trigger audit_documents after insert or update or delete on public.documents for each row execute procedure public.write_audit_log();
create trigger audit_categories after insert or update or delete on public.categories for each row execute procedure public.write_audit_log();
create trigger audit_standards after insert or update or delete on public.standards for each row execute procedure public.write_audit_log();
create trigger audit_roles after insert or update or delete on public.competency_roles for each row execute procedure public.write_audit_log();
create trigger audit_obsolete after insert or update or delete on public.obsolete_criteria for each row execute procedure public.write_audit_log();

alter table public.profiles enable row level security;
alter table public.documents enable row level security;
alter table public.document_sections enable row level security;
alter table public.categories enable row level security;
alter table public.subcategories enable row level security;
alter table public.standards enable row level security;
alter table public.standard_details enable row level security;
alter table public.competency_roles enable row level security;
alter table public.competency_groups enable row level security;
alter table public.competencies enable row level security;
alter table public.obsolete_criteria enable row level security;
alter table public.audit_logs enable row level security;

create policy profiles_self_read on public.profiles for select using (id = auth.uid() or public.is_admin());
create policy profiles_admin_all on public.profiles for all using (public.is_admin()) with check (public.is_admin());
create policy documents_public_read on public.documents for select using (status = 'Berlaku');
create policy sections_public_read on public.document_sections for select using (exists (select 1 from public.documents d where d.id = document_id and d.status = 'Berlaku'));
create policy categories_public_read on public.categories for select using (is_active);
create policy subcategories_public_read on public.subcategories for select using (is_active);
create policy standards_public_read on public.standards for select using (is_published and status = 'berlaku' and deleted_at is null);
create policy details_public_read on public.standard_details for select using (exists (select 1 from public.standards s where s.id = standard_id and s.is_published and s.status = 'berlaku' and s.deleted_at is null));
create policy roles_public_read on public.competency_roles for select using (is_active);
create policy groups_public_read on public.competency_groups for select using (true);
create policy competencies_public_read on public.competencies for select using (exists (select 1 from public.competency_roles r where r.id = role_id and r.is_active));
create policy obsolete_public_read on public.obsolete_criteria for select using (is_active);

create policy documents_admin_all on public.documents for all using (public.is_admin()) with check (public.is_admin());
create policy sections_admin_all on public.document_sections for all using (public.is_admin()) with check (public.is_admin());
create policy categories_admin_all on public.categories for all using (public.is_admin()) with check (public.is_admin());
create policy subcategories_admin_all on public.subcategories for all using (public.is_admin()) with check (public.is_admin());
create policy standards_admin_all on public.standards for all using (public.is_admin()) with check (public.is_admin());
create policy details_admin_all on public.standard_details for all using (public.is_admin()) with check (public.is_admin());
create policy roles_admin_all on public.competency_roles for all using (public.is_admin()) with check (public.is_admin());
create policy groups_admin_all on public.competency_groups for all using (public.is_admin()) with check (public.is_admin());
create policy competencies_admin_all on public.competencies for all using (public.is_admin()) with check (public.is_admin());
create policy obsolete_admin_all on public.obsolete_criteria for all using (public.is_admin()) with check (public.is_admin());
create policy audit_admin_read on public.audit_logs for select using (public.is_admin());

revoke all on table public.profiles, public.documents, public.document_sections, public.categories, public.subcategories, public.standards, public.standard_details, public.competency_roles, public.competency_groups, public.competencies, public.obsolete_criteria, public.audit_logs from anon, authenticated;

grant select on table public.documents, public.document_sections, public.categories, public.subcategories, public.standards, public.standard_details, public.competency_roles, public.competency_groups, public.competencies, public.obsolete_criteria to anon;

grant select on table public.profiles, public.documents, public.document_sections, public.categories, public.subcategories, public.standards, public.standard_details, public.competency_roles, public.competency_groups, public.competencies, public.obsolete_criteria to authenticated;
grant insert, update, delete on table public.documents, public.document_sections, public.categories, public.subcategories, public.standards, public.standard_details, public.competency_roles, public.competency_groups, public.competencies, public.obsolete_criteria to authenticated;

revoke all on public.audit_logs from anon, authenticated;
grant select on public.audit_logs to authenticated;
