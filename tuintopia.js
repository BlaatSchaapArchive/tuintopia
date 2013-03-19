/*******************************************************************************
  Copyright © 2013 André van Schoubroeck (andre@blaatschaap.be )
*******************************************************************************/
//------------------------------------------------------------------------------
var _width=0;
var _height=0;
var Selected;
//------------------------------------------------------------------------------
function SetLegendItemSize(size){
  try{
    var legenditem = getStyleSheetRule(".legenditem");
    legenditem.style.setProperty('width', size+"px", '');
  } catch(e) {
    alert(e);
  }
}
//------------------------------------------------------------------------------
function setCardSize(width, height){
  try {
    var card = getStyleSheetRule(".card");
    card.style.setProperty('width', width+"px", '');
    card.style.setProperty('height', height+"px", '');

    var card = getStyleSheetRule(".selected");
    card.style.setProperty('width', width+"px", '');
    card.style.setProperty('height', height+"px", '');
    _width=width;
    _height=height;


/*
    var details = getStyleSheetRule(".details");
    details.style.setProperty('width', width+"px", '');
    details.style.setProperty('height', height+"px", '');

    var legend = getStyleSheetRule(".legend");
    legend.style.setProperty('width', width+"px", '');
    legend.style.setProperty('height', height+"px", '');
*/

  } catch(e) {
    alert(e);
  }
}
//------------------------------------------------------------------------------
function setLogoSize(width, height){
  try {
    var logo = getStyleSheetRule("#logo");
    logo.style.setProperty('width', width+"px", '');
    logo.style.setProperty('height', height+"px", '');


  } catch (e) {
    alert(e);
  }
}
//------------------------------------------------------------------------------
function setIconSize(size){
  try {
    var iconsize = getStyleSheetRule(".legend img");
    iconsize.style.setProperty('width', size+"px", '');
    iconsize.style.setProperty('height', size+"px", '');
  } catch (e) {
    alert(e);
  }
}
//------------------------------------------------------------------------------
function setLegendFontSize(size){
  try {
    var legend = getStyleSheetRule(".legend");
    legend.style.setProperty("font-size", size+"px",'');
  } catch(e) {
    alert(e);
  }
}
//------------------------------------------------------------------------------
function setTotalScoreFontSize(size){
  try {
    var toh = getStyleSheetRule("#toh");
    toh.style.setProperty("font-size", size+"px",'');
  } catch(e) {
    alert(e);
  }
}
//------------------------------------------------------------------------------
function setTurnScoreFontSize(size){
  try {
    var tuh = getStyleSheetRule("#tuh");
    tuh.style.setProperty("font-size", size+"px",'');
  } catch(e) {
    alert(e);
  }
}

