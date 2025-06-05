import React, { useState, useEffect } from 'react';
import { ThoughtRecord } from '../../types';
import useLocalStorage from '../../hooks/useLocalStorage';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Input, TextArea } from '../ui/Input';
import { THOUGHT_RECORDS_KEY, DEFAULT_ACHIEVEMENTS, ACHIEVEMENTS_KEY } from '../../constants';
import { Achievement } from '../../types';
import { generateCbtGuidance } from '../../services/GeminiService';
import { LoadingSpinner } from '../ui/LoadingSpinner';

const PlusIcon = (props: { className?: string; [key: string]: any; }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);

const LightbulbIcon = (props: { className?: string; [key: string]: any; }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5" {...props}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.355a12.061 12.061 0 00-4.5 0m1.757-7.563a3.743 3.743 0 013.742 0M12 6.75a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 21H14.25C16.045 21 17.5 19.545 17.5 17.75V13.892c0-.991.524-1.894 1.388-2.427C20.403 10.279 21 8.596 21 6.75A4.25 4.25 0 0016.75 2.5h-9.5A4.25 4.25 0 003 6.75c0 1.846.597 3.529 2.112 4.715.864.533 1.388 1.436 1.388 2.427v3.858C6.5 19.545 7.955 21 9.75 21z" />
</svg>
);


