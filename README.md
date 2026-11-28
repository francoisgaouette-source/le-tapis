# La Donne (anciennement Le Tapis) (app.ladonne.ai)

Les règles des jeux de cartes, de dominos, de dés et de société, expliquées en deux minutes et en animation. Puis on invite les amis et on fixe la soirée de jeux.

App installable (iPhone, Android, ordinateur), en français. Une app de la famille HoldingAI; personnage : **Maxence**. « C'est à qui la donne ? » : le moment où la partie commence.

## Ce que fait l'app

- **Les règles** : 27 jeux (Rami, Petit train, Dame de pique, Five Crowns, Azul, Heat…), chacun avec une animation pas à pas, les sections de règles, une astuce et un **carnet de points** (gardé sur l'appareil). Ouvert à tous, sans compte.
- **Ajouter un jeu** : toute personne connectée peut partager les règles d'un jeu. Elles sont visibles par tous; seul l'auteur peut les modifier ou les supprimer.
- **Le groupe** : on crée son groupe, on ajoute ses amis par prénom et cellulaire, puis on leur envoie l'invitation par texto (lien `?joueur=…`). L'ami se connecte avec ce même cellulaire et arrive directement dans le groupe. Le propriétaire peut nommer des organisateurs.
- **Les soirées** : on propose une ou plusieurs dates, un lieu, un nombre de places et les jeux au programme. Chacun répond oui, peut-être ou non pour chaque date; l'organisateur choisit la date. Relance par texto de ceux qui n'ont pas répondu, partage de l'invitation, ajout au calendrier (.ics), jeux possibles selon le nombre de « oui ». Les réponses arrivent en direct.

## Comment c'est bâti

| Morceau | Où | Remarque |
|---|---|---|
| App (fichiers à la racine) | GitHub Pages, domaine `app.ladonne.ai` (`CNAME`; anciennement app.letapis.ai) | aucune étape de compilation; pousser sur `main` met en ligne |
| Règles et animations | `jeux.js` | `G` = fiches, `SCN` = étapes d'animation |
| Base de données | Supabase, projet **Le Tapis** (`uwfnwnreohdyaxainvna`) | tables `groupes`, `joueurs`, `telephones`, `liens`, `soirees`, `jeux`; règles RLS + fonctions `creer_groupe`, `relier_joueur`, `mes_groupes`, `soiree_maj`…; structure complète dans `supabase/schema.sql` |
| Comptes | Supabase, projet **HoldingAI Compte** (`wwakxuzuhmdmweluafiz`), client OAuth « Le Tapis » | `holdingai.js` (identique dans toutes les apps); Le Tapis accepte ses jetons (Third-Party Auth > Custom OIDC) |

Un joueur est reconnu par le cellulaire de son compte HoldingAI : `mes_groupes()` trouve les groupes où ce numéro est inscrit, `relier_joueur()` l'y relie.

## Mise en ligne

1. **Domaine** : `ladonne.ai` (Cloudflare, acheté le 2026-11-26) : enregistrement DNS `CNAME app → francoisgaouette-source.github.io`, en « DNS only » (nuage gris) pour que GitHub émette le certificat.
2. **GitHub** : dépôt `la-donne` (autrefois `le-tapis`) > Settings > Pages > Source : `main`, dossier `/` (racine). Le domaine personnalisé `app.ladonne.ai` vient du fichier `CNAME`. Cocher « Enforce HTTPS » quand GitHub l'offre.
3. **Le site** (`ladonne.ai`) : la page de présentation est dans `site/`, au gabarit commun des sites de L'Établi. Elle se publie à part sur Cloudflare avec `npx wrangler deploy -c wrangler.site.jsonc` (www renvoie vers ladonne.ai).
4. Installer sur le téléphone : Safari > Partager > **Sur l'écran d'accueil** (iPhone); Chrome > ⋮ > **Installer l'application** (Android).

## À faire ensuite

- Notifications quand une soirée est proposée ou qu'une date est choisie.
- Maxence qui répond aux questions de règles pendant la partie.
