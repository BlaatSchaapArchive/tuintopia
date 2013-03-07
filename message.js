/*******************************************************************************

Copyright (c) 2011-2013, André van Schoubroeck (andre@blaatschaap.be)
All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this 
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice, 
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.
  * Neither the name of the BlaatSchaap nor the names of its contributors may
    be used to endorse or promote products derived from this software without 
    specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND 
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED 
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE 
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL 
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR 
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER 
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, 
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE 
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

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
