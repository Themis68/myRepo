ARRET SUR IMAGE ! 

IHM avec l'option Multilangues

- Le module sera activé uniquement s'il détecte la présence d'un objet qui l'appelle depuis la page HTML
  <div id="menu-lang" data-menu="true"></div>
-- data-menu="true" : module activé
-- data-menu="false" : module désactivé

- il faut intégrer les appels suivants dans la zone HEAD de la page appelante :
  <link href="./lang/lang.css" rel="stylesheet" type="text/css"/>
  <script src="./lang/lang.js" type="text/javascript" id="LG"></script>

- la langue par défaut chargée au début est le français. 
-- On peut switcher par la suite avec les langues suivantes à disposition : 
--- fr : français
--- pt : portugais
--- en : anglais

- Chaque langue a un fichier avec l'ensemble des chaines de caractères pour le module quizz
Il doit être installer dans le répertoire 'lang/' et doit se nommer 'lang_<abbréviation langue>.js'
ex : lang_fr.js

le fichier est structuré comme suit :
lang = {
    LAB_A006:"Sports", 
    LAB_A001:"Découvre de nouvelles émotions en devenant arbitre de ton sport préféré",
    LAB_A002:"Football"
}

On doit avoir les mêmes codes LAB_... pour chaque langue disponible

Il faut relier ces informations aux éléments de l'interface dans le fihcier HTML via l'attribut 'lab':
<p id="titre" lab="LAB_A001" class="asi-text"></p>

- Lorsqu'on choisit une autre langue, tous les objets tagués <p> et <span> ayant l'attribut "lab" sont mis à jour. 