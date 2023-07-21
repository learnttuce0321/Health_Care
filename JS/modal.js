let sex = "";
let weight = "";
let kcal = "";
let eat_kcal = "";
let goal = "";
let eat_carbohydrate = "";
let eat_protein = ""
let eat_fat = ""
let check_sign = false;

$(".login").on("click", function () {
  $(".login").toggleClass("hide");
  $(".name").toggleClass("show");
});

$(".name-next").on("click", function () {
  console.log($("input[name='name']").val());
  $(".name").toggleClass("show");
  $(".sex").toggleClass("show");
});

$(".sex_select").on("click", function () {
  $(".sex").toggleClass("show");
  $(".weight").toggleClass("show");
});

$('button[name="sex_male"]').on("click", function () {
  console.log($("button[name='sex_male']").val());
  sex = $("button[name='sex_male']").val();
});

$('button[name="sex_female"]').on("click", function () {
  console.log($("button[name='sex_female']").val());
  sex = $("button[name='sex_female']").val();
});

$(".weight-next").on("click", function () {
  console.log($("input[name='weight']").val());
  weight = $("input[name='weight']").val();
  $(".weight").toggleClass("show");
  $(".kal").toggleClass("show");
});

$(".kal-next").on("click", function () {
  console.log($("input[name='kal']").val());
  kcal = $("input[name='kal']").val();
  $(".kal").toggleClass("show");
  $(".Goal").toggleClass("show");
});

$(".goal_select").on("click", function () {
  $(".Goal").toggleClass("show");
  $(".result").toggleClass("show");
  check_sign = true;
  console.log(check_sign)
});

$(".exit").on("click", function () {
  $(".result").toggleClass("show");
});

$("button[name='fast']").on("click", function () {
  console.log($("button[name='fast']").val());
  goal = $("button[name='fast']").val();
});

$("button[name='slow']").on("click", function () {
  console.log($("button[name='slow']").val());
  goal = $("button[name='slow']").val();
});

$("button[name='muscle']").on("click", function () {
  console.log($("button[name='muscle']").val());
  goal = $("button[name='muscle']").val();
});

$("button[name='bulk']").on("click", function () {
  console.log($("button[name='bulk']").val());
  goal = $("button[name='bulk']").val();
});
//-- 여기서부터는 결과창에 데이터입력을 위한 함수----------------------------------------------------
$(document).ready(function () {
  $(".test").on("click", function () {
    let name = $('input[name="name"]').val();
    $("#user").text(name);
  });
});

$(document).ready(function () {
  $(".sex_select").on("click", function (e) {
    let sex = e.target.value;
    $("#sex").text(sex);
  });
});
$(document).ready(function () {
  $(".test").on("click", function () {
    let weight = $('input[name="weight"]').val();
    $("#weight").text(weight);
  });
});

$(document).ready(function () {
  $(".test").on("click", function () {
    let Kcal = $('input[name="kal"]').val();
    $("#BMR").text(Kcal);
  });
});

$(document).ready(function () {
  $(".test").on("click", function (e) {
    let goal = e.target.value;
    $("#goal").text(goal);
  });
});
// 여기까지는 결과창------------------------------
//-----------------------------------여기서부터는
$(document).ready(function () {
  $(".test").on("click", function () {
    eat_kcal = Eat_Kcal_Progess();
    console.log(eat_kcal);
    $("#eat_kcal").html(eat_kcal);
  });
});

function Eat_Kcal_Progess() {
  if (goal === "fast") {
    kcal -= 250;
  } else if (goal === "slow") {
    kcal -= 100;
  } else if (goal === "muscle") {
    kcal = Number(kcal) + 250;
  } else {
    kcal = weight * 35 + 500;
  }
  return kcal;
}

$(document).ready(function () {
  $(".test").on("click", function () {
    eat_carbohydrate = Carbohydrate();
    $("#carbohydrate").html(eat_carbohydrate);
  });
});

function Carbohydrate() {
  if (goal === "fast") {
    eat_carbohydrate = eat_kcal * 0.5;
  } else if (goal === "slow") {
    eat_carbohydrate = eat_kcal * 0.5;
  } else if (goal === "muscle") {
    eat_carbohydrate = eat_kcal * 0.4;
  } else {
    eat_carbohydrate = eat_kcal * 0.4;
  }
  return eat_carbohydrate;
}

$(document).ready(function () {
  $(".test").on("click", function () {
    eat_protein = Protein();
    $("#protein").html(eat_protein);
  });
});

function Protein() {
  if (goal === "fast") {
    eat_protein = eat_kcal * 0.3;
  } else if (goal === "slow") {
    eat_protein = eat_kcal * 0.3;
  } else if (goal === "muscle") {
    eat_protein = eat_kcal * 0.4;
  } else {
    eat_protein = eat_kcal * 0.4;
  }
  return eat_protein;
}

$(document).ready(function () {
  $(".test").on("click", function () {
    eat_fat = Fat();
    $("#fat").html(eat_fat);
  });
});

function Fat() {
  if (goal === "fast") {
    eat_fat = eat_kcal * 0.2;
  } else if (goal === "slow") {
    eat_fat = eat_kcal * 0.2;
  } else if (goal === "muscle") {
    eat_fat = eat_kcal * 0.2;
  } else {
    eat_fat = eat_kcal * 0.2;
  }
  return eat_fat;
}
