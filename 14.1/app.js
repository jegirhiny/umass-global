$(document).ready(() => console.log('Let’s get ready to party with jQuery!'));

$('article').find('img').addClass('image-center');

$('p').last().remove();

$('#title').css('font-size', `${Math.random() * 101}px`);

$('ol').append($('<li>', {text: 'Whatever I want to say!</li>'}));

$('aside').empty().append($('<p>', {text: 'Sorry, the list had to be deleted >:)'}));

$('.form-control').on('keyup', () => {
    const inputs = $('.form-control');

    $('body').css('background-color', `rgb(${inputs.eq(0).val()}, ${inputs.eq(1).val()}, ${inputs.eq(2).val()})`);
})

$('img').on('click', (e) => $(e.target).remove())