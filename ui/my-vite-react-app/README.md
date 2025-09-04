
Adams Coffee Supply

Welcome to my Coffee Supply application! This is used for managing a coffee inventory. Below are instructions for how to spin up the application followed by an explanation of the program. 


*Clone the Repository*
git clone https://github.com/AustinAdams11/z-crud.git
cd z-crud

*Docker Setup*
In a new terminal, run these commands to set up the Docker container

docker pull postgres

mkdir -p $HOME/docker/volumes/postgres

docker run --rm --name pg-docker -e POSTGRES_PASSWORD=docker -d -p 5432:5432 \
-v $HOME/docker/volumes/postgres:/var/lib/postgresql/data postgres

docker ps -a  (see the container you just created)

docker exec -it <PSQL-Container-ID> bash (input the container ID for what you just created)

psql -U postgres (logs into postgres)

 CREATE DATABASE coffee;

 *Spin Up Back-End*
 Back in your cd z-crud terminal

 cd api

 npm install

 npm run start

 this will spin up the back-end at http://localhost:8000

 *Spin Up Front-End*
cd z-crud

cd UI

cd my-react-app

 npm install 

 npm run dev

 this will spin up the front-end at http://localhost:5173

 *Access The Application*
In the Google Chrome browser navigate to http://localhost:5173/

There you will be greeted with the homepage and can use the application.

Users can register with their First Name, Last Name, username, and password then log in using that info to view, add, edit, or delete coffee items. 

Guests can browse the inventory without logging in through the guest page link on the home screen. Each coffee item has a name and description and a user can click on the see details link to view that product solely.


