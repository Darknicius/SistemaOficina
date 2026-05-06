@echo off

cd ..

echo Criando ambiente virtual na raiz...
python -m venv venv

echo Ativando ambiente virtual...
call venv\Scripts\activate

echo Atualizando pip...
python -m pip install --upgrade pip

echo Instalando dependencias...
pip install -r requirements.txt

echo Ambiente pronto!
pause
