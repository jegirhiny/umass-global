const form = document.getElementById('submit-form');
const container = document.getElementById('meme-container');

// Listener resposible for handling form submissions
form.addEventListener("submit", (event) => {
    event.preventDefault();

    let url = document.getElementById('url');
    let topText = document.getElementById('top-text');
    let bottomText = document.getElementById('bottom-text');

    let meme = document.createElement('div');
    let topH2 = document.createElement('h2');
    let bottomH2 = document.createElement('h2');

    meme.classList += 'tile';
    meme.style.backgroundImage = `url("${url.value}")`
    topH2.innerHTML = topText.value;
    bottomH2.innerHTML = bottomText.value;

    meme.appendChild(topH2);
    meme.appendChild(bottomH2);
    container.appendChild(meme);

    form.reset();
})

// Listener resposible for handling container clicks
container.addEventListener("click", (event) => {
    container.removeChild(event.target);
})