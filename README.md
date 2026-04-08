# 🏢 Ariana Servicios - Landing Page Institucional Corporativa

![Next.js](https://img.shields.io/badge/Next.js-14+-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?style=for-the-badge&logo=vercel)

Sitio web institucional B2B desarrollado para **Ariana Empresa de Limpieza**, una compañía familiar con sede en Mar del Plata, Argentina, especializada en servicios para oficinas, entidades bancarias, locales comerciales y consorcios.

El objetivo principal de esta plataforma es establecer presencia digital, generar confianza mediante prueba social (referencias dinámicas) y captar *leads* corporativos a través de un diseño moderno y minimalista.

## 🚀 Tecnologías y Arquitectura

Este proyecto está construido con un enfoque en rendimiento, SEO y mantenibilidad, utilizando el ecosistema moderno de React:

* **Framework:** Next.js (App Router)
* **Lenguaje:** TypeScript
* **Estilos:** Tailwind CSS
* **Animaciones:** Framer Motion (Micro-interacciones UI)
* **Emails Transaccionales:** Resend + React Email (Server Actions)
* **Arquitectura:** Clean Architecture adaptada a Next.js (Separación de UI, Core/Dominio y Servicios externos).

## ⚙️ Características Principales

* **Renderizado Híbrido:** Uso intensivo de Server Components y Static Site Generation (SSG) para tiempos de carga ultrarrápidos y un SEO óptimo.
* **Formulario sin Backend (Serverless):** Integración de Next.js Server Actions con la API de Resend para el envío seguro de correos de contacto sin necesidad de un servidor de Node/Express dedicado.
* **Listado de Clientes Dinámico:** Las referencias (consorcios, bancos, etc.) se alimentan desde un archivo de configuración estático, permitiendo actualizar la cartera de clientes sin modificar los componentes de React de la UI.
* **Diseño B2B Moderno:** Interfaz enfocada en la tipografía y el minimalismo, prescindiendo de imágenes invasivas para proteger la privacidad de las instalaciones de los clientes.

## 🛠️ Instalación y Desarrollo Local

1.  **Clonar el repositorio:**
    ```bash
    git clone [https://github.com/tu-usuario/ariana-servicios-web.git](https://github.com/tu-usuario/ariana-servicios-web.git)
    cd ariana-servicios-web
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    # o
    yarn install
    ```

3.  **Variables de Entorno:**
    Crea un archivo `.env.local` en la raíz del proyecto y configura tu clave de API para el servicio de correos:
    ```env
    RESEND_API_KEY=re_tu_clave_secreta_aqui
    ```

4.  **Ejecutar el servidor de desarrollo:**
    ```bash
    npm run dev
    ```
    Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el resultado.

## 📦 Estructura del Proyecto (Clean Architecture)

```text
src/
├── app/               # Next.js App Router (Páginas, Layouts, Server Actions)
├── components/        # Componentes UI reutilizables (Hero, ContactForm, Buttons)
├── core/              # Lógica de dominio, interfaces y tipos (Entidades)
├── data/              # Archivos de configuración estática (Ej. clients.ts)
└── services/          # Integración con APIs externas (Resend)
