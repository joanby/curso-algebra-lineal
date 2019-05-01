
function do_set_homepage(user_action){

  hideOverlay();

  var oToday = new Date();
  if (user_action.match(/do/)) {
    var visit = "11/"+oToday.getTime()+"/"+user_action;
    if(window.setCookie){ window.setCookie("_visited", visit, 365); }
    if (user_action.match(/do$/)) {
      document.getElementById('mws_oHomePageOverlay').setHomePage(window.location.href);
    }
  }
}

function set_homepage_overlay(){

  var visited;
  var oToday = new Date();
  var init_visit = "1/"+oToday.getTime()+"/init";
  var count = 1;

  if ( document.getElementById('mws_oHomePageOverlay').isHomePage(window.location.href) ) {
    // already user's homepage
    visited = "11/"+oToday.getTime()+"/did";
    if(window.setCookie){ window.setCookie("_visited", visited, 365); }
    return;
  }

  if(window.getCookie) { visited = window.getCookie("_visited") || init_visit; } else { visited = init_visit; }

  if(visited != init_visit) {
    var cookie_tokens = visited.split("/");
    var one_day = 24 * 60 * 60 * 1000;
    //var one_day = 2 * 60 * 1000; // for testing purpose
    if ( (oToday.getTime()-cookie_tokens[1]) > one_day ) {
      count = cookie_tokens[0];
      count++;
      visited = count + "/" + oToday.getTime() + "/" + cookie_tokens[2];
    }
  }
  if(window.setCookie){ window.setCookie("_visited", visited, 365); }

  if ( (count >= 5) && (count < 10) ) {
    showOverlay('setMyHomeOverlay', 0, 0, null);
  }
}

if (navigator.userAgent.indexOf("MSIE") >= 0) { // IE-only feature
   if(top.location.href!= window.location.href){ 
     // alert("framed1");  
     // Dont show for framed websites 
   }
   else if (top != self){
      //alert("framed2");
   }
   else { 
      setTimeout("set_homepage_overlay();", 500);
   }
}

