# Todo App

Una aplicación de gestión de tareas que permite añadir, listar, editar, eliminar y cambiar el estado de las tareas de pendiente a completado.

## Instalación y ejecución local

1. Clonar el repositorio:
   
   git clone https://github.com/DanielMatsuura/todo-project.git
   
   cd todo-project
   
3. Crear archivo de variables de entorno copiando el ejemplo:
   
     Frontend
   
     cd front-end-todo
     
     cp .env.example .env
  
     Backend
     
     cd ../back-end-todo
     
     cp .env.example .env

3. Instalar dependencias y ejecutar:
   
     Backend
     
     cd back-end-todo
     
     npm install
     
     npm run dev
   
     
     Frontend
     cd ../front-end-todo
     
     npm install
     
     npm run dev


### Instalación y ejecución con docker

   3.2 Construir y levantar contenedores:
   
   docker compose up --build
   
   La aplicación estará disponible en:
   
   Frontend: http://localhost:5174
   
   Backend: http://localhost:3000/api


## Tecnologías

- **Backend:** Node.js, Express.js
- **Frontend:** React con TypeScript  
- **Base de datos:** MongoDB  
- **Autenticación:** Auth0  
- **Gestión de estado (Frontend):** MobX  

## Arquitectura y Patrones

### Backend
- Patrón **Service Layer**: separación en `Controller`, `Service` y `Model`.  
- Middlewares:
  - `checkJWT`: protege las rutas usando Auth0.
  - `errorHandler`: captura y maneja errores de forma centralizada.
- Los datos de usuarios **no se almacenan en la base de datos**, solo el `sub` de Auth0 se guarda en las tareas para identificar al propietario.
- Documentación Swagger de los endpoints de Todo: GetAll, GetById, Create, Update, Delete y ToggleState.

### Frontend
- Separación en `vista`, `store` (MobX) y `services`.  
- Hook personalizado `useAuth0` para manejar login y registro usando solo algunas funciones de Auth0.
- Observer (MobX): La tabla se actualiza automáticamente al cambiar los datos en todoStore.
- Componentes de la interfaz de usuario usando la librería Shadcn.
- Notificaciones de éxito y error con react-hot-toast.
