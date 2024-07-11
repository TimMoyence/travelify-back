-- SQLBook: Code
BEGIN;

DO $$ 
DECLARE 
    tbl_name text;
    exists boolean;
BEGIN 
    FOREACH tbl_name IN ARRAY ARRAY['session']
    LOOP
        SELECT EXISTS (
            SELECT 1 
            FROM information_schema.tables 
            WHERE table_schema = 'public' 
            AND table_name = tbl_name
        ) INTO exists;

        IF exists THEN
            EXECUTE format('SELECT * FROM %I LIMIT 1', tbl_name);
            RAISE NOTICE E'\033[32mChecked : %\033[0m', tbl_name;
        ELSE
            RAISE NOTICE E'\033[31mALERT NOT FOUND : %\033[0m', tbl_name;
        END IF;
    END LOOP;
END $$;

ROLLBACK;

