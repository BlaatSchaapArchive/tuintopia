/*******************************************************************************
  Copyright © 2011-2013 André van Schoubroeck (andre@blaatschaap.be )
*******************************************************************************/

function ShowMessage(title,mess,onAccept,onCancel){
	//try {
		document.getElementById("overlay").style.visibility = "visible";
		document.getElementById("overlay").style.display = "block";
		document.getElementById("overlay").innerHTML= "<div class=label>" + title + "</div><div>"+mess+"</div><div id=overlaybuttons class=element></div>";
				
		if (onAccept) {
			document.getElementById("overlaybuttons").innerHTML += "<div class=menuitem onClick="+onAccept+">Ok</div>";
		}

		if (onCancel) {
			document.getElementById("overlaybuttons").innerHTML += "<div class=menuitem onClick="+onCancel+">Annuleren</div>";
		}
	//} catch (e) {
	//	alert("Error while attempting to display message\n"+title+"\n"+mess+"\n"+onAccept+"\n"+onCancel+"\n"+e);
	//}
}

function HideMessage(){
	document.getElementById("overlay").style.visibility = "hidden";
	document.getElementById("overlay").style.display = "none";
	document.getElementById("overlay").innerHTML="";
}

function MessageVisible(){
	return document.getElementById("overlay").style.visibility == "visible"
}
