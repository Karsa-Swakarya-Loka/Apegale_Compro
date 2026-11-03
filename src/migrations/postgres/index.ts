import * as migration_20261008_194800_initial_cms from './20261008_194800_initial_cms';
import * as migration_20261013_041547_vercel_blob_object_key from './20261013_041547_vercel_blob_object_key';
import * as migration_20261103_000000_social_tiktok from './20261103_000000_social_tiktok';

export const migrations = [
  {
    up: migration_20261008_194800_initial_cms.up,
    down: migration_20261008_194800_initial_cms.down,
    name: '20261008_194800_initial_cms',
  },
  {
    up: migration_20261013_041547_vercel_blob_object_key.up,
    down: migration_20261013_041547_vercel_blob_object_key.down,
    name: '20261013_041547_vercel_blob_object_key'
  },
  {
    up: migration_20261103_000000_social_tiktok.up,
    down: migration_20261103_000000_social_tiktok.down,
    name: '20261103_000000_social_tiktok',
  },
];
