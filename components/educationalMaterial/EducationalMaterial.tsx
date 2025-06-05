import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { EducationalResource } from '../../types';
import { Input } from '../ui/Input';

const PlayCircleIcon = (props: { className?: string; [key: string]: any; }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-12 h-12" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
  </svg>
);

const DocumentTextIcon = (props: { className?: string; [key: string]: any; }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-12 h-12" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);


const sampleResources: EducationalResource[] = [
  { id: '1', type: 'article', title: '¿Qué es la Ansiedad Social?', summary: 'Una introducción a la ansiedad social, sus síntomas y causas comunes.', tags: ['ansiedad social', 'introducción'], content: 'La ansiedad social, también conocida como fobia social, es un tipo de trastorno de ansiedad que causa miedo extremo en situaciones sociales... (Contenido completo del artículo aquí)' },
  { id: '2', type: 'video', title: 'Técnicas de Respiración para la Calma', summary: 'Aprende ejercicios de respiración simples para reducir la ansiedad rápidamente.', tags: ['respiración', 'calma', 'técnicas'], contentUrl: 'https://www.youtube.com/embed/exampleVideoID' },
  { id: '3', type: 'article', title: 'Entendiendo las Distorsiones Cognitivas', summary: 'Descubre los patrones de pensamiento negativos que alimentan la ansiedad y cómo identificarlos.', tags: ['TCC', 'pensamientos', 'distorsiones'], content: 'Las distorsiones cognitivas son patrones de pensamiento exagerados o irracionales que pueden causar y perpetuar problemas emocionales... (Contenido completo del artículo aquí)' },
  { id: '4', type: 'video', title: 'Historias de Superación', summary: 'Personas reales comparten sus experiencias superando la ansiedad social.', tags: ['inspiración', 'historias reales'], contentUrl: 'https://www.youtube.com/embed/anotherVideoID' },
];

export const EducationalMaterial: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedResource, setSelectedResource] = useState<EducationalResource | null>(null);

  const filteredResources = sampleResources.filter(res => 
    res.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    res.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
    res.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (selectedResource) {
    return (
      <Card title={selectedResource.title}>
        <button onClick={() => setSelectedResource(null)} className="mb-4 text-primary hover:underline">&larr; Volver a la lista</button>
        {selectedResource.type === 'video' && selectedResource.contentUrl ? (
          <div className="aspect-w-16 aspect-h-9">
            <iframe 
              src={selectedResource.contentUrl} 
              title={selectedResource.title} 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              className="w-full h-full rounded-lg shadow-md"
            ></iframe>
          </div>
        ) : (
          <div className="prose max-w-none text-neutral-darker">
            <p>{selectedResource.content || selectedResource.summary}</p>
          </div>
        )}
         <p className="mt-4 text-sm text-neutral-dark">Etiquetas: {selectedResource.tags.join(', ')}</p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-neutral-darker">Material Educativo</h2>
      <Input 
        type="search"
        placeholder="Buscar artículos o videos..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        wrapperClassName="mb-6"
      />

      {filteredResources.length === 0 ? (
        <Card><p className="text-neutral-dark text-center">No se encontraron recursos que coincidan con tu búsqueda.</p></Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map(resource => (
            <Card key={resource.id} className="flex flex-col justify-between hover:shadow-xl transition-shadow cursor-pointer h-full" onClick={() => setSelectedResource(resource)}>
              <div>
                <div className="flex justify-center mb-4 text-primary">
                    {resource.type === 'video' ? <PlayCircleIcon/> : <DocumentTextIcon/>}
                </div>
                <h3 className="text-lg font-semibold text-neutral-darker mb-2">{resource.title}</h3>
                <p className="text-sm text-neutral-dark mb-3 flex-grow">{resource.summary}</p>
              </div>
              <div>
                <p className="text-xs text-neutral-dark/70">Etiquetas: {resource.tags.join(', ')}</p>
                 <button 
                    onClick={(e) => { e.stopPropagation(); setSelectedResource(resource); }} 
                    className="mt-3 text-sm text-primary hover:underline font-medium"
                  >
                    {resource.type === 'video' ? 'Ver Video' : 'Leer Artículo'} &rarr;
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};