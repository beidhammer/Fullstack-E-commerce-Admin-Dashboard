[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/1bftJdOk)

![Noroff](http://images.restapi.co.za/pvt/Noroff-64.png)
# Noroff
## Back-end Development Year 1
### EP - Course Assignment Back-end


Startup code for Noroff back-end development 1 - EP course (e-commerce). Ensure that your back-end and front-end code are in the respective folders

- [back-end folder for back-end code (back-end)](./back-end)
- [front-end folder for front-end code (front-end)](./front-end)

Instruction for the course assignment is in the LMS (Moodle) system of Noroff.
[https://lms.noroff.no](https://lms.noroff.no)

![IMPORTANT](http://images.restapi.co.za/pvt/important_icon.png)

You will not be able to make any submission after the deadline of the course assignment. Make sure to make all your commit **BEFORE** the deadline

Only your main branch will be graded.

![HELP](http://images.restapi.co.za/pvt/help_small.png)

If you are unsure of any instructions for the course assignment, contact out to your teacher on **Microsoft Teams**.

**REMEMBER** Your Moodle LMS submission must have your repository link **AND** your Github username in the text file.

---

Fullstack E-commerce Admin Dashboard

This is a fullstack project developed for the Noroff Fullstack Development course final exam. It includes a secure backend API with admin functionality, and a simple frontend admin dashboard to manage users, roles, products, and orders.

Technologies Used

Backend
- Node.js
- Express.js
- Sequelize (ORM)
- MySQL
- JWT (Authentication)
- Swagger (API Documentation)

Frontend
- Express with EJS Templates
- Bootstrap 5
- Axios

---

Installation

Prerequisites
- Node.js & npm
- MySQL installed and running

Clone the Repository
```bash
git clone https://github.com/noroff-backend-1/aug23pt-ep-ca-1-beidhammer

BAckend Setup
cd back-end
npm install

Create a .env file
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=exam_project
JWT_SECRET=your_jwt_secret

then run
npx sequelize-cli db:create
npm run dev

test the database seeding
POST http://localhost:3000/init
 or
Once the backend server is running, Swagger is available at:
http://localhost:3000/doc

Frontend Setup
cd ../front-end
npm install
npm start

Open the admin interface at:
http://localhost:3001/login

A default admin user is created via the /init route:
{
  "email": "admin@noroff.no",
  "password": "P@ssword2023"
}

Testing:
Basic testing has been done using:

Jest - by running npm tests

Postman

Swagger

Manual interaction through the admin frontend

References:
The following resources were used during development:

Express.js Documentation https://expressjs.com/

Sequelize ORM Docs https://sequelize.org/

JWT Info https://jwt.io/

Swagger Documentation
 
BcryptJS https://www.npmjs.com/package/bcryptjs

Axios https://axios-http.com/

EJS Templates https://ejs.co/

ChatGPT – Assistance with debugging, and planning