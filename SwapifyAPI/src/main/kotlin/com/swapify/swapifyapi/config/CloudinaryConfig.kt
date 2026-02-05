package com.swapify.swapifyapi.config

import com.cloudinary.Cloudinary
import io.github.cdimascio.dotenv.Dotenv
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class CloudinaryConfig {

    @Bean
    fun cloudinary(): Cloudinary {
        // 1) Intentar leer de variables de entorno (Docker)
        val envUrl = System.getenv("CLOUDINARY_URL")

        // 2) Si no existe, usar .env (solo en desarrollo local)
        val cloudinaryUrl = envUrl ?: Dotenv.configure()
            .ignoreIfMissing()   // <-- evita que explote si no hay .env
            .load()["CLOUDINARY_URL"]

        return Cloudinary(cloudinaryUrl)
    }
}
