# Event Management Platform

## Descripción del Proyecto

La plataforma de gestión de eventos permite crear, actualizar y eliminar eventos, gestionar asistentes y obtener informes sobre la asistencia a eventos. Está construida con Node.js y utiliza Sequelize para la interacción con una base de datos MySQL. La aplicación también está contenida en un entorno Docker para simplificar la configuración y el despliegue.

## Instalación

Para instalar y ejecutar el proyecto, sigue estos pasos:

1. **Clona el repositorio:**

   ```bash
   git clone https://github.com/tu_usuario/event-management-platform.git
   cd event-management-platform

2. **Configura el archivo .env:**

   ```bash
   cp .env.example .env 

Modifica el archivo .env con los detalles de tu base de datos.

3. **Inicia los contenedores de Docker:**

   ```bash
   docker-compose up
   
4. **Carga inicial de la base de datos:**

  Selecciona el id del contenedor de mysql y cópialo
   ```bash
   docker ps
```

Ingresa al contenedor

```bash
   docker exec -t <<id_contenedor_mysql>> mysql -u root -p
```

Usa el password "exmaple"

y allí ejecuta todas las consultas almacenadas en el archivo "src/sql_scripts/setup.sql"

## Documentación sobre cómo consumir la API, incluidos los endpoints disponibles y los métodos HTTP admitidos

https://app.getpostman.com/join-team?invite_code=4111893ea4e6dc7251a7b75ce87deb44&target_code=ed7d8e537d6fd2671982cc724ec76d0c

**EndPoints**

- POST Auth
- GET Events
- GET Event by Id
- POST Events Create
- POST Events Upload Excel
- PUT Events Edit
- DEL Events Delete
- GET Event Nearby Places
- GET Events Attendance Report
- GET Attendees
- POST Attendees Create

**Paso inicial:**

  Para acceder a cada uno de los servicios, se necesita un token, este se crea usando el servicio 
  POST Auth
  Automáticamente guardará el token en el enviroment de Postman y se usará en las demás consultas

## Modelo Relacional de la Base de Datos

Este documento describe el modelo relacional de la base de datos utilizado en la aplicación. El modelo incluye las tablas principales y sus relaciones.

## Tablas

### `Events`

| Columna    | Tipo de Dato | Restricciones                                | Descripción                       |
|------------|--------------|---------------------------------------------|-----------------------------------|
| `id`       | INT          | PRIMARY KEY, AUTO_INCREMENT                  | Identificador único del evento     |
| `name`     | VARCHAR(255) | NOT NULL                                   | Nombre del evento                  |
| `date`     | DATETIME     | NOT NULL                                   | Fecha y hora del evento            |
| `location` | VARCHAR(255) | NOT NULL                                   | Ubicación del evento               |
| `createdAt`| TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP                  | Fecha y hora de creación           |
| `updatedAt`| TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Fecha y hora de última actualización |

### `Attendees`

| Columna    | Tipo de Dato | Restricciones                                | Descripción                        |
|------------|--------------|---------------------------------------------|------------------------------------|
| `id`       | INT          | PRIMARY KEY, AUTO_INCREMENT                  | Identificador único del asistente   |
| `name`     | VARCHAR(255) | NOT NULL                                   | Nombre del asistente                |
| `email`    | VARCHAR(255) | NOT NULL, UNIQUE                           | Correo electrónico del asistente    |
| `eventId`  | INT          | FOREIGN KEY REFERENCES Events(id)           | Identificador del evento            |
| `createdAt`| TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP                  | Fecha y hora de creación           |
| `updatedAt`| TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Fecha y hora de última actualización |

### Relaciones

- **Relación entre `Events` y `Attendees`:**
  - Un evento puede tener múltiples asistentes.
  - Cada asistente está asociado a un solo evento.
  - La relación es de uno a muchos (`Events` 1:n `Attendees`).

### Diagrama ER

```plaintext
+----------------+
|    Events      |
+----------------+
| id             | PK
| name           |
| date           |
| location       |
| createdAt      |
| updatedAt      |
+----------------+
        |
        | 1
        |
        | n
+----------------+
|  Attendees     |
+----------------+
| id             | PK
| name           |
| email          |
| eventId        | FK
| createdAt      |
| updatedAt      |
+----------------+

```
   
## Jenkins

### Configuración de Jenkins para CI/CD

#### Instalación y Configuración de Jenkins

1. **Instala Jenkins en un servidor** o utiliza un servicio en la nube.
2. **Accede a la interfaz web de Jenkins** para configurar el entorno inicial.

#### Configuración del Repositorio

1. **Instala el plugin correspondiente** para tu sistema de control de versiones (por ejemplo, Git).
2. **Configura Jenkins para acceder a tu repositorio de código** (GitHub, GitLab, Bitbucket).

#### Crear un Pipeline de Jenkins

1. **Declarar el Pipeline:**

   Crea un nuevo proyecto de tipo "Pipeline" en Jenkins.

2. **En la sección "Pipeline"**, define tu archivo `Jenkinsfile` (ubicado en el repositorio) que contiene el script del pipeline.

   **Ejemplo de Jenkinsfile:**

   ```groovy
   pipeline {
       agent any

       stages {
           stage('Build') {
               steps {
                   script {
                       sh 'npm install'
                       sh 'npm run build'
                   }
               }
           }
           stage('Test') {
               steps {
                   script {
                       sh 'npm test'
                   }
               }
           }
           stage('Deploy') {
               steps {
                   script {
                       sh 'docker-compose up -d'
                   }
               }
           }
       }
       post {
           always {
               archiveArtifacts artifacts: '**/target/*.jar', allowEmptyArchive: true
               junit '**/target/test-*.xml'
           }
       }
   }```

### Configuración de Webhooks

Configura webhooks en tu repositorio para que Jenkins se active automáticamente con cada push o merge.

### Pruebas y Despliegue

Jenkins ejecutará automáticamente el build, las pruebas y el despliegue en cada commit al repositorio.
# Diagrama Arquitectónico

## Descripción del Diagrama

La arquitectura presentada muestra un diseño para una plataforma de gestión de eventos que implementa resiliencia, idempotencia y escalabilidad en un entorno híbrido entre on-premise y cloud.

```plaintext
                                      +---------------------+
                                      |     Cloud Load      |
                                      |     Balancer        |
                                      +---------------------+
                                                 |
                                                 |
           +-------------------+----------------+--------------------+
           |                                       |
+-------------------------+          +-------------------------+ 
|     Cloud API Gateway   |          |  On-Premise API Gateway  |
+-------------------------+          +-------------------------+
           |                                       |
           |                                       |
  +--------+--------+                +------------+-----------+
  |                 |                |                        |
+-----------+  +-----------+   +-----------+            +-----------+
|   Cloud    |  |   Cloud    |   |  On-Premise|          | On-Premise|
|  Microservice|  |  Microservice|   |  Microservice |          | Microservice|
+-----------+  +-----------+   +-----------+            +-----------+
           |                                       |
           |                                       |
  +--------+--------+                +------------+-----------+
  |                 |                |                        |
+-----------+  +-----------+   +-----------+            +-----------+
|  Cloud DB   |  |  Cloud Cache|   |  On-Premise |        | On-Premise |
|             |  |             |   |   DB        |        | Cache      |
+-----------+  +-----------+   +-----------+            +-----------+
           |                                       |
           |                                       |
           +-------------------+-------------------+
                               |
                       +--------------------+
                       |   Cloud Storage    |
                       +--------------------+


```






