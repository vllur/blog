---
title: Introduction to Docker
---

Containerization is one of the buzzwords you definitely heard about. Local virtual machine like the production server, on your computer, for every project. Thanks to Docker and its containers, it is both easy and not resource intensive.

# Installing Docker

If you fancy a GUI, download and install the [Docker Desktop](https://docs.docker.com/get-docker/). [Docker Engine](https://docs.docker.com/engine/install/) is version without it. Either way, you can now use it in your terminal:

```sh
sudo systemctl start docker
docker run hello-world
```

# Docking an application

Lets take an existing application that would need better development and deployment method. For example, my [Discord bot](https://github.com/vllur/shroom) in Crystal. Not only it needs an esoteric programming language, but also a server to be useful. With Docker, we can reduce both developer and user overhead.

First step is to find a proper Docker image to build upon. One way would be to pick an official, generic Docker image and add our dependencies. Another is to find one ready to use on [Docker Hub](https://hub.docker.com/). Official Crystal image -- `crystallang/crystal` will be perfect in this case.

We need three new files in the root directory. `Dockerfile`, `docker-compose.yml` and `.dockerignore`.

## Dockerfile

`Dockerfile` describes a starting point, and a sequence of steps to run the application. In our case:

```dockerfile
FROM crystallang/crystal:1.7.2

RUN mkdir /app
COPY . /app
WORKDIR /app

RUN shards install
RUN shards build --release --no-debug
ENTRYPOINT /app/bin/shroom
```

Every Dockerfile varies, but some steps will be the same everywhere. We need to make a directory, copy project files from root directory to the container and `cd` to it. `RUN` commands are steps to prepare the executable for `ENTRYPOINT`. In this case, entry point will run the bot. Docker only allows one such statement per Dockerfile.

## Docker ignore

This should feel like a familiar concept. Like `.gitignore` outlines files ignored by git, `.dockerignore` does so for Docker. In this case, `lib` directory should not be in the container:

```
lib
```

## Docker compose

Running only one executable in project is rather limiting. What about other services, like databases? You can define them in `docker-compose.yml`.

```yml
version: '3.5'

services:
  app:
    build: .
    restart: always
  mysql:
    image: mysql:8.0
    volumes:
      - db_data:/var/lib/mysql
    ports:
      - "3306:3306"
  
volumes:
  db_data: {}
```

Docker compose acts as a coordinator for many `docker` invocations. Rebuilding them only when project has changed, managing services and instances. In this example, `app` uses the Dockerfile, and `mysql` service configuration is here.

Now, to build and run the project:

```sh
docker-compose build
docker-compose up
```

You can check for currently running containers:

```sh
docker-compose ps
```

Or stop a service:

```sh
docker-compose kill app
```

This particular project does not use a database, so final `docker-compose.yml` is simple:

```yml
version: '3.5'

services:
  app:
    build: .
    restart: always
```
