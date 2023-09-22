ARRET SUR IMAGE ! 

- IHM avec l'option Multilangues

-- Le module sera activé uniquement s'il détecte la présence d'un objet qui l'appelle depuis la page HTML
  <div id="menu-lang" data-menu="true"></div>
-- data-menu="true" : module activé
-- data-menu="false" : module désactivé


-- il faut intégrer les appels suivants dans la zone HEAD de la page appelante :
  <script src="./lang/lang.js" type="text/javascript" id="LG"></script>

  les modules suivants sont intégrés automatiquement si le le module est activé :
  <link href="./lang/lang.css" rel="stylesheet" type="text/css"/>
  <script src="./lang/lang<langue>.js" type="text/javascript"></script>

-- la langue par défaut chargée au début est le français. 
-- On peut switcher par la suite avec les langues suivantes à disposition : 
--- fr : français
--- pt : portugais
--- en : anglais

-- Chaque langue a un fichier avec l'ensemble des chaines de caractères pour le module quizz
Il doit être installer dans le répertoire 'lang/' et doit se nommer 'lang_<abbréviation langue>.js'
ex : lang_fr.js

le fichier est structuré comme suit :
lang = {
    LAB_A006:"Sports", 
    LAB_A001:"Découvre de nouvelles émotions en devenant arbitre de ton sport préféré",
    LAB_A002:"Football"
}

On doit avoir les mêmes codes LAB_... pour chaque langue disponible

Il faut relier ces informations aux éléments de l'interface dans le fichier HTML via l'attribut 'lab':
<p id="titre" lab="LAB_A001" class="asi-text"></p>

-- Lorsqu'on choisit une autre langue, tous les objets tagués <p>, <a> et <span> ayant l'attribut "lab" sont mis à jour. 

-- il est possible de transmettre la langue à la page suivante. Pour cela il suffit d'ajout le id="LG_renvoi" suivant à la section de code qui permet le renvoi (il s'agit d'un tag "<a>"

ex : <a href="./quizz/quizzSPslider.html" id="LG_renvoi">

cela aura pour conséquence de mettre à jour "href" : "./quizz/quizzSPslider.html?lang=<langue>"

- QUIZZ 

Toute page peut récupérer la liste des langues pour un quizz donné sous forme de drapeaux en appelant la fonction LG_getLanguesOfQuizz(tabLangue)
Il suffit de lui passer un tableau de [fr,pt,..]

-- il est possible de changer de langue dans la page d'accueil des disciplines sportives
chaque page affichera la langue sélectionnée pour information
en effet le choix de la langue impact le contenu des autres pages.