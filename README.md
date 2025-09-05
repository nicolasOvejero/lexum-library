# lexum-library

## How to run DB

The database is a MySql database, and you can run it in docker.

If you don't have docker you can follow the process to install it on your computer here: https://docs.docker.com/engine/install/

### Run everything manually

First step is to compile the image with the following command: `docker build -t mon-mysql .`

Second step it's to run the docker container with the following command: `docker run --name mysql-container -p 3306:3306 -d mon-mysql`