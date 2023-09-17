const PAGE_ACCUEIL = "../indexSP.html";
const LOGO_ASI = "images/svg/asi.svg";
//   MODULE LANGUES
const LANG = true;

function tmp_header(titre) {
    let tmp = `
        <a id="asi_logo" href="${PAGE_ACCUEIL}">
            <object id="asi_logo_img" data="${LOGO_ASI}" type="image/svg+xml"></object>
        </a>
        <span id="asi_title" lab="${titre}"></span>

        <div id="LG_menu-lang" data-menu="${LANG}"></div>
    `;
    return tmp
}