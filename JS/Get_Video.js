const APIKEY = 'AIzaSyDd1uifc5I0K8E7qVkjcxMbxPR0EZTkdGM'


function getURL(word) {
    let key_word = word
    let target_URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${key_word}&order=relevance&key=${APIKEY}`
    let target_URL_ID = ''
    
    $.ajax({
        url: target_URL,
        method: 'GET',
        dataType: 'json',
        async: false
    })
    .done((item) => {
        target_URL_ID = item.items[0].id.videoId
    })
    
    return target_URL_ID
}

$('#youtube_btn').click(() => {
    let search_word = $('#youtube_search').val()
    $('#youtube_search').val('')
    
    let ID = getURL(search_word)
    let div = document.createElement('div')
    div.innerHTML = `<iframe src='https://www.youtube.com/embed/${ID}' width="560" height="315"  title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
    $('#youtube_video').empty()
    console.log($('#youtube_video'))
    $('#youtube_video').append(div)
    $('iframe').attr('src', `https://www.youtube.com/embed/${ID}`)
    $('iframe').attr("width", "100%")
    $('iframe').attr("height", "663px")
})