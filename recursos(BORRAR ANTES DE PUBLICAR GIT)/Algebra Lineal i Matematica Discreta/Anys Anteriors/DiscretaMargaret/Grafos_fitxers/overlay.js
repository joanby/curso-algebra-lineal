var currentDiv = "NONE";

function getPageSize(){

  var pageWd, pageHt;
  if (window.innerHeight && window.scrollMaxY) {
    pageWd = document.body.scrollWidth;
    pageHt = window.innerHeight + window.scrollMaxY;
  }
  else if (document.body.scrollHeight > document.body.offsetHeight) { // all but Explorer Mac
    pageWd = document.body.scrollWidth;
    pageHt = document.body.scrollHeight;
  }
  else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
    pageWd = document.body.offsetWidth;
    pageHt = document.body.offsetHeight;
  }

  var winWd, winHt;
  if (self.innerHeight) { // all except Explorer
    winWd = self.innerWidth;
    winHt = self.innerHeight;
  }
  else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
    winWd = document.documentElement.clientWidth;
    winHt = document.documentElement.clientHeight;
  }
  else if (document.body) { // other Explorers
    winWd = document.body.clientWidth;
    winHt = document.body.clientHeight;
  }

  // for small pages with total height less then height of the viewport
  //if (winHt > pageHt) { pageHt = winHt; }

  // for small pages with total width less then width of the viewport
  //if (winWd > pageWd) { pageWd = winWd; }

  var pageSizeArry = new Array(pageWd, pageHt,winWd,winHt);
  return pageSizeArry;
}

function getElementPosition(elemID) {
  var offsetTrail = document.getElementById(elemID);
  var offsetLeft = 0;
  var offsetTop = 0;
  while (offsetTrail) {
    offsetLeft += offsetTrail.offsetLeft;
    offsetTop += offsetTrail.offsetTop;
    offsetTrail = offsetTrail.offsetParent;
  }
  if (navigator.userAgent.indexOf("Mac") != -1 &&
    typeof document.body.leftMargin != "undefined") {
    offsetLeft += parseInt(document.body.leftMargin);
    offsetTop += parseInt(document.body.topMargin);
  }
  return {left:offsetLeft, top:offsetTop};
}

function MSIEVersion(){

  var appVersion=navigator.appVersion;
  var tokens=appVersion.split(";");

  for(var token=0;token<tokens.length;token++){
     if(tokens[token].indexOf("MSIE ")!=-1){
        return parseInt(tokens[token].split("MSIE ")[1]);        
     }
  }
}

function getPageScroll(){

  var yScroll = 0;
  var xScroll = 0;

  if(MSIEVersion()<6 && document.documentElement){  
      try{
         yScroll = document.documentElement.scrollTop;
         xScroll = document.documentElement.scrollLeft;
      } catch(e){
         yScroll = document.body.scrollTop;
         xScroll = document.body.scrollLeft;
      }
  }
  else if (document.body) {
      // all other Explorers
      yScroll = document.body.scrollTop;
      xScroll = document.body.scrollLeft;
  }

  arrayPageScroll = new Array(xScroll,yScroll); 
  return arrayPageScroll;
}

function positionOverlay() {

  var overlayIdRef= document.getElementById("overlayDiv");
  var dialogIdRef=document.getElementById(currentDiv);

  overlayIdRef.style.width=getPageSize()[0]+ "px";
  overlayIdRef.style.height=getPageSize()[1]+ "px";
  overlayIdRef.style.display="block";
  dialogIdRef.style.display="block";

  PageSizeArr = getPageSize();
  PageScrollArr = getPageScroll();

  var left = (typeof top=="undefined"? (((parseInt((PageSizeArr[2]/2) - (dialogIdRef.offsetWidth/2)))  + PageScrollArr[0]) < PageScrollArr[0] ? PageScrollArr[0] : (parseInt((PageSizeArr[2]/2) - (dialogIdRef.offsetWidth/2)))  + PageScrollArr[0]) : dialogIdRef.offsetLeft);

  dialogIdRef.style.left= left + "px";

  dialogIdRef.style.top= (((parseInt((PageSizeArr[3]/2) - (dialogIdRef.offsetHeight/2))) + PageScrollArr[1]) < PageScrollArr[1] ? PageScrollArr[1] : (parseInt((PageSizeArr[3]/2) - (dialogIdRef.offsetHeight/2))) + PageScrollArr[1]) + "px";

  dialogIdRef.style.visibility="visible";

}


function addScrollEvent(){

  if(MSIEVersion()>=5) {
    if(typeof window.addEventListener!="undefined"){
      window.addEventListener("scroll",positionOverlay,false);
    } else if(typeof window.attachEvent!="undefined"){
      window.attachEvent("onscroll",positionOverlay);
    }
  }
}

function removeScrollEvent(){

  if(MSIEVersion()>=5) {
    if(typeof window.addEventListener!="undefined"){
	window.removeEventListener("scroll",positionOverlay,false);
    } else if(typeof window.attachEvent!="undefined"){
	window.detachEvent("onscroll",positionOverlay);
    }
  }
}


function toggleDropdowns(showBoolean) {

/* for (var i=0; i<document.forms.length; i++) {
    for (var j=0; j<document.forms[i].elements.length; j++) {
      if (document.forms[i].elements[j].type.indexOf("select")!=-1) {
        document.forms[i].elements[j].style.visibility = showBoolean;
      }
    }
  }*/
  document.body.focus();
  selects = document.getElementsByTagName('select');
  for(i = 0; i < selects.length; i++) {
    selects[i].style.visibility = showBoolean;
  }
}

function showOverlay(overlayDivId, fromLeft, fromTop, overlayCallerId) {
  document.getElementById(overlayDivId).style.opacity = " 0.99999 ";

  toggleDropdowns('hidden');
  currentDiv = overlayDivId;
  if (!document.getElementById("overlayDiv")) {
    var overDiv = document.createElement("div");
    overDiv.style.position = "absolute";
    overDiv.style.top = "0px";
    overDiv.style.left = "0px";
    overDiv.style.width = getPageSize()[0] + "px";
    overDiv.style.height = getPageSize()[1] + "px";
    overDiv.style.background = "#000000";
    overDiv.style.opacity = "0.25";
    overDiv.style.zIndex  = "100000";
    overDiv.style.filter = "alpha(opacity=25)";
    overDiv.style.display = "none";
    document.getElementsByTagName("body").item(0).appendChild(overDiv);
    overDiv.setAttribute("id", "overlayDiv");
  }
  document.getElementById("overlayDiv").style.display = "block";
  document.getElementById(overlayDivId).style.display = "block";
  document.getElementById(overlayDivId).style.zIndex = 1000000;
  document.getElementById(overlayDivId).style.position = "absolute";
  if (overlayCallerId != null) {
    leftPos = getElementPosition(overlayCallerId).left + fromLeft;
    topPos  = getElementPosition(overlayCallerId).top  + fromTop;
    document.getElementById(overlayDivId).style.left = leftPos;
    document.getElementById(overlayDivId).style.top = topPos;
  }

  positionOverlay();
  addScrollEvent();
  
}

function hideOverlay() {

  toggleDropdowns('visible');

  if (currentDiv) { document.getElementById(currentDiv).style.display = "none"; }
  document.getElementById("overlayDiv").style.display = "none";

  removeScrollEvent();
}
