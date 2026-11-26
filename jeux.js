// La Donne : les jeux du catalogue (règles) et leurs animations.
// G = fiches de jeux; SCN[id] = étapes [légende, "jetons"] lues par anim.js.
window.G=[
{id:'rami',name:'Rami',kind:'Cartes',min:2,max:6,time:'30–60 min',gear:'1 jeu de 52 cartes',score:'high',
quick:'Forme des combinaisons avec tes cartes et vide ta main avant les autres.',
s:[
['Mise en place',['2 joueurs : <b>10 cartes</b> chacun. 3–4 joueurs : <b>7 cartes</b>. 5–6 joueurs : <b>6 cartes</b>.','Le reste forme la pige, face cachée. Retourne la carte du dessus pour commencer la défausse.']],
['Les combinaisons',['<b>Brelan ou carré</b> : 3 ou 4 cartes de même valeur (7♥ 7♣ 7♠).','<b>Suite</b> : 3 cartes ou plus qui se suivent, de la même couleur (4♦ 5♦ 6♦).','L\'as est bas : A‑2‑3 se fait, Q‑K‑A non.']],
['À ton tour',{ol:['Pige la carte du dessus de la pige <b>ou</b> de la défausse.','Si tu veux, pose des combinaisons devant toi.','Si tu veux, ajoute des cartes aux combinaisons déjà sur la table, les tiennes comme celles des autres.','Défausse une carte. Pas celle que tu viens de prendre dans la défausse.']}],
['Fin de la manche',['La manche s\'arrête dès qu\'un joueur n\'a plus de cartes, en posant ou en défaussant sa dernière.','Pige vide ? Retourne la défausse, sauf la carte du dessus, pour refaire une pige.']],
['Les points',['Le gagnant marque la valeur des cartes restées dans la main des autres : <b>figures 10</b>, <b>as 1</b>, les autres leur valeur.','Sortir d\'un coup sans avoir rien posé avant, c\'est un <b>rami</b> : les points comptent double.','Premier à <b>100 points</b> (ou au total convenu) gagne.']],
['Variantes',{ul:['<b>Avec jokers</b> : le joker remplace n\'importe quelle carte.','<b>Rami 500</b> : chacun marque les cartes qu\'il a posées, moins celles qui lui restent en main. Premier à 500.','Certaines tables jouent l\'as haut <b>ou</b> bas.']}]],
tip:'Garde tes cartes « presque combinées » et défausse d\'abord les figures isolées : elles coûtent 10 points si quelqu\'un sort.'},

{id:'petit-train',name:'Petit train mexicain',kind:'Dominos',min:2,max:8,time:'60–90 min',gear:'Dominos double‑12 (91 dominos), un marqueur par joueur (un sou suffit)',score:'low',
quick:'Chacun bâtit son train à partir du double du centre. Premier à placer tous ses dominos gagne la manche; le moins de points après 13 manches gagne la partie.',
s:[
['Mise en place',['Retourne et mélange tous les dominos. Sors le <b>double‑12</b> et place‑le au centre.','Chacun pige : <b>15 dominos</b> à 2–4 joueurs, <b>12</b> à 5–6 joueurs, <b>10</b> à 7–8 joueurs. Le reste forme la pige.']],
['Les trains',['<b>Ton train</b> part du centre vers toi. Son premier domino doit porter le chiffre du double du centre.','<b>Le train mexicain</b> est public : n\'importe qui peut le commencer et l\'allonger.']],
['À ton tour',{ol:['Pose un domino : sur ton train, sur le train mexicain, ou sur le train d\'un adversaire <b>s\'il porte un marqueur</b>.','Tu ne peux pas jouer ? Pige un domino. S\'il se place, joue‑le tout de suite.','Toujours rien ? Passe et mets ton marqueur sur ton train : il est maintenant ouvert aux autres.','Dès que tu rejoues sur ton propre train, retire ton marqueur.']}],
['Les doubles',['Quand tu poses un double, tu rejoues tout de suite un autre domino.','Le double doit être <b>couvert</b> : le prochain domino posé, par toi ou par le joueur suivant, doit aller dessus.','Celui qui ne peut pas le couvrir pige. S\'il ne peut toujours pas, il met son marqueur et c\'est au suivant de le couvrir.']],
['Fin de la manche',['Elle s\'arrête quand un joueur pose son dernier domino, ou quand la pige est vide et que plus personne ne peut jouer.','Annonce‑le quand il ne te reste qu\'un seul domino.']],
['Les points',['Chacun additionne les points de ses dominos restants. Le <b>double‑blanc vaut 50</b>.','Manche suivante : on part du double‑11, puis du double‑10… jusqu\'au double‑blanc. <b>13 manches</b> en tout.','Le total le plus bas gagne.']],
['Variantes',{ul:['<b>Premier tour</b> : chacun peut poser sur son train autant de dominos qu\'il peut d\'affilée.','<b>Jeu double‑9</b> : on part du double‑9, 10 manches, et on pige moins de dominos.','<b>Oubli d\'annoncer</b> ton dernier domino : pige 1 ou 2 dominos, selon votre table.']}]],
tip:'Au premier tour, aligne mentalement le plus long train possible avec ta main et garde‑le pour toi : les dominos qui n\'y entrent pas iront sur le train mexicain.'},

{id:'dame-de-pique',name:'Dame de pique',kind:'Cartes',min:3,max:4,time:'45 min',gear:'1 jeu de 52 cartes',score:'low',
quick:'Évite de ramasser des cœurs, et surtout la dame de pique. Le moins de points gagne.',
s:[
['Mise en place',['À 4 joueurs, distribue tout le paquet : <b>13 cartes</b> chacun.','Chacun passe 3 cartes : à gauche, puis à droite, puis en face, puis on garde. Et on recommence.']],
['Les plis',{ol:['Celui qui a le <b>2 de trèfle</b> joue le premier pli.','Chacun joue une carte, dans le sens horaire. Fournis la couleur demandée si tu peux; sinon, joue ce que tu veux.','La plus haute carte de la couleur demandée ramasse le pli et entame le suivant.']}],
['Les interdits',['Pas de cœur ni de dame de pique au premier pli.','On ne peut pas entamer avec un cœur tant qu\'un cœur n\'a pas été joué : on dit que les cœurs sont « cassés ».']],
['Les points',['Chaque cœur ramassé : <b>1 point</b>. La dame de pique : <b>13 points</b>.','Tu ramasses les 13 cœurs <b>et</b> la dame ? Tu « fais la lune » : tu marques 0 et chaque autre joueur marque 26.','La partie s\'arrête dès qu\'un joueur atteint <b>100</b>. Le total le plus bas gagne.']],
['Variantes',{ul:['<b>À 3 joueurs</b> : retire le 2 de carreau, 17 cartes chacun.','<b>Valet de carreau</b> : −10 points pour qui le ramasse.']}]],
tip:'Débarrasse‑toi vite d\'une couleur entière au passage de cartes : tu pourras ensuite te défausser de tes cœurs quand elle sera demandée.'},

{id:'huit',name:'Huit américain',kind:'Cartes',min:2,max:6,time:'20–40 min',gear:'1 jeu de 52 cartes',score:'low',
quick:'Vide ta main en suivant la couleur ou la valeur. Les 8 changent tout.',
s:[
['Mise en place',['2 joueurs : <b>7 cartes</b>. 3 joueurs ou plus : <b>5 cartes</b>.','Le reste forme la pige. Retourne la première carte pour lancer la défausse. Si c\'est un 8, remets‑le dans le paquet.']],
['À ton tour',['Pose une carte de <b>même couleur</b> ou de <b>même valeur</b> que celle du dessus.','Un <b>8</b> se pose sur n\'importe quoi : tu annonces la nouvelle couleur.','Rien à jouer ? Pige jusqu\'à trouver une carte jouable (ou une seule carte puis passe, selon votre table).']],
['Fin et points',['Le premier sans cartes gagne la manche.','Les autres comptent leurs cartes en pénalité : <b>8 = 50</b>, figures 10, as 1, les autres leur valeur.','Quand un joueur atteint 100, le total le plus bas gagne.']],
['Règles maison populaires',{ul:['<b>2</b> : le suivant pige 2 cartes.','<b>Valet</b> : le suivant passe son tour.','<b>As</b> : on change de sens.','Oubli de dire « dernière carte » : pige 2 cartes.']}]],
tip:'Garde tes 8 pour la fin : ils te sortent de n\'importe quelle impasse, mais valent 50 points s\'ils te restent en main.'},

{id:'cribbage',name:'Cribbage',kind:'Cartes',min:2,max:4,time:'30 min',gear:'1 jeu de 52 cartes, une planche de crib',score:'high',
quick:'Fais des 15, des paires et des suites. Premier à 121 points gagne.',
s:[
['Mise en place',['Coupez : la plus basse carte brasse. <b>6 cartes</b> chacun.','Chacun met 2 cartes de côté dans le <b>crib</b>, qui appartient au brasseur.','L\'autre joueur coupe; le brasseur retourne la carte du dessus : c\'est la <b>carte de départ</b>. Un valet ? Le brasseur marque 2.']],
['Le jeu (le « pegging »)',['À tour de rôle, en commençant par le non‑brasseur, on pose une carte en annonçant le total. Figures = 10, as = 1. On ne dépasse jamais <b>31</b>.',{ul:['Total de 15 : <b>2</b>. Total de 31 : <b>2</b>.','Paire avec la carte précédente : <b>2</b>. Brelan : <b>6</b>. Carré : <b>12</b>.','Suite de 3 cartes ou plus, dans n\'importe quel ordre : <b>1 par carte</b>.']},'Tu ne peux pas jouer sans dépasser 31 ? Dis « go ». L\'autre continue tant qu\'il peut et marque 1 (2 s\'il arrive pile à 31). Puis on repart de zéro. La toute dernière carte jouée vaut 1.']],
['Le comptage',['Chacun compte sa main avec la carte de départ : non‑brasseur, puis brasseur, puis le crib.',{ul:['Chaque combinaison qui fait 15 : <b>2</b>.','Chaque paire : <b>2</b>.','Chaque suite : <b>1 par carte</b>.','4 cartes de même couleur en main : <b>4</b> (5 avec la carte de départ; le crib doit avoir les 5).','Valet de la couleur de la carte de départ : <b>1</b>.']}]],
['Fin de la partie',['Dès qu\'un joueur atteint <b>121</b>, il gagne, même en pleine manche. C\'est pour ça que le non‑brasseur compte en premier.']],
['Variantes',{ul:['<b>À 3</b> : 5 cartes chacun, 1 au crib, plus 1 carte du paquet au crib.','<b>À 4</b> : en équipes de deux, 5 cartes chacun, 1 au crib.']}]],
tip:'Quand c\'est ton crib, garde ensemble les cartes qui font 15 ou se suivent. Quand c\'est celui de l\'adversaire, ne lui donne jamais un 5.'},

{id:'bataille',name:'Bataille',kind:'Cartes',min:2,max:3,time:'15 min et plus',gear:'1 jeu de 52 cartes',score:null,
quick:'Le plus simple des jeux : la plus haute carte gagne. Celui qui ramasse tout le paquet gagne.',
s:[
['Mise en place',['Distribue tout le paquet face cachée, en piles égales. On ne regarde pas ses cartes.']],
['À chaque coup',['Tout le monde retourne la carte du dessus en même temps. La plus haute ramasse le tout et le glisse sous sa pile.','Ordre : du 2 (la plus basse) au roi, puis l\'as.']],
['La bataille',['Égalité ? C\'est la <b>bataille</b> : chacun pose une carte face cachée, puis une face visible. La plus haute ramasse tout.','Nouvelle égalité ? On recommence.']],
['Fin',['Celui qui n\'a plus de cartes a perdu.','Trop long ? Fixez une limite de temps : le plus de cartes gagne.']],
['Variantes',{ul:['<b>À 3 joueurs</b> : retire le 2 de trèfle pour partager également.']}]],
tip:'Parfait pour apprendre l\'ordre des cartes aux plus jeunes.'},

{id:'uno',name:'Uno',kind:'Cartes',min:2,max:10,time:'20–40 min',gear:'1 jeu de Uno (108 cartes)',score:'high',
quick:'Vide ta main en suivant la couleur, le chiffre ou le symbole. N\'oublie pas de crier « Uno ! ».',
s:[
['Mise en place',['<b>7 cartes</b> chacun. Le reste forme la pige; retourne la première carte pour lancer la défausse.']],
['À ton tour',['Pose une carte de <b>même couleur</b>, de <b>même chiffre</b> ou de <b>même symbole</b> que celle du dessus.','Rien à jouer ? Pige une carte. Si elle se joue, tu peux la poser tout de suite.']],
['Les cartes spéciales',{ul:['<b>+2</b> : le suivant pige 2 cartes et passe son tour.','<b>Inversion</b> : on change de sens.','<b>Passe</b> : le suivant passe son tour.','<b>Joker</b> : tu choisis la couleur.','<b>Joker +4</b> : tu choisis la couleur, le suivant pige 4 et passe son tour. Permis seulement si tu n\'as aucune carte de la couleur demandée; le suivant peut contester.']}],
['Uno !',['Quand il te reste une carte, dis « Uno ! ». Pris sans l\'avoir dit avant le joueur suivant : pige 2 cartes.']],
['Les points',['Le gagnant de la manche marque les cartes des autres : chiffres leur valeur, <b>+2, inversion, passe : 20</b>, <b>jokers : 50</b>.','Premier à <b>500 points</b> gagne.']]],
tip:'Garde un joker pour la fin : c\'est la carte qui se pose toujours.'},

{id:'canasta',name:'Canasta',kind:'Cartes',min:2,max:6,time:'1 h 30 et plus',gear:'2 jeux de 52 cartes + 4 jokers',score:'high',
quick:'En équipes, posez des combinaisons de cartes de même valeur et complétez des canastas de 7 cartes.',
s:[
['Mise en place',['À 4 joueurs, en équipes de deux assises face à face. <b>11 cartes</b> chacun.','Le reste forme la pige; retourne une carte pour commencer la défausse.']],
['Les cartes',{ul:['<b>Jokers et 2</b> : cartes frimées (jokers de jeu). Elles remplacent n\'importe quelle valeur.','<b>3 rouges</b> : pose‑les dès que tu les reçois et pige une carte pour les remplacer. 100 points chacun.','<b>3 noirs</b> : défaussés, ils empêchent le joueur suivant de prendre la défausse.']}],
['À ton tour',{ol:['Pige une carte, <b>ou</b> prends toute la défausse si tu peux poser sa carte du dessus avec deux cartes naturelles de même valeur de ta main.','Pose des combinaisons : 3 cartes ou plus de même valeur, avec au moins 2 cartes naturelles et au plus 3 cartes frimées.','Défausse une carte.']}],
['La première pose',['La première combinaison d\'une équipe doit valoir un minimum, selon son score : <b>15</b> si négatif, <b>50</b> de 0 à 1 495, <b>90</b> de 1 500 à 2 995, <b>120</b> à 3 000 et plus.']],
['Les canastas',['Une combinaison de <b>7 cartes</b> est une canasta. Sans carte frimée : <b>500 points</b>. Avec : <b>300 points</b>.','Pour sortir, ton équipe doit avoir au moins une canasta. Sortir rapporte 100 points.']],
['Les points',['Valeur des cartes posées : <b>joker 50</b>, <b>2 et as 20</b>, roi à 8 : 10, 7 à 4 et 3 noir : 5.','Les cartes restées en main se soustraient. Première équipe à <b>5 000</b> gagne.']]],
tip:'Ne défausse pas une carte que l\'équipe adverse a déjà posée : elle prendrait toute la défausse.'},

{id:'yahtzee',name:'Yahtzee (Yum)',kind:'Dés',min:1,max:8,time:'30 min',gear:'5 dés, une feuille de points par joueur',score:'high',
quick:'Trois lancers par tour pour réussir des combinaisons. Remplis les 13 cases de ta feuille avec le plus de points possible.',
s:[
['À ton tour',['Lance les 5 dés. Garde ceux que tu veux et relance les autres, jusqu\'à <b>3 lancers</b> en tout.','Inscris ensuite ton résultat dans une case libre. Aucune case ne convient ? Mets 0 dans une case de ton choix.']],
['Le haut de la feuille',['Cases <b>1 à 6</b> : additionne seulement les dés de ce chiffre.','Total du haut de <b>63 ou plus</b> : bonus de <b>35 points</b>.']],
['Le bas de la feuille',{ul:['<b>Brelan</b> (3 pareils) et <b>carré</b> (4 pareils) : la somme des 5 dés.','<b>Full</b> (3 pareils + 2 pareils) : 25.','<b>Petite suite</b> (4 qui se suivent) : 30.','<b>Grande suite</b> (5 qui se suivent) : 40.','<b>Yahtzee</b> (5 pareils) : 50. Chaque Yahtzee de plus : bonus de 100.','<b>Chance</b> : la somme des 5 dés, sans condition.']}],
['Fin',['Après 13 tours, toutes les cases sont remplies. Le plus haut total gagne.']],
['Au Québec',['Le <b>Yum</b> se joue sur le même principe, avec une feuille un peu différente selon les familles. Prenez celle de votre boîte.']]],
tip:'Vise le bonus de 35 : trois dés de chaque chiffre dans le haut suffisent pour l\'avoir.'},

{id:'poker',name:'Poker Texas Hold\'em',kind:'Cartes',min:2,max:10,time:'1 h et plus',gear:'1 jeu de 52 cartes, des jetons',score:null,
quick:'Fais la meilleure main de 5 cartes avec tes 2 cartes et les 5 du centre, ou fais abandonner les autres.',
s:[
['Mise en place',['Chacun reçoit des jetons. Les deux joueurs à gauche du brasseur misent la <b>petite</b> et la <b>grosse blind</b>.','Chacun reçoit <b>2 cartes</b> face cachée.']],
['Les tours de mise',{ol:['<b>Avant le flop</b> : on mise sur ses 2 cartes.','<b>Flop</b> : 3 cartes au centre, face visible. On mise.','<b>Turn</b> : une 4<sup>e</sup> carte. On mise.','<b>River</b> : une 5<sup>e</sup> carte. Dernière mise, puis on montre les cartes.']}],
['Miser',['À ton tour : <b>checker</b> (passer sans miser, si personne n\'a misé), <b>suivre</b>, <b>relancer</b> ou <b>te coucher</b>.','Si tous les autres se couchent, tu gagnes le pot sans montrer tes cartes.']],
['Les mains, de la meilleure à la plus faible',{ol:['Quinte flush royale (10 à l\'as, même couleur)','Quinte flush (5 qui se suivent, même couleur)','Carré','Full (brelan + paire)','Couleur (5 de la même couleur)','Quinte (5 qui se suivent)','Brelan','Deux paires','Paire','Carte haute']}]],
tip:'Couche‑toi souvent avant le flop : jouer seulement les bonnes mains de départ est le secret des débutants qui gagnent.'},

{id:'president',name:'Président',kind:'Cartes',min:4,max:7,time:'30 min',gear:'1 jeu de 52 cartes',score:null,
quick:'Débarrasse‑toi de tes cartes le premier pour devenir président. Le dernier devient le trou… et le paie à la manche suivante.',
s:[
['Mise en place',['Distribue tout le paquet. L\'ordre des cartes : du <b>3</b> (la plus basse) à l\'as, puis le <b>2</b>, la plus forte.']],
['Le jeu',{ol:['Celui qui a le 3 de trèfle commence : il pose 1, 2, 3 ou 4 cartes de même valeur.','Le suivant doit poser le <b>même nombre</b> de cartes, d\'une valeur plus haute. Sinon, il passe.','Quand tout le monde passe, le dernier à avoir joué ramasse la pile et recommence avec ce qu\'il veut.']}],
['Les rangs',['Premier sorti : <b>président</b>. Deuxième : <b>vice‑président</b>. Avant‑dernier : <b>vice‑trou</b>. Dernier : <b>trou</b>.']],
['Manche suivante',['Le trou donne ses 2 meilleures cartes au président, qui lui rend 2 cartes de son choix.','Le vice‑trou et le vice‑président échangent 1 carte de la même façon.','Le trou commence.']],
['Variantes',{ul:['Un <b>2</b> ferme le tour sur‑le‑champ.','On peut poser une carte <b>égale</b> : le suivant passe alors son tour.']}]],
tip:'Garde tes 2 pour reprendre la main au bon moment, plutôt que de les jouer dès le début.'},

{id:'paquet-voleur',name:'Paquet voleur',kind:'Cartes',min:2,max:4,time:'15–20 min',gear:'1 jeu de 52 cartes',score:null,
quick:'Ramasse les cartes du milieu et vole le paquet des autres. Le plus gros paquet gagne.',
s:[
['Mise en place',['<b>4 cartes</b> chacun et <b>4 cartes</b> face visible au milieu. Le reste attend en pile.']],
['À ton tour',['Pose une carte de ta main.',{ul:['Même valeur qu\'une carte du milieu ? Prends les deux et place‑les face visible sur ton paquet.','Même valeur que la carte du dessus du paquet d\'un adversaire ? <b>Vole tout son paquet</b> et mets ta carte dessus.','Sinon, laisse ta carte au milieu.']}]],
['La suite',['Quand tout le monde a joué ses 4 cartes, on en redistribue 4 jusqu\'à épuisement du paquet.']],
['Fin',['Le plus gros paquet gagne.']]],
tip:'Regarde le dessus des paquets adverses avant chaque coup : un vol vaut bien plus qu\'une paire au milieu.'},

{id:'peche',name:'Pêche',kind:'Cartes',min:2,max:6,time:'15 min',gear:'1 jeu de 52 cartes',score:null,
quick:'Demande aux autres les cartes qu\'il te faut pour réunir des familles de 4. Le plus de familles gagne.',
s:[
['Mise en place',['<b>7 cartes</b> à 2–3 joueurs, <b>5 cartes</b> à 4 joueurs ou plus. Le reste en tas au milieu : c\'est l\'étang.']],
['À ton tour',['Demande à un joueur une valeur que tu as déjà en main : « As‑tu des 7 ? »','Il en a ? Il te les donne toutes et tu rejoues.','Il n\'en a pas ? « Va pêcher ! » Pige une carte. Si c\'est la valeur demandée, montre‑la et rejoue.']],
['Les familles',['Dès que tu as les 4 cartes d\'une valeur, pose‑les devant toi.']],
['Fin',['Quand toutes les familles sont posées, le joueur qui en a le plus gagne.']]],
tip:'Retiens ce que les autres demandent : ils ont forcément au moins une carte de cette valeur.'},

{id:'solitaire',name:'Solitaire (Klondike)',kind:'Cartes',min:1,max:1,time:'10 min',gear:'1 jeu de 52 cartes',score:null,
quick:'Range toutes les cartes par couleur, de l\'as au roi, sur quatre piles.',
s:[
['Mise en place',['Forme <b>7 colonnes</b> : 1 carte dans la première, 2 dans la deuxième… jusqu\'à 7. Seule la carte du dessus de chaque colonne est face visible.','Le reste forme la pige.']],
['Les règles',{ul:['Construis les colonnes en ordre <b>décroissant</b>, en alternant rouge et noir (8♥ sur 9♠).','Tu peux déplacer une suite entière d\'une colonne à l\'autre.','Retourne la carte cachée découverte.','Une colonne vide ne peut recevoir qu\'un <b>roi</b>.','Les <b>as</b> commencent les 4 piles du haut, que tu montes par couleur jusqu\'au roi.']}],
['La pige',['Retourne les cartes de la pige une à la fois (ou trois à la fois, plus difficile). Quand elle est vide, retourne la défausse et recommence.']],
['Fin',['Toutes les cartes rangées sur les 4 piles : c\'est gagné.']]],
tip:'Dégage d\'abord les colonnes qui ont le plus de cartes cachées.'},

{id:'dominos',name:'Dominos classiques',kind:'Dominos',min:2,max:4,time:'20 min',gear:'Dominos double‑6 (28 dominos)',score:'high',
quick:'Place tes dominos bout à bout en faisant correspondre les chiffres. Premier à vider sa main gagne.',
s:[
['Mise en place',['Mélange les dominos face cachée. 2 joueurs : <b>7 dominos</b> chacun. 3–4 joueurs : <b>5</b>. Le reste forme la pige.','Le joueur qui a le plus gros double commence en le posant.']],
['À ton tour',['Pose un domino à un bout de la chaîne : le chiffre qui touche doit être le même.','Rien à jouer ? Pige jusqu\'à pouvoir jouer. Pige vide ? Passe ton tour.']],
['Fin de la manche',['Un joueur vide sa main, ou plus personne ne peut jouer (le jeu est <b>bloqué</b>). Jeu bloqué : celui qui a le moins de points en main gagne.']],
['Les points',['Le gagnant marque le total des points restés dans la main des autres. Premier à <b>100</b> gagne.']]],
tip:'Joue tôt tes dominos lourds, comme le double‑6 : s\'ils te restent, ils coûtent cher.'},

{id:'skip-bo',name:'Skip‑Bo',kind:'Cartes',min:2,max:6,time:'30–45 min',gear:'1 jeu de Skip‑Bo (162 cartes)',score:null,
quick:'Vide ta pile personnelle en construisant des suites de 1 à 12 au centre. Premier à la vider gagne.',
s:[
['Mise en place',['Chacun reçoit une <b>pile de départ</b> face cachée : 30 cartes à 2–4 joueurs, 20 à 5–6. Retourne la carte du dessus.','Le reste forme la pige.']],
['À ton tour',{ol:['Complète ta main à <b>5 cartes</b>.','Au centre, commence une pile avec un <b>1</b> (4 piles au plus) et monte jusqu\'à 12. Une pile complète est retirée.','Joue depuis ta main, le dessus de ta pile de départ ou le dessus de tes piles de défausse.','Les cartes <b>Skip‑Bo</b> remplacent n\'importe quel chiffre.','Tu as joué tes 5 cartes ? Pige‑en 5 autres et continue.','Termine en posant une carte de ta main sur une de tes 4 piles de défausse.']}],
['Fin',['Le premier à vider sa pile de départ gagne.']]],
tip:'Priorité à ta pile de départ : chaque carte jouée de là te rapproche de la victoire.'},
{id:"sky-team",name:"Sky Team",kind:"Société",min:2,max:2,time:"20 min",gear:"La boîte du jeu (cockpit, 4 dés bleus, 4 dés orange)",score:null,
quick:"En duo, sans parler de vos dés, posez ensemble un avion de ligne à l'aéroport.",
s:[
["Mise en place",["Un joueur est pilote (dés bleus), l'autre copilote (dés orange), chacun derrière son écran.","L'avion part à 6 000 pieds. Des avions encombrent la piste d'approche."]],
["Une manche",{ol:["Parlez stratégie à voix haute, sans jamais dire vos valeurs de dés.","Chacun lance ses 4 dés en secret.","En silence et à tour de rôle, posez un dé à la fois sur une case libre : bleue pour le pilote, orange pour le copilote, bicolore pour les deux.","Les 8 dés posés, l'avion descend de 1 000 pieds et chacun reprend ses dés."]}],
["Les cases obligatoires",["<b>Axe</b> : un dé de chaque couleur. Égaux, l'avion reste droit. Sinon, il penche de la différence, du côté du dé le plus fort. Trop penché : c'est l'écrasement.","<b>Moteurs</b> : un dé de chaque couleur. Leur somme fait avancer l'avion de 0, 1 ou 2 cases vers l'aéroport."]],
["Les autres cases",{ul:["<b>Radio</b> : retire un avion de la piste d'approche.","<b>Trains d'atterrissage</b> (pilote) et <b>volets</b> (copilote) : à sortir avant d'atterrir. Ils changent aussi la vitesse.","<b>Freins</b> (pilote) : le 2, puis le 4, puis le 6.","<b>Concentration</b> : gagne un café (3 au plus). Un café ajoute ou retire 1 à un dé."]}],
["Pour gagner",["À la dernière manche : plus aucun avion sur la piste d'approche, trains et volets tous sortis, axe parfaitement droit, et une somme des moteurs plus petite que la valeur des freins."]],
["Bon à savoir",["Résumé des règles de base. Les scénarios de la boîte ajoutent des modules : suivez le livret."]]],
tip:"Avant de lancer les dés, mettez-vous d'accord sur la priorité de la manche : c'est le seul moment où vous pouvez vous parler."},

{id:"toy-battle",name:"Toy Battle",kind:"Société",min:2,max:2,time:"15–20 min",gear:"La boîte du jeu (8 terrains, 48 troupes)",score:null,
quick:"Duel de jouets : prends le QG adverse ou rafle assez de médailles.",
s:[
["Mise en place",["Choisissez un des 8 terrains. Le symbole de ton côté donne ta couleur et ton objectif de médailles. Posez les médailles sur leurs emplacements.","Mélange tes troupes face cachée et retires-en 4 sans regarder. Le premier joueur pige 3 troupes, le second 4."]],
["À ton tour : une seule action",{ul:["<b>Piger 2 troupes</b> sur ton support (8 au plus).","<b>Poser 1 troupe</b> sur le terrain, puis appliquer son effet."]}],
["Où poser",{ul:["Sur une base vide, sur une de tes bases, sur une base ennemie dont la troupe du dessus est <b>plus faible</b>, ou sur le QG ennemi.","Il faut un chemin continu de tes bases entre ton QG et la base visée.","Une troupe posée sur une autre s'empile : seule celle du dessus compte."]}],
["Les médailles",["Occupe toutes les bases autour d'une région : tu prends ses médailles et tu les gardes jusqu'à la fin."]],
["Fin",["Une troupe sur le QG ennemi, ou ton objectif de médailles atteint : victoire immédiate.","Si un joueur ne peut ni piger ni poser, le plus de médailles gagne."]]],
tip:"Garde un chemin solide vers ton QG : une base perdue peut couper toute ta ligne."},

{id:"7-wonders-duel",name:"7 Wonders Duel",kind:"Société",min:2,max:2,time:"30 min",gear:"La boîte du jeu",score:"high",
quick:"Développe ta cité pendant 3 âges et gagne par l'armée, la science ou les points.",
s:[
["Mise en place",["Choisissez chacun 4 Merveilles. Le pion Conflit est au centre de la piste militaire. Chacun commence avec 7 pièces.","À chaque âge, les cartes sont étalées selon le schéma de l'âge, certaines face cachée."]],
["À ton tour",["Prends une carte <b>libre</b>, que rien ne recouvre, et fais l'une de ces trois choses :",{ul:["<b>Construis-la</b> en payant son coût en ressources ou en pièces.","<b>Défausse-la</b> pour gagner des pièces.","<b>Glisse-la sous une de tes Merveilles</b> pour bâtir cette Merveille, en payant son coût."]},"Une carte cachée qui se libère se retourne."]],
["Les ressources",["Les cartes brunes et grises produisent des ressources. Il t'en manque ? Achète-les : 2 pièces, plus 1 pour chaque exemplaire que ton adversaire produit.","Seules 7 des 8 Merveilles seront construites."]],
["Trois façons de gagner",{ul:["<b>Militaire</b> : les cartes rouges poussent le pion Conflit. S'il entre dans la capitale adverse, tu gagnes tout de suite.","<b>Science</b> : 6 symboles scientifiques différents, et tu gagnes tout de suite. Chaque paire identique donne un jeton Progrès.","<b>Civile</b> : sinon, après le 3<sup>e</sup> âge, le plus de points de victoire gagne."]}]],
tip:"Avant de prendre une carte, regarde lesquelles tu libères pour ton adversaire."},

{id:"bomb-busters",name:"Bomb Busters",kind:"Société",min:2,max:5,time:"30 min",gear:"La boîte du jeu (fils 1 à 12, fils jaunes et rouges, supports)",score:null,
quick:"Ensemble, coupez tous les fils de la bombe sans jamais toucher un fil rouge.",
s:[
["Mise en place",["La carte Mission indique combien de fils jaunes et rouges ajouter. Le capitaine distribue les fils face cachée.","Chacun regarde ses fils sans les montrer et les trie du plus petit au plus grand sur son support.","Chacun pose un jeton Info sur un de ses fils bleus pour en montrer la valeur."]],
["À ton tour",{ul:["<b>Coupe en duo</b> : annonce une valeur que tu as et désigne le fil d'un coéquipier. Bonne réponse : les deux fils sont coupés.","Mauvaise réponse : le détonateur avance d'un cran et un jeton Info montre la vraie valeur.","<b>Coupe en solo</b> : si tu as tous les fils restants d'une valeur, coupe-les seul."]}],
["Danger",["Désigner un <b>fil rouge</b> : la bombe explose.","Le détonateur atteint la tête de mort : elle explose aussi."]],
["Communication",["Interdit de parler de ses fils ou de rappeler ce qui s'est passé. Permis : parler de stratégie et des règles."]],
["Fin",["Tous les fils coupés : mission réussie ! En cas d'échec, on rejoue la même mission avec un nouveau capitaine."]]],
tip:"Faites les missions dans l'ordre : chacune ajoute une petite règle à la fois."},

{id:"heat",name:"Heat",kind:"Société",min:1,max:6,time:"30–60 min",gear:"La boîte du jeu",score:null,
quick:"Course automobile : va vite, mais gère la chaleur de ton moteur dans les virages.",
s:[
["Mise en place",["Mélange tes cartes Vitesse, tes 3 cartes Amélioration de départ et 3 cartes Stress pour former ta pioche.","Mets 6 cartes Chaleur dans ton moteur, commence en 1<sup>re</sup> et pioche 7 cartes."]],
["Chaque manche",{ol:["<b>Change de rapport</b> d'un cran (deux crans coûtent 1 Chaleur).","<b>Joue face cachée</b> autant de cartes que ton rapport : 1 en 1<sup>re</sup>, 4 en 4<sup>e</sup>.","<b>Révèle et avance</b> de la somme. Les voitures ne bloquent pas.","<b>Réagis</b> : refroidis (remets de la Chaleur au moteur) ou accélère (1 Chaleur pour une carte de plus).","<b>Aspiration</b> : à côté ou juste derrière une voiture, avance de 2 cases.","<b>Virage</b> : au-dessus de la limite ? Paie la différence en Chaleur.","Défausse ce que tu veux et repioche jusqu'à 7 cartes."]}],
["Tête-à-queue",["Pas assez de Chaleur pour un virage ? Tu recules avant le virage, tu prends du Stress et tu retombes en 1<sup>re</sup>."]],
["Coup de pouce",["<b>Adrénaline</b> : la dernière voiture (les deux dernières à 5 joueurs ou plus) avance d'une case de plus et refroidit d'un cran de plus."]],
["Fin",["Le premier à boucler les tours prévus gagne."]]],
tip:"Garde de la Chaleur avant les gros virages : un tête-à-queue coûte bien plus cher."},

{id:"kronologic",name:"Kronologic : Paris 1920",kind:"Société",min:1,max:4,time:"30 min",gear:"La boîte du jeu",score:null,
quick:"Enquête à l'Opéra : retrouve qui était où, et quand, avant les autres.",
s:[
["Mise en place",["Choisissez un scénario et une enquête. Lisez la description, les règles spéciales et les questions.","Chacun prend un paravent, une feuille de notes et un crayon. Les tuiles Moment (1 à 6) et Personnage sont au centre; les cartes Lieu sont mélangées face cachée."]],
["À ton tour",{ol:["Prends une carte Lieu.","Glisse-la sous une tuile <b>Moment</b> (qui était là à ce moment ?) ou sous une tuile <b>Personnage</b> (quand est-il passé là ?).","L'information <b>publique</b> se dit à voix haute. L'information <b>privée</b> reste pour toi.","Note tout, puis passe au joueur de gauche."]}],
["Les déplacements",["À chaque moment, les personnages passent dans une salle voisine. Jamais deux moments de suite au même endroit."]],
["Résoudre",["Tu crois pouvoir répondre à toutes les questions ? Arrête l'enquête, écris tes réponses en secret et vérifie dans le livret.","Juste : tu gagnes. Faux : tu es éliminé. Plusieurs joueurs justes gagnent ensemble."]]],
tip:"Choisis des questions dont l'information publique aidera peu les autres."},

{id:"dorfromantik",name:"Dorfromantik",kind:"Société",min:1,max:6,time:"30–60 min",gear:"La boîte du jeu",score:null,
quick:"Ensemble, construisez le plus beau paysage possible, tuile par tuile, et battez votre record.",
s:[
["Mise en place",["Mélangez les tuiles Paysage face cachée et posez-en une au centre. Mettez 3 tuiles Mission en jeu, chacune avec son jeton Mission."]],
["À ton tour",["Pige une tuile et pose-la contre au moins une tuile déjà posée.","Les paysages n'ont pas à correspondre, mais les forêts, champs et villages groupés rapportent plus.","Les rivières et les voies ferrées doivent se continuer."]],
["Les missions",["Un jeton Mission demande un nombre <b>exact</b> : un « 5 » sur une forêt veut une forêt d'exactement 5 tuiles reliées. Dépassé, c'est raté.","Il y a toujours 3 missions en cours : une réussie est remplacée."]],
["Fin",["Plus de tuiles : comptez les missions réussies et vos plus longues rivière et voie ferrée.","Notez le score dans le livret de campagne. Certains records débloquent des boîtes avec du nouveau contenu."]]],
tip:"Ne fermez pas une forêt trop tôt : une mission pourrait encore en avoir besoin."},

{id:"azul",name:"Azul",kind:"Société",min:2,max:4,time:"30–45 min",gear:"La boîte du jeu",score:"high",
quick:"Prends des tuiles colorées pour décorer ton mur, sans en laisser tomber par terre.",
s:[
["Mise en place",["Remplis chaque fabrique de 4 tuiles du sac : 5 fabriques à 2 joueurs, 7 à 3, 9 à 4. Le jeton premier joueur va au centre."]],
["À ton tour",{ol:["Prends <b>toutes</b> les tuiles d'une couleur : dans une fabrique (le reste glisse au centre) ou au centre.","Premier à prendre au centre ? Prends aussi le jeton premier joueur : il va sur ton plancher.","Pose tes tuiles sur une seule ligne de motif (de 1 à 5 cases) : une seule couleur par ligne, et pas une couleur déjà présente sur cette rangée du mur.","Les tuiles en trop tombent sur le plancher."]}],
["Fin de manche",["Quand il n'y a plus de tuiles, chaque ligne pleine envoie une tuile sur sa rangée du mur. Le reste de la ligne est défaussé.","Une tuile seule vaut 1 point. Sinon, compte les tuiles reliées en ligne avec elle (elle comprise), puis en colonne (elle comprise), et additionne.","Plancher : −1, −1, −2, −2, −2, −3, −3."]],
["Fin de la partie",["Elle s'arrête à la fin de la manche où quelqu'un complète une rangée de 5 tuiles.","Bonus : <b>+2</b> par rangée complète, <b>+7</b> par colonne, <b>+10</b> par couleur posée 5 fois."]]],
tip:"Le jeton premier joueur coûte un point, mais choisir en premier peut valoir bien plus."},

{id:"trio",name:"Trio",kind:"Société",min:3,max:6,time:"15 min",gear:"La boîte du jeu (36 cartes : 1 à 12, trois de chaque)",score:null,
quick:"Trouve trois cartes identiques en fouillant le centre et les mains des autres.",
s:[
["Mise en place",["3 joueurs : 9 cartes chacun, 9 au centre. 4 joueurs : 7 et 8. 5 joueurs : 6 et 6. 6 joueurs : 5 et 6.","Les cartes du centre sont face cachée. Chacun trie sa main du plus petit au plus grand, sans la montrer."]],
["À ton tour",["Révèle des cartes une à une : une carte du centre, ou la <b>plus petite</b> ou la <b>plus grande</b> carte de n'importe quelle main, la tienne comprise.","Tant que c'est le même numéro, continue.","Un numéro différent ? Ton tour s'arrête et tout retourne à sa place."]],
["Les trios",["Trois numéros identiques : tu gagnes le trio et le poses devant toi."]],
["Victoire",["<b>3 trios</b>, ou le <b>trio de 7</b>, qui fait gagner tout de suite.","Mode piquant : 2 trios liés (indiqués dans les coins des cartes) ou le trio de 7."]]],
tip:"Retiens tout ce qui a été révélé : la mémoire fait la moitié du travail."},

{id:"the-gang",name:"The Gang",kind:"Société",min:3,max:6,time:"20 min",gear:"La boîte du jeu (52 cartes, jetons étoiles de 4 couleurs)",score:null,
quick:"Poker coopératif : sans parler de vos cartes, classez vos mains de la plus faible à la plus forte.",
s:[
["Mise en place",["Posez 3 cartes Coffre et 3 cartes Alarme. Gardez seulement les jetons de 1 étoile jusqu'au nombre de joueurs, triés par couleur."]],
["Un braquage",{ol:["Chacun reçoit 2 cartes et prend un jeton <b>blanc</b> : peu d'étoiles si sa main semble faible, beaucoup si elle semble forte.","Flop : 3 cartes au centre. Jetons <b>jaunes</b>.","Turn : une 4<sup>e</sup> carte. Jetons <b>orange</b>.","River : une 5<sup>e</sup> carte. Jetons <b>rouges</b> : ce sont eux qui comptent."]}],
["Les jetons",["Prends un jeton au centre ou devant un autre joueur. Tu ne peux jamais en donner un."]],
["Interdit",["Parler de tes cartes ou de ta combinaison. Ton jeton est ton seul signal."]],
["La révélation",["On révèle de 1 étoile jusqu'à la plus haute. Chaque main doit être au moins aussi forte que la précédente.","Réussi : un coffre s'ouvre. Raté : une alarme sonne. 3 coffres : victoire. 3 alarmes : défaite."]]],
tip:"Observe qui hésite avant de prendre un jeton : c'est souvent plus parlant que l'étoile elle-même."},
{id:"five-crowns",name:"5 Crowns",kind:"Cartes",min:2,max:7,time:"45–60 min",gear:"Le jeu Five Crowns (2 paquets de 58 cartes : 5 couleurs du 3 au roi, et 6 jokers)",score:"low",
quick:"Un rami en 11 manches où la carte frimée change à chaque manche. Le moins de points gagne.",
s:[
["Les cartes",["Cinq couleurs : étoiles, cœurs, trèfles, piques et carreaux. Pas d'as ni de 2 : les cartes vont du 3 au roi.","Les jokers sont toujours frimés."]],
["Mise en place",["Manche 1 : <b>3 cartes</b> chacun. Manche 2 : 4 cartes. Et ainsi de suite jusqu'à la manche 11 : <b>13 cartes</b>.","Le reste forme la pige. Retourne une carte pour commencer la défausse."]],
["La carte frimée",["À chaque manche, la valeur égale au nombre de cartes distribuées est frimée : les 3 à la manche 1, les 4 à la manche 2… puis les valets à 11 cartes, les dames à 12 et les rois à 13."]],
["À ton tour",{ol:["Pige une carte, dans la pige ou la défausse.","Défausse une carte."]}],
["Sortir",["Le but : placer toutes tes cartes en <b>brelans</b> (3 cartes ou plus de même valeur) et en <b>suites</b> (3 cartes ou plus qui se suivent, de même couleur). Les cartes frimées remplacent n'importe quelle carte.","Quand tu peux le faire et qu'il te reste une carte à défausser, pose tout : tu sors.","Chaque autre joueur joue alors un dernier tour et pose ce qu'il peut."]],
["Les points",["Les cartes restées en main comptent : leur valeur, <b>valet 11</b>, <b>dame 12</b>, <b>roi 13</b>, <b>carte frimée 20</b>, <b>joker 50</b>. Celui qui sort marque 0.","Après 11 manches, le total le plus bas gagne."]]],
tip:"Au dernier tour, une frimée ou un joker qui ne sert à rien ? Défausse-le : c'est 20 ou 50 points de moins."}

];

