const form = document.getElementById("main-form");
const contents = document.getElementById("list-contents");

// Listener resposible for handling a loaded page 
document.addEventListener("DOMContentLoaded", () => {
    if(localStorage.getItem("counter") == null) {
        localStorage.setItem("counter", "0");
    }

    let data = [];

    for(let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);

        if(!key.startsWith("counter")) {
            let taskData = JSON.parse(localStorage.getItem(key));

            let dataObject = {
                key: taskData.key,
                description: taskData.description,
                completed: taskData.completed
            }

            data.push(dataObject);
        }
    }

    data.sort((a, b) => parseInt(a.key) - parseInt(b.key));

    for(let i = 0; i < data.length; i++) {
        appendToList(data[i]);
    }
})

// Listener resposible for handling form submissions
form.addEventListener("submit", (event) => {
    event.preventDefault();
    let taskValue = document.getElementById("task-value").value;
    
    if(taskValue != '') {
        let dataObject = {
            key: localStorage.getItem("counter"),
            description: taskValue,
            completed: false
        }

        appendToList(dataObject);
        saveToStorage(dataObject);
        localStorage.setItem("counter", (parseInt(localStorage.getItem("counter")) + 1).toString());

        form.reset();
    }
})

// Listener resposible for handing clicks on list contents
contents.addEventListener("click", (event) => {
    let type = event.target.tagName;

    if(type == "BUTTON") {
        removeFromStorage(event.target.getAttribute("lookup"));
        event.target.parentElement.remove();
    } else if(type == "H2") {
        event.target.classList.toggle("completed");
        
        let lookup = event.target.children[0].getAttribute("lookup");
        let dataObject = JSON.parse(localStorage.getItem(lookup));
        dataObject.completed = !dataObject.completed;

        localStorage.setItem(lookup, JSON.stringify(dataObject));
    }
})

/**
 * Adds a new task to the pre-existing list
 * @param {*} taskValue
 */
function appendToList(data) {
    let submission = document.createElement("h2");
    let button = document.createElement("button");

    submission.innerText = data.description;
    submission.classList += data.completed ? " completed" : "";
    
    button.setAttribute("lookup", data.key);
    button.innerText = "X";

    submission.append(button);
    contents.appendChild(submission);
}

/**
 * Saves the task to local storage
 * @param {*} data 
 */
function saveToStorage(data) {
    localStorage.setItem(localStorage.getItem("counter"), JSON.stringify(data));
}

/**
 * Removes the task from local storage
 * @param {*} lookup 
 */
function removeFromStorage(lookup) {
    localStorage.removeItem(lookup);
}