//------------------------------------------------------------------------------
function setFillerSize(size){
  try {
    var fillersize = getStyleSheetRule(".filler");
    fillersize.style.setProperty('height', size+"px", '');
  } catch (e) {
    alert(e);
  }
}
//------------------------------------------------------------------------------
function resize(){
  try{
    var aheight = (window.innerHeight / 3) -30;
    var awidth  = window.innerWidth / 10;
    var cheight = awidth  / 0.66;
    var cwidth  = aheight * 0.66;

    var fheight;
    var fwidth;
    var ficon;
    var ffiller;

    if (aheight<cheight) {
      fwidth=Math.floor(cwidth);
      fheight=Math.floor(aheight);
    } else {
      fwidth=Math.floor(awidth);
      fheight=Math.floor(cheight);

    }
    ficon=Math.floor(fheight/6);        
    setCardSize(fwidth,fheight);
    var logoheight=Math.floor(fheight/2.5);
    var logowidth=Math.floor(2.77*logoheight);
    setLogoSize(logowidth,logoheight);
    setIconSize(ficon);
    SetLegendItemSize(fwidth-ficon)
    setLegendFontSize(Math.floor(ficon/3));

    setTotalScoreFontSize(ficon);
    setTurnScoreFontSize(Math.floor(ficon/2));

    ffiller = Math.floor((window.innerHeight - ( 3 * fheight ) - 83 ) / 2) ;
    setFillerSize(ffiller);


  } catch (e) {
    alert(e);
  }
}
//------------------------------------------------------------------------------
function SetHandCard(card,image){
  try{
    document.getElementById("hand"+card).innerHTML ="<img  src=cards/named/set/"+image+".jpg>";
  } catch(e) {
    alert(e);
  }
}
//------------------------------------------------------------------------------
function SetFieldCard(card,image){
  try{
    document.getElementById("card"+card).innerHTML ="<img  src=cards/named/set/"+image+".jpg>";

  } catch(e) {
    alert(e);
  }
}
//------------------------------------------------------------------------------
function SetTotalScore(totalscore){
  try{
    document.getElementById('totalscore').innerHTML = totalscore;
  } catch(e) {
    alert(e);
  }
}
//------------------------------------------------------------------------------
function SetTurnScore(turnscore){
  try{
    document.getElementById('turnscore').innerHTML = turnscore;
  } catch(e) {
    alert(e);
  }
}
//------------------------------------------------------------------------------
function SetKindScore(kind,score){
  try{
    document.getElementById(kind).innerHTML = score;
  } catch(e) {
    alert(e);
  }
}
//------------------------------------------------------------------------------
function GetGame(params){

  var http = new XMLHttpRequest();
  var url = "http://www.tuintopia.nl/demo/game.php"

  http.open("GET", url+"?"+params, true);
  http.onreadystatechange = function() {//Call a function when the state changes.
    if(http.readyState == 4 && http.status == 200) {

      var xmldoc = http.responseXML;

      var error = xmldoc.getElementsByTagName("error");
      if (error[0]) ShowMessage("Fout",getXMLcontent(error[0]),"HideMessage()");//alert (getXMLcontent(error[0])); 

      var card1 = getXMLcontent(xmldoc.getElementsByTagName("hand")[0].getElementsByTagName("card1")[0]);
      var card2 = getXMLcontent(xmldoc.getElementsByTagName("hand")[0].getElementsByTagName("card2")[0]);
      var card3 = getXMLcontent(xmldoc.getElementsByTagName("hand")[0].getElementsByTagName("card3")[0]);
      var card4 = getXMLcontent(xmldoc.getElementsByTagName("hand")[0].getElementsByTagName("card4")[0]);


      SetHandCard(1,card1);
      SetHandCard(2,card2);
      SetHandCard(3,card3);
      SetHandCard(4,card4);

      var i;
      for (i=1; i<17; i++) { 
        var card=getXMLcontent(xmldoc.getElementsByTagName("field")[0].getElementsByTagName("card"+i)[0]);
        SetFieldCard(i,card);
      }
      
      var turnscore=getXMLcontent(xmldoc.getElementsByTagName("score")[0].getElementsByTagName("turn")[0]);
      var totalscore=getXMLcontent(xmldoc.getElementsByTagName("score")[0].getElementsByTagName("total")[0]);
      SetTotalScore(totalscore);
      SetTurnScore(turnscore);


      SetKindScore("voedsel",getXMLcontent(xmldoc.getElementsByTagName("score")[0].getElementsByTagName("voedsel")[0]));
      SetKindScore("water",getXMLcontent(xmldoc.getElementsByTagName("score")[0].getElementsByTagName("water")[0]));
      SetKindScore("mest",getXMLcontent(xmldoc.getElementsByTagName("score")[0].getElementsByTagName("mest")[0]));
      SetKindScore("plantenresten",getXMLcontent(xmldoc.getElementsByTagName("score")[0].getElementsByTagName("plantenresten")[0]));
      SetKindScore("nectar",getXMLcontent(xmldoc.getElementsByTagName("score")[0].getElementsByTagName("nectar")[0]));
      SetKindScore("bevruchting",getXMLcontent(xmldoc.getElementsByTagName("score")[0].getElementsByTagName("bevruchting")[0]));
      SetKindScore("stro",getXMLcontent(xmldoc.getElementsByTagName("score")[0].getElementsByTagName("stro")[0]));
      SetKindScore("afvalwater",getXMLcontent(xmldoc.getElementsByTagName("score")[0].getElementsByTagName("afvalwater")[0]));
      SetKindScore("plaagbestrijders",getXMLcontent(xmldoc.getElementsByTagName("score")[0].getElementsByTagName("plaagbestrijders")[0]));
      SetKindScore("stroom",getXMLcontent(xmldoc.getElementsByTagName("score")[0].getElementsByTagName("stroom")[0]));
      SetKindScore("afdak",getXMLcontent(xmldoc.getElementsByTagName("score")[0].getElementsByTagName("afdak")[0]));




   }
 }
 http.send();
}
//------------------------------------------------------------------------------
function SelectCard(card){
  try{
    var i;
    for (i=1; i<5; i++) {
      document.getElementById("hand"+i).className = "card"; 
    }
    Selected=card;
    document.getElementById("hand"+card).className = "selected";
  } catch(e) {
    alert(e);
  }
}
//------------------------------------------------------------------------------
function SelectCardDrag(card){
  try{
    var i;
    for (i=1; i<5; i++) {
      document.getElementById("hand"+i).className = "card";
    }
    Selected=card;
    document.getElementById("hand"+card).className = "selected";
    document.onmousemove=DragCard;
    document.onmouseup=DragCardDone;
    //document.body.focus();
    
    document.getElementById("drag").innerHTML=document.getElementById("hand"+card).innerHTML;
    document.getElementById("hand"+card).ondragstart = function() { return false; };

    // Fix Chrome Drag and Drop support
    try{
      event.preventDefault();
    } catch(e) {
    }
    
  } catch(e) {
    alert(e);
  }
}

