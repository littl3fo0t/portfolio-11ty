---
title: "My Portfolio Website"
description: "This website, built using 11ty."
disabled: true
date: 2025-05-20
tags: "projects"
permalink: /en/projects/portfolio.html
layout: layout.njk
---

# Portfolio Website

## 🔍 Project Overview

My portfolio website developed using [Eleventy (11ty)](https://www.11ty.dev/) with the  [Internationalization (I18n)](https://www.11ty.dev/docs/i18n/) plugin, and deployed to [GitHub Pages](https://pages.github.com/).

[Project Link](https://github.com/littl3fo0t/portfolio-11ty) | [Demo](https://littl3fo0t.github.io/)

## ❓ What Did I Learn?

### 🚀 TL;DR

1. Setting up an 11ty project.
2. Setting up and building a multilingual website with the I18n plugin.
3. Wroking with [Nunjucks](https://mozilla.github.io/nunjucks/) (`.njk`) files.
4. Working with collections in 11ty.
5. Deploying a portfolio website to GitHub Pages.

### ⛔ Disclaimer

A small disclaimer before going any further; as the time of writing, 11ty is by far the most difficult technology I have worked with. It is extremely error prone with very generic error messages that make debugging hard. Most of the difficulty in this projects stems from the I18n plugin and the 11ty website itself having the bare minimum amount of documentation.

As usual with these project pages, I have done my best to fact-check everything I write. However, in this case, I have instead chosen to just leave a link to a relevant website regarding aspects that I did not fully comprehend. I’ll make sure to point these out as they appear.

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
[11ty] Wrote 0 files in 0.03 seconds (v3.1.0)
```

❗**Note:** at the time of writing, the latest version of 11ty is 3.1.0, yours might differ.

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

#### 🗃️ 11ty Project Structure

If you've been following along until now congratulations 🎉, you can finally start making your website.

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