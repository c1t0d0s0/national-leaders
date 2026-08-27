export type LeaderCategory = 'tokugawa_shogun' | 'japan_prime_minister' | 'us_president';

export type ViewMode = 'grid' | 'timeline' | 'compare' | 'rankings' | 'quiz';

export type Language = 'ja' | 'en';

export interface LeaderSource {
  title: string;
  url?: string;
  sourceType: 'academic' | 'official_archive' | 'primary_record' | 'published_biography';
  noteJa?: string;
  noteEn?: string;
}

export interface PhysicalStats {
  heightCm?: number;
  heightNoteJa?: string;
  heightNoteEn?: string;
  heightSource?: string;
  weightKg?: number;
  weightNoteJa?: string;
  weightNoteEn?: string;
  weightSource?: string;
}

export interface AspectItem {
  titleJa: string;
  titleEn: string;
  descriptionJa: string;
  descriptionEn: string;
  source?: string;
}

export interface HistoryEvent {
  year: string;
  titleJa: string;
  titleEn: string;
  descriptionJa: string;
  descriptionEn: string;
}

export interface Leader {
  id: string;
  category: LeaderCategory;
  order: number; // 代数
  termDisplayJa?: string; // 複数期の場合 (例: "第90・96・97・98代")
  termDisplayEn?: string; // e.g. "90th, 96th-98th"
  nameJa: string;
  nameRuby: string;
  nameEn: string;
  imageUrl?: string;
  imageCaptionJa?: string;
  imageCaptionEn?: string;
  
  // 生没年月日
  birthDate: string; // YYYY-MM-DD or YYYY
  deathDate?: string | null;
  inaugurationAge?: number | null; // 就任時年齢
  deathAge?: number | null;
  birthPlaceJa?: string;
  birthPlaceEn?: string;
  
  // 期間・政権情報
  reignStart: string; // YYYY-MM-DD
  reignEnd: string; // YYYY-MM-DD or "現職" / "Present"
  reignDays: number;
  eraNameJa?: string; // 江戸前期, 明治, 昭和, etc.
  eraNameEn?: string;
  partyOrFactionJa?: string;
  partyOrFactionEn?: string;
  
  // 身体データ
  physicalStats: PhysicalStats;
  
  // 概要・功績・評価
  summaryJa: string;
  summaryEn: string;
  keyAchievementsJa: string[];
  keyAchievementsEn: string[];
  positiveAspects: AspectItem[];
  negativeAspects: AspectItem[];
  
  // 歴史年表
  keyEvents: HistoryEvent[];
  
  // 信頼できる出典・参考文献
  sources: LeaderSource[];
}

export interface FilterOptions {
  category: LeaderCategory | 'all';
  searchQuery: string;
  sortBy: 'order' | 'reign_length' | 'height' | 'weight' | 'inauguration_age' | 'birth_year';
  sortOrder: 'asc' | 'desc';
  hasPhysicalDataOnly: boolean;
  selectedEra?: string;
}

export interface QuizQuestion {
  id: string;
  category: LeaderCategory | 'all';
  questionType: 'achievement' | 'physical' | 'quote_or_event' | 'term';
  questionJa: string;
  questionEn: string;
  options: {
    leaderId: string;
    textJa: string;
    textEn: string;
    imageUrl?: string;
  }[];
  correctLeaderId: string;
  explanationJa: string;
  explanationEn: string;
  sourceNoteJa?: string;
  sourceNoteEn?: string;
}
