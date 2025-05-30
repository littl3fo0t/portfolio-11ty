---
title: "Yu-Gi-Oh! Card Searching App (version 1)"
description: "A simple card search app for the Yu-Gi-Oh! trading card game built using HTML and vanilla JavaScript."
disabled: false
date: 2025-04-01
tags: "projects"
permalink: /en/projects/card-search-v1.html
layout: layout.njk
---

<a id="top"></a>

# Yu-Gi-Oh! Card Searching App (version 1)

## 🔍 Project Overview

A simple app to search and retrieve card details for the **Yu-Gi-Oh! Trading Card Game** built using vanilla JavaScript, data provided by the [YGOPRODeck API](https://ygoprodeck.com/api-guide/) and styling done using [Bulma CSS](https://bulma.io/).

[Project Link](https://github.com/littl3fo0t/Yu-Gi-Oh-Card-App)

### ❓ What Did I Learn?

#### 🚀 TL;DR

1. Using the `async` and `await` keywords and working with Promises.
2. Fetching data from an API.
3. Managing state in vanilla JavaScript.

<p class="back-to-top">(<a href="#top">back to top</a>)</p>

#### 🔁 `async` Functions

The `async` keyword can **only** be used with functions and indicates that this function will be performing _asynchronous_ operations - meaning it can run tasks in the background without blocking the main flow of the program. This is an essential component for network requests.

```js
const thisFunction = async () => {
    // function body ...
};
```

**OR**

```js
async function thatFunction() {
    // function body ...
}
```

<p class="back-to-top">(<a href="#top">back to top</a>)</p>

#### 🔜 Promises in JavaScript

A **Promise** is an object representing the eventual completion (or failure) of an asynchronous operation. A Promise does not give us a result immediately, but _guarantees_ that we will eventually get one - whether it is a success or failure.

Promises are a "relatively" new feature introduced in **ES2017** and provide a more clean, structured and readable way to implement asynchronous code in JavaScript, making it look and behave more like synchronous code.

<p class="back-to-top">(<a href="#top">back to top</a>)</p>

#### 🛃 Managing State in Vanilla JavaScript

Unlike a modern web framework like React or Vue, when using vanilla JavaScript, there is no way to automatically re-render the elements on screen when the state of the application changes. Additionally, we have no way of automatically binding our HTML elements to the code and instead need to manually grab the DOM elements and modify their state accordingly. For example, assume we have some HTML that looks like this:

```html
<div class="is-hidden" id="errorMessage">
    <article class="message is-danger">
        <div class="message-header">
            <p>Error</p>
        </div>
        <div class="message-body"></div>
    </article>
</div>
```

Using vanilla JavaScript, we must grab the necessary DOM elements:
```js
const errorMsgBody = document.querySelector("div.message-body");
const errorMsgContainer = document.getElementById("errorMessage");
```

And then manually change their content and/or show condition:
```js
form.addEventListener("submit", async event => {
    // Prevent page from refreshing
    event.preventDefault();

    // Get card name from input field
    const cardName = input.value;

    // Validate card name
    if (!cardName) {
        errorMsgBody.textContent = "Please enter a valid card name.";
        errorMsgContainer.className = "container";
        return;
    }
    else {
        // Clear any error messages
        errorMsgBody.textContent = "";
        errorMsgContainer.className = "is-hidden";

        // Rest of code omitted for brevity
    }
});
```

<p class="back-to-top">(<a href="#top">back to top</a>)</p>

#### 🤔 Why even use Vanilla JavaScript?

As a mentioned in the `README` text of this project, the idea for this came to me after having completed a JavaScript course. I was ago to undertake the next logical step - a React course - when it occurred to me that, in order to understand the "messy" parts of web development that modern frameworks tend to abstract and hide from you, I needed to create something in vanilla JavaScript in order to fully appreciate what these frameworks do for us.

<p class="back-to-top">(<a href="#top">back to top</a>)</p>