"use strict";

const $showsList = $("#showsList");
const $episodesArea = $("#episodesArea");
const $searchForm = $("#searchForm");

const defaultImage = 'http://static.tvmaze.com/uploads/images/medium_portrait/160/401704.jpg';


/** Given a search term, search for tv shows that match that query.
 *
 *  Returns (promise) array of show objects: [show, show, ...].
 *    Each show object should contain exactly: {id, name, summary, image}
 *    (if no image URL given by API, put in a default image URL)
 */

async function getShowsByTerm(searchTerm) {
  const res = await axios.get('http://api.tvmaze.com/search/shows', {params : {q : searchTerm}}), shows = [];

  res.data.forEach(value => {
    let show = value.show;

    if(show.image == null) {
      show.image = {};
      show.image.medium = defaultImage;
    }

    shows.push(value.show);
  })

  return shows;
}


/** Given list of shows, create markup for each and to DOM */

function populateShows(shows) {
  $showsList.empty();

  for (let show of shows) {
    const $show = $(
      `<div data-show-id="${show.id}" class="Show col-md-12 col-lg-6 mb-4">
         <div class="media">
           <img
              src=${show.image.medium}
              alt="Bletchly Circle San Francisco"
              class="w-25 me-3">
           <div class="media-body">
             <h5 class="text-primary">${show.name}</h5>
             <div><small>${show.summary}</small></div>
             <button class="btn btn-outline-light btn-sm Show-getEpisodes">
               Episodes
             </button>
           </div>
         </div>
       </div>
      `);

    $showsList.append($show);
  }
}


/** Handle search form submission: get shows from API and display.
 *    Hide episodes area (that only gets shown if they ask for episodes)
 */

async function searchForShowAndDisplay() {
  const term = $("#searchForm-term").val();
  const shows = await getShowsByTerm(term);

  $episodesArea.hide();
  populateShows(shows);
}

$searchForm.on("submit", async function (evt) {
  evt.preventDefault();
  await searchForShowAndDisplay();
});

$showsList.on('click', '.btn', async function (evt) {
  const id = $(evt.target).closest('.Show').attr('data-show-id');
  const episodes = await getEpisodesOfShow(id);

  populateEpisodes(episodes);
});

/** Given a show ID, get from API and return (promise) array of episodes:
 *      { id, name, season, number }
 */

async function getEpisodesOfShow(id) {
  const episodes = await axios.get(`http://api.tvmaze.com/shows/${id}/episodes`);

  return episodes.data;
}

/** Write a clear docstring for this function... */

function populateEpisodes(episodes) {
  const $episodesList = $('#episodesList');
  $episodesList.empty();
  $episodesArea.show();

  episodes.forEach(episode => {
    $episodesList.append($('<li>', {text : `${episode.name} (${episode.season}, ${episode.number})`}));
  })
}
