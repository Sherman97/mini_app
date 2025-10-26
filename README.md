# 📱 Ionic Todo App — Prueba Técnica (Ionic + Angular + Firebase + Capacitor)

## 🧩 Descripción general
Este proyecto corresponde a una **prueba técnica de desarrollo multiplataforma**, cuyo objetivo es construir una aplicación funcional de **gestión de tareas y categorías**, utilizando **Ionic con Angular**, integrada con **Firebase Firestore** como backend en la nube y **Capacitor** para el despliegue en Android e iOS.

La aplicación permite:
- Crear, editar y eliminar tareas y categorías.
- Asignar tareas a categorías.
- Sincronizar los datos en tiempo real con Firebase.
- Ejecutarse tanto en web, Android e iOS.

---

## 🧠 Objetivo de la prueba
- Desarrollar una app **modular, escalable y sincronizada en tiempo real**.
- Implementar arquitectura limpia (Stores + Repositories + Models).
- Integrar correctamente **Firebase** y ejecutar builds nativas.
- Validar funcionamiento en los tres entornos principales:
  - Navegador (Web)
  - Android (APK firmado)
  - iOS (emulador y dispositivo físico)

---

## ⚙️ Tecnologías utilizadas

| Tecnología | Descripción |
|-------------|--------------|
| 🧩 **Ionic Framework 7+** | Framework principal de UI y navegación. |
| 🧠 **Angular Standalone Components** | Base del frontend. |
| 🧱 **Capacitor 7** | Herramienta para integración nativa en Android / iOS. |
| ☁️ **Firebase Firestore** | Base de datos en tiempo real. |
| 🧰 **Firebase Hosting / Remote Config** | Configuración y despliegue remoto. |
| 💻 **TypeScript + RxJS + Angular Signals** | Programación reactiva moderna. |
| 🧑‍💻 **Android Studio / Xcode / VS Code** | Entornos de desarrollo. |

---

## 📂 Estructura general del proyecto

ionic-todo/
├── scapacitor.config.tss/
│   │   ├── tasks/
│   │   ├── categories/
│   ├── data/
│   └── app/
├── android/
├── ios/
└── capacitor.config.ts



⚙️ Configuración inicial
1️⃣ Clonar el repositorio

git clone https://github.com/Sherman97/mini_app.git 

2️⃣ Instalar dependencias
npm install


📲 Ejecución en entornos

🧪 Web
|-------------|
| ionic serve |


🤖 Android
|-------------|
| ionic build |
| npx cap sync android |
| npx cap open android |

🍏 iOS
|-------------|
| ionic build | 
| npx cap sync ios | 
| npx cap open ios | 


👨‍💻 Autor
Germán Rojas
Desarrollador de software
📧 grmanrjas@gmail.com
💼 Proyecto de prueba: Ionic Todo App

