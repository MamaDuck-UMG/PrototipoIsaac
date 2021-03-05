# Mama Duck

## Admin graphic interface using CRUD for user storage.

---

## Dependencies

-  bcryptjs
-  body-parser
-  connect-flash
-  d3
-  dotenv
-  express
-  express-handlebars
-  express-mysql-session
-  express-session
-  morgan
-  mysql
-  passport
-  passport-local
-  timeago.js

---

## **_CRUD_**

CRUD implementation: In this section an admin could be created and register by filling the full name, username, and password section.<br>

Using INSERT to CREATE (C)<br>
Using SELECT to READ (R)<br>
Using UPDATE to UPDATE (U)<br>
Using DELETE to DELETE (D)<br>

It's important for us to protect the given information, that's why all the data is transfer to out own database. Just as you need protection for user passwords, that is why they are encrypted with salt and hash.
