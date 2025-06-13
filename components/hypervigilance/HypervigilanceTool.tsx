import React, { useState, useEffect, useCallback } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input, TextArea } from '../ui/Input';

const TimerIcon = (props: { className?: string; [key: string]: any; }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);


const AttentionAnchorExercise: React.FC = () => {
    const DURATION = 60; // 1 minute
    const [timer, setTimer] = useState<number>(DURATION);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [isComplete, setIsComplete] = useState<boolean>(false);

    useEffect(() => {
        let interval: number | undefined;
        if (isActive && timer > 0) {
            interval = window.setInterval(() => {
                setTimer(prevTime => prevTime - 1);
            }, 1000);
        } else if (timer === 0 && isActive) {
            setIsActive(false);
            setIsComplete(true);
            // Optionally play a sound or give other feedback
        }
        return () => window.clearInterval(interval);
    }, [isActive, timer]);

    const handleStart = () => {
        setTimer(DURATION);
        setIsActive(true);
        setIsComplete(false);
    };

    const handleReset = () => {
        setIsActive(false);
        setIsComplete(false);
        setTimer(DURATION);
    };

    return (
        <Card title="Ejercicio: Ancla tu Atención">
            <p className="text-sm text-neutral-dark mb-3">La hipervigilancia te lleva a escanear buscando 'amenazas'. Este ejercicio te ayuda a dirigir tu atención conscientemente a algo neutral o positivo.</p>
            <p className="text-sm text-neutral-dark mb-4">Elige un objeto en tu entorno (una planta, un cuadro, tu mano). Durante 1 minuto, enfoca toda tu atención en sus detalles: colores, formas, texturas. Si tu mente se distrae (¡es normal!), redirígela suavemente al objeto.</p>
            
            <div className="my-6 text-center">
                {isActive ? (
                    <p className="text-4xl font-bold text-primary">{timer}s</p>
                ) : isComplete ? (
                    <p className="text-xl font-semibold text-green-600">¡Bien hecho! Ejercicio completado.</p>
                ) : (
                    <p className="text-xl text-neutral-dark">Listo para empezar.</p>
                )}
            </div>

            <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-3">
                {!isActive && !isComplete && (
                    <Button onClick={handleStart} variant="primary" leftIcon={<TimerIcon />}>Iniciar Minuto de Enfoque</Button>
                )}
                {isActive && (
                    <Button onClick={() => setIsActive(false)} variant="secondary">Pausar</Button>
                )}
                {(!isActive || isComplete) && timer < DURATION && (
                     <Button onClick={handleReset} variant="ghost">Reiniciar</Button>
                )}
            </div>
             {isComplete && <p className="text-sm text-neutral-dark text-center mt-4">Tómate un momento para notar cómo te sientes.</p>}
        </Card>
    );
}

interface AssumptionChallengeState {
    situation: string;
    cues: string;
    interpretation: string;
    altInterpretation1: string;
    altInterpretation2: string;
    reflection: string;
}

const initialAssumptionState: AssumptionChallengeState = {
    situation: '',
    cues: '',
    interpretation: '',
    altInterpretation1: '',
    altInterpretation2: '',
    reflection: ''
};

