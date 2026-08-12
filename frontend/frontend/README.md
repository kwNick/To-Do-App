# React + TypeScript + Vite

## Features to Add

- Change color theme, light and dark theme.

- style the new react router setup.

- Maybe have the status be "In Progress", "Expired" and "Completed" instead of extra type field. So there isn't two values to show on each task. Not Complete/Complete and Expired

- Is it better to allow user to add a task that is already expired?

- Seperate fetch logic and utility functions. " ✓"
- Expired tasks have a symbol or mark on their component, something red. " ✓"
- Completed tasks have a symbol or mark on their component, something green. " ✓"
- Maybe add Redux instead of all this state. " ✕"
     Redux doesn't seem necessary for this application. Not complex deep passed state.

CURRENT APP

    ↓

1. Clean up App.tsx " ✓"

    ↓

2. taskService.ts " ✓"

    ↓

3. taskUtils.ts " ✓"

    ↓

4. selectedTaskId instead of selectedTask " ✓"

    ↓

5. Loading + error states " ✓"

    ↓

6. Form validation " ✓"

    ↓

7. Expiration system " ✓"

    ↓

8. React Testing Library + Jest " ✓"

    ↓

9. Optimistic updates " ✓"

    ↓

10. React Router " ✓"

    ↓

11. Authentication

## React config template details

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```
