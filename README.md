# myRepo
Arrêt sur image!

Propose de sensibiliser les joueurs à la pratique de l'arbitrage via une approche ludique.

Arrêt sur image! (ou ISA!) est une solution qui permet de se sensibiliser à un domaine sportif particulier au travers d'intéractions 
programmées et d'une approche ludique.
La version proposée ici se base sur le domaine du football et plus précisémment sur l'arbitrage. ISA! vous permet ainsi que vivre un match 
dans la peau de l'arbitre tout en intéagissant avec un scénario de questions programmées par vous.

Le scénario repose sur une structure de données qui permet de jouer des actions sur la vidéo :
- poser une question (ou bonus)
- afficher une information
- programmer un saut vers un timecode de la séquence
- afficher une séquence au ralenti

La vidéo reste utilisable avec les contrôles proposés par le plug-in video-js (lecture/pause, timecode en direct, fullscreen ou
encore la gestion du volume)

ISA! propose quelques fonctionnalités supplémentaires basées certaines sur le portail de <a href="https://videojs.com/plugins">plug-ins</a> videojs :
- zoom sélectif sur la séquence (basé sur le plug-in <a href="https://www.npmjs.com/package/videojs-resolution-switcher" videojs-resolution-switcher</a>)
- incrustation d'informations sur le match (basé sur le plug-in <a href="https://www.npmjs.com/package/videojs-bug">videojs-bug</a>)
