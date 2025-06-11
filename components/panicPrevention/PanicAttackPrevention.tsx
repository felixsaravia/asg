
import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

const FocusIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9.75L17.25 12l-1.5 2.25M8.25 9.75L6.75 12l1.5 2.25m0 0l1.5-2.25M12 6.75L10.5 9.75m1.5-3l1.5 3M12 17.25l1.5-3m-1.5 3L10.5 14.25" />
  </svg>
);

const CloudIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.311A2.25 2.25 0 002.25 15z" />
  </svg>
);

const HeartBeatIcon = (props: React.SVGProps<SVGSVGElement>) => ( // For chest sensation
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 1.674.827 3.188 2.092 4.144L12 21l6.908-8.606A4.734 4.734 0 0021 8.25z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 5.25v2.25m0 0v2.25m0-2.25h-2.25m2.25 0h2.25" />
    </svg>
);


interface ExerciseStep {
  title: string;
  content: React.ReactNode[];
  icon?: React.ElementType;
}

const stepsData: ExerciseStep[] = [
  {
    title: "Bienvenido/a al Ejercicio de Prevención de Pánico",
    content: [
      <p key="p1">Esta guía te ayudará a manejar las sensaciones físicas y los pensamientos que pueden desencadenar ansiedad intensa o pánico, especialmente la opresión en el pecho y la preocupación por la evaluación social.</p>,
      <p key="p2" className="mt-2">Presiona "Comenzar" para iniciar el ejercicio.</p>
    ],
  },
  {
    title: "Paso 1: Reconoce y Normaliza",
    icon: (props) => <HeartBeatIcon className="w-8 h-8 text-primary mb-2" {...props} />,
    content: [
      <p key="p1">Es común sentir sensaciones físicas como opresión en el pecho cuando estás ansioso/a, o preocuparte por lo que otros piensan.</p>,
      <p key="p2" className="mt-2">Estos son signos de que tu cuerpo y mente están reaccionando al estrés, no necesariamente de un peligro real. Tu cuerpo está tratando de protegerte, aunque a veces la alarma sea demasiado sensible.</p>,
      <p key="p3" className="mt-2">Recuerda: esta sensación no es peligrosa, solo incómoda.</p>
    ],
  },
  {
    title: "Paso 2: Observación Consciente de tu Pecho",
    icon: (props) => <FocusIcon className="w-8 h-8 text-primary mb-2" {...props}/>,
    content: [
      <p key="p1">Cierra los ojos si te sientes cómodo/a. Lleva tu atención a tu pecho. Observa la sensación sin juzgarla. ¿Es tensión, presión, calor, hormigueo? No intentes cambiarla, solo obsérvala como un científico curioso.</p>,
      <p key="p2" className="mt-2">Ahora, imagina que con cada inhalación, el aire llega suavemente a esa zona. Y con cada exhalación, visualiza que un poco de esa tensión se libera, como el aire de un globo desinflándose lentamente.</p>,
      <p key="p3" className="mt-2"><strong className="text-primary-dark">Toma 3 respiraciones profundas y lentas</strong>, enfocándote en esta idea.</p>
    ],
  },
  {
    title: "Paso 3: Anclaje en el Presente",
    icon: (props) => <FocusIcon className="w-8 h-8 text-primary mb-2" {...props}/>,
    content: [
      <p key="p1">Suavemente desvía tu atención de tu cuerpo. Abre los ojos si los tenías cerrados. Enfócate en tu entorno para anclarte en el momento presente.</p>,
      <p key="p2" className="mt-2 font-semibold">Nombra mentalmente (o en voz baja):</p>,
      <ul key="ul1" className="list-disc list-inside ml-4 mt-1 space-y-1">
        <li><strong>3 cosas que puedes VER</strong> a tu alrededor (ej. un color específico, la forma de un objeto, una luz).</li>
        <li><strong>2 sonidos que puedes ESCUCHAR</strong> (ej. el sonido del ambiente, tu propia respiración, un ruido lejano).</li>
        <li><strong>1 sensación TÁCTIL</strong> (ej. tus pies en el suelo, la textura de tu ropa, la temperatura de la silla).</li>
      </ul>,
      <p key="p3" className="mt-2">Este ejercicio ayuda a tu mente a salir del ciclo de pensamientos ansiosos y a conectarse con la realidad actual.</p>
    ],
  },
  {
    title: "Paso 4: Distanciándote de los Pensamientos",
    icon: (props) => <CloudIcon className="w-8 h-8 text-primary mb-2" {...props}/>,
    content: [
      <p key="p1">Si te preocupa lo que otros piensan ('¿Me estarán juzgando?', '¿Se darán cuenta de mi ansiedad?'), recuerda: <strong className="text-primary-dark">estos son solo pensamientos, no hechos.</strong></p>,
      <p key="p2" className="mt-2">No puedes leer la mente de los demás, y ellos tampoco pueden leer la tuya con tanta claridad como imaginas.</p>,
      <p key="p3" className="mt-2">Imagina que esos pensamientos son como nubes en el cielo: aparecen, se mueven y eventualmente se van. Tú eres el cielo, vasto y constante, no las nubes pasajeras. No tienes que aferrarte a cada pensamiento ni creerle ciegamente.</p>
    ],
  },
  {
    title: "Paso 5: Refuerzo Positivo y Cierre",
    content: [
      <p key="p1">Has hecho un gran trabajo al recorrer estos pasos. Ahora, refuerza tu calma con una afirmación. Puedes decirte a ti mismo/a en voz alta o mentalmente:</p>,
      <p key="p2" className="my-4 p-3 bg-secondary-light text-accent-dark rounded-md text-center text-lg font-semibold">
        "Estoy seguro/a y soy capaz. Controlo mis respuestas. Estas sensaciones y pensamientos pasarán."
      </p>,
      <p key="p3" className="mt-2">Recuerda que puedes volver a este ejercicio siempre que lo necesites. La práctica regular fortalece tu capacidad para manejar la ansiedad.</p>
    ],
  }
];


