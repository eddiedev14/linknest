# Changelog de Rendimiento — LinkNest

Registro de cambios de performance aplicados al proyecto, siguiendo la metodología
**medir → cambiar → volver a medir** de la guía de optimización. Cada fila se completa
únicamente después de haber remedido con Lighthouse.

## Convenciones

- **LCP / INP / CLS**: Core Web Vitals medidos con Lighthouse (modo Mobile, sobre `npm run preview`).
- **Bundle inicial**: peso de JS descargado en la carga inicial de `/`, medido en DevTools → Network (filtro JS).
- **N/A**: la métrica no aplica a ese cambio específico.

| #   | Cambio                                                           | Métrica(s) esperada(s)                                        | Archivo(s) afectado(s)                                                | Antes | Después |
| --- | ---------------------------------------------------------------- | ------------------------------------------------------------- | --------------------------------------------------------------------- | ----- | ------- |
| 1   | Code-splitting de rutas con `lazy` + `Suspense`                  | LCP, Bundle inicial (KB), "Reduce unused JavaScript"          | `src/router/AppRouter.tsx`                                            |       |         |
| 2   | Quitar `recharts` del bundle inicial (efecto directo del #1)     | Bundle inicial (KB), ¿aparece en chunk raíz? (Sí/No)          | `src/pages/Analytics.tsx`                                             |       |         |
| 3   | Quitar `@dnd-kit` del bundle inicial (efecto directo del #1)     | Bundle inicial (KB), ¿aparece en chunk raíz? (Sí/No)          | `src/pages/Links.tsx`                                                 |       |         |
| 4   | Landing pública sin bloqueo por `userLoading` de Firebase Auth   | LCP en `/`                                                    | `src/router/AppRouter.tsx`, `PrivateRoute.tsx`                        |       |         |
| 5   | `getDocs` en vez de `onSnapshot` para links en la página pública | Nº de listeners activos, TTI en `/u/:username`                | `usePublicPage.ts`                                                    |       |         |
| 6   | `MyLinksContextProvider` limitado solo a `/links`                | Nº de listeners activos en `/profile` y `/analytics`          | `src/router/AppRouter.tsx`                                            |       |         |
| 7   | Compresión de PNGs con TinyPNG + conversión a WebP               | Peso combinado de imágenes (KB), LCP en rutas con ilustración | `src/assets/*.png`                                                    |       |         |
| 8   | `width`/`height`/`loading="lazy"`/`decoding="async"` en `<img>`  | CLS                                                           | `UserAvatar.tsx`, `AuthPage.tsx`, `ResetPassword.tsx`, `NotFound.tsx` |       |         |
| 9   | Optimización de SVGs con SVGO                                    | Peso de SVGs (KB)                                             | `src/assets/*.svg`, `public/favicon.svg`                              |       |         |
| 10  | Preload de fuente crítica (Sora)                                 | LCP (cuando el LCP es texto con `--font-heading`)             | `index.html`                                                          |       |         |
| 11  | Script inline anti-FOUC para tema oscuro/claro                   | CLS / percepción visual (no medible en Lighthouse)            | `index.html`, `useThemeState.ts`                                      | N/A   | N/A     |
| —   | **Puntaje Lighthouse Performance global (`/`)**                  | Resumen general                                               | —                                                                     |       |         |
| —   | **Puntaje Lighthouse Performance global (`/u/:username`)**       | Resumen general                                               | —                                                                     |       |         |
