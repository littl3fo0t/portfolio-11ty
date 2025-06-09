---
title: "My Portfolio Website"
description: "This website, built using 11ty."
disabled: true
date: 2025-05-20
tags: "projects"
permalink: /en/projects/portfolio.html
layout: layout.njk
---

<a id="top"></a>

# Portfolio Website

## 🔍 Project Overview

My portfolio website developed using [Eleventy (11ty)](https://www.11ty.dev/) with the  [Internationalization (i18n)](https://www.11ty.dev/docs/i18n/) plugin, and deployed to [GitHub Pages](https://pages.github.com/).

[Project Link](https://github.com/littl3fo0t/portfolio-11ty) | [Demo](https://littl3fo0t.github.io/)

## ❓ What Did I Learn?

### 🚀 TL;DR

1. Setting up an 11ty project.
2. Setting up and building a multilingual website with the i18n plugin.
3. Wroking with [Nunjucks](https://mozilla.github.io/nunjucks/) (`.njk`) files.
4. Working with collections in 11ty.
5. Deploying a portfolio website to GitHub Pages.

<p class="back-to-top">(<a href="#top">back to top</a>)</p>

### ⛔ Disclaimer

A small disclaimer before going any further; as the time of writing, 11ty is by far the most difficult technology I have worked with. It is extremely error prone with very generic error messages that make debugging hard. Most of the difficulty in this projects stems from the i18n plugin and the 11ty website itself having the bare minimum amount of documentation.

As usual with these project pages, I have done my best to fact-check everything I write. However, in this case, I have instead chosen to just leave a link to a relevant website regarding aspects that I did not fully comprehend. I’ll make sure to point these out as they appear.

<p class="back-to-top">(<a href="#top">back to top</a>)</p>

### 📁 Setting up a Project with 11ty

Creating an 11ty project is very easy, the only prerequisite is to have `node` installed on your computer, then you can follow the instructions below:

1. Create your project directory and `cd` into it.
2. Open your terminal and run the following command to create a `package.json` file with the default settings:
```bash
npm init -y
```
3. Then install 11ty with the following command:
```bash
npm install --save-dev @11ty/eleventy
```

**Optional step:** you can also create a `.gitignore` file which includes the `node_modules` folder.

<p class="back-to-top">(<a href="#top">back to top</a>)</p>

#### 🔧 Configuring your 11ty Project

If you've followed the above instructions and take a look at your project directory, you'll see that with the exception of `node_modules`, `package.json` and `package-lock.json` (and `.gitignore` optionally), there is **nothing** else. This is normal, since 11ty is a "zero-config" tool by default. The next steps involve creating a `src` folder with a `.eleventy.js` (which will contain all of your project configuration). The `.eleventy.js` should look something like this:
```js
module.exports = function (eleventyConfig) {
  return {
    dir: {
      input: "src"     // this will contain all of your project files
    }
  };
};
```

So, to summarize, at this stage, your project structure should look like something like this:
```bash
<your project name>/
    |- src/
    |- .eleventy.js/
    |- .gitignore
    |- package-lock.json
    |- package.json
```

At this point, you can run the following command to test if 11ty has been successfully installed:
```bash
npx @11ty/eleventy
```

And you should see something like this:
```bash
[11ty] Wrote 0 files in 0.03 seconds (v3.1.1)
```

❗**Note:** at the time of writing, the latest version of 11ty is 3.1.1, yours might differ.

<p class="back-to-top">(<a href="#top">back to top</a>)</p>

#### ✨ Optional Step &ndash; Implement Custom Build Commands

Another optional, but highly recommended step, is to overwrite the default 11ty commands. This is done in the `package.json` file, under the `scripts` attribute by adding the following:
```json
{
    "scripts": {
        "build": "npx @11ty/eleventy",
        "start": "npx @11ty/eleventy --serve",
        "watch": "npx @11ty/eleventy --watch"
  }
}
```

If you do this, you can use the following commands instead of the default ones:
<table>
    <tr>
        <th>Default Command</th>
        <th>Custom Command</th>
        <th>Explanation</th>
    </tr>
    <tr>
        <td><code>npx @11ty/eleventy</code></td>
        <td><code>npm run build</code></td>
        <td>Used to build the website</td>
    </tr>
    <tr>
        <td><code>npx @11ty/eleventy --serve</code></td>
        <td><code>npm start</code></td>
        <td>
            Used to serve your website locally so you can preview it in your browser (only execute <strong>after</strong> running the build command).
            <br>
            <strong>❗Note:</strong> once you run the start command, 11ty will be keeping track of any changes you make to <strong>existing</strong> files and automatically re-render the preview in the browser. However, if you were to add a <strong>new</strong> file(s), I highly recommend you interrupt the local server by pressing on <kbd>Ctrl</kbd> + <kbd>C</kbd> in your terminal, re-running the build command and serving the website again.
        </td>
    </tr>
    <tr>
        <td><code>npx @11ty/eleventy --watch</code></td>
        <td><code>npm run watch</code></td>
        <td>
            This will perform an initial build of your website and monitor for any changes, and re-build as necessary. However, this command does <strong>not</strong> start the local server, for that, you should be using the above command.
        </td>
    </tr>
</table>

For the sake of brevity, the rest of this page will be using the custom commands.

<p class="back-to-top">(<a href="#top">back to top</a>)</p>

#### 🗃️ 11ty Project Structure

If you've been following along until now congratulations 🎉, you can finally start making your website.

<p class="back-to-top">(<a href="#top">back to top</a>)</p>

##### 🔧 Configuring the `.eleventy.js` file

Add the following to your `.eleventy.js` file:
```js
module.exports = function (eleventyConfig) {
  return {
    dir: {
        input: "src",
        includes: "_includes",      // this is where you'll define your base layout and other partials
        data: "_data"               // this is where you'll define to be used across your website (note: 11ty can also pull data from databases and CMS, but I will not be covering that here)
    }
  };
};
```

❗**Note:** you do **not** need to define a directory for the output generated by the build or watch commands. By default, 11ty will automatically create a `_site` folder for your website files at the root directory of your project. Should you wish to overwrite the name of the output folder, you can do so by adding the `output` property to `dir`. If you do this, naming the output folder `public` is best practice.

❗**Note:** if you have any images, css or JavaScript files, I highly recommend you create an `assets` folder in the `src` directory and tell 11ty not process it during the build process by adding a pass through:
```js
module.exports = function (eleventyConfig) {

    eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

    return {
        dir: {
            input: "src",
            includes: "_includes",
            data: "_data"
        }
    };
};
```

<p class="back-to-top">(<a href="#top">back to top</a>)</p>

##### 🏗️ Building your Website

11ty supports many templating languages that you can use and switch between when building your website (I used a mixture of Nunjucks and Markdown), including:
- HTML
- Markdown
- WebC
- JavaScript (*.11ty.js)
- Liquid
- Nunjuck
- Handlebars
- Mustache
- EJS
- Haml
- Pug

Whichever, one(s) you use, your next step should be to create a base layout file in your `_includes` folder, which should just contain a base HTML shell with some placeholders for custom data. For example:
![Base Layout](/assets/images/base-layout.png)

Then you can create an `index` file in the root directory which might look like this:
```html
---
title: My Portfolio Website
header: My First Project with 11ty
layout: layout.njk
---

<p>
    This is my first attempt at using 11ty for a project
</p>
```

This will generate an `index.html` file in your `_site` folder whick should look like this:
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Portfolio Website</title>
    <link rel="stylesheet" href="/assets/css/style.css">
  </head>
  <body>
    <main>
        <h1>My First Project with 11ty</h1>
        <p>
            This is my first attempt at using 11ty for a project
        </p>
    </main>
    <script src="/assets/js/index.js"></script>
  </body>
</html>
```

❗**Note:** I am assuming you named your base layout file `layout.njk`. Also, pay close attention at how I am referencing my css and JavaScript files &ndash; this is mandatory since your output folder would look like this:
```bash
|- _site/
    |- assets/
        |- css/
        |- js/
    |- index.html
```

<p class="back-to-top">(<a href="#top">back to top</a>)</p>

### 💬 Setting up and Building a Multilingual Website

Here comes the part that made this project so tough to work on. I will be describing my experience below, but please keep in mind that since I was learning as I went, there might be aspects where I did not do things the right or efficient way.

<p class="back-to-top">(<a href="#top">back to top</a>)</p>

#### ⬇️ Importing the i18n plugin

Here is the part that gave me the most trouble; as of version 2.0.0 of 11ty, the i18n plugin comes already bundled with the initial installation, meaning you **do not** need to install it separately from `npm`.

The i18n plugin is imported and configured in your `.eleventy.js` file, and the 11ty website lists two different ways to do it, **ESM** and **CommonJS**, only the latter worked for me:
```js
module.exports = async function (eleventyConfig) {        // must be turned into an async function
	const { I18nPlugin } = await import("@11ty/eleventy");  // import plugin

	eleventyConfig.addPlugin(I18nPlugin, {                  // plugin configuration
    defaultLanguage: "en"   // required - will be necessary for later
  });
}
```

I recommend you read more [here](https://www.11ty.dev/docs/plugins/i18n/).

<p class="back-to-top">(<a href="#top">back to top</a>)</p>

#### 🗃️ How to Organize your Project Files

The 11ty and I recommend you create separate "language" folders for all of your files in the root directory. For example, since my website is in English and French, I have `/scr/en/` and `src/fr/` folders. Each folder has its own index page and any other files you might need.

<p class="back-to-top">(<a href="#top">back to top</a>)</p>

#### 📝 Naming your Project Files

When it came to naming my project files, I opted for language-specific file names, because it made sense to me. For example, we have `/en/about.html` and `/fr/a-propos.html`.

The 11ty website however documents a different approach and suggests keeping the file names the same (irrespective of the language), which allows the use of filters. You can read more [here](https://www.11ty.dev/docs/plugins/i18n/).

<p class="back-to-top">(<a href="#top">back to top</a>)</p>

#### ↔️ Sharing Data aross your Project Files

Whichever approach you decide to adopt, you will have files - such as your base layout file or partials - which will only be defined **once** and as such must be implemented in such as way that it will have the correct display and behavior based on the current language.

Again, not sure if I did things the right way here but, my approach was to create a JSON file in each language folder (`/en/en.json` and `/fr/fr.json`) to define the data that would be used in my layout file and partials. For example, in `en.json`, we could have something like this:
```js
{
  "greeting": "Hello"
}
```

In `fr.json`:
```js
{
  "greeting": "Bonjour"
}
```

Then you have to modify your `.eleventy.js` file accordingly:
```js
const fs = require("fs");
const path = require("path");

module.exports = async function (eleventyConfig) {
    const { I18nPlugin } = await import("@11ty/eleventy");

    // Importing JSON files
    const translations = {
        en: JSON.parse(fs.readFileSync(path.resolve(__dirname, "src", "en", "en.json"))),
        fr: JSON.parse(fs.readFileSync(path.resolve(__dirname, "src", "fr", "fr.json")))
    };
    eleventyConfig.addPlugin(I18nPlugin, {
        defaultLanguage: "en",
        translations: translations // adding variables to i18n configuration
    });
```

Then you can use the`greeting` variable in your base layout file as such:
![Sample multilingual greeting](/assets/images/sample-multilingual-greeting.png)

So that when you run the build command, every file in your `en` folder that uses the base layout will have an `h1` element which looks like this:
```html
<h1>Hello</h1>
```

And your files in your `fr` folder will have an `h1` element which looks like this:
```html
<h1>Bonjour</h1>
```

❗**Note:** you might have noticed in the previous code snippet, I am making use of the `fs` and `path` modules to import my `/en/en.json` and `/fr/fr.json` files. Normally, this should not have been necessary. I should have been able to create a `js` file (say `i18n.js`) in the `_data` folder which imports the JSON files like this:
```js
module.exports = {
    en: require("../en/en.json"),
    fr: require("../fr/fr.json")
};
```

And then import it in my `.elventy.js` file as such:
```js
const i18nDataForPlugin = require("./src/_data/i18n.js");

module.exports = async function (eleventyConfig) {
    const { I18nPlugin } = await import("@11ty/eleventy");

    eleventyConfig.addPlugin(I18nPlugin, {
        defaultLanguage: "en",
        translations: i18nDataForPlugin // ⬅️
    });
```

But for some reason, I could not get this approach would not work for me. So instead of spending any more time trying to debug this issue, I instead opted to use the `fs` and `path` modules instead.

❗**Note:** below are some attributes I hightly suggest you include in your JSON files:
<table>
    <tr>
        <th>Attribute</th>
        <th>Explanation</th>
    </tr>
    <tr>
        <td><code>lang</code></td>
        <td>
          Specifies the language of the page. Used in the attribute of the same name in the <code>html</code> tag and can also be accessed via the 11ty <code>page</code> property with <code>page.lang</code>.
        </td>
    </tr>
    <tr>
        <td><code>dir</code></td>
        <td>
            A global attribute that is used to specify the direction of which the text displayed on screen is meant to be read in. For example, in English and French, we read from <strong>left to right</strong>, so <code>dir="ltr"</code>. However, other languages such as Japanese are read from <strong>right to left</strong>, so <code>dir="rtl"</code>.
            <br>
            The <code>dir</code> attribute can be added to individual elements or at the <code>html</code> tag. Read more <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/dir">here</a>.
        </td>
    </tr>
</table>

Example:
```js
{
  "lang": "en",
  "dir": "ltr"
}
```

![Setting lang and dir attributes](/assets/images/lang-and-dir-example.png)

After running the build command, should output something like this:
```html
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <!-- code omitted for brevity -->
</html>
```

❗**Note:** if you've been reading along, one question you might have is "ok, but which version of my website will my users land on?". And the answer is... none. Yes, if you start your local server and head to the URL in your terminal (typically: `localhost:8080`), you will find nothing but an error message along the lines of `Cannot GET/`. Indeed, to see the English version of your website for example, you would need to navigate to `localhost:8080/en/`, which is not ideal. 

From what I've seen and read, 11ty should have, or had, a `fallbackLocales` function which you could add to your `.eleventy.js` file to well, specify a directory to act as a fallback. But it either has been removed or never existed. Instead I opted to create a simple `index.html` file in the `scr` directory which contained a `script` tag that made use of the `navigator.language` method to get the user's broswer language and with the `window.location.href` method, redirect them to the appropriate directory.

You can read more about the `navigator.language` method [here](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/languages).

<p class="back-to-top">(<a href="#top">back to top</a>)</p>

### 🥷 Working with Nunjucks

Nunjucks is a templating language which I have used in my portfolio project and resembles Python in it's syntax. Nunjucks has many features (which you can use alongside 11ty features) which I would rather you go see for youself [here](https://mozilla.github.io/nunjucks/templating.html), but at a surface level, you can:

1. Assign variables:

![Assigning variables in Nunjucks](/assets/images/njk-variable-example.png)

2. Have conditional logic:

![Conditional logic in Nunjucks 1](/assets/images/njk-conditional-example-1.png)

![Conditional logic in Nunjucks 2](/assets/images/njk-conditional-example-2.png)

3. Perform loops:
```js
// fruits.json (or fruits.js)
{
  "fruits": [
    "Apple",
    "Banana",
    "Orange",
    "Pear"
  ]
}
```

![Loops in nunjuck](/assets/images/njk-loop-example.png)

4. Define and use partials:
```html
<!-- 
With Nunjucks, we can define partials and use them in throughout our application.
For example, the code below could be in a file called header.njk:
-->
<header>
  <h1>Some title</h1>
  <p>Some text</p>
</header>
```

![Partials in Nunjucks](/assets/images/njk-include-example.png)

```html
<!-- 
Which will generate the following output:
-->
<!DOCTYPE html>
<html lang="en">
  <!-- head tag omitted for brevity -->
  <body>
    <header>
    <h1>Some title</h1>
    <p>Some text</p>
  </header>
    <!-- rest of body omitted for brevity -->
  </body>
</html>
```

Again, please refer to the official [Nunjucks website](https://mozilla.github.io/nunjucks/) for the complete documentation.

<p class="back-to-top">(<a href="#top">back to top</a>)</p>

### 🥞 Working with Collections in 11ty

Collections in 11ty is a way to group related content together. This is done with the `tags` reserved keyword. For example, if you are creating a blog website that contains many posts, you might structure you files as such:
```bash
My-Blog/
    |- src/
      |- index.html
      |- posts/
        |- post-1.md
        |- post-2.md
        |- post-3.md
    |- .eleventy.js
```

Then in each of your `post` files, you would have something like this at the top:
```md
---
tags: post
title: My First Post!
---
```

This can will automatically create the `post` collection which can be accessed via the `collections.post` object, which could be used as such:
![Collections](/assets/images/collection-list-example.png)

❗**Note:** 11ty by default orders the items inside a collection by the file's created date. Should you wish to change that, you could overwrite the date value as such:
```md
---
tags: post
title: My First Post!
date: 2025-01-01
---
```

Or, you could also implment some custom sorting algorithm. As usual, I invite to read more about collections and how to use them [here](https://www.11ty.dev/docs/collections/).

❗**Note:** when it comes to my portfolio website, I decided to have 2 separate collections - `collections.projects` (for English) and `collections.projets` (for French). There might have been a way to implement this logic just using a single collection - perhaps it involves keeping the file names the same across languages - but I am not sure.

<p class="back-to-top">(<a href="#top">back to top</a>)</p>

#### ↔️ Navigating between items in a Collection

11ty has built-in methods to get information about the current item in a collection but also about the next and previous one (if any). The `getCollectionItem` method fetches the current item in a collection and you can use the `getPreviousCollectionItem` and `getNextCollectionItem` methods to navigate to the previous and next items respectively.

See [here](https://www.11ty.dev/docs/filters/collection-items/) for more details on these functions.

<p class="back-to-top">(<a href="#top">back to top</a>)</p>

### ⬆️ Deploying a Portfolio Website to GitHub Pages (the easy way)

Once you have completed your website with 11ty, you can run the build command to generate your files in the `_site` directory. From there, deploying them to GitHub pages is very easy.
1. Log in or create an account on Github and create a new **public** repository that follows this naming convention: `[your username].github.io`.
2. Once done, you should be prompted to add files to the repository. One of the options should allow you to add files by uploading them - click on that option.
3. Head to your `_site` directory, press <kbd>Ctrl</kbd> + <kbd>A</kbd> to highlight everything, then click and drag all the files into your browser to upload them to GitHub.
4. Wait for the file upload to finish and click on the option to commit to the `main` branch.
5. Wait for GitHub to process the commit.
6. Once done, you should see a little icon under the Deployments section of the page. If it is flashing yellow, this means that GitHub is still processing the deployment. If it is green, that means that the deployment is complete and your website is now live.
7. Go to settings and under the Pages section, you should see a Visit site link that once clicked, should take you directly to your website. If not, you can search for it manually in the search bar by typing `https://[your username].github.io`.

<p class="back-to-top">(<a href="#top">back to top</a>)</p>