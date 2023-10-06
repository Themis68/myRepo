/**
 * 
 * 
 * 
 *         CLASSE LANGUE 
 * 
 * 
 */


 class LangModule {
    constructor() {
        this.etatMenu = false;	// le menu est masqué par défaut
        this.params = [     // liste toutes les langues disponibles
                {id: "fr", flag:"FR"},
                {id: "pt", flag:"PT"},
                {id: "en", flag:"EN"}
            ];
        this.defaut = this.params[0];	// français par défaut
        this.langUsed = this.defaut.id;	// langue utilisée à l'instant t

        this.codeHtml = "";		// inconnu à ce stade d'instanciation
        this.menu_title = "";
        this.menu_icone = "";

        this.chemin = this.getChemin(); // chemin d'accès au module langue
        this.myURL  = this.getPrefixeURL(); // récupère l'URI appelante

        document.addEventListener('readystatechange', this.ready.bind(this), false);
        window.addEventListener('load', this.load.bind(this), false); 
        document.addEventListener('touchstart', this.clickF.bind(this), false);
    }

    setMenu(etat){
        this.setEtatMenu(etat);
        if (etat === true){
            // on active le menu des langues
            this.load();
        }


    }

    // SETTERS
    setEtatMenu(etat) {
        this.etatMenu = etat;
    }

    // GETTERS
    getEtatMenu() {
        return this.etatMenu;
    }
    getDefaut() {
        return this.defaut;
    }


    //*******************************************************

	getPrefixeURL(){
		let myURI = document.location.href;
		return myURI.substring( 0 , myURI.lastIndexOf( "?" ) );
	}

    ready() {
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

                // on affiche les infos sur la langue utilisée (icone et abbréviation)
                // ajouter le fichier des styles de LANG
                this.declareCSS();
                // on récupère le dictionnaire de la langue par défaut
                this.declareLangue(); 
                break;
            case "complete":        // Fully loaded
                console.log("5 LG");
                 // on affiche la langue utilisée
                let langue = document.getElementById("LG_menu-lang");
                if (langue != undefined){
                    langue.innerHTML = this.genererHtmlLangueUsed();
                } else {
                    alert("ERREUR : vous devez ajouter un élément avec l'id LG_menu-lang");
                }
                // insertion des chaines de caracteres
                this.chaines();
				break;
    
            default:
    
        }
    }

	getChemin(){
		 // récupérer le chemin relatif pour langue dans le script
		 let lg = document.getElementById("LG");	
		 if (lg !== undefined){
		 	let src = lg.getAttribute("src");
		 	return src.substring(0, src.lastIndexOf("/")+1);
		 } else {
			return "";
		 }
	}
    
    // retourne la taille d'un tableau associatif
    //
    // exemple appel : arrayAssoSize(scenario) avec 
    // - scenario un tableau associatif
    //
    arrayAssoSize(arr) {
        let size = 0;
        for (let key in arr) 
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
    arraySearch(arr, valObject) {
        let nbEl = this.arrayAssoSize(arr);
        for (let ind = 0; ind < nbEl; ind++) {
            if (arr[ind].id === valObject) {
                return ind;	// retourne l'indice du tableau
            }
        }
        return -1;	// aucun résultat
    }
    
    // recuperation des paramètres de l'url
    getParameters(){
        let urlParams,
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
    
    getLangue() {	
        // QUELLE LANGUE AFFICHEE
        // récupérer les paramètres dans l'URL
        let paramsUrl = this.getParameters();
    
        // on vérifie si la langue est gérée
        let indice = this.arraySearch(this.params, paramsUrl.lang);
        // il faut mettre à jour le renvoi vers la page suivante
    
        if( indice > -1) {
            // on affiche la langue
            this.setRenvoi(this.params[indice].id);
            return(this.params[indice]);
        } else {
            // on affiche la langue par défaut
            this.setRenvoi(this.defaut.id);		
            return(this.defaut);
        }
    }
    
    // on prépare la transmission de la langue à la page suivante s'il y a un point d'appel
    setRenvoi(lang){
        let renvoi = document.getElementById("renvoi");
        if (renvoi != undefined) {
            const ref = renvoi.getAttribute("href");
            // on vérifie si la langue est déjà présente dans l'URI
            if (ref.indexOf("lang=") == -1){
                renvoi.setAttribute("href", ref +"?lang=" +lang);
            }
        }
    }
    /*
    displayLang() {
        window.menu_title = document.getElementById("LG_menu-title");		// titre de la langue à afficher
        window.menu_icone = document.getElementById("LG_menu-icone");		// drapeau de la langue
    
        // afficher langue
        this.langUsed = this.getLangue().flag;
        window.menu_title.innerHTML = this.getLangue().flag;
        // afficher l'icone
        let cheminIcone = this.chemin + "/images/" +this.getLangue().flag + ".png";
        window.menu_icone.setAttribute("src", cheminIcone);
    }
    */
    // on automatise l'insertion des CSS de LANG dans le HEAD
    declareCSS(){
        // ajout accès au fichier des styles des langues	
        let myCSS = document.createElement("link");
        myCSS.type = "text/css";
        myCSS.rel = "stylesheet";
        myCSS.href = this.chemin + "lang.css" ; 
        document.head.appendChild(myCSS);
    }
    
    // on automatise l'insertion du fichier de la langue sélectionnée/défaut de LANG dans le HEAD
    declareLangue(){
        // ajout accès au fichier des langues	
        let myScript = document.createElement("script");
        myScript.type = "text/javascript";
        myScript.src = this.chemin + "lang_"+ this.getLangue().id + ".js" ; 
        document.head.appendChild(myScript);
    }
    
    clickF (e) {
        if (e.target.id.indexOf("LG_" ) > -1) {

            // on a cliqué sur une élément de LG
            if (e.target.id == "LG_menu-icone" || e.target.id == "LG_menu-title") {
                if (this.etatMenu === true) {
                    let sousmenu = document.getElementById("LG_menu-cb");
                    // sous-menu masqué si checked
                    // sous-menu affiché
                }
            }
    
            // click sur un sous-menu : icone ou texte
            if (e.target.id.indexOf("LG_icone-lang-") > -1 
            || e.target.id.indexOf("LG_span-lang-") > -1){
               // on met à jour l'URL
                this.updateURL(e.target.id);
            }
        }	
    }

    updateURL(langueSelectionnee) {
        let lang = langueSelectionnee.slice(langueSelectionnee.length -2 , langueSelectionnee.length);
        window.location.href = this.myURL + "?lang=" + lang;
    }
    
    // ***************      DICTIONNAIRE
    chaines() {
        // on récupère les éléments qui ont l'attribut "lab"
        let LABs = document.querySelectorAll("span[lab],p[lab],a[lab]")
        LABs.forEach(element => {
            let e = document.getElementById(element.id);
            this.setLibelle(element.id, e.getAttribute("lab"));
        });
    }
    
    setLibelle(id, libelle){
        let obj = document.getElementById(id);
        obj.innerHTML = eval("LG_lang."+libelle);
    }
    // ***************      
    
    
    /*
        génération du code HTML du menu des langues
    */
        
    genererHtmlMenu() {    
        if(this.etatMenu === true) {
                // on active le menu déroulant
        
            let nav = `<nav class="LG_menu-nav">
            <ul class="LG_menu-ul"> 
    
            ${this.params.map(param => `
                <li class="LG_menu-item">
                    <a id="LG_sel-lang-${param.id}" class="LG_menu-label" href="">
                        <img id="LG_icone-lang-${param.id}" class="LG_menu-img" src="${this.chemin}images/${param.flag}.png"/>
                        <span id="LG_span-lang-${param.id}" class="LG_menu-span">${param.flag}</span>
                    </a>
                </li>
            `)}
            </ul>`;
        
            let menu = document.getElementById("LG_menu-lang");
            if (menu != undefined){
                menu.innerHTML = menu.innerHTML + nav;
            }
        
        }
    }

    genererHtmlLangueUsed() {
        // QUELLE LANGUE AFFICHEE
        // récupérer les paramètres dans l'URL
        let paramsUrl = this.getParameters();
        console.log(paramsUrl);
        let langue = "";
        let triangle ="";
        if (paramsUrl.lang !== undefined) {
            langue = paramsUrl.lang;
            let indice = this.arraySearch(this.params, langue);

            if (this.etatMenu === true) {
                triangle = `<img id="LG_triangle" src="${this.chemin}images/triangle_menu.svg"/>`
            }

            return `
            <label for="LG_menu-cb" class="LG_menu-label">
                <img id="LG_menu-icone" class="LG_menu-img" src="${this.chemin}images/${this.params[indice].flag}.png" />
                <span id="LG_menu-title" class="LG_menu-span">${this.params[indice].flag}</span>
                ${triangle}
            </label>
            <input type="checkbox" id="LG_menu-cb" class="LG_menu-cb">
            `;
        } else {
            // il n'y a pas de langue dans l'URL : on vient de lancer la page pour la première fois
            //langue = this.defaut.id;  
            this.updateURL(this.defaut.id);      
        }
       
    }

    getLanguesOfQuizz(tabLangue) {
        let codeHTML = ` 
    
            <div class="langues">
                        ${tabLangue.map(langue => 
                        `<div class="c-${langue}"><img src="${this.chemin}/images/${langue}.png" />
                        </div>`)}
            </div>`;
        return codeHTML;
    }

        // gère l'affichage du menu
    load() {
        console.log("7 LG");
        if (this.etatMenu === true) {
            // génération du code HTML du menu
            this.genererHtmlMenu();
        }
    }

    DOMContentLoaded(){
        console.log("4 LG");
    }
}

// on part du principe que si ce module est appelé par un fichier html c'est qu'il est utilisé
// on instancie donc un élément de la classe
let LG_ = new LangModule(); // on active la gestion des langues