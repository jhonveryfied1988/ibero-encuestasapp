# **🚀 Backend del Proyecto de Encuestas**

¡Hola! Este manual te explica cómo levantar y configurar el backend del sistema de encuestas. Está diseñado para que sea muy claro y fácil de seguir. 💡

---

## **📋 Requisitos previos**

Antes de arrancar, asegúrate de tener lo siguiente instalado en tu máquina:

- 🖥️ **Node.js** (versión 16 o superior) 👉 [Descargar Node.js](https://nodejs.org/)
- 🐬 **MySQL** (versión 8 o superior) 👉 [Descargar MySQL](https://dev.mysql.com/downloads/)
- 📦 **npm** (se instala automáticamente con Node.js)
- 🛠️ **Prisma CLI** 👉 Instala Prisma globalmente con:


  ```bash
  npm install -g prisma

  ```


## **1️⃣ Clona el repositorio
Trae el proyecto a tu máquina:

  ```bash
git clone https://github.com/tu-usuario/tu-repo.git
cd backend
  ```

  2️⃣ Instala las dependencias
Ejecuta este comando para instalar las librerías necesarias:

```bash
npm install
```


3️⃣ Configura las variables de entorno
Crea un archivo .env en la raíz del proyecto y copia lo siguiente:

.env

```bash
DATABASE_URL="mysql://usuario:contraseña@localhost:3306/nombre_base_datos"
JWT_SECRET="mi_secreto_123"
JWT_EXPIRES_IN="3600"
```

**Cambia usuario, contraseña y nombre_base_datos según tu configuración de MySQL.
**El campo JWT_SECRET es la clave para los tokens JWT.

4️⃣ Configura Prisma
Verifica que el archivo prisma/schema.prisma esté correcto.
Aplica las migraciones para crear las tablas en la base de datos:

```bash
npx prisma migrate dev --name init
```

Genera el cliente de Prisma para que tu código lo use:

```bash
npx prisma generate
```


5️⃣ Levanta el servidor
Ahora sí, enciende el backend con este comando:


```bash
npm run start:dev
```

### Tu backend estará disponible en: http://localhost:3000



🗃️ Modelo de la Base de Datos
La base de datos está organizada en varias tablas interrelacionadas para manejar usuarios, encuestas, preguntas y respuestas.

📄 Usuarios (User)
Campo	Tipo	Descripción
id	String	Identificador único (UUID).
name	String	Nombre completo del usuario.
email	String	Correo electrónico único.
phone	String	Número de teléfono único.
password	String	Contraseña encriptada.
createdAt	DateTime	Fecha de creación.
updatedAt	DateTime	Última actualización.


📄 Encuestas (Survey)
Campo	Tipo	Descripción
id	String	Identificador único (UUID).
title	String	Título descriptivo de la encuesta.
isActive	Boolean	Indica si la encuesta está activa.
userId	String	Relación con el usuario creador.
createdAt	DateTime	Fecha de creación.
updatedAt	DateTime	Última actualización.
deletedAt	DateTime	Fecha de eliminación (soft delete).


📄 Preguntas (Question)
Campo	Tipo	Descripción
id	String	Identificador único (UUID).
text	String	Texto de la pregunta.
type	Enum	Tipo de pregunta (true_false, single_choice, multiple_choice, open).
surveyId	String	Relación con la encuesta asociada.
createdAt	DateTime	Fecha de creación de la pregunta.
updatedAt	DateTime	Última actualización de la pregunta.


📄 Opciones (Option)
Campo	Tipo	Descripción
id	String	Identificador único (UUID).
text	String	Texto descriptivo de la opción.
isCorrect	Boolean	Indica si es una opción correcta.
questionId	String	Relación con la pregunta asociada.
createdAt	DateTime	Fecha de creación de la opción.
updatedAt	DateTime	Última actualización de la opción.


📄 Respuestas (Response)
Campo	Tipo	Descripción
id	String	Identificador único (UUID).
userId	String	Relación con el usuario que respondió.
surveyId	String	Relación con la encuesta asociada.
answers	Json	Respuestas proporcionadas en formato JSON.
createdAt	DateTime	Fecha de la respuesta.