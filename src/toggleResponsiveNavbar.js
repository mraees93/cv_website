const navBarIconButton = document.getElementById("navMenu");
navBarIconButton.addEventListener("click", toggleResponsiveNavbar);

function toggleResponsiveNavbar() {
  let navBar = document.getElementById("myTopnav");
  if (navBar.className === "topnav") {
    navBar.className += " responsive";
  } else {
    navBar.className = "topnav";
  }
}
