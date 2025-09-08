# REST API Project Setup

This document details the steps taken to set up this REST API project. Each step is explained to provide a clear understanding of the project's foundation.

## 1. Project Initialization

```bash
npm init -y
```

This command initializes a new Node.js project with a `package.json` file. The `-y` flag automatically fills in the default values, which is a quick way to get started. The `package.json` file is crucial as it manages the project's metadata, dependencies, and scripts.

## 2. TypeScript Installation

```bash
npm install -D typescript
```

TypeScript is a statically typed superset of JavaScript that adds optional types. It helps in catching errors early during development and improves code quality and maintainability. We install it as a development dependency (`-D`) because it's only needed during the development phase to compile TypeScript code into JavaScript.

## 3. ts-node Installation

```bash
npm install -D ts-node
```

`ts-node` is a TypeScript execution engine and REPL for Node.js. It allows you to run TypeScript files directly without pre-compiling them into JavaScript. This is extremely useful for development and testing. It's also installed as a development dependency.

## 4. nodemon Installation

```bash
npm install -D nodemon
```

`nodemon` is a tool that helps develop Node.js-based applications by automatically restarting the node application when file changes in the directory are detected. This speeds up the development process as you don't have to manually restart the server every time you make a change. This is also a development dependency.

## 5. .gitignore

A `.gitignore` file was added to the project to prevent sensitive and unnecessary files from being committed to the Git repository. This includes `node_modules`, environment variables, build outputs, and editor-specific files.
