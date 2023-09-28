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
        this.etatModule = false;
        this.params = [
                {id: "fr", flag:"FR"},
                {id: "pt", flag:"PT"},
                {id: "en", flag:"EN"}
            ];
        this.defaut = this.params[0];
        this.langUsed = this.defaut.id;

        this.codeHtml = "";
        this.menu_title = "";
        this.menu_icone = "";
        this.chemin = "";

        this.myURLcomplete = document.location.href;
        this.myURL  = this.myURLcomplete.substring( 0 ,this.myURLcomplete.lastIndexOf( "?" ) );

        document.addEventListener('readystatechange', this.ready.bind(this), false);
        window.addEventListener('load', this.load.bind(this), false); 
        document.addEventListener('touchstart', this.clickF.bind(this), false);
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
                // on regarde s'il y a un appel du module
                window.codeHtml = document.getElementById("LG_menu-lang");	
                if (window.codeHtml != null) {
                    // module activé
                    this.etatModule = true;
                    // récupérer le chemin relatif pour langue dans le script
                    let lg = document.getElementById("LG");	
                    let src = lg.getAttribute("src");
                    window.chemin = src.substring(0, src.lastIndexOf("/")+1);
                    // ajouter le fichier des styles de LANG
                    this.declareCSS(window.chemin);
    
                    // on recharge la langue si on a cliqué sur le menu pour changer de langue
                    let langAfficher = this.getLangue();
                    // insérer le script avec la bonne langue
                    this.declareLangue(window.chemin, langAfficher.id);
                }
                break;
            case "complete":        // Fully loaded
                console.log("5 LG");
                // insertion des chaines de caracteres
                this.chaines();
				break;
    
            default:
    
        }
    }
    
    DOMContentLoaded(){
        console.log("4 LG");
        if (this.etatModule) {
    
        }
    }
    
    load() {
        console.log("7 LG");
        if (this.etatModule) {
            // génération du code HTML
            this.genererHtml(this.params);
    
            // MAJ de la langue à utiliser
            let langAfficher = this.getLangue();
            this.displayLang(langAfficher);
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
    
    displayLang(langue) {
        window.menu_title = document.getElementById("LG_menu-title");		// titre de la langue à afficher
        window.menu_icone = document.getElementById("LG_menu-icone");		// drapeau de la langue
    
        // afficher langue
        this.langUsed = langue.flag;
        window.menu_title.innerHTML = langue.flag;
        // afficher l'icone
        let chemin = window.chemin + "/images/" +langue.flag + ".png";
        window.menu_icone.setAttribute("src", chemin);
    }
    
    // on automatise l'insertion des CSS de LANG dans le HEAD
    declareCSS(cheminLang){
        // ajout accès au fichier des styles des langues	
        let myCSS = document.createElement("link");
        myCSS.type = "text/css";
        myCSS.rel = "stylesheet";
        myCSS.href = cheminLang + "lang.css" ; 
        document.head.appendChild(myCSS);
    }
    
    // on automatise l'insertion du fichier de la langue sélectionnée/défaut de LANG dans le HEAD
    declareLangue(cheminLang, langue){
        // ajout accès au fichier des langues	
        let myScript = document.createElement("script");
        myScript.type = "text/javascript";
        myScript.src = cheminLang + "lang_"+ langue + ".js" ; 
        document.head.appendChild(myScript);
    }
    
    clickF (e) {
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
                window.location.href = this.myURL + "?lang=" + lang;
            }
        }	
    }
    
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
    
    /*
        génération du code HTML du menu des langues
    */
    genererHtml(params) {
        let label = `
        <label for="LG_menu-cb" class="LG_menu-label">
            <img id="LG_menu-icone" class="LG_menu-img" src="" />
            <span id="LG_menu-title" class="LG_menu-span"></span>
        </label>
        <input type="checkbox" id="LG_menu-cb" class="LG_menu-cb">
        `
    
    
        window.codeHtml.innerHTML = label;
    
        if(window.codeHtml.getAttribute("data-menu") == "true") {
            // on active le menu déroulant
    
            let nav = `<nav class="LG_menu-nav">
            <ul class="LG_menu-ul"> 
    
            ${params.map(param => `
                <li class="LG_menu-item">
                    <a id="LG_sel-lang-${param.id}" class="LG_menu-label" href="">
                        <img id="LG_icone-lang-${param.id}" class="LG_menu-img" src="${window.chemin}/images/${param.flag}.png"/>
                        <span id="LG_span-lang-${param.id}" class="LG_menu-span">
                            ${param.flag}
                        </span>
                    </a>
                </li>
            `)}
            </ul>`;
    
            window.codeHtml.innerHTML = window.codeHtml.innerHTML + nav;
    
        }
    }
    
    getLanguesOfQuizz(tabLangue) {
        console.log(tabLangue);
        let codeHTML = ` 
    
            <div class="langues">
                        ${tabLangue.map(langue => 
                        `<div class="c-${langue}"><img src="${window.chemin}/images/${langue}.png" />
                        </div>`)}
            </div>`;
        return codeHTML;
    }
}