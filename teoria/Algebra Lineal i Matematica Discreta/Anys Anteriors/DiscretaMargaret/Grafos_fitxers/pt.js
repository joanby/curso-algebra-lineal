function FDCPClient(){
this.cpHost="unitedonline.cleanprint.net";
this.divid="2412";
this.refid="2361";
this.rt="i;";
this.cpstatus=false;
this.ptstatus="y";
this.printSpecId=0;
this.fdDebug=false;
this.cpc=null;
this.blkwidth=0;
this.xpathLib="";
this.shost="secure-unitedonline.cleanprint.net";
this.hosted="fd";
this.templateTest=false;
this.insType="c";
this.escCom=function(st){
st=new st.constructor(st);
st=st.replace(/:/g,"::");
st=st.replace(/,/g,":,");
return st;
};
this.getSegment=function(){
var wh=window.location.hostname;
var re=new RegExp("[^.]+.[^.]+$");
var _4=wh.search(re);
if(_4>0){
wh=wh.substring(_4);
}
return this.escCom(wh);
};
this.getPFF=function(){
return "0";
};
this.getVR=function(){
return {};
};
this.onPrint=function(){
};
this.getBlockThreshold=function(){
return 500;
};
this.getCfg=function(_5,_6){
if(this.cpc!=null&&typeof this.cpc[_5]!="undefined"){
return this.cpc[_5];
}
return _6;
};
this.getTHost=function(){
if(this.shost.length>0&&document.location.protocol=="https:"){
return this.shost;
}else{
return this.cpHost;
}
};
this.getcpStat=function(){
return this.getCfg("cpStatus",this.cpstatus);
};
this.getptStat=function(){
return this.getCfg("ptStatus",this.ptstatus);
};
this.getDiv=function(){
return this.getCfg("divisionId",this.divid);
};
this.getTmpl=function(){
return this.getCfg("templateId",null);
};
this.getRfmt=function(){
return this.getCfg("templateId",this.refid);
};
this.getTPath=function(){
return this.getCfg("tPath",null);
};
this.getLPath=function(){
return this.getCfg("lPath",null);
};
this.getTO=function(){
return this.getCfg("timeout",10000);
};
this.getTemplateTest=function(){
return this.getCfg("templateTest",this.templateTest);
};
this.getXpathLib=function(){
return this.getCfg("xpathLib",this.xpathLib);
};
this.getFDDebug=function(){
return this.getCfg("fdDebug",this.fdDebug);
};
this.getRType=function(){
return this.rt;
};
this.getIframeUrls=function(){
};
this.cpServletPath=document.location.protocol+"//"+this.getTHost()+"/cp/psj";
}
function FormatDynamicsPT(_7){
this.clnt=_7;
this.pcol=document.location.protocol+"//";
this.cstr=_7.getTHost()+"/pt/t/";
this.dtstr=(new Date()).getTime();
this.div="d="+this.clnt.getDiv();
this.ua="&a="+escape(navigator.appName+" "+navigator.userAgent);
this.seg="&s="+escape(this.clnt.getSegment());
this.ustr="&u="+escape(window.location.href);
this.pf="&p="+this.clnt.getPFF();
this.version="&q=1.1";
this.rtype="&rt="+this.clnt.getRType();
this.qstr=this.div+this.ua+this.seg+this.ustr+this.pf+this.version;
this.turl=this.pcol+this.cstr+this.dtstr+"?"+this.qstr;
this.pthosts="formatdynamics.com,cleanprint.net";
this.isPtCss=function(_8){
var _9=this.pthosts.split(",");
for(var i=0;i<_9.length;i++){
if(_8.indexOf(_9[i])!=-1){
return true;
}
}
return false;
};
this.changePrintStyleSheet=function(){
for(i=0;i<document.styleSheets.length;i++){
try{
var _b=document.styleSheets[i];
var _c=navigator.userAgent.toLowerCase();
if((navigator.appName.indexOf("Netscape")!=-1||_c.indexOf("firefox")!=-1||_c.indexOf("safari")!=-1)&&this.isPtCss(_b.cssRules[0].style.content)){
_b.cssRules[0].style.content="url("+this.turl+");";
return;
}else{
if(this.isPtCss(_b.cssRules[0].style.getPropertyValue("content"))){
if(navigator.appName.indexOf("Opera")!=-1){
_b.deleteRule(0);
}else{
if(navigator.appName.indexOf("Konqueror")==-1){
_b.cssRules[0].style.setProperty("content","url("+this.turl+")",null);
}
}
return;
}
}
}
catch(err){
}
}
try{
var _c=navigator.userAgent.toLowerCase();
if((navigator.appName.indexOf("Netscape")!=-1||_c.indexOf("firefox")!=-1||_c.indexOf("safari")!=-1)){
var s=document.createElement("style");
s.type="text/css";
s.rel="stylesheet";
s.media="print";
s.appendChild(document.createTextNode("body:before {content: url("+this.turl+")};"));
document.getElementsByTagName("head")[0].appendChild(s);
}
}
catch(err){
}
};
this.getFDImage=function(){
if(this.clnt.getRType()=="s"){
var hs=document.documentElement.getElementsByTagName("head");
var h=null;
if(hs&&hs.length>0){
h=hs[0];
var _10=document.createElement("script");
_10.type="text/javascript";
_10.src=this.turl+"&rnd="+Math.random();
}
}else{
var _11=new Image();
_11.src=this.turl;
}
};
}
var formatDynamicsPT;
function loadHandler(){
formatDynamicsPT=new FormatDynamicsPT(new FDCPClient());
if(navigator.appName.indexOf("Microsoft")!=-1&&parseInt(navigator.appVersion)>=4&&navigator.userAgent.indexOf("Windows")!=-1){
window.attachEvent("onbeforeprint",function(){
formatDynamicsPT.getFDImage();
});
}else{
formatDynamicsPT.changePrintStyleSheet();
}
}
if(typeof window.addEventListener!="undefined"){
window.addEventListener("load",loadHandler,false);
}else{
if(typeof window.attachEvent!="undefined"){
window.attachEvent("onload",loadHandler);
}else{
if(window.onload!=null){
var oldOnload=window.onload;
window.onload=function(e){
oldOnload(e);
window[loadHandler]();
};
}else{
window.onload=loadHandler;
}
}
}

