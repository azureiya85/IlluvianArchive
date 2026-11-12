#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/602195f67d99e523e775aed0116c687583cc8fd6861fb9638867f05aedb67bb7/contract';
import startContract from '../../snapshots/602195f67d99e523e775aed0116c687583cc8fd6861fb9638867f05aedb67bb7/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/ec956febb32dfb62b41612fdab68f860aa68a6b20b95d6166ec0df7acf6e26a4/contract';
import endContract from '../../snapshots/ec956febb32dfb62b41612fdab68f860aa68a6b20b95d6166ec0df7acf6e26a4/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, lit, primaryKey } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createTable({
        schema: 'public',
        table: 'FaqItem',
        columns: [
          col('answer', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('createdAt', 'timestamptz(3)', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('orderIndex', 'float8', {
            notNull: true,
            default: lit(0),
            codecRef: { codecId: 'pg/float8@1' },
          }),
          col('question', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('settingsId', 'text', {
            notNull: true,
            default: lit('global'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('updatedAt', 'timestamptz(3)', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'SiteSettings',
        columns: [
          col('aboutContent', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('contactEmail', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('createdAt', 'timestamptz(3)', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('heroBanner', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'text', {
            notNull: true,
            default: lit('global'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('logo', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('ownerName', 'text', { default: lit('Ryhze'), codecRef: { codecId: 'pg/text@1' } }),
          col('siteTitle', 'text', {
            notNull: true,
            default: lit('Illuvian Archive'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('updatedAt', 'timestamptz(3)', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.setDefault({
        schema: 'public',
        table: 'Book',
        column: col('author', 'text', {
          default: lit('Ryhze'),
          codecRef: { codecId: 'pg/text@1' },
        }),
      }),
      this.createIndex({
        schema: 'public',
        table: 'FaqItem',
        index: 'FaqItem_settingsId_idx_6654474f',
        columns: ['settingsId'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'FaqItem',
        foreignKey: {
          name: 'FaqItem_settingsId_fkey',
          columns: ['settingsId'],
          references: { schema: 'public', table: 'SiteSettings', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.enableRowLevelSecurity({ schema: 'public', table: 'FaqItem' }),
      this.enableRowLevelSecurity({ schema: 'public', table: 'SiteSettings' }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
