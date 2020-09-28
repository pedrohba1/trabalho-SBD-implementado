<p align="center">
<p align="center"> Backend do trabalho de SBD.
    <br>
</p>

## 📝 Table of Contents

-   [Getting Started](#getting_started)
-   [Usage](#usage)
-   [Built Using](#built_using)
-   [Time estimative](#time_estimative)

## 🏁 Getting Started <a name = "getting_started"></a>

just run  `yarn` to install all dependencies.

Next, you will need docker to initialize a container with redis, mongo and postgres:

```
#postgres
docker run --name seePostgres -e  POSTGRES_USER=see -e POSTGRES_PASSWORD=trabalho -p 5433:5432 -d postgres

```

on windows you have to change the postgres port to 5433 in order to make it work, which is shown.


you can create tables with:  `yarn sequelize migration:create --name=create-recipient`

then apply the table definition with:  `yarn sequelize db:migrate`.

to remove migrations, do: `yarn db:migrate:undo:all`

you can create seeds with: `yarn sequelize seed:generate --name demo-user`

it is important to seed the city boundaries that are saved in the database.

you can initialize seeds with: `yarn sequelize db:seed:all`

There is also a command that is supposed to handle the email sending. After configuring the mailtrap.io for testing on the `.env` file, execute the command `yarn queue` to allow the execution of the routine that wil be responsible by sending emails.

after all this stuff, `yarn dev` should be able to start the application.

## 🎈 Usage <a name="usage"></a>

You can use the insomnia file to test the routes without the frontend.

There is also an option to debug:
```
yarn dev:debug
```

In order to be able to do the testing, you have to change the `.env` file in the `bootstrap.js`
file to `.env.test`

## 💧 Deploying in a droplet

firstly run `apt update && apt-upgrade`

The droplet I created uses SSH to connect. Ask me for the private key file if you want to connect.
To deploy the application you will need to do the same steps of the Getting Started section, with a few exceptions.

First the process of creating the postgres extensions should be done in the docker container. You create the docker container as shown above, but you get inside it's bash with `docker exec -t -i IcePostgres /bin/bash`. after that, you run the same lines:

```
apt-get update && apt-get install postgis -y

#then login into psql

psql -U ice -h localhost -d ice

#then run:

CREATE EXTENSION postgis;
CREATE EXTENSION postgis_topology;
```

Once that is done, you `quit` from the psql bash and the `exit` the container.


After creating the docker container and adding postgis extension, run the migrations and the seeds, the same as in the getting started.

I like to make the session connection to the server last longer. If you also want it, add to the droplet:
`sudo vim /etc/ssh/sshd_config`

and type the following:

```
ClientAliveInterval 30
TCPKeepAlive yes
ClientAliveCountMax 99999
 ```

save by typing `:w` in normal mode and then quit with `:qa`.

After that, run `service sshd restart` and your session should last a lot longer.

Next, Nginx should be configured, which provides a lot more safety. It will be used to redirect to the ports of our application.

start by installing nginx with `sudo apt install nginx`

you should open the port 80 with `sudo ufw allow 80`

now it is time to redirect the user from port 80 to port 3333 which is the one that the application is running.

open the nginx configuration with `sudo vim /etc/nginx/sites-available/default`

the `location / {}` should look like this:

```
location / {
      proxy_pass http://localhost:3333;
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection 'upgrade';
      proxy_set_header Host $host;
      proxy_cache_bypass $http_upgrade;
}
```
to make sure you didn't make any mistakes while editing nginx file run `sudo nginx -t` and it will tell you.

with that done, you can make calls to the api without specifying the port, and nginx will redirect them to the application running in port 3333.

After that it shall be added pm2, in order to keep the server alive. It is fairly easy at least.

First you need to install it globally by executing the command: `npm install -g pm2`

Also, install a this other one too, also globally `npm install -g serve`

you go inside `server` folder of this repository, and run `npm run build`. It should create a folder called `dist`.

after this is done,  run `pm2 start ecosystem.config.js --env production` inside `server` folder. Since pm2 wraps the application, it does not set the .env from the file, and therefore you need to set environment variables inside the ecosystem file.

type `pm2 l` tho check if the application is running, it should show in the list.

Once all this is done, the server should be up and running. After all this, a CI is yet to be thought about, in order to automate this process.

