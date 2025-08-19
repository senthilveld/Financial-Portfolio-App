# Dashboard
# Financial Portfolio Management System (Angular)

This is a web-based application to manage financial portfolios. It includes a responsive dashboard, interactive charts, investment CRUD (mocked), and Angular form validation.

## Features

- Dashboard with performance vs. benchmark mini chart, allocation bars, and key metrics
- Investments list with remove action
- Add Investment form with client-side validation, review-before-submit, and custom number-only directive
- Mocked backend via HTTP interceptor (no server required)
- Simple reactive store service using Angular signals
- Lazy-loaded standalone components and routing
- Pipes, Directives, Interceptors, and basic tests

## Quick Start

Prerequisites: Node.js 18+ and npm

1. Install dependencies

```bash
npm install
```

2. Run the app

```bash
npm start
```

Then open `http://localhost:4200`.

## Tech

- Angular 20 standalone APIs, Router, Reactive Forms, HttpClient
- Signals for state management
- RxJS for async flows

## Scripts

- `npm start` – start dev server
- `npm run build` – production build
- `npm test` – unit tests

## Project Structure

- `src/app/core/models` – TypeScript models
- `src/app/core/services` – Store service using signals
- `src/app/core/interceptors` – Mock API interceptor
- `src/app/features/dashboard` – Dashboard component (lazy loaded)
- `src/app/features/investments` – List and Form components (lazy loaded)
- `src/app/shared` – Reusable components, pipes, directives

## Mock API

The interceptor fakes endpoints:

- `GET api/portfolio` → `{ investments, metrics }`
- `POST api/investments` → creates and returns investment
- `DELETE api/investments/:id` → removes investment

## Testing

```bash
npm test
```

## What Was Implemented

- Responsive dashboard and layout
- Interactive chart (SVG-based) with portfolio vs benchmark
- Reactive form with validation and review-before-submit
- Client-side validation using Angular Validators
- TypeScript models and strong typing throughout
- State management: signal-based store (`PortfolioStoreService`)
- Proper DI for services and interceptors
- Pipes (`CurrencyCompactPipe`) and Directives (`NumberOnlyDirective`)
- Server mocking via HTTP interceptor
- Observables integration via `HttpClient`; signals for state
- Lazy loading for features
- Basic unit tests

### Requirement Checklist

- Must have
  - Dashboard design and responsive layout: Done
  - Interactive charts and benchmark comparison: Done
  - Form creation, validation, and review: Done
  - Client-side validation with Angular: Done
  - Mock service (no backend): Done (HTTP interceptor)
  - README with run instructions: Done
- Good to have
  - Store/state management: Done (signals store)
  - TypeScript type checks: Done
  - Dependency Injection: Done
  - Pipes & Directives: Done
  - Server Mocking: Done
  - HTTP Interceptors: Done
  - Test Cases: Basic tests included
  - Responsive web design: Done
  - Observables/Subjects: Observables used (signals for state)
  - Lazy Loading: Done
  - 2+ functionalities: Dashboard, Investments List, Add Investment

Note: As requested, `node_modules` and `.angular` directories are not included.

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.1.0.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
