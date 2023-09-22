const input = document.querySelector('#fruit');
const suggestions = document.querySelector('.suggestions ul');

const fruit = ['Apple', 'Apricot', 'Avocado 🥑', 'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry', 'Boysenberry', 'Currant', 'Cherry', 'Coconut', 'Cranberry', 'Cucumber', 'Custard apple', 'Damson', 'Date', 'Dragonfruit', 'Durian', 'Elderberry', 'Feijoa', 'Fig', 'Gooseberry', 'Grape', 'Raisin', 'Grapefruit', 'Guava', 'Honeyberry', 'Huckleberry', 'Jabuticaba', 'Jackfruit', 'Jambul', 'Juniper berry', 'Kiwifruit', 'Kumquat', 'Lemon', 'Lime', 'Loquat', 'Longan', 'Lychee', 'Mango', 'Mangosteen', 'Marionberry', 'Melon', 'Cantaloupe', 'Honeydew', 'Watermelon', 'Miracle fruit', 'Mulberry', 'Nectarine', 'Nance', 'Olive', 'Orange', 'Clementine', 'Mandarine', 'Tangerine', 'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Plantain', 'Plum', 'Pineapple', 'Pomegranate', 'Pomelo', 'Quince', 'Raspberry', 'Salmonberry', 'Rambutan', 'Redcurrant', 'Salak', 'Satsuma', 'Soursop', 'Star fruit', 'Strawberry', 'Tamarillo', 'Tamarind', 'Yuzu'];

/**
 * Searches for substrings in an array and returns the matching elements.
 * @param {string} str - The substring to search for.
 * @returns {Array} Collection containing matching elements.
 */
function search(str) {
	if(str.length === 0) {
		return [];
	}

	let results = [];

	fruit.forEach(value => {
		if(value.toLowerCase().includes(str.toLowerCase())) {
			results.push(value);
		}
	})
	
	return results;
}

/**
 * Handles the search input event.
 * @param {Event} e - The search input event.
 */
function searchHandler(e) {
	showSuggestions(search(e.target.value));
}

/**
 * Appends search suggestions on the web page.
 * @param {Array} results - Collection of suggestions to display.
 */
function showSuggestions(results) {
	suggestions.innerHTML = '';

	results.forEach(value => {
		let li = document.createElement('li');
		li.innerText = value;

		suggestions.append(li);
	})
}

/**
 * Clears all suggestions and updates the input field.
 * @param {Event} e - The suggestion click event
 */
function useSuggestion(e) {
	showSuggestions([]);
	input.value = e.target.innerText;
}

input.addEventListener('keyup', searchHandler);
suggestions.addEventListener('click', useSuggestion);