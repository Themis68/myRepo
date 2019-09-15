** ------------------------------------------------------------------------------------------------------- **
** ------------------------------------------------------------------------------------------------------- **
** ------------------------------------------------------------------------------------------------------- **

                                                    VERSION 2

** ------------------------------------------------------------------------------------------------------- **
** ------------------------------------------------------------------------------------------------------- **
** ------------------------------------------------------------------------------------------------------- **
HEDAER

SECTION

MENU
zone haute

- BASCULE
Contrôle l'affichage du carousel

- CAROUSEL
Propose une liste de vignettes des matchs


CONTENT
zone centrale

- MATCH
zone d'affichage de la video

- INTER
Zone de gestion des intéractions avec la vidéo

-- TETE
Contient : NIVEAU, TITRE et POINTS

--- NIVEAU
comptabilise les questions en fonctions des niveaux
met à jour le tableau des niveaux
afiche/masque les boutons de niveau
gère le clic et l'affichage du bouton cliqué
met à jour JAUGE

--- TITRE
affiche un contenu selon la situation : 
"Match" quand on clique sur une vignette

--- POINTS
zone masquée quand on clique sur une vignette

-- JAUGE
affiche le nombre de questions quand on clique sur une vignette
affiche l'avancement des questions

-- QUESTION
affiche un libellé selon la stuation :
Quand on clique sur une vignette on affiche les équipes qui se rencontrent

-- PROPOSITIONS
liste les propositions de la question

--- BUTTON
chaque proposition est senseible au clic

-- COMPLEMENT

-- SUITE
zone qui permet d'avoir des actions

--- REPLAY
bouton replay qui s'affiche si c'est prévu
possède un paramètre pour la durée du recul

--- SUITE