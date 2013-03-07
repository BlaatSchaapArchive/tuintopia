/*******************************************************************************

Copyright (c) 2013, André van Schoubroeck (andre@blaatschaap.be)
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

//------------------------------------------------------------------------------
function getStyleSheetRule(ruleName){
  try {
    if (document.styleSheets) {               // Test stylesheet support                        
      for (var i=0; i<document.styleSheets.length; i++) {  
        var styleSheet=document.styleSheets[i];            
        var j=0;                                           
        var cssRule=false;                                 
        do {  
          if (styleSheet.cssRules) {          // Test cssRules support
            cssRule = styleSheet.cssRules[j]; // Standard JavaScript
          } else if (styleSheet.rules) {      // Test rules support
            cssRule = styleSheet.rules[j];    // Microsoft JScript
          } else {                            // Unknown dialect?
            // throw something?
          }
          if (cssRule.selectorText==ruleName) return cssRule;  
          j++;
        } while (cssRule)
      }
    } else { // Browser doesn't support styleSheets?
      // throw something?
    }
  } catch(e) {
    alert(e);
  }
}
//------------------------------------------------------------------------------
function getXMLcontent(xmlElement){
  try{
    if (xmlElement.textContent) {
      return xmlElement.textContent;          // Standard JavaScript
    }
    else if (xmlElement.text) {
      return xmlElement.text;                 // Microsoft JScript
    } else {                                  // Unknown dialect?
      // throw something?
    }
  } catch(e) {
    alert(e);
  }
}
//------------------------------------------------------------------------------
