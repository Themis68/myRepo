VIDEO :
- gestion du centrage des infos de l'arbitre en mode fullscreen :
    x gestion lors du clic sur le bouton
    x gestion lors de l'affichage initial de la vidéo
    x gestion lors d'un redimensionnement de le la fenêtre 
x les silhouettes ne 'affichent pas à l'init de la vidéo

/********************/

Gestion affichage sur mobile

x les <a> ont toujours le mot souligné
x il faut gérer la hauteur de page en fonction de chaque navigateur

/********************/
Zonde des navigateurs :
Attention, il faut se s- ouvenir que sur mobile le navigateur affiche la barre URL en haut et une barre de navigation en bas
- Chaque zone prend environ 75px. Il faut donc réduire la hauteur calculée pour le footer d'autant.
- Il semble possible de ne pas afficher la zone d'en bas mais seulement pour Safari (vérifier avec IOS récent)

En mode portrait, 
- le "poussage" du footer vers le bas de l'écran avec "margin-top : auto;" fonctionne bien sur les navigateurs testés avec IOS 12.5.5 :
Firefox
Duke
Opera
Edge
Chrome
Safari
Ecosia
- la barre URL s'affiche toujours sauf Safari justement si on le demande

En mode paysage
- Le simulateur F12 de Chrome ne gère pas bien le mode paysage : afficha HS
- La barre de navigation ne s'affiche jamais sauf avec Duke

Pour charger le fichier JS sans le cache :
- <script src="./indexSP.js?n=1" type="text/javascript"></script>
