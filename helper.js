/*******************************************************************************
  Copyright © 2013 André van Schoubroeck (andre@blaatschaap.be )
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
