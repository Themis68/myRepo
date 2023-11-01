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
            {id: "en", flag:"EN"},
            {id: "pt", flag:"PT"}
            ];
        const [defaut] = this.params;
        this.defaut = defaut;
            //this.defaut = this.params[0];	// français par défaut
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

    setEtatMenu(etat) {
        this.etatMenu = etat;
    }

    getEtatMenu() {
        return this.etatMenu;
    }
    getDefaut() {
        return this.defaut;
    }


    //*******************************************************
    getPrefixeURL() {
        let myURL = new URL(document.location.href);
        return myURL.origin + myURL.pathname;
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
                //document.addEventListener("DOMContentLoaded", DOMContentLoaded, false);	
                document.addEventListener("DOMContentLoaded", () => this.DOMContentLoaded(), false);	
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
                const langue = document.getElementById("LG_menu-lang");
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

    getChemin() {
        // récupérer le chemin relatif pour langue dans le script
        // usage de chaining operator (?) et de nullish coalescing operator (??)
        let src = document.getElementById("LG")?.getAttribute("src");
        return src?.substring(0, src.lastIndexOf("/")+1) ?? "";
    }

    arrayAssoSize(arr) {
        // retourne la taille d'un tableau associatif
        //
        // exemple appel : arrayAssoSize(scenario) avec 
        // - scenario un tableau associatif
        return Object.keys(arr).length;
    }

    arraySearch(arr, valObject) {
        return arr.findIndex(item => item.id === valObject);
    }
    
    getParameters() {
        // recuperation des paramètres de l'url
        let urlParams = new URLSearchParams(window.location.search);
        let params = {};
        for(let param of urlParams) {
            params[param[0]] = decodeURIComponent(param[1]);
        }
        return params;
    }
    
    getLangue() {	
        // QUELLE LANGUE AFFICHEE
        // récupérer les paramètres dans l'URL
        const paramsUrl = this.getParameters();
    
        // on vérifie si la langue est gérée
        //let indice = this.arraySearch(this.params, paramsUrl.lang);
        const foundParam = this.params.find(param => param.id === paramsUrl.lang);
        
        // il faut mettre à jour le renvoi vers la page suivante
        if( foundParam) {
            // on affiche la langue
            this.setRenvoi(foundParam.id);
            return(foundParam);
        } else {
            // on affiche la langue par défaut
            this.setRenvoi(this.defaut.id);		
            return(this.defaut);
        }
    }
    
    setRenvoi(lang){
        // on prépare la transmission de la langue à la page suivante s'il y a un point d'appel
        let renvoi = document.getElementById("renvoi");
        if (renvoi) {
            const ref = renvoi.getAttribute("href");
            // on vérifie si la langue est déjà présente dans l'URI
            if (!ref.includes("lang=")){
                renvoi.setAttribute("href", `${ref}?lang=${lang}`);
            }
        }
    }

    declareCSS(){
        // on automatise l'insertion des CSS de LANG dans le HEAD
        // ajout accès au fichier des styles des langues	
        let myCSS = document.createElement("link");
        myCSS.type = "text/css";
        myCSS.rel = "stylesheet";
        myCSS.href = this.chemin + "lang.css" ; 
        document.head.appendChild(myCSS);

        /*document.head.appendChild(
        document.createElement("link")
            .setAttribute("type", "text/css")
            .setAttribute("rel", "stylesheet")
            .setAttribute("href", `${this.chemin}lang.css`)
    );
    la gestion des setAttributes écrits sur plusieurs lignes n'est pas reconnu
    */
    }
    
    declareLangue(){
        // on automatise l'insertion du fichier de la langue sélectionnée/défaut de LANG dans le HEAD
        // ajout accès au fichier des langues	
        let myScript = document.createElement("script");
        myScript.type = "text/javascript";
        myScript.src = `${this.chemin}lang_${this.getLangue().id}.js`;
        document.head.appendChild(myScript);
    }
    
    clickF (e) {
        if (!e.target.id.startsWith("LG_")) return;

        if (["LG_menu-icone", "LG_menu-title"].includes(e.target.id) && this.etatMenu) {
            // on a cliqué sur une élément de LG
           // let sousmenu = document.getElementById("LG_menu-cb");
           // sous-menu masqué si checked
        // sous-menu affiché
        }
    
        // click sur un sous-menu : icone ou texte
        if (e.target.id.startsWith("LG_icone-lang-") || e.target.id.startsWith("LG_span-lang-")) {
            // on met à jour l'URL
            this.updateURL(e.target.id);
        }
    }

    updateURL(langueSelectionnee) {
        /*let lang = langueSelectionnee.slice(langueSelectionnee.length -2 , langueSelectionnee.length);
        window.location.href = this.myURL + "?lang=" + lang;*/
                let lang = langueSelectionnee.slice(-2);
        window.location.href = `${this.myURL}?lang=${lang}`;
    }
    
    // ***************      DICTIONNAIRE
    chaines() {
        // on récupère les éléments qui ont l'attribut "lab"
        let LABs = document.querySelectorAll("span[lab],p[lab],a[lab]")
        LABs.forEach(element => {
            this.setLibelle(element.id, element.getAttribute("lab"));
        });
    }
    
    setLibelle(id, libelle){
        let obj = document.getElementById(id);
        //obj.innerHTML = eval("LG_lang."+libelle);
        if (LG_lang && LG_lang.hasOwnProperty(libelle)) {
            obj.innerHTML = LG_lang[libelle];
        }
    }
    // ***************      
    
    
    /*
        génération du code HTML du menu des langues
    */
        
    genererHtmlMenu() {    
        if (this.etatMenu) {
            const navItems = this.params.map(param => `
                <li class="LG_menu-item">
                    <a id="LG_sel-lang-${param.id}" class="LG_menu-label" href="">
                        <img id="LG_icone-lang-${param.id}" class="LG_menu-img" src="${this.chemin}images/${param.flag}.png"/>
                        <span id="LG_span-lang-${param.id}" class="LG_menu-span">${param.flag}</span>
                    </a>
                </li>
            `).join('');
    
            const nav = `
                <nav class="LG_menu-nav">
                    <ul class="LG_menu-ul">${navItems}</ul>
                </nav>
            `;
    
            const menu = document.getElementById("LG_menu-lang");
            if (menu) {
                menu.innerHTML += nav;
            }
        }
    }

    genererHtmlLangueUsed() {
        // QUELLE LANGUE AFFICHEE
        // récupérer les paramètres dans l'URL
        const paramsUrl = this.getParameters();
        const foundParam = paramsUrl.lang ? this.params.find(param => param.id === paramsUrl.lang) : this.defaut;

        if (!paramsUrl.lang) {
            // il n'y a pas de langue dans l'URL : on vient de lancer la page pour la première fois
            //langue = this.defaut.id;  
            this.updateURL(this.defaut.id); 
        }

        const triangle = this.etatMenu ? `<img id="LG_triangle" src="${this.chemin}images/triangle_menu.svg"/>` : '';
       
        return `
            <label for="LG_menu-cb" class="LG_menu-label">
                <img id="LG_menu-icone" class="LG_menu-img" src="${this.chemin}images/${foundParam.flag}.png" />
                <span id="LG_menu-title" class="LG_menu-span">${foundParam.flag}</span>
                ${triangle}
            </label>
            <input type="checkbox" id="LG_menu-cb" class="LG_menu-cb">
            `;       
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