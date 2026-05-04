/**
 * Datos de ejemplo del curso.
 * Estructura: curso → fases → rejilla de celdas (ids de tema o null) + mapa de temas.
 */
window.COURSE_DATA = {
  id: "dev-fullstack-101",
  name: "Fundamentos para desarrollo web",
  description:
    "Ruta práctica desde la terminal hasta JavaScript, con sesiones largas en YouTube, highlights por momento clave y capítulos resumidos cuando aplica.",
  phases: [
    {
      id: "fase-1",
      name: "Entorno y control de versiones",
      grid: {
        columns: 4,
        cells: ["terminal", "git", null, null],
      },
      topics: {
        terminal: {
          id: "terminal",
          shortLabel: "CLI",
          title: "Terminal y línea de comandos",
          description:
            "Navegación, permisos, pipes y scripts básicos. Base para todo lo demás.",
          fullVideo: {
            youtubeId: "hHBWF1Hqcbk",
            title: "Sesión completa — Terminal (ejemplo)",
          },
          highlights: [
            { id: "h1", label: "Intro shell", startSeconds: 0 },
            { id: "h2", label: "cd / ls / rutas", startSeconds: 120 },
            { id: "h3", label: "Permisos chmod", startSeconds: 300 },
            { id: "h4", label: "Pipes y grep", startSeconds: 480 },
          ],
          chapters: [],
        },
        git: {
          id: "git",
          shortLabel: "Git",
          title: "Git y flujo de trabajo",
          description:
            "Commits, ramas, merge y remotes. Trabajo colaborativo con buenas prácticas.",
          fullVideo: {
            youtubeId: "8JJ101D3knE",
            title: "Sesión completa — Git (ejemplo)",
          },
          highlights: [
            { id: "g1", label: "init / status", startSeconds: 30 },
            { id: "g2", label: "branch / checkout", startSeconds: 200 },
            { id: "g3", label: "merge conflictos", startSeconds: 450 },
          ],
          chapters: [
            {
              id: "c-git-1",
              title: "Git en 15 min — resumen",
              description: "Versión corta con los highlights del tema.",
              youtubeId: "USjZcfj8yxE",
            },
          ],
        },
      },
    },
    {
      id: "fase-2",
      name: "Marcado y estilo",
      grid: {
        columns: 4,
        cells: ["html", "css", null, "html-css-lab"],
      },
      topics: {
        html: {
          id: "html",
          shortLabel: "HTML",
          title: "HTML semántico",
          description:
            "Estructura, accesibilidad básica, formularios y buenas prácticas.",
          fullVideo: {
            youtubeId: "pQN-pnXPaVg",
            title: "Sesión completa — HTML (ejemplo)",
          },
          highlights: [
            { id: "ht1", label: "Estructura documento", startSeconds: 60 },
            { id: "ht2", label: "Formularios", startSeconds: 400 },
            { id: "ht3", label: "Semántica a11y", startSeconds: 900 },
          ],
          chapters: [
            {
              id: "c-html-1",
              title: "HTML esencial — capítulo",
              description: "Recorte con lo más usado en proyectos reales.",
              youtubeId: "UB1O30fR-EE",
            },
          ],
        },
        css: {
          id: "css",
          shortLabel: "CSS",
          title: "CSS layout y diseño",
          description:
            "Flexbox, grid, variables, responsive y un poco de animación.",
          fullVideo: {
            youtubeId: "1Rs2ND1ryYc",
            title: "Sesión completa — CSS (ejemplo)",
          },
          highlights: [
            { id: "cs1", label: "Selectores y cascada", startSeconds: 120 },
            { id: "cs2", label: "Flexbox", startSeconds: 600 },
            { id: "cs3", label: "CSS Grid", startSeconds: 1200 },
          ],
          chapters: [],
        },
        "html-css-lab": {
          id: "html-css-lab",
          shortLabel: "Lab",
          title: "Laboratorio HTML + CSS",
          description:
            "Ejercicio integrador: maquetar un componente con lo visto en ambos temas.",
          fullVideo: {
            youtubeId: "G3e-cpL9ofE",
            title: "Sesión completa — Lab (ejemplo)",
          },
          highlights: [
            { id: "lb1", label: "Brief del diseño", startSeconds: 0 },
            { id: "lb2", label: "Implementación", startSeconds: 300 },
          ],
          chapters: [],
        },
      },
    },
    {
      id: "fase-3",
      name: "Programación en el navegador",
      grid: {
        columns: 4,
        cells: [null, "javascript", "dom", "async"],
      },
      topics: {
        javascript: {
          id: "javascript",
          shortLabel: "JS",
          title: "JavaScript moderno",
          description:
            "Tipos, funciones, arrays, objetos, módulos y ES6+.",
          fullVideo: {
            youtubeId: "W6NZfCO5SIk",
            title: "Sesión completa — JavaScript (ejemplo)",
          },
          highlights: [
            { id: "js1", label: "let / const", startSeconds: 180 },
            { id: "js2", label: "Funciones flecha", startSeconds: 600 },
            { id: "js3", label: "Promesas", startSeconds: 1500 },
          ],
          chapters: [
            {
              id: "c-js-1",
              title: "JS en 10 min — repaso",
              description: "Solo highlights del curso largo.",
              youtubeId: "hdI2bqOjy3c",
            },
          ],
        },
        dom: {
          id: "dom",
          shortLabel: "DOM",
          title: "DOM y eventos",
          description:
            "Selección de nodos, manipulación, delegación y rendimiento básico.",
          fullVideo: {
            youtubeId: "0ik6X4DJKCc",
            title: "Sesión completa — DOM (ejemplo)",
          },
          highlights: [
            { id: "dm1", label: "querySelector", startSeconds: 90 },
            { id: "dm2", label: "Event listeners", startSeconds: 400 },
          ],
          chapters: [],
        },
        async: {
          id: "async",
          shortLabel: "Async",
          title: "Asincronía y red",
          description:
            "fetch, async/await, JSON y manejo de errores en la UI.",
          fullVideo: {
            youtubeId: "ZiYw7buZ7eE",
            title: "Sesión completa — Async (ejemplo)",
          },
          highlights: [
            { id: "as1", label: "fetch básico", startSeconds: 120 },
            { id: "as2", label: "async/await", startSeconds: 400 },
          ],
          chapters: [],
        },
      },
    },
  ],
};
