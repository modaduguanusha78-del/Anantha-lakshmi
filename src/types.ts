export type LanguageCode =
  | 'en' // English
  | 'hi' // Hindi
  | 'bn' // Bengali
  | 'te' // Telugu
  | 'ta' // Tamil
  | 'mr' // Marathi
  | 'gu' // Gujarati
  | 'kn' // Kannada
  | 'ml' // Malayalam
  | 'pa' // Punjabi
  | 'or'; // Odia

export interface LanguageOption {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flagEmoji?: string;
}

export type CyclePhase = 'Menstrual' | 'Follicular' | 'Ovulatory' | 'Luteal';

export type FlowLevel = 'light' | 'medium' | 'heavy' | 'spotting' | 'none';

export type MoodType = 'happy' | 'calm' | 'anxious' | 'irritable' | 'sad' | 'fatigued' | 'energetic';

export type SymptomType =
  | 'cramps'
  | 'bloating'
  | 'acne'
  | 'headache'
  | 'breast_tenderness'
  | 'backache'
  | 'nausea'
  | 'cravings'
  | 'mood_swings'
  | 'insomnia';

export interface DailyLog {
  date: string; // YYYY-MM-DD
  flow: FlowLevel;
  mood?: MoodType;
  symptoms: SymptomType[];
  notes?: string;
  waterGlasses?: number;
  ironTaken?: boolean;
}

export interface CycleSettings {
  lastPeriodDate: string; // YYYY-MM-DD
  cycleLengthDays: number; // e.g. 28
  periodDurationDays: number; // e.g. 5
}

export interface CycleCalculationResult {
  currentPhase: CyclePhase;
  currentCycleDay: number;
  daysUntilNextPeriod: number;
  nextPeriodDate: string;
  ovulationDate: string;
  fertileWindowStart: string;
  fertileWindowEnd: string;
  phaseDescription: string;
  phaseDietTip: string;
  phaseExerciseTip: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  isWarning?: boolean;
}

export interface SymptomCheckerResult {
  riskLevel: 'URGENT_EMERGENCY' | 'DOCTOR_CONSULT_NEEDED' | 'MILD_SELF_CARE';
  summary: string;
  redFlagsDetected: string[];
  immediateActions: string[];
  questionsToAskDoctor: string[];
  emergencyHelplines?: string[];
}

export interface DietMealPlan {
  breakfast: string;
  lunch: string;
  eveningSnack: string;
  dinner: string;
  keyNutrientsFocus: string[];
  affordableSuperfoods: string[];
}

export interface ExerciseItem {
  name: string;
  duration: string;
  benefits: string;
  precautions?: string;
}

export interface GeneratedPlan {
  planTitle: string;
  overview: string;
  dietPlan: DietMealPlan;
  exercisePlan: {
    recommendedExercises: ExerciseItem[];
    yogaPoses: string[];
  };
  lifestyleTips: string[];
}

export interface HealthcareFacility {
  name: string;
  type: string;
  address: string;
  servicesProvided: string[];
  contactOrHelpline?: string;
}

export interface GovtScheme {
  schemeName: string;
  description: string;
  financialBenefit: string;
  howToApply: string;
  eligibility?: string;
}

export interface FacilitySearchResponse {
  locationName: string;
  facilities: HealthcareFacility[];
  applicableSchemes: GovtScheme[];
}
