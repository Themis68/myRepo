ARRET SUR IMAGE ! 

IHM avec l'option Multilangues

- Le module sera activé uniquement s'il détecte la présence d'un objet qui l'appelle depuis la page HTML
  <div id="menu-lang" data-menu="true"></div>
-- data-menu="true" : module activé
-- data-menu="false" : module désactivé

- il faut intégrer les appels suivants dans la zone HEAD de la page appelante :
  <link href="./lang/lang.css" rel="stylesheet" type="text/css"/>
  <script src="./lang/lang.js" type="text/javascript" id="LG"></script>

- il faut égalemen ajouter la langue à afficher dans les appels des pages suivantes dès lors qu'elles l'utilisent
  <a href="./quizz/quizzSPslider.html?lang=fr">

-- on a les langues suivantes à disposition : 
--- fr : français
--- pt : portugais
--- en : anglais
------------------------------------------------------------------------------


- chaque langue a un fichier avec l'ensemble des chaines de caractères pour le module quizz
- le fichier est chargé dynamiquement avec la page via le paramètre 'lang' grace à l'import des pages



- appel de la lang par défaut depuis les pages HTML de départ:

        <a href="./quizz/quizzSPslider.html?lang=fr">

- les objets qui bénéficient de la gestion des langues doivent avoir un id et l'attribut "lab"

<p id="titre" lab="LIB_A001" class="asi-text"></p>

définir la variable pathLangues 

multilangue dans le fichier js lié au ficheir HTML
  var pathLangues = "../lang";

- on charge le fichier de langue dans une méthode init()

	paramsURL = getParameters();	// on récupère un tableau associatif depuis les paramètres de l'URL
	selectLangue(paramsURL.lang);	// on charge les chaines dns la langue souhaitée


on définit les valeurs dans la méthode ready()
  setLibelle("titre","LIB_A001");
	setLibelle("btnQuizz","LIB_B002");

    le fichier d'appel doit pousser le chix de la langue

document.location.href="./mob/indexSP.html?lang=fr";

- le menu des langues peut être initialisé sur la page en ajoutant le code suivant dans le fichier HTML