const AssumptionChallengeExercise: React.FC = () => {
    const [formState, setFormState] = useState<AssumptionChallengeState>(initialAssumptionState);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleClear = () => {
        setFormState(initialAssumptionState);
    };
    
    return (
        <Card title="Ejercicio: Observador Consciente">
            <p className="text-sm text-neutral-dark mb-4">Piensa en una situación social reciente donde te sentiste particularmente alerta o ansioso/a, y reflexiona sobre tus interpretaciones.</p>
            <div className="space-y-4">
                <Input 
                    label="Situación:" 
                    name="situation" 
                    value={formState.situation} 
                    onChange={handleChange} 
                    placeholder="Ej: Durante una reunión de equipo..."
                />
                <TextArea 
                    label="Señales Específicas Notadas:" 
                    name="cues" 
                    value={formState.cues} 
                    onChange={handleChange} 
                    placeholder="Ej: Alguien miró su reloj, hubo un silencio largo..."
                    rows={2}
                />
                <TextArea 
                    label="Interpretación Inmediata (Tu 'Radar'):" 
                    name="interpretation" 
                    value={formState.interpretation} 
                    onChange={handleChange} 
                    placeholder="Ej: 'Se están aburriendo', 'Dije algo incorrecto'"
                    rows={2}
                />
                <TextArea 
                    label="Interpretación Alternativa 1 (Más Neutral):" 
                    name="altInterpretation1" 
                    value={formState.altInterpretation1} 
                    onChange={handleChange} 
                    placeholder="Ej: 'Quizás están pensando en su próxima tarea', 'El silencio es solo una pausa natural'"
                    rows={2}
                />
                <TextArea 
                    label="Interpretación Alternativa 2 (Positiva o Realista):" 
                    name="altInterpretation2" 
                    value={formState.altInterpretation2} 
                    onChange={handleChange} 
                    placeholder="Ej: 'Tal vez están procesando la información', 'Puede que simplemente no tengan nada que añadir en este momento'"
                    rows={2}
                />
                <TextArea 
                    label="Reflexión Final:" 
                    name="reflection" 
                    value={formState.reflection} 
                    onChange={handleChange} 
                    placeholder="¿Cómo cambia tu sentir o perspectiva al considerar estas alternativas?"
                    rows={2}
                />
                <div className="flex justify-end">
                    <Button onClick={handleClear} variant="outline">Limpiar Ejercicio</Button>
                </div>
            </div>
        </Card>
    );
}


export const HypervigilanceTool: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-neutral-darker">Manejo de Hipervigilancia</h2>

      <Card title="¿Qué es la Hipervigilancia Social?">
        <p className="text-neutral-dark leading-relaxed">
          La hipervigilancia es como tener un <strong className="text-primary-dark">'radar' interno demasiado sensible</strong>, constantemente buscando señales de juicio, rechazo o peligro en las interacciones sociales. Aunque es un intento natural de tu mente por protegerte, en la ansiedad social este radar puede estar descalibrado.
        </p>
        <p className="mt-2 text-neutral-dark leading-relaxed">
          Esto puede llevarte a:
        </p>
        <ul className="list-disc list-inside ml-4 mt-1 space-y-1 text-neutral-dark">
            <li>Interpretar negativamente expresiones faciales, tonos de voz o silencios que en realidad son neutros.</li>
            <li>Sentirte constantemente tenso/a y en alerta.</li>
            <li>Agotarte mental y emocionalmente en situaciones sociales.</li>
        </ul>
        <p className="mt-3 text-neutral-dark leading-relaxed">
          Esta sección te ofrece herramientas para entender y <strong className="text-primary-dark">calibrar tu radar</strong>, ayudándote a sentirte más seguro/a y presente.
        </p>
      </Card>
      
      <AssumptionChallengeExercise />
      <AttentionAnchorExercise />

      <Card title="Consejos para Calibrar tu Radar">
        <ul className="list-disc list-inside space-y-2 text-neutral-dark">
          <li>
            <strong className="text-primary-dark">Foco Amplio vs. Foco Estrecho:</strong> En lugar de analizar cada detalle de una persona (microexpresiones, gestos), intenta tener una percepción más general y abierta del ambiente y la conversación en su conjunto.
          </li>
          <li>
            <strong className="text-primary-dark">Curiosidad en vez de Juicio:</strong> Cuando notes una señal ambigua, aborda la situación con curiosidad ("¿Qué más podría significar esto?") en lugar de saltar a la peor conclusión. Pregúntate: "¿Tengo toda la información para estar seguro/a de esta interpretación?"
          </li>
          <li>
            <strong className="text-primary-dark">Mindfulness Breve:</strong> Practica breves momentos de atención plena a tu respiración o a tus sentidos (vista, oído, tacto) durante el día. Esto puede ayudarte a 'resetear' tu atención y anclarte en el presente, reduciendo el escaneo ansioso.
          </li>
           <li>
            <strong className="text-primary-dark">Reduce el 'Escaneo':</strong> Intenta conscientemente no analizar cada micro-expresión o tono de voz. Recuerda que muchas veces las personas están preocupadas por sus propias cosas y no te están juzgando.
          </li>
        </ul>
      </Card>

    </div>
  );
};