module.exports = {
  name: 'default',
  type: 'postgres',
  url: process.env.PG_URL,
  synchronize: false,
  entities: [process.env.PG_ENTITIES],
  migrationsTableName: process.env.PG_MIGRATION_TABLE,
  migrations: [process.env.PG_MIGRATION_FILE],
  cli: {
    migrationsDir: 'src/migration'
  },
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false
    }
  }
}
