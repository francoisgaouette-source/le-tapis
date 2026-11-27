# La Donne — consignes pour Claude Code

La Donne (app.ladonne.ai) : les règles des jeux de cartes, de dominos, de dés et de société, expliquées en deux minutes et en animation, puis on invite les amis et on fixe la soirée de jeux. Personnage : **Maxence**.

Le dépôt s'appelle `le-tapis`, et le projet Supabase « Le Tapis » (`uwfnwnreohdyaxainvna`) : ce sont des noms techniques. Le nom de l'app est **La Donne**, jamais « Le Tapis » dans ce que les gens voient.

Lis le README avant tout changement important.

## Particularités de ce dépôt

- **Mise en ligne** : GitHub Pages, domaine `app.ladonne.ai` (fichier `CNAME`). Chaque modification de `main` est publiée. Il n'y a aucune étape de compilation.
- **Règles et animations** : `jeux.js` (`G` = fiches, `SCN` = étapes d'animation).
- **Mise à jour des téléphones** : après un changement de l'app, augmente `CACHE` dans `sw.js`.

## Avec qui tu travailles

- Francois, le propriétaire. Il n'est pas développeur : réponds-lui en français, en mots simples, avec le résultat d'abord et sans jargon inutile.
- Avant toute action difficile à défaire (base de données en production, tables du compte, DNS, suppression), explique ce que tu vas faire et attends son accord.

## Famille d'apps : L'Établi

Cette app fait partie de **L'Établi**, la maison qui regroupe les apps de Francois. L'ancien nom HoldingAI reste dans le code (`holdingai.js`, `HOLDINGAI`, projet Supabase « HoldingAI Compte ») : ces noms techniques ne changent pas, les gens ne les voient jamais.

- Noms officiels des apps : L'Échange, Le Gousset, Le Pourquoi, Le Commis, Le Fanion, Le Seuil, Le Plumeau, Le Vestibule, Le Tiroir, La Voûte, La Donne, La Nostalgie, L'Escale, Le Débours. Scotland Cup est un projet à part.
- Structure commune des adresses : `<domaine>` sert le site, `app.<domaine>` sert l'app, `www.<domaine>` renvoie vers `<domaine>`. Le compte commun est à `compte.letabli.ai`.
- Les domaines sont achetés et gérés dans Cloudflare. Un nouveau domaine doit être relié à l'app dans Cloudflare avant qu'on change une adresse dans le code ou dans le compte.
- Compte commun : projet Supabase « HoldingAI Compte » (`wwakxuzuhmdmweluafiz`), dépôt `holdingai-compte`. Le projet Supabase de chaque app accepte ses jetons (Third-Party Auth > Custom OIDC). Ne touche pas aux tables de ce projet sans l'accord de Francois.
- Vocabulaire dans les apps : on dit « votre compte », jamais « compte L'Établi ». Le bouton dit « Continuer ». L'Établi n'apparaît qu'en petit : « Un seul compte pour toutes les apps de L'Établi ».
- `holdingai.js` doit rester **identique** dans toutes les apps. Ne le modifie pas dans une seule app : un changement doit être reporté partout.

## Règles communes

- Le code, les noms de variables et les commentaires sont en français, comme dans le reste du dépôt.
- Ne commite jamais de secret. La clé publique Supabase peut être dans le code ; les clés secrètes (Anthropic, Stripe, Twilio, service_role) vivent seulement dans les secrets Supabase, Cloudflare ou GitHub.
- Tiens le README à jour quand tu changes l'architecture, la mise en ligne ou la liste « À faire ».
