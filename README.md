code for Noroff back-end development 1 - SRV CA

Remember to create a cloud MySQL service you can use [Aiven.io](https://aiven.io)

**Important** - delete your service once you are completed.

#### .env file

Create a .env file with your login credentials from Aiven.io

```js
HOST = ADMIN_USERNAME = ADMIN_PASSWORD = DATABASE_NAME = DATABASE_PORT = 3306;
DIALECT = "mysql";
DIALECTMODEL = "mysql2";
PORT = "3000";
```

This is a test commit - my submission for the SRV CA

Very basic authentication was used for this Application.
I have not used Passport.js and Token Secret as it was requested to use Basic authentication only.

Testing the API in Postman:
Basic authentication in the headers:
Frontend testing:
go to http://localhost:3000/ to test the Frontend version of the app instead of Backend only.
