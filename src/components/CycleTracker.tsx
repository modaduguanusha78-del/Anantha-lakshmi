import React, { useState } from 'react';
import { Calendar, Droplets, Sparkles, Heart, Bell, Check, Edit2, AlertCircle, RefreshCw, Sun, Moon, Activity, Flame, Shield, GlassWater } from 'lucide-react';
import { CycleSettings, DailyLog, FlowLevel, LanguageCode, MoodType, SymptomType } from '../types';
import { calculateCycleStats } from '../utils/cycleCalculator';
import { TRANSLATIONS } from '../translations';

interface CycleTrackerProps {
  settings: CycleSettings;
  onUpdateSettings: (newSettings: CycleSettings) => void;
  logs: Record<string, DailyLog>;
  onSaveLog: (log: DailyLog) => void;
  currentLanguage: LanguageCode;
}

export const CycleTracker: React.FC<CycleTrackerProps> = ({
  settings,
  onUpdateSettings,
  logs,
  onSaveLog,
  currentLanguage,
}) => {
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;
  const stats = calculateCycleStats(settings);

  // Today's Date String YYYY-MM-DD
  const todayStr = new Date().toISOString().split('T')[0];
  const todayLog = logs[todayStr] || {
    date: todayStr,
    flow: 'none',
    symptoms: [],
    waterGlasses: 4,
    ironTaken: false
  };

  const [editingSettings, setEditingSettings] = useState(false);
  const [tempLastPeriod, setTempLastPeriod] = useState(settings.lastPeriodDate);
  const [tempCycleLength, setTempCycleLength] = useState(settings.cycleLengthDays);
  const [tempPeriodDuration, setTempPeriodDuration] = useState(settings.periodDurationDays);

  // Daily Log State
  const [currentLog, setCurrentLog] = useState<DailyLog>(todayLog);
  const [logSavedToast, setLogSavedToast] = useState(false);

  // Reminder Preferences
  const [reminders, setReminders] = useState({
    periodAlert: true,
    ovulationAlert: true,
    hydrationReminder: true,
    ironCheck: true,
  });

  const handleSaveSettingsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSettings({
      lastPeriodDate: tempLastPeriod,
      cycleLengthDays: tempCycleLength,
      periodDurationDays: tempPeriodDuration,
    });
    setEditingSettings(false);
  };

  const handleToggleSymptom = (symptom: SymptomType) => {
    const exists = currentLog.symptoms.includes(symptom);
    const updated = exists
      ? currentLog.symptoms.filter((s) => s !== symptom)
      : [...currentLog.symptoms, symptom];
    setCurrentLog({ ...currentLog, symptoms: updated });
  };

  const handleSaveLogSubmit = () => {
    onSaveLog(currentLog);
    setLogSavedToast(true);
    setTimeout(() => setLogSavedToast(false), 3000);
  };

  const symptomsList: { key: SymptomType; label: string; icon: string }[] = [
    { key: 'cramps', label: 'Cramps (पेट में ऐंठन)', icon: '⚡' },
    { key: 'bloating', label: 'Bloating (पेट फूलना)', icon: '🎈' },
    { key: 'acne', label: 'Acne / Pimples (मुंहासे)', icon: '✨' },
    { key: 'headache', label: 'Headache (सिरदर्द)', icon: '🤕' },
    { key: 'breast_tenderness', label: 'Breast Pain (स्तन में दर्द)', icon: '🌸' },
    { key: 'backache', label: 'Back Pain (कमर दर्द)', icon: '🦴' },
    { key: 'nausea', label: 'Nausea (जी मिचलाना)', icon: '🤢' },
    { key: 'mood_swings', label: 'Mood Swings (चिड़चिड़ापन)', icon: '🎭' },
  ];

  const flowOptions: { key: FlowLevel; label: string; color: string }[] = [
    { key: 'none', label: 'None', color: 'bg-slate-100 text-slate-700' },
    { key: 'spotting', label: 'Spotting', color: 'bg-rose-100 text-rose-700' },
    { key: 'light', label: 'Light', color: 'bg-rose-200 text-rose-800' },
    { key: 'medium', label: 'Medium', color: 'bg-rose-500 text-white' },
    { key: 'heavy', label: 'Heavy', color: 'bg-rose-800 text-white' },
  ];

  const moodOptions: { key: MoodType; label: string; icon: string }[] = [
    { key: 'calm', label: 'Calm', icon: '😌' },
    { key: 'happy', label: 'Happy', icon: '😊' },
    { key: 'energetic', label: 'Energetic', icon: '⚡' },
    { key: 'irritable', label: 'Irritable', icon: '😤' },
    { key: 'sad', label: 'Sad', icon: '😢' },
    { key: 'fatigued', label: 'Fatigued', icon: '😴' },
  ];

  // Phase color badge
  const getPhaseBadgeColor = (phase: string) => {
    switch (phase) {
      case 'Menstrual': return 'bg-rose-600 text-white border-rose-700';
      case 'Follicular': return 'bg-emerald-600 text-white border-emerald-700';
      case 'Ovulatory': return 'bg-amber-500 text-white border-amber-600';
      case 'Luteal': return 'bg-purple-600 text-white border-purple-700';
      default: return 'bg-slate-600 text-white';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Banner & Cycle Dial Card */}
      <div className="bg-gradient-to-br from-rose-900 via-pink-900 to-purple-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        {/* Background Decorative Rings */}
        <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full border-16 border-white/5 pointer-events-none" />
        <div className="absolute -left-12 -top-12 w-48 h-48 rounded-full border-12 border-rose-500/10 pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Main Dial / Days Counter */}
          <div className="lg:col-span-7 flex flex-col sm:flex-row items-center gap-6">
            <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-white/10 backdrop-blur-md border-4 border-white/20 p-4 flex flex-col items-center justify-center text-center shadow-inner shrink-0">
              <span className="text-xs uppercase tracking-widest text-rose-200 font-semibold">
                {t.cycleDay}
              </span>
              <span className="text-4xl sm:text-5xl font-black tracking-tight text-white my-1">
                Day {stats.currentCycleDay}
              </span>
              <span className={`text-xs px-3 py-1 rounded-full font-bold border mt-1 ${getPhaseBadgeColor(stats.currentPhase)}`}>
                {stats.currentPhase} Phase
              </span>
            </div>

            <div className="space-y-2 text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-200 text-xs font-semibold border border-rose-400/30">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>{t.currentPhase}: {stats.currentPhase}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                {t.nextPeriodIn} <span className="text-amber-300">{stats.daysUntilNextPeriod} {t.days}</span>
              </h2>
              <p className="text-xs text-rose-200/90 max-w-md leading-relaxed">
                {stats.phaseDescription}
              </p>
              <div className="pt-2 flex flex-wrap gap-2 text-[11px] text-rose-100">
                <span className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/15">
                  🩸 Next Period: <strong className="text-white">{stats.nextPeriodDate}</strong>
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/15">
                  🌱 Ovulation: <strong className="text-white">{stats.ovulationDate}</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Quick Fertile Window & Cycle Details Box */}
          <div className="lg:col-span-5 bg-white/10 backdrop-blur-lg border border-white/15 rounded-2xl p-4 sm:p-5 text-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="font-bold text-rose-200 uppercase tracking-wider">Cycle Details</span>
              <button
                onClick={() => setEditingSettings(!editingSettings)}
                className="flex items-center gap-1 text-rose-200 hover:text-white transition-colors underline font-medium"
                id="edit-cycle-details-btn"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>{editingSettings ? 'Close' : 'Edit'}</span>
              </button>
            </div>

            {editingSettings ? (
              <form onSubmit={handleSaveSettingsSubmit} className="space-y-3 pt-1">
                <div>
                  <label className="block text-slate-200 text-[11px] font-semibold mb-1">
                    {t.lastPeriodDate}
                  </label>
                  <input
                    type="date"
                    value={tempLastPeriod}
                    onChange={(e) => setTempLastPeriod(e.target.value)}
                    className="w-full bg-slate-900/80 border border-rose-400/40 rounded-xl px-3 py-1.5 text-white focus:outline-none focus:border-rose-400"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-slate-200 text-[11px] font-semibold mb-1">
                      {t.cycleLength}
                    </label>
                    <input
                      type="number"
                      min="20"
                      max="45"
                      value={tempCycleLength}
                      onChange={(e) => setTempCycleLength(Number(e.target.value))}
                      className="w-full bg-slate-900/80 border border-rose-400/40 rounded-xl px-3 py-1.5 text-white focus:outline-none focus:border-rose-400"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-slate-200 text-[11px] font-semibold mb-1">
                      {t.periodDuration}
                    </label>
                    <input
                      type="number"
                      min="2"
                      max="10"
                      value={tempPeriodDuration}
                      onChange={(e) => setTempPeriodDuration(Number(e.target.value))}
                      className="w-full bg-slate-900/80 border border-rose-400/40 rounded-xl px-3 py-1.5 text-white focus:outline-none focus:border-rose-400"
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-2 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 font-bold text-white shadow-md hover:brightness-110 transition-all text-xs"
                >
                  {t.saveSettings}
                </button>
              </form>
            ) : (
              <div className="space-y-2 text-rose-100">
                <div className="flex justify-between items-center bg-white/5 p-2 rounded-xl">
                  <span>{t.fertileWindow}:</span>
                  <span className="font-bold text-amber-300">{stats.fertileWindowStart} - {stats.fertileWindowEnd}</span>
                </div>
                <div className="flex justify-between items-center bg-white/5 p-2 rounded-xl">
                  <span>{t.cycleLength}:</span>
                  <span className="font-semibold text-white">{settings.cycleLengthDays} Days</span>
                </div>
                <div className="flex justify-between items-center bg-white/5 p-2 rounded-xl">
                  <span>{t.periodDuration}:</span>
                  <span className="font-semibold text-white">{settings.periodDurationDays} Days</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Grid: Phase-Specific Health Guidance + Today's Symptom Logger */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Phase Guidance & Nutrition Tips */}
        <div className="lg:col-span-6 space-y-6">
          {/* Phase Specific Diet & Exercise Card */}
          <div className="bg-white rounded-3xl p-6 border border-rose-100 shadow-sm space-y-5">
            <div className="flex items-center gap-2.5 text-rose-900 border-b border-rose-100 pb-3">
              <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-base">{t.currentPhase} Care Plan ({stats.currentPhase})</h3>
                <p className="text-xs text-slate-500">Tailored wellness for your body's hormone levels today</p>
              </div>
            </div>

            {/* Diet Recommendation */}
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-2">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wider">
                <span>🥗 {t.phaseDietTipTitle}</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                {stats.phaseDietTip}
              </p>
            </div>

            {/* Exercise Recommendation */}
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-2">
              <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs uppercase tracking-wider">
                <span>🧘 {t.phaseExerciseTipTitle}</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                {stats.phaseExerciseTip}
              </p>
            </div>
          </div>

          {/* Smart Reminders & Health Alerts Simulator */}
          <div className="bg-white rounded-3xl p-6 border border-rose-100 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-rose-100 pb-3">
              <div className="flex items-center gap-2 text-rose-900 font-bold text-base">
                <Bell className="w-5 h-5 text-rose-600" />
                <span>Smart Reminders & Health Alerts</span>
              </div>
              <span className="text-[11px] text-emerald-600 font-bold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                Active
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              <label className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-rose-50/50 cursor-pointer transition-colors border border-slate-100">
                <div className="space-y-0.5">
                  <span className="font-bold text-slate-900 block">Period Due Alert (2 Days Before)</span>
                  <span className="text-slate-500 text-[11px] block">Receive reminder to carry sanitary pads/napkins</span>
                </div>
                <input
                  type="checkbox"
                  checked={reminders.periodAlert}
                  onChange={(e) => setReminders({ ...reminders, periodAlert: e.target.checked })}
                  className="w-4 h-4 text-rose-600 rounded focus:ring-rose-500"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-rose-50/50 cursor-pointer transition-colors border border-slate-100">
                <div className="space-y-0.5">
                  <span className="font-bold text-slate-900 block">Hydration & Water Goal (8 Glasses)</span>
                  <span className="text-slate-500 text-[11px] block">Helps reduce menstrual cramping and bloating</span>
                </div>
                <input
                  type="checkbox"
                  checked={reminders.hydrationReminder}
                  onChange={(e) => setReminders({ ...reminders, hydrationReminder: e.target.checked })}
                  className="w-4 h-4 text-rose-600 rounded focus:ring-rose-500"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-rose-50/50 cursor-pointer transition-colors border border-slate-100">
                <div className="space-y-0.5">
                  <span className="font-bold text-slate-900 block">Iron / Folic Acid Tablet Reminder</span>
                  <span className="text-slate-500 text-[11px] block">Crucial for preventing anemia during flow days</span>
                </div>
                <input
                  type="checkbox"
                  checked={reminders.ironCheck}
                  onChange={(e) => setReminders({ ...reminders, ironCheck: e.target.checked })}
                  className="w-4 h-4 text-rose-600 rounded focus:ring-rose-500"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Today's Symptom & Flow Logger */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-rose-100 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-rose-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                  <Droplets className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900">{t.logToday}</h3>
                  <p className="text-xs text-slate-500">Log symptoms to get more accurate AI advice</p>
                </div>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                {todayStr}
              </span>
            </div>

            {/* Flow Level Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                {t.flow}
              </label>
              <div className="grid grid-cols-5 gap-1.5">
                {flowOptions.map((opt) => (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => setCurrentLog({ ...currentLog, flow: opt.key })}
                    className={`py-2 px-1 rounded-xl text-xs font-bold transition-all border ${
                      currentLog.flow === opt.key
                        ? 'border-rose-600 ring-2 ring-rose-300 shadow-xs scale-102'
                        : 'border-slate-200 hover:border-slate-300'
                    } ${opt.color}`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Mood Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                {t.mood}
              </label>
              <div className="flex flex-wrap gap-2">
                {moodOptions.map((opt) => (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => setCurrentLog({ ...currentLog, mood: opt.key })}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all ${
                      currentLog.mood === opt.key
                        ? 'bg-rose-100 border-rose-400 text-rose-900 font-bold ring-2 ring-rose-200'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span>{opt.icon}</span>
                    <span>{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Symptoms Grid */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                {t.symptoms}
              </label>
              <div className="grid grid-cols-2 gap-2">
                {symptomsList.map((item) => {
                  const isSelected = currentLog.symptoms.includes(item.key);
                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => handleToggleSymptom(item.key)}
                      className={`p-2.5 rounded-xl text-xs font-semibold text-left flex items-center gap-2 border transition-all ${
                        isSelected
                          ? 'bg-rose-50 border-rose-400 text-rose-900 font-bold'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span>{item.icon}</span>
                      <span className="truncate">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Hydration & Iron Supplement Tracker */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sky-900 text-xs font-bold">
                  <GlassWater className="w-4 h-4 text-sky-600" />
                  <span>Water (Glasses)</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setCurrentLog({ ...currentLog, waterGlasses: Math.max(0, (currentLog.waterGlasses || 0) - 1) })}
                    className="w-6 h-6 rounded-lg bg-sky-200 hover:bg-sky-300 text-sky-900 font-bold flex items-center justify-center text-xs"
                  >
                    -
                  </button>
                  <span className="font-extrabold text-sky-900 text-sm">{currentLog.waterGlasses || 0}</span>
                  <button
                    type="button"
                    onClick={() => setCurrentLog({ ...currentLog, waterGlasses: (currentLog.waterGlasses || 0) + 1 })}
                    className="w-6 h-6 rounded-lg bg-sky-200 hover:bg-sky-300 text-sky-900 font-bold flex items-center justify-center text-xs"
                  >
                    +
                  </button>
                </div>
              </div>

              <label className="p-3 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between cursor-pointer">
                <span className="text-xs font-bold text-amber-900">Iron Supplement Taken</span>
                <input
                  type="checkbox"
                  checked={currentLog.ironTaken || false}
                  onChange={(e) => setCurrentLog({ ...currentLog, ironTaken: e.target.checked })}
                  className="w-4 h-4 text-amber-600 rounded focus:ring-amber-500"
                />
              </label>
            </div>

            {/* Save Log Button & Success Toast */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleSaveLogSubmit}
                id="save-daily-log-btn"
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" />
                <span>Save Today's Log</span>
              </button>
              {logSavedToast && (
                <p className="text-center text-xs font-bold text-emerald-600 mt-2 animate-fade-in">
                  ✓ Today's symptoms saved successfully!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
