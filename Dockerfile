FROM openjdk:17-jdk-alpine

WORKDIR /usr/src/app

COPY target/todoList-1.0-SNAPSHOT.jar ./
COPY config.yml ./

EXPOSE 8080

CMD ["java", "-jar", "todoList-1.0-SNAPSHOT.jar", "server", "config.yml"]
