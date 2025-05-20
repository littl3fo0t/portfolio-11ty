---
layout: layout.njk
---

I am based in Halifax, Nova Scotia.

Testing

# 📝 Project Overview

A simple Todo app where the user can create a todo list and mark each item as complete as they go. This was my first time coding outside of the [Codecademy](https://www.codecademy.com/) environment while enrolled in their [Create an Advanced Web App with React and Redux](https://www.codecademy.com/learn/paths/advanced-react-redux-sp) Skill Path. I wanted to challenge myself by creating a simple app that would use [Vite](https://vite.dev/) as the build tool instead of the traditional Create React App CLI, which I had been using up to this point, as well as [TypeScript](https://www.typescriptlang.org/) instead of JavaScript.

## ❓ What Did I Learn?

### ⚔️ Vite vs Create React App (CRA)

Typically, you would use the following command to create a React app:

```bash
npx create-react-app@latest <your project name>
```

Whereas a Vite app would be created like this:

```bash
npm create vite@latest
```

After which, you would be prompted with a few questions:

```bash
Project name: <your project name>
Select a framework: <your framework of choice (e.g., React, Vue, etc.)>
Select a variant: <TypeScript OR JavaScript>
```

Regardless of how you create your React app, the next step is to `cd` into the project folder and install dependencies:

```bash
npm install
```

You can then run your app in **dev** mode using:

```bash
# Using CRA:
npm start

# Using Vite:
npm run dev
```

In short, Vite is a more modern, faster, and flexible option compared to CRA, which is older, slower, and more opinionated.

From my experience, an essential feature of modern app/website development is 🔥 Hot Module Replacement (HMR), which allows changes to be reflected in the browser automatically without needing to refresh and lose app state. This happens when you save changes to a file. While HMR is a built-in feature in both CRA and Vite, it is noticeably faster and more reliable in Vite.

### 🤔 Why Use TypeScript?

Story time: while I was learning React on Codecademy, I reached one of their milestone projects that involved creating an app to manage contacts and appointments. This was still early in the Skill Path and was meant to be completed using React only (no Redux). As such, to manage the app's state, I had to define all necessary data and functions in the `App.js` file, passing them down as props to child components. It looked something like this:

```js
// /src/App.js

// assume necessary imports and logic for Appointments are in place
const [contacts, setContacts] = useState([]);

const addContact = (name, email, phone) => {
    setContacts(prevContacts => [...prevContacts, { name, email, phone }]);
};
```

The `addContact` function then needed to be passed into the `Contacts` page and then into the `ContactForm` component where it would be used in the form's `onSubmit` handler:

```App.js > Contacts.js > ContactForm.js```

However, once I reached the `ContactForm.js` file, I made a silly mistake:

```js
// assume the name, email, and phone variables are defined with useState

const handleSubmit = e => {
    e.preventDefault();

    // more omitted logic

    const newContact = { name, email, phone };
    addContact(newContact); // ❌ wrong usage
};
```

And of course, JavaScript being JavaScript, I received **zero** warnings or error messages — until I pressed the Submit button. Since I had already finished with `App.js`, it took me hours to trace the bug. I even tried using Google's Gemini to assist me. Eventually, I realized that I had passed a single object to `addContact`, which was expecting three arguments.

That’s when I decided to look for a way to prevent this kind of error — and the answer was TypeScript.

With TypeScript, I could have defined the shape of the `addContact` function using an interface, and passed that into the component props. For example:

```ts
// /src/components/ContactForm.tsx

interface ContactFormProps {
    // additional props...
    addContact: (name: string, email: string, phone: string) => void;
}
```

Then used it in the component:

```ts
export const ContactForm: React.FC<ContactFormProps> = ({ addContact }) => {
    // ...
};
```

Had I tried to use `addContact` the wrong way, my IDE would have warned me immediately, and I could have fixed it on the spot.