export const CognitiveRestructuring: React.FC = () => {
  const [records, setRecords] = useLocalStorage<ThoughtRecord[]>(THOUGHT_RECORDS_KEY, []);
  const [achievements, setAchievements] = useLocalStorage<Achievement[]>(ACHIEVEMENTS_KEY, DEFAULT_ACHIEVEMENTS);
  const [showForm, setShowForm] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<Partial<ThoughtRecord>>({});
  const [editingId, setEditingId] = useState<string | null>(null);
  const [aiSuggestion, setAiSuggestion] = useState<string>('');
  const [isLoadingAi, setIsLoadingAi] = useState<boolean>(false);

  useEffect(() => {
    if (records.length > 0) {
        const achievement = achievements.find(a => a.id === 'first_thought_record');
        if (achievement && !achievement.unlocked) {
            setAchievements(prev => prev.map(a => a.id === 'first_thought_record' ? {...a, unlocked: true, dateUnlocked: new Date().toISOString()} : a));
        }
    }
  }, [records, achievements, setAchievements]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentRecord(prev => ({ ...prev, [name]: value }));
  };

  const handleGetAiSuggestion = async () => {
    if (!currentRecord.automaticThought) {
        alert("Por favor, escribe tu pensamiento automático primero.");
        return;
    }
    setIsLoadingAi(true);
    setAiSuggestion('');
    const suggestion = await generateCbtGuidance(`Situación: ${currentRecord.situation || 'No especificada'}. Pensamiento automático: ${currentRecord.automaticThought}. Emoción: ${currentRecord.emotion || 'No especificada'}.`);
    setAiSuggestion(suggestion);
    setIsLoadingAi(false);
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentRecord.situation || !currentRecord.automaticThought || !currentRecord.alternativeThought) {
      alert("Por favor, completa los campos de situación, pensamiento automático y pensamiento alternativo.");
      return;
    }

    const newRecord: ThoughtRecord = {
      id: editingId || new Date().toISOString(),
      date: new Date().toISOString(),
      situation: currentRecord.situation || '',
      automaticThought: currentRecord.automaticThought || '',
      emotion: currentRecord.emotion || '',
      evidenceFor: currentRecord.evidenceFor || '',
      evidenceAgainst: currentRecord.evidenceAgainst || '',
      alternativeThought: currentRecord.alternativeThought || '',
      outcome: currentRecord.outcome || '',
    };

    if (editingId) {
      setRecords(records.map(rec => rec.id === editingId ? newRecord : rec));
    } else {
      setRecords([newRecord, ...records]);
    }
    
    setCurrentRecord({});
    setShowForm(false);
    setEditingId(null);
    setAiSuggestion('');
  };

  const handleEdit = (record: ThoughtRecord) => {
    setCurrentRecord(record);
    setEditingId(record.id);
    setShowForm(true);
    setAiSuggestion('');
    window.scrollTo(0,0);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este registro?")) {
      setRecords(records.filter(rec => rec.id !== id));
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
    setEditingId(null);
    setCurrentRecord({});
    setAiSuggestion('');
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-neutral-darker">Reestructuración Cognitiva</h2>
        <Button onClick={toggleForm} variant="primary" leftIcon={<PlusIcon/>}>
          {showForm ? 'Cerrar Formulario' : 'Nuevo Registro'}
        </Button>
      </div>

      {showForm && (
        <Card title={editingId ? "Editar Registro de Pensamiento" : "Nuevo Registro de Pensamiento"}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input name="situation" label="Situación" value={currentRecord.situation || ''} onChange={handleChange} placeholder="Ej: Una presentación en el trabajo" />
            <TextArea name="automaticThought" label="Pensamiento Automático Negativo" value={currentRecord.automaticThought || ''} onChange={handleChange} placeholder="Ej: 'Voy a hacer el ridículo'" />
            <Input name="emotion" label="Emoción(es) Principal(es)" value={currentRecord.emotion || ''} onChange={handleChange} placeholder="Ej: Ansiedad, miedo" />
            
            <div className="my-4">
                <Button type="button" variant="secondary" onClick={handleGetAiSuggestion} leftIcon={<LightbulbIcon/>} isLoading={isLoadingAi} disabled={isLoadingAi}>
                    {isLoadingAi ? 'Generando...' : 'Obtener Sugerencia IA'}
                </Button>
                {isLoadingAi && <LoadingSpinner size="sm" text="Pensando..." />}
                {aiSuggestion && !isLoadingAi && (
                    <div className="mt-3 p-3 bg-secondary-light text-secondary-dark rounded-md text-sm">
                        <p className="font-semibold mb-1">Sugerencia del Asistente IA:</p>
                        <p>{aiSuggestion}</p>
                    </div>
                )}
            </div>

            <TextArea name="evidenceFor" label="Evidencia a favor del pensamiento automático" value={currentRecord.evidenceFor || ''} onChange={handleChange} placeholder="¿Qué hechos apoyan este pensamiento?"/>
            <TextArea name="evidenceAgainst" label="Evidencia en contra del pensamiento automático" value={currentRecord.evidenceAgainst || ''} onChange={handleChange} placeholder="¿Qué hechos contradicen este pensamiento?"/>
            <TextArea name="alternativeThought" label="Pensamiento Alternativo / Más Racional" value={currentRecord.alternativeThought || ''} onChange={handleChange} placeholder="Ej: 'Me preparé bien, puedo hacerlo. Si me equivoco, no es el fin del mundo.'" />
            <TextArea name="outcome" label="Resultado / Cómo te sientes con el pensamiento alternativo" value={currentRecord.outcome || ''} onChange={handleChange} placeholder="Ej: Más calmado, un poco nervioso pero con más confianza." />
            
            <div className="flex justify-end space-x-3">
                 <Button type="button" variant="ghost" onClick={() => { setShowForm(false); setEditingId(null); setCurrentRecord({}); setAiSuggestion(''); }}>Cancelar</Button>
                <Button type="submit" variant="primary">{editingId ? 'Guardar Cambios' : 'Guardar Registro'}</Button>
            </div>
          </form>
        </Card>
      )}

      {records.length === 0 && !showForm ? (
         <Card className="text-center">
          <p className="text-neutral-dark">Aún no tienes registros de pensamientos.</p>
          <p className="text-sm text-neutral-dark/80">Identificar y cambiar pensamientos negativos es clave.</p>
          <Button onClick={() => setShowForm(true)} variant="secondary" className="mt-4">Crear primer registro</Button>
        </Card>
      ) : (
        <div className="space-y-4">
          {records.map(rec => (
            <Card key={rec.id} className="hover:shadow-xl transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <div>
                    <h4 className="text-md font-semibold text-accent-dark">{rec.situation}</h4>
                    <p className="text-xs text-neutral-dark">{new Date(rec.date).toLocaleDateString()}</p>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="ghost" onClick={() => handleEdit(rec)}>Editar</Button>
                  <Button size="sm" variant="danger" onClick={() => handleDelete(rec.id)}>Eliminar</Button>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="bg-red-50 p-3 rounded-lg">
                    <p className="font-semibold text-red-700">Pensamiento Automático:</p>
                    <p className="text-red-600">{rec.automaticThought}</p>
                    {rec.emotion && <p className="mt-1"><span className="font-semibold text-red-700">Emoción:</span> <span className="text-red-600">{rec.emotion}</span></p>}
                </div>
                 <div className="bg-green-50 p-3 rounded-lg">
                    <p className="font-semibold text-green-700">Pensamiento Alternativo:</p>
                    <p className="text-green-600">{rec.alternativeThought}</p>
                    {rec.outcome && <p className="mt-1"><span className="font-semibold text-green-700">Resultado:</span> <span className="text-green-600">{rec.outcome}</span></p>}
                </div>
              </div>

              {(rec.evidenceFor || rec.evidenceAgainst) && (
                <details className="mt-3 text-sm">
                    <summary className="cursor-pointer text-primary hover:underline">Ver Evidencias</summary>
                    <div className="mt-2 p-3 bg-neutral-light rounded-md space-y-2">
                        {rec.evidenceFor && <div><strong className="text-neutral-darker">A favor:</strong> {rec.evidenceFor}</div>}
                        {rec.evidenceAgainst && <div><strong className="text-neutral-darker">En contra:</strong> {rec.evidenceAgainst}</div>}
                    </div>
                </details>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};