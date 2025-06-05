import React, { useState, useEffect, useCallback } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

const PlayIcon = (props: { className?: string; [key: string]: any; }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
  </svg>
);

const PauseIcon = (props: { className?: string; [key: string]: any; }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
  </svg>
);

const StopIcon = (props: { className?: string; [key: string]: any; }) => (
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 7.5A2.25 2.25 0 017.5 5.25h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-9z" />
  </svg>
);


const BreathingExercise: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale' | 'wait'>('wait');
  const [count, setCount] = useState(0);
  const inhaleTime = 4;
  const holdTime = 4;
  const exhaleTime = 6;

  const runCycle = useCallback(() => {
    if (phase === 'wait' || phase === 'exhale') {
      setPhase('inhale');
      setCount(inhaleTime);
    } else if (phase === 'inhale') {
      setPhase('hold');
      setCount(holdTime);
    } else if (phase === 'hold') {
      setPhase('exhale');
      setCount(exhaleTime);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]); // Keep phase as dependency, this means runCycle changes when phase changes

  useEffect(() => {
    let timer: number | undefined; // Changed NodeJS.Timeout to number
    if (isRunning && count > 0) {
      timer = window.setTimeout(() => setCount(c => c - 1), 1000); // Use window.setTimeout for clarity
    } else if (isRunning && count === 0) {
      runCycle();
    }
    return () => clearTimeout(timer);
  }, [isRunning, count, runCycle]);


  const startExercise = () => {
    setIsRunning(true);
    setPhase('inhale');
    setCount(inhaleTime);
  };

  const pauseExercise = () => {
    setIsRunning(false);
  };
  
  const stopExercise = () => {
    setIsRunning(false);
    setPhase('wait');
    setCount(0);
  }

  const getPhaseText = () => {
    switch (phase) {
      case 'inhale': return 'Inhala...';
      case 'hold': return 'Sostén...';
      case 'exhale': return 'Exhala...';
      default: return 'Presiona Iniciar';
    }
  };

  return (
    <Card title="Respiración Diafragmática Guiada (4-4-6)">
      <p className="text-sm text-neutral-dark mb-4">Sigue las instrucciones para calmar tu sistema nervioso.</p>
      <div className="text-center my-8">
        <p className="text-3xl font-semibold text-primary mb-2">{getPhaseText()}</p>
        {isRunning && <p className="text-5xl font-bold text-secondary-dark">{count}</p>}
      </div>
      <div className="flex justify-center space-x-3">
        {!isRunning && phase === 'wait' && (
          <Button onClick={startExercise} variant="primary" leftIcon={<PlayIcon />}>Iniciar</Button>
        )}
        {isRunning && (
          <Button onClick={pauseExercise} variant="secondary" leftIcon={<PauseIcon />}>Pausar</Button>
        )}
        {!isRunning && phase !== 'wait' && (
           <Button onClick={startExercise} variant="primary" leftIcon={<PlayIcon />}>Reanudar</Button>
        )}
        {(isRunning || phase !== 'wait') && (
            <Button onClick={stopExercise} variant="danger" leftIcon={<StopIcon />}>Detener</Button>
        )}
      </div>
      <div className="mt-6 p-3 bg-neutral-light rounded-lg text-sm text-neutral-dark">
        <h4 className="font-semibold mb-1">Instrucciones:</h4>
        <ul className="list-disc list-inside space-y-1">
            <li>Siéntate o acuéstate cómodamente.</li>
            <li>Coloca una mano sobre tu pecho y la otra sobre tu abdomen.</li>
            <li><strong>Inhala (4s):</strong> Inhala lentamente por la nariz, sintiendo cómo tu abdomen se expande.</li>
            <li><strong>Sostén (4s):</strong> Mantén el aire por un momento.</li>
            <li><strong>Exhala (6s):</strong> Exhala lentamente por la boca, sintiendo cómo tu abdomen desciende.</li>
            <li>Repite el ciclo varias veces.</li>
        </ul>
      </div>
    </Card>
  );
};

const affirmations = [
  "Estoy bien tal como soy.",
  "No necesito ser perfecto/a para ser valorado/a.",
  "Merezco sentirme tranquilo/a y seguro/a.",
  "Puedo manejar situaciones sociales con calma.",
  "Mis pensamientos no siempre son la realidad.",
  "Elijo enfocarme en lo positivo.",
  "Soy capaz y fuerte.",
  "Cada día es una nueva oportunidad para crecer."
];

const Affirmations: React.FC = () => {
  const [currentAffirmation, setCurrentAffirmation] = useState(affirmations[0]);

  const showNewAffirmation = () => {
    const randomIndex = Math.floor(Math.random() * affirmations.length);
    setCurrentAffirmation(affirmations[randomIndex]);
  };

  return (
    <Card title="Afirmaciones Sociales Positivas">
      <p className="text-sm text-neutral-dark mb-4">Repite estas afirmaciones para fortalecer tu autoimagen y reducir la autocrítica.</p>
      <div className="my-8 p-6 bg-accent-light text-accent-dark rounded-lg text-center min-h-[100px] flex items-center justify-center">
        <p className="text-xl font-medium">{currentAffirmation}</p>
      </div>
      <div className="text-center">
        <Button onClick={showNewAffirmation} variant="secondary">Mostrar Otra Afirmación</Button>
      </div>
    </Card>
  );
};


export const RegulationTechniques: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-neutral-darker">Técnicas de Regulación Emocional</h2>
      <BreathingExercise />
      <Affirmations />
      <Card title="Meditación Mindfulness (Próximamente)">
        <p className="text-neutral-dark">Una guía de meditación para ayudarte a conectar con el presente y observar tus pensamientos sin juicio. ¡Esta función llegará pronto!</p>
      </Card>
    </div>
  );
};