# Fanz Map Editor

Un editor de mapas interactivo para crear diseños de asientos y secciones de venues. Construido con Next.js 15, React 19, TypeScript y Tailwind CSS.

## 🚀 Características

- **Editor Visual**: Crea y edita mapas de asientos de forma intuitiva
- **Gestión de Secciones**: Agrega, edita y elimina secciones con diferentes colores
- **Gestión de Filas**: Organiza asientos en filas dentro de cada sección
- **Gestión de Asientos**: Controla el estado de ocupación de cada asiento
- **Exportar/Importar**: Guarda y carga mapas en formato JSON
- **Interfaz Moderna**: UI construida con Radix UI y Tailwind CSS
- **Responsive**: Diseño adaptable a diferentes tamaños de pantalla

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 18.0 o superior)
- **npm** o **yarn** (gestor de paquetes)
- **Git** (opcional, para clonar el repositorio)

## 🛠️ Instalación

### 1. Clonar el Repositorio

```bash
git clone <url-del-repositorio>
```

### 2. Instalar Dependencias

```bash
# Con npm
npm install

# O con yarn
yarn install

# O con bun (si lo tienes instalado)
bun install
```

### 3. Ejecutar en Modo Desarrollo

```bash
# Con npm
npm run dev

# O con yarn
yarn dev

# O con bun
bun dev
```

### 4. Abrir en el Navegador

Navega a [http://localhost:3000](http://localhost:3000) en tu navegador web.

## 📁 Estructura del Proyecto

```
├── app/                    # App Router de Next.js
│   ├── globals.css        # Estilos globales
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página principal
├── src/
│   ├── components/        # Componentes React
│   │   ├── MapEditor/     # Componentes del editor de mapas
│   │   ├── providers/     # Providers de contexto
│   │   └── ui/            # Componentes UI reutilizables
│   ├── hooks/             # Custom hooks
│   ├── lib/               # Utilidades y helpers
│   └── store/             # Estado global (Zustand)
├── public/                # Archivos estáticos
├── package.json           # Dependencias y scripts
├── tailwind.config.ts     # Configuración de Tailwind
└── tsconfig.json          # Configuración de TypeScript
```

## 🎯 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia el servidor de desarrollo

# Producción
npm run build        # Construye la aplicación para producción
npm run start        # Inicia el servidor de producción

# Calidad de Código
npm run lint         # Ejecuta ESLint para verificar el código
```
