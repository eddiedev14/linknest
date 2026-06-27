import type { SelectOption } from "@/shared/components/forms/fields/SelectField";

const BANNER_PRESETS = [
  "banner-primary",
  "banner-ocean",
  "banner-sunset",
  "banner-forest",
  "banner-lavender",
  "banner-rose",
  "banner-aurora",
  "banner-midnight",
  "banner-gold",
  "banner-cherry",
  "banner-sky",
];

const PROFESSIONAL_STATUS_OPTIONS: SelectOption[] = [
  {
    label: "Available",
    value: "available",
  },
  {
    label: "Open to Opportunities",
    value: "open_to_opportunities",
  },
  {
    label: "Currently Employed",
    value: "currently_employed",
  },
];

const TECH_STACK_OPTIONS: SelectOption[] = [
  // Languages
  { label: "JavaScript", value: "javascript" },
  { label: "TypeScript", value: "typescript" },
  { label: "Python", value: "python" },
  { label: "Java", value: "java" },
  { label: "Go", value: "go" },
  { label: "Rust", value: "rust" },
  { label: "PHP", value: "php" },
  { label: "C#", value: "c-sharp" },
  { label: "C++", value: "c-plus" },

  // Frontend
  { label: "React", value: "react" },
  { label: "Next.js", value: "nextjs" },
  { label: "Vue.js", value: "vuejs" },
  { label: "Angular", value: "angular" },
  { label: "Svelte", value: "svelte" },
  { label: "Tailwind CSS", value: "tailwindcss" },
  { label: "HTML5", value: "html5" },
  { label: "CSS3", value: "css3" },

  // Backend
  { label: "Node.js", value: "nodejs" },
  { label: "Express", value: "express" },
  { label: "NestJS", value: "nestjs" },
  { label: "Laravel", value: "laravel" },
  { label: "Spring Boot", value: "spring-boot" },
  { label: ".NET", value: "dotnet" },

  // Mobile
  { label: "React Native", value: "react-native" },
  { label: "Flutter", value: "flutter" },

  // Databases
  { label: "PostgreSQL", value: "postgresql" },
  { label: "MySQL", value: "mysql" },
  { label: "MongoDB", value: "mongodb" },
  { label: "Redis", value: "redis" },

  // Backend Services
  { label: "Firebase", value: "firebase" },
  { label: "Supabase", value: "supabase" },

  // DevOps
  { label: "Docker", value: "docker" },
  { label: "Kubernetes", value: "kubernetes" },
  { label: "Terraform", value: "terraform" },

  // Tools
  { label: "Git", value: "git" },
  { label: "GitHub", value: "github" },
  { label: "GitLab", value: "gitlab" },

  // AI
  { label: "OpenAI", value: "openai" },
  { label: "Claude", value: "claude" },
  { label: "n8n", value: "n8n" },
];

const LANGUAGES_OPTIONS: SelectOption[] = [
  { label: "Arabic", value: "ar" },
  { label: "Chinese", value: "zh" },
  { label: "Danish", value: "da" },
  { label: "Dutch", value: "nl" },
  { label: "English", value: "en" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Hindi", value: "hi" },
  { label: "Indonesian", value: "id" },
  { label: "Italian", value: "it" },
  { label: "Japanese", value: "ja" },
  { label: "Korean", value: "ko" },
  { label: "Portuguese", value: "pt" },
  { label: "Russian", value: "ru" },
  { label: "Spanish", value: "es" },
  { label: "Thai", value: "th" },
  { label: "Turkish", value: "tr" },
  { label: "Ukrainian", value: "uk" },
];

export { BANNER_PRESETS, PROFESSIONAL_STATUS_OPTIONS, TECH_STACK_OPTIONS, LANGUAGES_OPTIONS };
