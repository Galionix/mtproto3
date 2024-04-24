@echo off

REM Backup directory
set BACKUP_DIR=P:\projects\telegram\mtproto3\utils\db_backups

REM PostgreSQL connection details
set PG_USER=user
set PG_DB=bots

REM Backup filename
set BACKUP_FILE=%BACKUP_DIR%\backup_%DATE:~10,4%-%DATE:~4,2%-%DATE:~7,2%_%TIME:~0,2%-%TIME:~3,2%-%TIME:~6,2%.sql

REM Run pg_dump
pg_dump -U %PG_USER% -d %PG_DB% > %BACKUP_FILE%
