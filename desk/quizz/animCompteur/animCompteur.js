var version = "1.0.0";


function doNextNum(numero) {
	if (!document.querySelector('[id="innum"] span:nth-of-type(' + (numero) + ')')) {
		// ajoute un objet avec la valeur du nouveau compteur
	  let e;
	  e = document.createElement("span");
	  e.innerHTML = numero + "";
	  document.querySelector('[id="innum"]').appendChild(e);
	  console.log(e);
	}
	document.querySelector('[id="innum"]').style.top = (-(numero - 1) * 3) + "rem";
	document.querySelector('[id="num"]').value = num + "";
}