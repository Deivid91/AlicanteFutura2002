# Swapify API (Backend)

Este es el servidor backend de Swapify, construido con **Kotlin** y **Spring Boot**. Proporciona una API RESTful para gestionar usuarios, productos, transacciones y mensajería.

## 🛠️ Stack Tecnológico

*   **Lenguaje**: Kotlin 1.9.25
*   **Framework**: Spring Boot 3.4.3
*   **Base de Datos**: PostgreSQL
*   **Build Tool**: Maven
*   **Java Version**: 17

## 📋 Prerrequisitos

Para ejecutar este proyecto localmente sin Docker, necesitarás:

*   **Java Development Kit (JDK) 17** o superior.
*   **Maven** (o usar el wrapper `mvnw` incluido).
*   **PostgreSQL** ejecutándose localmente.

## ⚙️ Configuración

El proyecto utiliza `application.properties` para la configuración. Las variables sensibles pueden ser inyectadas mediante variables de entorno.

### Variables de Entorno Clave
Valores por defecto pensados únicamente para desarrollo local:

*   `SPRING_DATASOURCE_URL`: URL de conexión a la BD (ej. `jdbc:postgresql://localhost:5432/swapify`).
*   `SPRING_DATASOURCE_USERNAME`: Usuario de la BD.
*   `SPRING_DATASOURCE_PASSWORD`: Contraseña de la BD.
*   `CLOUDINARY_URL`: (Opcional) Para subida de imágenes.

## 🚀 Ejecución Local

1.  **Navega al directorio**:
    ```bash
    cd SwapifyAPI
    ```

2.  **Ejecuta con Maven Wrapper**:
    ```bash
    ./mvnw spring-boot:run
    ```
    *(En Windows usa `mvnw.cmd spring-boot:run`)*

El servidor iniciará en `http://localhost:8080`.

## 🧪 Tests

Para ejecutar las pruebas unitarias y de integración:

```bash
./mvnw test
```

## 📦 Estructura del Código (`src/main/kotlin/com/swapify/swapifyapi`)

*   `config/`: Configuraciones de Spring (Seguridad, Web, WebSocket).
*   `controllers/`: Endpoints de la API REST.
*   `model/`:
    *   `entities/`: Entidades JPA (Base de datos).
    *   `dto/`: Data Transfer Objects.
    *   `dao/`: Interfaces de acceso a datos (Repositories).
*   `services/`: Lógica de negocio.
