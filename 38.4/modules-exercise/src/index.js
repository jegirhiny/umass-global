import foods from "./foods";
import { choice, remove } from "./helpers";

let randomFruit = choice(foods);

console.log(`I'd like one ${fruit}, please`);
console.log(`Here you go: ${fruit}`);
console.log(`Delicious! May I have another?`);

let remainingFruits = remove(randomFruit);

console.log(`I'm sorry, we're all out. We have ${remainingFruits.length} left.`);