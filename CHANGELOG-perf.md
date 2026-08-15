# Changelog de Rendimiento — LinkNest

Registro de cambios de performance aplicados al proyecto, siguiendo la metodología
**medir → cambiar → volver a medir** de la guía de optimización. Cada fila se completa
únicamente después de haber remedido con Lighthouse.

## Convenciones

- **LCP / INP / CLS**: Core Web Vitals medidos con Lighthouse (modo Mobile, sobre `npm run preview`).
- **Bundle inicial**: peso de JS descargado en la carga inicial de `/`, medido en DevTools → Network (filtro JS).
- **N/A**: la métrica no aplica a ese cambio específico.

| #   | Cambio                                                              | Métrica(s) esperada(s)                                        | Archivo(s) afectado(s)     | Antes                                 | Después                               |
| --- | ------------------------------------------------------------------- | ------------------------------------------------------------- | -------------------------- | ------------------------------------- | ------------------------------------- |
| 1   | Code-splitting de rutas con `lazy` + `Suspense`                     | LCP, Bundle inicial (KB), "Reduce unused JavaScript"          | `src/router/AppRouter.tsx` | LCP (Landing Page - Mobile): **6.7s** | LCP (Landing Page Mobile): **5.8s**   |
| 2   | Compresión de PNGs con TinyPNG + conversión a WebP                  | Peso combinado de imágenes (KB), LCP en rutas con ilustración | `src/assets/*.png`         | LCP (Landing Page - Mobile): **6.7s** | LCP (Landing Page - Mobile): **4.5s** |
| 3   | Preload de fuente crítica (Sora)                                    | LCP (cuando el LCP es texto con `--font-heading`)             | `index.html`               | LCP (Landing Page - Mobile): **4.5s** | LCP (Landing Page - Mobile): **4.4s** |
| —   | **Puntaje Lighthouse Performance global (Mobile) (`/`)**            | Resumen general                                               | —                          | 56 puntos putnos                      | 71 puntos                             |
| —   | **Puntaje Lighthouse Performance global (Mobile) (`/u/:username`)** | Resumen general                                               | —                          | 56 puntos                             | 63 puntos                             |
