# Sistema de Gestión de Rutas y Estadísticas para Reponedores

Este proyecto es una plataforma web moderna diseñada para optimizar la logística, asignación de rutas y visualización de métricas de rendimiento para **Reponedores** y **Supervisores**. La aplicación permite calcular distancias óptimas a los clientes utilizando coordenadas geográficas y procesar grandes volúmenes de datos estadísticos en tiempo real.

Exportado y desarrollado inicialmente en **Lovable**, el proyecto utiliza una arquitectura de vanguardia basada en el ecosistema de TanStack.

---

## Tecnologías Utilizadas

El proyecto está construido con las herramientas más modernas del desarrollo web:

* **Framework Principal:** [React 19](https://react.dev/) & [TanStack Start](https://tanstack.com/start/latest) (Full-stack React framework).
* **Enrutador y Estado de Rutas:** [TanStack Router](https://tanstack.com/router/latest) para un manejo de rutas con TypeScript tipado al 100%.
* **Gestión de Datos y Caché:** [TanStack Query (React Query)](https://tanstack.com/query/latest) para peticiones asíncronas optimizadas.
* **Estilos y UI:** [Tailwind CSS v4](https://tailwindcss.com/) para el diseño visual junto con componentes accesibles de **Radix UI**.
* **Gráficas:** [Recharts](https://recharts.org/) para el renderizado interactivo de promedios de visitas y tiempos.
* **Validación de Datos:** [Zod](https://zod.dev/) y [React Hook Form](https://react-hook-form.com/) para el control estricto de formularios y entidades.

---

## Características Principales

### Gestión por Roles
* **Rol Reponedor:** Visualización de clientes asignados, ordenados automáticamente por proximidad geográfica utilizando cálculos de latitud y longitud.
* **Rol Supervisor:** Panel de control (Dashboard) para monitorear el estado activo del personal y las fechas de última sincronización.

### Análisis Estadístico y Gráficas
* Cálculo en tiempo real de **tiempos promedio de visita** y **cantidad promedio de lugares visitados**.
* Procesamiento eficiente de grandes conjuntos de medias y dispersión de datos sin congelar la interfaz de usuario.
* Gráficas interactivas (barras, líneas, áreas) que facilitan la toma de decisiones logísticas.

---

## Instalación y Uso en Local

Para levantar este proyecto en tu computadora, asegúrate de tener instalado [Node.js](https://nodejs.org/) (versión LTS recomendada). Abre tu terminal y ejecuta la siguiente secuencia de comandos:

```bash
# 1. Entrar a la carpeta raíz del proyecto
cd venado-route-verfinal

# 2. Instalar todas las dependencias necesarias
npm install

# 3. Iniciar el servidor de desarrollo local
npm run dev
