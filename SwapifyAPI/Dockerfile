# ETAPA 1: usar una imagen con Maven y JDK 21 para compilar
FROM maven:3.9.10-eclipse-temurin-21 AS build

# Crea un directorio /app dentro del contenedor y copia todo el código ahí.
WORKDIR /app
COPY . .

# Usa tu Maven Wrapper (./mvnw) para compilar el proyecto y generar el .jar.
# El flag -DskipTests es solo para compilar más rápido sin los tests por ahora.
RUN ./mvnw clean package -DskipTests

# ETAPA 2: crear una imagen más ligera para ejecutar el .jar
# Coge sólo el .jar compilado y lo pasa a una imagen más ligera con sólo el JDK
# El puerto 8080 es el que usará el backend
# El comando final ejecuta la app
FROM eclipse-temurin:21-jdk
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
