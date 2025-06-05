import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { fetchMotivationalQuote } from '../../services/GeminiService';
import { EmotionalLogEntry, ThoughtRecord, EmotionalFeeling } from '../../types';
import useLocalStorage from '../../hooks/useLocalStorage';
import { EMOTIONAL_LOG_KEY, THOUGHT_RECORDS_KEY, NAV_ITEMS } from '../../constants';
import { ProgressBar } from '../ui/ProgressBar';
import { EmotionalStateSelector } from './EmotionalStateSelector';

const CheckCircleIcon = (props: { className?: string; [key: string]: any; }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ArrowRightIcon = (props: { className?: string; [key: string]: any; }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
);


export const Dashboard: React.FC = () => {
  const [quote, setQuote] = useState<string>('');
  const [isLoadingQuote, setIsLoadingQuote] = useState<boolean>(true);
  const [emotionalLogs] = useLocalStorage<EmotionalLogEntry[]>(EMOTIONAL_LOG_KEY, []);
  const [thoughtRecords] = useLocalStorage<ThoughtRecord[]>(THOUGHT_RECORDS_KEY, []);
  const [currentFeeling, setCurrentFeeling] = useLocalStorage<EmotionalFeeling | null>('presenteSeguro_currentFeeling', null);

  useEffect(() => {
    const getQuote = async () => {
      setIsLoadingQuote(true);
      const fetchedQuote = await fetchMotivationalQuote();
      setQuote(fetchedQuote);
      setIsLoadingQuote(false);
    };
    getQuote();
  }, []);

  const quickLinks = NAV_ITEMS.filter(item => ['/log', '/restructure', '/regulate'].includes(item.path));
  
  const progress = {
    logsThisWeek: emotionalLogs.filter(log => new Date(log.date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length,
    thoughtsThisWeek: thoughtRecords.filter(record => new Date(record.date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length,
    totalLogs: emotionalLogs.length,
    totalThoughts: thoughtRecords.length,
  };

  const overallProgress = Math.min(100, Math.round(((progress.totalLogs + progress.totalThoughts) / 20) * 100)); // Example: 20 entries for 100%

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-primary to-secondary text-white">
        <h2 className="text-2xl font-semibold mb-2">¡Bienvenid@ de nuevo!</h2>
        {isLoadingQuote ? (
          <div className="flex justify-center items-center h-12">
             <LoadingSpinner size="sm" color="text-white"/>
          </div>
        ) : (
          <p className="text-lg italic">"{quote}"</p>
        )}
      </Card>

      <Card title="¿Cómo te sientes hoy?">
        <EmotionalStateSelector currentFeeling={currentFeeling} onFeelingSelect={setCurrentFeeling} />
        {currentFeeling && <p className="mt-3 text-center text-neutral-dark">Has registrado que te sientes: <span className="font-semibold text-primary">{currentFeeling}</span></p>}
      </Card>

      <Card title="Resumen de Progreso">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-neutral-light p-4 rounded-lg shadow">
                <h4 className="text-md font-semibold text-neutral-darker">Registros Emocionales (últimos 7 días)</h4>
                <p className="text-2xl font-bold text-primary">{progress.logsThisWeek}</p>
            </div>
            <div className="bg-neutral-light p-4 rounded-lg shadow">
                <h4 className="text-md font-semibold text-neutral-darker">Pensamientos Analizados (últimos 7 días)</h4>
                <p className="text-2xl font-bold text-accent-dark">{progress.thoughtsThisWeek}</p>
            </div>
        </div>
        <ProgressBar value={overallProgress} label="Progreso General Estimado" color="primary" showValue={true} />
         <p className="text-xs text-neutral-dark mt-1">Este es un indicador general de tu actividad en la app.</p>
      </Card>

      <Card title="Accesos Rápidos">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickLinks.map((item) => {
            const Icon = item.icon;
            return (
            <Link key={item.path} to={item.path}>
              <Button variant="outline" className="w-full h-full justify-start text-left p-4 hover:shadow-md">
                <div className="flex items-center">
                  <Icon className="w-6 h-6 mr-3 text-primary" />
                  <div>
                    <h4 className="font-semibold text-neutral-darker">{item.name}</h4>
                    <p className="text-sm text-neutral-dark">Ir a {item.name.toLowerCase()}</p>
                  </div>
                </div>
              </Button>
            </Link>
            );
          })}
        </div>
      </Card>

      <Card title="Sugerencia del Día">
        <div className="flex items-start space-x-3">
          <CheckCircleIcon className="w-8 h-8 text-green-500 flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-semibold text-neutral-darker">Dedica 5 minutos a la respiración consciente.</h4>
            <p className="text-sm text-neutral-dark mb-3">Puede ayudarte a centrarte y reducir la ansiedad antes de una situación social.</p>
            <Link to="/regulate">
              <Button size="sm" variant="secondary" rightIcon={<ArrowRightIcon/>}>
                Probar técnica de respiración
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
};