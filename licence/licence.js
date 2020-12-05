// chemins
var pathImagesScenario = "../images/";		// images pour scénario
var pathImages = "../images/";		// autres images
var pathVideos = "../videos/";		// vidéos des matchs
var pathFanions = "../images/fanions/";		// fanions des equipes

document.addEventListener("DOMContentLoaded", init, false);	// lance l'écoute des évènements et appelle INIT

function init() {
    //
    // est appelé en premier par la page lors du chargement
	//

    footer();
    header();
}


