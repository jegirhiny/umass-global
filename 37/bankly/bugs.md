1.  Location: models/user.js

Description: The User.get method does not throw an error when a user is not found.

Fix: Update the User.get method to properly throw an error when a user is not found.

2.  Location: helpers/createToken.js

Description: The JWT token created does not include an expiration time.

Fix: Add an expiration time to the JWT token creation process.

3.  Location: routes/users.js

Description: The requireAdmin middleware restricts access to only admins.

Fix: Remove the requireAdmin middleware to allow access for non-admin users.

4.  Location: middleware/auth.js

Description: The requireAdmin middleware only checks req.curr_admin.

Fix: Implement strict checking for req.curr_admin in the requireAdmin middleware.

5.  Location: middleware/auth.js

Description: The authUser function uses jwt.decode instead of jwt.verify.

Fix: Update the authUser function to use jwt.verify.

6.  Location: helpers/parialUpdate.js

Description: The key variable in the for-in loop shadows the parameter key.

Fix: Rename the variable inside the loop to avoid shadowing.
