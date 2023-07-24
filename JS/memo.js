$(".write_memo_btn").click(function Write_Memo(e) {
  let memo_title = $("#memo_title").val();
  let memo_context = $("#memo_context").val();

  if (memo_title.length === 0) {
    alert("제목을 입력해주세요");
    $("#memo_title").focus();
    return;
  } else if (memo_context.length === 0) {
    alert("내용을 입력해주세요");
    $("#memo_context").focus();
    return;
  }

  $("#memo_title").val("");
  $("#memo_context").val("");

  if ($(".write_memo_btn").text() === "MODIFY") {
    const memo = $(`.memo_floor>div[id ="${e.target.getAttribute("name")}"]`);
    let change = $("#memo_title").val();
    memo.find("h3").text(memo_title);
    memo.find("p").text(memo_context);
    $(".write_memo_btn").text("INPUT");
  } else {
    const IDBYDATE = Date.now();

    let title = document.createElement("h3");
    title.innerText = memo_title;
    let context = document.createElement("p");
    context.innerText = memo_context;

    let delete_btn = document.createElement("span");
    delete_btn.innerHTML = '<i class="fi fi-br-cross"></i>';
    delete_btn.setAttribute("name", "delete_btn");
    delete_btn.setAttribute("id", IDBYDATE);
    delete_btn.classList.add("delete_btn");

    let modify_btn = document.createElement("span");
    modify_btn.innerHTML = '<i class="fi fi-rr-edit"></i>';
    modify_btn.setAttribute("name", "modify_btn");
    modify_btn.setAttribute("id", IDBYDATE);
    modify_btn.classList.add("modify_btn");

    let btn_container = document.createElement("div");
    btn_container.append(modify_btn);
    btn_container.append(delete_btn);
    btn_container.classList.add("btn_container");

    let memo_title_container = document.createElement("div");
    memo_title_container.setAttribute("name", "memo_title_container");
    memo_title_container.classList.add("memo_title_container");

    memo_title_container.append(title);
    memo_title_container.append(btn_container);

    let memo = document.createElement("div");
    memo.appendChild(memo_title_container);
    memo.appendChild(context);
    memo.setAttribute("id", IDBYDATE);
    memo.classList.add("memo_design");
    $(".memo_floor").append(memo);

    $(".memo_floor>div").draggable({
      scroll: false,
      containment: "parent",
    });
  }
});

let memo_count = 1;
$(".memo_floor").click(function (e) {
  let target_name = e.target.parentNode.getAttribute("name");
  if (target_name === "delete_btn") {
    delete_memo(e);
  } else if (target_name === "modify_btn") {
    modify_memo(e);
  } else if (e.target !== e.currentTarget) {
    e.stopPropagation();
    $(e.target).css("z-index", memo_count++);
  }
});

function delete_memo(e) {
  const TARGET_ID = e.target.parentNode.getAttribute("id");
  if (confirm("삭제하시겠습니까?")) {
    $(`.memo_floor>div[id="${TARGET_ID}"]`).remove();
  }
}

function modify_memo(e) {
  const TARGET_ID = e.target.parentNode.getAttribute("id");
  const memo = $(`.memo_floor>div[id="${TARGET_ID}"]`);
  let = memo.find("h3").text();
  let modify_memo_title = memo.find("h3").text();
  let modify_memo_context = memo.find("p").text();

  $("#memo_title").val(modify_memo_title);
  $("#memo_context").val(modify_memo_context);
  $(".write_memo_btn").text("MODIFY");
  $(".write_memo_btn").attr("name", TARGET_ID);
}
