---
title: "Pourquoi j'ai ajouté une couche services dans mon application React avec Firebase"
slug: "migration-firebase-services-layer"
date: "2026-07-14"
excerpt: "Retour d'expérience sur la migration d'une application React utilisant Firebase vers une architecture avec une couche."
category: "Développement"
cover: "assets/blog/ximage.png"
---

# <span class="title-bar">|<span> Situation

Au début du développement de mon application, Firebase me permettait d'avancer rapidement. L'authentification, la base de données Firestore et plusieurs fonctionnalités étaient directement utilisées depuis mes composants React.

Cette approche fonctionnait parfaitement pour commencer. Elle m'a permis de construire rapidement une première version fonctionnelle et de me concentrer sur l'expérience utilisateur.

Mais avec l'évolution du projet, j'ai commencé à remarquer un problème : mes composants devenaient trop dépendants de Firebase.

## <span class="title-bar">|<span> Le problème : une application trop liée à son outil

Lorsque la logique métier est directement écrite dans les composants, chaque changement devient plus difficile.

Un simple appel Firestore pouvait se retrouver mélangé avec :

- l'affichage de l'interface ;
- la gestion des états ;
- les actions utilisateur.

Le code fonctionnait, mais l'architecture devenait moins flexible.

Je me suis alors posé une question importante :

"Que se passerait-il si un jour je voulais remplacer Firebase par Supabase ou par mon propre backend Node.js ?"

La réponse était simple : beaucoup de fichiers devraient être modifiés.

## <span class="title-bar">|<span> La solution : créer une couche services

J'ai donc décidé d'introduire une nouvelle organisation avec un dossier `services/`.

L'idée est simple :

Les composants React ne communiquent plus directement avec Firebase.

Ils appellent uniquement des fonctions de services.

Exemple :

Avant :

```javascript
// Dans un composant React
firebase.firestore().collection("users").get();
```

Après :

```javascript
// Dans un composant React
getUsers();
```

La logique Firebase est maintenant isolée dans un fichier dédié.

## <span class="title-bar">|<span> Les avantages obtenus

Cette nouvelle architecture apporte plusieurs bénéfices :

Un code plus propre et plus facile à comprendre.
Une meilleure séparation des responsabilités.
Une migration future plus simple.
Des services réutilisables dans plusieurs parties de l'application.

Firebase reste toujours utilisé, mais l'application n'est plus entièrement dépendante de lui.

## <span class="title-bar">|<span> Ce que j'ai appris pendant cette migration

Cette expérience m'a appris qu'une application peut fonctionner parfaitement tout en ayant besoin d'améliorations architecturales.

Au début, mon objectif était simplement de créer une fonctionnalité qui fonctionne. Avec le temps, j'ai compris qu'un bon projet doit aussi être pensé pour évoluer.

Les outils comme Firebase permettent de construire rapidement, mais il est important de garder une structure qui laisse des portes ouvertes pour le futur.

## <span class="title-bar">|<span> Conclusion

Cette migration vers une couche services n'a pas changé l'apparence de mon application pour les utilisateurs, mais elle a amélioré sa base technique.

> C'est une étape importante dans mon évolution en tant que développeur : apprendre non seulement à créer des fonctionnalités, mais aussi à construire des applications capables de grandir.
