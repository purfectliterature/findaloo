# Findaloo
[![Netlify Status](https://api.netlify.com/api/v1/badges/305a5606-25c6-4f91-b453-21d9cb6beeae/deploy-status)](https://app.netlify.com/sites/findaloo/deploys)

## It doesn't always have to stink.

Findaloo is a progressive web application designed to help you find the nearest toilets around you! See how far away they are, what genders are avaiable, or even see a list of features available. Are you a parent? Find the nearest nursing rooms with hot water dispensors and baby change stations around you.

Just had the most wonderful experience in your lifetime so far? Leave a review! Upset that something broke? 
File a report to let management know.

With findaloo, dirty, smelly toilets will be a thing of the past. Visit us at https://findaloo.netlify.app today

## Installation guide

In order to run the application, please follow the steps below.
The application is divided into two main folders: the frontend and the backend. These can be run on separate servers, or together on the same server.

### Before you begin:
1. `git clone https://github.com/cs3216/2020-a3-mobile-cloud-2020-group-3.git` to clone the repo
2. Ensure that node.js >v11 and PostgreSQL >v12 is installed on the system
3. Ensure that the yarn package manager is installed
4. `yarn add nodemon` to install nodemon, which is required to launch the package scripts.

### Frontend:
We recommend that you deploy on netlify. However, for local deployment, follow the steps below:
1. `cd frontend` to change directory to the frontend folder
2. `yarn install` to install the required packages for the application
3. `yarn start` to launch the application. The application will be available on localhost:3000.

### Backend:
Deployment of the backend happens in multiple stages.

#### Database setup
1. `psql` to launch an interactive postgres shell
2. `CREATE USER findaloo` to create a new user
3. `CREATE DATABASE findaloo` to create a corresponding database
4. `\q` to quit psql
5. `cd backend/sql` to open the sql folder
6. `psql findaloo` to open the findaloo database
7. `\i 1_ppp.sql` to initialise the database tables
8. `\i n_filename.sql` in order of increasing numbers in the current folder to load SQL views
9. [OPTIONAL] `cd ../scripts` to open the scripts folder
10. [OPTIONAL] `\i toilets_dump.sql` to load sample data

#### Database authentication setup
1. `cd ../db` to enter the db folder
2. `cp settings_blank.js settings.js` to create a settings.js file
3. Open `settings.js` and fill up the details in line 1 - 5 with the database user information.

#### Running the server
1. `cd ../` to return to the backend folder
2. `yarn install` to install the required packages for the application
3. `yarn start` to launch the API server. It will be available on localhost:3000.
4. `yarn startAuth` to launch the Auth server. It will be available on localhost:4000.
