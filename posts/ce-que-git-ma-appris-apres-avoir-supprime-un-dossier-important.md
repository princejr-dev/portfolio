---
title: "Ce que Git m'a appris après avoir supprimé un dossier important"
slug: "ce-que-git-ma-appris-apres-avoir-supprime-un-dossier-important"
date: "2026-07-15"
excerpt: "J'ai supprimé par erreur plusieurs heures de travail. Ce moment de panique m'a rappelé pourquoi Git n'est pas seulement un outil pour collaborer, mais aussi un véritable filet de sécurité."
category: "Git"
cover: "assets/blog/ximage.png"
---

# <span class="title-bar">|<span> Situation

Il y a des erreurs qui nous font progresser. Et puis il y a celles qui nous donnent simplement envie de fixer l'écran pendant quelques secondes en espérant que tout revienne comme avant.

C'est exactement ce qui m'est arrivé.

J'étais en train de réorganiser l'architecture de l'un de mes projets. Depuis quelques jours, je travaillais sur une migration vers une couche `services/` afin de rendre le code plus propre et moins dépendant de Firebase. Tout se passait bien. Les nouvelles fonctions étaient en place, les erreurs étaient corrigées une à une et, pour la première fois, j'avais vraiment l'impression de comprendre pourquoi cette architecture était recommandée.

Puis je me suis dit que j'allais simplement déplacer un fichier dans le bon dossier.

Une opération qui devait prendre... cinq secondes.

Windows m'a demandé une autorisation administrateur. J'ai accepté sans vraiment y prêter attention. La seconde suivante, le dossier `services/` avait complètement disparu.

Au début, je pensais qu'il s'agissait simplement d'un bug d'affichage. J'ai actualisé l'explorateur. Rien. J'ai regardé dans la Corbeille. Toujours rien. J'ai commencé à utiliser la recherche Windows. Toujours rien.

À ce moment-là, une seule question tournait dans ma tête : **comment est-ce que je vais récupérer tout ça ?**

Le pire dans cette histoire, c'est que je n'avais encore fait aucun commit. Pendant plusieurs heures, j'avais corrigé, amélioré et ajusté mon code. Tout existait uniquement sur mon ordinateur.

Heureusement, une partie du travail avait été générée avec l'aide de Claude, ce qui m'a permis de reconstruire progressivement les fichiers. Mais certaines corrections avaient été faites directement par moi. Impossible de me souvenir de chaque modification. J'ai dû relire mon projet, comprendre à nouveau certaines fonctions et refaire plusieurs ajustements manuellement.

Sur le moment, je voyais cette mésaventure comme une énorme perte de temps. Avec un peu de recul, je me rends compte qu'elle m'a appris quelque chose de bien plus important que la migration elle-même.

J'avais toujours vu Git comme un outil pour envoyer mon code sur GitHub. Après cette journée, j'ai commencé à le voir comme une sauvegarde de mon travail. Un commit n'est pas seulement une étape avant un `git push`. C'est une photo de l'état de ton projet à un instant précis. Si tout casse ensuite, tu peux toujours revenir en arrière.

Depuis ce jour, ma manière de travailler a changé. Je ne me dis plus : _« Je ferai un commit quand j'aurai terminé. »_ Je préfère faire plusieurs petits commits au fur et à mesure de mon avancée. Ils racontent l'histoire du projet et me permettent de travailler beaucoup plus sereinement.

Avec le recul, je suis presque content que cette erreur soit arrivée maintenant plutôt que sur un projet contenant plusieurs semaines de travail. Elle m'a coûté quelques heures, mais elle m'a probablement évité une catastrophe beaucoup plus importante dans le futur.

Finalement, je crois que chaque développeur a une histoire qu'il n'oubliera jamais. Celle-ci fait désormais partie des miennes.
