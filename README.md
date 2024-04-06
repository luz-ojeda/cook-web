# Cook web

[![es](https://img.shields.io/badge/lang-es-red)](https://github.com/luz-ojeda/cook-web/blob/main/README.es.md)

Svelte web application that lets users manage and retrieve cooking recipes. Uses [cook-api](https://github.com/luz-ojeda/cook-api) as the backend.

A deployed version of the full stack web application can be found [here](https://cook-web-weathered-thunder-7639.fly.dev/)

## Features

- Recipe Management: Create, Read, Update, and Delete (CRUD) operations for recipes.
- Search Functionality: Search for recipes by name, difficulty, only vegetarians and ingredients.
- Save Recipes: Users can save recipes in the browser's Local Storage without the need of registration
- Recipe servings scaling: For ingredients that have a determinate amount users can adjust the servings and they will automatically adjust in the individual recipe page

## Getting started

### Prerequisites

- [Node 16 or higer](https://nodejs.org/en/download)
- [npm](https://www.npmjs.com/)

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
