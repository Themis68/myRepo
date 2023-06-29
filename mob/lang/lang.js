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
document.addEventListener("DOMContentLoaded", init, false);	 
window.addEventListener('load', LG_load, false); 
document.addEventListener("touchstart", clickF, false);

function ready(){
	
	// Cette condition évite le doublement du chargement
	if (document.readyState === "complete") {
		console.log("6 - LG ready");
		// insertion des chaines de caracteres
		LG_chaines();
	} else {
		console.log("2 - LG ready");
		// on regarde s'il y a un appel du module
		window.LG_codeHtml = document.getElementById("LG_menu-lang");	
		if (window.LG_codeHtml != null) {
			// module activé
			LG_etatModule = true;
			// récupérer le chemin relatif pour langue dans le script
			let lg = document.getElementById("LG");	
			let src = lg.getAttribute("src");
			window.LG_chemin = src.substring(0, src.lastIndexOf("/")+1);

			//: on recharge le dico si on a cliqué sur le menu pour changer de langue
			let langAfficher = LG_getLangue();
			// insérer le script avec le bon dico
			LG_insertDico(langAfficher.id);
		}
		
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
	let indice = LG_arraySearch(window.LG_params, params.lang);
	// il faut mettre à jour le renvoi vers la page suivante

	if( indice > -1) {
		// on affiche la langue
		setRenvoi(window.LG_params[indice].id);
		return(window.LG_params[indice]);
	} else {
		// on affiche la langue par défaut
		setRenvoi(window.LG_defaut.id);		
		return(window.LG_defaut);
	}
}

function setRenvoi(lang){
	// on prépare la transmission de la langue à la page suivante
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
	window.LG_menu_icone = document.getElementById("LG_menu-icone");				// drapeau de la langue

	// afficher langue
	window.LG_menu_title.innerHTML = "&nbsp;" + langue.flag;
	// afficher l'icone
	let chemin = window.LG_chemin + "/images/" +langue.flag + ".png";
	window.LG_menu_icone.setAttribute("src", chemin);
}

function LG_insertDico(dico){
	console.log("charge dico " + dico);
	// ajout accès au fichier des langues	
	let myScript = document.createElement("script");
	myScript.type = "text/javascript";
	myScript.src = window.LG_chemin + "lang_"+ dico + ".js" ; 
	document.head.appendChild(myScript);
}

// on gère le changement de langue
function clickF (e) {
	// clic sur le menu : LG_menu-icone

	// click sur un sous-menu : LG_icone-lang
	if (e.target.id.indexOf("LG_icone-lang-") > -1 
		|| e.target.id.indexOf("LG_span-lang-") > -1){
		let lang = e.target.id.slice(e.target.id.length -2 , e.target.id.length);
		console.log("on switch sur " + lang);
		window.location.href = myURL + "?lang=" + lang;
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

	// binôme : drapeau et abbréviation
	//let pathIcone = window.LG_chemin + "/images/"+ window.LG_defaut.flag + ".png";
	//let libLangue = window.LG_defaut.flag; 
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
		<ul> 

		${params.map(param => `
			<li class="LG_menu-item">
				<a id="LG_sel-lang-${param.id}" class="LG_menu-label" href="">
					<img id="LG_icone-lang-${param.id}" class="LG_menu-img" src="${window.LG_chemin}/images/${param.flag}.png"/>
					<span id="LG_span-lang-${param.id}" class="LG_menu-span">
						&nbsp;${param.flag}
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