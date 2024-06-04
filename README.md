- credit: https://github.com/drizzle-team/drizzle-orm/issues/1728#issuecomment-1981233443
- credit: https://gist.github.com/capaj/270a4acaf649cc1242fc09e993c95f50

```ts
export function pgConflictUpdateSet<TTable extends PgTable>(
  table: TTable,
  columns: (keyof TTable["_"]["columns"] & keyof TTable)[]
): PgUpdateSetSource<TTable> {
  return Object.assign(
    {},
    ...columns.map((k) => ({
      [k]: sql.raw(`excluded.${(table[k] as Column).name}`),
    }))
  ) as PgUpdateSetSource<TTable>;
}
```

Usage：

```ts
tx.insert(skSession)
  .values(sessions)
  .onConflictDoUpdate({
    target: [skSession.session],
    set: conflictUpdateSet(skSession, [
      "startTimestamp",
      "stats",
      // ... all colums to update here
    ]),
  });
```
