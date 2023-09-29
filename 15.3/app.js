const apiKey = 'MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym';

$('#search-form').on('submit', (e) => {
    e.preventDefault();

    const searchTerm = $('#search-term').val();
    reqGif(searchTerm, apiKey);

    $('#search-form').trigger('reset');
})

$('#remove-all').on('click', (e) => {
    e.preventDefault();

    $('video').remove();
}) 

async function reqGif(searchTerm, apiKey) {
    const res = await axios.get('http://api.giphy.com/v1/gifs/search', {
        params: {
            q : searchTerm, 
            api_key : apiKey
        }
    });

    const results = res.data.data, selected = results[Math.floor(Math.random() * results.length)];
    addGif(selected.images.looping.mp4);
}

function addGif(source) {
    $('body').append(
        $('<video>').append(
            $('<source>', {
                src: source,
                type: 'video/mp4'
            })
        ).attr('autoplay', 'autoplay')
    );
}