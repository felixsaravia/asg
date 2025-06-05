
import React from 'react';
import { Card } from '../ui/Card';
import { Achievement } from '../../types';
import useLocalStorage from '../../hooks/useLocalStorage';
import { ACHIEVEMENTS_KEY, DEFAULT_ACHIEVEMENTS } from '../../constants';
import { ProgressBar } from '../ui/ProgressBar';

export const Achievements: React.FC = () => {
  const [achievements] = useLocalStorage<Achievement[]>(ACHIEVEMENTS_KEY, DEFAULT_ACHIEVEMENTS);

  const unlockedAchievements = achievements.filter(a => a.unlocked);
  const lockedAchievements = achievements.filter(a => !a.unlocked);
  
  const progressPercentage = achievements.length > 0 ? Math.round((unlockedAchievements.length / achievements.length) * 100) : 0;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-neutral-darker">Mis Logros</h2>

      <Card>
        <ProgressBar value={progressPercentage} label="Progreso de Logros" color="accent" showValue={true} />
        <p className="text-sm text-neutral-dark mt-1 text-center">Has desbloqueado {unlockedAchievements.length} de {achievements.length} logros.</p>
      </Card>

      {unlockedAchievements.length > 0 && (
        <Card title="Logros Desbloqueados">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {unlockedAchievements.map(ach => (
              <div key={ach.id} className="p-4 bg-green-100 border border-green-300 rounded-lg shadow text-center">
                <span className="text-3xl mb-2 block" role="img" aria-label={ach.title}>{ach.icon}</span>
                <h3 className="text-md font-semibold text-green-700">{ach.title}</h3>
                <p className="text-xs text-green-600">{ach.description}</p>
                {ach.dateUnlocked && <p className="text-xs text-green-500 mt-1">Desbloqueado: {new Date(ach.dateUnlocked).toLocaleDateString()}</p>}
              </div>
            ))}
          </div>
        </Card>
      )}

      {lockedAchievements.length > 0 && (
        <Card title="Logros Pendientes">
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {lockedAchievements.map(ach => (
              <div key={ach.id} className="p-4 bg-neutral-DEFAULT border border-neutral-dark/20 rounded-lg shadow text-center opacity-60">
                <span className="text-3xl mb-2 block" role="img" aria-label={ach.title}>{ach.icon}</span>
                <h3 className="text-md font-semibold text-neutral-darker">{ach.title}</h3>
                <p className="text-xs text-neutral-dark">{ach.description}</p>
              </div>
            ))}
          </div>
        </Card>
      )}
      
      {achievements.length === 0 && (
         <Card className="text-center">
            <p className="text-neutral-dark">Aún no hay logros configurados.</p>
         </Card>
      )}
    </div>
  );
};
    