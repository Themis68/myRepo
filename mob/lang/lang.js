var version = "1.0.0";

var myURLcomplete = document.location.href;
var myURL  = myURLcomplete.substring( 0 ,myURLcomplete.lastIndexOf( "?" ) );

// gestion du clic
document.addEventListener("touchstart", clickF, false);

document.addEventListener('readystatechange', ready, false);

function ready() {
	if (document.readyState === "complete") {
		// afficher la langue
		paramsURL = getParameters();
		let obj = document.getElementById("menu-lang-title");
		let maj = (paramsURL.lang).toUpperCase();
		obj.innerHTML = " " + maj;
		// afficher icone
		let objImg = document.getElementById("icone-lang");
		let chemin = pathLangues + "/images/" + maj + ".png";
		console.log(chemin);
		objImg.setAttribute("src", chemin);

	}
}

function selectLangue(pathLangues, langue){
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

function genererHtml() {
	let html='<label for="menu-cb" class="menu-label">';
   		html+='<img class="menu-item-img" id="icone-lang" src=""/>';
    	html+='<span id="menu-lang-title"></span>';
    html+='</label>';
    html+='<input type="checkbox" id="menu-cb" class="menu-cb">';
    html+='<nav class="menu-nav">';
    	html+='<ul>';
    		html+='<li class="menu-item"><a id="sel-lang-fr" href=""><img id="icone-lang-fr" class="menu-item-img" src="./lang/images/FR.png" /> FR</a></li>';
    		html+='<li class="menu-item"><a id="sel-lang-pt" href=""><img id="icone-lang-pt" class="menu-item-img" src="./lang/images/PT.png" /> PT</a></li>';
    		html+='<li class="menu-item"><a id="sel-lang-en" href=""><img id="icone-lang-en" class="menu-item-img" src="./lang/images/EN.png" /> EN</a></li>';
    	html+='</ul>';
    html+='</nav>';

	let obj = document.getElementById("menu-lang");
	obj.innerHTML = html;
	
}