export const PanicAttackPrevention: React.FC = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const handleNextStep = () => {
    if (currentStepIndex < stepsData.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };
  
  const handleRestart = () => {
    setCurrentStepIndex(0);
  }

  const currentStepData = stepsData[currentStepIndex];
  const IconComponent = currentStepData.icon;

  return (
    <div className="space-y-6">
      <Card title={currentStepData.title} className="shadow-xl">
        {IconComponent && <div className="flex justify-center"><IconComponent /></div>}
        <div className="text-neutral-darker space-y-3 mb-6 prose max-w-none">
          {currentStepData.content}
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0 sm:space-x-3 pt-4 border-t border-neutral-DEFAULT">
          {currentStepIndex === 0 ? (
            <Button onClick={handleNextStep} variant="primary" className="w-full sm:w-auto">
              Comenzar Ejercicio
            </Button>
          ) : (
            <>
              <Button onClick={handlePreviousStep} variant="outline" disabled={currentStepIndex === 0} className="w-full sm:w-auto">
                Anterior
              </Button>
              {currentStepIndex < stepsData.length - 1 ? (
                <Button onClick={handleNextStep} variant="primary" className="w-full sm:w-auto">
                  Siguiente Paso
                </Button>
              ) : (
                <Button onClick={handleRestart} variant="secondary" className="w-full sm:w-auto">
                  Reiniciar Ejercicio
                </Button>
              )}
            </>
          )}
        </div>
      </Card>
      
      {currentStepIndex === stepsData.length - 1 && (
        <Card className="text-center">
            <p className="text-lg text-green-600 font-semibold">¡Has completado el ejercicio!</p>
            <p className="text-neutral-dark mt-2">Esperamos que te sientas más calmado/a y centrado/a.</p>
        </Card>
      )}
    </div>
  );
};
