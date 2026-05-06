@echo off
cd /d %~dp0..

echo Ativando ambiente virtual...
call venv\Scripts\activate

echo Iniciando API...
python app.py

pause
