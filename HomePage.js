'use strict';

function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

const switcher = document.querySelector('#light-or-dark');

switcher.addEventListener('click', function() {
	document.body.classList.toggle('light-theme');
	document.body.classList.toggle('dark-theme');
	
	const className = document.body.className;
	if(className == "light-theme") {
		this.textContent = "Dark";
	} else {
		this.textContent = "Light";
	}
});