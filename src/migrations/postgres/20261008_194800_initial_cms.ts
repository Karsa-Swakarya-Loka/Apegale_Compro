import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('id', 'en');
  CREATE TYPE "public"."enum_services_icon" AS ENUM('globe', 'file-text', 'users', 'building-2', 'plane', 'briefcase', 'id-card', 'stamp', 'layers', 'sun', 'monitor-check', 'timer', 'shield-check', 'map');
  CREATE TYPE "public"."enum_services_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__services_v_version_icon" AS ENUM('globe', 'file-text', 'users', 'building-2', 'plane', 'briefcase', 'id-card', 'stamp', 'layers', 'sun', 'monitor-check', 'timer', 'shield-check', 'map');
  CREATE TYPE "public"."enum__services_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__services_v_published_locale" AS ENUM('id', 'en');
  CREATE TYPE "public"."enum_testimonials_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__testimonials_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__testimonials_v_published_locale" AS ENUM('id', 'en');
  CREATE TYPE "public"."enum_clients_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__clients_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__clients_v_published_locale" AS ENUM('id', 'en');
  CREATE TYPE "public"."enum_faqs_category" AS ENUM('umum', 'layanan', 'garis');
  CREATE TYPE "public"."enum_faqs_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__faqs_v_version_category" AS ENUM('umum', 'layanan', 'garis');
  CREATE TYPE "public"."enum__faqs_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__faqs_v_published_locale" AS ENUM('id', 'en');
  CREATE TYPE "public"."enum_posts_category" AS ENUM('news', 'panduan');
  CREATE TYPE "public"."enum_posts_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__posts_v_version_category" AS ENUM('news', 'panduan');
  CREATE TYPE "public"."enum__posts_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__posts_v_published_locale" AS ENUM('id', 'en');
  CREATE TYPE "public"."enum_regulations_category" AS ENUM('cipta-kerja', 'perizinan-tka', 'keimigrasian-tka', 'manpower-supply', 'lainnya');
  CREATE TYPE "public"."enum_regulations_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__regulations_v_version_category" AS ENUM('cipta-kerja', 'perizinan-tka', 'keimigrasian-tka', 'manpower-supply', 'lainnya');
  CREATE TYPE "public"."enum__regulations_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__regulations_v_published_locale" AS ENUM('id', 'en');
  CREATE TYPE "public"."enum_media_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__media_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__media_v_published_locale" AS ENUM('id', 'en');
  CREATE TYPE "public"."enum_inquiries_locale" AS ENUM('id', 'en');
  CREATE TYPE "public"."enum_inquiries_variant" AS ENUM('compact', 'full');
  CREATE TYPE "public"."enum_inquiries_status" AS ENUM('baru', 'dihubungi', 'selesai');
  CREATE TYPE "public"."enum_inquiries_email_status" AS ENUM('pending', 'sent', 'failed');
  CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'editor');
  CREATE TYPE "public"."enum_site_social_platform" AS ENUM('instagram', 'linkedin', 'youtube', 'facebook');
  CREATE TYPE "public"."enum_site_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__site_v_version_social_platform" AS ENUM('instagram', 'linkedin', 'youtube', 'facebook');
  CREATE TYPE "public"."enum__site_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__site_v_published_locale" AS ENUM('id', 'en');
  CREATE TYPE "public"."enum_home_why_icon" AS ENUM('globe', 'file-text', 'users', 'building-2', 'plane', 'briefcase', 'id-card', 'stamp', 'layers', 'sun', 'monitor-check', 'timer', 'shield-check', 'map');
  CREATE TYPE "public"."enum_home_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__home_v_version_why_icon" AS ENUM('globe', 'file-text', 'users', 'building-2', 'plane', 'briefcase', 'id-card', 'stamp', 'layers', 'sun', 'monitor-check', 'timer', 'shield-check', 'map');
  CREATE TYPE "public"."enum__home_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__home_v_published_locale" AS ENUM('id', 'en');
  CREATE TYPE "public"."enum_about_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__about_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__about_v_published_locale" AS ENUM('id', 'en');
  CREATE TYPE "public"."enum_garis_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__garis_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__garis_v_published_locale" AS ENUM('id', 'en');
  CREATE TYPE "public"."enum_ui_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__ui_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__ui_v_published_locale" AS ENUM('id', 'en');
  CREATE TABLE "services_requirements" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "services_price_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"price_from" numeric,
  	"featured" boolean DEFAULT false
  );
  
  CREATE TABLE "services_price_items_locales" (
  	"name" varchar,
  	"note" varchar,
  	"duration" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"order" numeric DEFAULT 0,
  	"parent_id" integer,
  	"show_in_menu" boolean DEFAULT true,
  	"icon" "enum_services_icon",
  	"price_updated_at" timestamp(3) with time zone,
  	"image_id" integer,
  	"seo_og_image_id" integer,
  	"en_reviewed" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_services_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "services_locales" (
  	"title" varchar,
  	"summary" varchar,
  	"body" jsonb,
  	"price_note" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_v_version_requirements" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_version_price_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"price_from" numeric,
  	"featured" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_version_price_items_locales" (
  	"name" varchar,
  	"note" varchar,
  	"duration" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar,
  	"version_order" numeric DEFAULT 0,
  	"version_parent_id" integer,
  	"version_show_in_menu" boolean DEFAULT true,
  	"version_icon" "enum__services_v_version_icon",
  	"version_price_updated_at" timestamp(3) with time zone,
  	"version_image_id" integer,
  	"version_seo_og_image_id" integer,
  	"version_en_reviewed" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__services_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__services_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_services_v_locales" (
  	"version_title" varchar,
  	"version_summary" varchar,
  	"version_body" jsonb,
  	"version_price_note" varchar,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "testimonials" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"company" varchar,
  	"logo_id" integer,
  	"consent" boolean DEFAULT false,
  	"order" numeric DEFAULT 0,
  	"en_reviewed" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_testimonials_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "testimonials_locales" (
  	"quote" varchar,
  	"role" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_testimonials_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar,
  	"version_company" varchar,
  	"version_logo_id" integer,
  	"version_consent" boolean DEFAULT false,
  	"version_order" numeric DEFAULT 0,
  	"version_en_reviewed" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__testimonials_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__testimonials_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_testimonials_v_locales" (
  	"version_quote" varchar,
  	"version_role" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "clients" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"logo_id" integer,
  	"url" varchar,
  	"order" numeric DEFAULT 0,
  	"en_reviewed" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_clients_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_clients_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar,
  	"version_logo_id" integer,
  	"version_url" varchar,
  	"version_order" numeric DEFAULT 0,
  	"version_en_reviewed" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__clients_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__clients_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "faqs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"category" "enum_faqs_category",
  	"featured" boolean DEFAULT false,
  	"order" numeric DEFAULT 0,
  	"seed_key" varchar,
  	"en_reviewed" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_faqs_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "faqs_locales" (
  	"question" varchar,
  	"answer" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "faqs_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"services_id" integer
  );
  
  CREATE TABLE "_faqs_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_category" "enum__faqs_v_version_category",
  	"version_featured" boolean DEFAULT false,
  	"version_order" numeric DEFAULT 0,
  	"version_seed_key" varchar,
  	"version_en_reviewed" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__faqs_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__faqs_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_faqs_v_locales" (
  	"version_question" varchar,
  	"version_answer" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_faqs_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"services_id" integer
  );
  
  CREATE TABLE "posts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"category" "enum_posts_category",
  	"cover_id" integer,
  	"published_at" timestamp(3) with time zone,
  	"seo_og_image_id" integer,
  	"en_reviewed" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_posts_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "posts_locales" (
  	"title" varchar,
  	"excerpt" varchar,
  	"body" jsonb,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_posts_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar,
  	"version_category" "enum__posts_v_version_category",
  	"version_cover_id" integer,
  	"version_published_at" timestamp(3) with time zone,
  	"version_seo_og_image_id" integer,
  	"version_en_reviewed" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__posts_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__posts_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_posts_v_locales" (
  	"version_title" varchar,
  	"version_excerpt" varchar,
  	"version_body" jsonb,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "regulations_attachments" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"file_id" integer
  );
  
  CREATE TABLE "regulations_attachments_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "regulations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"category" "enum_regulations_category",
  	"number" varchar,
  	"issued_at" timestamp(3) with time zone,
  	"en_reviewed" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_regulations_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "regulations_locales" (
  	"title" varchar,
  	"summary" varchar,
  	"body" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_regulations_v_version_attachments" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"file_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_regulations_v_version_attachments_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_regulations_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar,
  	"version_category" "enum__regulations_v_version_category",
  	"version_number" varchar,
  	"version_issued_at" timestamp(3) with time zone,
  	"version_en_reviewed" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__regulations_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__regulations_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_regulations_v_locales" (
  	"version_title" varchar,
  	"version_summary" varchar,
  	"version_body" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"seed_key" varchar,
  	"en_reviewed" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_media_status" DEFAULT 'draft',
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumb_url" varchar,
  	"sizes_thumb_width" numeric,
  	"sizes_thumb_height" numeric,
  	"sizes_thumb_mime_type" varchar,
  	"sizes_thumb_filesize" numeric,
  	"sizes_thumb_filename" varchar,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar,
  	"sizes_hero_url" varchar,
  	"sizes_hero_width" numeric,
  	"sizes_hero_height" numeric,
  	"sizes_hero_mime_type" varchar,
  	"sizes_hero_filesize" numeric,
  	"sizes_hero_filename" varchar,
  	"sizes_og_url" varchar,
  	"sizes_og_width" numeric,
  	"sizes_og_height" numeric,
  	"sizes_og_mime_type" varchar,
  	"sizes_og_filesize" numeric,
  	"sizes_og_filename" varchar
  );
  
  CREATE TABLE "media_locales" (
  	"alt" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_media_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_seed_key" varchar,
  	"version_en_reviewed" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__media_v_version_status" DEFAULT 'draft',
  	"version_url" varchar,
  	"version_thumbnail_u_r_l" varchar,
  	"version_filename" varchar,
  	"version_mime_type" varchar,
  	"version_filesize" numeric,
  	"version_width" numeric,
  	"version_height" numeric,
  	"version_focal_x" numeric,
  	"version_focal_y" numeric,
  	"version_sizes_thumb_url" varchar,
  	"version_sizes_thumb_width" numeric,
  	"version_sizes_thumb_height" numeric,
  	"version_sizes_thumb_mime_type" varchar,
  	"version_sizes_thumb_filesize" numeric,
  	"version_sizes_thumb_filename" varchar,
  	"version_sizes_card_url" varchar,
  	"version_sizes_card_width" numeric,
  	"version_sizes_card_height" numeric,
  	"version_sizes_card_mime_type" varchar,
  	"version_sizes_card_filesize" numeric,
  	"version_sizes_card_filename" varchar,
  	"version_sizes_hero_url" varchar,
  	"version_sizes_hero_width" numeric,
  	"version_sizes_hero_height" numeric,
  	"version_sizes_hero_mime_type" varchar,
  	"version_sizes_hero_filesize" numeric,
  	"version_sizes_hero_filename" varchar,
  	"version_sizes_og_url" varchar,
  	"version_sizes_og_width" numeric,
  	"version_sizes_og_height" numeric,
  	"version_sizes_og_mime_type" varchar,
  	"version_sizes_og_filesize" numeric,
  	"version_sizes_og_filename" varchar,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__media_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_media_v_locales" (
  	"version_alt" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "inquiries" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"company" varchar,
  	"email" varchar,
  	"whatsapp" varchar NOT NULL,
  	"service_id" integer NOT NULL,
  	"message" varchar NOT NULL,
  	"locale" "enum_inquiries_locale" NOT NULL,
  	"variant" "enum_inquiries_variant" DEFAULT 'full' NOT NULL,
  	"status" "enum_inquiries_status" DEFAULT 'baru' NOT NULL,
  	"email_status" "enum_inquiries_email_status" DEFAULT 'pending' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"role" "enum_users_role" DEFAULT 'editor' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"reset_password_requested_at" timestamp(3) with time zone,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"services_id" integer,
  	"testimonials_id" integer,
  	"clients_id" integer,
  	"faqs_id" integer,
  	"posts_id" integer,
  	"regulations_id" integer,
  	"media_id" integer,
  	"inquiries_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "site_stats_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "site_social" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_site_social_platform",
  	"url" varchar
  );
  
  CREATE TABLE "site" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"phone" varchar,
  	"whatsapp" varchar,
  	"email" varchar,
  	"maps_url" varchar,
  	"seo_default_og_image_id" integer,
  	"_status" "enum_site_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_locales" (
  	"whatsapp_default_message" varchar,
  	"address" varchar,
  	"seo_default_title" varchar,
  	"seo_default_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_site_v_version_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_site_v_version_stats_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_site_v_version_social" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"platform" "enum__site_v_version_social_platform",
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_site_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_phone" varchar,
  	"version_whatsapp" varchar,
  	"version_email" varchar,
  	"version_maps_url" varchar,
  	"version_seo_default_og_image_id" integer,
  	"version__status" "enum__site_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__site_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_site_v_locales" (
  	"version_whatsapp_default_message" varchar,
  	"version_address" varchar,
  	"version_seo_default_title" varchar,
  	"version_seo_default_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "home_why" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_home_why_icon"
  );
  
  CREATE TABLE "home_why_locales" (
  	"title" varchar,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_network_cities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"lat" numeric,
  	"lng" numeric
  );
  
  CREATE TABLE "home" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"seo_og_image_id" integer,
  	"hero_image_id" integer,
  	"hero_primary_cta_href" varchar,
  	"hero_secondary_cta_href" varchar,
  	"founder_photo_id" integer,
  	"founder_name" varchar,
  	"sections_visible_hero" boolean DEFAULT true,
  	"sections_visible_clients" boolean DEFAULT true,
  	"sections_visible_services" boolean DEFAULT true,
  	"sections_visible_why" boolean DEFAULT true,
  	"sections_visible_garis" boolean DEFAULT true,
  	"sections_visible_network" boolean DEFAULT true,
  	"sections_visible_founder" boolean DEFAULT true,
  	"sections_visible_testimonials" boolean DEFAULT true,
  	"sections_visible_faq" boolean DEFAULT true,
  	"sections_visible_news" boolean DEFAULT true,
  	"sections_visible_contact_cta" boolean DEFAULT true,
  	"_status" "enum_home_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "home_locales" (
  	"intro" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"hero_eyebrow" varchar,
  	"hero_headline" varchar,
  	"hero_highlight" varchar,
  	"hero_lead" varchar,
  	"hero_primary_cta_label" varchar,
  	"hero_secondary_cta_label" varchar,
  	"network_title" varchar,
  	"network_text" varchar,
  	"founder_quote" varchar,
  	"founder_role" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_home_v_version_why" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__home_v_version_why_icon",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v_version_why_locales" (
  	"title" varchar,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_home_v_version_network_cities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"lat" numeric,
  	"lng" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_seo_og_image_id" integer,
  	"version_hero_image_id" integer,
  	"version_hero_primary_cta_href" varchar,
  	"version_hero_secondary_cta_href" varchar,
  	"version_founder_photo_id" integer,
  	"version_founder_name" varchar,
  	"version_sections_visible_hero" boolean DEFAULT true,
  	"version_sections_visible_clients" boolean DEFAULT true,
  	"version_sections_visible_services" boolean DEFAULT true,
  	"version_sections_visible_why" boolean DEFAULT true,
  	"version_sections_visible_garis" boolean DEFAULT true,
  	"version_sections_visible_network" boolean DEFAULT true,
  	"version_sections_visible_founder" boolean DEFAULT true,
  	"version_sections_visible_testimonials" boolean DEFAULT true,
  	"version_sections_visible_faq" boolean DEFAULT true,
  	"version_sections_visible_news" boolean DEFAULT true,
  	"version_sections_visible_contact_cta" boolean DEFAULT true,
  	"version__status" "enum__home_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__home_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_home_v_locales" (
  	"version_intro" varchar,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_hero_eyebrow" varchar,
  	"version_hero_headline" varchar,
  	"version_hero_highlight" varchar,
  	"version_hero_lead" varchar,
  	"version_hero_primary_cta_label" varchar,
  	"version_hero_secondary_cta_label" varchar,
  	"version_network_title" varchar,
  	"version_network_text" varchar,
  	"version_founder_quote" varchar,
  	"version_founder_role" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "about_mission" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "about_values" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "about_values_locales" (
  	"title" varchar,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "about_organigram" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"parent_index" numeric
  );
  
  CREATE TABLE "about_organigram_locales" (
  	"role" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "about" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"seo_og_image_id" integer,
  	"_status" "enum_about_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "about_locales" (
  	"intro" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"greeting" jsonb,
  	"profile" jsonb,
  	"vision" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_about_v_version_mission" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_about_v_version_values" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_about_v_version_values_locales" (
  	"title" varchar,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_about_v_version_organigram" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"parent_index" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_about_v_version_organigram_locales" (
  	"role" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_about_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_seo_og_image_id" integer,
  	"version__status" "enum__about_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__about_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_about_v_locales" (
  	"version_intro" varchar,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_greeting" jsonb,
  	"version_profile" jsonb,
  	"version_vision" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "garis_variants" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"image_id" integer
  );
  
  CREATE TABLE "garis_variants_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "garis_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "garis_features_locales" (
  	"title" varchar,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "garis_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "garis" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT false,
  	"login_url" varchar,
  	"trial_url" varchar,
  	"seo_og_image_id" integer,
  	"logo_id" integer,
  	"_status" "enum_garis_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "garis_locales" (
  	"intro" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_garis_v_version_variants" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_garis_v_version_variants_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_garis_v_version_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_garis_v_version_features_locales" (
  	"title" varchar,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_garis_v_version_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_garis_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_enabled" boolean DEFAULT false,
  	"version_login_url" varchar,
  	"version_trial_url" varchar,
  	"version_seo_og_image_id" integer,
  	"version_logo_id" integer,
  	"version__status" "enum__garis_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__garis_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_garis_v_locales" (
  	"version_intro" varchar,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "ui" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"pages_services_seo_og_image_id" integer,
  	"pages_regulations_seo_og_image_id" integer,
  	"pages_news_seo_og_image_id" integer,
  	"pages_contact_seo_og_image_id" integer,
  	"_status" "enum_ui_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "ui_locales" (
  	"nav_home" varchar,
  	"nav_about" varchar,
  	"nav_services" varchar,
  	"nav_garis" varchar,
  	"nav_regulations" varchar,
  	"nav_news" varchar,
  	"nav_contact" varchar,
  	"cta_consult" varchar,
  	"cta_view_services" varchar,
  	"cta_more" varchar,
  	"cta_read" varchar,
  	"cta_whatsapp" varchar,
  	"cta_ask_whatsapp" varchar,
  	"cta_send" varchar,
  	"cta_download" varchar,
  	"cta_coming_soon" varchar,
  	"form_name" varchar,
  	"form_company" varchar,
  	"form_email" varchar,
  	"form_whatsapp" varchar,
  	"form_service" varchar,
  	"form_message" varchar,
  	"form_error_email" varchar,
  	"form_error_required" varchar,
  	"form_success" varchar,
  	"price_service" varchar,
  	"price_duration" varchar,
  	"price_from" varchar,
  	"price_contact" varchar,
  	"price_note" varchar,
  	"sections_services" varchar,
  	"sections_why" varchar,
  	"sections_clients" varchar,
  	"sections_testimonials" varchar,
  	"sections_faq" varchar,
  	"sections_news" varchar,
  	"lang_label" varchar,
  	"pages_services_intro" varchar,
  	"pages_services_seo_title" varchar,
  	"pages_services_seo_description" varchar,
  	"pages_regulations_intro" varchar,
  	"pages_regulations_seo_title" varchar,
  	"pages_regulations_seo_description" varchar,
  	"pages_news_intro" varchar,
  	"pages_news_seo_title" varchar,
  	"pages_news_seo_description" varchar,
  	"pages_contact_intro" varchar,
  	"pages_contact_seo_title" varchar,
  	"pages_contact_seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_ui_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_pages_services_seo_og_image_id" integer,
  	"version_pages_regulations_seo_og_image_id" integer,
  	"version_pages_news_seo_og_image_id" integer,
  	"version_pages_contact_seo_og_image_id" integer,
  	"version__status" "enum__ui_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__ui_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_ui_v_locales" (
  	"version_nav_home" varchar,
  	"version_nav_about" varchar,
  	"version_nav_services" varchar,
  	"version_nav_garis" varchar,
  	"version_nav_regulations" varchar,
  	"version_nav_news" varchar,
  	"version_nav_contact" varchar,
  	"version_cta_consult" varchar,
  	"version_cta_view_services" varchar,
  	"version_cta_more" varchar,
  	"version_cta_read" varchar,
  	"version_cta_whatsapp" varchar,
  	"version_cta_ask_whatsapp" varchar,
  	"version_cta_send" varchar,
  	"version_cta_download" varchar,
  	"version_cta_coming_soon" varchar,
  	"version_form_name" varchar,
  	"version_form_company" varchar,
  	"version_form_email" varchar,
  	"version_form_whatsapp" varchar,
  	"version_form_service" varchar,
  	"version_form_message" varchar,
  	"version_form_error_email" varchar,
  	"version_form_error_required" varchar,
  	"version_form_success" varchar,
  	"version_price_service" varchar,
  	"version_price_duration" varchar,
  	"version_price_from" varchar,
  	"version_price_contact" varchar,
  	"version_price_note" varchar,
  	"version_sections_services" varchar,
  	"version_sections_why" varchar,
  	"version_sections_clients" varchar,
  	"version_sections_testimonials" varchar,
  	"version_sections_faq" varchar,
  	"version_sections_news" varchar,
  	"version_lang_label" varchar,
  	"version_pages_services_intro" varchar,
  	"version_pages_services_seo_title" varchar,
  	"version_pages_services_seo_description" varchar,
  	"version_pages_regulations_intro" varchar,
  	"version_pages_regulations_seo_title" varchar,
  	"version_pages_regulations_seo_description" varchar,
  	"version_pages_news_intro" varchar,
  	"version_pages_news_seo_title" varchar,
  	"version_pages_news_seo_description" varchar,
  	"version_pages_contact_intro" varchar,
  	"version_pages_contact_seo_title" varchar,
  	"version_pages_contact_seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "services_requirements" ADD CONSTRAINT "services_requirements_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_price_items" ADD CONSTRAINT "services_price_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_price_items_locales" ADD CONSTRAINT "services_price_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_price_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_parent_id_services_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_locales" ADD CONSTRAINT "services_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_version_requirements" ADD CONSTRAINT "_services_v_version_requirements_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_version_price_items" ADD CONSTRAINT "_services_v_version_price_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_version_price_items_locales" ADD CONSTRAINT "_services_v_version_price_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_version_price_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v" ADD CONSTRAINT "_services_v_parent_id_services_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v" ADD CONSTRAINT "_services_v_version_parent_id_services_id_fk" FOREIGN KEY ("version_parent_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v" ADD CONSTRAINT "_services_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v" ADD CONSTRAINT "_services_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_locales" ADD CONSTRAINT "_services_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "testimonials_locales" ADD CONSTRAINT "testimonials_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_testimonials_v" ADD CONSTRAINT "_testimonials_v_parent_id_testimonials_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."testimonials"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_testimonials_v" ADD CONSTRAINT "_testimonials_v_version_logo_id_media_id_fk" FOREIGN KEY ("version_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_testimonials_v_locales" ADD CONSTRAINT "_testimonials_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_testimonials_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "clients" ADD CONSTRAINT "clients_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_clients_v" ADD CONSTRAINT "_clients_v_parent_id_clients_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."clients"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_clients_v" ADD CONSTRAINT "_clients_v_version_logo_id_media_id_fk" FOREIGN KEY ("version_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "faqs_locales" ADD CONSTRAINT "faqs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "faqs_rels" ADD CONSTRAINT "faqs_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "faqs_rels" ADD CONSTRAINT "faqs_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_faqs_v" ADD CONSTRAINT "_faqs_v_parent_id_faqs_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."faqs"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_faqs_v_locales" ADD CONSTRAINT "_faqs_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_faqs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_faqs_v_rels" ADD CONSTRAINT "_faqs_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_faqs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_faqs_v_rels" ADD CONSTRAINT "_faqs_v_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_cover_id_media_id_fk" FOREIGN KEY ("cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_locales" ADD CONSTRAINT "posts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_parent_id_posts_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_cover_id_media_id_fk" FOREIGN KEY ("version_cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_locales" ADD CONSTRAINT "_posts_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "regulations_attachments" ADD CONSTRAINT "regulations_attachments_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "regulations_attachments" ADD CONSTRAINT "regulations_attachments_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."regulations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "regulations_attachments_locales" ADD CONSTRAINT "regulations_attachments_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."regulations_attachments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "regulations_locales" ADD CONSTRAINT "regulations_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."regulations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_regulations_v_version_attachments" ADD CONSTRAINT "_regulations_v_version_attachments_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_regulations_v_version_attachments" ADD CONSTRAINT "_regulations_v_version_attachments_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_regulations_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_regulations_v_version_attachments_locales" ADD CONSTRAINT "_regulations_v_version_attachments_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_regulations_v_version_attachments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_regulations_v" ADD CONSTRAINT "_regulations_v_parent_id_regulations_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."regulations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_regulations_v_locales" ADD CONSTRAINT "_regulations_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_regulations_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media_locales" ADD CONSTRAINT "media_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_media_v" ADD CONSTRAINT "_media_v_parent_id_media_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_media_v_locales" ADD CONSTRAINT "_media_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_media_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "inquiries" ADD CONSTRAINT "inquiries_service_id_services_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_clients_fk" FOREIGN KEY ("clients_id") REFERENCES "public"."clients"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_regulations_fk" FOREIGN KEY ("regulations_id") REFERENCES "public"."regulations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_inquiries_fk" FOREIGN KEY ("inquiries_id") REFERENCES "public"."inquiries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_stats" ADD CONSTRAINT "site_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_stats_locales" ADD CONSTRAINT "site_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_social" ADD CONSTRAINT "site_social_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site" ADD CONSTRAINT "site_seo_default_og_image_id_media_id_fk" FOREIGN KEY ("seo_default_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_locales" ADD CONSTRAINT "site_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_v_version_stats" ADD CONSTRAINT "_site_v_version_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_v_version_stats_locales" ADD CONSTRAINT "_site_v_version_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_v_version_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_v_version_social" ADD CONSTRAINT "_site_v_version_social_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_v" ADD CONSTRAINT "_site_v_version_seo_default_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_default_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_v_locales" ADD CONSTRAINT "_site_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_why" ADD CONSTRAINT "home_why_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_why_locales" ADD CONSTRAINT "home_why_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_why"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_network_cities" ADD CONSTRAINT "home_network_cities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home" ADD CONSTRAINT "home_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home" ADD CONSTRAINT "home_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home" ADD CONSTRAINT "home_founder_photo_id_media_id_fk" FOREIGN KEY ("founder_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_locales" ADD CONSTRAINT "home_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_why" ADD CONSTRAINT "_home_v_version_why_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_why_locales" ADD CONSTRAINT "_home_v_version_why_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v_version_why"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_network_cities" ADD CONSTRAINT "_home_v_version_network_cities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v" ADD CONSTRAINT "_home_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v" ADD CONSTRAINT "_home_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v" ADD CONSTRAINT "_home_v_version_founder_photo_id_media_id_fk" FOREIGN KEY ("version_founder_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v_locales" ADD CONSTRAINT "_home_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_mission" ADD CONSTRAINT "about_mission_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_values" ADD CONSTRAINT "about_values_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_values_locales" ADD CONSTRAINT "about_values_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_values"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_organigram" ADD CONSTRAINT "about_organigram_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_organigram_locales" ADD CONSTRAINT "about_organigram_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_organigram"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about" ADD CONSTRAINT "about_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_locales" ADD CONSTRAINT "about_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_v_version_mission" ADD CONSTRAINT "_about_v_version_mission_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_v_version_values" ADD CONSTRAINT "_about_v_version_values_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_v_version_values_locales" ADD CONSTRAINT "_about_v_version_values_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_v_version_values"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_v_version_organigram" ADD CONSTRAINT "_about_v_version_organigram_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_v_version_organigram_locales" ADD CONSTRAINT "_about_v_version_organigram_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_v_version_organigram"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_v" ADD CONSTRAINT "_about_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_about_v_locales" ADD CONSTRAINT "_about_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "garis_variants" ADD CONSTRAINT "garis_variants_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "garis_variants" ADD CONSTRAINT "garis_variants_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."garis"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "garis_variants_locales" ADD CONSTRAINT "garis_variants_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."garis_variants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "garis_features" ADD CONSTRAINT "garis_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."garis"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "garis_features_locales" ADD CONSTRAINT "garis_features_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."garis_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "garis_gallery" ADD CONSTRAINT "garis_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "garis_gallery" ADD CONSTRAINT "garis_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."garis"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "garis" ADD CONSTRAINT "garis_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "garis" ADD CONSTRAINT "garis_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "garis_locales" ADD CONSTRAINT "garis_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."garis"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_garis_v_version_variants" ADD CONSTRAINT "_garis_v_version_variants_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_garis_v_version_variants" ADD CONSTRAINT "_garis_v_version_variants_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_garis_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_garis_v_version_variants_locales" ADD CONSTRAINT "_garis_v_version_variants_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_garis_v_version_variants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_garis_v_version_features" ADD CONSTRAINT "_garis_v_version_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_garis_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_garis_v_version_features_locales" ADD CONSTRAINT "_garis_v_version_features_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_garis_v_version_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_garis_v_version_gallery" ADD CONSTRAINT "_garis_v_version_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_garis_v_version_gallery" ADD CONSTRAINT "_garis_v_version_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_garis_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_garis_v" ADD CONSTRAINT "_garis_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_garis_v" ADD CONSTRAINT "_garis_v_version_logo_id_media_id_fk" FOREIGN KEY ("version_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_garis_v_locales" ADD CONSTRAINT "_garis_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_garis_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ui" ADD CONSTRAINT "ui_pages_services_seo_og_image_id_media_id_fk" FOREIGN KEY ("pages_services_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ui" ADD CONSTRAINT "ui_pages_regulations_seo_og_image_id_media_id_fk" FOREIGN KEY ("pages_regulations_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ui" ADD CONSTRAINT "ui_pages_news_seo_og_image_id_media_id_fk" FOREIGN KEY ("pages_news_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ui" ADD CONSTRAINT "ui_pages_contact_seo_og_image_id_media_id_fk" FOREIGN KEY ("pages_contact_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ui_locales" ADD CONSTRAINT "ui_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ui"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ui_v" ADD CONSTRAINT "_ui_v_version_pages_services_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_pages_services_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_ui_v" ADD CONSTRAINT "_ui_v_version_pages_regulations_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_pages_regulations_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_ui_v" ADD CONSTRAINT "_ui_v_version_pages_news_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_pages_news_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_ui_v" ADD CONSTRAINT "_ui_v_version_pages_contact_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_pages_contact_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_ui_v_locales" ADD CONSTRAINT "_ui_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_ui_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "services_requirements_order_idx" ON "services_requirements" USING btree ("_order");
  CREATE INDEX "services_requirements_parent_id_idx" ON "services_requirements" USING btree ("_parent_id");
  CREATE INDEX "services_requirements_locale_idx" ON "services_requirements" USING btree ("_locale");
  CREATE INDEX "services_price_items_order_idx" ON "services_price_items" USING btree ("_order");
  CREATE INDEX "services_price_items_parent_id_idx" ON "services_price_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "services_price_items_locales_locale_parent_id_unique" ON "services_price_items_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "services_slug_idx" ON "services" USING btree ("slug");
  CREATE INDEX "services_parent_idx" ON "services" USING btree ("parent_id");
  CREATE INDEX "services_image_idx" ON "services" USING btree ("image_id");
  CREATE INDEX "services_seo_seo_og_image_idx" ON "services" USING btree ("seo_og_image_id");
  CREATE INDEX "services_updated_at_idx" ON "services" USING btree ("updated_at");
  CREATE INDEX "services_created_at_idx" ON "services" USING btree ("created_at");
  CREATE INDEX "services__status_idx" ON "services" USING btree ("_status");
  CREATE UNIQUE INDEX "services_locales_locale_parent_id_unique" ON "services_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_version_requirements_order_idx" ON "_services_v_version_requirements" USING btree ("_order");
  CREATE INDEX "_services_v_version_requirements_parent_id_idx" ON "_services_v_version_requirements" USING btree ("_parent_id");
  CREATE INDEX "_services_v_version_requirements_locale_idx" ON "_services_v_version_requirements" USING btree ("_locale");
  CREATE INDEX "_services_v_version_price_items_order_idx" ON "_services_v_version_price_items" USING btree ("_order");
  CREATE INDEX "_services_v_version_price_items_parent_id_idx" ON "_services_v_version_price_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_services_v_version_price_items_locales_locale_parent_id_uni" ON "_services_v_version_price_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_parent_idx" ON "_services_v" USING btree ("parent_id");
  CREATE INDEX "_services_v_version_version_slug_idx" ON "_services_v" USING btree ("version_slug");
  CREATE INDEX "_services_v_version_version_parent_idx" ON "_services_v" USING btree ("version_parent_id");
  CREATE INDEX "_services_v_version_version_image_idx" ON "_services_v" USING btree ("version_image_id");
  CREATE INDEX "_services_v_version_seo_version_seo_og_image_idx" ON "_services_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_services_v_version_version_updated_at_idx" ON "_services_v" USING btree ("version_updated_at");
  CREATE INDEX "_services_v_version_version_created_at_idx" ON "_services_v" USING btree ("version_created_at");
  CREATE INDEX "_services_v_version_version__status_idx" ON "_services_v" USING btree ("version__status");
  CREATE INDEX "_services_v_created_at_idx" ON "_services_v" USING btree ("created_at");
  CREATE INDEX "_services_v_updated_at_idx" ON "_services_v" USING btree ("updated_at");
  CREATE INDEX "_services_v_snapshot_idx" ON "_services_v" USING btree ("snapshot");
  CREATE INDEX "_services_v_published_locale_idx" ON "_services_v" USING btree ("published_locale");
  CREATE INDEX "_services_v_latest_idx" ON "_services_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_services_v_locales_locale_parent_id_unique" ON "_services_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "testimonials_logo_idx" ON "testimonials" USING btree ("logo_id");
  CREATE INDEX "testimonials_updated_at_idx" ON "testimonials" USING btree ("updated_at");
  CREATE INDEX "testimonials_created_at_idx" ON "testimonials" USING btree ("created_at");
  CREATE INDEX "testimonials__status_idx" ON "testimonials" USING btree ("_status");
  CREATE UNIQUE INDEX "testimonials_locales_locale_parent_id_unique" ON "testimonials_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_testimonials_v_parent_idx" ON "_testimonials_v" USING btree ("parent_id");
  CREATE INDEX "_testimonials_v_version_version_logo_idx" ON "_testimonials_v" USING btree ("version_logo_id");
  CREATE INDEX "_testimonials_v_version_version_updated_at_idx" ON "_testimonials_v" USING btree ("version_updated_at");
  CREATE INDEX "_testimonials_v_version_version_created_at_idx" ON "_testimonials_v" USING btree ("version_created_at");
  CREATE INDEX "_testimonials_v_version_version__status_idx" ON "_testimonials_v" USING btree ("version__status");
  CREATE INDEX "_testimonials_v_created_at_idx" ON "_testimonials_v" USING btree ("created_at");
  CREATE INDEX "_testimonials_v_updated_at_idx" ON "_testimonials_v" USING btree ("updated_at");
  CREATE INDEX "_testimonials_v_snapshot_idx" ON "_testimonials_v" USING btree ("snapshot");
  CREATE INDEX "_testimonials_v_published_locale_idx" ON "_testimonials_v" USING btree ("published_locale");
  CREATE INDEX "_testimonials_v_latest_idx" ON "_testimonials_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_testimonials_v_locales_locale_parent_id_unique" ON "_testimonials_v_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "clients_name_idx" ON "clients" USING btree ("name");
  CREATE INDEX "clients_logo_idx" ON "clients" USING btree ("logo_id");
  CREATE INDEX "clients_updated_at_idx" ON "clients" USING btree ("updated_at");
  CREATE INDEX "clients_created_at_idx" ON "clients" USING btree ("created_at");
  CREATE INDEX "clients__status_idx" ON "clients" USING btree ("_status");
  CREATE INDEX "_clients_v_parent_idx" ON "_clients_v" USING btree ("parent_id");
  CREATE INDEX "_clients_v_version_version_name_idx" ON "_clients_v" USING btree ("version_name");
  CREATE INDEX "_clients_v_version_version_logo_idx" ON "_clients_v" USING btree ("version_logo_id");
  CREATE INDEX "_clients_v_version_version_updated_at_idx" ON "_clients_v" USING btree ("version_updated_at");
  CREATE INDEX "_clients_v_version_version_created_at_idx" ON "_clients_v" USING btree ("version_created_at");
  CREATE INDEX "_clients_v_version_version__status_idx" ON "_clients_v" USING btree ("version__status");
  CREATE INDEX "_clients_v_created_at_idx" ON "_clients_v" USING btree ("created_at");
  CREATE INDEX "_clients_v_updated_at_idx" ON "_clients_v" USING btree ("updated_at");
  CREATE INDEX "_clients_v_snapshot_idx" ON "_clients_v" USING btree ("snapshot");
  CREATE INDEX "_clients_v_published_locale_idx" ON "_clients_v" USING btree ("published_locale");
  CREATE INDEX "_clients_v_latest_idx" ON "_clients_v" USING btree ("latest");
  CREATE UNIQUE INDEX "faqs_seed_key_idx" ON "faqs" USING btree ("seed_key");
  CREATE INDEX "faqs_updated_at_idx" ON "faqs" USING btree ("updated_at");
  CREATE INDEX "faqs_created_at_idx" ON "faqs" USING btree ("created_at");
  CREATE INDEX "faqs__status_idx" ON "faqs" USING btree ("_status");
  CREATE UNIQUE INDEX "faqs_locales_locale_parent_id_unique" ON "faqs_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "faqs_rels_order_idx" ON "faqs_rels" USING btree ("order");
  CREATE INDEX "faqs_rels_parent_idx" ON "faqs_rels" USING btree ("parent_id");
  CREATE INDEX "faqs_rels_path_idx" ON "faqs_rels" USING btree ("path");
  CREATE INDEX "faqs_rels_services_id_idx" ON "faqs_rels" USING btree ("services_id");
  CREATE INDEX "_faqs_v_parent_idx" ON "_faqs_v" USING btree ("parent_id");
  CREATE INDEX "_faqs_v_version_version_seed_key_idx" ON "_faqs_v" USING btree ("version_seed_key");
  CREATE INDEX "_faqs_v_version_version_updated_at_idx" ON "_faqs_v" USING btree ("version_updated_at");
  CREATE INDEX "_faqs_v_version_version_created_at_idx" ON "_faqs_v" USING btree ("version_created_at");
  CREATE INDEX "_faqs_v_version_version__status_idx" ON "_faqs_v" USING btree ("version__status");
  CREATE INDEX "_faqs_v_created_at_idx" ON "_faqs_v" USING btree ("created_at");
  CREATE INDEX "_faqs_v_updated_at_idx" ON "_faqs_v" USING btree ("updated_at");
  CREATE INDEX "_faqs_v_snapshot_idx" ON "_faqs_v" USING btree ("snapshot");
  CREATE INDEX "_faqs_v_published_locale_idx" ON "_faqs_v" USING btree ("published_locale");
  CREATE INDEX "_faqs_v_latest_idx" ON "_faqs_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_faqs_v_locales_locale_parent_id_unique" ON "_faqs_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_faqs_v_rels_order_idx" ON "_faqs_v_rels" USING btree ("order");
  CREATE INDEX "_faqs_v_rels_parent_idx" ON "_faqs_v_rels" USING btree ("parent_id");
  CREATE INDEX "_faqs_v_rels_path_idx" ON "_faqs_v_rels" USING btree ("path");
  CREATE INDEX "_faqs_v_rels_services_id_idx" ON "_faqs_v_rels" USING btree ("services_id");
  CREATE UNIQUE INDEX "posts_slug_idx" ON "posts" USING btree ("slug");
  CREATE INDEX "posts_cover_idx" ON "posts" USING btree ("cover_id");
  CREATE INDEX "posts_seo_seo_og_image_idx" ON "posts" USING btree ("seo_og_image_id");
  CREATE INDEX "posts_updated_at_idx" ON "posts" USING btree ("updated_at");
  CREATE INDEX "posts_created_at_idx" ON "posts" USING btree ("created_at");
  CREATE INDEX "posts__status_idx" ON "posts" USING btree ("_status");
  CREATE UNIQUE INDEX "posts_locales_locale_parent_id_unique" ON "posts_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_parent_idx" ON "_posts_v" USING btree ("parent_id");
  CREATE INDEX "_posts_v_version_version_slug_idx" ON "_posts_v" USING btree ("version_slug");
  CREATE INDEX "_posts_v_version_version_cover_idx" ON "_posts_v" USING btree ("version_cover_id");
  CREATE INDEX "_posts_v_version_seo_version_seo_og_image_idx" ON "_posts_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_posts_v_version_version_updated_at_idx" ON "_posts_v" USING btree ("version_updated_at");
  CREATE INDEX "_posts_v_version_version_created_at_idx" ON "_posts_v" USING btree ("version_created_at");
  CREATE INDEX "_posts_v_version_version__status_idx" ON "_posts_v" USING btree ("version__status");
  CREATE INDEX "_posts_v_created_at_idx" ON "_posts_v" USING btree ("created_at");
  CREATE INDEX "_posts_v_updated_at_idx" ON "_posts_v" USING btree ("updated_at");
  CREATE INDEX "_posts_v_snapshot_idx" ON "_posts_v" USING btree ("snapshot");
  CREATE INDEX "_posts_v_published_locale_idx" ON "_posts_v" USING btree ("published_locale");
  CREATE INDEX "_posts_v_latest_idx" ON "_posts_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_posts_v_locales_locale_parent_id_unique" ON "_posts_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "regulations_attachments_order_idx" ON "regulations_attachments" USING btree ("_order");
  CREATE INDEX "regulations_attachments_parent_id_idx" ON "regulations_attachments" USING btree ("_parent_id");
  CREATE INDEX "regulations_attachments_file_idx" ON "regulations_attachments" USING btree ("file_id");
  CREATE UNIQUE INDEX "regulations_attachments_locales_locale_parent_id_unique" ON "regulations_attachments_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "regulations_slug_idx" ON "regulations" USING btree ("slug");
  CREATE INDEX "regulations_updated_at_idx" ON "regulations" USING btree ("updated_at");
  CREATE INDEX "regulations_created_at_idx" ON "regulations" USING btree ("created_at");
  CREATE INDEX "regulations__status_idx" ON "regulations" USING btree ("_status");
  CREATE UNIQUE INDEX "regulations_locales_locale_parent_id_unique" ON "regulations_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_regulations_v_version_attachments_order_idx" ON "_regulations_v_version_attachments" USING btree ("_order");
  CREATE INDEX "_regulations_v_version_attachments_parent_id_idx" ON "_regulations_v_version_attachments" USING btree ("_parent_id");
  CREATE INDEX "_regulations_v_version_attachments_file_idx" ON "_regulations_v_version_attachments" USING btree ("file_id");
  CREATE UNIQUE INDEX "_regulations_v_version_attachments_locales_locale_parent_id_" ON "_regulations_v_version_attachments_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_regulations_v_parent_idx" ON "_regulations_v" USING btree ("parent_id");
  CREATE INDEX "_regulations_v_version_version_slug_idx" ON "_regulations_v" USING btree ("version_slug");
  CREATE INDEX "_regulations_v_version_version_updated_at_idx" ON "_regulations_v" USING btree ("version_updated_at");
  CREATE INDEX "_regulations_v_version_version_created_at_idx" ON "_regulations_v" USING btree ("version_created_at");
  CREATE INDEX "_regulations_v_version_version__status_idx" ON "_regulations_v" USING btree ("version__status");
  CREATE INDEX "_regulations_v_created_at_idx" ON "_regulations_v" USING btree ("created_at");
  CREATE INDEX "_regulations_v_updated_at_idx" ON "_regulations_v" USING btree ("updated_at");
  CREATE INDEX "_regulations_v_snapshot_idx" ON "_regulations_v" USING btree ("snapshot");
  CREATE INDEX "_regulations_v_published_locale_idx" ON "_regulations_v" USING btree ("published_locale");
  CREATE INDEX "_regulations_v_latest_idx" ON "_regulations_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_regulations_v_locales_locale_parent_id_unique" ON "_regulations_v_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "media_seed_key_idx" ON "media" USING btree ("seed_key");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE INDEX "media__status_idx" ON "media" USING btree ("_status");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumb_sizes_thumb_filename_idx" ON "media" USING btree ("sizes_thumb_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_hero_sizes_hero_filename_idx" ON "media" USING btree ("sizes_hero_filename");
  CREATE INDEX "media_sizes_og_sizes_og_filename_idx" ON "media" USING btree ("sizes_og_filename");
  CREATE UNIQUE INDEX "media_locales_locale_parent_id_unique" ON "media_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_media_v_parent_idx" ON "_media_v" USING btree ("parent_id");
  CREATE INDEX "_media_v_version_version_seed_key_idx" ON "_media_v" USING btree ("version_seed_key");
  CREATE INDEX "_media_v_version_version_updated_at_idx" ON "_media_v" USING btree ("version_updated_at");
  CREATE INDEX "_media_v_version_version_created_at_idx" ON "_media_v" USING btree ("version_created_at");
  CREATE INDEX "_media_v_version_version__status_idx" ON "_media_v" USING btree ("version__status");
  CREATE INDEX "_media_v_version_version_filename_idx" ON "_media_v" USING btree ("version_filename");
  CREATE INDEX "_media_v_version_sizes_thumb_version_sizes_thumb_filenam_idx" ON "_media_v" USING btree ("version_sizes_thumb_filename");
  CREATE INDEX "_media_v_version_sizes_card_version_sizes_card_filename_idx" ON "_media_v" USING btree ("version_sizes_card_filename");
  CREATE INDEX "_media_v_version_sizes_hero_version_sizes_hero_filename_idx" ON "_media_v" USING btree ("version_sizes_hero_filename");
  CREATE INDEX "_media_v_version_sizes_og_version_sizes_og_filename_idx" ON "_media_v" USING btree ("version_sizes_og_filename");
  CREATE INDEX "_media_v_created_at_idx" ON "_media_v" USING btree ("created_at");
  CREATE INDEX "_media_v_updated_at_idx" ON "_media_v" USING btree ("updated_at");
  CREATE INDEX "_media_v_snapshot_idx" ON "_media_v" USING btree ("snapshot");
  CREATE INDEX "_media_v_published_locale_idx" ON "_media_v" USING btree ("published_locale");
  CREATE INDEX "_media_v_latest_idx" ON "_media_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_media_v_locales_locale_parent_id_unique" ON "_media_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "inquiries_service_idx" ON "inquiries" USING btree ("service_id");
  CREATE INDEX "inquiries_updated_at_idx" ON "inquiries" USING btree ("updated_at");
  CREATE INDEX "inquiries_created_at_idx" ON "inquiries" USING btree ("created_at");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_services_id_idx" ON "payload_locked_documents_rels" USING btree ("services_id");
  CREATE INDEX "payload_locked_documents_rels_testimonials_id_idx" ON "payload_locked_documents_rels" USING btree ("testimonials_id");
  CREATE INDEX "payload_locked_documents_rels_clients_id_idx" ON "payload_locked_documents_rels" USING btree ("clients_id");
  CREATE INDEX "payload_locked_documents_rels_faqs_id_idx" ON "payload_locked_documents_rels" USING btree ("faqs_id");
  CREATE INDEX "payload_locked_documents_rels_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("posts_id");
  CREATE INDEX "payload_locked_documents_rels_regulations_id_idx" ON "payload_locked_documents_rels" USING btree ("regulations_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_inquiries_id_idx" ON "payload_locked_documents_rels" USING btree ("inquiries_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "site_stats_order_idx" ON "site_stats" USING btree ("_order");
  CREATE INDEX "site_stats_parent_id_idx" ON "site_stats" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "site_stats_locales_locale_parent_id_unique" ON "site_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "site_social_order_idx" ON "site_social" USING btree ("_order");
  CREATE INDEX "site_social_parent_id_idx" ON "site_social" USING btree ("_parent_id");
  CREATE INDEX "site_seo_default_seo_default_og_image_idx" ON "site" USING btree ("seo_default_og_image_id");
  CREATE INDEX "site__status_idx" ON "site" USING btree ("_status");
  CREATE UNIQUE INDEX "site_locales_locale_parent_id_unique" ON "site_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_site_v_version_stats_order_idx" ON "_site_v_version_stats" USING btree ("_order");
  CREATE INDEX "_site_v_version_stats_parent_id_idx" ON "_site_v_version_stats" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_site_v_version_stats_locales_locale_parent_id_unique" ON "_site_v_version_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_site_v_version_social_order_idx" ON "_site_v_version_social" USING btree ("_order");
  CREATE INDEX "_site_v_version_social_parent_id_idx" ON "_site_v_version_social" USING btree ("_parent_id");
  CREATE INDEX "_site_v_version_seo_default_version_seo_default_og_image_idx" ON "_site_v" USING btree ("version_seo_default_og_image_id");
  CREATE INDEX "_site_v_version_version__status_idx" ON "_site_v" USING btree ("version__status");
  CREATE INDEX "_site_v_created_at_idx" ON "_site_v" USING btree ("created_at");
  CREATE INDEX "_site_v_updated_at_idx" ON "_site_v" USING btree ("updated_at");
  CREATE INDEX "_site_v_snapshot_idx" ON "_site_v" USING btree ("snapshot");
  CREATE INDEX "_site_v_published_locale_idx" ON "_site_v" USING btree ("published_locale");
  CREATE INDEX "_site_v_latest_idx" ON "_site_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_site_v_locales_locale_parent_id_unique" ON "_site_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_why_order_idx" ON "home_why" USING btree ("_order");
  CREATE INDEX "home_why_parent_id_idx" ON "home_why" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "home_why_locales_locale_parent_id_unique" ON "home_why_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_network_cities_order_idx" ON "home_network_cities" USING btree ("_order");
  CREATE INDEX "home_network_cities_parent_id_idx" ON "home_network_cities" USING btree ("_parent_id");
  CREATE INDEX "home_seo_seo_og_image_idx" ON "home" USING btree ("seo_og_image_id");
  CREATE INDEX "home_hero_hero_image_idx" ON "home" USING btree ("hero_image_id");
  CREATE INDEX "home_founder_founder_photo_idx" ON "home" USING btree ("founder_photo_id");
  CREATE INDEX "home__status_idx" ON "home" USING btree ("_status");
  CREATE UNIQUE INDEX "home_locales_locale_parent_id_unique" ON "home_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_home_v_version_why_order_idx" ON "_home_v_version_why" USING btree ("_order");
  CREATE INDEX "_home_v_version_why_parent_id_idx" ON "_home_v_version_why" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_home_v_version_why_locales_locale_parent_id_unique" ON "_home_v_version_why_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_home_v_version_network_cities_order_idx" ON "_home_v_version_network_cities" USING btree ("_order");
  CREATE INDEX "_home_v_version_network_cities_parent_id_idx" ON "_home_v_version_network_cities" USING btree ("_parent_id");
  CREATE INDEX "_home_v_version_seo_version_seo_og_image_idx" ON "_home_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_home_v_version_hero_version_hero_image_idx" ON "_home_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_home_v_version_founder_version_founder_photo_idx" ON "_home_v" USING btree ("version_founder_photo_id");
  CREATE INDEX "_home_v_version_version__status_idx" ON "_home_v" USING btree ("version__status");
  CREATE INDEX "_home_v_created_at_idx" ON "_home_v" USING btree ("created_at");
  CREATE INDEX "_home_v_updated_at_idx" ON "_home_v" USING btree ("updated_at");
  CREATE INDEX "_home_v_snapshot_idx" ON "_home_v" USING btree ("snapshot");
  CREATE INDEX "_home_v_published_locale_idx" ON "_home_v" USING btree ("published_locale");
  CREATE INDEX "_home_v_latest_idx" ON "_home_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_home_v_locales_locale_parent_id_unique" ON "_home_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "about_mission_order_idx" ON "about_mission" USING btree ("_order");
  CREATE INDEX "about_mission_parent_id_idx" ON "about_mission" USING btree ("_parent_id");
  CREATE INDEX "about_mission_locale_idx" ON "about_mission" USING btree ("_locale");
  CREATE INDEX "about_values_order_idx" ON "about_values" USING btree ("_order");
  CREATE INDEX "about_values_parent_id_idx" ON "about_values" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "about_values_locales_locale_parent_id_unique" ON "about_values_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "about_organigram_order_idx" ON "about_organigram" USING btree ("_order");
  CREATE INDEX "about_organigram_parent_id_idx" ON "about_organigram" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "about_organigram_locales_locale_parent_id_unique" ON "about_organigram_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "about_seo_seo_og_image_idx" ON "about" USING btree ("seo_og_image_id");
  CREATE INDEX "about__status_idx" ON "about" USING btree ("_status");
  CREATE UNIQUE INDEX "about_locales_locale_parent_id_unique" ON "about_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_about_v_version_mission_order_idx" ON "_about_v_version_mission" USING btree ("_order");
  CREATE INDEX "_about_v_version_mission_parent_id_idx" ON "_about_v_version_mission" USING btree ("_parent_id");
  CREATE INDEX "_about_v_version_mission_locale_idx" ON "_about_v_version_mission" USING btree ("_locale");
  CREATE INDEX "_about_v_version_values_order_idx" ON "_about_v_version_values" USING btree ("_order");
  CREATE INDEX "_about_v_version_values_parent_id_idx" ON "_about_v_version_values" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_about_v_version_values_locales_locale_parent_id_unique" ON "_about_v_version_values_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_about_v_version_organigram_order_idx" ON "_about_v_version_organigram" USING btree ("_order");
  CREATE INDEX "_about_v_version_organigram_parent_id_idx" ON "_about_v_version_organigram" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_about_v_version_organigram_locales_locale_parent_id_unique" ON "_about_v_version_organigram_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_about_v_version_seo_version_seo_og_image_idx" ON "_about_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_about_v_version_version__status_idx" ON "_about_v" USING btree ("version__status");
  CREATE INDEX "_about_v_created_at_idx" ON "_about_v" USING btree ("created_at");
  CREATE INDEX "_about_v_updated_at_idx" ON "_about_v" USING btree ("updated_at");
  CREATE INDEX "_about_v_snapshot_idx" ON "_about_v" USING btree ("snapshot");
  CREATE INDEX "_about_v_published_locale_idx" ON "_about_v" USING btree ("published_locale");
  CREATE INDEX "_about_v_latest_idx" ON "_about_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_about_v_locales_locale_parent_id_unique" ON "_about_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "garis_variants_order_idx" ON "garis_variants" USING btree ("_order");
  CREATE INDEX "garis_variants_parent_id_idx" ON "garis_variants" USING btree ("_parent_id");
  CREATE INDEX "garis_variants_image_idx" ON "garis_variants" USING btree ("image_id");
  CREATE UNIQUE INDEX "garis_variants_locales_locale_parent_id_unique" ON "garis_variants_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "garis_features_order_idx" ON "garis_features" USING btree ("_order");
  CREATE INDEX "garis_features_parent_id_idx" ON "garis_features" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "garis_features_locales_locale_parent_id_unique" ON "garis_features_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "garis_gallery_order_idx" ON "garis_gallery" USING btree ("_order");
  CREATE INDEX "garis_gallery_parent_id_idx" ON "garis_gallery" USING btree ("_parent_id");
  CREATE INDEX "garis_gallery_image_idx" ON "garis_gallery" USING btree ("image_id");
  CREATE INDEX "garis_seo_seo_og_image_idx" ON "garis" USING btree ("seo_og_image_id");
  CREATE INDEX "garis_logo_idx" ON "garis" USING btree ("logo_id");
  CREATE INDEX "garis__status_idx" ON "garis" USING btree ("_status");
  CREATE UNIQUE INDEX "garis_locales_locale_parent_id_unique" ON "garis_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_garis_v_version_variants_order_idx" ON "_garis_v_version_variants" USING btree ("_order");
  CREATE INDEX "_garis_v_version_variants_parent_id_idx" ON "_garis_v_version_variants" USING btree ("_parent_id");
  CREATE INDEX "_garis_v_version_variants_image_idx" ON "_garis_v_version_variants" USING btree ("image_id");
  CREATE UNIQUE INDEX "_garis_v_version_variants_locales_locale_parent_id_unique" ON "_garis_v_version_variants_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_garis_v_version_features_order_idx" ON "_garis_v_version_features" USING btree ("_order");
  CREATE INDEX "_garis_v_version_features_parent_id_idx" ON "_garis_v_version_features" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_garis_v_version_features_locales_locale_parent_id_unique" ON "_garis_v_version_features_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_garis_v_version_gallery_order_idx" ON "_garis_v_version_gallery" USING btree ("_order");
  CREATE INDEX "_garis_v_version_gallery_parent_id_idx" ON "_garis_v_version_gallery" USING btree ("_parent_id");
  CREATE INDEX "_garis_v_version_gallery_image_idx" ON "_garis_v_version_gallery" USING btree ("image_id");
  CREATE INDEX "_garis_v_version_seo_version_seo_og_image_idx" ON "_garis_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_garis_v_version_version_logo_idx" ON "_garis_v" USING btree ("version_logo_id");
  CREATE INDEX "_garis_v_version_version__status_idx" ON "_garis_v" USING btree ("version__status");
  CREATE INDEX "_garis_v_created_at_idx" ON "_garis_v" USING btree ("created_at");
  CREATE INDEX "_garis_v_updated_at_idx" ON "_garis_v" USING btree ("updated_at");
  CREATE INDEX "_garis_v_snapshot_idx" ON "_garis_v" USING btree ("snapshot");
  CREATE INDEX "_garis_v_published_locale_idx" ON "_garis_v" USING btree ("published_locale");
  CREATE INDEX "_garis_v_latest_idx" ON "_garis_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_garis_v_locales_locale_parent_id_unique" ON "_garis_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "ui_pages_services_seo_pages_services_seo_og_image_idx" ON "ui" USING btree ("pages_services_seo_og_image_id");
  CREATE INDEX "ui_pages_regulations_seo_pages_regulations_seo_og_image_idx" ON "ui" USING btree ("pages_regulations_seo_og_image_id");
  CREATE INDEX "ui_pages_news_seo_pages_news_seo_og_image_idx" ON "ui" USING btree ("pages_news_seo_og_image_id");
  CREATE INDEX "ui_pages_contact_seo_pages_contact_seo_og_image_idx" ON "ui" USING btree ("pages_contact_seo_og_image_id");
  CREATE INDEX "ui__status_idx" ON "ui" USING btree ("_status");
  CREATE UNIQUE INDEX "ui_locales_locale_parent_id_unique" ON "ui_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_ui_v_version_pages_services_seo_version_pages_services__idx" ON "_ui_v" USING btree ("version_pages_services_seo_og_image_id");
  CREATE INDEX "_ui_v_version_pages_regulations_seo_version_pages_regula_idx" ON "_ui_v" USING btree ("version_pages_regulations_seo_og_image_id");
  CREATE INDEX "_ui_v_version_pages_news_seo_version_pages_news_seo_og_i_idx" ON "_ui_v" USING btree ("version_pages_news_seo_og_image_id");
  CREATE INDEX "_ui_v_version_pages_contact_seo_version_pages_contact_se_idx" ON "_ui_v" USING btree ("version_pages_contact_seo_og_image_id");
  CREATE INDEX "_ui_v_version_version__status_idx" ON "_ui_v" USING btree ("version__status");
  CREATE INDEX "_ui_v_created_at_idx" ON "_ui_v" USING btree ("created_at");
  CREATE INDEX "_ui_v_updated_at_idx" ON "_ui_v" USING btree ("updated_at");
  CREATE INDEX "_ui_v_snapshot_idx" ON "_ui_v" USING btree ("snapshot");
  CREATE INDEX "_ui_v_published_locale_idx" ON "_ui_v" USING btree ("published_locale");
  CREATE INDEX "_ui_v_latest_idx" ON "_ui_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_ui_v_locales_locale_parent_id_unique" ON "_ui_v_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "services_requirements" CASCADE;
  DROP TABLE "services_price_items" CASCADE;
  DROP TABLE "services_price_items_locales" CASCADE;
  DROP TABLE "services" CASCADE;
  DROP TABLE "services_locales" CASCADE;
  DROP TABLE "_services_v_version_requirements" CASCADE;
  DROP TABLE "_services_v_version_price_items" CASCADE;
  DROP TABLE "_services_v_version_price_items_locales" CASCADE;
  DROP TABLE "_services_v" CASCADE;
  DROP TABLE "_services_v_locales" CASCADE;
  DROP TABLE "testimonials" CASCADE;
  DROP TABLE "testimonials_locales" CASCADE;
  DROP TABLE "_testimonials_v" CASCADE;
  DROP TABLE "_testimonials_v_locales" CASCADE;
  DROP TABLE "clients" CASCADE;
  DROP TABLE "_clients_v" CASCADE;
  DROP TABLE "faqs" CASCADE;
  DROP TABLE "faqs_locales" CASCADE;
  DROP TABLE "faqs_rels" CASCADE;
  DROP TABLE "_faqs_v" CASCADE;
  DROP TABLE "_faqs_v_locales" CASCADE;
  DROP TABLE "_faqs_v_rels" CASCADE;
  DROP TABLE "posts" CASCADE;
  DROP TABLE "posts_locales" CASCADE;
  DROP TABLE "_posts_v" CASCADE;
  DROP TABLE "_posts_v_locales" CASCADE;
  DROP TABLE "regulations_attachments" CASCADE;
  DROP TABLE "regulations_attachments_locales" CASCADE;
  DROP TABLE "regulations" CASCADE;
  DROP TABLE "regulations_locales" CASCADE;
  DROP TABLE "_regulations_v_version_attachments" CASCADE;
  DROP TABLE "_regulations_v_version_attachments_locales" CASCADE;
  DROP TABLE "_regulations_v" CASCADE;
  DROP TABLE "_regulations_v_locales" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "media_locales" CASCADE;
  DROP TABLE "_media_v" CASCADE;
  DROP TABLE "_media_v_locales" CASCADE;
  DROP TABLE "inquiries" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "site_stats" CASCADE;
  DROP TABLE "site_stats_locales" CASCADE;
  DROP TABLE "site_social" CASCADE;
  DROP TABLE "site" CASCADE;
  DROP TABLE "site_locales" CASCADE;
  DROP TABLE "_site_v_version_stats" CASCADE;
  DROP TABLE "_site_v_version_stats_locales" CASCADE;
  DROP TABLE "_site_v_version_social" CASCADE;
  DROP TABLE "_site_v" CASCADE;
  DROP TABLE "_site_v_locales" CASCADE;
  DROP TABLE "home_why" CASCADE;
  DROP TABLE "home_why_locales" CASCADE;
  DROP TABLE "home_network_cities" CASCADE;
  DROP TABLE "home" CASCADE;
  DROP TABLE "home_locales" CASCADE;
  DROP TABLE "_home_v_version_why" CASCADE;
  DROP TABLE "_home_v_version_why_locales" CASCADE;
  DROP TABLE "_home_v_version_network_cities" CASCADE;
  DROP TABLE "_home_v" CASCADE;
  DROP TABLE "_home_v_locales" CASCADE;
  DROP TABLE "about_mission" CASCADE;
  DROP TABLE "about_values" CASCADE;
  DROP TABLE "about_values_locales" CASCADE;
  DROP TABLE "about_organigram" CASCADE;
  DROP TABLE "about_organigram_locales" CASCADE;
  DROP TABLE "about" CASCADE;
  DROP TABLE "about_locales" CASCADE;
  DROP TABLE "_about_v_version_mission" CASCADE;
  DROP TABLE "_about_v_version_values" CASCADE;
  DROP TABLE "_about_v_version_values_locales" CASCADE;
  DROP TABLE "_about_v_version_organigram" CASCADE;
  DROP TABLE "_about_v_version_organigram_locales" CASCADE;
  DROP TABLE "_about_v" CASCADE;
  DROP TABLE "_about_v_locales" CASCADE;
  DROP TABLE "garis_variants" CASCADE;
  DROP TABLE "garis_variants_locales" CASCADE;
  DROP TABLE "garis_features" CASCADE;
  DROP TABLE "garis_features_locales" CASCADE;
  DROP TABLE "garis_gallery" CASCADE;
  DROP TABLE "garis" CASCADE;
  DROP TABLE "garis_locales" CASCADE;
  DROP TABLE "_garis_v_version_variants" CASCADE;
  DROP TABLE "_garis_v_version_variants_locales" CASCADE;
  DROP TABLE "_garis_v_version_features" CASCADE;
  DROP TABLE "_garis_v_version_features_locales" CASCADE;
  DROP TABLE "_garis_v_version_gallery" CASCADE;
  DROP TABLE "_garis_v" CASCADE;
  DROP TABLE "_garis_v_locales" CASCADE;
  DROP TABLE "ui" CASCADE;
  DROP TABLE "ui_locales" CASCADE;
  DROP TABLE "_ui_v" CASCADE;
  DROP TABLE "_ui_v_locales" CASCADE;
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_services_icon";
  DROP TYPE "public"."enum_services_status";
  DROP TYPE "public"."enum__services_v_version_icon";
  DROP TYPE "public"."enum__services_v_version_status";
  DROP TYPE "public"."enum__services_v_published_locale";
  DROP TYPE "public"."enum_testimonials_status";
  DROP TYPE "public"."enum__testimonials_v_version_status";
  DROP TYPE "public"."enum__testimonials_v_published_locale";
  DROP TYPE "public"."enum_clients_status";
  DROP TYPE "public"."enum__clients_v_version_status";
  DROP TYPE "public"."enum__clients_v_published_locale";
  DROP TYPE "public"."enum_faqs_category";
  DROP TYPE "public"."enum_faqs_status";
  DROP TYPE "public"."enum__faqs_v_version_category";
  DROP TYPE "public"."enum__faqs_v_version_status";
  DROP TYPE "public"."enum__faqs_v_published_locale";
  DROP TYPE "public"."enum_posts_category";
  DROP TYPE "public"."enum_posts_status";
  DROP TYPE "public"."enum__posts_v_version_category";
  DROP TYPE "public"."enum__posts_v_version_status";
  DROP TYPE "public"."enum__posts_v_published_locale";
  DROP TYPE "public"."enum_regulations_category";
  DROP TYPE "public"."enum_regulations_status";
  DROP TYPE "public"."enum__regulations_v_version_category";
  DROP TYPE "public"."enum__regulations_v_version_status";
  DROP TYPE "public"."enum__regulations_v_published_locale";
  DROP TYPE "public"."enum_media_status";
  DROP TYPE "public"."enum__media_v_version_status";
  DROP TYPE "public"."enum__media_v_published_locale";
  DROP TYPE "public"."enum_inquiries_locale";
  DROP TYPE "public"."enum_inquiries_variant";
  DROP TYPE "public"."enum_inquiries_status";
  DROP TYPE "public"."enum_inquiries_email_status";
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_site_social_platform";
  DROP TYPE "public"."enum_site_status";
  DROP TYPE "public"."enum__site_v_version_social_platform";
  DROP TYPE "public"."enum__site_v_version_status";
  DROP TYPE "public"."enum__site_v_published_locale";
  DROP TYPE "public"."enum_home_why_icon";
  DROP TYPE "public"."enum_home_status";
  DROP TYPE "public"."enum__home_v_version_why_icon";
  DROP TYPE "public"."enum__home_v_version_status";
  DROP TYPE "public"."enum__home_v_published_locale";
  DROP TYPE "public"."enum_about_status";
  DROP TYPE "public"."enum__about_v_version_status";
  DROP TYPE "public"."enum__about_v_published_locale";
  DROP TYPE "public"."enum_garis_status";
  DROP TYPE "public"."enum__garis_v_version_status";
  DROP TYPE "public"."enum__garis_v_published_locale";
  DROP TYPE "public"."enum_ui_status";
  DROP TYPE "public"."enum__ui_v_version_status";
  DROP TYPE "public"."enum__ui_v_published_locale";`)
}
