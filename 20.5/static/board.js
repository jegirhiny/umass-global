const $notification =  $('#notification');
const $form = $('#word-form');
const $score = $('#score')
let notificationTimeout;

function displayResponse(response) {
    $notification.text(response);
    $notification.show();

    if (notificationTimeout) {
        clearTimeout(notificationTimeout);
    }

    notificationTimeout = setTimeout(() => {
        $notification.hide();
    }, 3000);
}

function updateScore(isValid, score) {
    if(!isValid) {
        return;
    }

    let currentScore = parseInt($score.text().replace('Score: ', ''));

    $score.text('Score: ' + (currentScore + score));
}

$form.on('submit', async (e) => {
    e.preventDefault();

    const $word = $('#word');

    let res = await axios.post('/validate_word', { word: $word.val() });

    displayResponse(res.data.result);
    updateScore(res.data.result == 'ok', $word.val().length);

    $form.trigger('reset');
})