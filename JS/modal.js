let sex = "";
let weight = "";
let kcal = "";
let eat_kcal = "";
let goal = "";
let eat_carbohydrate = "";
let eat_protein = "";
let eat_fat = "";
let check_sign = false;

$(".login").on("click", function () {
  $(".login").toggleClass("hide");
  $(".name").toggleClass("show");
});

$(".name-next").on("click", function () {
  if ($(".name_input").val() == "") {
    alert("이름을 입력해 주세요");
    $(".name_input").focus()
  } else {
    $(".name").toggleClass("show");
    $(".sex").toggleClass("show");
  }
});

$(".sex_select").on("click", function () {
  $(".sex").toggleClass("show");
  $(".weight").toggleClass("show");
});

$('button[name="sex_male"]').on("click", function () {
  sex = $("button[name='sex_male']").val();
});

$('button[name="sex_female"]').on("click", function () {
  sex = $("button[name='sex_female']").val();
});

$(".weight-next").on("click", function () {
  weight = $("input[name='weight']").val();
  if ($(".weight_input").val() == "") {
    alert("체중을 입력해 주세요");
    $('input[name="weight"]').focus()
  } else {
    $(".weight").toggleClass("show");
    $(".kal").toggleClass("show");
  }
});

$(".kal-next").on("click", function () {
  kcal = $("input[name='kal']").val();
  if ($(".kal_input").val() == "") {
    alert("기초대사량을 입력해 주세요");
    $(".kal_input").focus()
  } else {
    $(".kal").toggleClass("show");
    $(".Goal").toggleClass("show");
  }
});

$(".goal_select").on("click", function () {
  $(".Goal").toggleClass("show");
  $(".result").toggleClass("show");
  check_sign = true;
});

$(".exit").on("click", function () {
  $(".result").toggleClass("show");
});

$(".goal_select").on("click", function () {
  const goalValue = $(this).data("goal");
  goal = goalValue;
});
//-- 여기서부터는 결과창에 데이터입력을 위한 함수----------------------------------------------------
$(document).ready(function () {
  $(".test").on("click", function () {
    let name = $('input[name="name"]').val();
    $(".user").text(name);
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
    $("#weight").text(weight + "Kg");
  });
});

$(document).ready(function () {
  $(".test").on("click", function () {
    let Kcal = $('input[name="kal"]').val();
    $("#BMR").text(Kcal + "Kcal");
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
    Render_Main_Progress_Bar()
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

$(".test").on("click", function () {
  $(".blur").css("filter", "none");
});
