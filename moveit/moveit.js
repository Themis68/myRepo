<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> a7f1919... integration moveit
function load()
{
    // Ne déclarer qu'un seul objet de type DragList
    // IMPORTANT : le nommer 'dragList' et surtout ne pas changer son nom !!!!
    dragList=new DragList();

    // Initialise les gestionnaires d'événement associés à l'instance dragList
    dragList.initDrag()


    // Declaration des objets de type DragObject : toujours passer le nom de l'élt HTML en 1er paramètre
    // On initialise la position de l'élément HTML dragTst en (100,100)
    dragTest=new DragObject('dragTst',100,100)

    // On ajoute le nouvel objet dans la liste pour permettre son drag & drop
    dragList.add(dragTest)

    // Maintenant on peut faire du drag & drop avec les objects contenus dans la liste ;:-)
}

<<<<<<< HEAD
=======
>>>>>>> b7217bf... objets deplacables
=======
>>>>>>> a7f1919... integration moveit
/*
En tout cas ca permet de déplacer n'importe quel élément HTML à la souris en utilisant le drag & drop pour peu que tu positionnes cet élément de manière absolu

Par contre ca dépasse et de loin les 25 lignes ....

Cela dit tu peux optimiser le code et supprimer toute la gestion de la liste si tu ne veux utiliser qu'un seul objet.

Mais trève de discussion voici mon code :

D'abord la librairie javascript : fichier drap.js
*/

// Déclaration object Mouse
// Une seule instance de l'objet Mouse sera crée :
// elle va servir à stocker la position absolue de la souris

function Mouse(){
    this.x=0;
    this.y=0;
}

// Convertit les coordonnées relatives de la souris en coordonnées absolues
function mouse_rel2abs(event_object){
    this.x=document.body.scrollLeft+event_object.clientX;
    this.y=document.body.scrollTop+event_object.clientY;
}

Mouse.prototype.rel2abs=mouse_rel2abs;

// Déclaration objet DragObject
// id : nom d'un objet HTML (normalement le nom d'une balise DIV) que l'on veut
// pouvoir déplacer par drag & drop
// x, y : position initiale de l'objet HTML sur l'écran
// donner une valeur négative (par ex -5000) à x ou y pour masquer l'élément
function DragObject(id, x, y){
    // On récupère la référence de l'objet HTML
    this.ref=(id) ? window.document.getElementById(id): null;

    // Offset par rapport à la position de la souris lorsque
    // le drag commence
    // Distance entre la position de l'élément HTML et la position de la
    // souris en x et en y lorsque l'on presse le bouton gauche et que le souris
    // se trouve au dessus de l'élément HTML
    this.ofsX=0;
    this.ofsY=0;

    // Pour extensions futures : gestionnaires d'événements
    this.onDrag=null
    this.onDrop=null


    // Position du coin gauche de l'élément HTML
    this.y=y || 0;
    this.x=x || 0;

    if (this.ref) this.show()
}

// Fixe l'offset de l'objet drag par rapport à la position de la souris
// passée dans (x,y)
function dragObject_setOffset(x,y){
    this.ofsX=this.ref.offsetLeft-x;
    this.ofsY=this.ref.offsetTop-y;
}

DragObject.prototype.setOffset=dragObject_setOffset

// Fixe la nouvelle position de l'objet drag en (x,y)
function dragObject_setXY(x,y){
    this.x=x+this.ofsX
    this.y=y+this.ofsY
}

DragObject.prototype.setXY=dragObject_setXY

// Applique les coordonnées de l'objet drag à l'élément HTML sous-jaccent
// concrètement déplace l'élt HTML à l'écran
function dragObject_show(){
    this.ref.style.left=this.x+"px"
    this.ref.style.top=this.y+"px"
}

DragObject.prototype.show=dragObject_show

// Pas utilisée
function dragObject_hide(){

}

DragObject.prototype.hide=dragObject_hide;

// Objet DragList qui va permettre de stocker l'ensemble des objets qui vont
// pouvoir être manipuler par drag & drop
function DragList(){
    // Tableau d'objets de type DragObjet
    this.dragObjects=new Array()

    // Indique si une opération de drag&drop est en cours
    this.dragActive=false;

    // Index de l'objet dans le tableau dragObjects sur lequel porte le drag&drop
    this.dragIndex=-1;

    // Référence directe à l'objet de type dragObject sur lequel porte l'opération
    this.dragObject=null;

    // Offset de la souris pour l'objet de type dragObject sur lequel porte l'opération
    this.ofsX=0
    this.ofsY=0
}


// Ajoute un objet de obligatoirement type dragObject dans la liste
function dragList_add(dragObject){
    this.dragObjects[this.dragObjects.length]=dragObject;
}

DragList.prototype.add=dragList_add


// Test si un objet de la liste se trouve aux coordonnées de la souris
function dragList_test(mouseObject){
    this.dragIndex=-1;
    this.dragObject=null;
    this.dragActive=false;
    for (i=0; i < this.dragObjects.length; i++){
dragObject=this.dragObjects[i];

x1=dragObject.ref.offsetLeft;
y1=dragObject.ref.offsetTop;


x2=x1+dragObject.ref.offsetWidth-1;
y2=y1+dragObject.ref.offsetHeight-1;

if (x1 <= mouseObject.x && x2 >= mouseObject.x && y1 <= mouseObject.y && y2 >= mouseObject.y)
{
this.dragIndex=i;
this.ofsX=mouseObject.x;
this.ofsY=mouseObject.y;
break;
}
}
}
DragList.prototype.test=dragList_test

// Arrêt du drag&drop
function dragList_stopDrag()
{
if ((this.dragObject) && (this.dragObject.onDrop)) this.dragObject.onDrop()
this.dragActive=false;
this.dragIndex=-1
this.dragObject=null
}
DragList.prototype.stopDrag=dragList_stopDrag

// Initialise les gestionnaires d'événements
function dragList_initDrag()
{
document.onmousemove=mouse_move;
document.onmousedown=mouse_down;
document.onmouseup=mouse_up;
}
DragList.prototype.initDrag=dragList_initDrag


// La drag revient en fait à recalculer la position de l'objet à chaque fois que la souris
// est déplacée
function dragList_drag(mouseObject)
{
if (this.dragIndex != -1)
{
if (!this.dragObject)
{
this.dragObject=this.dragObjects[this.dragIndex];
this.dragObject.setOffset(this.ofsX,this.ofsY);
}
this.dragObject.setXY(mouseObject.x,mouseObject.y);
this.dragObject.show();
this.dragActive=true;
}
}
DragList.prototype.drag=dragList_drag

var mouse=new Mouse()

// Gestionnaire d'événement qd souris déplacée
function mouse_move(mouse_event)
{
if (document.all) mouse_event=window.event;
    mouse.rel2abs(mouse_event)

    dragList.drag(mouse)
    return false; // Très important !!!
}

// Gestionnaire d'événement qd souris appuyée
function mouse_down(mouse_event){
    if (document.all) mouse_event=window.event;
    mouse.rel2abs(mouse_event)
    dragList.test(mouse);
//return dragActive;
}


// Gestionnaire d'événement qd souris relâchée
function mouse_up(mouse_event){
    dragList.stopDrag()
//return true
}