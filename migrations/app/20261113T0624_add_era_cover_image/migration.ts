#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/aa85ed4c56d434b2feb46b57cc00b8b0cc4313160de93f56adfeb847d4b4ed8d/contract';
import startContract from '../../snapshots/aa85ed4c56d434b2feb46b57cc00b8b0cc4313160de93f56adfeb847d4b4ed8d/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/e57615b5d6c19869bed01866f3da5f1fa45c017c1953d8e9018bdbde4d8430ec/contract';
import endContract from '../../snapshots/e57615b5d6c19869bed01866f3da5f1fa45c017c1953d8e9018bdbde4d8430ec/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.addColumn({
        schema: 'public',
        table: 'Era',
        column: col('coverImage', 'text', { codecRef: { codecId: 'pg/text@1' } }),
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
