---
title: "Yu-Gi-Oh! Card Searching App (version 2)"
description: "A more complex card search app for the Yu-Gi-Oh! trading card game built using Vite, React, TypeScript and Redux."
disabled: false
date: 2025-04-30
tags: "projects"
permalink: /en/projects/card-search-v2.html
layout: layout.njk
---

<a id="top"></a>

# Yu-Gi-Oh! Card Searching App (version 2)

## 🔍 Project Overview

A card searching app for the Yu-Gi-Oh! (YGO) trading card game. Following in the foot steps of [version 1](/en/projects/card-search-v1.html), version 2 comes with the following improvements:
1. It is now possible to search for a card by “fuzzy” name and level/rank/link value instead of just the exact name.
2. UI now includes icons for all card properties and card art.
3. Better looking UI (inspired by the [Yu-Gi-Oh! Master Duel Meta](https://www.masterduelmeta.com/) website).

[Project Link](https://github.com/littl3fo0t/Yu-Gi-Oh-Card-App-v2)

### ❓ What Did I Learn?

#### 🚀 TL;DR

1. Installing and using [Redux](https://redux.js.org/).
2. Creating a dedicated `types` folder to manage and keep track of all data types used across the project.
3. Modifying the project’s `config` files to allow for the use of aliases.
4. Union types.
5. Implementing and extending Interfaces.
6. The difference between `any` and `unknown` data types.
7. Working with “nullable” variables.
8. Working with JavaScript Sets (almost)

<p class="back-to-top">(<a href="#top">back to top</a>)</p>

#### 🫙 Redux

Redux is a JavaScript library (and pattern) that provides a way to manage your application's state. It relies on a single _immutable_ object (often referred to as a **store**) to manage all of the application's state. When the state of the application needs to be changed (like when a button is pressed for example), an **action**, which contains things like an event name and **payload** (which contains the data to be changed), will be **dispatched** to the store. But remember, the store is immutable, therefore to modify the application's state, an entirely new object is created by passing in the current state and the action's payload into a **reducer** function which returns the new object containing all of the application's state. This enables a one-way data flow that is both predictable and testable.

##### ⚙️ Installing Redux

Redux can be installed into your project very easily by running the following command in your terminal:
```bash
npm install @reduxjs/toolkit
```

##### 🍕 Working with Redux

1. In your project's `src` directory, create a `store` file and import the `configureStore` to set up the global store object which will register any reducers defined elsewhere in the code:
```ts

import { configureStore } from "@reduxjs/toolkit";
import mySliceReducer from "./mySlice"; // reducer
export const store = configureStore({
    reducer: {
        searchControls: searchControlsReducer,
        cardData: cardDataReducer
    }
});
```

2. Then within your `App` or `main` file, "provide" the store to make it accessible to your entire component tree:
```jsx
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Provider } from "react-redux"
import { store } from "./store"

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
```

3. At this point you can create any number of **slices** to represent some data in the store. Each slice must have a unique name, an **initial state** and a collection of reducers which are functions that take in the old state, an action and the logic to modify the state based on that action. For example:
```js
import { createSlice } from "@reduxjs/toolkit";

export const mySlice = createSlice({
    name: "mySlice",
    initialState: {},
    reducers: {
        resetMySlice: () => {
            return {};
        },
        toggleCompleted: (state) => {
            state.someToggle = !state.someToggle;
        },
        addToList: (state, action) => {
            state.someList.push(action.payload);
        }
    }
});
```

❗**Note:** you might be looking at the example above and think, "wait, but you're modifying the state directly, didn't you mention that the store was supposed to be immutable?". That's thanks to the `createSlice` method from the Redux library which allows us to write logic as we would normally, then behind the scenes, Redux automatically redefines our logic in a "pure" way. For example, the `addToList` method from above becomes something like this:
```js
function addToList(state, action) {
    return {
        ...state,
        someList: [...state.someList, action.payload]
    };
}
```

4. Redux will automatically generate action functions which correspond to the names you've defined in the `reducers`, which you can then export and use throughout your application:
```js
export const { resetMySlice, toggleCompleted, addToList } = mySlice.actions;
```

You should also export your reducer here and import it in your store:
```js
export default mySlice.reducer;
```

5. Now you can select data anywhere in your application with the `useSelector` hook, for example:
```jsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";

function myList() {
    const someList = useSelector(state => state.someList);

    return (
        <>
            <h1>My List</h1>
            <ol>
                {someList.map((item, index) => (
                    <li key={index}>item.title</li>
                ))}
            </ol>
        </>
    );
}
```

6. Finally, to change the application's data, an action will need to be dispatched from the store, which you can do using the `useDispatch` hook which might send an action with a payload which can be mapped to broswer events, such as clicking a button. For example:

```jsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";

function myList() {
    const someList = useSelector(state => state.someList);
    const dispatch = useDispatch();

    return (
        <>
            <h1>My List</h1>
            <ol>
                {someList.map((item, index) => (
                    <li key={index}>item.title</li>
                ))}
            </ol>
            <button onClick={() => dispatch(addToList("newItem"))}>Add Item</button>
        </>
    );
}
```

##### ↔️ `createAsyncThunk` and `extraReducers`

The `createAsyncThunk` method is used to create `async` functions **outside** of your slice. For example:
```ts
// /src/features/cardData/cardDataSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const loadCardDataByName = createAsyncThunk<
    Card[],                     // Success return type
    string,                     // Argument type of cardName
    { rejectValue: string }     // Error type
>(
    "cardData/loadCardDataByExactName",
    async (cardName, { rejectWithValue }) => {
        try {
            const endpoint = `${apiURL}name=${encodeURIComponent(cardName)}`;
            return await fetchCardData(endpoint);
        } catch (error: any) {
            return rejectWithValue(error.message ?? "Unknown error occured when trying to search by exact name");
        }
    }
);
```

Then, `extraReducers` takes the information from our asynchronous functions and use that data to manipulate the global state. For example:
```ts
// /src/features/cardData/cardDataSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const cardDataInitialState: CardDataState = {
    cards: null,
    isLoadingCards: false,
    failedToLoadCards: false,
    error: null
};

export const cardDataSlice = createSlice({
    name: "cardData",
    initialState: cardDataInitialState,
    reducers: {
        resetCardData: () => {
            return cardDataInitialState;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadCardDataByName.pending, (state) => {
                state.isLoadingCards = true;
                state.failedToLoadCards = false;
                state.cards = null;
                state.error = null;
            })
            .addCase(loadCardDataByName.fulfilled, (state, action: PayloadAction<Card[]>) => {
                state.isLoadingCards = false;
                state.failedToLoadCards = false;
                state.cards = action.payload;
                state.error = null;
            })
            .addCase(loadCardDataByName.rejected, (state, action) => {
                state.isLoadingCards = false;
                state.failedToLoadCards = true;
                state.cards = null;
                state.error = typeof action.payload === "string" ? action.payload : "Unexpected error occurred";
            })
            // rest of code omitted for brevity ...
    }
```

As you should already know, `async` functions always return a Promise, which can either be _pending_, _fulfilled_ or _rejected_.

<p class="back-to-top">(<a href="#top">back to top</a>)</p>

#### 📁 Creating a `types` folder

The most common covention is to create the `types` folder within the `src` directory. Files here end with the `.types.ts` extension. For example:
```bash
<your project name>/
    |- public/
    |- src/
        |- components/
        |- features/
        |- types/
            |- card.type.ts
            |- seachControls.type.ts
```

<p class="back-to-top">(<a href="#top">back to top</a>)</p>

#### 🔧 Modifying the `config` files to allow for the use of aliases

1. The first step is to modify the `tsconfig.app.json` file by adding the following, under the `compilerOptions`:
```json
{
    "compilerOptions": {
        // more properties here...
        "baseUrl": "./src",
        "paths": {
            "@/*": ["./*"],
            "@components/*": ["components/*"],
            "@features/*": ["features/*"],
            "@utils/*": ["utils/*"]
        }
    }
}
```

2. Then, within your terminal, run the following command in the root directory of your project:
```bash
npm install --save-dev @types/node
```

3. Then open your `tsconfig.node.json` file and ensure it has the following under the `compilerOptions`:
```json
{
    "compilerOptions": {
        // more properties here...
        "types": ["node"]
    }
}
```

4. And finally, modify your `vite.config.ts` file as such:
```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
```

All of these modifications allows us to import any necessary types as such:
```ts
import type { <type name> } from "@/types/<file name>.types";
```

Instead of:
```ts
import type { <type name> } from "../types/<file name>.types";
```

❗ **Note:** I think I might have messed up here, originally all of these modifications were intended to achieve something like this:
```ts
import type { <type name> } from "@types/<file name>.types";
```

But despite spending hours on this issue and using AI to help me, I was only able to achieve the first import style.

<p class="back-to-top">(<a href="#top">back to top</a>)</p>

#### 🤓 Using Union Types and Implementing Interfaces

An example of a type file using interfaces and union types:
```ts
// /src/types/searchControls.types.ts

export type SearchType = string | [number, number] | null; // => a union type
// SearchType can be assigned a string, tuple ([number, number]) or null

export interface SearchControls {
    searchBy: string,
    searchTerm: SearchTerm  // => using the union type in an interface
};
```

<p class="back-to-top">(<a href="#top">back to top</a>)</p>

#### 💪 Extending Interfaces

Since I knew somewhat the shape of the data that would be returned from the YGOPRODeck API, I created a "base" card interface which could then be extended:
```ts
// /src/types/card.types.ts

export interface BaseCard {
    name: string,
    type: string,
    frameType: string,
    desc: string,
    card_images: CardImages[],
    race: string,
    humanReadableCardType: string,
    [key: string]: unknown
};

// ...

export interface MonsterCard extends BaseCard {
    typeline: string[],
    atk: number,            // When -1, then attack = "?"
    def: number | null,     // When -1, then defense = "?" (null for link monsters)
    attribute: string,
    level: number | null,   // Also includes Rank (null for link monsters)
    linkval? : number,      // Only applicable to link monsters
    pend_desc?: string,     // Only applicable to pendulum monsters
    monster_desc?: string   // Only applicable to pendulum monsters
};
```

If you've ever done object oriented programming, the concept is the same with the `MonsterCard` object inheriting all the properties of `BaseCard`.

Also, `[key: string]: unknown` is to allow for additionally properties of unknown shape.

<p class="back-to-top">(<a href="#top">back to top</a>)</p>

##### ⚔️ Optional Properties vs Allowing for `null`

You might have noticed that in the `MonsterCard` interface above, I have some properties, such as `def` as being "nullable", and I have some, such as `linkval` that are defined as optional (marked with a `?`) - what is the difference?
Using YGO here to explain; in the game, all monster cards have a defense (DEF) property, with the exception of Link monsters, who instead have a link value (LINK). The way how the YGOPRODeck deals with this is by **always** returning the `def` property for monster cards but making it `null` for link monsters. On the other side, the `linkval` property is ONLY for link monsters, thus making it **optional**.

<p class="back-to-top">(<a href="#top">back to top</a>)</p>

##### ⚔️ `any` vs `unknown`

As you might alway know, TypeScript offers some solutions to work with values of unknown type or shape. You can either decide to opt out of type checking altogether by annotating your variable with the `any` keyword, or you can use `unknown`. The latter is generally considered safer as `unknown` does **not** opt you out of type checking and instead forces you to check the type of the variable before you can use it.

<p class="back-to-top">(<a href="#top">back to top</a>)</p>

#### ⚠️ A word of Caution when working with "nullable" variables

I thought I was being smart by allowing certain values to be `null` in my project, and honestly, it makes sense in practice. For example, going back to the `searchTerm` variable shown above, which is supposed to hold any necessary parameters when fetching card data. For example, if the user desires to search for a card by exact name, then `searchTerm` holds a `string` value corresponding to the card name being searched. However, my original plan for the app included the option for the user to be able to simply view a random card. In this case, they do **not** need to provide any additional parameters. Therefore, it makes sense to set the `searchTerm` to `null`, to explicitly indicate to any developer that we are not expecting a value for it, rather than assigning an empty string to it, which might be ambiguous.
What I had failed to anticipate however was that, I would need to validate each individual "nullable" variable before I could use it, adding a lot of complexity to the project. The way how I dealt with this at first was by accommodating for the possibility of `null` everywhere I would use a "nullable" variable. For example, let's say with a component that accepts props for some internal logic, I would write something like this:
```ts
// /src/components/ViewCard.tsx

// assume a monsterCard variable of type MonsterCard has been defined above
{("def" in monsterCard && monsterCard.def !== null) && 
    <MonsterDEF def={monsterCard.def} />
}
```

❗ **Note:** I had to explicitly check by comparing `monsterCard.def` to `null`. This is because, `def` is a numeric value which can sometimes be equal to 0. When that happens, it is treated as a "falsy" value instead of checking whether it is equal to `null` or not, leading to unexpected behaviors.

Then in the `MonsterDEF` component, I would accommodate for the "nullable" `def` value as such:
```ts
// /src/components/MonsterDEF.tsx

interface MonsterDEFProps {
    def: number | null
};

const MonsterDEF: React.FC<MonsterDEFProps> = ({ def }) => {
    // ...
};
```

However, this is less than ideal in the long run as it causes a significant amount of code duplication.
Later (and by that I mean, much later), I did come up with a better solution for dealing with "nullable" values which involved using local variables as "pass by". For example, if you look at the `src/types/cardData.types.ts` file, you will see that I have defined an `error` property which can either be equal to a `string` value or `null`. When using it in the `src/App.tsx` file, I simply defined a local `error` variable to keep track of the error state:
```ts
// /src/App.tsx

// omitted logic for brevity...

const errorMessage = useSelector(getErrorMessage);  // => error state from store
const [error, setError] = useState("");             // => local error variable
const failedToLoad = useSelector(failedToLoadcards);
```

Then we can keep track of changes in the error state using a `useEffect` hook:
```ts
// /src/App.tsx

// ...

useEffect(() => {
    if (failedToLoad && errorMessage) {
        setError(errorMessage);
    } else {
        setError("");
    }
}, [failedToLoad, dispatch]);
```

Then all we need to worry about is the `failedToLoad` state:
```ts
// /src/App.tsx

// ...

{failedToLoad && <Error error={error} />}
```

Then in the ```Error``` component:
```ts
// /src/components/Error.tsx

interface ErrorProps {
    error: string   // => no need to worry about null!
}
```

😬 Admittedly, the use of `useEffect` hooks could add unnecessary overhead and impact the performance of your app. However, in my case, I believed the trade off was worth it by making my code more manageable and cleaner.

<p class="back-to-top">(<a href="#top">back to top</a>)</p>

#### 🧮 Sets in JavaScript

In JavaScript, a `Set` object can store **unique** values of any type. They work in a similar way to arrays, with the exception that each value in a set can **only occur once**. For example:
```js
const mySet = new Set([1, 2, 2, 3]);
console.log(mySet); // output: Set(3) {1, 2, 3}
```

After this, you can convert your sets to arrays with the `Array.from` method:
```js
const myArray = Array.from(mySet);
console.log(myArray) //output: (3) [1, 2, 3]
```

This property of sets allow from some very interesting methods which I had planned to leverage for my app, however it didn't turn out quite the way I wanted it to. But first some context; as mentioned above, this version of the Yu-Gi-Oh! Card Searching App has the option to search for cards by _Level_ (which also includes _Rank_ and _Link Value_):
![Search by Level](/assets/images/search-by-level.png)

While the YGOPRODeck API does indeed support searching for cards by level, there is a catch. You see, when searching for cards with levels that **match**, we can easily use the following URL: `https://db.ygoprodeck.com/api/v7/cardinfo.php?level={level}` or `https://db.ygoprodeck.com/api/v7/cardinfo.php?linkval={level}` (for link monsters). Logic would dictate that when search for cards with levels that **do not match**, we could use something like this:

```txt
https://db.ygoprodeck.com/api/v7/cardinfo.php?level=gte{minLevel}&level=lte{maxLevel}
```

Where `gte` stands for "greater than or equal to" and `lte`, "less than or equal to" - so in other words, return all cards with a level **between** `minLevel` and `maxLevel`. But that is **not** the case! Should you try to copy and paste the above link in your broswer URL bar and press <kbd>Enter</kbd>, you will see that the API returns **all** cards with a level greater than or equal to `minLevel` and **all** cards less than or equal to `maxLevel` (in other words, **every** monster card with a level).

As such, my first approach for searching for cards by level that do not match, I would fetch the card data in two parts; first with the `minLevel` `(https://db.ygoprodeck.com/api/v7/cardinfo.php?level=gte{minLevel}`) and second with `maxLevel` (`https://db.ygoprodeck.com/api/v7/cardinfo.php?level=lte{maxLevel}`), save the results in separate `Card` sets and use the `intersection` method to return the common elements from both sets:
```js
const mySet = new Set([1, 2, 2, 3]);
const newSet = new Set([4, 2, 3]);
console.log(mySet.intersection(newSet)); // output: Set(2) {2, 3}
```


However, this was not to be, for the simple reason that my sets were sets of `Card` objects and JavaScript compares objects by **reference**, not by **value**. As such, when I tried to use the `intersection` method, it would return nothing. So I had to go back at the drawing board. If you want to see how I implemented the logic for this part, feel free to click on the Project Link above to view the code on GitHub.

❗**Note:** as of writing this, the `intersection` method is currently still in the **proposal** state, which means it is not yet natively supported in all JavaScript environments.

<p class="back-to-top">(<a href="#top">back to top</a>)</p>