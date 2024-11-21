code for Noroff back-end development 1 - SRV CA

Remember to create a cloud MySQL service you can use [Aiven.io](https://aiven.io)

**Important** - delete your service once you are completed.

![](http://143.42.108.232/pvt/Noroff-64.png)

# Noroff

## Back-end Development Year 1

### SERVER - Course Assignment 1 <sup>V2</sup>

# CENSUS - APPLICATION

- This application allows an admin to manually manage participants details, and save their data into a cloud database.
- I have used the free version of [Aiven.io](https://aiven.io), and the free version of https://render.com/
- Below is the guide on how to install, configure, and use the project.

## Table of Contents

1. Installation
2. Environment Variables
3. Additional Libraries/Packages
4. NodeJS Version Used
5. Database Setup
6. Testing with Postman
7. Example Postman Setup:
8. Deplyment to Render.com
9. Additional notes and instructions:

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

-Run the program by typing npm start.
-You should see the following message confirming successful connection to the datbase: "Database connected and syncronized"
-Enter the following link into your web browser:

```bash
node
http://localhost:3000/
```

-Press the login button and enter the correct admin credentials mentioned earlier.
-The proceed to application button should not direct you to the application as only the authenticated admin is able to enter.
-You should receive a Successful login message, and be directed to the Application.
-Only the authenticated admin can successfully login, as there are no signup page for this application.
-fill in the form, and press the Add Participant button at the bottom of the page to add a Participant to the cloud database.
-Once an entry has been made, you can press edit, delete, work details and home details to play around with the details.
-You will not be able to change the email of a Participant as the email is used for the other functions to work properly, in case you typed it wrong, it's better to delete the Participant and make a new entry.

- ***

## Testing Backend only with Postman:

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

1. **POST: http://localhost:3000/participants/add:** Route to add a new Participant to the database.
2. **GET: http://localhost:3000/participants:** Route to get all participants in JSON format from the database.
3. **GET: http://localhost:3000/participants/details:**Route to get all personal details of participants from the database.
4. **GET: http://localhost:3000/participants/details/example@example.com:**Route to get a specific Participant's detail by their email.
   Replace "example@example.com" with the email of the participant saved in the database.
5. **DELETE: http://localhost:3000/participants/example@example.com**: Route to delete a Participant by their email.
6. **PUT: http://localhost:3000/participants/example@example.com:**Route to update a participant by their email.
7. **GET: http://localhost:3000/participants/work/example@example.com:** Route to get participant Work info by their email.
8. **GET: http://localhost:3000/participants/home/example@example.com:** Route to get Participant home details by their email.

---

## Deployment:

To deploy on Render.com, follow these steps:

Sign in to Render.com and create a new Node.js web service.
Link your GitHub repository to Render.
Set the Start Command as npm start.
Set the Environment Variables (from your .env file).
Click "Deploy" to deploy the app.

---

## Additional notes and instructions:

- Before testing the endpoints and functions of the application, both Frontend and Backend versions, make sure an admin user exists in the Admins table in the MySQL cloud database.
- You will not be able to login and enter ANY of the endpoints as they are protected by authorization.
