class Template {
    constructor(PAGE_ACCUEIL, LOGO_ASI) {
        this.PAGE_ACCUEIL = "y22/indexSP.html";
        this.LOGO_ASI = "../imagesNew/svg/asi.svg";
    }
    
    header(titre, afficherMenuLang) {
        this.titre = titre;
        this.afficherMenuLang = afficherMenuLang;

        return `
        <a id="asi_logo" href="${this.PAGE_ACCUEIL}">
            <object id="asi_logo_img" data="${this.LOGO_ASI}" type="image/svg+xml"></object>
        </a>
        <span id="asi_title" lab="${this.titre}"></span>

        <div id="LG_menu-lang" data-menu="${this.afficherMenuLang}"></div>
         `;
    }

    footer(titre, afficherMenuLang) {
        this.titre = titre;
        this.afficherMenuLang = afficherMenuLang;

        return `
        <span id="asi_title1" lab="${this.titre}"></span>
         `;
    }
}
