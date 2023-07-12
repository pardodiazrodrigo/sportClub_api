# sportClub_api
## Descripcion:

Dada una tabla de base de datos con 5 campos DNI, nombre, apellido, Fecha de Nacimiento y un booleano que indica si la persona descrita es de GBA, armar un servicio de búsqueda y filtrado desde el backend.

El frontend debe tener una tabla con un buscador y la posibilidad de filtrar por rango de fechas de nacimiento y si es de GBA o no.

La base de datos que se utilizo fue SQLite.

## Instalacion:
- Clonar repositorio
- Instalar los paquetes del backend con el comando (usando un entorno virtual):
    - python -m venv venv 
    - pip install -r requirements.txt
    - python manage.py migrate
- Instalar los paquetes del front con los siguientes comandos:
    - cd client
    - npm install
- Ejecutar servidor backend desde la raiz del proyecto:
    - cd ..
    - python manage.py runserver
- Desde una nueva consola ejecutar el frontend desde la carpeta cliente
    - cd client
    - npm run dev

Cargar clientes usando el CRUD desde:
http://localhost:8000/customers/swagger/

Para visualizar los clientes desde el front:
http://localhost:5173/

La documentacion de la api se puede acceder en:
http://localhost:8000/customers/docs/


