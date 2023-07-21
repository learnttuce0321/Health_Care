let have_kcal = ""
let have_carbohydrate = ""
let have_protein = ""
let have_fat = "";

const NUTRIAPIKEY = '052ddfc6009045afa54e'
function Get_Food_Info() {

    let food_name = $('.food_input').val()
    let food_count = $('.food_input_count').val()

    if(food_name.length === 0) {
        alert('음식을 입력해주세요')
        $('.food_input').focus()
        return
    } else if(food_count.length === 0) {
        alert('개수를 입력해주세요')
        $('.food_input_count').focus()
        return
    }

    let target_URL = `https://openapi.foodsafetykorea.go.kr/api/${NUTRIAPIKEY}/I2790/json/1/1000/DESC_KOR=${food_name}`
    let target_item = ''
    

    $.ajax({
        url: target_URL,
        method: 'get',
        dataType: 'json',
        async: false
    })
    .done((items) => {
        target_item = items.I2790.row[0]
    })

    return target_item
}


$('.food_submit').click(function(e) {
    
    
    let food_info = Get_Food_Info()
    let food_name = $('.food_input').val()
    let food_count = $('.food_input_count').val()

    $('.food_input').val("")  
    $('.food_input_count').val("")

    lower_food_info(food_info)
    right_food_info(food_info, food_name, food_count, e)
    
    Cal_Have_Food(food_info, food_count)
    left_Percent_info()
    left_Percent_Kcal_info()
    Circle_Progress_Bar()
})


function lower_food_info(food_info) {
    document.querySelector('#food_info_box').innerHTML = ""

    let food_info_name = document.createElement('h3')
    food_info_name.innerText = food_info.DESC_KOR + '(1회 제공량)'

    let food_info_kcal_div = document.createElement('div')
    let food_info_kcal_title = document.createElement('p')
    food_info_kcal_title.innerText = 'kcal'
    let food_info_kcal_content =document.createElement('h2')
    food_info_kcal_content.innerText = food_info.NUTR_CONT1
    food_info_kcal_div.appendChild(food_info_kcal_content)
    food_info_kcal_div.appendChild(food_info_kcal_title)

    let food_info_tan_div = document.createElement('div')
    let food_info_tan_title = document.createElement('p')
    food_info_tan_title.innerText = '탄수화물'
    let food_info_tan_content =document.createElement('h2')
    food_info_tan_content.innerText = food_info.NUTR_CONT2
    food_info_tan_div.appendChild(food_info_tan_content)
    food_info_tan_div.appendChild(food_info_tan_title)

    let food_info_dan_div = document.createElement('div')
    let food_info_dan_title = document.createElement('p')
    food_info_dan_title.innerText = '단백질'
    let food_info_dan_content =document.createElement('h2')
    food_info_dan_content.innerText = food_info.NUTR_CONT3
    food_info_dan_div.appendChild(food_info_dan_content)
    food_info_dan_div.appendChild(food_info_dan_title)

    let food_info_fat_div = document.createElement('div')
    let food_info_fat_title = document.createElement('p')
    food_info_fat_title.innerText = '지방'
    let food_info_fat_content =document.createElement('h2')
    food_info_fat_content.innerText = food_info.NUTR_CONT4
    food_info_fat_div.appendChild(food_info_fat_content)
    food_info_fat_div.appendChild(food_info_fat_title)

    let info_div = document.createElement('div')
    info_div.style.display = 'flex'
    info_div.style.justifyContent ='space-around'
    info_div.appendChild(food_info_kcal_div)
    info_div.appendChild(food_info_tan_div)
    info_div.appendChild(food_info_dan_div)
    info_div.appendChild(food_info_fat_div)

    document.querySelector('#food_info_box').appendChild(food_info_name)
    document.querySelector('#food_info_box').appendChild(info_div)
}


