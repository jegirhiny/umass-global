### Conceptual Exercise

Answer the following questions below:

- What are important differences between Python and JavaScript?

* Python is primary used for server-side development 
* JavaScript is a client-side language

- Given a dictionary like ``{"a": 1, "b": 2}``: , list two ways you can try to get a missing key (like "c") *without* your programming crashing.

* if "c" in dict
* .get("c". None)

- What is a unit test?

* Tests an individual function to ensure it's working

- What is an integration test?

* Tests a group of components to ensure they work together

- What is the role of web application framework, like Flask?

* Flask provides a structured way to build web applications that is scalable and maintainable.

- You can pass information to Flask either as a parameter in a route URL (like '/foods/pretzel') or using a URL query param (like 'foods?type=pretzel'). How might you choose which one is a better fit for an application?

* Parameter when the data is essential
* Query when the data is optional

- How do you collect data from a URL placeholder parameter using Flask?

* Access it in the corresponding view function

- How do you collect data from the query string using Flask?

* Using request.args.get('param_name')

- How do you collect data from the body of the request using Flask?

* Using request.json

- What is a cookie and what kinds of things are they commonly used for?

* A small piece of data stored on the clients browser, commonly used for session management

- What is the session object in Flask?

* A dictionary-like object allowing you to store information

- What does Flask's `jsonify()` do?

* Serializes an object to a JSON format