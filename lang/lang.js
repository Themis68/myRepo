// variables
let LG_ = {
	etatModule:false,	// par défaut le module ne doit pas être utilisé
	params: [
		{id: "fr", flag:"FR"},
		{id: "pt", flag:"PT"},
		{id: "en", flag:"EN"}
	]
};

var LG_defaut = {id: "fr", flag:"FR"};
var LG_langUsed = LG_defaut.id;

// déclaration des objets
var LG_codeHtml = "";
var LG_menu_title = "";
var LG_menu_icone = "";
var LG_chemin = "";


// URI complète
var myURLcomplete = document.location.href;
// URL sans les paramètres
var myURL  = myURLcomplete.substring( 0 ,myURLcomplete.lastIndexOf( "?" ) );

/* Gestion des évènements propres au module multilangue 
ils ne fonctionneront que si le module est activé
*/

// gestion des évènements
document.addEventListener('readystatechange', ready, false);
window.addEventListener('load', LG_load, false); 
document.addEventListener('touchstart', clickF, false);

function ready() {
    switch(document.readyState) {
        case "uninitialized":   // Has not started loading
            // apparait en cas de ralentissement
            console.log("1 LG");   // ne passe aps à cet étape
            break;
        case "loading":         // Is loading
            // apparait en cas de ralentissement
            console.log("2 LG");   // ne passe aps à cet étape
            /*
            L'évènement DOMContentLoaded est déclenché quand le document HTML initial est complètement chargé et analysé, 
            sans attendre la fin du chargement des feuilles de styles, images et sous-document.
            */
            document.addEventListener("DOMContentLoaded", DOMContentLoaded, false);	
            break;
        case "loaded":          // Has been loaded
            console.log("3 LG");   // ne passe pas à cet étape
            break;
        case "interactive":     // Has loaded enough to interact with
            console.log("4 LG");
            // on voit déjà les objets en dur dans la page
			// on regarde s'il y a un appel du module
			window.LG_codeHtml = document.getElementById("LG_menu-lang");	
			if (window.LG_codeHtml != null) {
				// module activé
				LG_.etatModule = true;
				// récupérer le chemin relatif pour langue dans le script
				let lg = document.getElementById("LG");	
				let src = lg.getAttribute("src");
				window.LG_chemin = src.substring(0, src.lastIndexOf("/")+1);
				// ajouter le fichier des styles de LANG
				LG_declareCSS(window.LG_chemin);

				// on recharge la langue si on a cliqué sur le menu pour changer de langue
				let langAfficher = LG_getLangue();
				// insérer le script avec la bonne langue
				LG_declareLangue(window.LG_chemin, langAfficher.id);
			}
            break;
        case "complete":        // Fully loaded
            console.log("5 LG");
			// insertion des chaines de caracteres
			LG_chaines();

        default:

    }
}

function DOMContentLoaded(){
	console.log("4 LG");
	if (LG_.etatModule) {

	}
}

function LG_load() {
	console.log("7 LG");
	if (LG_.etatModule) {
		// génération du code HTML
		LG_genererHtml(LG_.params);

		// MAJ de la langue à utiliser
		let langAfficher = LG_getLangue();
		LG_displayLang(langAfficher);
	}
}

// retourne la taille d'un tableau associatif
//
// exemple appel : arrayAssoSize(scenario) avec 
// - scenario un tableau associatif
//
function LG_arrayAssoSize(arr) {
    var size = 0;
    for (var key in arr) 
    {
        if (arr.hasOwnProperty(key)) size++;
    }
    return size;
}

// retourne l'indice du tableau correspondnat à la valeur reçue
//
// exemple appel : arrayAssoSearch(actions, timeCode) avec 
// - actions un tableau associatif
// - timecode la valeur à rechercher
//
function LG_arraySearch(arr, valObject) {
	var nbEl = LG_arrayAssoSize(arr);
	for (var ind = 0; ind < nbEl; ind++) {
		if (arr[ind].id === valObject) {
			return ind;	// retourne l'indice du tableau
		}
	}
	return -1;	// aucun résultat
}

// recuperation des paramètres de l'url
function LG_getParameters(){
	var urlParams,
	match,
	pl = "/+/g", // Regex for replacing addition symbol with a space
	search = /([^&=]+)=?([^&]*)/g,
	decode = function (s) { return decodeURIComponent(s.replace(pl, )); },
	query = window.location.search.substring(1);
	urlParams = {};
	while (match = search.exec(query))
	urlParams[decode(match[1])] = decode(match[2]);
	return urlParams;
}

function LG_getLangue() {	
	// QUELLE LANGUE AFFICHEE
	// récupérer les paramètres dans l'URL
	let params = LG_getParameters();

	// on vérifie si la langue est gérée
	let indice = LG_arraySearch(LG_.params, params.lang);
	// il faut mettre à jour le renvoi vers la page suivante

	if( indice > -1) {
		// on affiche la langue
		setRenvoi(LG_.params[indice].id);
		return(LG_.params[indice]);
	} else {
		// on affiche la langue par défaut
		setRenvoi(window.LG_defaut.id);		
		return(LG_defaut);
	}
}

