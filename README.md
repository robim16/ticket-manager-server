1. editar el .env con las credenciales de postgresql
2. ejecutar las migraciones
npx ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:generate "apps/tickets-service/src/migrations/CreateTicketTable" -d "apps/tickets-service/typeorm.config.ts"

3. 