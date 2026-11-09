import postgres from '@prisma/orm-postgres/runtime';
import { contractFromJson } from '@prisma/orm-postgres/static';
import { DATABASE_URL } from '$app/env/private';
import type { Contract } from '../../prisma/contract.d';
import contractJson from '../../prisma/contract.json' with { type: 'json' };

const contract = contractFromJson<Contract>(contractJson);
const createDb = () => postgres({ contract, url: DATABASE_URL });

// Cache on globalThis so dev HMR doesn't open a new pool on every reload.
const g = globalThis as typeof globalThis & { __db?: ReturnType<typeof createDb> };

export const db = (g.__db ??= createDb());
