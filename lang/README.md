IHM avec l'option Multilangues

-- 1 Activer le module des langues sur une page

--- 1.1 Ajouter le code suivant dans la section <HEAD> de la page HTML qui le demande

<script src="lang/lang.js" type="text/javascript" id="LG"></script>

-> src contient le chemin vers le fichier lang.js
-> les modules suivants sont intégrés automatiquement si le le module est activé :
  
  <link href="./lang/lang.css" rel="stylesheet" type="text/css"/>
  <script src="./lang/lang<langue>.js" type="text/javascript"></script>

--- 1.2 Ajouter le code suivant dans la section dans la section de déclaration de la page JS qui gère la page HTML

const afficherMenuLangue = true;
LG_.setMenu(afficherMenuLangue);

-- 2 Paramétrer les chaines de caractères

Si vous souhaitez qu'une chaine de caract_res soit paramétrée, il faut ajouter une balise à l'élément dans la page HTML comme ceci :

<p id="titre" lab="LAB_A001" class="asi-text"></p>

-> la balise lab contient le code qui renvoi vers les chaines de caractères correspondant à la langue activée.

-- 3 - Créer les fichiers des chaines de caractères par langue
-> chaque langue a un fichier avec l'ensemble des chaines de caractères pour le module quizz
Il doit être installer dans le répertoire 'lang/' et doit se nommer 'lang_<abbréviation langue>.js'
ex : lang_fr.js

le fichier est structuré comme suit :
lang = {
    LAB_A006:"Sports", 
    LAB_A001:"Découvre de nouvelles émotions en devenant arbitre de ton sport préféré",
    LAB_A002:"Football"
}
-> la langue par défaut chargée au début est le français. 
-> On peut switcher par la suite avec les langues suivantes à disposition : 
  fr : français
  pt : portugais
  en : anglais

Attention : il doit y avoir une chaine de caractère par langue pour chaque appel de la balise lab





  <div id="menu-lang" data-menu="true"></div>
-- data-menu="true" : module activé
-- data-menu="false" : module désactivé








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