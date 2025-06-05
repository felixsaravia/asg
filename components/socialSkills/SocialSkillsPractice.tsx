
import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { TextArea, Input } from '../ui/Input';
import { simulateRolePlayResponse } from '../../services/GeminiService';
import { LoadingSpinner } from '../ui/LoadingSpinner';

const dailyChallenges = [
  "Mantén contacto visual con la próxima persona con la que hables por 5 segundos.",
  "Inicia una pequeña conversación con un cajero o barista (ej. '¿Qué tal tu día?').",
  "Haz una pregunta abierta a un compañero o conocido (ej. '¿Qué planes tienes para el fin de semana?').",
  "Da un cumplido sincero a alguien.",
  "Pide ayuda con algo pequeño, incluso si crees que puedes hacerlo solo/a."
];

interface Message {
    sender: 'user' | 'ai';
    text: string;
}

const RolePlaySimulator: React.FC = () => {
    const [scenario, setScenario] = useState<string>("Estás en una cafetería y quieres preguntar si una silla está ocupada.");
    const [userInput, setUserInput] = useState<string>("");
    const [conversation, setConversation] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSendMessage = async () => {
        if (!userInput.trim()) return;

        const newUserMessage: Message = { sender: 'user', text: userInput };
        setConversation(prev => [...prev, newUserMessage]);
        setUserInput("");
        setIsLoading(true);

        const aiResponseText = await simulateRolePlayResponse(scenario, userInput);
        const newAiMessage: Message = { sender: 'ai', text: aiResponseText };
        setConversation(prev => [...prev, newAiMessage]);
        setIsLoading(false);
    };
    
    const startNewRolePlay = () => {
        setConversation([]);
        setUserInput("");
        // Potentially allow user to pick new scenario or provide one
    }

    return (
        <Card title="Simulador de Roleplay (Texto)">
            <p className="text-sm text-neutral-dark mb-2">Practica interacciones sociales en un entorno seguro.</p>
            <Input 
                label="Escenario Actual:" 
                value={scenario} 
                onChange={(e) => setScenario(e.target.value)} 
                className="mb-3"
                placeholder="Describe un escenario social..."
            />

            <div className="h-64 overflow-y-auto border border-neutral-DEFAULT rounded-md p-3 mb-3 bg-neutral-light space-y-2">
                {conversation.length === 0 && <p className="text-neutral-dark text-center italic">La conversación aparecerá aquí.</p>}
                {conversation.map((msg, index) => (
                    <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[70%] p-2 rounded-lg ${msg.sender === 'user' ? 'bg-primary text-white' : 'bg-secondary text-primary-dark'}`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                {isLoading && <div className="flex justify-start"><LoadingSpinner size="sm" text="AI está respondiendo..." /></div>}
            </div>

            <TextArea 
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Escribe tu respuesta aquí..."
                rows={2}
                className="mb-3"
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                    }
                }}
            />
            <div className="flex justify-between items-center">
                 <Button onClick={handleSendMessage} variant="primary" isLoading={isLoading} disabled={isLoading || !userInput.trim()}>Enviar Respuesta</Button>
                 <Button onClick={startNewRolePlay} variant="ghost">Nuevo Escenario</Button>
            </div>
        </Card>
    );
}


export const SocialSkillsPractice: React.FC = () => {
  const [currentChallenge, setCurrentChallenge] = useState(dailyChallenges[0]);

  const showNewChallenge = () => {
    const randomIndex = Math.floor(Math.random() * dailyChallenges.length);
    setCurrentChallenge(dailyChallenges[randomIndex]);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-neutral-darker">Práctica de Habilidades Sociales</h2>
      
      <Card title="Mini Reto Diario">
        <p className="text-sm text-neutral-dark mb-4">Intenta completar este pequeño reto hoy para practicar tus habilidades sociales.</p>
        <div className="my-6 p-4 bg-secondary-light text-secondary-dark rounded-lg text-center">
          <p className="text-lg font-medium">{currentChallenge}</p>
        </div>
        <div className="text-center">
          <Button onClick={showNewChallenge} variant="secondary">Mostrar Otro Reto</Button>
        </div>
      </Card>

      <RolePlaySimulator />

    </div>
  );
};
    