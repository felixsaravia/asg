
import React, { useState, useEffect } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';

const sensorySteps = [
  { count: 5, instruction: "Nombra 5 cosas que puedes VER a tu alrededor.", placeholder: "Ej: una lámpara, un cuadro, tus manos..." },
  { count: 4, instruction: "Identifica 4 cosas que puedes TOCAR.", placeholder: "Ej: la tela de tu ropa, la mesa, tu cabello..." },
  { count: 3, instruction: "Escucha 3 sonidos diferentes.", placeholder: "Ej: el tic-tac del reloj, pájaros cantando, tu respiración..." },
  { count: 2, instruction: "Huele 2 olores distintos.", placeholder: "Ej: el aroma del café, un perfume, el aire fresco..." },
  { count: 1, instruction: "Saborea 1 cosa (o imagina un sabor).", placeholder: "Ej: un sorbo de agua, un chicle, el recuerdo de tu comida favorita..." },
];

export const CrisisModeModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [audio] = useState(typeof Audio !== "undefined" ? new Audio("https://www.soundjay.com/nature/sounds/ocean-wave-2.mp3") : null); // Placeholder calming sound

  useEffect(() => {
    if (isOpen) {
      setCurrentStepIndex(0);
      setCompletedSteps([]);
      setUserInput('');
    } else {
      if (audio && isAudioPlaying) {
        audio.pause();
        audio.currentTime = 0;
        setIsAudioPlaying(false);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]); // Audio handling only on isOpen change

  useEffect(() => {
    if (audio) {
        audio.loop = true;
        if (isAudioPlaying) {
            audio.play().catch(e => console.error("Error playing audio:", e));
        } else {
            audio.pause();
        }
    }
    // Cleanup function to pause audio when component unmounts or isAudioPlaying becomes false
    return () => {
        if (audio) {
            audio.pause();
        }
    };
  }, [isAudioPlaying, audio]);


  const handleNextStep = () => {
    if (userInput.trim() !== '') {
      setCompletedSteps(prev => [...prev, `${sensorySteps[currentStepIndex].instruction}: ${userInput}`]);
    }
    setUserInput('');
    if (currentStepIndex < sensorySteps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      // Technique finished
    }
  };

  const toggleAudio = () => {
    setIsAudioPlaying(!isAudioPlaying);
  };
  
  const currentStep = sensorySteps[currentStepIndex];
  const isFinished = currentStepIndex >= sensorySteps.length -1 && userInput.trim() !== '' && completedSteps.length === sensorySteps.length -1 ;


  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Modo Crisis - Anclaje Sensorial" size="lg">
      <div className="space-y-4">
        <p className="text-neutral-dark text-center">
          Respira profundamente. Estás en un lugar seguro. Vamos a usar la técnica 5-4-3-2-1 para ayudarte a anclarte en el presente.
        </p>

        <div className="p-4 bg-primary-light text-primary-dark rounded-lg">
          <h3 className="text-lg font-semibold mb-1">{currentStep.instruction}</h3>
          <textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder={currentStep.placeholder}
            rows={2}
            className="w-full p-2 border border-primary rounded-md focus:ring-primary-dark focus:border-primary-dark"
            disabled={isFinished && completedSteps.length === sensorySteps.length}
          />
        </div>
        
        <div className="flex justify-center">
         {!isFinished && (
             <Button onClick={handleNextStep} variant="primary" disabled={userInput.trim() === ''}>
                {currentStepIndex < sensorySteps.length - 1 ? 'Siguiente Paso' : 'Finalizar Paso'}
            </Button>
         )}
         {isFinished && (
            <p className="text-green-600 font-semibold text-center">¡Bien hecho! Has completado la técnica.</p>
         )}
        </div>

        {completedSteps.length > 0 && (
          <div className="mt-4 p-3 bg-neutral-light rounded-md">
            <h4 className="font-semibold text-neutral-darker mb-1">Resumen:</h4>
            <ul className="list-disc list-inside text-sm text-neutral-dark space-y-1">
              {completedSteps.map((step, index) => <li key={index}>{step}</li>)}
               {isFinished && <li>{`${sensorySteps[sensorySteps.length-1].instruction}: ${userInput}`}</li>}
            </ul>
          </div>
        )}

        <div className="mt-6 border-t pt-4">
          <h4 className="font-semibold text-neutral-darker mb-2">Recursos Adicionales:</h4>
          <Button onClick={toggleAudio} variant="secondary" className="w-full mb-2">
            {isAudioPlaying ? 'Pausar Sonido Relajante (Olas)' : 'Reproducir Sonido Relajante (Olas)'}
          </Button>
          <p className="text-sm text-neutral-dark text-center mt-2">
            Recuerda, estos sentimientos pasarán. Eres fuerte y capaz.
            Si la sensación es muy intensa, considera contactar a un amigo, familiar o profesional de confianza.
          </p>
        </div>
      </div>
       <div className="mt-6 flex justify-end">
            <Button onClick={onClose} variant="outline">Cerrar Modo Crisis</Button>
        </div>
    </Modal>
  );
};
    