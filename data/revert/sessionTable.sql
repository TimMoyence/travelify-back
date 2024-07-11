-- Revert migration:sessionTable from pg

BEGIN;

DROP TABLE IF EXISTS "session";

COMMIT;
