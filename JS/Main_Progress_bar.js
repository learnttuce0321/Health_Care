let tan = 0; //탄수화물
let fat = 0; //지방
let prt = 0; //단백질
let total_kcal = 0;

$(document).ready(function () {
  let user_percent = $(".user_percent");
  let user_progress = $(".progress");

  $(user_percent[0]).text(tan + "%");
  $(user_progress[0]).css("width", `${tan}%`);

  $(user_percent[1]).text(fat + "%");
  $(user_progress[1]).css("width", `${fat}%`);

  $(user_percent[2]).text(prt + "%");
  $(user_progress[2]).css("width", `${prt}%`);
});