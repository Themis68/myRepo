var media_events = new Array();
media_events["loadstart"] = 0;
media_events["progress"] = 0;
media_events["suspend"] = 0;
media_events["abort"] = 0;
media_events["error"] = 0;
media_events["emptied"] = 0;
media_events["stalled"] = 0;
media_events["loadedmetadata"] = 0;
media_events["loadeddata"] = 0;
media_events["canplay"] = 0;
media_events["canplaythrough"] = 0;
media_events["playing"] = 0;
media_events["waiting"] = 0;
media_events["seeking"] = 0;
media_events["seeked"] = 0;
media_events["ended"] = 0;
media_events["durationchange"] = 0;
media_events["timeupdate"] = 0;
media_events["play"] = 0;
media_events["pause"] = 0;
media_events["ratechange"] = 0;
media_events["resize"] = 0;
media_events["volumechange"] = 0;

document.addEventListener("DOMContentLoaded", init, false);

function init() {
	document._video = document.getElementById("video");
	init_events("events", media_events);
	setInterval(update_properties, 200);
}

function init_events(id, arrayEventDef) {
	// intercepte tous les évènements pour les renseigner

	var f;
    for (key in arrayEventDef) {
		document._video.addEventListener(key, capture, false);
    }

	var tbody = document.getElementById(id);
	//if(tbody) {
		var i = 1;
		var tr = null;
		for (key in arrayEventDef) {
			if (tr == null) tr = document.createElement("tr");
			var th = document.createElement("th");
			th.textContent = key;
			var td = document.createElement("td");
			td.setAttribute("id", "e_" + key);
			td.textContent = "0";
			td.className = "false";
			tr.appendChild(th);
			tr.appendChild(td);

			if ((i++ % 5) == 0) {
				tbody.appendChild(tr);
				tr = null;
			}
		}
		if (tr != null) tbody.appendChild(tr);
	//}
}

function capture(event) {
	// media_events recense les évènements  et leur état
	// affiche tout ça vie le panneau Media Events
	// event.type est le nom de l'évènement reçu
	// media_events['timeupdate'] est la valeur actuelle
	if ((event.type === 'timeupdate') && (actions.length>0)) {
		// actions
		var seq = Math.round(document._video.currentTime);
		var action = parseInt(actions[0].step);
		if (seq === action) {
			//appel de la fonction de traitement
			mesActions[actions[0].act]();
		}
	}
	// traitement : on augmente de 1
	media_events[event.type]++;
}

function resize() {
    document._video.width = document._video.videoWidth + 10;
    document._video.height = document._video.videoHeight + 10;
}

function getVideo() {
	return document._video;
}

function update_properties() {
    var i = 0;
    for (key in media_events) {
		var e = document.getElementById("e_" + key);
		if (e) {
		    e.textContent = media_events[key];
		    if (media_events[key] > 0) e.className = "true";
		}
    }
}
