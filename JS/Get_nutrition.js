let have_kcal = "";
let have_carbohydrate = "";
let have_protein = "";
let have_fat = "";


let have_breakfast = {
  kcal: 0,
  carbohydrate: 0,
  protein: 0,
  fat: 0,
};
let have_lunch = {
  kcal: 0,
  carbohydrate: 0,
  protein: 0,
  fat: 0,
};
let have_dinner = {
  kcal: 0,
  carbohydrate: 0,
  protein: 0,
  fat: 0,
};
let have_snack = {
  kcal: 0,
  carbohydrate: 0,
  protein: 0,
  fat: 0,

let breakfast = {
  kcal: "",
  carbohydrate: "",
  protein: "",
  fat: "",

};

const NUTRIAPIKEY = "052ddfc6009045afa54e";
function Get_Food_Info() {
  let food_name = $(".food_input").val();
  let food_count = $(".food_input_count").val();

  if (food_name.length === 0) {
    alert("음식을 입력해주세요");
    $(".food_input").focus();
    return;
  } else if (food_count.length === 0) {
    alert("개수를 입력해주세요");
    $(".food_input_count").focus();
    return;
  }

  let target_URL = `https://openapi.foodsafetykorea.go.kr/api/${NUTRIAPIKEY}/I2790/json/1/1000/DESC_KOR=${food_name}`;
  let target_item = "";

  $.ajax({
    url: target_URL,
    method: "get",
    dataType: "json",
    async: false,
  }).done((items) => {
    target_item = items.I2790.row[0];
  });

  return target_item;
}

$(".food_submit").click(function (e) {
  let food_info = Get_Food_Info();
  let food_name = $(".food_input").val();
  let food_count = $(".food_input_count").val();


  //console.log(food_info.NUTR_CONT1 * food_count);


  if (!food_info) {
    console.log("break");
    return false;
  }
  $(".food_input").val("");
  $(".food_input_count").val("");

  lower_food_info(food_info);
  right_food_info(food_info, food_name, food_count, e);

  Cal_Have_Food(food_info, food_count);
  left_Percent_info();
  left_Percent_Kcal_info();
  Circle_Progress_Bar();

  add_kcal(food_info, food_count, e);

});

function lower_food_info(food_info) {
  document.querySelector("#food_info_box").innerHTML = "";

  let food_info_name = document.createElement("h3");
  food_info_name.innerText = food_info.DESC_KOR + "(1회 제공량)";

  let food_info_kcal_div = document.createElement("div");
  let food_info_kcal_title = document.createElement("p");
  food_info_kcal_title.innerText = "kcal";
  let food_info_kcal_content = document.createElement("h2");
  food_info_kcal_content.innerText = food_info.NUTR_CONT1;
  food_info_kcal_div.appendChild(food_info_kcal_content);
  food_info_kcal_div.appendChild(food_info_kcal_title);

  let food_info_tan_div = document.createElement("div");
  let food_info_tan_title = document.createElement("p");
  food_info_tan_title.innerText = "탄수화물";
  let food_info_tan_content = document.createElement("h2");
  food_info_tan_content.innerText = food_info.NUTR_CONT2;
  food_info_tan_div.appendChild(food_info_tan_content);
  food_info_tan_div.appendChild(food_info_tan_title);

  let food_info_dan_div = document.createElement("div");
  let food_info_dan_title = document.createElement("p");
  food_info_dan_title.innerText = "단백질";
  let food_info_dan_content = document.createElement("h2");
  food_info_dan_content.innerText = food_info.NUTR_CONT3;
  food_info_dan_div.appendChild(food_info_dan_content);
  food_info_dan_div.appendChild(food_info_dan_title);

  let food_info_fat_div = document.createElement("div");
  let food_info_fat_title = document.createElement("p");
  food_info_fat_title.innerText = "지방";
  let food_info_fat_content = document.createElement("h2");
  food_info_fat_content.innerText = food_info.NUTR_CONT4;
  food_info_fat_div.appendChild(food_info_fat_content);
  food_info_fat_div.appendChild(food_info_fat_title);

  let info_div = document.createElement("div");
  info_div.style.display = "flex";
  info_div.style.justifyContent = "space-around";
  info_div.appendChild(food_info_kcal_div);
  info_div.appendChild(food_info_tan_div);
  info_div.appendChild(food_info_dan_div);
  info_div.appendChild(food_info_fat_div);

  document.querySelector("#food_info_box").appendChild(food_info_name);
  document.querySelector("#food_info_box").appendChild(info_div);
}

function right_food_info(food_info, food_name, food_count, e) {
  let items = $(".meal div[id]");
  let this_item = null;
  let check = false;

  for (let i = 0; i < items.length; i++) {
    if (items[i].id === food_name) {
      check = true;
      this_item = items[i];
      break;
    }
  }

  if (check) {
    let count = parseInt($(this_item).children("p").text());
    count += Number(food_count);
    $(this_item)
      .children("p")
      .text(count + " 개");
  } else {
    let food_container = document.createElement("div");

    let food_n = document.createElement("h3");
    food_n.innerText = food_info.DESC_KOR;
    let food_c = document.createElement("p");
    food_c.innerText = food_count + "개";
    food_container.appendChild(food_n);
    food_container.appendChild(food_c);
    food_container.setAttribute("id", food_info.DESC_KOR);

    $(`#${e.target.name}`).append(food_container);
  }
}

function Cal_Have_Food(food_info, food_count) {
  have_kcal = String(
    Number(have_kcal) + Number(food_info.NUTR_CONT1) * food_count
  );
  have_carbohydrate = String(
    Number(have_carbohydrate) + Number(food_info.NUTR_CONT2) * food_count
  );
  have_protein = String(
    Number(have_protein) + Number(food_info.NUTR_CONT3) * food_count
  );
  have_fat = String(
    Number(have_fat) + Number(food_info.NUTR_CONT4) * food_count
  );
}

function Circle_Progress_Bar() {
  if (check_sign) {
    Circle_Progress_Bar_content();
  }
}
function left_Percent_info() {
  if (check_sign) {
    left_progress_content();
  }
}
function left_Percent_Kcal_info() {
  if (check_sign) {
    left_lower_content();
  }
}

function Render_Main_Progress_Bar() {
  Progress_Bar_Number();

  let user_percent = $(".user_percent");
  let user_progress = $(".progress");

  $(user_percent[0]).text(tan + "%");
  $(user_progress[0]).css("width", `${tan}%`);

  $(user_percent[1]).text(fat + "%");
  $(user_progress[1]).css("width", `${fat}%`);

  $(user_percent[2]).text(prt + "%");
  $(user_progress[2]).css("width", `${prt}%`);

  Clear_nutrition();
}
function Render_Health_Progress_Bar() {
  if (check_sign) {
    left_progress_content();
  }
}
function Render_Left_Lower_content() {
  left_lower_content();
}
function Render_Circle_Progress_Bar() {
  Circle_Progress_Bar_content();
}

function left_progress_content() {
  Progress_Bar_Number();

  let user_percent = $(".nutrien>h2");

  $(user_percent[0]).text(tan + "%");

  $(user_percent[1]).text(fat + "%");

  $(user_percent[2]).text(prt + "%");

  Clear_nutrition();
}
function left_lower_content() {
  let kcal_container = $(".kcal_box");
  $(kcal_container[0]).html("");
  $(kcal_container[1]).html("");

  let fountain_kcal = document.createElement("h3");
  fountain_kcal.innerText = `${Math.round(
    Number(have_kcal)
  )} / ${eat_kcal}kcal`;

  total_kcal += Math.round((Number(have_kcal) * 100) / eat_kcal);

  $(kcal_container[0]).append(fountain_kcal);

  let sentence = document.createElement("h3");

  if (total_kcal > 100) {
    sentence.innerText = "충분해요!";
  } else {
    sentence.innerText = `${Math.round(
      eat_kcal - Number(have_kcal)
    )} kcal만큼 부족해요`;
  }
  $(kcal_container[1]).append(sentence);
}
function Circle_Progress_Bar_content() {
  let control = document.getElementById("control");
  let bar = document.querySelector(".bar");
  let value = document.querySelector(".value");

  const RADIUS = 54;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

  let progress = Number(have_kcal) / eat_kcal;
  if (progress > 1) {
    progress = 1;
  }
  let dashoffset = CIRCUMFERENCE * (1 - progress);

  value.innerHTML = total_kcal + "%kcal";
  bar.style.strokeDashoffset = dashoffset;
  bar.style.strokeDasharray = CIRCUMFERENCE;
}

function Progress_Bar_Number() {
  tan += Math.round((Number(have_carbohydrate) * 4 * 100) / eat_carbohydrate);
  prt += Math.round((Number(have_protein) * 4 * 100) / eat_protein);
  fat += Math.round((Number(have_fat) * 9 * 100) / eat_fat);
}

function Clear_nutrition() {
  tan = 0;
  prt = 0;
  fat = 0;
  total_kcal = 0;
}


function add_kcal(food_info, food_count, e) {
  // 아침-----------------------------------------------------------
  if (e.target.name == "morning") {
    have_breakfast.kcal += Number(food_info.NUTR_CONT1) * food_count;
    have_breakfast.carbohydrate += Number(food_info.NUTR_CONT2) * food_count;
    have_breakfast.protein += Number(food_info.NUTR_CONT3) * food_count;
    have_breakfast.fat += Number(food_info.NUTR_CONT4) * food_count;

    $(".morning_container")
      .children("p:eq(0)")
      .text(`칼로리:${Math.round(have_breakfast.kcal)}`);
    $(".morning_container")
      .children("p:eq(1)")
      .text(`탄수화물:${Math.round(have_breakfast.carbohydrate)}`);
    $(".morning_container")
      .children("p:eq(2)")
      .text(`단백질:${Math.round(have_breakfast.protein)}`);
    $(".morning_container")
      .children("p:eq(3)")
      .text(`지방:${Math.round(have_breakfast.fat)}`);
    // 점심--------------------------------------------------------------
  } else if (e.target.name == "lunch") {
    have_lunch.kcal += Number(food_info.NUTR_CONT1) * food_count;
    have_lunch.carbohydrate += Number(food_info.NUTR_CONT2) * food_count;
    have_lunch.protein += Number(food_info.NUTR_CONT3) * food_count;
    have_lunch.fat += Number(food_info.NUTR_CONT4) * food_count;

    $(".lunch_container")
      .children("p:eq(0)")
      .text(`칼로리:${Math.round(have_lunch.kcal)}`);
    $(".lunch_container")
      .children("p:eq(1)")
      .text(`탄수화물:${Math.round(have_lunch.carbohydrate)}`);
    $(".lunch_container")
      .children("p:eq(2)")
      .text(`단백질:${Math.round(have_lunch.protein)}`);
    $(".lunch_container")
      .children("p:eq(3)")
      .text(`지방:${Math.round(have_lunch.fat)}`);
    // 저녁----------------------------------------------------------
  } else if (e.target.name == "dinner") {
    have_dinner.kcal += Number(food_info.NUTR_CONT1) * food_count;
    have_dinner.carbohydrate += Number(food_info.NUTR_CONT2) * food_count;
    have_dinner.protein += Number(food_info.NUTR_CONT3) * food_count;
    have_dinner.fat += Number(food_info.NUTR_CONT4) * food_count;

    $(".dinner_container")
      .children("p:eq(0)")
      .text(`칼로리:${Math.round(have_dinner.kcal)}`);
    $(".dinner_container")
      .children("p:eq(1)")
      .text(`탄수화물:${Math.round(have_dinner.carbohydrate)}`);
    $(".dinner_container")
      .children("p:eq(2)")
      .text(`단백질:${Math.round(have_dinner.protein)}`);
    $(".dinner_container")
      .children("p:eq(3)")
      .text(`지방:${Math.round(have_dinner.fat)}`);
    // 간식-----------------------------------------------------------------
  } else {
    have_snack.kcal += Number(food_info.NUTR_CONT1) * food_count;
    have_snack.carbohydrate += Number(food_info.NUTR_CONT2) * food_count;
    have_snack.protein += Number(food_info.NUTR_CONT3) * food_count;
    have_snack.fat += Number(food_info.NUTR_CONT4) * food_count;

    $(".snack_container")
      .children("p:eq(0)")
      .text(`칼로리:${Math.round(have_snack.kcal)}`);
    $(".snack_container")
      .children("p:eq(1)")
      .text(`탄수화물:${Math.round(have_snack.carbohydrate)}`);
    $(".snack_container")
      .children("p:eq(2)")
      .text(`단백질:${Math.round(have_snack.protein)}`);
    $(".snack_container")
      .children("p:eq(3)")
      .text(`지방:${Math.round(have_snack.fat)}`);
  }
}

