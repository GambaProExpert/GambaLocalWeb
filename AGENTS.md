# GambaLocalWeb - Agent Guidance

This document provides concise instructions for OpenCode agents working on the `GambaLocalWeb` project.

## Project Overview
*   **Type:** Angular application (Angular CLI 21.2.9)
*   **Package Manager:** npm (version 11.12.1)
*   **Default Component Style:** SCSS

## Key Commands

*   **Start Development Server:**
    ```bash
    npm start
    ```
    (Runs `ng serve`, typically on `http://localhost:4200/`)

*   **Build Project:**
    ```bash
    npm run build
    ```
    (Output in `dist/` directory)

*   **Run Unit Tests:**
    ```bash
    npm test
    ```
    (Uses Vitest test runner)

*   **Generate Component (or other schematics):**
    ```bash
    ng generate component <component-name>
    ```
    (Uses SCSS for styling by default)

*   **Serve SSR Bundle:**
    ```bash
    npm run serve:ssr:GambaEsclavos
    ```