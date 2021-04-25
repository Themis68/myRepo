# smartphone

## styles

### aiguillage des styles dès le départ dans le fichier HTML

<link href="./indexD.css" rel="stylesheet" type="text/css" media="screen and (min-width: 321px)" />

<link href="./indexSP.css" rel="stylesheet" type="text/css" media="only screen and (max-width: 320px)" />

### adaptation de la largeur en fonction du device

<meta name="viewport" content="user-scalable=no, width=device-width" />

# icones

## SVG
 intégrer un svg dans le code HTML en ayant accès au fihcier de description

 <object data="./svg/alarm.svg" type="image/svg+xml" id="svgAlarm"></object>

# cache

## Web Pages (HTML)
For the Web Pages (HTML) add the following <meta> tags to the page(s) you want to keep browsers from caching (the code must be in the <head> section of your page, for example right after <title> tag):

<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
<meta http-equiv="Pragma" content="no-cache" />
<meta http-equiv="Expires" content="0" />

## .htaccess (Apache)

<IfModule mod_headers.c>
  Header set Cache-Control "no-cache, no-store, must-revalidate"
  Header set Pragma "no-cache"
  Header set Expires 0
</IfModule>

# barre de navigation

## fixer TOP

la barre ne déroule pas

<div class="fixed-top">