const colors = ['#FF0000', '#0000FF', '#00FF00', '#FFFF00', '#800080', '#FFA500', '#00FFFF', '#FFC0CB'];
const container = document.getElementById('game-container');
const score = document.getElementById('score');
const lowestScore = document.getElementById('low-score');

// Shuffles the contents of a collection
const shuffle = (collection) => {
    for(let i = 0; i < collection.length; i++) {
        let index = Math.floor(Math.random() * collection.length);
        let prevValue = collection[i];

        collection[i] = collection[index];
        collection[index] = prevValue;
    }

    return collection;
}

let board = initBoard();
let counter = 0;
pushBoard();

if(localStorage.getItem('lowestScore') == null) {
    localStorage.setItem('lowestScore', '0')
}

lowestScore.innerHTML = 'LOW SCORE = ' + localStorage.getItem('lowestScore');

// Returns a finished game board
function initBoard() {
    return shuffle([...colors, ...colors]);
}

// Populates HTML container with tiles representing a game board
function pushBoard() {
    board.forEach((element) => {
        let tile = document.createElement('div');
        tile.setAttribute('hiddenColor', element);
        tile.style.backgroundColor = '#1e1e1e';
        tile.classList.add('tile');

        container.appendChild(tile);
    })
}

// Handles each click event on a tile element
container.addEventListener("click", (event) => {
    const target = event.target;

    if(target.id != 'game-container') {
        target.style.backgroundColor = target.getAttribute('hiddenColor');

        let focused = getFocusedTiles();
        removeClickable(focused);

        if(focused.length >= 2 && focused[0].style.backgroundColor == focused[1].style.backgroundColor) {
            focused.forEach((element) => {
                element.classList.add('tile-complete');
                element.style.pointerEvents = 'none';
            })
        } else if(focused.length >= 2) {
            container.style.pointerEvents = 'none';

            setTimeout(() => {
                for(let i = 0; i < focused.length; i++) {
                    focused[i].style.backgroundColor = '#1e1e1e';
                    focused[i].style.pointerEvents = 'all';
                }

                container.style.pointerEvents = 'all';
            }, 1200);
        }

        incrementScore();

        if(gameIsComplete()) {
            updateLowestScore();
        }
    }
})

// Disables click events on elements in a collection
function removeClickable(collection) {
    collection.forEach((element) => {
        element.style.pointerEvents = 'none';
    })
}

// Returns the currently focused tiles
function getFocusedTiles() {
    let focused = [];

    for(let i = 0; i < container.children.length; i++) {
        let child = container.childNodes[i];

        if(child.style.backgroundColor != 'rgb(30, 30, 30)' && child.classList.length < 2) {
            focused.push(container.childNodes[i]);
        }
    }

    return focused;
}

// Returns true or false if all tiles have been matched
function gameIsComplete() {
    for(let i = 0; i < container.children.length; i++) {
        let child = container.children[i];

        if(!child.classList.contains('tile-complete')) {
            return false;
        }
    }

    return true;
}

// Updates the lowest score stored in the browser's local storage
// * IF score < lowestScore
function updateLowestScore() {
    let lowScore = parseInt(localStorage.getItem('lowestScore'));

    if(lowScore == 0 || counter < lowScore) {
        localStorage.setItem('lowestScore', JSON.stringify(counter));
        lowestScore.innerHTML = 'LOW SCORE = ' + localStorage.getItem('lowestScore');
    }
}

// Increments the current score
function incrementScore() {
    score.innerHTML = 'SCORE = ' + (++counter);
}