import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`services_requirements\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_requirements_order_idx\` ON \`services_requirements\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_requirements_parent_id_idx\` ON \`services_requirements\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_requirements_locale_idx\` ON \`services_requirements\` (\`_locale\`);`)
  await db.run(sql`CREATE TABLE \`services_price_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`price_from\` numeric,
  	\`featured\` integer DEFAULT false,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_price_items_order_idx\` ON \`services_price_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_price_items_parent_id_idx\` ON \`services_price_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services_price_items_locales\` (
  	\`name\` text,
  	\`note\` text,
  	\`duration\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services_price_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`services_price_items_locales_locale_parent_id_unique\` ON \`services_price_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`slug\` text,
  	\`order\` numeric DEFAULT 0,
  	\`parent_id\` integer,
  	\`show_in_menu\` integer DEFAULT true,
  	\`icon\` text,
  	\`price_updated_at\` text,
  	\`image_id\` integer,
  	\`seo_og_image_id\` integer,
  	\`en_reviewed\` integer DEFAULT false,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`seo_og_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`services_slug_idx\` ON \`services\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`services_parent_idx\` ON \`services\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_image_idx\` ON \`services\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`services_seo_seo_og_image_idx\` ON \`services\` (\`seo_og_image_id\`);`)
  await db.run(sql`CREATE INDEX \`services_updated_at_idx\` ON \`services\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`services_created_at_idx\` ON \`services\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`services__status_idx\` ON \`services\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`services_locales\` (
  	\`title\` text,
  	\`summary\` text,
  	\`body\` text,
  	\`price_note\` text,
  	\`seo_title\` text,
  	\`seo_description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`services_locales_locale_parent_id_unique\` ON \`services_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_services_v_version_requirements\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_services_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_services_v_version_requirements_order_idx\` ON \`_services_v_version_requirements\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_requirements_parent_id_idx\` ON \`_services_v_version_requirements\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_requirements_locale_idx\` ON \`_services_v_version_requirements\` (\`_locale\`);`)
  await db.run(sql`CREATE TABLE \`_services_v_version_price_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`price_from\` numeric,
  	\`featured\` integer DEFAULT false,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_services_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_services_v_version_price_items_order_idx\` ON \`_services_v_version_price_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_price_items_parent_id_idx\` ON \`_services_v_version_price_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_services_v_version_price_items_locales\` (
  	\`name\` text,
  	\`note\` text,
  	\`duration\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_services_v_version_price_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_services_v_version_price_items_locales_locale_parent_id_uni\` ON \`_services_v_version_price_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_services_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_slug\` text,
  	\`version_order\` numeric DEFAULT 0,
  	\`version_parent_id\` integer,
  	\`version_show_in_menu\` integer DEFAULT true,
  	\`version_icon\` text,
  	\`version_price_updated_at\` text,
  	\`version_image_id\` integer,
  	\`version_seo_og_image_id\` integer,
  	\`version_en_reviewed\` integer DEFAULT false,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`snapshot\` integer,
  	\`published_locale\` text,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_seo_og_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_services_v_parent_idx\` ON \`_services_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_version_slug_idx\` ON \`_services_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_version_parent_idx\` ON \`_services_v\` (\`version_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_version_image_idx\` ON \`_services_v\` (\`version_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_seo_version_seo_og_image_idx\` ON \`_services_v\` (\`version_seo_og_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_version_updated_at_idx\` ON \`_services_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_version_created_at_idx\` ON \`_services_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_version__status_idx\` ON \`_services_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_created_at_idx\` ON \`_services_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_updated_at_idx\` ON \`_services_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_snapshot_idx\` ON \`_services_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_published_locale_idx\` ON \`_services_v\` (\`published_locale\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_latest_idx\` ON \`_services_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`_services_v_locales\` (
  	\`version_title\` text,
  	\`version_summary\` text,
  	\`version_body\` text,
  	\`version_price_note\` text,
  	\`version_seo_title\` text,
  	\`version_seo_description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_services_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_services_v_locales_locale_parent_id_unique\` ON \`_services_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`testimonials\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`company\` text,
  	\`logo_id\` integer,
  	\`consent\` integer DEFAULT false,
  	\`order\` numeric DEFAULT 0,
  	\`en_reviewed\` integer DEFAULT false,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`testimonials_logo_idx\` ON \`testimonials\` (\`logo_id\`);`)
  await db.run(sql`CREATE INDEX \`testimonials_updated_at_idx\` ON \`testimonials\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`testimonials_created_at_idx\` ON \`testimonials\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`testimonials__status_idx\` ON \`testimonials\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`testimonials_locales\` (
  	\`quote\` text,
  	\`role\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`testimonials\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`testimonials_locales_locale_parent_id_unique\` ON \`testimonials_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_testimonials_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_name\` text,
  	\`version_company\` text,
  	\`version_logo_id\` integer,
  	\`version_consent\` integer DEFAULT false,
  	\`version_order\` numeric DEFAULT 0,
  	\`version_en_reviewed\` integer DEFAULT false,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`snapshot\` integer,
  	\`published_locale\` text,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`testimonials\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_testimonials_v_parent_idx\` ON \`_testimonials_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_testimonials_v_version_version_logo_idx\` ON \`_testimonials_v\` (\`version_logo_id\`);`)
  await db.run(sql`CREATE INDEX \`_testimonials_v_version_version_updated_at_idx\` ON \`_testimonials_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_testimonials_v_version_version_created_at_idx\` ON \`_testimonials_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_testimonials_v_version_version__status_idx\` ON \`_testimonials_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_testimonials_v_created_at_idx\` ON \`_testimonials_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_testimonials_v_updated_at_idx\` ON \`_testimonials_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_testimonials_v_snapshot_idx\` ON \`_testimonials_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_testimonials_v_published_locale_idx\` ON \`_testimonials_v\` (\`published_locale\`);`)
  await db.run(sql`CREATE INDEX \`_testimonials_v_latest_idx\` ON \`_testimonials_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`_testimonials_v_locales\` (
  	\`version_quote\` text,
  	\`version_role\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_testimonials_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_testimonials_v_locales_locale_parent_id_unique\` ON \`_testimonials_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`clients\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`logo_id\` integer,
  	\`url\` text,
  	\`order\` numeric DEFAULT 0,
  	\`en_reviewed\` integer DEFAULT false,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`clients_name_idx\` ON \`clients\` (\`name\`);`)
  await db.run(sql`CREATE INDEX \`clients_logo_idx\` ON \`clients\` (\`logo_id\`);`)
  await db.run(sql`CREATE INDEX \`clients_updated_at_idx\` ON \`clients\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`clients_created_at_idx\` ON \`clients\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`clients__status_idx\` ON \`clients\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`_clients_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_name\` text,
  	\`version_logo_id\` integer,
  	\`version_url\` text,
  	\`version_order\` numeric DEFAULT 0,
  	\`version_en_reviewed\` integer DEFAULT false,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`snapshot\` integer,
  	\`published_locale\` text,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`clients\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_clients_v_parent_idx\` ON \`_clients_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_clients_v_version_version_name_idx\` ON \`_clients_v\` (\`version_name\`);`)
  await db.run(sql`CREATE INDEX \`_clients_v_version_version_logo_idx\` ON \`_clients_v\` (\`version_logo_id\`);`)
  await db.run(sql`CREATE INDEX \`_clients_v_version_version_updated_at_idx\` ON \`_clients_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_clients_v_version_version_created_at_idx\` ON \`_clients_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_clients_v_version_version__status_idx\` ON \`_clients_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_clients_v_created_at_idx\` ON \`_clients_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_clients_v_updated_at_idx\` ON \`_clients_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_clients_v_snapshot_idx\` ON \`_clients_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_clients_v_published_locale_idx\` ON \`_clients_v\` (\`published_locale\`);`)
  await db.run(sql`CREATE INDEX \`_clients_v_latest_idx\` ON \`_clients_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`faqs\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`category\` text,
  	\`featured\` integer DEFAULT false,
  	\`order\` numeric DEFAULT 0,
  	\`seed_key\` text,
  	\`en_reviewed\` integer DEFAULT false,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft'
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`faqs_seed_key_idx\` ON \`faqs\` (\`seed_key\`);`)
  await db.run(sql`CREATE INDEX \`faqs_updated_at_idx\` ON \`faqs\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`faqs_created_at_idx\` ON \`faqs\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`faqs__status_idx\` ON \`faqs\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`faqs_locales\` (
  	\`question\` text,
  	\`answer\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`faqs\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`faqs_locales_locale_parent_id_unique\` ON \`faqs_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`faqs_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`services_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`faqs\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`services_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`faqs_rels_order_idx\` ON \`faqs_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`faqs_rels_parent_idx\` ON \`faqs_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`faqs_rels_path_idx\` ON \`faqs_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`faqs_rels_services_id_idx\` ON \`faqs_rels\` (\`services_id\`);`)
  await db.run(sql`CREATE TABLE \`_faqs_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_category\` text,
  	\`version_featured\` integer DEFAULT false,
  	\`version_order\` numeric DEFAULT 0,
  	\`version_seed_key\` text,
  	\`version_en_reviewed\` integer DEFAULT false,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`snapshot\` integer,
  	\`published_locale\` text,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`faqs\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_faqs_v_parent_idx\` ON \`_faqs_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_faqs_v_version_version_seed_key_idx\` ON \`_faqs_v\` (\`version_seed_key\`);`)
  await db.run(sql`CREATE INDEX \`_faqs_v_version_version_updated_at_idx\` ON \`_faqs_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_faqs_v_version_version_created_at_idx\` ON \`_faqs_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_faqs_v_version_version__status_idx\` ON \`_faqs_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_faqs_v_created_at_idx\` ON \`_faqs_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_faqs_v_updated_at_idx\` ON \`_faqs_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_faqs_v_snapshot_idx\` ON \`_faqs_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_faqs_v_published_locale_idx\` ON \`_faqs_v\` (\`published_locale\`);`)
  await db.run(sql`CREATE INDEX \`_faqs_v_latest_idx\` ON \`_faqs_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`_faqs_v_locales\` (
  	\`version_question\` text,
  	\`version_answer\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_faqs_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_faqs_v_locales_locale_parent_id_unique\` ON \`_faqs_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_faqs_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`services_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_faqs_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`services_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_faqs_v_rels_order_idx\` ON \`_faqs_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_faqs_v_rels_parent_idx\` ON \`_faqs_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_faqs_v_rels_path_idx\` ON \`_faqs_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_faqs_v_rels_services_id_idx\` ON \`_faqs_v_rels\` (\`services_id\`);`)
  await db.run(sql`CREATE TABLE \`posts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`slug\` text,
  	\`category\` text,
  	\`cover_id\` integer,
  	\`published_at\` text,
  	\`seo_og_image_id\` integer,
  	\`en_reviewed\` integer DEFAULT false,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`cover_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`seo_og_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_slug_idx\` ON \`posts\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`posts_cover_idx\` ON \`posts\` (\`cover_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_seo_seo_og_image_idx\` ON \`posts\` (\`seo_og_image_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_updated_at_idx\` ON \`posts\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`posts_created_at_idx\` ON \`posts\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`posts__status_idx\` ON \`posts\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`posts_locales\` (
  	\`title\` text,
  	\`excerpt\` text,
  	\`body\` text,
  	\`seo_title\` text,
  	\`seo_description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_locales_locale_parent_id_unique\` ON \`posts_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_slug\` text,
  	\`version_category\` text,
  	\`version_cover_id\` integer,
  	\`version_published_at\` text,
  	\`version_seo_og_image_id\` integer,
  	\`version_en_reviewed\` integer DEFAULT false,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`snapshot\` integer,
  	\`published_locale\` text,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_cover_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_seo_og_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_parent_idx\` ON \`_posts_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_slug_idx\` ON \`_posts_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_cover_idx\` ON \`_posts_v\` (\`version_cover_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_seo_version_seo_og_image_idx\` ON \`_posts_v\` (\`version_seo_og_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_updated_at_idx\` ON \`_posts_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_created_at_idx\` ON \`_posts_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version__status_idx\` ON \`_posts_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_created_at_idx\` ON \`_posts_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_updated_at_idx\` ON \`_posts_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_snapshot_idx\` ON \`_posts_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_published_locale_idx\` ON \`_posts_v\` (\`published_locale\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_latest_idx\` ON \`_posts_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_locales\` (
  	\`version_title\` text,
  	\`version_excerpt\` text,
  	\`version_body\` text,
  	\`version_seo_title\` text,
  	\`version_seo_description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_posts_v_locales_locale_parent_id_unique\` ON \`_posts_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`regulations_attachments\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`file_id\` integer,
  	FOREIGN KEY (\`file_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`regulations\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`regulations_attachments_order_idx\` ON \`regulations_attachments\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`regulations_attachments_parent_id_idx\` ON \`regulations_attachments\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`regulations_attachments_file_idx\` ON \`regulations_attachments\` (\`file_id\`);`)
  await db.run(sql`CREATE TABLE \`regulations_attachments_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`regulations_attachments\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`regulations_attachments_locales_locale_parent_id_unique\` ON \`regulations_attachments_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`regulations\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`slug\` text,
  	\`category\` text,
  	\`number\` text,
  	\`issued_at\` text,
  	\`en_reviewed\` integer DEFAULT false,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft'
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`regulations_slug_idx\` ON \`regulations\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`regulations_updated_at_idx\` ON \`regulations\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`regulations_created_at_idx\` ON \`regulations\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`regulations__status_idx\` ON \`regulations\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`regulations_locales\` (
  	\`title\` text,
  	\`summary\` text,
  	\`body\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`regulations\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`regulations_locales_locale_parent_id_unique\` ON \`regulations_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_regulations_v_version_attachments\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`file_id\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`file_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_regulations_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_regulations_v_version_attachments_order_idx\` ON \`_regulations_v_version_attachments\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_regulations_v_version_attachments_parent_id_idx\` ON \`_regulations_v_version_attachments\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_regulations_v_version_attachments_file_idx\` ON \`_regulations_v_version_attachments\` (\`file_id\`);`)
  await db.run(sql`CREATE TABLE \`_regulations_v_version_attachments_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_regulations_v_version_attachments\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_regulations_v_version_attachments_locales_locale_parent_id_\` ON \`_regulations_v_version_attachments_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_regulations_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_slug\` text,
  	\`version_category\` text,
  	\`version_number\` text,
  	\`version_issued_at\` text,
  	\`version_en_reviewed\` integer DEFAULT false,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`snapshot\` integer,
  	\`published_locale\` text,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`regulations\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_regulations_v_parent_idx\` ON \`_regulations_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_regulations_v_version_version_slug_idx\` ON \`_regulations_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_regulations_v_version_version_updated_at_idx\` ON \`_regulations_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_regulations_v_version_version_created_at_idx\` ON \`_regulations_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_regulations_v_version_version__status_idx\` ON \`_regulations_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_regulations_v_created_at_idx\` ON \`_regulations_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_regulations_v_updated_at_idx\` ON \`_regulations_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_regulations_v_snapshot_idx\` ON \`_regulations_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_regulations_v_published_locale_idx\` ON \`_regulations_v\` (\`published_locale\`);`)
  await db.run(sql`CREATE INDEX \`_regulations_v_latest_idx\` ON \`_regulations_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`_regulations_v_locales\` (
  	\`version_title\` text,
  	\`version_summary\` text,
  	\`version_body\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_regulations_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_regulations_v_locales_locale_parent_id_unique\` ON \`_regulations_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`media\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`seed_key\` text,
  	\`en_reviewed\` integer DEFAULT false,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric,
  	\`focal_x\` numeric,
  	\`focal_y\` numeric,
  	\`sizes_thumb_url\` text,
  	\`sizes_thumb_width\` numeric,
  	\`sizes_thumb_height\` numeric,
  	\`sizes_thumb_mime_type\` text,
  	\`sizes_thumb_filesize\` numeric,
  	\`sizes_thumb_filename\` text,
  	\`sizes_card_url\` text,
  	\`sizes_card_width\` numeric,
  	\`sizes_card_height\` numeric,
  	\`sizes_card_mime_type\` text,
  	\`sizes_card_filesize\` numeric,
  	\`sizes_card_filename\` text,
  	\`sizes_hero_url\` text,
  	\`sizes_hero_width\` numeric,
  	\`sizes_hero_height\` numeric,
  	\`sizes_hero_mime_type\` text,
  	\`sizes_hero_filesize\` numeric,
  	\`sizes_hero_filename\` text,
  	\`sizes_og_url\` text,
  	\`sizes_og_width\` numeric,
  	\`sizes_og_height\` numeric,
  	\`sizes_og_mime_type\` text,
  	\`sizes_og_filesize\` numeric,
  	\`sizes_og_filename\` text
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`media_seed_key_idx\` ON \`media\` (\`seed_key\`);`)
  await db.run(sql`CREATE INDEX \`media_updated_at_idx\` ON \`media\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`media_created_at_idx\` ON \`media\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`media__status_idx\` ON \`media\` (\`_status\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`media_filename_idx\` ON \`media\` (\`filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_thumb_sizes_thumb_filename_idx\` ON \`media\` (\`sizes_thumb_filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_card_sizes_card_filename_idx\` ON \`media\` (\`sizes_card_filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_hero_sizes_hero_filename_idx\` ON \`media\` (\`sizes_hero_filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_og_sizes_og_filename_idx\` ON \`media\` (\`sizes_og_filename\`);`)
  await db.run(sql`CREATE TABLE \`media_locales\` (
  	\`alt\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`media_locales_locale_parent_id_unique\` ON \`media_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_media_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_seed_key\` text,
  	\`version_en_reviewed\` integer DEFAULT false,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`version_url\` text,
  	\`version_thumbnail_u_r_l\` text,
  	\`version_filename\` text,
  	\`version_mime_type\` text,
  	\`version_filesize\` numeric,
  	\`version_width\` numeric,
  	\`version_height\` numeric,
  	\`version_focal_x\` numeric,
  	\`version_focal_y\` numeric,
  	\`version_sizes_thumb_url\` text,
  	\`version_sizes_thumb_width\` numeric,
  	\`version_sizes_thumb_height\` numeric,
  	\`version_sizes_thumb_mime_type\` text,
  	\`version_sizes_thumb_filesize\` numeric,
  	\`version_sizes_thumb_filename\` text,
  	\`version_sizes_card_url\` text,
  	\`version_sizes_card_width\` numeric,
  	\`version_sizes_card_height\` numeric,
  	\`version_sizes_card_mime_type\` text,
  	\`version_sizes_card_filesize\` numeric,
  	\`version_sizes_card_filename\` text,
  	\`version_sizes_hero_url\` text,
  	\`version_sizes_hero_width\` numeric,
  	\`version_sizes_hero_height\` numeric,
  	\`version_sizes_hero_mime_type\` text,
  	\`version_sizes_hero_filesize\` numeric,
  	\`version_sizes_hero_filename\` text,
  	\`version_sizes_og_url\` text,
  	\`version_sizes_og_width\` numeric,
  	\`version_sizes_og_height\` numeric,
  	\`version_sizes_og_mime_type\` text,
  	\`version_sizes_og_filesize\` numeric,
  	\`version_sizes_og_filename\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`snapshot\` integer,
  	\`published_locale\` text,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_media_v_parent_idx\` ON \`_media_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_media_v_version_version_seed_key_idx\` ON \`_media_v\` (\`version_seed_key\`);`)
  await db.run(sql`CREATE INDEX \`_media_v_version_version_updated_at_idx\` ON \`_media_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_media_v_version_version_created_at_idx\` ON \`_media_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_media_v_version_version__status_idx\` ON \`_media_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_media_v_version_version_filename_idx\` ON \`_media_v\` (\`version_filename\`);`)
  await db.run(sql`CREATE INDEX \`_media_v_version_sizes_thumb_version_sizes_thumb_filenam_idx\` ON \`_media_v\` (\`version_sizes_thumb_filename\`);`)
  await db.run(sql`CREATE INDEX \`_media_v_version_sizes_card_version_sizes_card_filename_idx\` ON \`_media_v\` (\`version_sizes_card_filename\`);`)
  await db.run(sql`CREATE INDEX \`_media_v_version_sizes_hero_version_sizes_hero_filename_idx\` ON \`_media_v\` (\`version_sizes_hero_filename\`);`)
  await db.run(sql`CREATE INDEX \`_media_v_version_sizes_og_version_sizes_og_filename_idx\` ON \`_media_v\` (\`version_sizes_og_filename\`);`)
  await db.run(sql`CREATE INDEX \`_media_v_created_at_idx\` ON \`_media_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_media_v_updated_at_idx\` ON \`_media_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_media_v_snapshot_idx\` ON \`_media_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_media_v_published_locale_idx\` ON \`_media_v\` (\`published_locale\`);`)
  await db.run(sql`CREATE INDEX \`_media_v_latest_idx\` ON \`_media_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`_media_v_locales\` (
  	\`version_alt\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_media_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_media_v_locales_locale_parent_id_unique\` ON \`_media_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`inquiries\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`company\` text,
  	\`email\` text,
  	\`whatsapp\` text NOT NULL,
  	\`service_id\` integer NOT NULL,
  	\`message\` text NOT NULL,
  	\`locale\` text NOT NULL,
  	\`variant\` text DEFAULT 'full' NOT NULL,
  	\`status\` text DEFAULT 'baru' NOT NULL,
  	\`email_status\` text DEFAULT 'pending' NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`service_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`inquiries_service_idx\` ON \`inquiries\` (\`service_id\`);`)
  await db.run(sql`CREATE INDEX \`inquiries_updated_at_idx\` ON \`inquiries\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`inquiries_created_at_idx\` ON \`inquiries\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`users_sessions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`created_at\` text,
  	\`expires_at\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`users_sessions_order_idx\` ON \`users_sessions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`users_sessions_parent_id_idx\` ON \`users_sessions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`users\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`role\` text DEFAULT 'editor' NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`email\` text NOT NULL,
  	\`reset_password_token\` text,
  	\`reset_password_expiration\` text,
  	\`salt\` text,
  	\`hash\` text,
  	\`reset_password_requested_at\` text,
  	\`login_attempts\` numeric DEFAULT 0,
  	\`lock_until\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`users_updated_at_idx\` ON \`users\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`users_created_at_idx\` ON \`users\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`users_email_idx\` ON \`users\` (\`email\`);`)
  await db.run(sql`CREATE TABLE \`payload_kv\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text NOT NULL,
  	\`data\` text NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`payload_kv_key_idx\` ON \`payload_kv\` (\`key\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`global_slug\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_global_slug_idx\` ON \`payload_locked_documents\` (\`global_slug\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_updated_at_idx\` ON \`payload_locked_documents\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_created_at_idx\` ON \`payload_locked_documents\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`services_id\` integer,
  	\`testimonials_id\` integer,
  	\`clients_id\` integer,
  	\`faqs_id\` integer,
  	\`posts_id\` integer,
  	\`regulations_id\` integer,
  	\`media_id\` integer,
  	\`inquiries_id\` integer,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`services_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`testimonials_id\`) REFERENCES \`testimonials\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`clients_id\`) REFERENCES \`clients\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`faqs_id\`) REFERENCES \`faqs\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`regulations_id\`) REFERENCES \`regulations\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`inquiries_id\`) REFERENCES \`inquiries\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_services_id_idx\` ON \`payload_locked_documents_rels\` (\`services_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_testimonials_id_idx\` ON \`payload_locked_documents_rels\` (\`testimonials_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_clients_id_idx\` ON \`payload_locked_documents_rels\` (\`clients_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_faqs_id_idx\` ON \`payload_locked_documents_rels\` (\`faqs_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_posts_id_idx\` ON \`payload_locked_documents_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_regulations_id_idx\` ON \`payload_locked_documents_rels\` (\`regulations_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_inquiries_id_idx\` ON \`payload_locked_documents_rels\` (\`inquiries_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text,
  	\`value\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_key_idx\` ON \`payload_preferences\` (\`key\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_updated_at_idx\` ON \`payload_preferences\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_created_at_idx\` ON \`payload_preferences\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_preferences\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_order_idx\` ON \`payload_preferences_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_parent_idx\` ON \`payload_preferences_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_path_idx\` ON \`payload_preferences_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_users_id_idx\` ON \`payload_preferences_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_migrations\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`batch\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_migrations_updated_at_idx\` ON \`payload_migrations\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_migrations_created_at_idx\` ON \`payload_migrations\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`site_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_stats_order_idx\` ON \`site_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_stats_parent_id_idx\` ON \`site_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_stats_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_stats\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`site_stats_locales_locale_parent_id_unique\` ON \`site_stats_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_social\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`platform\` text,
  	\`url\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_social_order_idx\` ON \`site_social\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_social_parent_id_idx\` ON \`site_social\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`phone\` text,
  	\`whatsapp\` text,
  	\`email\` text,
  	\`maps_url\` text,
  	\`seo_default_og_image_id\` integer,
  	\`_status\` text DEFAULT 'draft',
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`seo_default_og_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`site_seo_default_seo_default_og_image_idx\` ON \`site\` (\`seo_default_og_image_id\`);`)
  await db.run(sql`CREATE INDEX \`site__status_idx\` ON \`site\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`site_locales\` (
  	\`whatsapp_default_message\` text,
  	\`address\` text,
  	\`seo_default_title\` text,
  	\`seo_default_description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`site_locales_locale_parent_id_unique\` ON \`site_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_v_version_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`value\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_site_v_version_stats_order_idx\` ON \`_site_v_version_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_site_v_version_stats_parent_id_idx\` ON \`_site_v_version_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_v_version_stats_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_v_version_stats\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_site_v_version_stats_locales_locale_parent_id_unique\` ON \`_site_v_version_stats_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_v_version_social\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`platform\` text,
  	\`url\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_site_v_version_social_order_idx\` ON \`_site_v_version_social\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_site_v_version_social_parent_id_idx\` ON \`_site_v_version_social\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_phone\` text,
  	\`version_whatsapp\` text,
  	\`version_email\` text,
  	\`version_maps_url\` text,
  	\`version_seo_default_og_image_id\` integer,
  	\`version__status\` text DEFAULT 'draft',
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`snapshot\` integer,
  	\`published_locale\` text,
  	\`latest\` integer,
  	FOREIGN KEY (\`version_seo_default_og_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_site_v_version_seo_default_version_seo_default_og_image_idx\` ON \`_site_v\` (\`version_seo_default_og_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_site_v_version_version__status_idx\` ON \`_site_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_site_v_created_at_idx\` ON \`_site_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_site_v_updated_at_idx\` ON \`_site_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_site_v_snapshot_idx\` ON \`_site_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_site_v_published_locale_idx\` ON \`_site_v\` (\`published_locale\`);`)
  await db.run(sql`CREATE INDEX \`_site_v_latest_idx\` ON \`_site_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`_site_v_locales\` (
  	\`version_whatsapp_default_message\` text,
  	\`version_address\` text,
  	\`version_seo_default_title\` text,
  	\`version_seo_default_description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_site_v_locales_locale_parent_id_unique\` ON \`_site_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_why\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`icon\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_why_order_idx\` ON \`home_why\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_why_parent_id_idx\` ON \`home_why\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_why_locales\` (
  	\`title\` text,
  	\`text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_why\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`home_why_locales_locale_parent_id_unique\` ON \`home_why_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_network_cities\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`lat\` numeric,
  	\`lng\` numeric,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_network_cities_order_idx\` ON \`home_network_cities\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_network_cities_parent_id_idx\` ON \`home_network_cities\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`seo_og_image_id\` integer,
  	\`hero_image_id\` integer,
  	\`hero_primary_cta_href\` text,
  	\`hero_secondary_cta_href\` text,
  	\`founder_photo_id\` integer,
  	\`founder_name\` text,
  	\`sections_visible_hero\` integer DEFAULT true,
  	\`sections_visible_clients\` integer DEFAULT true,
  	\`sections_visible_services\` integer DEFAULT true,
  	\`sections_visible_why\` integer DEFAULT true,
  	\`sections_visible_garis\` integer DEFAULT true,
  	\`sections_visible_network\` integer DEFAULT true,
  	\`sections_visible_founder\` integer DEFAULT true,
  	\`sections_visible_testimonials\` integer DEFAULT true,
  	\`sections_visible_faq\` integer DEFAULT true,
  	\`sections_visible_news\` integer DEFAULT true,
  	\`sections_visible_contact_cta\` integer DEFAULT true,
  	\`_status\` text DEFAULT 'draft',
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`seo_og_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`founder_photo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`home_seo_seo_og_image_idx\` ON \`home\` (\`seo_og_image_id\`);`)
  await db.run(sql`CREATE INDEX \`home_hero_hero_image_idx\` ON \`home\` (\`hero_image_id\`);`)
  await db.run(sql`CREATE INDEX \`home_founder_founder_photo_idx\` ON \`home\` (\`founder_photo_id\`);`)
  await db.run(sql`CREATE INDEX \`home__status_idx\` ON \`home\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`home_locales\` (
  	\`intro\` text,
  	\`seo_title\` text,
  	\`seo_description\` text,
  	\`hero_eyebrow\` text,
  	\`hero_headline\` text,
  	\`hero_highlight\` text,
  	\`hero_lead\` text,
  	\`hero_primary_cta_label\` text,
  	\`hero_secondary_cta_label\` text,
  	\`network_title\` text,
  	\`network_text\` text,
  	\`founder_quote\` text,
  	\`founder_role\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`home_locales_locale_parent_id_unique\` ON \`home_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_home_v_version_why\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`icon\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_home_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_home_v_version_why_order_idx\` ON \`_home_v_version_why\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_home_v_version_why_parent_id_idx\` ON \`_home_v_version_why\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_home_v_version_why_locales\` (
  	\`title\` text,
  	\`text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_home_v_version_why\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_home_v_version_why_locales_locale_parent_id_unique\` ON \`_home_v_version_why_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_home_v_version_network_cities\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`lat\` numeric,
  	\`lng\` numeric,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_home_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_home_v_version_network_cities_order_idx\` ON \`_home_v_version_network_cities\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_home_v_version_network_cities_parent_id_idx\` ON \`_home_v_version_network_cities\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_home_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_seo_og_image_id\` integer,
  	\`version_hero_image_id\` integer,
  	\`version_hero_primary_cta_href\` text,
  	\`version_hero_secondary_cta_href\` text,
  	\`version_founder_photo_id\` integer,
  	\`version_founder_name\` text,
  	\`version_sections_visible_hero\` integer DEFAULT true,
  	\`version_sections_visible_clients\` integer DEFAULT true,
  	\`version_sections_visible_services\` integer DEFAULT true,
  	\`version_sections_visible_why\` integer DEFAULT true,
  	\`version_sections_visible_garis\` integer DEFAULT true,
  	\`version_sections_visible_network\` integer DEFAULT true,
  	\`version_sections_visible_founder\` integer DEFAULT true,
  	\`version_sections_visible_testimonials\` integer DEFAULT true,
  	\`version_sections_visible_faq\` integer DEFAULT true,
  	\`version_sections_visible_news\` integer DEFAULT true,
  	\`version_sections_visible_contact_cta\` integer DEFAULT true,
  	\`version__status\` text DEFAULT 'draft',
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`snapshot\` integer,
  	\`published_locale\` text,
  	\`latest\` integer,
  	FOREIGN KEY (\`version_seo_og_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_founder_photo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_home_v_version_seo_version_seo_og_image_idx\` ON \`_home_v\` (\`version_seo_og_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_home_v_version_hero_version_hero_image_idx\` ON \`_home_v\` (\`version_hero_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_home_v_version_founder_version_founder_photo_idx\` ON \`_home_v\` (\`version_founder_photo_id\`);`)
  await db.run(sql`CREATE INDEX \`_home_v_version_version__status_idx\` ON \`_home_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_home_v_created_at_idx\` ON \`_home_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_home_v_updated_at_idx\` ON \`_home_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_home_v_snapshot_idx\` ON \`_home_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_home_v_published_locale_idx\` ON \`_home_v\` (\`published_locale\`);`)
  await db.run(sql`CREATE INDEX \`_home_v_latest_idx\` ON \`_home_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`_home_v_locales\` (
  	\`version_intro\` text,
  	\`version_seo_title\` text,
  	\`version_seo_description\` text,
  	\`version_hero_eyebrow\` text,
  	\`version_hero_headline\` text,
  	\`version_hero_highlight\` text,
  	\`version_hero_lead\` text,
  	\`version_hero_primary_cta_label\` text,
  	\`version_hero_secondary_cta_label\` text,
  	\`version_network_title\` text,
  	\`version_network_text\` text,
  	\`version_founder_quote\` text,
  	\`version_founder_role\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_home_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_home_v_locales_locale_parent_id_unique\` ON \`_home_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`about_mission\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`about\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`about_mission_order_idx\` ON \`about_mission\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`about_mission_parent_id_idx\` ON \`about_mission\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`about_mission_locale_idx\` ON \`about_mission\` (\`_locale\`);`)
  await db.run(sql`CREATE TABLE \`about_values\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`about\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`about_values_order_idx\` ON \`about_values\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`about_values_parent_id_idx\` ON \`about_values\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`about_values_locales\` (
  	\`title\` text,
  	\`text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`about_values\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`about_values_locales_locale_parent_id_unique\` ON \`about_values_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`about_organigram\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`parent_index\` numeric,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`about\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`about_organigram_order_idx\` ON \`about_organigram\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`about_organigram_parent_id_idx\` ON \`about_organigram\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`about_organigram_locales\` (
  	\`role\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`about_organigram\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`about_organigram_locales_locale_parent_id_unique\` ON \`about_organigram_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`about\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`seo_og_image_id\` integer,
  	\`_status\` text DEFAULT 'draft',
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`seo_og_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`about_seo_seo_og_image_idx\` ON \`about\` (\`seo_og_image_id\`);`)
  await db.run(sql`CREATE INDEX \`about__status_idx\` ON \`about\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`about_locales\` (
  	\`intro\` text,
  	\`seo_title\` text,
  	\`seo_description\` text,
  	\`greeting\` text,
  	\`profile\` text,
  	\`vision\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`about\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`about_locales_locale_parent_id_unique\` ON \`about_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_about_v_version_mission\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_about_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_about_v_version_mission_order_idx\` ON \`_about_v_version_mission\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_about_v_version_mission_parent_id_idx\` ON \`_about_v_version_mission\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_about_v_version_mission_locale_idx\` ON \`_about_v_version_mission\` (\`_locale\`);`)
  await db.run(sql`CREATE TABLE \`_about_v_version_values\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_about_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_about_v_version_values_order_idx\` ON \`_about_v_version_values\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_about_v_version_values_parent_id_idx\` ON \`_about_v_version_values\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_about_v_version_values_locales\` (
  	\`title\` text,
  	\`text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_about_v_version_values\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_about_v_version_values_locales_locale_parent_id_unique\` ON \`_about_v_version_values_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_about_v_version_organigram\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`parent_index\` numeric,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_about_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_about_v_version_organigram_order_idx\` ON \`_about_v_version_organigram\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_about_v_version_organigram_parent_id_idx\` ON \`_about_v_version_organigram\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_about_v_version_organigram_locales\` (
  	\`role\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_about_v_version_organigram\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_about_v_version_organigram_locales_locale_parent_id_unique\` ON \`_about_v_version_organigram_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_about_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_seo_og_image_id\` integer,
  	\`version__status\` text DEFAULT 'draft',
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`snapshot\` integer,
  	\`published_locale\` text,
  	\`latest\` integer,
  	FOREIGN KEY (\`version_seo_og_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_about_v_version_seo_version_seo_og_image_idx\` ON \`_about_v\` (\`version_seo_og_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_about_v_version_version__status_idx\` ON \`_about_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_about_v_created_at_idx\` ON \`_about_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_about_v_updated_at_idx\` ON \`_about_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_about_v_snapshot_idx\` ON \`_about_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_about_v_published_locale_idx\` ON \`_about_v\` (\`published_locale\`);`)
  await db.run(sql`CREATE INDEX \`_about_v_latest_idx\` ON \`_about_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`_about_v_locales\` (
  	\`version_intro\` text,
  	\`version_seo_title\` text,
  	\`version_seo_description\` text,
  	\`version_greeting\` text,
  	\`version_profile\` text,
  	\`version_vision\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_about_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_about_v_locales_locale_parent_id_unique\` ON \`_about_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`garis_variants\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`image_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`garis\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`garis_variants_order_idx\` ON \`garis_variants\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`garis_variants_parent_id_idx\` ON \`garis_variants\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`garis_variants_image_idx\` ON \`garis_variants\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`garis_variants_locales\` (
  	\`text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`garis_variants\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`garis_variants_locales_locale_parent_id_unique\` ON \`garis_variants_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`garis_features\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`garis\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`garis_features_order_idx\` ON \`garis_features\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`garis_features_parent_id_idx\` ON \`garis_features\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`garis_features_locales\` (
  	\`title\` text,
  	\`text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`garis_features\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`garis_features_locales_locale_parent_id_unique\` ON \`garis_features_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`garis_gallery\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`garis\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`garis_gallery_order_idx\` ON \`garis_gallery\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`garis_gallery_parent_id_idx\` ON \`garis_gallery\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`garis_gallery_image_idx\` ON \`garis_gallery\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`garis\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`enabled\` integer DEFAULT false,
  	\`login_url\` text,
  	\`trial_url\` text,
  	\`seo_og_image_id\` integer,
  	\`logo_id\` integer,
  	\`_status\` text DEFAULT 'draft',
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`seo_og_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`garis_seo_seo_og_image_idx\` ON \`garis\` (\`seo_og_image_id\`);`)
  await db.run(sql`CREATE INDEX \`garis_logo_idx\` ON \`garis\` (\`logo_id\`);`)
  await db.run(sql`CREATE INDEX \`garis__status_idx\` ON \`garis\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`garis_locales\` (
  	\`intro\` text,
  	\`seo_title\` text,
  	\`seo_description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`garis\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`garis_locales_locale_parent_id_unique\` ON \`garis_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_garis_v_version_variants\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`image_id\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_garis_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_garis_v_version_variants_order_idx\` ON \`_garis_v_version_variants\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_garis_v_version_variants_parent_id_idx\` ON \`_garis_v_version_variants\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_garis_v_version_variants_image_idx\` ON \`_garis_v_version_variants\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_garis_v_version_variants_locales\` (
  	\`text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_garis_v_version_variants\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_garis_v_version_variants_locales_locale_parent_id_unique\` ON \`_garis_v_version_variants_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_garis_v_version_features\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_garis_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_garis_v_version_features_order_idx\` ON \`_garis_v_version_features\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_garis_v_version_features_parent_id_idx\` ON \`_garis_v_version_features\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_garis_v_version_features_locales\` (
  	\`title\` text,
  	\`text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_garis_v_version_features\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_garis_v_version_features_locales_locale_parent_id_unique\` ON \`_garis_v_version_features_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_garis_v_version_gallery\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_garis_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_garis_v_version_gallery_order_idx\` ON \`_garis_v_version_gallery\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_garis_v_version_gallery_parent_id_idx\` ON \`_garis_v_version_gallery\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_garis_v_version_gallery_image_idx\` ON \`_garis_v_version_gallery\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_garis_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_enabled\` integer DEFAULT false,
  	\`version_login_url\` text,
  	\`version_trial_url\` text,
  	\`version_seo_og_image_id\` integer,
  	\`version_logo_id\` integer,
  	\`version__status\` text DEFAULT 'draft',
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`snapshot\` integer,
  	\`published_locale\` text,
  	\`latest\` integer,
  	FOREIGN KEY (\`version_seo_og_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_garis_v_version_seo_version_seo_og_image_idx\` ON \`_garis_v\` (\`version_seo_og_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_garis_v_version_version_logo_idx\` ON \`_garis_v\` (\`version_logo_id\`);`)
  await db.run(sql`CREATE INDEX \`_garis_v_version_version__status_idx\` ON \`_garis_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_garis_v_created_at_idx\` ON \`_garis_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_garis_v_updated_at_idx\` ON \`_garis_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_garis_v_snapshot_idx\` ON \`_garis_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_garis_v_published_locale_idx\` ON \`_garis_v\` (\`published_locale\`);`)
  await db.run(sql`CREATE INDEX \`_garis_v_latest_idx\` ON \`_garis_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`_garis_v_locales\` (
  	\`version_intro\` text,
  	\`version_seo_title\` text,
  	\`version_seo_description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_garis_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_garis_v_locales_locale_parent_id_unique\` ON \`_garis_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`ui\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`pages_services_seo_og_image_id\` integer,
  	\`pages_regulations_seo_og_image_id\` integer,
  	\`pages_news_seo_og_image_id\` integer,
  	\`pages_contact_seo_og_image_id\` integer,
  	\`_status\` text DEFAULT 'draft',
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`pages_services_seo_og_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`pages_regulations_seo_og_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`pages_news_seo_og_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`pages_contact_seo_og_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`ui_pages_services_seo_pages_services_seo_og_image_idx\` ON \`ui\` (\`pages_services_seo_og_image_id\`);`)
  await db.run(sql`CREATE INDEX \`ui_pages_regulations_seo_pages_regulations_seo_og_image_idx\` ON \`ui\` (\`pages_regulations_seo_og_image_id\`);`)
  await db.run(sql`CREATE INDEX \`ui_pages_news_seo_pages_news_seo_og_image_idx\` ON \`ui\` (\`pages_news_seo_og_image_id\`);`)
  await db.run(sql`CREATE INDEX \`ui_pages_contact_seo_pages_contact_seo_og_image_idx\` ON \`ui\` (\`pages_contact_seo_og_image_id\`);`)
  await db.run(sql`CREATE INDEX \`ui__status_idx\` ON \`ui\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`ui_locales\` (
  	\`nav_home\` text,
  	\`nav_about\` text,
  	\`nav_services\` text,
  	\`nav_garis\` text,
  	\`nav_regulations\` text,
  	\`nav_news\` text,
  	\`nav_contact\` text,
  	\`cta_consult\` text,
  	\`cta_view_services\` text,
  	\`cta_more\` text,
  	\`cta_read\` text,
  	\`cta_whatsapp\` text,
  	\`cta_ask_whatsapp\` text,
  	\`cta_send\` text,
  	\`cta_download\` text,
  	\`cta_coming_soon\` text,
  	\`form_name\` text,
  	\`form_company\` text,
  	\`form_email\` text,
  	\`form_whatsapp\` text,
  	\`form_service\` text,
  	\`form_message\` text,
  	\`form_error_email\` text,
  	\`form_error_required\` text,
  	\`form_success\` text,
  	\`price_service\` text,
  	\`price_duration\` text,
  	\`price_from\` text,
  	\`price_contact\` text,
  	\`price_note\` text,
  	\`sections_services\` text,
  	\`sections_why\` text,
  	\`sections_clients\` text,
  	\`sections_testimonials\` text,
  	\`sections_faq\` text,
  	\`sections_news\` text,
  	\`lang_label\` text,
  	\`pages_services_intro\` text,
  	\`pages_services_seo_title\` text,
  	\`pages_services_seo_description\` text,
  	\`pages_regulations_intro\` text,
  	\`pages_regulations_seo_title\` text,
  	\`pages_regulations_seo_description\` text,
  	\`pages_news_intro\` text,
  	\`pages_news_seo_title\` text,
  	\`pages_news_seo_description\` text,
  	\`pages_contact_intro\` text,
  	\`pages_contact_seo_title\` text,
  	\`pages_contact_seo_description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`ui\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`ui_locales_locale_parent_id_unique\` ON \`ui_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_ui_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_pages_services_seo_og_image_id\` integer,
  	\`version_pages_regulations_seo_og_image_id\` integer,
  	\`version_pages_news_seo_og_image_id\` integer,
  	\`version_pages_contact_seo_og_image_id\` integer,
  	\`version__status\` text DEFAULT 'draft',
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`snapshot\` integer,
  	\`published_locale\` text,
  	\`latest\` integer,
  	FOREIGN KEY (\`version_pages_services_seo_og_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_pages_regulations_seo_og_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_pages_news_seo_og_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_pages_contact_seo_og_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_ui_v_version_pages_services_seo_version_pages_services__idx\` ON \`_ui_v\` (\`version_pages_services_seo_og_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_ui_v_version_pages_regulations_seo_version_pages_regula_idx\` ON \`_ui_v\` (\`version_pages_regulations_seo_og_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_ui_v_version_pages_news_seo_version_pages_news_seo_og_i_idx\` ON \`_ui_v\` (\`version_pages_news_seo_og_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_ui_v_version_pages_contact_seo_version_pages_contact_se_idx\` ON \`_ui_v\` (\`version_pages_contact_seo_og_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_ui_v_version_version__status_idx\` ON \`_ui_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_ui_v_created_at_idx\` ON \`_ui_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_ui_v_updated_at_idx\` ON \`_ui_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_ui_v_snapshot_idx\` ON \`_ui_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_ui_v_published_locale_idx\` ON \`_ui_v\` (\`published_locale\`);`)
  await db.run(sql`CREATE INDEX \`_ui_v_latest_idx\` ON \`_ui_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`_ui_v_locales\` (
  	\`version_nav_home\` text,
  	\`version_nav_about\` text,
  	\`version_nav_services\` text,
  	\`version_nav_garis\` text,
  	\`version_nav_regulations\` text,
  	\`version_nav_news\` text,
  	\`version_nav_contact\` text,
  	\`version_cta_consult\` text,
  	\`version_cta_view_services\` text,
  	\`version_cta_more\` text,
  	\`version_cta_read\` text,
  	\`version_cta_whatsapp\` text,
  	\`version_cta_ask_whatsapp\` text,
  	\`version_cta_send\` text,
  	\`version_cta_download\` text,
  	\`version_cta_coming_soon\` text,
  	\`version_form_name\` text,
  	\`version_form_company\` text,
  	\`version_form_email\` text,
  	\`version_form_whatsapp\` text,
  	\`version_form_service\` text,
  	\`version_form_message\` text,
  	\`version_form_error_email\` text,
  	\`version_form_error_required\` text,
  	\`version_form_success\` text,
  	\`version_price_service\` text,
  	\`version_price_duration\` text,
  	\`version_price_from\` text,
  	\`version_price_contact\` text,
  	\`version_price_note\` text,
  	\`version_sections_services\` text,
  	\`version_sections_why\` text,
  	\`version_sections_clients\` text,
  	\`version_sections_testimonials\` text,
  	\`version_sections_faq\` text,
  	\`version_sections_news\` text,
  	\`version_lang_label\` text,
  	\`version_pages_services_intro\` text,
  	\`version_pages_services_seo_title\` text,
  	\`version_pages_services_seo_description\` text,
  	\`version_pages_regulations_intro\` text,
  	\`version_pages_regulations_seo_title\` text,
  	\`version_pages_regulations_seo_description\` text,
  	\`version_pages_news_intro\` text,
  	\`version_pages_news_seo_title\` text,
  	\`version_pages_news_seo_description\` text,
  	\`version_pages_contact_intro\` text,
  	\`version_pages_contact_seo_title\` text,
  	\`version_pages_contact_seo_description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_ui_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_ui_v_locales_locale_parent_id_unique\` ON \`_ui_v_locales\` (\`_locale\`,\`_parent_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`services_requirements\`;`)
  await db.run(sql`DROP TABLE \`services_price_items\`;`)
  await db.run(sql`DROP TABLE \`services_price_items_locales\`;`)
  await db.run(sql`DROP TABLE \`services\`;`)
  await db.run(sql`DROP TABLE \`services_locales\`;`)
  await db.run(sql`DROP TABLE \`_services_v_version_requirements\`;`)
  await db.run(sql`DROP TABLE \`_services_v_version_price_items\`;`)
  await db.run(sql`DROP TABLE \`_services_v_version_price_items_locales\`;`)
  await db.run(sql`DROP TABLE \`_services_v\`;`)
  await db.run(sql`DROP TABLE \`_services_v_locales\`;`)
  await db.run(sql`DROP TABLE \`testimonials\`;`)
  await db.run(sql`DROP TABLE \`testimonials_locales\`;`)
  await db.run(sql`DROP TABLE \`_testimonials_v\`;`)
  await db.run(sql`DROP TABLE \`_testimonials_v_locales\`;`)
  await db.run(sql`DROP TABLE \`clients\`;`)
  await db.run(sql`DROP TABLE \`_clients_v\`;`)
  await db.run(sql`DROP TABLE \`faqs\`;`)
  await db.run(sql`DROP TABLE \`faqs_locales\`;`)
  await db.run(sql`DROP TABLE \`faqs_rels\`;`)
  await db.run(sql`DROP TABLE \`_faqs_v\`;`)
  await db.run(sql`DROP TABLE \`_faqs_v_locales\`;`)
  await db.run(sql`DROP TABLE \`_faqs_v_rels\`;`)
  await db.run(sql`DROP TABLE \`posts\`;`)
  await db.run(sql`DROP TABLE \`posts_locales\`;`)
  await db.run(sql`DROP TABLE \`_posts_v\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_locales\`;`)
  await db.run(sql`DROP TABLE \`regulations_attachments\`;`)
  await db.run(sql`DROP TABLE \`regulations_attachments_locales\`;`)
  await db.run(sql`DROP TABLE \`regulations\`;`)
  await db.run(sql`DROP TABLE \`regulations_locales\`;`)
  await db.run(sql`DROP TABLE \`_regulations_v_version_attachments\`;`)
  await db.run(sql`DROP TABLE \`_regulations_v_version_attachments_locales\`;`)
  await db.run(sql`DROP TABLE \`_regulations_v\`;`)
  await db.run(sql`DROP TABLE \`_regulations_v_locales\`;`)
  await db.run(sql`DROP TABLE \`media\`;`)
  await db.run(sql`DROP TABLE \`media_locales\`;`)
  await db.run(sql`DROP TABLE \`_media_v\`;`)
  await db.run(sql`DROP TABLE \`_media_v_locales\`;`)
  await db.run(sql`DROP TABLE \`inquiries\`;`)
  await db.run(sql`DROP TABLE \`users_sessions\`;`)
  await db.run(sql`DROP TABLE \`users\`;`)
  await db.run(sql`DROP TABLE \`payload_kv\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_migrations\`;`)
  await db.run(sql`DROP TABLE \`site_stats\`;`)
  await db.run(sql`DROP TABLE \`site_stats_locales\`;`)
  await db.run(sql`DROP TABLE \`site_social\`;`)
  await db.run(sql`DROP TABLE \`site\`;`)
  await db.run(sql`DROP TABLE \`site_locales\`;`)
  await db.run(sql`DROP TABLE \`_site_v_version_stats\`;`)
  await db.run(sql`DROP TABLE \`_site_v_version_stats_locales\`;`)
  await db.run(sql`DROP TABLE \`_site_v_version_social\`;`)
  await db.run(sql`DROP TABLE \`_site_v\`;`)
  await db.run(sql`DROP TABLE \`_site_v_locales\`;`)
  await db.run(sql`DROP TABLE \`home_why\`;`)
  await db.run(sql`DROP TABLE \`home_why_locales\`;`)
  await db.run(sql`DROP TABLE \`home_network_cities\`;`)
  await db.run(sql`DROP TABLE \`home\`;`)
  await db.run(sql`DROP TABLE \`home_locales\`;`)
  await db.run(sql`DROP TABLE \`_home_v_version_why\`;`)
  await db.run(sql`DROP TABLE \`_home_v_version_why_locales\`;`)
  await db.run(sql`DROP TABLE \`_home_v_version_network_cities\`;`)
  await db.run(sql`DROP TABLE \`_home_v\`;`)
  await db.run(sql`DROP TABLE \`_home_v_locales\`;`)
  await db.run(sql`DROP TABLE \`about_mission\`;`)
  await db.run(sql`DROP TABLE \`about_values\`;`)
  await db.run(sql`DROP TABLE \`about_values_locales\`;`)
  await db.run(sql`DROP TABLE \`about_organigram\`;`)
  await db.run(sql`DROP TABLE \`about_organigram_locales\`;`)
  await db.run(sql`DROP TABLE \`about\`;`)
  await db.run(sql`DROP TABLE \`about_locales\`;`)
  await db.run(sql`DROP TABLE \`_about_v_version_mission\`;`)
  await db.run(sql`DROP TABLE \`_about_v_version_values\`;`)
  await db.run(sql`DROP TABLE \`_about_v_version_values_locales\`;`)
  await db.run(sql`DROP TABLE \`_about_v_version_organigram\`;`)
  await db.run(sql`DROP TABLE \`_about_v_version_organigram_locales\`;`)
  await db.run(sql`DROP TABLE \`_about_v\`;`)
  await db.run(sql`DROP TABLE \`_about_v_locales\`;`)
  await db.run(sql`DROP TABLE \`garis_variants\`;`)
  await db.run(sql`DROP TABLE \`garis_variants_locales\`;`)
  await db.run(sql`DROP TABLE \`garis_features\`;`)
  await db.run(sql`DROP TABLE \`garis_features_locales\`;`)
  await db.run(sql`DROP TABLE \`garis_gallery\`;`)
  await db.run(sql`DROP TABLE \`garis\`;`)
  await db.run(sql`DROP TABLE \`garis_locales\`;`)
  await db.run(sql`DROP TABLE \`_garis_v_version_variants\`;`)
  await db.run(sql`DROP TABLE \`_garis_v_version_variants_locales\`;`)
  await db.run(sql`DROP TABLE \`_garis_v_version_features\`;`)
  await db.run(sql`DROP TABLE \`_garis_v_version_features_locales\`;`)
  await db.run(sql`DROP TABLE \`_garis_v_version_gallery\`;`)
  await db.run(sql`DROP TABLE \`_garis_v\`;`)
  await db.run(sql`DROP TABLE \`_garis_v_locales\`;`)
  await db.run(sql`DROP TABLE \`ui\`;`)
  await db.run(sql`DROP TABLE \`ui_locales\`;`)
  await db.run(sql`DROP TABLE \`_ui_v\`;`)
  await db.run(sql`DROP TABLE \`_ui_v_locales\`;`)
}
