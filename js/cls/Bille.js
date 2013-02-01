function Bille()  
{
	// Element sphere
	this.oSphereDiv = document.getElementById("sphere");
	// Position de la bille
	this.oPosition = new Point(0,0);
	// Vitesse
	this.fVitesseX = 0;
	this.fVitesseY = 0; 
	// Acc�l�ration
	this.fAccelerationX = 0;
	this.fAccelerationY = 0; 
	// Taille
	this.iTaille = 15;
	this.oSphereDiv.style.width = this.iTaille;
	this.oSphereDiv.style.height = this.iTaille;
};

// V�rification des collisions
Bille.prototype.rouler = function()
{
	this.fVitesseY = this.fVitesseY - this.fAccelerationY;
	this.fVitesseX = this.fVitesseX + this.fAccelerationX;
	this.fVitesseY = this.fVitesseY * 0.96;
	this.fVitesseX = this.fVitesseX * 0.96;
	this.oPosition.y = this.oPosition.y + this.fVitesseY / 50;
	this.oPosition.x = this.oPosition.x + this.fVitesseX / 50;
	this.verifierCollisions();
	this.oSphereDiv.style.top = this.oPosition.y + "px";
	this.oSphereDiv.style.left = this.oPosition.x + "px";
};

// V�rification des collisions
Bille.prototype.verifierCollisions = function(){

	for(var i=0; i<oPartie.oTerrain.aListeMurs.length; i++){

		// mur horizontal
		if(oPartie.oTerrain.aListeMurs[i][0].y == oPartie.oTerrain.aListeMurs[i][1].y){
			
			// si la bille est en dessous du mur
			if(this.oPosition.y >= oPartie.oTerrain.aListeMurs[i][0].y
			&& this.oPosition.x >= Math.min(oPartie.oTerrain.aListeMurs[i][0].x, oPartie.oTerrain.aListeMurs[i][1].x) 
			&& this.oPosition.x <= Math.max(oPartie.oTerrain.aListeMurs[i][0].x, oPartie.oTerrain.aListeMurs[i][1].x)){
				// si on s'aper�oit qu'elle a travers� le mur
				if(this.oPosition.y + (this.fVitesseY/50) < oPartie.oTerrain.aListeMurs[i][0].y + oPartie.oTerrain.iTailleMur ){
					this.oPosition.y = oPartie.oTerrain.aListeMurs[i][0].y + oPartie.oTerrain.iTailleMur;
					this.fVitesseY =- this.fVitesseY;
				}
			}
			// si la bille est au-dessus du mur
			if(this.oPosition.y <= oPartie.oTerrain.aListeMurs[i][0].y
			&& this.oPosition.x >= Math.min(oPartie.oTerrain.aListeMurs[i][0].x, oPartie.oTerrain.aListeMurs[i][1].x) 
			&& this.oPosition.x <= Math.max(oPartie.oTerrain.aListeMurs[i][0].x, oPartie.oTerrain.aListeMurs[i][1].x)){
				// si on s'aper�oit qu'elle a travers� le mur
				if(this.oPosition.y + this.iTaille + (this.fVitesseY/50) > oPartie.oTerrain.aListeMurs[i][0].y){
					this.oPosition.y = oPartie.oTerrain.aListeMurs[i][0].y - this.iTaille + 1;
					this.fVitesseY =- this.fVitesseY;
				}
			}
			
			// si la bille est � gauche du mur
			// if(this.oPosition.y <= oPartie.oTerrain.aListeMurs[i][0].y
			// && this.oPosition.x >= Math.min(oPartie.oTerrain.aListeMurs[i][0].x, oPartie.oTerrain.aListeMurs[i][1].x) 
			// && this.oPosition.x <= Math.max(oPartie.oTerrain.aListeMurs[i][0].x, oPartie.oTerrain.aListeMurs[i][1].x)){
				// // si on s'aper�oit qu'elle a travers� le mur
				// if( this.oPosition.y + this.iTaille > oPartie.oTerrain.aListeMurs[i][0].y){
					// this.oPosition.y = oPartie.oTerrain.aListeMurs[i][0].y - this.iTaille;
					// this.fVitesseY =- this.fVitesseY;
				// }
			// }
		}
		
		// // mur vertical
		// if(oPartie.oTerrain.aListeMurs[i][0].y == oPartie.oTerrain.aListeMurs[i][1].y){
			// // si la bille et en dessous du mur
			// if(this.oPosition.y < oPartie.oTerrain.aListeMurs[i][0].y + oPartie.oTerrain.iTailleMur){
				// // si au prochain d�placement de la bille on s'aper�oit qu'elle a travers� le mur
				// if( parseInt(this.oPosition.y + this.fVitesseY / 50) > oPartie.oTerrain.aListeMurs[i][0].y + oPartie.oTerrain.iTailleMur ){
					// this.oPosition.y = oPartie.oTerrain.aListeMurs[i][0].y + oPartie.oTerrain.iTailleMur;
					// this.fVitesseY =- this.fVitesseY;
				// }
			// }
		// }
		
		// {
			// this.oPosition.y = oPartie.oTerrain.aListeMurs[i][0].y;
			// this.fVitesseY =- this.fVitesseY;
		// }
	}
	
	if(this.oPosition.x < 0){
		this.oPosition.x = 0;
		this.fVitesseX =- this.fVitesseX;
	}
	if(this.oPosition.y < 0){
		this.oPosition.y = 0;
		this.fVitesseY =- this.fVitesseY;
	}
	// bord droit
	if(this.oPosition.x + this.iTaille > oPartie.oTerrain.iTerrainWidth){
		this.oPosition.x = oPartie.oTerrain.iTerrainWidth - this.iTaille;
		this.fVitesseX =- this.fVitesseX;		
	}
	// bord bas
	if(this.oPosition.y + this.iTaille > oPartie.oTerrain.iTerrainHeight){
		this.oPosition.y = oPartie.oTerrain.iTerrainHeight - this.iTaille;
		this.fVitesseY =- this.fVitesseY;
	}
};

// M�thode de reset
Bille.prototype.reset = function()
{
};
