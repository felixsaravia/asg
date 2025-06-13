import React from 'react';

// Heroicons or FontAwesome icons (using React.createElement for SVGs)

const HomeIcon = (props) => (
  React.createElement('svg', {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    className: "w-6 h-6",
    ...props
  },
  React.createElement('path', {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m2.25 12 8.954-8.955a1.5 1.5 0 0 1 2.122 0l8.954 8.955M6.75 21V11.25l5.25-5.25 5.25 5.25V21"
  }))
);

const BookOpenIcon = (props) => (
  React.createElement('svg', {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    className: "w-6 h-6",
    ...props
  },
  React.createElement('path', {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6-2.292m0 0v14.25"
  }))
);

const BrainIcon = (props) => ( // Cognitive Restructuring
  React.createElement('svg', {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    className: "w-6 h-6",
    ...props
  },
  React.createElement('path', {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
  }),
  React.createElement('path', {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M15.75 15a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
  }),
  React.createElement('path', {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M19.5 12c0-3.05-1.86-5.726-4.588-6.942m-9.824 0A9.004 9.004 0 0012 2.25c2.368 0 4.52.91 6.13 2.388m-9.862 12.264A9.004 9.004 0 0012 21.75c2.368 0 4.52-.91 6.13-2.388"
  }))
);

const TrendingUpIcon = (props) => ( // Gradual Exposure
  React.createElement('svg', {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    className: "w-6 h-6",
    ...props
  },
  React.createElement('path', {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M2.25 18L9 11.25l3 3L21.75 6"
  }),
  React.createElement('path', {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M21.75 6v4.5m0-4.5h-4.5"
  }))
);

const HeartIcon = (props) => ( // Regulation Techniques
  React.createElement('svg', {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    className: "w-6 h-6",
    ...props
  },
  React.createElement('path', {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
  }))
);

const UsersIcon = (props) => ( // Social Skills
  React.createElement('svg', {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    className: "w-6 h-6",
    ...props
  },
  React.createElement('path', {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-3.727-5.603l-3.038-1.012A4.5 4.5 0 0010.5 9.512c0-2.16.95-3.851 2.486-4.654A4.502 4.502 0 0012 4.5c.76 0 1.49.197 2.148.558A4.502 4.502 0 0013.5 9.512c0 .585.116 1.144.328 1.658l3.038 1.012a5.971 5.971 0 003.434 5.266M12 9.75V12m0 0V9.75m0 2.25H9.75M12 12h2.25"
  }))
);

const AcademicCapIcon = (props) => ( // Educational
  React.createElement('svg', {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    className: "w-6 h-6",
    ...props
  },
  React.createElement('path', {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M12 14.25L4.095 9.375M12 14.25l7.905-4.875M12 14.25V21M12 3L20.25 8.25M12 3L3.75 8.25M20.25 8.25v7.5M3.75 8.25v7.5M21 16.5l-9 4.75-9-4.75"
  }))
);

const StarIcon = (props) => ( // Achievements
  React.createElement('svg', {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    className: "w-6 h-6",
    ...props
  },
  React.createElement('path', {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.82.61l-4.725-2.885a.563.563 0 00-.652 0l-4.725 2.885a.562.562 0 01-.82-.61l1.285-5.385a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
  }))
);

const ShieldCheckIcon = (props) => ( // Panic Prevention
  React.createElement('svg', {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    className: "w-6 h-6", // Default size, can be overridden by props
    ...props
  },
  React.createElement('path', {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
  }))
);

const EyeLoupeIcon = (props) => ( // Hypervigilance Management
  React.createElement('svg', {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    className: "w-6 h-6",
    ...props
  },
    React.createElement('path', {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z"
    }),
    React.createElement('path', { // Simple eye representation inside the loupe
        strokeLinecap: "round",
        strokeLinejoin: "round",
        d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    })
  )
);


