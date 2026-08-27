import React, { useState } from 'react';
import { Leader, Language } from '../types';
import { getCategoryBadgeColor } from '../data';
import { User } from 'lucide-react';

interface LeaderAvatarProps {
  leader: Leader;
  language: Language;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
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
    xs: 'w-10 h-10 text-xs rounded-xl',
    sm: 'w-14 h-14 sm:w-16 sm:h-16 text-sm rounded-2xl',
    md: 'w-24 h-24 sm:w-28 sm:h-28 text-base rounded-2xl',
    lg: 'w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 text-lg rounded-3xl',
    xl: 'w-44 h-44 sm:w-52 sm:h-52 md:w-60 md:h-60 text-2xl rounded-3xl',
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
      className={`relative overflow-hidden flex items-center justify-center border shadow-sm transition-all duration-300 bg-slate-100 dark:bg-slate-800 shrink-0 ${colors.border} ${sizeClasses[size]} ${className}`}
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
            className={`w-full h-full object-cover object-top transition-all duration-500 group-hover:scale-105 ${
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
