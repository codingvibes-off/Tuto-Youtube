# Étape 1 : build
FROM maven:3.8.8-eclipse-temurin-21-alpine AS build
WORKDIR /app
COPY pom.xml ./pom.xml
COPY src ./src
RUN mvn clean package -DskipTests

# Étape 2 : runtime
FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
