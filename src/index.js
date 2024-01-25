/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
const button = document.getElementById("navMenu");
button.addEventListener("click", myFunction);

function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// const footerHtml = `<ul>\
//               <li>\
//                 <a href="#">link</a>\
//               </li>\
//               <li>\
//                 <a href="#">link</a>\
//               </li>\
//               <li>\
//                 <a href="#">link</a>\
//               </li>\
//             </ul>`;

// document.getElementsByTagName("footer").innerHTML += footerHtml;
