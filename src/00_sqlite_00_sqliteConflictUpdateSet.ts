import { Column, sql } from "drizzle-orm";
import { SQLiteTable, SQLiteUpdateSetSource } from "drizzle-orm/sqlite-core";

export function sqliteConflictUpdateSet<TTable extends SQLiteTable>(
  table: TTable,
  columns: (keyof TTable["_"]["columns"] & keyof TTable)[]
): SQLiteUpdateSetSource<TTable> {
  return Object.assign(
    {},
    ...columns.map((k) => ({
      [k]: sql.raw(`excluded.${(table[k] as Column).name}`),
    }))
  ) as SQLiteUpdateSetSource<TTable>;
}
