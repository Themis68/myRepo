
fill(255,0,0);
rect(10,10,100,100);


ctx.beginPath();
ctx.lineWidth="1";
ctx.arc(10, 8, 6, 0, 2 * Math.PI);		// X rayon, Y rayon, rayon, angle de départ, 2*PI pour le cercle complet
ctx.fillStyle = "red";	// couleur de fond
ctx.fill();		// ordre de remplissage
ctx.closePath();

// corps
ctx.beginPath();
ctx.fillStyle = maillotCouleur;
ctx.moveTo(2, 13);
ctx.lineTo(10, 23);
ctx.lineTo(20, 13);
ctx.fill();		// ordre de remplissage

//bras
ctx.fillRect(1, 13, 4, 8);
ctx.fill();		// ordre de remplissage
ctx.fillRect(16, 13, 4, 8);
ctx.fill();		// ordre de remplissage
ctx.closePath();

//short
ctx.beginPath();
ctx.fillStyle = shortCouleur;
ctx.fillRect(5, 23, 12, 8);
ctx.fill();		// ordre de remplissage
ctx.closePath();

//chaussettes
ctx.beginPath();
ctx.fillStyle = chaussettesCouleur;
ctx.fillRect(5, 32, 3, 8);
ctx.fill();		// ordre de remplissage
ctx.fillRect(14, 32, 3, 8);
ctx.fill();		// ordre de remplissage
ctx.closePath();		


