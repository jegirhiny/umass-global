const createInstructor = (firstName, lastName) => ({firstName, lastName});

let favoriteNumber = 42;
const instructor = {firstName: "Colt", favoriteNumber};

const instructor = {
    firstName: "Colt",
    sayHi() {
        return "Hi!";
    },
    sayBye() {
        return this.firstName + " says bye!";
    }
}

function createAnimal(species, verb, noise) {
    return {
        species, 
        [verb]() {
            return noise;
        }
    }
}