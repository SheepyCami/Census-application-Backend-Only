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

[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/khtNd_zz)

![](http://143.42.108.232/pvt/Noroff-64.png)

# Noroff

## Back-end Development Year 1

### REST API - Course Assignment 1 <sup>V2</sup>

# myTodo - API

- This application allows users to manage todos with categories and statuses through an API.
- Below is the guide on how to install, configure, and use the project.

## Table of Contents

1. Installation
2. Environment Variables
3. Additional Libraries/Packages
4. NodeJS Version Used
5. Database Setup
6. Usage Instructions - Initialize and Sync the Database
7. Testing with Swagger
8. Generating a Bearer Token
9. Testing with Postman
10. Example Postman Setup:
11. Testing with Jest
12. Additional notes and instructions:

---

## Installation

1. Download the Project Files or Clone the repository:

```bash
  git clone <your-repository-url>
  cd my-project
```

2. Set your directory folder for running the project:

For Example:

```
cd "\Skrivebord\CensusApp\SheepyCami-jan24ft-SRV-CA-SheepyCami"
```

3.  **Install dependencies:** Once inside the project directory, install the necessary dependencies by running:

```bash
 npm install
```

All required packages are listed in the package.json file. You can also manually install the required packages by using the command:

```
npm install package_name@version
```

Refer to the package.json file for the exact versions of the packages used in this project.

---

## Environment Variables

1. Inside your project directory, create a new .env file (you can use the terminal or file explorer).
2. Use the provided env_example file as a reference for setting up your environment variables.
3. The .env file is used to connect to the MySQL cloud database at Aiven.io
4. Make sure you copy the information exactly in order to connect successfully to Aiven.io

Example .env file:

```bash
node
HOST = mysql-16e737af-student-1.b.aivencloud.com
ADMIN_USERNAME = avnadmin
ADMIN_PASSWORD = AVNS_8jnBDvuRVokVtxm1rYz
DATABASE_NAME = defaultdb
DATABASE_PORT = 15036
DIALECT = "mysql"
DIALECTMODEL = "mysql2"
PORT = "3000"
```

- Make sure the .env file is included in your .gitignore file to avoid exposing sensitive information.

---

## Additional Libraries/Packages

Here are the core libraries and packages used in this project:

- **bcrypt ^5.1.1:** _A library for hashing passwords, used for securely storing and comparing password hashes._
- **body-parser ^1.20.3:** _Middleware for parsing incoming request bodies in a middleware before your handlers, available under the `req.body` property._
- **bootstrap ^5.3.3:** _A popular CSS framework for building responsive and modern web applications._
- **cookie-parser ^1.4.7:** _Parses cookies attached to the client request object._
- **debug ^4.3.7:** _A small debugging utility for tracking application flow._
- **dotenv ^16.4.5:** _Loads environment variables from a .env file into process.env._
- **ejs ^3.1.10:** _A templating engine for rendering HTML with JavaScript._
- **express ^4.21.1:** _A fast, unopinionated, and minimalist web framework for Node.js._
- **express-session ^1.18.1:** _A simple session middleware for Express to handle session data._
- **http-errors ^2.0.0:** _Creates HTTP error objects, especially useful for handling 404 and other HTTP errors._
- **jquery ^3.7.1:** _A fast, small, and feature-rich JavaScript library to simplify HTML document traversal and manipulation._
- **morgan ^1.10.0:** _A logging middleware for recording HTTP requests and responses._
- **mysql2 ^3.11.4:** _An improved MySQL client supporting async/await and prepared statements._
- **passport ^0.7.0:** _Authentication middleware for Node.js, supporting various strategies such as local and OAuth._
- **passport-local ^1.0.0:** _Local authentication strategy for Passport, used to authenticate users with a username and password._
- **sequelize ^6.37.5:** _A promise-based ORM for Node.js, providing database abstraction for MySQL and other databases._

- You can find the full list in the package.json file.
- To manually install any package, run:

```
  npm install package_name@version
```

---

## NodeJS Version Used

The project was developed using Node.js version **22.2.0** Ensure you are using this version or a compatible version.
You can check your current Node.js version by running:

```
node -v
```

---

## Database Setup

This application requires MySQL connected to Aiven.io as the database. You can download MySQL and MySQL Workbench from MySQL's official website
You can go to the Cloud Database by going to the following link:

- Conncet to the Cloud Database in Workbench by following these steps:

1.  Connect successfully to the Aivin Cloud Database by ensuring your .env file is set up correctly as mentioned above.
2.  Initialize and create the Tables by locating the following line in your app.js file:

```bash
node
// Sync database
db.sequelize
  .sync({ force: false })
  .then(() => console.log("Database connected and synchronized"))
  .catch((err) => console.error("Error syncing database:", err));
```

change this line to:

```bash
db.sequelize
  .sync({ force: true })
  .then(() => console.log("Database connected and synchronized"))
  .catch((err) => console.error("Error syncing database:", err));
```

Start the application by running:

```
npm start
```

**\*IMPORTANT!:** This line is only use for the first time of running the program. Change back to "false" after the tables have been successfully created and loaded into the database!

3.  Open MySQL Workbench and run the following SQL commands to create an Admin user for the Admin Table.

```bash
node
INSERT INTO Admins (username, password) VALUES ('admin', 'P4ssword');
```

- This will create an admin user for the Admins table with the username "admin" and password "P4ssword"
- This information can also be copied and found from the file admincredential.json in the data folder.
- Confirm the Admin user has been sucesffuly created by running the following command in MySQL:

```bash
node
SELECT * FROM defaultdb.Admins;
```

---

## Testing Frontend Application:

---

## Testing Backend only with Postman:

1. Similar to Swagger, you can use Postman to test the API endpoints.
2. Register and log in a user via the /users/signup and /users/login routes.
3. Copy the token generated during login.
4. In the Authorization tab of Postman, set the Auth Type to Bearer Token and paste the token.

---

## Example Postman Setup:

- In order to autherize as an admin user, you need to localize the **Headers** and enter the following 3 keys:

| Key          | Value            |
| ------------ | ---------------- |
| username     | admin            |
| password     | P4ssword         |
| Content-Type | application/json |

- Body tab: Ensure it's set to **raw** and **JSON.**
- The following CRUD API endpoints can be tested by using POST, PUT, GET or DELETE:

---

## Additional notes and instructions:

- Before creating a todo, make sure to create some categories first for your database, as a category ID is required for new todos.
- Before running a test with Jest, make sure a category have been added to the database as this will result in 2 tests failing without categories.
- Make sure to sign up a user, before you try to login to generate the token.
- Always make sure to set to Bearer token before excecuting.
- **Database Issues:** Verify that your MySQL server is running and that the credentials in the .env file match your MySQL user and database information.
- Make sure to grant the required priviliges to your admin user in the database.
- To reset your database, change the line of code back to "true" in the app.js file, and repeat the steps mentioned above.
- If you encounter any issues, feel free to check the logs for more detailed error messages or refer to the documentation for each package used in this project.
- Happy testing!
