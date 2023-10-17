const $notification =  $('#notification');
const $form = $('#word-form');
const $score = $('#score');
const $played = $('#played');
const $highScore = $('#high-score');
const $restartButton = $('#restart');
let notificationTimeout;

function displayResponse(response) {
    $notification.text(response);
    $notification.css('visibility', 'visible');

    if (notificationTimeout) {
        clearTimeout(notificationTimeout);
    }

    notificationTimeout = setTimeout(() => {
        $notification.css('visibility', 'hidden');
    }, 3000);
}

function updateScore(isValid, score) {
    if(!isValid) {
        return;
    }

    let currentScore = parseInt($score.text().replace('Score: ', ''));
    $score.text('Score: ' + (currentScore + score));
}

function updateGamesPlayed(played) {
    $played.text('Game: ' + played);
}

function updateHighScore(highScore) {
    $highScore.text('High Score: ' + highScore);
}

$form.on('submit', async (e) => {
    e.preventDefault();

    const $word = $('#word');
    const wordLiteral = $word.val();
    const wordScoreVal = wordLiteral.length;

    let res = await axios.post('/validate_word', { word: wordLiteral });

    displayResponse(res.data.result);
    updateScore(res.data.result == 'ok', wordScoreVal);

    setTimeout(async () => {
        $form.hide();

        let res = await axios.post('/update_statistics', { score: wordScoreVal });
        updateGamesPlayed(res.data.played);
            
        if(res.data.newHighScore) {
            updateHighScore(res.data.highScore);
        }

        updateScore(true, 0);

        $restartButton.trigger('click');
    }, 60000);

    $form.trigger('reset');
})

$restartButton.on('click', async () => {
    let res = await axios.get('/restart_game');

    for (let i = 0; i < res.data.board.length; i++) {
        for (let j = 0; j < res.data.board[i].length; j++) {
            const $letter = $(`.row:eq(${i}) h2:eq(${j})`);
            $letter.text(res.data.board[i][j]);
        }
    }
});