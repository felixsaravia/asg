
import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Dashboard } from './components/dashboard/Dashboard';
import { EmotionalLog } from './components/emotionalLog/EmotionalLog';
import { CognitiveRestructuring } from './components/cognitiveRestructuring/CognitiveRestructuring';
import { RegulationTechniques } from './components/regulationTechniques/RegulationTechniques';
import { CrisisModeModal } from './components/crisisMode/CrisisModeModal';
import { GradualExposure } from './components/gradualExposure/GradualExposure';
import { SocialSkillsPractice } from './components/socialSkills/SocialSkillsPractice';
import { EducationalMaterial } from './components/educationalMaterial/EducationalMaterial';
import { Achievements } from './components/achievements/Achievements';
import { AppShell } from './components/layout/AppShell';
import { NavItemDefinition } from './types';
import { NAV_ITEMS } from './constants'; // Path remains the same, .tsx will be resolved

const App: React.FC = () => {
  const [isCrisisModalOpen, setIsCrisisModalOpen] = useState(false);
  const location = useLocation();

  const openCrisisMode = () => setIsCrisisModalOpen(true);
  const closeCrisisMode = () => setIsCrisisModalOpen(false);

  const getPageTitle = (): string => {
    const currentPath = location.pathname === '/' || location.pathname === '' ? '/dashboard' : location.pathname;
    const activeItem = NAV_ITEMS.find(item => item.path === currentPath);
    return activeItem ? activeItem.name : 'Presente y Seguro';
  };

  return (
    <AppShell
      navItems={NAV_ITEMS}
      pageTitle={getPageTitle()}
      onCrisisModeClick={openCrisisMode}
    >
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/log" element={<EmotionalLog />} />
        <Route path="/restructure" element={<CognitiveRestructuring />} />
        <Route path="/exposure" element={<GradualExposure />} />
        <Route path="/regulate" element={<RegulationTechniques />} />
        <Route path="/skills" element={<SocialSkillsPractice />} />
        <Route path="/learn" element={<EducationalMaterial />} />
        <Route path="/achievements" element={<Achievements />} />
      </Routes>
      <CrisisModeModal isOpen={isCrisisModalOpen} onClose={closeCrisisMode} />
    </AppShell>
  );
};

export default App;