function GetCardAtPos(x,y){
  try {
    var i;
    for (i=1; i<17;i++){
      var left   = document.getElementById("card"+i).offsetLeft;
      var right  = left+_width;
      var top    = document.getElementById("card"+i).offsetTop;
      var bottom = top+_height;
  
      if ( (x>left) && (x<right) && (y>top) && (y<bottom) ) return i;
    }
    return 0;
  } catch(e){
    alert(e);
  }
}  
//------------------------------------------------------------------------------
function GetHandAtPos(x,y){
  try{
    var i;
    for (i=1; i<5;i++){
      var left   = document.getElementById("hand"+i).offsetLeft;
      var right  = left+_width;
      var top    = document.getElementById("hand"+i).offsetTop;
      var bottom = top+_height;

      if ( (x>left) && (x<right) && (y>top) && (y<bottom) ) return i;
    }
    return 0;
  } catch(e){
    alert(e);
  }
}
//------------------------------------------------------------------------------
function IsHouseAtPos(x,y){
  try{
    var i;
    for (i=1; i<3;i++){
      var left   = document.getElementById("house"+i).offsetLeft;
      var right  = left+_width;
      var top    = document.getElementById("house"+i).offsetTop;
      var bottom = top+_height;
  
      if ( (x>left) && (x<right) && (y>top) && (y<bottom) ) return true;
    }

    return false;
  } catch(e){
    alert(e);
  }
}
//------------------------------------------------------------------------------
function DragCard(event){
  try{
    if(Selected) {
      var drag = document.getElementById("drag");
      drag.style.display="block";
      drag.style.left=""+(event.pageX - Math.floor(_width/2))+"px";
      drag.style.top =""+(event.pageY - Math.floor(_height/2))+"px";
      drag.style.cursor="hand";
    }
  } catch(e){
    alert(e);
  }
}
//------------------------------------------------------------------------------
function DragCardDone(event){
  try{
    var card=GetCardAtPos(event.pageX,event.pageY);
    var hand=GetHandAtPos(event.pageX,event.pageY);
    if (card) {
      PlayCard(card);
    } else if(hand!=Selected) {
      var i;
      for (i=1; i<5; i++) {
        document.getElementById("hand"+i).className = "card";
      }
    }
    if (IsHouseAtPos(event.pageX,event.pageY)) {
      ShowMessage("Fout","Je kan geen kaart op het huis plaatsen!","HideMessage()");
    }
    document.onmousemove=null;
    document.getElementById("drag").style.display="none";
  } catch(e){
    alert(e);
  }
}
//-----------------------------------------------------------------------------
function DropCard(card){
  try{
    if(Selected!=card) {
      document.getElementById("hand"+Selected).className = "card";
    }
  } catch(e) {
    alert(e)
  }
}

//------------------------------------------------------------------------------
function PlayCard(card){
  try{
    if (Selected > 0) {
      //document.getElementById("card"+card).innerHTML=document.getElementById("hand"+Selected).innerHTML;
      //document.getElementById("hand"+Selected).innerHTML="";
      GetGame("action=playcard&card="+card+"&hand="+Selected);
      Selected=0;
      for (i=1; i<5; i++) {
        document.getElementById("hand"+i).className = "card"; 
      }
    } else {
      //No card Selected!
    }
  } catch(e) {
    alert(e);
  }
}

//------------------------------------------------------------------------------

function ShowGameRules(){
  var spelregels = "\
Het doel van het spel is om zoveel mogelijk verbindingen te maken.<br>\
Iedere verbinding levert één punt op.<br>\
Leg kaarten uit je hand neer in het speelveld, aansluitend aan de  <br>\
bestaande kaarten. Dit doe je door op een kaart te klikken in je hand en <br>\
vervolgens op een leeg veld in het speelveld. <br>\
<br>\
Er onstaat een verbinding wanneer de nieuwe kaart iets nodig heeft wat de <br>\
aanliggende kaarten leveren of andersom; als de nieuwe kaart iets levert  <br>\
wat de aanliggende kaarten nodig hebben. <br>\
 <br>\
Op de pijl naar links aan de rechterkant van een kaart staat met iconen aangegeven  <br>\
wat de kaart nodig heeft. Op de pijl naar rechts staat wat de kaart levert. <br>\
 <br>\
Rechtsonderaan in het beeld staat de betekenis van de iconen en wordt  <br>\
bijgehouden uit wat voor verbindingen je score is opgebouwd. <br>\
 <br>\
De 2 kaarten van het huis tellen als 1 kaart. <br>\
 <br>\
Verbindingen kunnen worden gemaakt met kaarten die zowel recht naast of  <br>\
boven elkaar liggen, als schuin van elkaar liggen. <br>\
 <br>\
De iconen kunnen vaker gebruikt worden en dus niet opraken. <br>\
<br>\
Veel plezier!";



  ShowMessage("Speluitleg",spelregels,"HideMessage()");
}
//------------------------------------------------------------------------------


resize();
window.onresize=resize;
GetGame();
