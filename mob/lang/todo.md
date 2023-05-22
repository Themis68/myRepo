- chaque langue a un fichier avec l'ensemble des chaines de caractères pour le module quizz
- le fichier est chargé dynamiquement avec la page via le paramètre 'lang' grace à l'import des pages
  <script src="../fonctions.js" type="text/javascript"></script>
  <script src="./lang/lang.js" type="text/javascript"></script>

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
     <div id="menu-lang">
    </div>

