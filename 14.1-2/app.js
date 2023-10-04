const MIN_LENGTH = 2, MIN_RATING = 0, MAX_RATING = 10;
const $movieContainer = $('#movie-container');

const appendMovie = (title, rating) => {
    $movieContainer.append(
        $('<div></div>').append(
            $(`<h2>`, {text : `${title} ${rating}/10`}).attr('title', title).attr('rating', rating)
        ).append(
            $(`<button>`, {text : 'Remove'}).on('click', (e) => {
                $(e.target).closest('div').remove();
            })
        ).css({
            display : 'flex', 
            'justify-content' : 'center'
        })
    );
}

const sortByRating = () => {
    let sorted = [], movieData = $movieContainer.find('h2');

    for(let rating = 0; rating < 11; rating++) {
        movieData.toArray().forEach(value => {
            let movieRating = value.getAttribute('rating');

            if(rating === +movieRating) {
                sorted.push(value);
            }
        })
    }

    $movieContainer.empty();
    
    sorted.forEach((movie) => {
        appendMovie(movie.getAttribute('title'), movie.getAttribute('rating'));
    })
}

$movieContainer.on('click', (e) => {
    if($movieContainer.children().length === 0) {
        $sort.css('visibility', 'hidden')
    }
})

$('#movie-form').on('submit', (e) => {
    $sort = $('#sort-button');

    if($sort.css('visibility') == 'hidden') {
        $sort.css('visibility', '')
    }

    e.preventDefault();
    const [title, rating] = [$('input').eq(0).val(), $('input').eq(1).val()];

    if(title.length < MIN_LENGTH || rating < MIN_RATING || rating > MAX_RATING) {
        return;
    }

    appendMovie(title, rating);
    $('#movie-form').trigger('reset');
})

$('#sort-button').on('click', () => sortByRating())
