### Conceptual Exercise

Answer the following questions below:

- What is the purpose of the React Router?
* React Router renders different components based on the URL.

- What is a single page application?
* With a single page application, the application is contained within one HTML page; rewriting this page with new data.

- What are some differences between client side and server side routing?
* Client side initially loads the entire application, while server side determines requests the files based on the requested URL.

- What are two ways of handling redirects with React Router? When would you use each?
* Redirects may be handled in a variety of ways; the most common being the Redirect component or History object.

- What are two different ways to handle page-not-found user experiences using React Router? 
* Page-not-found errors can be handled by using a route with an empty path attribute or the useRouteError.

- How do you grab URL parameters from within a component using React Router?
* Personally, I use the useParams hook to access the URL's parameters.

- What is context in React? When would you use it?
* Context allows you to share data between components; use context when not wanting to pass props.

- Describe some differences between class-based components and function components in React.
* A functional component is a JavaScript function that accepts props and returns a React element whereas the class component forces you to extend from React and render a function that returns a React element.

*A functional component is just a plain JavaScript pure function that accepts props as an argument and returns a React element(JSX). A class component requires you to extend from React. Component and create a render function that returns a React element.


- What are some of the problems that hooks were designed to solve?
* Hooks were designed to improve code reusability and to manage side effects.