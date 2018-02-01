var alldivs = document.getElementsByClassName('prop-options-phone');
var allcont = document.getElementsByClassName('prop-contact-content');

console.log(allcont.length);
var ctr = 0;
for( var i=0; i<alldivs.length; i++) {
  setListeners(i);
}

function setListeners(i) {
  alldivs[i].onclick = function(event) {
    if(allcont[i].style.display == 'none') {
      allcont[i].style.order = 2;
      allcont[i].style.display = 'block';
    }
    else {
      allcont[i].style.display = 'none';
    }
    event.stopPropagation();
  }
}
