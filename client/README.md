# Installing React in Vite

Vite is a fast and modern build tool that offers a great development experience for modern web projects. Here's how you can set up a new React project using Vite.

## Prerequisites

- Node.js (version 12.0.0 or higher)
- npm (version 6.0.0 or higher) or Yarn

## Steps to Install React in Vite

### 1. Create a New Vite Project

First, you need to create a new Vite project. You can use the following command:

```bash
# Using npm
npm create vite@latest .

# Using Yarn
yarn create vite .
```
### 2. Choose a Template
##### After running the create command, you'll be prompted to choose a template. Select the react template from the list:

```bash
? Select a framework: » - Use arrow-keys. Return to submit.
  vanilla
  vue
  react
  preact
  lit-element
  svelte
  ```
 Choose the react template 


### 3. Install Dependencies
Install the project dependencies using npm or Yarn:

```sh
# Using npm
npm install

# Using Yarn
yarn
```

### 4. Start the Development Server
Start the development server to see your React app in action:

```sh
# Using npm
npm run dev

# Using Yarn
yarn dev
```
Your new React app should now be running at http://localhost:5173.

### 6. Build the Project
To build the project for production, use the following command:

```sh
# Using npm
npm run build

# Using Yarn
yarn build
The built files will be in the dist directory.
```
## Conclusion
You now have a React project set up with Vite. From here, you can start developing your application using the fast and modern Vite build tool.

