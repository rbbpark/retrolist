-- Load data from CSV files
COPY handheld_devices FROM '/docker-entrypoint-initdb.d/seed/csv/handheld_devices.csv' WITH (FORMAT csv, HEADER true); 