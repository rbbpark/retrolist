-- Load data from CSV files
-- no "NULL" strings. Null values are represented as unquoted empty fields ie 1,,3
COPY handheld_devices FROM '/docker-entrypoint-initdb.d/seed/csv/handhelds.csv' WITH (FORMAT csv, HEADER true); 