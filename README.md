# Vite Boilerplate

This is a boilerplate setup for a [Vite] based [React] app.
It comes with all the tools and configuration you need to start developing right away, automatically preventing errors and adhering to conventions and best practices.

## Tech Stack

### App

The actual app only comes with a minimal setup, to cater to the individual needs of the project:

- [React]
- [TypeScript]
- [tailwindcss]: utility-first CSS framework
- [React Router][reactRouter]
- [TanStack Query (React Query)][tanStackQuery]: asynchronous state management

### Build / Dev Tools

- [Browserslist]: define supported browsers for frontend tools
- [Dev Container][devcontainer] w/ [Docker] and [Docker Compose][dockerCompose]
- [EditorConfig]: configure IDE for consistent coding style
- [ESLint]: find and fix problems in JavaScript code
- [Husky]: git hooks for automatically linting code, running tests, etc.
- [i18next-scanner]: scan code, extract translation keys/values, and merge them into i18n resource files.
- [import-sort]: sort JavaScript/TypeScript imports (similar to Python isort)
- [lint-staged]: run linters (and other packages scripts) on git staged files
- [Prettier]: format code
- [Stylelint]: CSS linter to avoid errors and enforce conventions
- [Vite]: super fast next generation frontend tooling
- [million]: linter to identify and fix slow code plus compiler to automatically speed up React

### Testing

- [Vitest] for unit tests
- [Playwright] for end-to-end tests
- [Storybook] for component tests
- [istanbul/nyc][istanbul] for code coverage reports

## Installation

This repo provides a [Dev Container][devcontainer] to enable developing in a fully pre-set up and isolated environment.
To use it, you need to have [Docker] and the [VSCode extension for Dev Containers][devcontainersExtension] set up.
When you open the project in VSCode it will show a popup informing you that the "Folder contains a Dev Container".
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
- `lint`: lint the codebase (component for `format` script)
- `lint:styles`: lint the CSS of the codebase
- `storybook`: start storybook
- `test`: run all tests
- `test:coverage`: generate test coverage report for unit/component/integration tests
- `test:e2e`: run end-to-end tests (headless)
- `test:e2e:coverage`: generate test coverage report for end-to-end tests
- `test:e2e:ui`: run end-to-end tests with user interface

<!-- Markdown link definitions -->

[Browserslist]: https://browsersl.ist/
[devcontainer]: https://code.visualstudio.com/docs/devcontainers/containers
[devcontainersExtension]: vscode:extension/ms-vscode-remote.remote-containers
[Docker]: https://www.docker.com/products/docker-desktop
[dockerCompose]: https://docs.docker.com/compose/
[EditorConfig]: https://editorconfig.org/
[ESLint]: https://eslint.org/
[Husky]: https://typicode.github.io/husky/
[i18next-scanner]: https://github.com/i18next/i18next-scanner
[import-sort]: https://github.com/renke/import-sort
[istanbul]: https://istanbul.js.org/
[lint-staged]: https://github.com/lint-staged/lint-staged
[million]: https://million.dev/
[Playwright]: https://playwright.dev/
[Prettier]: https://prettier.io/
[React]: https://react.dev/
[reactRouter]: https://reactrouter.com/
[Storybook]: https://storybook.js.org/
[Stylelint]: https://stylelint.io/
[tailwindcss]: https://tailwindcss.com/
[tanStackQuery]: https://tanstack.com/query/
[TypeScript]: https://www.typescriptlang.org/
[Vite]: https://vitejs.dev/
[Vitest]: https://vitest.dev/
