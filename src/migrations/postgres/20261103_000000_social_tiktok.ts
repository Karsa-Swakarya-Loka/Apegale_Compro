import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_site_social_platform" ADD VALUE IF NOT EXISTS 'tiktok';
  ALTER TYPE "public"."enum__site_v_version_social_platform" ADD VALUE IF NOT EXISTS 'tiktok';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  // PostgreSQL tidak mendukung penghapusan nilai enum; baris TikTok dibuang agar rollback konsisten.
  await db.execute(sql`
   DELETE FROM "site_social" WHERE "platform" = 'tiktok';
  DELETE FROM "_site_v_version_social" WHERE "platform" = 'tiktok';`)
}
