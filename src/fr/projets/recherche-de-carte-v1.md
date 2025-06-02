---
title: "Application de recherche de Cartes Yu-Gi-Oh! (version 1)"
description: "Une simple application de recherche de cartes pour le jeu de cartes à collectionner Yu-Gi-Oh!, développée avec HTML et JavaScript vanilla."
disabled: false
date: 2025-04-01
tags: "projets"
permalink: /fr/projets/recherche-de-carte-v1.html
layout: layout.njk
---

<a id="top"></a>

# Application de recherche de Cartes Yu-Gi-Oh! (version 1)

## 🔍 Aperçu du projet

Une application simple pour rechercher et récupérer les détails des cartes du jeu de cartes à collectionner Yu-Gi-Oh!, conçue avec JavaScript vanilla. Les données proviennent de [l'API YGOPRODeck](https://ygoprodeck.com/api-guide/) et le style est réalisé avec [Bulma CSS](https://bulma.io/).

[Lien du projet](https://github.com/littl3fo0t/Yu-Gi-Oh-Card-App)

## ❓ Ce que j'ai appris

### 🚀 En bref

1. L'utilisation des fonctionnalités `async` et `await`, et des Promises.
2. La récupération de données depuis une API.
3. La gestion de l'éta (state management) en JavaScript vanilla.

<p class="back-to-top">(<a href="#top">retour à l'aperçu</a>)</p>

### 🔁 Fonctions `async`

Le mot-clé `async` ne peut être utilisé qu'avec des fonctions. Il indique que cette fonction effectuera des opérations asynchrones, ce qui signifie qu'elle peut exécuter des tâches en arrière-plan sans bloquer le déroulement principal du programme. C'est un composant essentiel pour les requêtes réseau.

```js
const thisFunction = async () => {
    // reste de la fonction ...
};
```

**OU**

```js
async function thatFunction() {
    // reste de la fonction ...
}
```

<p class="back-to-top">(<a href="#top">retour à l'aperçu</a>)</p>

### 🔜 Les Promises en JavaScript

Une **Promise** est un objet qui représente l'achèvement éventuel (ou l'échec) d'une opération asynchrone. Une Promise ne nous donne pas un résultat immédiat, mais garantit que nous en obtiendrons un éventuellement, qu'il s'agisse d'un succès ou d'un échec.

Les Promises sont une fonctionnalité "relativement" nouvelle introduite dans **ES2017**. Elles offrent un moyen plus propre, structuré et lisible d'implémenter du code asynchrone en JavaScript, le faisant ressembler et se comporter davantage comme du code synchrone.

<p class="back-to-top">(<a href="#top">retour à l'aperçu</a>)</p>

### 🛃 Gestion de l'état en JavaScript vanilla

Contrairement aux frameworks web modernes comme React ou Vue, lorsque vous utilisez JavaScript vanilla, il n'y a aucun moyen de rafraîchir automatiquement les éléments à l'écran lorsque l'état de l'application change. De plus, nous n'avons aucun moyen de lier automatiquement nos éléments HTML au code et devons plutôt saisir manuellement les éléments du DOM et modifier leur état en conséquence. Par exemple, supposons que nous ayons du HTML qui ressemble à ceci:
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

Ensuite, nous devons récupérer les éléments du DOM:
```js
const errorMsgBody = document.querySelector("div.message-body");
const errorMsgContainer = document.getElementById("errorMessage");
```

Et modifiez manuellement leur contenu:
```js
form.addEventListener("submit", async event => {
    // Empêcher l'actualisation de la page
    event.preventDefault();

    // Obtenir le nom de la carte
    const cardName = input.value;

    // Valider le nom de la carte
    if (!cardName) {
        errorMsgBody.textContent = "Please enter a valid card name.";
        errorMsgContainer.className = "container";
        return;
    }
    else {
        // Effacer tous les messages d'erreur
        errorMsgBody.textContent = "";
        errorMsgContainer.className = "is-hidden";

        // Le reste du code a été omis pour des raisons de brièveté ...
    }
});
```

<p class="back-to-top">(<a href="#top">retour à l'aperçu</a>)</p>

### 🤔 Pourquoi utiliser JavaScript vanilla?

Comme mentionné dans le fichier `README` de ce projet, l'idée m'est venue après avoir terminé un cours de JavaScript. J'étais sur le point d'entreprendre l'étape logique suivante &ndash; un cours sur React &ndash; quand il m'est apparu que, pour comprendre les aspects "complexes" du développement web que les frameworks modernes ont tendance à abstraire et à cacher, j'avais besoin de créer quelque chose en JavaScript vanilla afin d'apprécier pleinement ce que ces frameworks nous offrent.

<p class="back-to-top">(<a href="#top">retour à l'aperçu</a>)</p>