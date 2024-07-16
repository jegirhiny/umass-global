### Conceptual Exercise

Answer the following questions below:

- What is a JWT?
A JSON Web Token is a token to authenticate a payload between two parties.

- What is the signature portion of the JWT?  What does it do?
The signature verifies the original payload has not been changed.

- If a JWT is intercepted, can the attacker see what's inside the payload?
Yes, the attacker will be able to see the payload.

- How can you implement authentication with a JWT?  Describe how it works at a high level.
The server generates a token that would then be sent in a request header to authenticate that user.

- Compare and contrast unit, integration, and end-to-end tests.
Unit tests focus on specific components, integration tests check how those components work together, and end-to-end tests validate the program.

- What is a mock? What are some things you would mock?
Mock, mimics the behavior of some objects, used to test APIs.

- What is continuous integration?
Process of watching code changes that will immediately be tested.

- What is an environment variable and what are they used for?
An environment variable is accessible within the scope, commonly for configuration.

- What is TDD? What are some benefits and drawbacks?
TDD is where tests are written before code, with fewer errors but slower development.

- What is the value of using JSONSchema for validation?
JSONSchema provides a structure that verifies JSON data.

- What are some ways to decide which code to test?
Areas prone to error and change.

- What does `RETURNING` do in SQL? When would you use it?
Returns the values affected by the statement; used when looking for the output.

- What are some differences between Web Sockets and HTTP?
Web sockets are long-lived, establishing a communication channel while HTTP is request and response.

- Did you prefer using Flask over Express? Why or why not (there is no right answer here --- we want to see how you think about technology)?
Express, as it is JavaScript-based and more suitable for a wide range of projects.