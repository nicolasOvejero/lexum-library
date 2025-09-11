# lexum-library

Or you can use the docker compose file : `docker compose up`

## The database

The database is a MySql database, and you can run it in docker.

### Run everything manually

#### Run the Database
First step is to compile the image with the following command: `docker build -t mon-mysql .`

Second step it's to run the docker container with the following command: `docker run --name mysql-container -p 3306:3306 -d mon-mysql`

#### Run the FrontEnd

The front is in angular 20.

To run this project you can use *node 24*.

To check/change/update your version you can use *nvm* (https://github.com/nvm-sh/nvm)

After you juste have to go in the `front > my-library` and run `npm run start`.

#### Run the BackEnd

The is made with java 21+.

Maven is use to manage packages.

You juste have to go in the `api > my-library` and run `mvn clean install` to install all package.

After you can run `mvn exec:java -Dexec.mainClass="com.nicolas.my_library.MyLibraryApplication"` to execute the java code.

### Run it with docker

If you don't have docker you can follow the process to install it on your computer here: https://docs.docker.com/engine/install/

After you can run the project with `docker compose up`.
