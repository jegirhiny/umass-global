// categories is the main data structure for the app; it looks like this:

const NUM_CATEGORIES = 6;
const $table = $('#jeopardy');
const $start = $('#start');
let categories = [];

//  [
//    { title: "Math",
//      clues: [
//        {question: "2+2", answer: 4, showing: null},
//        {question: "1+1", answer: 2, showing: null}
//        ...
//      ],
//    },
//    { title: "Literature",
//      clues: [
//        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
//        {question: "Bell Jar Author", answer: "Plath", showing: null},
//        ...
//      ],
//    },
//    ...
//  ]


/** Get NUM_CATEGORIES random category from API.
 *
 * Returns array of category ids
 */

async function getCategoryIds() {
    const resArray = (await axios.get('http://jservice.io/api/categories', {params : {count : NUM_CATEGORIES, offset : Math.floor(Math.random() * 101)}})).data;

    return resArray.map(category => category.id);
}

/** Return object with data about a category:
 *
 *  Returns { title: "Math", clues: clue-array }
 *
 * Where clue-array is:
 *   [
 *      {question: "Hamlet Author", answer: "Shakespeare", showing: null},
 *      {question: "Bell Jar Author", answer: "Plath", showing: null},
 *      ...
 *   ]
 */

async function getCategory(catId) {
    return (await axios.get('http://jservice.io/api/category', {params : {id: catId}})).data;
}

/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */

function fillTable() {
    const $thead = $table.find('thead');
    const $theadTr = $thead.append('<tr>').find('tr');

    categories.forEach(category => {
        $theadTr.append($('<td>', {text : category.title}))
    })

    const $body = $table.find('tbody');

    console.log(categories)
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
    $()

    setupAndStart();
})

/** On page load, add event handler for clicking clues */