export const NAV_ITEMS = [
  { name: 'Inicio', path: '/dashboard', icon: HomeIcon },
  { name: 'Bitácora Emocional', path: '/log', icon: BookOpenIcon },
  { name: 'Reestructuración', path: '/restructure', icon: BrainIcon },
  { name: 'Exposición Gradual', path: '/exposure', icon: TrendingUpIcon },
  { name: 'Técnicas de Regulación', path: '/regulate', icon: HeartIcon },
  { name: 'Prevenir Pánico', path: '/panic-prevention', icon: ShieldCheckIcon },
  { name: 'Manejo de Hipervigilancia', path: '/hypervigilance', icon: EyeLoupeIcon },
  { name: 'Habilidades Sociales', path: '/skills', icon: UsersIcon },
  { name: 'Material Educativo', path: '/learn', icon: AcademicCapIcon },
  { name: 'Logros', path: '/achievements', icon: StarIcon },
];

export const API_KEY_ERROR_MESSAGE = "La clave API de Gemini no está configurada. Por favor, asegúrate de que la variable de entorno API_KEY esté definida.";
export const GENERIC_API_ERROR_MESSAGE = "Ocurrió un error al contactar el servicio de IA. Intenta de nuevo más tarde.";

export const EMOTIONAL_LOG_KEY = 'presenteSeguro_emotionalLog';
export const THOUGHT_RECORDS_KEY = 'presenteSeguro_thoughtRecords';
export const EXPOSURE_STEPS_KEY = 'presenteSeguro_exposureSteps';
export const ACHIEVEMENTS_KEY = 'presenteSeguro_achievements';
export const USER_PREFERENCES_KEY = 'presenteSeguro_userPrefs';

export const DEFAULT_ACHIEVEMENTS = [
    { id: 'first_log', title: 'Primer Registro', description: 'Completaste tu primera entrada en la bitácora emocional.', unlocked: false, icon: '📝' },
    { id: 'first_thought_record', title: 'Pensador Crítico', description: 'Creaste tu primer registro de pensamiento.', unlocked: false, icon: '🤔' },
    { id: 'first_exposure', title: 'Paso Valiente', description: 'Completaste tu primer ejercicio de exposición.', unlocked: false, icon: '🚶' },
    { id: 'consistent_log_3days', title: 'Hábito de Bitácora', description: 'Registraste en tu bitácora por 3 días seguidos.', unlocked: false, icon: '🗓️' },
];

export const DAILY_SUGGESTIONS = [
  {
    id: 'sug1',
    title: 'Respiración Consciente (3-5 min)',
    description: 'Dedica unos minutos a la respiración diafragmática. Inhala contando hasta 4, sostén 4, exhala 6. Repite.',
    actionText: 'Probar técnica de respiración',
    actionLink: '/regulate',
  },
  {
    id: 'sug2',
    title: 'Pequeño Acto de Autocuidado',
    description: 'Realiza una actividad breve que disfrutes y te relaje: escuchar una canción, estirarte, o tomar tu bebida favorita.',
    actionText: 'Ver ideas de regulación',
    actionLink: '/regulate',
  },
  {
    id: 'sug3',
    title: 'Observa un Pensamiento Negativo',
    description: 'Identifica un pensamiento ansioso o negativo que hayas tenido hoy. Obsérvalo sin juzgarlo, como una nube pasajera.',
    actionText: 'Ir a Reestructuración',
    actionLink: '/restructure',
  },
  {
    id: 'sug4',
    title: 'Planifica un Pequeño Reto Social',
    description: 'Piensa en una interacción social pequeña que podrías hacer hoy o mañana, como saludar a un vecino o preguntar algo a un empleado.',
    actionText: 'Ver ideas de exposición',
    actionLink: '/exposure',
  },
  {
    id: 'sug5',
    title: 'Anota Algo Positivo',
    description: 'Escribe una cosa buena que te haya pasado hoy, por pequeña que sea, o algo por lo que estés agradecido/a.',
    actionText: 'Ir a Bitácora Emocional',
    actionLink: '/log',
  }
];