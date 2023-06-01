var version = "1.0.1";

// variables
var LG_params = [
	{id: "fr", flag:"FR"},
	{id: "pt", flag:"PT"},
	{id: "en", flag:"EN"}
];

var LG_defaut = {id: "fr", flag:"FR"};

// déclaration des objets
var LG_codeHtml = "";
var LG_menu_lang_title = "";
var LG_icone_lang = "";

// URI complète
var myURLcomplete = document.location.href;
// URL sans les paramètres
var myURL  = myURLcomplete.substring( 0 ,myURLcomplete.lastIndexOf( "?" ) );

// gestion du clic
//document.addEventListener("touchstart", clickF, false);
window.addEventListener('load', LG_load, false); 

document.addEventListener("DOMContentLoaded", init, false);	 
document.addEventListener('readystatechange', ready, false);

function init(){
	console.log("init");
	// flag qui confirme l'usage de langue apr la page HTML
	window.LG_codeHtml = document.getElementById("LG_menu-lang");					
	if (LG_codeHtml != null) {
		// module activé
		// inserer ici les actions
	}
}

function ready(){
	console.log("ready");
	// LG_codeHtml est déjà reconnu
	if (window.LG_codeHtml != null) {
		// module activé
		// inserer ici les actions
	}
}

function LG_load() {
	console.log("load");
	// LG_codeHtml est déjà reconnu
	if (window.LG_codeHtml != null) {
		LG_genererHtml(window.LG_params);
		// MAJ de la langue par defaut
		LG_displayLang(window.LG_defaut);
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

function LG_displayLang(langue) {
	/*
		// on affiche le nom court de la langue
		let span = document.createElement("span");
		span.innerHTML = " " + (LG_params[indice].flag);
		window.LG_menu_lang_title.appendChild(span);

		// afficher icone
		let chemin = pathLangues + "/images/" + params.lang + ".png";
		window.LG_icone_lang.setAttribute("src", chemin);
		*/


	window.LG_menu_lang_title = document.getElementById("LG_menu-lang-title");	// titre de la langue à afficher
	window.LG_icone_lang = document.getElementById("LG_icone-lang");				// drapeau de la langue

	// afficher langue
	window.LG_menu_lang_title.innerHTML = "&nbsp;" + langue.flag;
	// afficher icone

	// comment gérer le chemin d'accès de la page HTML ?
	// on peut le récupérer ?
	// on le passe en paralètre ?
	let chemin = pathLangues + "/images/" +langue.id + ".png";
	window.LG_icone_lang.setAttribute("src", chemin);

	// on appelle la gestion des chaines de la page
	LG_chaines();
}

function LG_ready(codeLang) {

	
	// QUELLE LANGUE AFFICHEE
	// récupérer les paramètres dans l'URL
	let params = getParameters();

	// on vérifie si la langue est gérée
	let indice = LG_arraySearch(window.LG_params, paramsURL.lang);
	if( indice > -1) {
		// on insère le code de la lang dans le header
		// intégration du fichier de langue sélectionné
		LG_insertLangue("../mob/lang", paramsURL.lang);	// on charge les chaines dns la langue souhaitée

		// on sélectionne une langue
		LG_selectLangue(paramsURL.lang);

		// on affiche la langue
		LG_displayLang(LG_params[paramsURL.lang]);
	} else {
		// afficher une erreur
		window.alert("La langue "+params.lang + " n'est pas prise en charge");
	}
}

function LG_insertLangue(pathLangues, langue){
	// ajout accès au fichier des langues	
	let myScript = document.createElement("script");
	myScript.type = "text/javascript";
	myScript.src = pathLangues + "/lang."+langue+ ".js" ; 
	document.head.appendChild(myScript);
}

function setLibelle(id, libelle){
    let obj = document.getElementById(id);
    obj.innerHTML = eval("lang."+libelle);
}

// on gère le changement de lkangue
/*function clickF (e) {
	console.log("click : " + e.target);
	if (e.target.id.indexOf("LG_sel-lang-") > -1){
		lang = e.target.id.substring(e.target.id.lastIndexOf("-"),2);
		switch (e.target.id) {
			case "LG_sel-lang-fr":
				lang = "fr";
				break;
			case "LG_sel-lang-pt":
				lang = "pt";
				break;
			case "LG_sel-lang-en":
				lang = "en";
				break;
			default:
				lang = "fr";
		}
		window.location.href = myURL + "?lang=" + lang;
	}
}*/

function LG_selectLangue (langue) {
	console.log(myURL);
	window.location.href = myURL + "?lang=" + langue;
}

/*
	génération du code HTML du menu des langues
*/
function LG_genererHtml(params) {
	// bin$ome : drapeau et abbréviation
	let label  = document.createElement("label");
    label.setAttribute("for", "LG_menu-cb");
	label.setAttribute("class", "LG_menu-label");

	// drapeau
	let img  = document.createElement("img");
	img.setAttribute("class", "LG_menu-item-img");
	img.setAttribute("id", "LG_icone-lang");
	img.setAttribute("src", "");

	// langue abrégée
	let span  = document.createElement("span");
	span.setAttribute("id", "LG_menu-lang-title");
	span.setAttribute("class", "LG_menu-item-span");
	label.appendChild(img);
	label.appendChild(span);

	window.LG_codeHtml.appendChild(label);

	// case a cocher
	let input  = document.createElement("input");
    input.setAttribute("type", "checkbox");
	input.setAttribute("id", "LG_menu-cb");
	input.setAttribute("class", "LG_menu-cb");

	window.LG_codeHtml.appendChild(input);
	// menu déroulant
	let nav = document.createElement("nav");
    nav.setAttribute("class", "LG_menu-nav");

	// boucle pour les langues
	let ul = document.createElement("ul");
	
	for (i = 0; i < LG_arrayAssoSize(params); i++){
		// langue
		let li  = document.createElement("li");
		li.setAttribute("class", "LG_menu-item");
		li.setAttribute("onclick","LG_selectLangue(" + params[i].id+ ");");

		// kien hypertext
	/*	let hyp = document.createElement("a");
		hyp.setAttribute("id", "LG_sel-lang-" + params[i].id);
		hyp.setAttribute("class", "LG_menu-label");
		hyp.setAttribute("href", "");*/
		// img
		let img1 = document.createElement("img");
		img1.setAttribute("id", "LG_icone-lang-" + params[i].id);
		img1.setAttribute("class", "LG_menu-item-img");
		img1.setAttribute("src", "./lang/images/"+ params[i].flag + ".png");

		let span = document.createElement("span");
		span.setAttribute("class", "LG_menu-item-span");
		span.innerHTML = "&nbsp;"+ params[i].flag;

		li.appendChild(img1);
		li.appendChild(span);
		ul.appendChild(li);

	}
	nav.appendChild(ul);
	window.LG_codeHtml.appendChild(nav);
}

