<h1 align="center">
  <br>
  <a href="https://social-media-by-anand.netlify.app"><img src="https://github.com/Anand-kumar96/social-media-mern-project/assets/106487247/b313c19e-98fa-4f29-a566-bdc6a9786977" alt="Natours" width="200"></a>
  <br>
  Social Media App
  <br>
</h1>

#### By Anand Kumar

This is an awesome Social Media App built on top of  <a href="https://react.dev/" target="_blank">React Js</a> &nbsp; <a href="https://nodejs.org/en/" target="_blank">NodeJS</a>&nbsp; <a href="https://expressjs.com/" target="_blank">Express Js</a>&nbsp; <a href="https://mongoosejs.com/" target="_blank">Mongoose</a>.

## Table of contents

- [Demo](#Demo-)
- [Description](#Description-)
- [Demonstration](#Demonstration-)
- [How To Use](#how-to-use-)
- [API Usage](#api-usage-)
- [Build With](#build-with-)
- [Setup Installation Requirements](#Setup-Installation-Requirements-)
- [Installation](#installation-)
- [Deployment](#deployment-)
- [To-do](#to-do-)
- [Known Bugs](#known-Bugs-)
- [Future Updates](#future-updates-)
- [Useful resources](#useful-resources-)
- [Author](#author-)

## Overview

### Demo 🚀

Live demo (Feel free to visit) 👉🏻 : https://social-media-by-anand.netlify.app/

### Description 📑

&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; This is web based live App of Chat App. This project combines both front-end and back-end technologies to create a seamless user experience and efficient management of user-related data. This is fully Responsive Website for both Mobile and Laptop Screen. Below is a detailed description of the key features of Social Media full-stack project.

#### Key Features 📝

- Authentication and Authorization
  - Implemented secure user authentication and authorization mechanisms to protect user data and ensure the privacy and security of user accounts.
  - Implemented Sign up, Log in, Logout and update user detail functionality.
- User profile
  - Update username, job, city, country, profile image and cover image etc.
  - A user can be either be a regular user or an admin.
  - When a user signs up, that user by default be a regular user.
  - A user can delete their account But it will still be in database as
    user will be inactive. but only admin can permanently delete user account.
- Profile and Timeline
  - Create your personalized profile, add a profile picture, and start sharing your life's journey with posts, photos, on your 
    timeline.
  - When you follow someone then their posts also appear on your feed.
- Messaging
 - User can chat with anyone one real time basis and they also see online and offline status of other user.

## Demonstration 💻

#### Sign-up Page :

![Sign-up](https://github.com/Anand-kumar96/social-media-mern-project/assets/106487247/ecaf045f-b2f3-463d-9656-2d74be050922.gif)

#### Sign-in Page :

![Sign-in](https://github.com/Anand-kumar96/social-media-mern-project/assets/106487247/87086d42-4912-4575-a383-a4e0036fecc8.gif)

#### Home Page :

![Home-Page](https://github.com/Anand-kumar96/social-media-mern-project/assets/106487247/ca273e00-1f22-4bac-a404-ce9cbe69feb5.gif)

#### Profile Details :

![Profile](https://github.com/Anand-kumar96/social-media-mern-project/assets/106487247/c5f390b2-c548-461b-ac96-61eff5d2abb8.gif)

#### Post :

![Payment-Process](https://github.com/Anand-kumar96/social-media-mern-project/assets/106487247/21c6c1c3-6d8d-4e8e-8ff9-14d92f9f8dcf.gif)

#### Chat Page :

![Chat](https://github.com/Anand-kumar96/social-media-mern-project/assets/106487247/41a004a6-281b-4233-93bf-3007519f1ff2.gif)

#### Log Out :

![Log Out](https://github.com/Anand-kumar96/social-media-mern-project/assets/106487247/fd38e613-dd0a-40a7-b3b4-23a7d1e4a302.gif)

## How To Use 🫠

- Sign up to the site
- Login to the site
- Post a text or photo or both.
- Post can be like  and dislike and user can also be followed.
- Can also be message to each other


#### Update your profile

- You can update your own username, city, profile photo and cover picture.

## API Usage 💡

Before using the API, you need to set the environment variables in Postman depending on your environment (development or production). Simply add:

```
- set Authorization as Bearer Token
- {{URL}} with your hostname as value (Eg. http://127.0.0.1:5000 or http://www.example.com)
- {{password}} with your user password as value.
```

Check 👉🏻 [Social Media App API Documentation 💥💥](https://documenter.getpostman.com/view/28574510/2s9Y5Wx3dW) for more info.


## Build With 🎯

- [NodeJS](https://nodejs.org/en/) - JS runtime environment
- [Express](http://expressjs.com/) - Node.js web application framework used
- [Mongoose](https://mongoosejs.com/) - Object Data Modelling (ODM) library for
  MongoDB
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - Cloud database service
- [JSON Web Token](https://jwt.io/) - Security token generator
- [Postman](https://www.getpostman.com/) - API platform for building and testing API
- [Render](https://render.com/) - Cloud platform

## Setup Installation Requirements ⚙

If you wish to play around with the code base in your local environment,then follow these steps:

```
* Clone this repo to your local machine.
* Using the terminal, navigate to the cloned repo.
* Install all the necessary dependencies, as stipulated in the package.json file.
* If you don't already have any account, set up accounts with: MONGODB, LEAFLET, STRIPE, BREAVO, and MAILTRAP. Please ensure to have at least basic knowledge of how these services work. Otherwise go through respective documentation.
* In your .env file, set environment variables for the following:
  - NODE_ENV = development
  - DATABASE = Your_MongoDB_database_Url
  - PASSWORD = Your_MongoDB_password

  - JWT_SECRET = Your_JSON_Web_Token_Secret_Key
  - JWT_EXPIRES_IN = 90d
  - JWT_COOKIES_EXPIRES_IN = 90

  - EMAIL_USERNAME = Your_Mailtrap_username
  - EMAIL_PASSWORD = Your_Mailtrap_password
  - EMAIL_HOST= Mailtrap_Host_Name(sandbox.smtp.mailtrap.io)
  - EMAIL_PORT= Mailtrap_Email_Port
  - EMAIL_FROM = Your_Email_Address

  - BREVO_HOST = Brevo(smtp-relay.brevo.com)
  - BREVO_PORT = Brevo_Email_Port
  - BREVO_LOGIN = Your_Brevo_username
  - BREVO_SMTP_PASSWORD = Your_Brevo_password

  - STRIPE_SECRET_KEY = Stripe_Secret_Key
  - STRIPE_PUBLIC_KEY = Stripe_Public_Key

* Start the server.
* Your app should be running just fine.
```

`example.env` file :
![Example](https://github.com/Anand-kumar96/Natours-app/assets/106487247/fa818222-488e-4848-872a-58bb8775e903.png)

## Installation 🛠
You can fork the app or you can clone the app into your local machine. Once done, please install all the
dependencies by running below command
  ```
  $ npm install
  Set your env variables
  $ npm run watch:js
  $ npm run build:js
  $ npm run dev (for development)
  $ npm run start:prod (for production)
  $ npm run debug (for debug)
  $ npm start
  Setting up ESLint and Prettier in VS Code 👇🏻
  $ npm i eslint prettier eslint-config-prettier eslint-plugin-prettier eslint-config-airbnb eslint-plugin-node
  eslint-plugin-import eslint-plugin-jsx-a11y  eslint-plugin-react --save-dev
    
  ```

## Deployment 🚀

The website is deployed with git into <a href ="https://render.com/">Render</a>. Below are the steps taken:

```
- create an account on render. (Ex:Natours-app)
- create a web service and give a name
- select github repository for your Web Service
- build Command : npm install
- start Command : node server.js (or your root file)
- set up Environment Variables
- add Secret Files
- deployed.
```

## To-do 🗒

* Review and rating
  - Implement Review page so that user can review booked tours from website.
* Booking
  - Prevent duplicate bookings after a user has booked that exact tour 
  - Implement favorite tours page
* Advanced authentication features
  - Two-factor authentication
* And More! There's always room for improvement!

## Known Bugs 🚨
Feel free to email me at <a>anandaryan542@gmail.com</a> if you run into any issues or have any questions, ideas or concerns.
Please  feel free to share your opinion, constructive criticism, or comments about my work. Thank you! 🙂

## Future Updates 🪴

* Improve overall UX/UI and fix bugs
* Implement admin remaining Page.
* Recently Viewed Tours
* And More! There's always room for improvement!

### Useful resources 📚

- [https://www.w3schools.com/](https://www.w3schools.com/) - This helped me for 
  strengthening the fundamentals of PUG and CSS. it provides all the concept 
  from scratch.
- [https://stackoverflow.com/](https://stackoverflow.com/) - This is an amazing 
  website for solving your doubts and finding any different approaches. I always 
  refer to it Whenever I stuck in mid of code or I found unexpected error.

## Author ✍️
#### Anand Kumar
- Linkedin - [Anand-kumar96](https://www.linkedin.com/in/anand-kumar96/)
- GitHub -   [Anand-kumar96](https://github.com/Anand-kumar96)

## License 📄
This project is open-sourced under the [MIT license](https://opensource.org/licenses/MIT).
