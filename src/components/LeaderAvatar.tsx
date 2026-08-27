import React, { useState } from 'react';
import { Leader, Language } from '../types';
import { getCategoryBadgeColor } from '../data';
import { User } from 'lucide-react';

interface LeaderAvatarProps {
  leader: Leader;
  language: Language;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const LeaderAvatar: React.FC<LeaderAvatarProps> = ({
  leader,
  language,
  size = 'md',
  className = '',
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const colors = getCategoryBadgeColor(leader.category);

  const sizeClasses = {
    sm: 'w-12 h-12 text-sm',
    md: 'w-20 h-20 text-base',
    lg: 'w-28 h-28 text-lg',
    xl: 'w-36 h-36 md:w-44 md:h-44 text-2xl',
  };

  const getInitials = () => {
    if (language === 'ja') {
      return leader.nameJa.slice(0, 2);
    }
    const parts = leader.nameEn.split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`;
    }
    return leader.nameEn.slice(0, 2).toUpperCase();
  };

  return (
    <div
      className={`relative rounded-2xl overflow-hidden flex items-center justify-center border shadow-sm transition-all duration-300 bg-slate-100 dark:bg-slate-800 ${colors.border} ${sizeClasses[size]} ${className}`}
    >
      {(leader.imageUrl || leader.id) && !imageError ? (
        <>
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-200 dark:bg-slate-800 animate-pulse">
              <User className="w-1/2 h-1/2 text-slate-400" />
            </div>
          )}
          <img
            src={leader.imageUrl || `./portraits/${leader.id}.jpg`}
            alt={language === 'ja' ? leader.nameJa : leader.nameEn}
            referrerPolicy="no-referrer"
            className={`w-full h-full object-cover object-top transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        </>
      ) : (
        <div className={`w-full h-full flex flex-col items-center justify-center font-bold bg-gradient-to-br ${colors.bg} ${colors.text}`}>
          <span>{getInitials()}</span>
          <span className="text-[10px] opacity-75 font-normal">#{leader.order}</span>
        </div>
      )}
    </div>
  );
};
