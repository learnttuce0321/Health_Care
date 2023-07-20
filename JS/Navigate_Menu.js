function Move_home() {
  document.getElementById("home").style.display = "block";

  document.getElementById("health").style.display = "none";

  document.getElementById("exercise").style.display = "none";

  if(check_sign) {
    Render_Main_Progress_Bar()
  }
}

function Move_health() {
  document.getElementById("health").style.display = "block";

  document.getElementById("home").style.display = "none";

  document.getElementById("exercise").style.display = "none";

  if(check_sign) {
    Render_Health_Progress_Bar();
  }
}

function Move_exercise() {
  document.getElementById("exercise").style.display = "block";

  document.getElementById("home").style.display = "none";

  document.getElementById("health").style.display = "none";
}
