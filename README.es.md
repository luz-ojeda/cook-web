# Cook web

[![en](https://img.shields.io/badge/lang-en-blue)](https://github.com/luz-ojeda/cook-web/blob/master/README.md)

Aplicación web en Svelte que permite a los usuarios gestionar y recuperar recetas de cocina. Utiliza [cook-api](https://github.com/luz-ojeda/cook-api) como backend.

Puede encontrar una versión deployada de la aplicación web completa [aquí](https://cook-web-weathered-thunder-7639.fly.dev/).

## Features

- Gestión de recetas: operaciones de lectura para recetas.
- Funcionalidad de búsqueda: busque recetas por nombre, dificultad, solo vegetarianos e ingredientes.
- Guardar recetas: los usuarios pueden guardar recetas en el almacenamiento local (local storage) del navegador sin necesidad de registrarse
- Escalado de porciones de recetas: para ingredientes que tienen una cantidad determinada, los usuarios pueden ajustar las porciones de la receta en la página de la misma y los ingredientes se ajustarán automáticamente.

## Setup

### Requisitos previos

- [Node 16 o superior](https://nodejs.org/en/download)
- [npm](https://www.npmjs.com/)

1. Clona el repositorio

   ```bash
   git clone https://github.com/luz-ojeda/cook-web.git

   ```
2. Navegue hasta el directorio raíz del proyecto

   ```bash
   cd cook-web

   ```
3. Cree un archivo .env y agregue la variable `API_URL`
   ```plaintext
   API_URL=http://localhost:5255
   ```
4. Instalar paquetes y ejecutar

   ```bash
   npm install
   npm run dev
   ```

## Estructura del project
```bash
.
.
├── fly.toml                         # Para deployment en fly.io
├── package.json
├── src
│   ├── app.d.ts
│   ├── app.html
│   ├── app.scss
│   ├── constants.ts
│   ├── errorLogging.ts
│   ├── hooks.server.ts
│   ├── lib
│   │   ├── index.ts
│   │   ├── assets                   # Imágenes de estado vacío, placeholders, etc.
│   │   │   └── ...
│   │   ├── components
│   │   │   └── ...
│   │   ├── scripts                  # Utilidades en Typescript
│   │   │   └── ...
│   │   └── types
│   │       └── ...
│   ├── routes
│   │   ├── admin                   # Rutas restringidas/privadas
│   │   ├── recetas                 # Página de búsqueda de recetas
│   │   ├── recetas-guardadas       # Página de recetas guardadas por el usuario
│   │   ├── sobre-cook
│   │   └── ... 
│   ├── sass
│   │   ├── colors.scss
│   │   ├── recipe-page.scss
│   │   ├── typography.scss
│   │   ├── utilities.scss
│   │   └── variables.scss
│   └── stores
│       ├── burgerMenu.ts           # Control del estado abierto/cerrado del menu mobile
│       ├── recipes.ts
│       └── savedRecipesStore.ts   # Para la manipulación del guardado de recetas y su correcta visualización en /recetas-guardadas
├── static
│   ├── favicon.svg
│   └── fonts
│       └...
├── svelte.config.js
├── tsconfig.json
└── vite.config.ts
```
