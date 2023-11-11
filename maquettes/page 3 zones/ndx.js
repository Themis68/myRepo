// écouteurs
document.addEventListener('readystatechange', ready, false);

// on choisi d'afficher ou amsquer le menu des langues
// on aura dinc la langue par défaut
const afficherMenuLangue = true;
LG_.setMenu(afficherMenuLangue);


function ready() {
    // recupérer infos taille viewport
    let matriceDevice = getViewportSize();
    switch(document.readyState) {
        case "uninitialized":   // Has not started loading
            // apparait en cas de ralentissement
            console.log("1 HTML");   // ne passe aps à cet étape
            break;
        case "loading":         // Is loading
            // apparait en cas de ralentissement
            console.log("2 HTML");   // ne passe aps à cet étape
            /*
            L'évènement DOMContentLoaded est déclenché quand le document HTML initial est complètement chargé et analysé, 
            sans attendre la fin du chargement des feuilles de styles, images et sous-document.
            */
            document.addEventListener("DOMContentLoaded", DOMContentLoaded, false);	
            break;
        case "loaded":          // Has been loaded
            console.log("3 HTML");   // ne passe pas à cet étape
            break;
        case "interactive":     // Has loaded enough to interact with
            console.log("4 HTML");
            // on voit déjà les objets en dur dans la page
            // HEADER
            const myTemplate = new Template();
            const myHeader =  document.getElementById('tmp_header');
            // afficher/masquer le menu des Langues ?
            myHeader.innerHTML = myTemplate.header("LAB_A006", afficherMenuLangue);
            break;
        case "complete":        // Fully loaded
            console.log("5 HTML");

            break;
        default:

    }
}



function DOMContentLoaded(){
    // ne passe pas à cette étape
    console.log("DOMContentLoaded");
}

/*
window.addEventListener('load', (event) => {
    let header = document.getElementsByTagName("footer")[0];
    let headerHeight = header.getBoundingClientRect().height;
    //let useHeight = window.innerHeight - headerHeight - footerHeight;
    header.style.maxHeight = headerHeight + "px";
});
*/