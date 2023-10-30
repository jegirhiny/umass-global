// Returns a randomly selected item from array of items
const choice = (items) => {
    return items[Math.floor(Math.random() * items.length)];
}

// Removes the first matching item from items, if item exists, and returns it. Otherwise returns undefined.
const remove = (items, item) => {
    const index = items.indexOf(item);

    return (index !== -1 ? items.splice(index, 1)[0] : undefined);
}

export default { choice, remove };