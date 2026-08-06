import React, { useState, useEffect } from 'react';
import { Calendar, Bot, ShieldAlert, Utensils, Hospital, Heart, Sparkles, Globe, Shield, Activity } from 'lucide-react';
import { CycleSettings, DailyLog, LanguageCode } from './types';
import { TRANSLATIONS } from './translations';
import { Header } from './components/Header';
import { EmergencyBanner } from './components/EmergencyBanner';
import { CycleTracker } from './components/CycleTracker';
import { AIAssistant } from './components/AIAssistant';
import { SymptomWarningChecker } from './components/SymptomWarningChecker';
import { WellnessPlanner } from './components/WellnessPlanner';
import { GovernmentSchemesAndHospitals } from './components/GovernmentSchemesAndHospitals';
import { calculateCycleStats } from './utils/cycleCalculator';

type TabType = 'cycle' | 'ai_chat' | 'symptom_check' | 'wellness' | 'facilities';

export default function App() {
  // 1. Language State
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>(() => {
    const saved = localStorage.getItem('shecare_language');
    return (saved as LanguageCode) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('shecare_language', currentLanguage);
  }, [currentLanguage]);

  // 2. Active Tab State
  const [activeTab, setActiveTab] = useState<TabType>('cycle');

  // 3. Emergency Banner State
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);

  // 4. Cycle Settings & Local Storage
  const defaultLastPeriod = new Date(Date.now() - 12 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0];

  const [cycleSettings, setCycleSettings] = useState<CycleSettings>(() => {
    const saved = localStorage.getItem('shecare_cycle_settings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return {
      lastPeriodDate: defaultLastPeriod,
      cycleLengthDays: 28,
      periodDurationDays: 5,
    };
  });

  useEffect(() => {
    localStorage.setItem('shecare_cycle_settings', JSON.stringify(cycleSettings));
  }, [cycleSettings]);

  // 5. Daily Logs & Local Storage
  const [dailyLogs, setDailyLogs] = useState<Record<string, DailyLog>>(() => {
    const saved = localStorage.getItem('shecare_daily_logs');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return {};
  });

  useEffect(() => {
    localStorage.setItem('shecare_daily_logs', JSON.stringify(dailyLogs));
  }, [dailyLogs]);

  const handleSaveLog = (log: DailyLog) => {
    setDailyLogs((prev) => ({
      ...prev,
      [log.date]: log,
    }));
  };

  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;
  const cycleStats = calculateCycleStats(cycleSettings);

  const tabs: { id: TabType; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'cycle', label: t.tabCycle, icon: <Calendar className="w-4 h-4" /> },
    { id: 'ai_chat', label: t.tabAiChat, icon: <Bot className="w-4 h-4" />, badge: 'AI' },
    { id: 'symptom_check', label: t.tabSymptomCheck, icon: <ShieldAlert className="w-4 h-4" /> },
    { id: 'wellness', label: t.tabWellness, icon: <Utensils className="w-4 h-4" /> },
    { id: 'facilities', label: t.tabFacilities, icon: <Hospital className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50/70 via-white to-pink-50/40 text-slate-900 font-sans flex flex-col antialiased">
      {/* Header Bar */}
      <Header
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
        onOpenEmergency={() => setIsEmergencyOpen(true)}
      />

      {/* Emergency Drawer / Modal */}
      <EmergencyBanner
        isOpen={isEmergencyOpen}
        onClose={() => setIsEmergencyOpen(false)}
        currentLanguage={currentLanguage}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Navigation Tabs Bar */}
        <nav className="bg-white rounded-2xl p-1.5 border border-rose-100 shadow-xs flex items-center justify-between overflow-x-auto scrollbar-none gap-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                id={`tab-btn-${tab.id}`}
                className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-sm shadow-rose-200'
                    : 'text-slate-600 hover:text-rose-900 hover:bg-rose-50/70'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Tab Views */}
        <div className="pt-2">
          {activeTab === 'cycle' && (
            <CycleTracker
              settings={cycleSettings}
              onUpdateSettings={setCycleSettings}
              logs={dailyLogs}
              onSaveLog={handleSaveLog}
              currentLanguage={currentLanguage}
            />
          )}

          {activeTab === 'ai_chat' && (
            <AIAssistant
              currentLanguage={currentLanguage}
              cyclePhase={cycleStats.currentPhase}
            />
          )}

          {activeTab === 'symptom_check' && (
            <SymptomWarningChecker
              currentLanguage={currentLanguage}
              onOpenEmergency={() => setIsEmergencyOpen(true)}
            />
          )}

          {activeTab === 'wellness' && (
            <WellnessPlanner currentLanguage={currentLanguage} />
          )}

          {activeTab === 'facilities' && (
            <GovernmentSchemesAndHospitals currentLanguage={currentLanguage} />
          )}
        </div>
      </main>

      {/* Footer Banner */}
      <footer className="mt-auto bg-white border-t border-rose-100 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-rose-600 text-white flex items-center justify-center font-bold text-xs">
              S
            </div>
            <span className="font-bold text-slate-800">SheCare AI – Women's Health & Wellness Assistant</span>
          </div>

          <p className="text-center md:text-left text-[11px] max-w-2xl text-slate-500 leading-normal">
            {t.disclaimer}
          </p>

          <div className="flex items-center gap-3 text-[11px] font-semibold text-rose-800">
            <span>24x7 Helpline: 108</span>
            <span>•</span>
            <span>Women Helpline: 181</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
