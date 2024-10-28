# Setting Up a Node.js and TypeScript Backend

Follow these steps to set up a Node.js and TypeScript backend for your project.

## Prerequisites

- Node.js installed
- npm (Node Package Manager) installed

## Steps

### 1. Initialize the Project

Open your terminal and run:

```bash
mkdir my-backend
cd my-backend
npm init -y
```

### 2. Install TypeScript and Necessary Packages

```bash
npm install typescript ts-node @types/node --save-dev
```

### 3. Create `tsconfig.json`

Generate a TypeScript configuration file:

```bash
npx tsc --init
```

Modify `tsconfig.json` as needed. Example:

```json
{
  "compilerOptions": {
    "target": "ES6",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true
  }
}
```

### 4. Set Up Project Structure

Create the following folders and files:

```
/src
    /index.ts
```

### 5. Write Your First TypeScript Code

In `src/index.ts`:

```typescript
const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
```

### 6. Install Express

```bash
npm install express
npm install @types/express --save-dev
```

### 7. Update `package.json` Scripts

Add the following scripts to your `package.json`:

```json
"scripts": {
    "start": "ts-node src/index.ts",
    "build": "tsc"
}
```

### 8. Run the Server

Start your server with:

```bash
npm start
```

Your Node.js and TypeScript backend is now set up and running!
