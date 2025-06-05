
export interface NavItemDefinition {
  name: string;
  path: string;
  icon: React.ElementType; // For FontAwesome or custom SVG components
}

export interface EmotionalLogEntry {
  id: string;
  date: string; // ISO string
  situation: string;
  thoughts: string;
  feelings: string;
  actions: string;
  anxietyLevel: number; // 0-10
}

export interface ThoughtRecord {
  id: string;
  date: string; // ISO string
  situation: string;
  automaticThought: string;
  emotion: string;
  evidenceFor: string;
  evidenceAgainst: string;
  alternativeThought: string;
  outcome: string;
}

export interface ExposureStep {
  id: string;
  description: string;
  targetAnxiety: number; // 0-10
  completed: boolean;
  repetitions: number;
  notes?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
  dateUnlocked?: string; // ISO string
  icon: string; // e.g., emoji or icon class name
}

export interface EducationalResource {
  id: string;
  type: 'video' | 'article';
  title: string;
  summary: string;
  contentUrl?: string; // For videos or external articles
  content?: string; // For inline articles
  tags: string[];
}

export enum EmotionalFeeling {
    Feliz = "Feliz",
    Triste = "Triste",
    Ansioso = "Ansioso",
    Enojado = "Enojado",
    Calmado = "Calmado",
    Entusiasmado = "Entusiasmado",
    Neutral = "Neutral"
}
    