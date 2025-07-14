
#!/bin/bash
set -e
pg_restore -U postgres -d swapify -v "/docker-entrypoint-initdb.d/restore.dump"
