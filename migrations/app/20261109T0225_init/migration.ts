#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/4b51ce05ec8c8a3f7e343d9ebd6bd50db4d645c4fe1a8cb6b64541d3d7f9c934/contract';
import endContract from '../../snapshots/4b51ce05ec8c8a3f7e343d9ebd6bd50db4d645c4fe1a8cb6b64541d3d7f9c934/contract.json' with { type: 'json' };
import {
  Migration,
  MigrationCLI,
  checkExpression,
  col,
  lit,
  primaryKey,
  sql,
} from '@prisma/orm-postgres/migration';

export default class M extends Migration<never, End> {
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createSchema({ schema: 'public' }),
      this.createTable({
        schema: 'public',
        table: 'Arc',
        columns: [
          col('bookId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('coverImage', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('createdAt', 'timestamptz(3)', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('description', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('orderIndex', 'float8', { notNull: true, codecRef: { codecId: 'pg/float8@1' } }),
          col('slug', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('title', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamptz(3)', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'Book',
        columns: [
          col('author', 'text', {
            notNull: true,
            default: lit('Yosef Ryan'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('coverImage', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('createdAt', 'timestamptz(3)', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('description', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('eraId', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('slug', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('status', 'text', {
            notNull: true,
            default: lit('DRAFT'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('title', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('type', 'text', {
            notNull: true,
            default: lit('NOVEL'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('universeId', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamptz(3)', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('wordCount', 'int4', {
            notNull: true,
            default: lit(0),
            codecRef: { codecId: 'pg/int4@1' },
          }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'Book_status_check_bc64f66b',
            sql`"status" IN ('DRAFT', 'PUBLISHED', 'ARCHIVED')`,
          ),
          checkExpression(
            'Book_type_check_5a6afa18',
            sql`"type" IN ('SHORT_FICTION', 'NOVELLA', 'NOVEL', 'WEB_SERIAL')`,
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'BookCharacter',
        columns: [
          col('bookId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('characterId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['bookId', 'characterId'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'BookTag',
        columns: [
          col('bookId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('tagId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['bookId', 'tagId'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'Chapter',
        columns: [
          col('arcId', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('bookId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('content', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('createdAt', 'timestamptz(3)', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('orderIndex', 'float8', { notNull: true, codecRef: { codecId: 'pg/float8@1' } }),
          col('slug', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('status', 'text', {
            notNull: true,
            default: lit('DRAFT'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('summary', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('title', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamptz(3)', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('wordCount', 'int4', {
            notNull: true,
            default: lit(0),
            codecRef: { codecId: 'pg/int4@1' },
          }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'Chapter_status_check_bc64f66b',
            sql`"status" IN ('DRAFT', 'PUBLISHED', 'ARCHIVED')`,
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'Character',
        columns: [
          col('createdAt', 'timestamptz(3)', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('description', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('image', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('universeId', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamptz(3)', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'Era',
        columns: [
          col('createdAt', 'timestamptz(3)', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('description', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('slug', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('universeId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamptz(3)', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'Tag',
        columns: [
          col('createdAt', 'timestamptz(3)', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('slug', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamptz(3)', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'Universe',
        columns: [
          col('createdAt', 'timestamptz(3)', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('description', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('slug', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamptz(3)', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.addUnique({
        schema: 'public',
        table: 'Arc',
        constraint: 'Arc_bookId_slug_key',
        columns: ['bookId', 'slug'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'Book',
        constraint: 'Book_slug_key',
        columns: ['slug'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'Chapter',
        constraint: 'Chapter_bookId_slug_key',
        columns: ['bookId', 'slug'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'Era',
        constraint: 'Era_universeId_slug_key',
        columns: ['universeId', 'slug'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'Tag',
        constraint: 'Tag_name_key',
        columns: ['name'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'Tag',
        constraint: 'Tag_slug_key',
        columns: ['slug'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'Universe',
        constraint: 'Universe_name_key',
        columns: ['name'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'Universe',
        constraint: 'Universe_slug_key',
        columns: ['slug'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Arc',
        index: 'Arc_bookId_idx_3eec38a3',
        columns: ['bookId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Book',
        index: 'Book_eraId_idx_04465c78',
        columns: ['eraId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Book',
        index: 'Book_universeId_idx_57fb06de',
        columns: ['universeId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'BookCharacter',
        index: 'BookCharacter_bookId_idx_3eec38a3',
        columns: ['bookId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'BookCharacter',
        index: 'BookCharacter_characterId_idx_2423fe9d',
        columns: ['characterId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'BookTag',
        index: 'BookTag_bookId_idx_3eec38a3',
        columns: ['bookId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'BookTag',
        index: 'BookTag_tagId_idx_86854244',
        columns: ['tagId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Chapter',
        index: 'Chapter_arcId_idx_c2ffa62c',
        columns: ['arcId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Chapter',
        index: 'Chapter_bookId_idx_3eec38a3',
        columns: ['bookId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Character',
        index: 'Character_universeId_idx_57fb06de',
        columns: ['universeId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Era',
        index: 'Era_universeId_idx_57fb06de',
        columns: ['universeId'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Arc',
        foreignKey: {
          name: 'Arc_bookId_fkey',
          columns: ['bookId'],
          references: { schema: 'public', table: 'Book', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Book',
        foreignKey: {
          name: 'Book_universeId_fkey',
          columns: ['universeId'],
          references: { schema: 'public', table: 'Universe', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Book',
        foreignKey: {
          name: 'Book_eraId_fkey',
          columns: ['eraId'],
          references: { schema: 'public', table: 'Era', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'BookCharacter',
        foreignKey: {
          name: 'BookCharacter_bookId_fkey',
          columns: ['bookId'],
          references: { schema: 'public', table: 'Book', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'BookCharacter',
        foreignKey: {
          name: 'BookCharacter_characterId_fkey',
          columns: ['characterId'],
          references: { schema: 'public', table: 'Character', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'BookTag',
        foreignKey: {
          name: 'BookTag_bookId_fkey',
          columns: ['bookId'],
          references: { schema: 'public', table: 'Book', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'BookTag',
        foreignKey: {
          name: 'BookTag_tagId_fkey',
          columns: ['tagId'],
          references: { schema: 'public', table: 'Tag', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Chapter',
        foreignKey: {
          name: 'Chapter_bookId_fkey',
          columns: ['bookId'],
          references: { schema: 'public', table: 'Book', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Chapter',
        foreignKey: {
          name: 'Chapter_arcId_fkey',
          columns: ['arcId'],
          references: { schema: 'public', table: 'Arc', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Character',
        foreignKey: {
          name: 'Character_universeId_fkey',
          columns: ['universeId'],
          references: { schema: 'public', table: 'Universe', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Era',
        foreignKey: {
          name: 'Era_universeId_fkey',
          columns: ['universeId'],
          references: { schema: 'public', table: 'Universe', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.enableRowLevelSecurity({ schema: 'public', table: 'Arc' }),
      this.enableRowLevelSecurity({ schema: 'public', table: 'Book' }),
      this.enableRowLevelSecurity({ schema: 'public', table: 'BookCharacter' }),
      this.enableRowLevelSecurity({ schema: 'public', table: 'BookTag' }),
      this.enableRowLevelSecurity({ schema: 'public', table: 'Chapter' }),
      this.enableRowLevelSecurity({ schema: 'public', table: 'Character' }),
      this.enableRowLevelSecurity({ schema: 'public', table: 'Era' }),
      this.enableRowLevelSecurity({ schema: 'public', table: 'Tag' }),
      this.enableRowLevelSecurity({ schema: 'public', table: 'Universe' }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
