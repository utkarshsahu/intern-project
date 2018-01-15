function fillDiv(i) {
  var obj = cont.section[i];
  var htmlCode = "<div id=\""+ obj.id + "\"><h2 class=\"sec-header\">" + obj.heading + "</h2>";
  htmlCode += "<ul><li>" + obj.faq1 + "</li><li>" + obj.faq2 + "</li></ul></div>";
  document.getElementById("allSecs").innerHTML += htmlCode;
}

function fillAllDivs() {
  for(var i = 0; i<cont.section.length; i++) {
    fillDiv(i);
  }
}
