NASA Explorer App

Aplicación móvil desarrollada con React Native + Expo, que explora 5 APIs públicas de la NASA.  
Cada sección presenta datos e imágenes astronómicas con soporte para temas claro/oscuro, animaciones, y modo offline.

Instalación
- Para usar la app se deberá clonar el repositorio y en la terminal usar el comando npm install
- se deberá tener previamente descargado y configurado node.js y expo para usar el proyecto
- se debe tener una clave de api publica de la Nasa
- se debe tener un archivo .env con la clave de la api en el

Si se cumplen los requisitos anteriores en la terminal de su proyecto ejecute "npx expo start" para iniciar el programa y luego seleccionar la opcion de Android o escanear el codigo con la aplicaion de Expo

NOTA
La versión Web no es funcional al 100% debido a la incopatibilidad de algunos componentes, se recomienda usar la version movil



Funcionalidades

- APOD – Imagen astronómica del día con selector de fecha y navegación
- EPIC – Carrusel con fotos de la Tierra tomadas por satélites
- Clima en Marte – Lecturas meteorológicas de la misión InSight
- NEO (Asteroides) – Lista de asteroides cercanos con detalles físicos y orbitales
- Image & Video Library – Buscador avanzado de imágenes, audios y videos de la NASA

Arquitectura

- Organización en base a los principios CLEAN Architecture + MVVM + Redux Toolkit.


Características UX

- Tema claro / oscuro (modo dinámico del sistema)
- Animaciones suaves (Reanimated)
- Modo offline con cache local (AsyncStorage)
- Loader animado con un asteroide giratorio
- Navegación entre fechas + calendario nativo
- Diseño responsivo y elegante

---

Tecnologías utilizadas

- React Native + Expo
- Redux Toolkit
- React Navigation (Drawer + Bottom Tabs)
- React Hook Form
- Reanimated
- AsyncStorage
- date-fns
- TypeScript
