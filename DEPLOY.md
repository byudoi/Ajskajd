# 🚀 Guía de Despliegue en Vercel

## Opción 1: Vercel Deploy Button (Lo Más Fácil)

### Requisitos:
- Cuenta en GitHub (gratuita)
- Cuenta en Vercel (gratuita)

### Pasos:

1. **Haz clic aquí** (cuando ya tengas el repo en GitHub):
   ```
   https://vercel.com/new/clone?repository-url=https://github.com/TU_USUARIO/cyphershield-vercel
   ```

2. **Autoriza con GitHub**
   - Vercel te pedirá acceso a tu cuenta GitHub
   - Haz clic en "Authorize Vercel"

3. **Configuración del Proyecto:**
   - Project Name: `cyphershield-vercel` (o el que prefieras)
   - Framework Preset: `Next.js` (debe detectarse automáticamente)
   - Environment Variables: Dejar en blanco (no se necesitan)

4. **Deploy:**
   - Haz clic en "Deploy"
   - Espera 30-60 segundos
   - ¡Listo! Tu URL aparecerá en pantalla

### Tu URL será:
```
https://cyphershield-vercel.vercel.app/
```

---

## Opción 2: CLI de Vercel

### Requisitos:
- Node.js 18+ instalado
- Git instalado
- Cuenta en Vercel

### Pasos:

```bash
# 1. Descargar el proyecto (si no lo tienes)
git clone https://github.com/TU_USUARIO/cyphershield-vercel.git
cd cyphershield-vercel

# 2. Instalar la CLI de Vercel
npm install -g vercel

# 3. Desplegar
vercel

# 4. Responder las preguntas interactivas:
# ? Set up and deploy "~/cyphershield-vercel"? [Y/n] → Y
# ? Which scope do you want to deploy to? → Tu usuario
# ? Link to existing project? [y/N] → N
# ? What's your project's name? → cyphershield-vercel
# ? In which directory is your code located? → . (punto)
# ? Want to override the settings above? [y/N] → N

# 5. ¡Listo! Tu URL aparecerá en la terminal
# Vercel URL: https://cyphershield-vercel.vercel.app
```

---

## Opción 3: GitHub Sync (Automático)

### Ventaja: Los cambios se despliegan automáticamente cuando haces push a GitHub

### Pasos:

1. **Crea un repositorio en GitHub:**
   ```bash
   git init
   git add .
   git commit -m "CypherShield Vercel"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/cyphershield-vercel.git
   git push -u origin main
   ```

2. **Conecta a Vercel:**
   - Ve a https://vercel.com/dashboard
   - Haz clic en "Add New..." → "Project"
   - Selecciona tu repositorio `cyphershield-vercel`
   - Haz clic en "Import"

3. **Configura (opcional):**
   - Build Command: `next build` (por defecto)
   - Output Directory: `.next` (por defecto)
   - Environment Variables: Dejar en blanco

4. **Deploy:**
   - Haz clic en "Deploy"
   - Espera 1-2 minutos

5. **Despliegues automáticos:**
   - Cada vez que hagas `git push` a `main`
   - Vercel automáticamente desplegará los cambios

---

## Post-Despliegue

### Verificar que funciona:

```bash
# Test básico
curl https://tu-proyecto.vercel.app/

# Debe retornar HTML de la página
```

### Personalizar dominio:

1. En Vercel Dashboard → tu proyecto → Settings → Domains
2. Haz clic en "Add Domain"
3. Ingresa tu dominio personalizado (ej: `cyphershield.tu-dominio.com`)
4. Sigue las instrucciones de DNS

### Monitorear el sitio:

1. Vercel Dashboard → tu proyecto → Analytics
2. Ver:
   - Vistas de página
   - Tiempos de respuesta
   - Errores
   - Ubicaciones de usuarios

---

## Troubleshooting

### "Build failed"

**Solución:**
```bash
# Verifica que funciona localmente
npm install
npm run build
npm start

# Si falla aquí, también fallará en Vercel
```

### "Página en blanco o error 500"

**En Vercel Dashboard:**
1. Proyecto → Deployments
2. Selecciona el deployment actual
3. Haz clic en "Functions" o "Logs"
4. Busca errores

**En desarrollo:**
```bash
npm run dev
# Abre http://localhost:3000
# Revisa la consola para errores
```

### "API returns 500"

**Revisa los logs:**
```bash
vercel logs --tail
```

**Verifica que `/pages/api/protect.js` existe**

### "Estilos no carguen"

**Solución:**
```bash
# Limpiar caché
vercel env pull
vercel build --prod
```

---

## Optimizaciones

### Reducir tiempo de build:

```bash
# En vercel.json, agregar:
{
  "buildCommand": "next build",
  "env": {
    "NEXT_TELEMETRY_DISABLED": "1"
  }
}
```

### Mejorar velocidad:

1. **Habilitar caching:**
   - Vercel lo hace automáticamente

2. **Monitorar performance:**
   - Vercel Analytics → Performance

3. **Usar CDN global:**
   - Vercel lo incluye en el plan gratis

---

## Escalabilidad

### Plan Gratis (Por defecto):
- ✅ Hasta 100GB de ejecución por mes
- ✅ Funciones serverless de 10 segundos
- ✅ Dominio vercel.app
- ✅ HTTPS automático
- ✅ Banda ancha ilimitada

### Plan Pro:
- ✅ Más ejecuciones
- ✅ Funciones de 60 segundos
- ✅ Soporte prioritario
- 💰 $20/mes

**Para este proyecto, el plan gratis es suficiente.**

---

## Mantener Actualizado

### Actualizar dependencias:

```bash
npm update
npm audit fix
git add package*.json
git commit -m "Update dependencies"
git push
# Vercel automáticamente desplegará
```

### Cambios de código:

```bash
# Haz cambios en el código
git add .
git commit -m "Descripción del cambio"
git push origin main
# Vercel automáticamente desplegará en 1-2 minutos
```

---

## Respaldo y Seguridad

### Respaldo:
- Tu código está en GitHub
- Los logs de Vercel se guardan 7 días
- Nada se almacena permanentemente

### Seguridad:
- HTTPS automático
- Headers de seguridad configurados
- No hay almacenamiento de datos del usuario

---

## Preguntas Frecuentes

### ¿Cuesta dinero?
No, el plan gratis de Vercel es suficiente para este proyecto.

### ¿Dónde se ejecuta el código?
En servidores de Vercel distribuidos globalmente (más rápido para ti).

### ¿Puedo usar un dominio personalizado?
Sí, agregándolo en Settings → Domains (requiere DNS update).

### ¿Qué sucede con mi código?
- Se almacena en GitHub (es público si lo deseas)
- Se ejecuta en Vercel solo cuando lo necesitas
- Vercel no accede a tu código Lua (solo lo procesa)

### ¿Puedo ver los logs?
Sí, en Vercel Dashboard → Deployments → Logs

---

**¡Tu CypherShield Vercel está listo! 🎉**

Accede a tu URL y comienza a proteger código.
