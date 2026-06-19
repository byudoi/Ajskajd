# ♡ Adukyy Obfuscator

**Protege tu código Lua en la nube.** Una herramienta moderna basada en Next.js desplegada en Vercel sin servidor con ofuscación tipo Prometheus.

![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)
![Next.js](https://img.shields.io/badge/Built%20with-Next.js-blue?logo=nextjs)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Características

- ✅ **Procesamiento en la Nube** — Sin instalar nada, funciona en el navegador
- ✅ **7 Capas de Protección** — Anti-dumpers, anti-decompilers, string encryption
- ✅ **Serverless Rápido** — Procesamiento instantáneo con Vercel Functions
- ✅ **Diseño Moderno** — Interfaz oscura y responsiva
- ✅ **100% Privado** — No guardamos logs ni historial
- ✅ **Gratis** — Vercel ofrece despliegue gratuito

## 🚀 Despliegue en 1 Minuto

### Opción 1: Vercel Deploy (MÁS FÁCIL)

1. **Haz clic en este botón:**

```
https://vercel.com/new/clone?repository-url=https://github.com/TU_USUARIO/cyphershield-vercel
```

2. Autoriza con GitHub
3. Haz clic en "Deploy"
4. **¡Listo!** Tu URL estará lista en 30 segundos

### Opción 2: Despliegue Manual

**Requisitos:**
- Node.js 18+ instalado
- Cuenta en Vercel (gratuita)
- Git

**Pasos:**

```bash
# 1. Clonar el repositorio
git clone https://github.com/TU_USUARIO/cyphershield-vercel.git
cd cyphershield-vercel

# 2. Instalar dependencias
npm install

# 3. Deployar a Vercel
npm i -g vercel
vercel

# Sigue las instrucciones interactivas
# Tu sitio estará en: https://cyphershield-vercel.vercel.app/
```

## 📋 Estructura del Proyecto

```
cyphershield-vercel/
├── pages/
│   ├── api/
│   │   └── protect.js        # API serverless que protege código
│   ├── index.js              # Página principal
│   └── _app.js               # Configuración Next.js
├── lib/
│   └── cyphershield.js       # Lógica de protección
├── styles/
│   └── globals.css           # Estilos globales
├── public/                   # Archivos estáticos
├── package.json              # Dependencias
├── vercel.json               # Configuración Vercel
└── README.md                 # Este archivo
```

## 🔧 Cómo Funciona

1. **Frontend (Next.js):**
   - Carga un archivo `.lua` desde tu computadora
   - Configura qué capas de protección aplicar
   - Envía el código a la API

2. **Backend (Vercel Function):**
   - Recibe el código en `/api/protect`
   - Aplica las capas de protección (JavaScript puro)
   - Encripta las strings con la Master Key
   - Devuelve el código protegido

3. **Descargar:**
   - El archivo protegido se descarga automáticamente
   - Recibes la Master Key para descifrar strings

## 🔐 Capas de Protección

| Capa | Descripción |
|------|-------------|
| **AEL-7** | Anti-Environment Logger — Detecta intentos de acceso al entorno |
| **RET v3.2** | Runtime Event Tracer — Monitorea llamadas al sistema |
| **ADD** | Advanced Dumper Detection — Previene extracción de código |
| **HSL** | Hook Suppression Layer — Bloquea hooks en funciones críticas |
| **Honeypots** | Funciones trampa que detectan herramientas maliciosas |
| **CFG** | Control Flow Fragmentation — Fragmenta el flujo de control |
| **String Encryption** | Cifrado UTF-32 de strings con XOR + rotación |

## 🎯 Casos de Uso

- **Proteger scripts privados** — Evita que otros vean tu código
- **Distribución segura** — Comparte scripts sin temor a plagios
- **Análisis antidestructor** — Detecta intentos de dumping
- **Desarrollo seguro** — Protege tu IP intelectual

## 🔑 Master Key

La **Master Key** es esencial para descifrar las strings del código protegido.

### Características:
- ✅ Se genera automáticamente de 32 caracteres
- ✅ Se muestra claramente después de proteger
- ✅ Se puede copiar al portapapeles
- ⚠️ **GUÁRDALA BIEN** — Sin ella no podrás descifrar strings

### Ejemplos de Keys:
```
aB3cDeFgHiJkLmNoPqRsTuVwXyZ1234567890
k9L8M7N6O5P4Q3R2S1T0U9V8W7X6Y5Z4a3b2
```

## 📊 Límites y Cuotas

| Límite | Valor |
|--------|-------|
| Tamaño máximo de archivo | 5 MB |
| Tiempo de procesamiento | < 5 segundos |
| Solicitudes por minuto | 60 (gratis en Vercel) |
| Almacenamiento | Sin logs |

## 🛠️ Desarrollo Local

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Acceder a http://localhost:3000

# Compilar para producción
npm run build
npm start
```

## 📚 Documentación Adicional

### Variables de Entorno

No se requieren variables de entorno. El proyecto funciona tal cual sin configuración.

### Personalización

**Cambiar URL del sitio:**
- En Vercel: Settings → Domains → Agregar dominio personalizado

**Cambiar colores:**
- Edita `:root` en `styles/globals.css`

**Agregar más capas:**
- Edita `lib/cyphershield.js`
- Actualiza la API en `pages/api/protect.js`

## 🐛 Troubleshooting

### "La página no carga"
- Verifica que Vercel esté desplegado correctamente
- Revisa la consola del navegador (F12)
- Mira los logs en Vercel Dashboard

### "Error al proteger"
- Asegúrate de que el archivo es `.lua` válido
- Verifica que no esté vacío
- Intenta con un archivo más pequeño

### "API returns error"
```bash
# Revisa los logs
vercel logs
```

## 📈 Analytics

Vercel incluye analíticas gratuitas:
- Vistas de página
- Tiempos de carga
- Ubicaciones de usuarios
- Errores

Accede en: **Vercel Dashboard → Analytics**

## 🚀 Optimizaciones

El proyecto está optimizado para Vercel:
- ✅ Next.js con ISR (Incremental Static Regeneration)
- ✅ Funciones serverless optimizadas
- ✅ CSS critico inlinado
- ✅ Compresión automática

## 🔒 Seguridad

- ✅ No almacenamos código
- ✅ No hay logs persistentes
- ✅ HTTPS por defecto
- ✅ Encriptación de strings en el cliente y servidor

## 📝 Licencia

MIT License - Úsalo libremente

## 🤝 Contribuciones

Las contribuciones son bienvenidas:

1. Fork del repositorio
2. Crea una rama (`git checkout -b feature/mejora`)
3. Commit (`git commit -am 'Añade mejora'`)
4. Push (`git push origin feature/mejora`)
5. Abre un Pull Request

## 📞 Soporte

- 🐛 **Reportar bugs** → GitHub Issues
- 💬 **Preguntas** → GitHub Discussions
- 📧 **Contacto** → tu_email@ejemplo.com

## 🙏 Agradecimientos

- Next.js por el framework increíble
- Vercel por el hosting gratuito
- La comunidad Lua/Roblox

---

**Hecho con ❤️ para desarrolladores Lua**

⭐ Si te resulta útil, considera darle una estrella en GitHub
