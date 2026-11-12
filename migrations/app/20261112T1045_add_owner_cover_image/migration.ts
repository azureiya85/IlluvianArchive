#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/aa85ed4c56d434b2feb46b57cc00b8b0cc4313160de93f56adfeb847d4b4ed8d/contract';
import endContract from '../../snapshots/aa85ed4c56d434b2feb46b57cc00b8b0cc4313160de93f56adfeb847d4b4ed8d/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/ec956febb32dfb62b41612fdab68f860aa68a6b20b95d6166ec0df7acf6e26a4/contract';
import startContract from '../../snapshots/ec956febb32dfb62b41612fdab68f860aa68a6b20b95d6166ec0df7acf6e26a4/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.addColumn({
        schema: 'public',
        table: 'SiteSettings',
        column: col('ownerCoverImage', 'text', { codecRef: { codecId: 'pg/text@1' } }),
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
