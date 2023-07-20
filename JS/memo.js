function Write_Memo() {
    let memo_title = $('#memo_title').val()
    let memo_context = $('#memo_context').val()

    if(memo_title.length === 0) {
        alert('제목을 입력해주세요')
        $('#memo_title').focus()
        return
    } else if(memo_context.length === 0) {
        alert('내용을 입력해주세요')
        $('#memo_context').focus()
        return
    }

    $('#memo_title').val('')
    $('#memo_context').val('')
    
    let title = document.createElement('h3')
    title.innerText = memo_title
    let context = document.createElement('p')
    context.innerText = memo_context

    let memo = document.createElement('div')
    memo.appendChild(title)
    memo.appendChild(context)
    memo.classList.add('memo_design')
    $('.memo_floor').append(memo)

    $('.memo_floor div').draggable({
        scroll: false,
        containment: 'parent'
    })

}

let memo_count = 1;
$('.memo_floor').click(function(e) {
    if(e.target !== e.currentTarget) {
        e.stopPropagation()
        $(e.target).css('z-index', memo_count++)
    }
})
