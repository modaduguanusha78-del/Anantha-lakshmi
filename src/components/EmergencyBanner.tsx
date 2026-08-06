import React from 'react';
import { ShieldAlert, PhoneCall, X, AlertTriangle, Hospital, ArrowRight, Activity } from 'lucide-react';
import { LanguageCode } from '../types';
import { TRANSLATIONS } from '../translations';

interface EmergencyBannerProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: LanguageCode;
}

export const EmergencyBanner: React.FC<EmergencyBannerProps> = ({
  isOpen,
  onClose,
  currentLanguage,
}) => {
  if (!isOpen) return null;

  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;

  const redFlags = [
    { title: "Heavy Bleeding", detail: "Soaking 2 or more large pads/cloths completely in 1 hour for 2 hours in a row." },
    { title: "Severe Abdominal / Pelvic Pain", detail: "Sudden, intense sharp pain on one side or lower stomach that prevents standing." },
    { title: "High Fever during Pregnancy", detail: "Fever above 101°F (38.3°C) with chills or foul-smelling vaginal discharge." },
    { title: "Eclampsia Warning Signs", detail: "Severe headache, blurred vision, swelling in hands/face during pregnancy." },
    { title: "Fainting or Extreme Dizziness", detail: "Feeling confused, pale, cold sweat, or loss of consciousness." }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full border-2 border-red-500 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-rose-700 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-7 h-7 text-white animate-pulse" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold tracking-tight">
                {t.emergencySos}
              </h2>
              <p className="text-xs text-red-100 font-medium">
                Immediate Medical Assistance & Red Flag Guidance (India)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            id="close-emergency-modal-btn"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Quick Call Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <a
              href="tel:108"
              className="p-4 rounded-2xl bg-red-50 border-2 border-red-200 hover:border-red-500 transition-all flex flex-col items-center text-center group shadow-sm hover:shadow-md"
            >
              <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <PhoneCall className="w-5 h-5" />
              </div>
              <span className="text-2xl font-extrabold text-red-700">108</span>
              <span className="text-xs font-semibold text-slate-800 mt-0.5">Emergency Ambulance</span>
              <span className="text-[10px] text-slate-500 mt-1">24x7 Free Medical Transport</span>
            </a>

            <a
              href="tel:181"
              className="p-4 rounded-2xl bg-rose-50 border-2 border-rose-200 hover:border-rose-500 transition-all flex flex-col items-center text-center group shadow-sm hover:shadow-md"
            >
              <div className="w-10 h-10 rounded-full bg-rose-600 text-white flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <PhoneCall className="w-5 h-5" />
              </div>
              <span className="text-2xl font-extrabold text-rose-700">181</span>
              <span className="text-xs font-semibold text-slate-800 mt-0.5">Women Helpline</span>
              <span className="text-[10px] text-slate-500 mt-1">Safety & Crisis Support</span>
            </a>

            <a
              href="tel:102"
              className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-200 hover:border-amber-500 transition-all flex flex-col items-center text-center group shadow-sm hover:shadow-md"
            >
              <div className="w-10 h-10 rounded-full bg-amber-600 text-white flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <Hospital className="w-5 h-5" />
              </div>
              <span className="text-2xl font-extrabold text-amber-700">102</span>
              <span className="text-xs font-semibold text-slate-800 mt-0.5">Maternal Hotline</span>
              <span className="text-[10px] text-slate-500 mt-1">Pregnant Mothers Transport</span>
            </a>
          </div>

          {/* Critical Warning Signs Checklist */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
            <div className="flex items-center gap-2 mb-3 text-red-700 font-bold text-sm">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <span>When to go immediately to the nearest hospital:</span>
            </div>
            <div className="space-y-2.5">
              {redFlags.map((flag, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white border border-slate-100 shadow-2xs">
                  <Activity className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{flag.title}</h4>
                    <p className="text-xs text-slate-600">{flag.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Guidance Note */}
          <div className="text-center p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-900 font-medium">
            <p>
              If you or someone near you is experiencing any of these red flags, do not wait for AI advice. Please proceed immediately to your nearest Community Health Center (CHC), District Hospital, or call 108.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-semibold text-xs transition-colors"
            id="acknowledge-emergency-modal-btn"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
