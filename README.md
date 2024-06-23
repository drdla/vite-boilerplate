# Vite Boilerplate

This is a boilerplate setup for a [Vite] based [React] app.

It comes with all the tools and configuration you need to start developing right away, automatically preventing errors and adhering to conventions and best practices.

## Tech Stack

### App

The actual app only comes with a minimal setup, to cater to the individual needs of the project:

- [React]
- [TypeScript] (a path alias `~` is set up for './src', so you can import modules from the root as `~/components/...`, `~/modules/...`, etc.)
- [React Router][reactRouter]: browser router
- [TanStack Query (React Query)][tanStackQuery]: asynchronous state management
- [i18next][i18next]: internationalization (i18n)
- [tailwindcss]: utility class based CSS framework
- [Google Fonts][googleFonts]: free web fonts ('Roboto'; loaded in [index.html](./index.html))
- [react-helmet]: document head manager for React

### Build / Dev Tools

- [Browserslist]: define supported browsers for frontend tools ([config](./.browserslistrc))
- [Dev Container][devcontainer] ([config](./.devcontainer/devcontainer.json)) w/ [Docker] ([config](./.devcontainer/Dockerfile)) and [Docker Compose][dockerCompose] ([config](./.devcontainer/docker-compose.yml))
- [EditorConfig]: configure IDE for consistent coding style ([config](./.editorconfig))
- [ESLint]: find and fix problems in JavaScript code ([config](./.eslintrc.json))
- [Husky]: git hooks for automatically linting code, running tests, etc. The hooks should be set up automatically on checkout via the `prepare` package script.
  - [pre-commit hook](/.husky/pre-commit.sh) for running lint-staged and checking types
  - [pre-push hook](/.husky/pre-push.sh) for preventing directly pushing to the main branch
- [i18next-scanner]: scan code, extract translation keys/values, and merge them into i18n resource files ([config](./.importsortrc))
- [import-sort]: sort JavaScript/TypeScript imports based on a [config](./.importsortrc) (similar to Python isort)
- [lint-staged]: run linters (and other packages scripts) on git staged files ([config](./.lintstagedrc.cjs))
- [Prettier]: format code ([config](./prettier.config.js))
- [polyfill.io]: automatically deliver the polyfills required by the user's web browser (loaded in [index.html](./index.html))
- [Stylelint]: CSS linter to avoid errors and enforce conventions ([config](./.stylelintrc.cjs))
- [Vite]: super fast next generation frontend tooling ([config](./vite.config.ts))
- [million]: linter to identify and fix slow code plus compiler to automatically speed up React ([config](./vite.config.ts))
- [VSCode settings](./vscode/settings.json): format on save, add missing imports, update imports on file move, etc. plus [recommended VSCode extensions](./vscode/extensions.json)
- [Webfont Download][webfontDownloadVitePlugin]: Vite plugin to automatically download and bundle Google web fonts
- [plugin-web-update-notification]: Vite plugin to detect new releases and notify user to reload ([config](./vite.config.ts))

### Testing

