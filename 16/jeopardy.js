const NUM_CATEGORIES = 6;
const NUM_QUESTIONS_PER_CAT = 5;
const $table = $('#jeopardy');
const $start = $('#start');
let categories = [];

/** Get NUM_CATEGORIES random category from API.
 *    Returns array of category ids
 */

async function getCategoryIds() {
    const resArray = (await axios.get('http://jservice.io/api/categories', {params : {count : NUM_CATEGORIES, offset : Math.floor(Math.random() * 101)}})).data;

    return resArray.map(category => category.id);
}

/** Return object with data about a category:
 *    Returns { title: "Math", clues: clue-array }
 */

async function getCategory(catId) {
    return (await axios.get('http://jservice.io/api/category', {params : {id: catId}})).data;
}

/** Fills the HTML table #jeopardy with the categories & cells for questions. */

function fillTable() {
    const $thead = $table.find('thead');
    const $theadTr = $thead.append('<tr>').find('tr');

    categories.forEach(category => {
        $theadTr.append($('<td>', { text: category.title }));
    });

    const $body = $table.find('tbody');
    const clues = [];

    categories.forEach(category => {
        const categoryClues = getClues(category.clues);

        categoryClues.forEach((clue, index) => {
            if (!clues[index]) {
                clues[index] = [];
            }

            clues[index].push(clue);
        });
    });

    clues.forEach(clueGroup => {
        const $bodyTr = $('<tr>');

        clueGroup.forEach(clue => {
            const $bodyTd = $('<td>', {text : '?'});
            $bodyTd.attr('data', JSON.stringify(clue));
            $bodyTr.append($bodyTd);
        });

        $body.append($bodyTr);
    });
}

function getClues(clueObj) {
    const catQuestions = [];

    for(let i = 0; i < NUM_QUESTIONS_PER_CAT; i++) {
        const index = Math.random() * clueObj.length;
        catQuestions.push(clueObj.splice(index, 1)[0]);
    }

    return catQuestions;
}

/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */

function handleClick(evt) {

}

/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

function showLoadingView() {

}

/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() {

}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */

async function setupAndStart() {
    const categoryIds = await getCategoryIds();
    categories = await Promise.all(categoryIds.map(async (id) => await getCategory(id)));

    fillTable();
}

/** On click of start / restart button, set up game. */

$start.on('click', (evt) => {
    $('#jeopardy').empty().append('<thead>').append('<tbody>');

    setupAndStart();
})

/** On page load, add event handler for clicking clues */

