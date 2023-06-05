// variables
var LG_etatModule = false;	// par défaut le module ne doit pas êtrre utilisé

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
document.addEventListener("DOMContentLoaded", init, false);	 
window.addEventListener('load', LG_load, false); 
document.addEventListener("touchstart", clickF, false);

function ready(){
	
	// Cette condition évite le doublement du chargement
	if (document.readyState === "complete") {
		console.log("6 - ready");
		// insertion des chaines de caracteres
		LG_chaines();
	} else {
		console.log("2 - ready");
		// on regarde s'il y a un appel du module
		window.LG_codeHtml = document.getElementById("LG_menu-lang");	
		if (window.LG_codeHtml != null) {
			// module activé
			LG_etatModule = true;
			// récupérer le chemin relatif pour langue
			let lg = document.getElementById("LG");	
			let src = lg.getAttribute("src");
			window.LG_chemin = src.substring(0, src.lastIndexOf("/")+1);
		}
		//: on recharge le dico si on a cliqué sur le menu pour changer de langue
		let langAfficher = LG_getLangue();
		// insérer le script avec le bon dico
		LG_insertDico(langAfficher.id);
	}
}

function init(){
	console.log("4 - init");
	if (LG_etatModule) {

	}
}

function LG_load() {
	console.log("8 - load");
	if (LG_etatModule) {
		// génération du code HTML
		LG_genererHtml(window.LG_params);
		// MAJ de la langue par defaut
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
	let indice = LG_arraySearch(window.LG_params, params.lang);
	if( indice > -1) {
		// on affiche la langue
		//console.log("langue : " + window.LG_params[indice]);
		return(window.LG_params[indice]);
	} else {
		// on affiche la langue par défaut
		//console.log("default");
		return(window.LG_defaut);
	}
}

function LG_displayLang(langue) {
	console.log("///// " + langue);
	window.LG_menu_lang_title = document.getElementById("LG_menu-lang-title");	// titre de la langue à afficher
	window.LG_icone_lang = document.getElementById("LG_icone-lang");				// drapeau de la langue

	// afficher langue
	window.LG_menu_lang_title.innerHTML = "&nbsp;" + langue.flag;
	// afficher icone

	// comment gérer le chemin d'accès de la page HTML ?
	// on peut le récupérer ?
	// on le passe en paralètre ?
	let chemin = window.LG_chemin + "/images/" +langue.id + ".png";
	window.LG_icone_lang.setAttribute("src", chemin);
}

function LG_insertDico(dico){
	// ajout accès au fichier des langues	
	let myScript = document.createElement("script");
	myScript.type = "text/javascript";
	myScript.src = window.LG_chemin + "lang_"+ dico + ".js" ; 
	document.head.appendChild(myScript);
}

function setLibelle(id, libelle){
    let obj = document.getElementById(id);
    obj.innerHTML = eval("lang."+libelle);
}

// on gère le changement de lkangue
function clickF (e) {
	console.log("click : " + e.target.id);
	if (e.target.id.indexOf("LG_icone-lang-") > -1 
		|| e.target.id.indexOf("LG_span-lang-") > -1){
		let lang = e.target.id.slice(e.target.id.length -2 , e.target.id.length);
		console.log("on switch sur " + lang);
		window.location.href = myURL + "?lang=" + lang;
	}
}

/*function LG_selectLangue (langue) {
	window.location.href = myURL + "?lang=" + langue;
}*/

/*
	génération du code HTML du menu des langues
*/
function LG_genererHtml(params) {
	// binôome : drapeau et abbréviation
	let label  = document.createElement("label");
    label.setAttribute("for", "LG_menu-cb");
	label.setAttribute("class", "LG_menu-label");

	// drapeau
	let img  = document.createElement("img");
	img.setAttribute("class", "LG_menu-item-img");
	img.setAttribute("id", "LG_icone-lang");
	img.setAttribute("src", window.LG_chemin + "/images/"+ window.LG_defaut.flag + ".png");
	img.setAttribute("src", "");

	// langue abrégée
	let span  = document.createElement("span");
	span.setAttribute("id", "LG_menu-lang-title");
	span.setAttribute("class", "LG_menu-item-span");
	label.appendChild(img);
	label.appendChild(span);

	window.LG_codeHtml.appendChild(label);

	if(window.LG_codeHtml.getAttribute("data-menu") == "true") {
		// on active le menu

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
		
		for (let i = 0; i < LG_arrayAssoSize(params); i++){
			// langue
			let li  = document.createElement("li");
			li.setAttribute("class", "LG_menu-item");

			// kien hypertext
			let hyp = document.createElement("a");
			hyp.setAttribute("id", "LG_sel-lang-" + params[i].id);
			hyp.setAttribute("class", "LG_menu-label");
			hyp.setAttribute("href", "");
			// img
			let img1 = document.createElement("img");
			img1.setAttribute("id", "LG_icone-lang-" + params[i].id);
			img1.setAttribute("class", "LG_menu-item-img");
			img1.setAttribute("src", window.LG_chemin + "/images/"+ params[i].flag + ".png");

			let span = document.createElement("span");
			span.setAttribute("id", "LG_span-lang-" + params[i].id);
			span.setAttribute("class", "LG_menu-item-span");
			span.innerHTML = "&nbsp;"+ params[i].flag;

			hyp.appendChild(img1);
			hyp.appendChild(span);
			li.appendChild(hyp);
			ul.appendChild(li);

		}
		nav.appendChild(ul);
		window.LG_codeHtml.appendChild(nav);
	}
}

function LG_chaines() {
    setLibelle("titre","LIB_A001");
    setLibelle("titre1","LIB_A002");
    setLibelle("titre2","LIB_A003");
    setLibelle("titre3","LIB_A004");
    setLibelle("titre4","LIB_A005");
    setLibelle("asi-title","LIB_A006");
}