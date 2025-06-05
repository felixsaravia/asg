import React, { useState } from 'react';
import { ExposureStep } from '../../types';
import useLocalStorage from '../../hooks/useLocalStorage';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Input, TextArea } from '../ui/Input';
import { EXPOSURE_STEPS_KEY, DEFAULT_ACHIEVEMENTS, ACHIEVEMENTS_KEY } from '../../constants';
import { Achievement } from '../../types';
import { ProgressBar } from '../ui/ProgressBar';

const PlusIcon = (props: { className?: string; [key: string]: any; }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);

const CheckIcon = (props: { className?: string; [key: string]: any; }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
);

export const GradualExposure: React.FC = () => {
  const [steps, setSteps] = useLocalStorage<ExposureStep[]>(EXPOSURE_STEPS_KEY, []);
  const [achievements, setAchievements] = useLocalStorage<Achievement[]>(ACHIEVEMENTS_KEY, DEFAULT_ACHIEVEMENTS);
  const [showForm, setShowForm] = useState(false);
  const [currentStep, setCurrentStep] = useState<Partial<ExposureStep>>({ targetAnxiety: 5, repetitions: 1 });
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setCurrentStep(prev => ({ ...prev, [name]: type === 'number' ? parseInt(value) : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentStep.description) {
      alert("Por favor, describe el paso de exposición.");
      return;
    }

    const newStep: ExposureStep = {
      id: editingId || new Date().toISOString(),
      description: currentStep.description || '',
      targetAnxiety: currentStep.targetAnxiety || 0,
      completed: currentStep.completed || false,
      repetitions: currentStep.repetitions || 1,
      notes: currentStep.notes || ''
    };

    if (editingId) {
      setSteps(steps.map(s => s.id === editingId ? newStep : s));
    } else {
      setSteps([...steps, newStep].sort((a, b) => a.targetAnxiety - b.targetAnxiety));
    }
    
    setCurrentStep({ targetAnxiety: 5, repetitions: 1 });
    setShowForm(false);
    setEditingId(null);
  };
  
  const toggleComplete = (id: string) => {
    setSteps(steps.map(s => {
        if (s.id === id) {
            const updatedStep = { ...s, completed: !s.completed };
            // Check for 'first_exposure' achievement
            if (updatedStep.completed) {
                const achievement = achievements.find(a => a.id === 'first_exposure');
                if (achievement && !achievement.unlocked) {
                    setAchievements(prevAchs => prevAchs.map(a => a.id === 'first_exposure' ? {...a, unlocked: true, dateUnlocked: new Date().toISOString()} : a));
                }
            }
            return updatedStep;
        }
        return s;
    }));
  };

  const handleEdit = (step: ExposureStep) => {
    setCurrentStep(step);
    setEditingId(step.id);
    setShowForm(true);
    window.scrollTo(0,0);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este paso?")) {
      setSteps(steps.filter(s => s.id !== id));
    }
  };
  
  const toggleForm = () => {
    setShowForm(!showForm);
    setEditingId(null);
    setCurrentStep({ targetAnxiety: 5, repetitions: 1 });
  }

  const completedStepsCount = steps.filter(s => s.completed).length;
  const totalStepsCount = steps.length;
  const progressPercentage = totalStepsCount > 0 ? Math.round((completedStepsCount / totalStepsCount) * 100) : 0;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-neutral-darker">Exposición Gradual</h2>
        <Button onClick={toggleForm} variant="primary" leftIcon={<PlusIcon/>}>
          {showForm ? 'Cerrar Formulario' : 'Nuevo Paso'}
        </Button>
      </div>
      
      <Card title="Pirámide de Exposición">
        <p className="text-sm text-neutral-dark mb-4">
          Crea una lista de situaciones sociales que te generan ansiedad, ordenadas de menor a mayor dificultad.
          Enfréntalas gradualmente, empezando por las más fáciles.
        </p>
        {totalStepsCount > 0 && <ProgressBar value={progressPercentage} label="Progreso en la Pirámide" color="accent" className="mb-4"/>}
      </Card>


      {showForm && (
        <Card title={editingId ? "Editar Paso de Exposición" : "Nuevo Paso de Exposición"}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <TextArea name="description" label="Descripción del paso" value={currentStep.description || ''} onChange={handleChange} required />
            <div>
              <label htmlFor="targetAnxiety" className="block text-sm font-medium text-neutral-dark mb-1">Nivel de Ansiedad Esperado (0-10): {currentStep.targetAnxiety}</label>
              <input type="range" id="targetAnxiety" name="targetAnxiety" min="0" max="10" value={currentStep.targetAnxiety || 0} onChange={handleChange} className="w-full h-2 bg-neutral-DEFAULT rounded-lg appearance-none cursor-pointer accent-accent" />
            </div>
            <Input type="number" name="repetitions" label="Repeticiones Sugeridas" value={currentStep.repetitions || 1} onChange={handleChange} min="1" />
            <TextArea name="notes" label="Notas (ej. ansiedad antes/durante/después, qué aprendiste)" value={currentStep.notes || ''} onChange={handleChange} />
            <div className="flex items-center">
                <input type="checkbox" id="completed" name="completed" checked={currentStep.completed || false} onChange={(e) => setCurrentStep(prev => ({...prev, completed: e.target.checked}))} className="h-4 w-4 text-accent rounded border-neutral-DEFAULT focus:ring-accent" />
                <label htmlFor="completed" className="ml-2 block text-sm text-neutral-dark">Marcar como completado</label>
            </div>
            <div className="flex justify-end space-x-3">
                <Button type="button" variant="ghost" onClick={() => { setShowForm(false); setEditingId(null); setCurrentStep({targetAnxiety:5, repetitions: 1});}}>Cancelar</Button>
                <Button type="submit" variant="primary">{editingId ? 'Guardar Cambios' : 'Añadir Paso'}</Button>
            </div>
          </form>
        </Card>
      )}

      {steps.length === 0 && !showForm ? (
        <Card className="text-center">
          <p className="text-neutral-dark">Tu pirámide de exposición está vacía.</p>
          <p className="text-sm text-neutral-dark/80">Comienza añadiendo el primer paso que te gustaría enfrentar.</p>
           <Button onClick={() => setShowForm(true)} variant="secondary" className="mt-4">Crear primer paso</Button>
        </Card>
      ) : (
        <div className="space-y-4">
          {steps.map(step => (
            <Card key={step.id} className={`border-l-4 ${step.completed ? 'border-green-500 bg-green-50' : 'border-accent bg-white'}`}>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className={`text-lg font-semibold ${step.completed ? 'text-green-700 line-through' : 'text-accent-dark'}`}>{step.description}</h3>
                  <p className="text-sm text-neutral-dark">Ansiedad Esperada: {step.targetAnxiety}/10 | Repeticiones: {step.repetitions}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant={step.completed ? "secondary" : "primary"} onClick={() => toggleComplete(step.id)} leftIcon={step.completed ? <CheckIcon/> : undefined}>
                    {step.completed ? 'Desmarcar' : 'Completar'}
                  </Button>
                   <Button size="sm" variant="ghost" onClick={() => handleEdit(step)}>Editar</Button>
                  <Button size="sm" variant="danger" onClick={() => handleDelete(step.id)}>Eliminar</Button>
                </div>
              </div>
              {step.notes && <p className="mt-2 text-sm text-neutral-dark bg-neutral-light p-2 rounded"><strong>Notas:</strong> {step.notes}</p>}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};