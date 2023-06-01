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
document.addEventListener("touchstart", clickF, false);
window.addEventListener('load', LG_load, false); 

document.addEventListener("DOMContentLoaded", init, false);	 
document.addEventListener('readystatechange', ready, false);

function init(){
	console.log("init");
}

function ready(){
	console.log("ready");
}

function LG_load() {
	// on insere le code sur la page HTML
	// objets
	LG_codeHtml = document.getElementById("menu-lang");					// flag qui confirme l'usage de langue apr la page HTML

	if (LG_codeHtml != null) {
		// génération du code HTML
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
	window.LG_menu_lang_title = document.getElementById("menu-lang-title");	// titre de la langue à afficher
	window.LG_icone_lang = document.getElementById("icone-lang");				// drapeau de la langue

	console.log(langue);
	// afficher langue
	window.LG_menu_lang_title.innerHTML = "&nbsp;" + langue.flag;
	// afficher icone

	// comment gérer le chemin d'accès de la page HTML ?
	// on peut le récupérer ?
	// on le passe en paralètre ?
	let chemin = pathLangues + "/images/" +langue.id + ".png";
	window.LG_icone_lang.setAttribute("src", chemin);
}

function LG_ready(codeLang) {

	// intégration du fichier de langue sélectionné
	LG_selectLangue("../mob/lang", paramsURL.lang);	// on charge les chaines dns la langue souhaitée

	// récupérer les paramètres dans l'URL
	let params = getParameters();

	// on vérifie si la langue est gérée
	let indice = LG_arraySearch(window.LG_params, paramsURL.lang);
	if( indice > -1) {
		// on affiche le nom court de la langue
		let span = document.createElement("span");
		span.innerHTML = " " + (LG_params[indice].flag);
		window.LG_menu_lang_title.appendChild(span);

		// afficher icone
		let chemin = pathLangues + "/images/" + params.lang + ".png";
		window.LG_icone_lang.setAttribute("src", chemin);
	} else {
		// afficher une erreur
		window.alert("La langue "+params.lang + " n'est pas prise en charge");
	}
}

function LG_selectLangue(pathLangues, langue){
	// ajout accès au fichier des questions	
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
function clickF (e) {
	if (e.target.id.indexOf("sel-lang-") > -1){
		lang = e.target.id.substring(e.target.id.lastIndexOf("-"),2);
		console.log(lang);
		switch (e.target.id) {
			case "sel-lang-fr":
				lang = "fr";
				break;
			case "sel-lang-pt":
				lang = "pt";
				break;
			case "sel-lang-en":
				lang = "en";
				break;
			default:
		}
		window.location.href = myURL + "?lang=" + lang;
	}
}

function LG_genererHtml(params) {
	// binôome : drapeau et abbréviation
	let label  = document.createElement("label");
    label.setAttribute("for", "menu-cb");
	label.setAttribute("class", "menu-label");

	// drapeau
	let img  = document.createElement("img");
	img.setAttribute("class", "menu-item-img");
	img.setAttribute("id", "icone-lang");
	img.setAttribute("src", "");

	// langue abrégée
	let span  = document.createElement("span");
	span.setAttribute("id", "menu-lang-title");
	span.setAttribute("class", "menu-item-span");
	label.appendChild(img);
	label.appendChild(span);

	window.LG_codeHtml.appendChild(label);

	if(window.LG_codeHtml.getAttribute("data-menu") == "true") {
		// on active le menu

		// case a cocher
		let input  = document.createElement("input");
		input.setAttribute("type", "checkbox");
		input.setAttribute("id", "menu-cb");
		input.setAttribute("class", "menu-cb");

		window.LG_codeHtml.appendChild(input);

		// menu déroulant
		let nav = document.createElement("nav");
		nav.setAttribute("class", "menu-nav");

		// boucle pour les langues
		let ul = document.createElement("ul");
		
		for (let i = 0; i < LG_arrayAssoSize(params); i++){
			// langue
			let li  = document.createElement("li");
			li.setAttribute("class", "menu-item");

			// kien hypertext
			let hyp = document.createElement("a");
			hyp.setAttribute("id", "sel-lang-" + params[i].id);
			hyp.setAttribute("class", "menu-label");
			hyp.setAttribute("href", "");
			// img
			let img1 = document.createElement("img");
			img1.setAttribute("id", "icone-lang-" + params[i].id);
			img1.setAttribute("class", "menu-item-img");
			img1.setAttribute("src", "./lang/images/"+ params[i].flag + ".png");

			let span = document.createElement("span");
			span.setAttribute("class", "menu-item-span");
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

