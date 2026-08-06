import React, { useState } from 'react';
import { ShieldAlert, AlertTriangle, CheckCircle, Activity, PhoneCall, HelpCircle, ArrowRight, Loader2, RefreshCw } from 'lucide-react';
import { LanguageCode, SymptomCheckerResult } from '../types';
import { TRANSLATIONS } from '../translations';

interface SymptomWarningCheckerProps {
  currentLanguage: LanguageCode;
  onOpenEmergency: () => void;
}

export const SymptomWarningChecker: React.FC<SymptomWarningCheckerProps> = ({
  currentLanguage,
  onOpenEmergency,
}) => {
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;

  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [age, setAge] = useState<number | ''>(26);
  const [isPregnant, setIsPregnant] = useState(false);
  const [additionalNotes, setAdditionalNotes] = useState('');

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SymptomCheckerResult | null>(null);

  const symptomChecklist = [
    { id: 'heavy_bleeding', label: 'Heavy Bleeding (Soaking 2+ pads/hour)', flag: true },
    { id: 'severe_pelvic_pain', label: 'Severe Sharp Abdominal / Pelvic Pain', flag: true },
    { id: 'high_fever_pregnancy', label: 'High Fever (>101°F) or Chills during Pregnancy', flag: true },
    { id: 'blurred_vision_headache', label: 'Severe Headache or Blurred Vision in Pregnancy', flag: true },
    { id: 'dizziness_fainting', label: 'Extreme Dizziness / Loss of Consciousness', flag: true },
    { id: 'foul_discharge', label: 'Foul-smelling Vaginal Discharge or Itching', flag: false },
    { id: 'breast_lump', label: 'New Breast Lump, Nipple Nipple Discharge, or Dimpling', flag: false },
    { id: 'severe_fatigue', label: 'Severe Fatigue / Pale Skin (Possible Anemia)', flag: false },
    { id: 'severe_vomiting', label: 'Uncontrolled Vomiting & Inability to retain fluids', flag: false },
    { id: 'irregular_periods', label: 'Irregular / Missed Periods for 2+ cycles', flag: false }
  ];

  const toggleSymptom = (id: string) => {
    if (selectedSymptoms.includes(id)) {
      setSelectedSymptoms(selectedSymptoms.filter((s) => s !== id));
    } else {
      setSelectedSymptoms([...selectedSymptoms, id]);
    }
  };

  const handleEvaluate = async () => {
    if (selectedSymptoms.length === 0 && !additionalNotes.trim()) {
      alert('Please select at least one symptom or describe your concern.');
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/symptom-checker', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          symptoms: selectedSymptoms.map((s) => symptomChecklist.find((i) => i.id === s)?.label || s),
          additionalNotes,
          age,
          isPregnant,
          language: currentLanguage,
        }),
      });

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error('Symptom check error:', err);
      alert('Error evaluating symptoms. Please try again or consult a doctor directly.');
    } finally {
      setLoading(false);
    }
  };

  const resetChecker = () => {
    setSelectedSymptoms([]);
    setAdditionalNotes('');
    setResult(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Title Card */}
      <div className="bg-gradient-to-r from-red-700 via-rose-800 to-pink-900 text-white rounded-3xl p-6 sm:p-8 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                {t.warningCheckTitle}
              </h2>
              <p className="text-xs sm:text-sm text-red-100 mt-1 max-w-xl">
                {t.warningCheckSubtitle}
              </p>
            </div>
          </div>

          <button
            onClick={onOpenEmergency}
            className="px-4 py-2.5 rounded-xl bg-white text-red-700 font-extrabold text-xs shadow-md hover:bg-red-50 transition-all flex items-center gap-1.5 shrink-0"
          >
            <PhoneCall className="w-4 h-4 text-red-600" />
            <span>Emergency 108 Hotline</span>
          </button>
        </div>
      </div>

      {/* Main Form & Results Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Symptom Checklist */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-rose-100 shadow-xs space-y-5">
          <div className="border-b border-rose-100 pb-3">
            <h3 className="font-bold text-base text-slate-900">1. Select Any Symptoms Experienced</h3>
            <p className="text-xs text-slate-500">Check all that apply to you right now</p>
          </div>

          <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
            {symptomChecklist.map((item) => {
              const isChecked = selectedSymptoms.includes(item.id);
              return (
                <label
                  key={item.id}
                  onClick={() => toggleSymptom(item.id)}
                  className={`p-3 rounded-2xl border text-xs font-semibold flex items-center justify-between cursor-pointer transition-all ${
                    isChecked
                      ? item.flag
                        ? 'bg-red-50 border-red-400 text-red-950 font-bold'
                        : 'bg-rose-50 border-rose-400 text-rose-950 font-bold'
                      : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {}} // handled by parent label
                      className="w-4 h-4 text-rose-600 rounded focus:ring-rose-500"
                    />
                    <span>{item.label}</span>
                  </div>
                  {item.flag && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-700 border border-red-200">
                      Red Flag
                    </span>
                  )}
                </label>
              );
            })}
          </div>

          {/* User Parameters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">Your Age</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-rose-500"
              />
            </div>

            <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl p-2.5">
              <span className="text-xs font-bold text-slate-800">Are you currently pregnant?</span>
              <button
                type="button"
                onClick={() => setIsPregnant(!isPregnant)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  isPregnant ? 'bg-rose-600 text-white' : 'bg-slate-200 text-slate-700'
                }`}
              >
                {isPregnant ? 'Yes' : 'No'}
              </button>
            </div>
          </div>

          {/* Additional Notes */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Describe how long or how severe the symptom is:
            </label>
            <textarea
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
              placeholder="e.g. Started 3 hours ago, feeling very dizzy, pain level 8/10..."
              rows={2}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-rose-500"
            />
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <button
              onClick={handleEvaluate}
              disabled={loading}
              id="evaluate-symptoms-btn"
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 hover:brightness-110 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Evaluating Warning Signs with SheCare AI...</span>
                </>
              ) : (
                <>
                  <Activity className="w-4 h-4" />
                  <span>{t.checkNow}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: AI Evaluation Result */}
        <div className="lg:col-span-5 space-y-6">
          {result ? (
            <div className="bg-white rounded-3xl p-6 border border-rose-100 shadow-md space-y-5 animate-fade-in">
              <div className="flex items-center justify-between border-b pb-3">
                <h3 className="font-bold text-base text-slate-900">AI Evaluation Report</h3>
                <button
                  onClick={resetChecker}
                  className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Reset
                </button>
              </div>

              {/* Risk Level Badge */}
              {result.riskLevel === 'URGENT_EMERGENCY' && (
                <div className="p-4 rounded-2xl bg-red-600 text-white shadow-md space-y-2 animate-bounce-subtle">
                  <div className="flex items-center gap-2 font-extrabold text-sm">
                    <ShieldAlert className="w-5 h-5" />
                    <span>{t.riskUrgent}</span>
                  </div>
                  <p className="text-xs text-red-100 leading-relaxed font-medium">
                    Critical warning signs detected. Please seek immediate medical care at your nearest hospital or call 108.
                  </p>
                  <div className="pt-2 flex gap-2">
                    <a
                      href="tel:108"
                      className="px-3 py-1.5 rounded-xl bg-white text-red-700 font-extrabold text-xs shadow-xs hover:bg-red-50"
                    >
                      Call 108 Ambulance
                    </a>
                  </div>
                </div>
              )}

              {result.riskLevel === 'DOCTOR_CONSULT_NEEDED' && (
                <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 text-amber-950 space-y-1.5">
                  <div className="flex items-center gap-2 font-extrabold text-sm text-amber-900">
                    <AlertTriangle className="w-5 h-5 text-amber-600" />
                    <span>{t.riskDoctor}</span>
                  </div>
                  <p className="text-xs text-amber-900 leading-relaxed font-medium">
                    Your symptoms warrant a clinical consultation with a doctor or Gynaecologist at your local PHC.
                  </p>
                </div>
              )}

              {result.riskLevel === 'MILD_SELF_CARE' && (
                <div className="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-300 text-emerald-950 space-y-1.5">
                  <div className="flex items-center gap-2 font-extrabold text-sm text-emerald-900">
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                    <span>{t.riskSelfCare}</span>
                  </div>
                  <p className="text-xs text-emerald-900 leading-relaxed font-medium">
                    These symptoms appear mild and can generally be managed with resting, hydration, and nutrition.
                  </p>
                </div>
              )}

              {/* Summary */}
              <div className="p-3.5 rounded-2xl bg-slate-50 text-xs text-slate-800 space-y-1">
                <span className="font-bold text-slate-900 block">Overview:</span>
                <p className="leading-relaxed">{result.summary}</p>
              </div>

              {/* Red Flags Identified */}
              {result.redFlagsDetected && result.redFlagsDetected.length > 0 && (
                <div className="space-y-1.5">
                  <span className="font-bold text-xs text-red-700 block">Warning Signs Identified:</span>
                  <ul className="list-disc list-inside text-xs text-slate-700 space-y-1">
                    {result.redFlagsDetected.map((rf, i) => (
                      <li key={i}>{rf}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Recommended Immediate Actions */}
              {result.immediateActions && result.immediateActions.length > 0 && (
                <div className="space-y-1.5">
                  <span className="font-bold text-xs text-slate-900 block">Recommended Next Steps:</span>
                  <ol className="list-decimal list-inside text-xs text-slate-700 space-y-1">
                    {result.immediateActions.map((act, i) => (
                      <li key={i}>{act}</li>
                    ))}
                  </ol>
                </div>
              )}

              {/* Questions to ask doctor */}
              {result.questionsToAskDoctor && result.questionsToAskDoctor.length > 0 && (
                <div className="p-3.5 rounded-2xl bg-rose-50/80 border border-rose-200 text-xs text-rose-950 space-y-1.5">
                  <div className="flex items-center gap-1.5 font-bold text-rose-900">
                    <HelpCircle className="w-4 h-4 text-rose-600" />
                    <span>Questions to ask your Doctor:</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-slate-700">
                    {result.questionsToAskDoctor.map((q, i) => (
                      <li key={i}>{q}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-slate-50 rounded-3xl p-8 border-2 border-dashed border-slate-200 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
                <Activity className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-800 text-sm">No Symptoms Evaluated Yet</h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Select your symptoms on the left and click "Evaluate Symptoms Now" to receive AI triaging guidance.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
