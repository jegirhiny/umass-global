const $form = $('#form');
const $cards = $('#cards');

$form.on('submit', async (e) => {
    e.preventDefault();

    try {
        const response = await fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=1');
        const data = await response.json();

        $cards.append($('<img>', { src: data.cards[0].image, style: `transform: rotate(${Math.random() * 361}deg);` }));
    } catch (error) {
        console.error(error);
    }

    $form.trigger('reset');
})