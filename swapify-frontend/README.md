# Swapify Frontend

Este es el cliente web de Swapify, una Single Page Application (SPA) desarrollada con **React** y **Vite**. Ofrece una interfaz moderna y responsiva para interactuar con la plataforma de trueque.

> ⚠️ **Nota**
> Este frontend forma parte de un proyecto desarrollado con fines educativos.

## 🛠️ Stack Tecnológico

*   **Framework**: React 19
*   **Lenguaje**: TypeScript
*   **Build Tool**: Vite
*   **Estilos**: Bootstrap 5 (React-Bootstrap)
*   **Mapas**: React Leaflet / Google Maps API
*   **Comunicación Real-time**: SockJS & StompJS (WebSockets)

## 📋 Prerrequisitos

*   **Node.js** (versión 18 o superior recomendada).
*   **npm** (incluido con Node.js).

## 🚀 Instalación y Ejecución

1.  **Navega al directorio**:
    ```bash
    cd swapify-frontend
    ```

2.  **Instala las dependencias**:
    ```bash
    npm install
    ```

3.  **Inicia el servidor de desarrollo**:
    ```bash
    npm run dev
    ```

La aplicación estará disponible en `http://localhost:5173`.

## 📜 Scripts Disponibles

*   `npm run dev`: Inicia el servidor de desarrollo con Hot Module Replacement (HMR).
*   `npm run build`: Compila la aplicación para producción (TypeScript + Vite).
*   `npm run lint`: Ejecuta ESLint para verificar la calidad del código.
*   `npm run preview`: Previsualiza la build de producción localmente.

## 📂 Estructura del Proyecto (`src/`)

*   `assets/`: Imágenes y recursos estáticos.
*   `components/`: Componentes reutilizables de React (Botones, Tarjetas, Mapas, etc.).
*   `contexts/`: Contextos de React para gestión de estado global (Auth, Favoritos, Notificaciones).
*   `hooks/`: Custom Hooks.
*   `pages/`: Vistas principales de la aplicación (Inicio, Login, Perfil, etc.).
*   `services/`: Funciones para comunicación con la API Backend (Axios).
