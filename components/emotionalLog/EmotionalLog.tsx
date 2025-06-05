import React, { useState, useEffect } from 'react';
import { EmotionalLogEntry } from '../../types';
import useLocalStorage from '../../hooks/useLocalStorage';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Input, TextArea } from '../ui/Input';
import { EMOTIONAL_LOG_KEY, DEFAULT_ACHIEVEMENTS, ACHIEVEMENTS_KEY } from '../../constants';
import { Achievement } from '../../types';

const PlusIcon = (props: { className?: string; [key: string]: any; }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);

const TrashIcon = (props: { className?: string; [key: string]: any; }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12.56 0c1.153 0 2.24.032 3.22.096M9.75 5.935M3.75 5.935m16.5.002c.621 0 1.197.036 1.747.105M3.75 5.935C3.129 5.971 2.553 6.007 2.003 6.007A24.046 24.046 0 000 6.007v0M21.997 6.007A24.046 24.046 0 0124 6.007v0M3.75 5.935c.547.069 1.123.105 1.747.105" />
  </svg>
);


export const EmotionalLog: React.FC = () => {
  const [logs, setLogs] = useLocalStorage<EmotionalLogEntry[]>(EMOTIONAL_LOG_KEY, []);
  const [achievements, setAchievements] = useLocalStorage<Achievement[]>(ACHIEVEMENTS_KEY, DEFAULT_ACHIEVEMENTS);
  const [showForm, setShowForm] = useState(false);
  const [currentEntry, setCurrentEntry] = useState<Partial<EmotionalLogEntry>>({ anxietyLevel: 5 });
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    // Check for 'first_log' achievement
    if (logs.length > 0) {
        const firstLogAchievement = achievements.find(a => a.id === 'first_log');
        if (firstLogAchievement && !firstLogAchievement.unlocked) {
            setAchievements(prev => prev.map(a => a.id === 'first_log' ? {...a, unlocked: true, dateUnlocked: new Date().toISOString()} : a));
        }
    }
  }, [logs, achievements, setAchievements]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentEntry(prev => ({ ...prev, [name]: name === 'anxietyLevel' ? parseInt(value) : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentEntry.situation || !currentEntry.thoughts || !currentEntry.feelings || !currentEntry.actions) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    const newLogEntry: EmotionalLogEntry = {
      id: editingId || new Date().toISOString(),
      date: new Date().toISOString(),
      situation: currentEntry.situation || '',
      thoughts: currentEntry.thoughts || '',
      feelings: currentEntry.feelings || '',
      actions: currentEntry.actions || '',
      anxietyLevel: currentEntry.anxietyLevel || 0,
    };

    if (editingId) {
      setLogs(logs.map(log => log.id === editingId ? newLogEntry : log));
    } else {
      setLogs([newLogEntry, ...logs]);
    }
    
    setCurrentEntry({ anxietyLevel: 5 });
    setShowForm(false);
    setEditingId(null);
  };

  const handleEdit = (log: EmotionalLogEntry) => {
    setCurrentEntry(log);
    setEditingId(log.id);
    setShowForm(true);
    window.scrollTo(0,0);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta entrada?")) {
      setLogs(logs.filter(log => log.id !== id));
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
    setEditingId(null);
    setCurrentEntry({ anxietyLevel: 5 });
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-neutral-darker">Bitácora Emocional</h2>
        <Button onClick={toggleForm} variant="primary" leftIcon={<PlusIcon/>}>
          {showForm ? 'Cerrar Formulario' : 'Nueva Entrada'}
        </Button>
      </div>

      {showForm && (
        <Card title={editingId ? "Editar Entrada" : "Nueva Entrada en la Bitácora"}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <TextArea name="situation" label="¿Qué situación ocurrió?" value={currentEntry.situation || ''} onChange={handleChange} required />
            <TextArea name="thoughts" label="¿Qué pensaste?" value={currentEntry.thoughts || ''} onChange={handleChange} required />
            <TextArea name="feelings" label="¿Qué sentiste?" value={currentEntry.feelings || ''} onChange={handleChange} required />
            <TextArea name="actions" label="¿Qué hiciste?" value={currentEntry.actions || ''} onChange={handleChange} required />
            <div>
              <label htmlFor="anxietyLevel" className="block text-sm font-medium text-neutral-dark mb-1">Nivel de Ansiedad (0-10): {currentEntry.anxietyLevel}</label>
              <input
                type="range"
                id="anxietyLevel"
                name="anxietyLevel"
                min="0"
                max="10"
                value={currentEntry.anxietyLevel || 0}
                onChange={handleChange}
                className="w-full h-2 bg-neutral-DEFAULT rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>
            <div className="flex justify-end space-x-3">
                <Button type="button" variant="ghost" onClick={() => { setShowForm(false); setEditingId(null); setCurrentEntry({ anxietyLevel: 5});}}>Cancelar</Button>
                <Button type="submit" variant="primary">{editingId ? 'Guardar Cambios' : 'Guardar Entrada'}</Button>
            </div>
          </form>
        </Card>
      )}

      {logs.length === 0 && !showForm ? (
        <Card className="text-center">
          <p className="text-neutral-dark">Aún no has registrado ninguna entrada.</p>
          <p className="text-sm text-neutral-dark/80">¡Empieza registrando cómo te sientes hoy!</p>
          <Button onClick={() => setShowForm(true)} variant="secondary" className="mt-4">Crear primera entrada</Button>
        </Card>
      ) : (
        <div className="space-y-4">
          {logs.map(log => (
            <Card key={log.id} className="hover:shadow-xl transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-primary">{new Date(log.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</h3>
                  <p className="text-sm text-neutral-dark">Nivel de Ansiedad: <span className="font-bold">{log.anxietyLevel}/10</span></p>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="ghost" onClick={() => handleEdit(log)}>Editar</Button>
                  <Button size="sm" variant="danger" onClick={() => handleDelete(log.id)} aria-label="Eliminar entrada">
                    <TrashIcon/>
                  </Button>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <p><strong className="text-neutral-darker">Situación:</strong> {log.situation}</p>
                <p><strong className="text-neutral-darker">Pensamientos:</strong> {log.thoughts}</p>
                <p><strong className="text-neutral-darker">Sentimientos:</strong> {log.feelings}</p>
                <p><strong className="text-neutral-darker">Acciones:</strong> {log.actions}</p>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};