// on prépare la transmission de la langue à la page suivante s'il y a un point d'appel
function setRenvoi(lang){
	let renvoi = document.getElementById("LG_renvoi");
	if (renvoi != undefined) {
		const ref = renvoi.getAttribute("href");
		// on vérifie si la langue est déjà présente dans l'URI
		if (ref.indexOf("lang=") == -1){
			renvoi.setAttribute("href", ref +"?lang=" +lang);
		}
	}
}

function LG_displayLang(langue) {
	window.LG_menu_title = document.getElementById("LG_menu-title");		// titre de la langue à afficher
	window.LG_menu_icone = document.getElementById("LG_menu-icone");		// drapeau de la langue

	// afficher langue
	LG_langUsed = langue.flag;
	window.LG_menu_title.innerHTML = langue.flag;
	// afficher l'icone
	let chemin = window.LG_chemin + "/images/" +langue.flag + ".png";
	window.LG_menu_icone.setAttribute("src", chemin);
}

// on automatise l'insertion des CSS de LANG dans le HEAD
function LG_declareCSS(cheminLang){
	console.log("declare CSS");
	// ajout accès au fichier des styles des langues	
	let myCSS = document.createElement("link");
	myCSS.type = "text/css";
	myCSS.rel = "stylesheet";
	myCSS.href = cheminLang + "lang.css" ; 
	document.head.appendChild(myCSS);
}

// on automatise l'insertion du fichier de la langue sélectionnée/défaut de LANG dans le HEAD
function LG_declareLangue(cheminLang, langue){
	// ajout accès au fichier des langues	
	let myScript = document.createElement("script");
	myScript.type = "text/javascript";
	myScript.src = cheminLang + "lang_"+ langue + ".js" ; 
	document.head.appendChild(myScript);
}

function clickF (e) {
	if (e.target.id.indexOf("LG_" ) > -1) {
		// on a cliqué sur une élément de LG
		if (e.target.id == "LG_menu-icone" || e.target.id == "LG_menu-title") {
			let sousmenu = document.getElementById("LG_menu-cb");
			if (sousmenu.checked){
				// sous-menu masqué
				console.log("masqué");
			} else {
				// sous-menu affiché
				console.log("affiché");
			}
		}

		// click sur un sous-menu : ucone ou texte
		if (e.target.id.indexOf("LG_icone-lang-") > -1 
		|| e.target.id.indexOf("LG_span-lang-") > -1){
			// on gère le changement de langue
			let lang = e.target.id.slice(e.target.id.length -2 , e.target.id.length);
			window.location.href = myURL + "?lang=" + lang;
		}
	}	
}

function LG_chaines() {
	// on récupère les éléments qui ont l'attribut "lab"
	let LABs = document.querySelectorAll("span[lab],p[lab],a[lab]")
	LABs.forEach(element => {
		let e = document.getElementById(element.id);
		setLibelle(element.id, e.getAttribute("lab"));
	});
}

function setLibelle(id, libelle){
    let obj = document.getElementById(id);
    obj.innerHTML = eval("LG_lang."+libelle);
}

/*
	génération du code HTML du menu des langues
*/
function LG_genererHtml(params) {
	let label = `
	<label for="LG_menu-cb" class="LG_menu-label">
		<img id="LG_menu-icone" class="LG_menu-img" src="" />
		<span id="LG_menu-title" class="LG_menu-span"></span>
	</label>
	<input type="checkbox" id="LG_menu-cb" class="LG_menu-cb">
	`


	window.LG_codeHtml.innerHTML = label;

	if(window.LG_codeHtml.getAttribute("data-menu") == "true") {
		// on active le menu déroulant

		let nav = `<nav class="LG_menu-nav">
		<ul class="LG_menu-ul"> 

		${params.map(param => `
			<li class="LG_menu-item">
				<a id="LG_sel-lang-${param.id}" class="LG_menu-label" href="">
					<img id="LG_icone-lang-${param.id}" class="LG_menu-img" src="${window.LG_chemin}/images/${param.flag}.png"/>
					<span id="LG_span-lang-${param.id}" class="LG_menu-span">
						${param.flag}
					</span>
				</a>
			</li>
		`)}
		</ul>`;

		window.LG_codeHtml.innerHTML = window.LG_codeHtml.innerHTML + nav;

	}
}

function LG_getLanguesOfQuizz(tabLangue) {
	console.log(tabLangue);
	let codeHTML = ` 

		<div class="langues">
					${tabLangue.map(langue => 
					`<div class="c-${langue}"><img src="${window.LG_chemin}/images/${langue}.png" />
					</div>`)}
		</div>`;
	return codeHTML;
}