window.SCN={
rami:[
["Tu as 7 cartes. Au centre : la pige, face cachée, et la défausse.","n:c:6♦@12,40~ p:c:A♠@12,40~ d:c:9♥@24,40 t1:t:Pige@12,15 t2:t:Défausse@26,15 a:c:7♥@22,80 b:c:7♣@31,80 e:c:7♠@40,80 f:c:4♦@49,80 g:c:5♦@58,80 h:c:K♣@67,80 i:c:2♠@76,80"],
["Commence ton tour : pige une carte, dans la pige ou dans la défausse.","n@85,80^!"],
["Pose un brelan : trois cartes de même valeur.","a@44,40! b@52,40! e@60,40! t:t:Brelan@52,15"],
["Puis une suite : trois cartes qui se suivent, de la même couleur.","f@72,40! g@80,40! n@88,40! t:t:Suite@80,15"],
["Termine en défaussant une carte. Main vide ? Tu gagnes la manche.","h@24,40! i@50,80"]],
'petit-train':[
["Le double‑12 au centre : c'est la gare d'où partent tous les trains.","h:d:12-12@50,45,90! o1:d:3-12@50,24,90 t:t:La_gare@72,45"],
["Ton train part vers toi. Son premier domino doit porter un 12.","m1:d:12-5@50,66,90! t:t:Ton_train@72,66"],
["Le train mexicain est public : tout le monde peut l'allonger.","x1:d:12-9@60,45! x2:d:9-2@73,45 t:t:Train_mexicain@73,30"],
["Rien à jouer ? Pige. Toujours rien ? Ton marqueur ouvre ton train aux autres.","k:m:@59,66! t:t:Marqueur@74,66"],
["Un double se pose en travers et doit être couvert tout de suite.","-k m2:d:5-5@50,83! t:t:À_couvrir_!@72,83"],
["Premier à poser tous ses dominos gagne la manche. Les points qui restent comptent contre toi.","t:t:Le_moins_de_points_gagne@26,12"]],
'dame-de-pique':[
["Le 2 de trèfle ouvre le premier pli.","s:c:2♣@50,62! p1:t:Toi@50,93 p2:t:Gauche@10,45 p3:t:Face@50,7 p4:t:Droite@90,45"],
["Chacun suit la couleur demandée : du trèfle.","w:c:9♣@36,45 n:c:K♣@50,28 e:c:5♣@64,45"],
["La plus haute carte ramasse le pli : le roi, en face.","s@50,10 w@50,10 e@50,10 n@50,10!"],
["Chaque cœur ramassé vaut 1 point. La dame de pique : 13 !","-s -w -e -n q:c:Q♠@40,50! h:c:3♥@60,50! t1:t:13_points@40,24 t2:t:1_point@60,24"],
["Tous les cœurs ET la dame ? Tu fais la lune : 0 pour toi, 26 pour chacun des autres.","h3:c:10♥@32,50 q@42,50! h@52,50! h2:c:A♥@62,50 t:t:La_lune_!@47,22"]],
huit:[
["Suis la couleur ou la valeur de la carte du dessus.","d:c:7♥@50,40 a:c:7♣@32,80 b:c:2♥@41,80 c:c:8♠@50,80 k:c:K♦@59,80 n:c:4♠@20,40~ p:c:Q♣@20,40~ t:t:Pige@20,15"],
["Même valeur : ton 7 de trèfle va sur le 7 de cœur.","a@50,40!"],
["Un 8 se pose sur tout : tu annonces la nouvelle couleur.","c@50,40! t:t:Cœur_!@70,24"],
["Rien à jouer ? Pige jusqu'à trouver une carte jouable.","p@68,80^!"],
["Le premier sans cartes gagne la manche. Un 8 resté en main coûte 50 points.","b@50,40!"]],
cribbage:[
["6 cartes chacun.","a:c:5♥@28,80 b:c:J♣@37,80 c:c:4♥@46,80 d:c:5♦@55,80 e:c:6♣@64,80 f:c:9♠@73,80 s:c:6♠@14,42~"],
["Deux cartes vont dans le crib, qui appartient au brasseur.","b@86,42~! f@86,42~! a@37,80 c@46,80 d@55,80 e@64,80 t:t:Crib@86,16"],
["On retourne la carte de départ. Un valet ? 2 points au brasseur.","s@14,42^! t:t:Départ@14,16"],
["Le jeu : on pose à tour de rôle en annonçant le total, sans dépasser 31.","o:c:10♦@44,45 d@54,45! t:t:10_+_5_=_15_→_2_points@50,16"],
["Le comptage : chaque 15, chaque paire et chaque suite de ta main rapporte des points.","-o a@28,80! c@37,80! d@46,80! e@55,80! s@70,80! t:t:15_•_paires_•_suites@50,45"]],
bataille:[
["Le paquet est partagé en deux piles, face cachée.","yv:c:3♥@50,80~ yh:c:2♦@50,80~ y2:c:Q♣@50,80~ y:c:A♠@50,80~ ov:c:J♠@50,18~ oh:c:5♣@50,18~ o2:c:Q♦@50,18~ o:c:9♥@50,18~"],
["Chacun retourne sa carte du dessus en même temps.","y@40,48^ o@60,48^"],
["L'as est plus fort que le 9 : tu ramasses les deux.","y@50,80! o@50,80"],
["Égalité ? C'est la bataille !","y2@40,48^! o2@60,48^! t:t:Bataille_!@80,48"],
["Une carte face cachée, puis une visible. La plus haute ramasse tout.","yh@41,52 oh@59,52 yv@42,58^ ov@58,58^!"]],
uno:[
["Carte du dessus : 7 rouge. Joue la même couleur, le même chiffre ou le même symbole.","d:u:r7@50,40 a:u:b7@32,80 b:u:b+2@41,80 c:u:kJoker@50,80 e:u:y3@59,80 q1:u:g4@20,40~ q2:u:r9@20,40~ p:u:k@20,40~ t:t:Pige@20,15"],
["Même chiffre : 7 bleu sur 7 rouge.","a@50,40!"],
["+2 : le joueur suivant pige 2 cartes et passe son tour.","b@50,40! q1@46,12 q2@54,12 t:t:+2_!@72,24"],
["Joker : tu choisis la couleur.","c@50,40! t:t:Vert_!@72,24"],
["Plus qu'une carte ? Crie « Uno ! » avant le joueur suivant.","e@50,80! t:t:UNO_!@50,60"]],
canasta:[
["Une combinaison : au moins 3 cartes de même valeur.","k1:c:K♠@30,42! k2:c:K♥@38,42! k3:c:K♦@46,42!"],
["Les 2 et les jokers remplacent n'importe quelle valeur.","w1:c:2♣@54,42! w2:c:Jo★@62,42!"],
["7 cartes : c'est une canasta ! 500 points sans carte frimée, 300 avec.","k4:c:K♣@70,42! k5:c:K♠@78,42! k1@30,42! k2@38,42! k3@46,42! w1@54,42! w2@62,42! t:t:Canasta_mixte_:_300@54,14"],
["Un 3 rouge se pose tout de suite : 100 points.","r:c:3♥@20,80! t:t:100_points@20,58"],
["Prendre la défausse : sa carte du dessus avec deux cartes naturelles de même valeur.","-k1 -k2 -k3 -k4 -k5 -w1 -w2 -r p1:c:4♣@50,40 p2:c:J♦@51,39 p3:c:9♣@52,38! h1:c:9♦@40,80! h2:c:9♠@50,80! h3:c:Q♥@60,80"],
["Les trois 9 forment une combinaison, et le reste de la défausse passe dans ta main.","p3@40,40! h1@48,40! h2@56,40! p1@72,80 p2@81,80"]],
yahtzee:[
["Lance les 5 dés.","a:e:3@30,55,-12 b:e:3@42,40,8 c:e:5@55,62,20 d:e:1@66,42,-25 e:e:3@77,58,10"],
["Garde les 3 et relance les autres. Tu as 3 lancers en tout.","a@30,20,0! b@40,20,0! e@50,20,0! t:t:Gardés@40,40"],
["Deuxième lancer.","c:e:3@48,62,-30 d:e:6@64,52,15"],
["Un 3 de plus ! Plus qu'un dé à relancer.","c@60,20,0! t:t:Gardés@45,40"],
["Troisième lancer… cinq 3 : Yahtzee ! 50 points.","d:e:3@70,20,0! a@30,20,0! b@40,20,0! e@50,20,0! c@60,20,0! t:t:Yahtzee_:_50_points@50,55"]],
poker:[
["Chacun reçoit 2 cartes cachées. Toi, tu as as et roi.","a:c:A♠@45,80 b:c:K♠@54,80 o1:c:7♦@45,16~ o2:c:7♣@54,16~ f5:c:8♣@88,47~ f4:c:J♥@88,47~ f3:c:2♦@88,47~ f2:c:10♠@88,47~ f1:c:Q♠@88,47~"],
["Le flop : 3 cartes au centre, pour tout le monde. On mise.","f1@24,47^ f2@33,47^ f3@42,47^"],
["Le turn : une 4e carte. On mise encore.","f4@51,47^!"],
["La river : la 5e et dernière carte.","f5@60,47^!"],
["Ta meilleure main de 5 cartes parmi 7 : une quinte à l'as. Elle bat la paire de 7 adverse.","a@45,80! b@54,80! f1@24,47! f2@33,47! f4@51,47! o1@45,16^ o2@54,16^ t:t:Quinte_!@78,80"]],
president:[
["Le premier pose 1 à 4 cartes de même valeur. Ici, une paire de 5.","a:c:5♥@44,45! b:c:5♣@53,45!"],
["Le suivant doit poser le même nombre de cartes, plus hautes.","c:c:9♦@47,41! d:c:9♠@56,41!"],
["Tout le monde passe ? Le dernier qui a joué ramasse et recommence.","t1:t:Passe@15,45 t2:t:Passe@85,45 a@50,8 b@50,8 c@50,8 d@50,8"],
["Le 2 est la carte la plus forte du jeu.","-a -b -c -d e:c:2♠@50,45!"],
["Premier sorti : président. Dernier : le trou.","-e t1:t:Président@26,40 t2:t:Trou@74,40 x:c:A♦@70,70 y:c:K♠@78,70"],
["Manche suivante : le trou donne ses 2 meilleures cartes au président.","x@22,70! y@30,70! t1:t:Président@26,40 t2:t:Trou@74,40"]],
'paquet-voleur':[
["4 cartes au milieu, 4 dans ta main. Ton adversaire a déjà un paquet.","m1:c:4♥@26,45 m2:c:9♣@40,45 m3:c:Q♦@54,45 m4:c:2♠@68,45 h1:c:9♥@32,82 h2:c:5♣@41,82 h3:c:K♠@50,82 h4:c:7♦@59,82 o1:c:3♦@50,14~ o2:c:J♥@50,14~ o3:c:7♠@50,14 t:t:Son_paquet@68,14"],
["Ton 9 va avec le 9 du milieu…","h1@42,48!"],
["… tu ramasses les deux : c'est ton paquet.","m2@86,80 h1@86,80! t:t:Ton_paquet@86,58"],
["Ton 7 est pareil au dessus de son paquet : vole tout !","h4@51,17!"],
["Tout son paquet passe dans le tien.","o1@86,80 o2@86,80 o3@86,80 h4@86,80! t:t:Ton_paquet@86,58"],
["Sinon, ta carte reste au milieu. Le plus gros paquet gagne.","h2@82,45!"]],
peche:[
["Demande une valeur que tu as déjà : « As‑tu des 7 ? »","a:c:7♥@32,82 b:c:7♣@41,82 c:c:K♦@50,82 d:c:3♠@59,82 o1:c:7♠@44,14~ o2:c:2♥@53,14~ e1:c:Q♣@16,45~ e2:c:7♦@16,45~ t:t:As‑tu_des_7_?@50,50"],
["Il en a : il te les donne toutes, et tu rejoues.","o1@68,82^!"],
["Il n'en a plus ? « Va pêcher ! » Pige une carte dans l'étang.","t:t:Va_pêcher_!@50,50 e2@77,82^!"],
["Quatre 7 : c'est une famille. Pose‑la devant toi.","a@38,45! b@46,45! o1@54,45! e2@62,45! c@46,82 d@55,82"]],
solitaire:[
["Les colonnes : seule la carte du dessus est visible. La pige est en haut à gauche.","pg:c:K♣@12,18~ c1:c:9♠@24,55 c2d:c:5♦@42,50~ c2:c:8♥@42,57 c3:c:A♦@60,55 c4d:c:3♣@78,50~ c4:c:4♠@78,57 t:t:Les_as_ici@72,16"],
["Descends en alternant les couleurs : 8 rouge sur 9 noir. La carte cachée se retourne.","c2@24,62! c2d@42,50^"],
["Les as montent en haut et commencent les piles, par couleur.","c3@72,18!"],
["Colonne vide ? Seul un roi peut y aller.","pg@60,55^!"],
["Range toutes les cartes de l'as au roi pour gagner.","t:t:As_→_2_→_3_…_→_Roi@50,90"]],
dominos:[
["Le plus gros double commence.","a:d:6-6@50,45,90! p2:d:5-5@14,18~ p:d:4-1@14,18~ h1:d:6-4@36,84 h2:d:2-6@50,84 h3:d:1-3@64,84 t:t:Pige@14,6"],
["Le chiffre qui touche doit être le même : 6 contre 6.","h1@60,45!"],
["Et à l'autre bout, pareil.","h2@40,45!"],
["Rien à jouer ? Pige. Pige vide ? Passe ton tour.","p@64,84^!"],
["Le 4 touche le 4. Premier à vider sa main gagne les points des autres.","p@73,45!"]],
'skip-bo':[
["Ta pile de départ est à gauche : seule la carte du dessus est visible.","s2:u:g6@14,78~ s1:u:b3@14,78 t:t:Ta_pile@14,54 h1:u:b1@38,82 h2:u:b2@47,82 h3:u:kSkip‑Bo@56,82 h4:u:g5@65,82 h5:u:r9@74,82"],
["Au centre, commence une pile avec un 1.","h1@40,38!"],
["Puis le 2.","h2@41,37!"],
["Le 3 est sur ta pile de départ : joue‑le, c'est ta priorité !","s1@42,36! s2@14,78^"],
["Une carte Skip‑Bo remplace n'importe quel chiffre : ici, le 4.","h3@43,35!"],
["Puis le 5 de ta main et le 6 de ta pile.","h4@44,34 s2@45,33!"],
["Termine ton tour en posant une carte sur une de tes piles de défausse.","h5@72,45! t:t:Défausse@72,22"]],
'sky-team':[
["Pilote (dés bleus) et copilote (dés orange) lancent leurs 4 dés en secret.","a1:q:kAxe@42,22 a2:q:kAxe@58,22 m1:q:kMoteur@42,48 m2:q:kMoteur@58,48 p1:e:b4@10,84 p2:e:b3@19,84 p3:e:b6@28,84 p4:e:b2@37,84 o1:e:o4@63,84 o2:e:o5@72,84 o3:e:o1@81,84 o4:e:o6@90,84 t1:t:Pilote@24,66 t2:t:Copilote@76,66"],
["En silence, chacun pose un dé à son tour. L'axe doit recevoir un dé de chaque couleur.","p1@42,22! o1@58,22!"],
["Axe : 4 et 4, l'avion reste bien droit. Sinon, il penche du côté du dé le plus fort.","t:t:4_=_4_:_bien_droit@50,8"],
["Moteurs : un dé de chaque couleur. Leur somme fait avancer l'avion vers l'aéroport.","p2@42,48! o2@58,48! t:t:3_+_5_=_8@50,64"],
["Les autres dés servent aux trains, aux volets, aux freins, à la radio ou au café.","p3@16,30! o3@84,30! t1:t:Trains@16,12 t2:t:Volets@84,12"],
["Dernière manche : piste dégagée, trains et volets sortis, axe droit, vitesse sous les freins.","t:t:Atterrissage_réussi_!@50,64"]],
'toy-battle':[
["Chaque joueur a un QG. Tes troupes doivent toujours y être reliées par tes bases.","hq:q:bQG@50,88 eq:q:rQG@50,12 b1:q:wBase@50,70 b2:q:wBase@50,51 b3:q:wBase@50,32 b4:q:wBase@31,51 b5:q:wBase@69,51 md:m:@60,61 er:q:r2@50,51 tb5:q:b1@10,25 tb1:q:b2@10,40 tb2:q:b3@10,55 tb3:q:b4@10,70 tb4:q:b5@10,85 t:t:Médaille@78,66"],
["À ton tour, une seule action : piger 2 troupes, ou en poser 1.","tb1@50,70!"],
["Tu peux te poser sur une base ennemie si ta troupe est plus forte : 3 bat 2.","tb2@50,51!"],
["Occupe toutes les bases autour d'une région : sa médaille est à toi.","tb3@69,51! md@88,88! t:t:+1_médaille@88,72"],
["Ta ligne avance jusqu'aux portes du QG ennemi…","tb4@50,32!"],
["… et une troupe sur le QG ennemi, c'est la victoire immédiate !","tb5@50,12! t:t:Victoire_!@72,12"]],
'7-wonders-duel':[
["Les cartes de l'âge sont étalées. Seules les cartes libres, que rien ne recouvre, se prennent.","h1:u:bPoints@43,34~ h2:u:yPièces@57,34~ c1:u:nBois@36,52 c2:u:rArmée@50,52 c3:u:gScience@64,52 cp:m:@50,8 t:t:Conflit@64,8"],
["Construis-la en payant son coût. Une carte cachée qui se libère se retourne.","c1@20,84! h1@43,34^"],
["Les cartes rouges poussent le pion Conflit vers la capitale adverse.","c2@32,84! cp@66,8!"],
["Ou défausse une carte contre des pièces, ou glisse-la sous une Merveille pour la bâtir.","c3@80,84! t:t:Merveille@80,62"],
["Pion dans la capitale adverse, ou 6 symboles scientifiques différents : victoire immédiate. Sinon, le plus de points après 3 âges.","cp@92,8! t:t:Victoire_militaire_!@70,22"]],
'bomb-busters':[
["Chacun trie ses fils du plus petit au plus grand, sans les montrer.","y1:q:b2@32,86 y2:q:b5@41,86 y3:q:b8@50,86 y4:q:b9@59,86 y5:q:b11@68,86 x1:q:k?@32,14 x2:q:k?@41,14 x3:q:k?@50,14 x4:q:k?@59,14 x5:q:k?@68,14 dt:m:@10,24 t:t:Détonateur@12,8"],
["Coupe en duo : annonce une valeur que tu as et désigne le fil d'un coéquipier.","x2@41,22! t:t:C'est_un_5_?@50,50"],
["Bon fil : les deux fils sont coupés.","x2:q:b5@46,50! y2@54,50!"],
["Mauvais fil : le détonateur avance d'un cran et la vraie valeur est montrée.","x4:q:b7@59,14! dt@10,42! t:t:Pas_un_9_:_un_7@50,50"],
["Un fil rouge désigné, et tout saute. Tous les fils coupés : mission réussie !","x5:q:r@68,14! t:t:Rouge_=_boum_!@68,32"]],
heat:[
["Choisis ton rapport : en 3e, tu joues 3 cartes, face cachée.","car:q:r@12,40 opp:q:b@50,40 k1:u:y3@36,84 k2:u:y4@45,84 k3:u:y2@54,84 k4:u:y1@63,84 h:u:rChaleur@88,18 t1:t:Rapport_3@14,64 cn:t:Virage_:_limite_4@76,22"],
["Révèle-les et avance de la somme : 3 + 4 + 2 = 9.","k1@36,64! k2@45,64! k3@54,64! car@44,40!"],
["Juste derrière une voiture ? L'aspiration te pousse de 2 cases.","car@58,40! t:t:Aspiration_+2@58,24"],
["Virage : ta vitesse de 9 dépasse la limite de 4. Paie la différence en Chaleur.","car@80,40! h@72,84! t:t:9_−_4_=_5_Chaleur@76,22"],
["Pas assez de Chaleur ? Tête-à-queue : tu recules avant le virage et retombes en 1re.","car@68,40,180! t:t:Tête-à-queue_!@68,22"],
["Le premier à boucler ses tours gagne la course.","car@68,40,0 t:t:Drapeau_à_damier@50,22"]],
kronologic:[
["Six moments, six personnages, et des cartes Lieu de l'Opéra.","m1:q:w1@20,14 m2:q:w2@32,14 m3:q:w3@44,14 m4:q:w4@56,14 m5:q:w5@68,14 m6:q:w6@80,14 pA:q:kA@20,34 pB:q:kB@32,34 pC:q:kC@44,34 pD:q:kD@56,34 pJ:q:kJ@68,34 pS:q:kS@80,34 l2:u:k@50,70~ l1:u:bFoyer@50,70~"],
["Glisse une carte Lieu sous un moment : qui était là au moment 3 ?","l1@44,64^! m3@44,14! t:t:Moment_3@44,88"],
["Une info est publique, à dire à voix haute. L'autre est privée, pour toi seul.","t1:t:Public_:_2_personnes@28,88 t2:t:Privé_:_A_et_J@72,88 pA@20,34! pJ@68,34!"],
["Ou glisse-la sous un personnage : à quels moments est-il passé là ?","l1@68,64! pJ@68,34! t:t:Sous_J@68,88"],
["Tu crois tout savoir ? Arrête l'enquête et vérifie tes réponses dans le livret.","-l1 t:t:Enquête_résolue_?@50,64"]],
dorfromantik:[
["Une tuile de départ au centre, et la pioche à côté.","g1:q:g@50,45 pile:q:k@12,22 n1:q:y@12,22 t:t:Pioche@12,8"],
["Pige une tuile et pose-la contre une tuile déjà posée.","n1@57,45!"],
["Les paysages n'ont pas à correspondre, mais les regrouper rapporte plus.","g2:q:g@43,45! g3:q:g@50,34! y2:q:y@57,34"],
["Les rivières et les voies ferrées doivent se continuer.","w1:q:b@43,56! w2:q:b@50,56! w3:q:b@57,56! t:t:Rivière@70,56"],
["Une mission demande un nombre exact : ici, une forêt d'exactement 3 tuiles.","g1@50,45! g2@43,45! g3@50,34! t:t:Forêt_:_3_→_réussie_!@50,16"],
["Plus de tuiles ? Comptez les points et essayez de battre votre record.","t:t:Nouveau_record_?@50,78"]],
azul:[
["Chaque fabrique offre 4 tuiles.","a1:q:b@27,16 a2:q:b@33,16 a3:q:y@27,28 a4:q:r@33,28 b1:q:k@67,16 b2:q:b@73,16 b3:q:w@67,28 b4:q:w@73,28 f1:t:Fabrique@30,42 f2:t:Fabrique@70,42"],
["Prends toutes les tuiles d'une couleur dans une fabrique. Le reste glisse au centre.","a1@30,72! a2@37,72! a3@47,48 a4@53,48 t:t:Ligne_de_2@18,72"],
["Pose-les sur une ligne. Les tuiles en trop tombent sur le plancher : points perdus.","b3@37,60! b4@30,90! b1@59,48 b2@65,48 t1:t:Ligne_de_1@18,60 t2:t:Plancher_:_−1@14,90"],
["Fin de manche : chaque ligne pleine envoie une tuile sur le mur.","-a1 a2@72,72! b3@79,60! t:t:Mur@76,44"],
["Une tuile rapporte plus si elle touche ses voisines. La partie finit quand une rangée du mur est complète.","m1:q:y@65,72 m2:q:r@79,72 a2@72,72! t:t:3_tuiles_reliées_:_3_points@72,88"]],
trio:[
["Chacun trie sa main du plus petit au plus grand. D'autres cartes attendent au centre, face cachée.","o1:u:b2@32,14~ o2:u:b4@41,14~ o3:u:b5@50,14~ o4:u:b6@59,14~ o5:u:b7@68,14~ c1:u:b7@25,45~ c2:u:b3@35,45~ c3:u:b12@45,45~ c4:u:b10@55,45~ c5:u:b1@65,45~ c6:u:b9@75,45~ y1:u:b7@32,84 y2:u:b8@41,84 y3:u:b9@50,84 y4:u:b11@59,84 y5:u:b12@68,84"],
["Révèle une carte du centre : un 7.","c1@25,45^!"],
["Même numéro ? Continue ! La plus petite carte de ta main : encore un 7.","y1@32,64!"],
["La plus grande carte d'une autre main : un 7 aussi !","o5@68,30^!"],
["Trois 7 : c'est le trio de 7, la victoire immédiate ! Sinon, il faut 3 trios.","c1@44,58! y1@53,58! o5@62,58! t:t:Trio_de_7_!@84,58"]],
'the-gang':[
["Chacun reçoit 2 cartes. Interdit de parler de ses cartes !","l1:c:3♣@8,45~ l2:c:8♦@15,45~ u1:c:J♠@45,14~ u2:c:9♣@54,14~ r1:c:8♥@85,45~ r2:c:6♠@92,45~ y1:c:K♠@45,82 y2:c:K♥@54,82 w1:q:w★1@38,60 w2:q:w★2@46,60 w3:q:w★3@54,60 w4:q:w★4@62,60"],
["Prends un jeton blanc : peu d'étoiles si ta main semble faible, beaucoup si elle semble forte.","w3@68,82! w1@12,64 w2@66,14 w4@88,64"],
["Flop, turn, river : à chaque étape, nouvelle couleur de jetons. On peut prendre celui d'un autre.","f1:c:K♦@32,40! f2:c:7♣@41,40! f3:c:2♠@50,40! f4:c:9♥@59,40! f5:c:5♦@68,40! t:t:Jaunes,_orange,_puis_rouges@50,60"],
["On révèle de 1 étoile à la plus haute. Chaque main doit égaler ou battre la précédente.","l1@8,45^ l2@15,45^ u1@45,14^ u2@54,14^ r1@85,45^ r2@92,45^ t1:t:Carte_haute@12,26 t2:t:Paire@30,14 t3:t:Brelan@30,82 t4:t:Quinte@88,26"],
["Bien classés : un coffre s'ouvre ! 3 coffres, victoire. 3 alarmes, défaite.","t:t:Coffre_ouvert_!@50,62"]],
'five-crowns':[
["Manche 1 : 3 cartes chacun, et les 3 sont frimés.","x:c:5♦@26,40 p:c:9♥@14,40~ a:c:3★@36,80 b:c:7♥@50,80 k:c:K♣@64,80 t:t:Les_3_sont_frimés@50,60"],
["Pige une carte : un 9 de cœur.","p@78,80^!"],
["Le 3 frimé remplace le 8 manquant : 7, 3 et 9 de cœur forment une suite.","b@40,40! a@49,40! p@58,40! t:t:3_=_8♥@49,16"],
["Défausse ta dernière carte : tu sors ! Les autres jouent un dernier tour.","k@26,40!"],
["Manche suivante : 4 cartes, et ce sont les 4 qui sont frimés. Ainsi jusqu'aux rois, en 11 manches.","-a -b -p -k -x t:t:3_→_4_→_5_…_→_Roi@50,45"],
["Cartes restées en main : leur valeur, frimée 20, joker 50. Le moins de points gagne.","j:c:Jo★@42,58! f:c:4♠@56,58! t1:t:Joker_50@42,84 t2:t:Frimée_20@56,84"]]

};
