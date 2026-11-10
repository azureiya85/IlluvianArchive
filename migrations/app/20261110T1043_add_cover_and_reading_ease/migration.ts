#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/4b51ce05ec8c8a3f7e343d9ebd6bd50db4d645c4fe1a8cb6b64541d3d7f9c934/contract';
import startContract from '../../snapshots/4b51ce05ec8c8a3f7e343d9ebd6bd50db4d645c4fe1a8cb6b64541d3d7f9c934/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/602195f67d99e523e775aed0116c687583cc8fd6861fb9638867f05aedb67bb7/contract';
import endContract from '../../snapshots/602195f67d99e523e775aed0116c687583cc8fd6861fb9638867f05aedb67bb7/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, lit, sql } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.addColumn({
        schema: 'public',
        table: 'Book',
        column: col('publishedAt', 'timestamptz(3)', {
          codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
        }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'Book',
        column: col('readingEase', 'float8', { codecRef: { codecId: 'pg/float8@1' } }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'Book',
        column: col('readingLevel', 'text', { codecRef: { codecId: 'pg/text@1' } }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'Chapter',
        column: col('publishedAt', 'timestamptz(3)', {
          codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
        }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'Era',
        column: col('orderIndex', 'float8', {
          notNull: true,
          default: lit(0),
          codecRef: { codecId: 'pg/float8@1' },
        }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'Universe',
        column: col('coverImage', 'text', { codecRef: { codecId: 'pg/text@1' } }),
      }),
      this.addCheckConstraint({
        schema: 'public',
        table: 'Book',
        constraint: 'Book_readingLevel_check_3168a776',
        expression: sql`"readingLevel" IN ('VERY_EASY', 'EASY', 'FAIRLY_EASY', 'STANDARD', 'FAIRLY_DIFFICULT', 'DIFFICULT', 'VERY_DIFFICULT')`,
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
