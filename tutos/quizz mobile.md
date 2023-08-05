QUIZZ

- POINTS
1 bonne réponse donne les points prévus par la question
1 mauvaise réponse donne 0 points

- TEMPS
1 bonne réponse impute le temps utilisé pour la réflexion
1 mauvaise réponse impute le temps maximum prévu pour la réflexion

- RESULTAT
On se base sur le score
Si on a besoin de départager, on se basera sur le temps utilisé pour lé réflexion
Le temps le plus faible gagne.

QUIZZ MOBILE 


- le fond gris du <card> ne va pas jusqu'en bas
- les logos des infos du quizz ne sont pas vert: 
- v"rfiier que cela ne plante pas en version desktop
- le footer n'est pas fixé en bas
- centrer le résultat dans le ring
- corriger la taille du titre de resultat.html
- récupérer les infos du quizz joué dans résultat.html
- afficher les propositions verticalement dans zoneQuizz.html
- gérer la couleur des boutons de proposition selon que l'on a bon ou lauvais
- ajouter du son


sources :

DOM : 
https://developer.mozilla.org/en-US/docs/Web/API/HTMLHeadingElement

events :
https://developer.mozilla.org/fr/docs/Web/Events

incompatibilités browser :
https://www.quirksmode.org/dom/events/index.html#t01

chartist :
https://gionkunz.github.io/chartist-js/getting-started.html


accès à un attribut personnalisé d'un TAG
HTML : <div id="jauge" class="progress-bar"  data-use="esd">
javascript : 	alert(btnJauge.dataset.use);


  <div class="ring red"></div>
      <div class="ring orange"></div>
      <div class="ring blue"></div>
      <div class="ring green"></div>
