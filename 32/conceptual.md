### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?
    * Async/Await
    * Promisess 

- What is a Promise?
    * A value that may be available now, later, or never.

- What are the differences between an async function and a regular function?
    * Async function explicity returns a promise; primarily used with await to stop further executiom until a promise is resolved.

- What is the difference between Node.js and Express.js?
    * Node.js is used to execute JavaScript (server-side) while Express.js is used to build web applications.

- What is the error-first callback pattern?
    * Error-first is a pattern where the first parameter of the function is reserved for an error object.

- What is middleware?
    * Middleware functions run between the receiving of the request and the sending of the response.

- What does the `next` function do?
    * The `next` function is used to call the next middleware function to continue execution.

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)
    * Could be refactored to include: concurrent requests, error handling, and better naming conventions.

```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```
