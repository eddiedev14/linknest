import type { Tech } from "../types/tech.type";

export const TECH_LABELS = {
  // Languages
  javascript: "JavaScript",
  typescript: "TypeScript",
  python: "Python",
  java: "Java",
  go: "Go",
  rust: "Rust",
  php: "PHP",
  "c-sharp": "C#",
  "c-plus": "C++",

  // Frontend
  react: "React",
  nextjs: "Next.js",
  vuejs: "Vue.js",
  angular: "Angular",
  svelte: "Svelte",
  tailwindcss: "Tailwind CSS",
  html5: "HTML5",
  css3: "CSS3",

  // Backend
  nodejs: "Node.js",
  express: "Express",
  nestjs: "NestJS",
  laravel: "Laravel",
  "spring-boot": "Spring Boot",
  dotnet: ".NET",

  // Mobile
  "react-native": "React Native",
  flutter: "Flutter",

  // Databases
  postgresql: "PostgreSQL",
  mysql: "MySQL",
  mongodb: "MongoDB",
  redis: "Redis",

  // Backend Services
  firebase: "Firebase",
  supabase: "Supabase",

  // DevOps
  docker: "Docker",
  kubernetes: "Kubernetes",
  terraform: "Terraform",

  // Tools
  git: "Git",
  github: "GitHub",
  gitlab: "GitLab",

  // AI
  openai: "OpenAI",
  claude: "Claude",
  n8n: "n8n",
} as const;

export const TECH_VALUES = Object.keys(TECH_LABELS) as Tech[];
