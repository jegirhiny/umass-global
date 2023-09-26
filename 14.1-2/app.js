const MIN_LENGTH = 2, MIN_RATING = 0, MAX_RATING = 10;
const movieContainer = $('#movie-container');

$('#movie-form').on('submit', (e) => {
    e.preventDefault();
    const [title, rating] = [$('input').eq(0).val(), $('input').eq(1).val()];

    if(title.length < MIN_LENGTH || rating < MIN_RATING || rating > MAX_RATING) {
        return;
    }

    movieContainer.append(
        $('<div></div>').append(
            $(`<h2>`, {text : `${title} ${rating}/10`})
        ).append(
            $(`<button>`, {text : 'Remove'}).on('click', (e) => {
                $(e.target).closest('div').remove();
            })
        ).css({
            display : 'flex', 
            'justify-content' : 'center'
        })
    );

    $('#movie-form').trigger('reset');
})