function right_food_info(food_info, food_name, food_count, e) {
    
    let items = $('.meal div[value]')
    let check = false

    for(let i=0; i<items.length; i++) {
        console.log($(items[i]))
        console.log($(items[i]).val(),'+', food_name)
        if($(items[i]).id === food_name) {
            check = true
            break
        }
    }
    console.log(check)
    
    let food_container = document.createElement('div')

    let food_n = document.createElement('h3')
    food_n.innerText = food_info.DESC_KOR
    let food_c = document.createElement('p')
    food_c.innerText = food_count + '개'
    food_container.appendChild(food_n)
    food_container.appendChild(food_c)
    food_container.setAttribute('value', food_info.DESC_KOR)

    $(`#${e.target.name}`).append(food_container)
}


function Cal_Have_Food(food_info, food_count) {
    have_kcal = String(Number(have_kcal) + Number(food_info.NUTR_CONT1)*food_count)
    have_carbohydrate = String(Number(have_carbohydrate) + Number(food_info.NUTR_CONT2)*food_count)
    have_protein = String(Number(have_protein) + Number(food_info.NUTR_CONT3)*food_count)
    have_fat = String(Number(have_fat) + Number(food_info.NUTR_CONT4)*food_count)
}


function Circle_Progress_Bar() {
    if(check_sign) {
        Circle_Progress_Bar_content()
    }
}
function left_Percent_info() {
    if(check_sign) {
        left_progress_content()
    }
}
function left_Percent_Kcal_info() {
    if(check_sign) {
        left_lower_content()
    }
}


function Render_Main_Progress_Bar() {
    Progress_Bar_Number()

    let user_percent = $(".user_percent");
    let user_progress = $(".progress");

    $(user_percent[0]).text(tan + "%");
    $(user_progress[0]).css("width", `${tan}%`);

    $(user_percent[1]).text(fat + "%");
    $(user_progress[1]).css("width", `${fat}%`);

    $(user_percent[2]).text(prt + "%");
    $(user_progress[2]).css("width", `${prt}%`);

    Clear_nutrition()
}
function Render_Health_Progress_Bar() {
    if(check_sign) {
        left_progress_content()
    }
}
function Render_Left_Lower_content() {
    left_lower_content()
}
function Render_Circle_Progress_Bar() {
    Circle_Progress_Bar_content()
}


function left_progress_content() {
    Progress_Bar_Number()

    let user_percent = $('.nutrien>h2')

    $(user_percent[0]).text(tan + "%");

    $(user_percent[1]).text(fat + "%");

    $(user_percent[2]).text(prt + "%");

    Clear_nutrition()
}
function left_lower_content() {
    let kcal_container = $('.kcal_box')
    $(kcal_container[0]).html('')
    $(kcal_container[1]).html('')

    let fountain_kcal = document.createElement('h3')
    fountain_kcal.innerText = `${Math.round(Number(have_kcal))} / ${eat_kcal}kcal`
    

    total_kcal += Math.round(Number(have_kcal)*100/eat_kcal)

    $(kcal_container[0]).append(fountain_kcal)

    let sentence = document.createElement('h3')
    
    if(total_kcal > 100) {
        sentence.innerText = ('충분해요!')
    } else {
        sentence.innerText = (`${Math.round(eat_kcal-Number(have_kcal))} kcal만큼 부족해요`)
    }
    $(kcal_container[1]).append(sentence)
}
function Circle_Progress_Bar_content() {
    let control = document.getElementById("control");
        let bar = document.querySelector(".bar");
        let value = document.querySelector(".value");

        const RADIUS = 54;
        const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

        let progress = Number(have_kcal)/eat_kcal;
        if(progress > 1) {
            progress = 1
        }
        let dashoffset = CIRCUMFERENCE * (1 - progress);

        value.innerHTML = total_kcal+ "%kcal";
        bar.style.strokeDashoffset = dashoffset;
        bar.style.strokeDasharray = CIRCUMFERENCE;
}


function Progress_Bar_Number() {
    tan += Math.round(Number(have_carbohydrate)*4*100/eat_carbohydrate)
    prt += Math.round(Number(have_protein)*4*100/eat_protein)
    fat += Math.round(Number(have_fat)*9*100/eat_fat)
}


function Clear_nutrition() {
    tan = 0
    prt = 0
    fat = 0
    total_kcal = 0;
}