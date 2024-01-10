# GithubSearchApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

# Angular GitHub Search App

## Overview

This is a single-page application built with Angular that allows users to search for GitHub users, view their public profiles, and maintain a search history.

## Features

- **Dashboard Page:**
  - Navigate between the search page and history page.
  
- **Search Page:**
  - Search for GitHub users and view their public profiles.
  - Search results are stored in local storage.
  - Loader is displayed during search requests.

- **History Page:**
  - View past searches (both successful and unsuccessful).
  - Clear individual searches to declutter history.

- **User Profile:**
  - View detailed information about a user from search results or history.

## Technical Details

- **Frontend:**
  - Angular v13
  - State management with NgRx
  - Uses GitHub API for user data

- **Local Storage:**
  - Search results are stored in local storage.

- **Loader:**
  - A simple CSS spinner is used to indicate loading during search.

- **Routing:**
  - Angular Router is used for navigation.

## Setup

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd angular-github-search-app

