@echo off
cls

cd /d %~dp0..

echo Limpando **pycache**...

for /d /r %%d in (**pycache**) do (
if exist "%%d" (
rmdir /s /q "%%d"
echo Removido: %%d
)
)

echo Limpeza concluida!
pause
