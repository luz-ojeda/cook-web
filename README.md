# [Cook web](https://recetassimples.app/) 1.0

[![es](https://img.shields.io/badge/lang-es-red)](https://github.com/luz-ojeda/cook-web/blob/master/README.es.md)

Svelte web application that lets users manage and retrieve cooking recipes. Uses [cook-api](https://github.com/luz-ojeda/cook-api) as the backend.

A deployed version of the full stack web application can be found [here](https://cook-web-weathered-thunder-7639.fly.dev/).

## Features

- Recipe Management: Create, Read, Update, and Delete (CRUD) operations for recipes.
- Search Functionality: Search for recipes by name, difficulty, only vegetarians and ingredients.
- Save Recipes: Users can save recipes in the browser's Local Storage without the need of registration
- Recipe servings scaling: For ingredients that have a determinate amount users can adjust the servings and they will automatically adjust in the individual recipe page

## Getting started

### Prerequisites

- [Node 16 or higer](https://nodejs.org/en/download)
- [npm](https://www.npmjs.com/)

### Running the project

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

1. Clone the repository:

   ```bash
   git clone https://github.com/luz-ojeda/cook-web.git

   ```
2. Navigate to the project's root directory

   ```bash
   cd cook-web

   ```
3. Create an .env file and add `API_URL` variable
   ```plaintext
   API_URL=http://localhost:5255
   ```
4. Install packages and run

   ```bash
   npm install
   npm run dev
   ```

## Directory tree
```bash
.
├── fly.toml                         # For deployment in fly.io
├── package.json
├── src
│   ├── app.d.ts
│   ├── app.html
│   ├── app.scss                     # Root stylesheet. Imports those in ./src/sass and set root styles.
│   ├── constants.ts
│   ├── errorLogging.ts
│   ├── hooks.server.ts              # Server-side hooks
│   ├── lib
│   │   ├── index.ts                 # Main file for exporting library functionality
│   │   ├── assets                   # Directory for static assets like images, placeholders, etc.
│   │   │   └── ...
│   │   ├── components               # Directory for reusable UI components
│   │   │   └── ...
│   │   ├── scripts                  # Directory for TypeScript utilities
│   │   │   └── ...
│   │   └── types                    # Directory for TypeScript type definitions
│   │       └── ...
│   ├── routes
│   │   ├── admin                    # Restricted/private routes
│   │   │   └── ...
│   │   ├── recetas                  # Routes for a page related to recipe searching
│   │   │   └── ...
│   │   ├── recetas-guardadas        # Routes for a page displaying user saved recipes
│   │   │   └── ...
│   │   ├── sobre-cook               # Routes for a page about your application ("About Cook")
│   │   └── ...
│   ├── sass
│   │   ├── colors.scss              # Color variables (primary, grey scales, accents, etc.)
│   │   ├── recipe-page.scss         # SCSS specific to the recipe page
│   │   ├── typography.scss          # SCSS for typography
│   │   ├── utilities.scss           # SCSS utilities
│   │   └── variables.scss           # General SCSS variables (breakpoints, shadows,...)
│   └── stores
│       ├── burgerMenu.ts            # Handling of burger menu open/close state
│       ├── recipes.ts               # Logic related to managing recipes
│       └── savedRecipesStore.ts     # Logic for saving recipes and displaying them correctly
├── static
│   ├── favicon.svg
│   └── fonts                        # Directory for font files
│       └── ...
├── svelte.config.js
├── tsconfig.json
└── vite.config.ts
```