- [Vitest] for unit tests; files matching _.test._ are run with Vitest and the `test` package script
- [Playwright] for end-to-end tests; files matching _.spec._ are run with Playwright and the `test:e2e` package script
- [Storybook] for component tests ([config](./.storybook)
- [istanbul/nyc][istanbul] for code coverage reports

## Folder Structure

- `public`: files publicly accessible through the browser
  - `locales`: translation files, organized by language
- `src`: application source code
  - `assets`: images, SVGs, etc.
  - `components`: UI components, organized according to [Atomic Design principles][atomicDesign]
    - `atoms`: foundational building blocks w/o dependencies
    - `molecules`: groups of components including other components
    - `organisms`: pieces of functionality built from groups of components
    - `templates`: page-level objects that place components into a layout
  - `constants`: constant values
  - `modules`: self-contained pieces of functionality
  - `stories`: Storybook story definitions
  - `styles`: theme and styles
  - `typings`: TypeScript type definitions and [modules](https://www.typescriptlang.org/docs/handbook/declaration-files/templates/module-d-ts.html)
  - `utils`: reusable functions and libraries, e.g. for string manipulation, internationalization, working with arrays, etc.
- `e2e-tests`: end-to-end tests (unit tests are co-located with the corresponding files)

## Installation

This repo provides a [Dev Container][devcontainer] to enable developing in a fully pre-set up and isolated environment.

Prerequisites: To use Dev Containers, you need to have [Docker] and the [VSCode extension for Dev Containers][devcontainersExtension] set up.

When you open the project in VSCode, it will show a popup informing you that the "Folder contains a Dev Container".
Click the "Reopen in container" button to start the container and open the folder in the container with VSCode configured and all recommended plugins installed. It will also install all required dependencies for you.

When you open the container for the first time, the container needs to build, which might take a little time. Once it has been built, starting the container is almost instant.

If you don't want to work with the Dev Container, you need to install the dependencies with `yarn install` after checking out the repo.

## Usage

### Starting the Devserver

Start the Vite devserver with

```bash
yarn dev
```

You can then open the application on <http://localhost:5173> in your browser.

### Building the App

Create a production build of the app with

```bash
yarn build
```

You can run the production build locally with

```bash
yarn preview
```

### Package Scripts

Some package scripts are run automatically or as components of other package scripts.

The scripts you will typically use are

- `dev`: start the devserver to run the app locally
- `check-npm-packages`: check for packages not listed in the package.json, unused packages, and available updates
- `format`: lint and format the codebase
- `i18n`: extract translation keys
- `lint`: lint the codebase (component of `format` script)
- `lint:styles`: lint the CSS of the codebase
- `storybook`: start storybook
- `test`: run all tests
- `test:coverage`: generate test coverage report for unit/component/integration tests
- `test:e2e`: run end-to-end tests (headless)
- `test:e2e:coverage`: generate test coverage report for end-to-end tests
- `test:e2e:ui`: run end-to-end tests with user interface (for writing and debugging end-to-end test)

<!-- Markdown link definitions -->

[atomicDesign]: https://atomicdesign.bradfrost.com/chapter-2/
[Browserslist]: https://browsersl.ist/
[devcontainer]: https://code.visualstudio.com/docs/devcontainers/containers
[devcontainersExtension]: vscode:extension/ms-vscode-remote.remote-containers
[Docker]: https://www.docker.com/products/docker-desktop
[dockerCompose]: https://docs.docker.com/compose/
[EditorConfig]: https://editorconfig.org/
[ESLint]: https://eslint.org/
[googleFonts]: https://fonts.google.com/
[Husky]: https://typicode.github.io/husky/
[i18next-scanner]: https://github.com/i18next/i18next-scanner
[i18next]: https://www.i18next.com/
[import-sort]: https://github.com/renke/import-sort
[istanbul]: https://istanbul.js.org/
[lint-staged]: https://github.com/lint-staged/lint-staged
[million]: https://million.dev/
[Playwright]: https://playwright.dev/
[plugin-web-update-notification]: https://github.com/GreatAuk/plugin-web-update-notification
[polyfill.io]: https://polyfill.io/
[Prettier]: https://prettier.io/
[React]: https://react.dev/
[react-helmet]: https://github.com/nfl/react-helmet
[reactRouter]: https://reactrouter.com/
[Storybook]: https://storybook.js.org/
[Stylelint]: https://stylelint.io/
[tailwindcss]: https://tailwindcss.com/
[tanStackQuery]: https://tanstack.com/query/
[TypeScript]: https://www.typescriptlang.org/
[Vite]: https://vitejs.dev/
[Vitest]: https://vitest.dev/
[webfontDownloadVitePlugin]: https://github.com/feat-agency/vite-plugin-webfont-dl
