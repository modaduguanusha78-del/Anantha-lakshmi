import React, { useState } from 'react';
import { Hospital, Building2, Search, MapPin, Award, CheckCircle, ExternalLink, PhoneCall, Loader2, Sparkles } from 'lucide-react';
import { FacilitySearchResponse, GovtScheme, HealthcareFacility, LanguageCode } from '../types';
import { TRANSLATIONS } from '../translations';

interface GovernmentSchemesAndHospitalsProps {
  currentLanguage: LanguageCode;
}

export const GovernmentSchemesAndHospitals: React.FC<GovernmentSchemesAndHospitalsProps> = ({
  currentLanguage,
}) => {
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;

  const [locationInput, setLocationInput] = useState('Warangal, Telangana');
  const [loading, setLoading] = useState(false);

  // Default pre-populated response for immediate high-quality display
  const [data, setData] = useState<FacilitySearchResponse>({
    locationName: "Warangal, Telangana",
    facilities: [
      {
        name: "MGM Government Maternity Hospital & CHC",
        type: "Maternity & CHC Hospital",
        address: "Station Road, Near Railway Colony, Warangal",
        servicesProvided: ["Free Normal & C-Section Delivery", "NICU Care", "24x7 Emergency Obstetric", "Free Blood Bank Support"],
        contactOrHelpline: "0870-2426611 / 108"
      },
      {
        name: "Primary Health Center (PHC) Hanamkonda",
        type: "Primary Health Center (PHC)",
        address: "Subedari, Hanamkonda, Warangal",
        servicesProvided: ["Free Antenatal Checkups (PMSMA)", "Iron & Folic Acid Tablets", "Routine Vaccination", "Sanitary Napkin Distribution"],
        contactOrHelpline: "102 / 181"
      },
      {
        name: "Urban Primary Health Center (UPHC) Waddepally",
        type: "Urban PHC",
        address: "Kazipet Main Road, Waddepally, Warangal",
        servicesProvided: ["PCOS & Anemia Screening", "Family Planning Counseling", "Free Diagnostics"],
        contactOrHelpline: "108 Ambulance"
      }
    ],
    applicableSchemes: [
      {
        schemeName: "Pradhan Mantri Matru Vandana Yojana (PMMVY)",
        description: "Maternity benefit cash incentive program for pregnant women and lactating mothers.",
        financialBenefit: "₹5,000 in direct bank transfer installments for first living child.",
        howToApply: "Apply at your nearest Anganwadi Center or ASHA worker with Aadhaar & Mother Child Protection (MCP) card."
      },
      {
        schemeName: "Janani Suraksha Yojana (JSY)",
        description: "Safe motherhood intervention promoting institutional delivery among poor pregnant women.",
        financialBenefit: "₹1,400 cash assistance for rural women + free transport via 102/108.",
        howToApply: "Register at your local PHC/CHC during early pregnancy checkups."
      },
      {
        schemeName: "Pradhan Mantri Surakshit Matritva Abhiyan (PMSMA)",
        description: "Provides free, comprehensive, quality antenatal care (ANC) on the 9th of every month.",
        financialBenefit: "Free specialist doctor consultations, blood tests, and ultrasound scan.",
        howToApply: "Visit any Government Health Facility or PHC on the 9th day of any month."
      },
      {
        schemeName: "Anemia Mukt Bharat Strategy",
        description: "National initiative to eradicate anemia through prophylaxis iron supplementation.",
        financialBenefit: "Free Iron and Folic Acid (IFA) red/blue tablets & syrup at all Anganwadis.",
        howToApply: "Collect directly from your local Anganwadi worker or PHC nurse."
      }
    ]
  });

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!locationInput.trim()) return;

    setLoading(true);

    try {
      const response = await fetch('/api/find-facilities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          locationQuery: locationInput,
          language: currentLanguage,
        }),
      });

      const result = await response.json();
      setData(result);
    } catch (err) {
      console.error('Facility search error:', err);
      alert('Error finding centers. Please try searching again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Search Header Banner */}
      <div className="bg-gradient-to-r from-purple-800 via-indigo-800 to-rose-900 text-white rounded-3xl p-6 sm:p-8 shadow-md">
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
              <Building2 className="w-6 h-6 text-purple-100" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">{t.facilityTitle}</h2>
              <p className="text-xs sm:text-sm text-purple-100 mt-0.5">
                Locate primary health centers (PHC), maternity hospitals & government support schemes across India.
              </p>
            </div>
          </div>

          {/* Location Search Form */}
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2 pt-2">
            <div className="relative flex-1">
              <MapPin className="w-5 h-5 text-purple-600 absolute left-3.5 top-3.5 pointer-events-none" />
              <input
                type="text"
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
                placeholder={t.searchLocation}
                className="w-full bg-white text-slate-900 pl-11 pr-4 py-3 rounded-2xl text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-rose-400 shadow-md"
                id="location-search-input"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              id="search-facilities-btn"
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 hover:brightness-110 font-extrabold text-xs text-white shadow-md transition-all flex items-center justify-center gap-2 shrink-0"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Searching...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>{t.searchBtn}</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Main Results Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Nearby PHCs & Hospitals */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-rose-100 shadow-xs space-y-5">
          <div className="flex items-center gap-2 border-b border-rose-100 pb-3">
            <Hospital className="w-5 h-5 text-rose-600" />
            <h3 className="font-bold text-base text-slate-900">
              {t.nearbyHospitalsTitle} ({data.locationName})
            </h3>
          </div>

          <div className="space-y-4">
            {data.facilities.map((fac, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-rose-300 transition-all space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900">{fac.name}</h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 border border-purple-200 shrink-0">
                    {fac.type}
                  </span>
                </div>

                <p className="text-xs text-slate-600 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                  <span>{fac.address}</span>
                </p>

                <div className="pt-1">
                  <span className="text-[11px] font-bold text-slate-800 block mb-1">Key Services:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {fac.servicesProvided.map((srv, sIdx) => (
                      <span key={sIdx} className="text-[10px] px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-medium">
                        ✓ {srv}
                      </span>
                    ))}
                  </div>
                </div>

                {fac.contactOrHelpline && (
                  <div className="pt-1 flex items-center gap-2 text-xs font-bold text-rose-700">
                    <PhoneCall className="w-3.5 h-3.5 text-rose-600" />
                    <span>Contact: {fac.contactOrHelpline}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Government Schemes */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-rose-100 shadow-xs space-y-5">
          <div className="flex items-center gap-2 border-b border-rose-100 pb-3">
            <Award className="w-5 h-5 text-amber-600" />
            <h3 className="font-bold text-base text-slate-900">{t.govtSchemesTitle}</h3>
          </div>

          <div className="space-y-4">
            {data.applicableSchemes.map((scheme, sIdx) => (
              <div key={sIdx} className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/90 space-y-2">
                <div className="flex items-center gap-2 text-amber-950 font-bold text-xs sm:text-sm">
                  <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{scheme.schemeName}</span>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {scheme.description}
                </p>

                <div className="p-2.5 rounded-xl bg-white border border-amber-200 text-xs text-amber-900 font-bold">
                  💰 Benefit: {scheme.financialBenefit}
                </div>

                {scheme.howToApply && (
                  <p className="text-[11px] text-slate-600 italic">
                    <strong>How to Apply:</strong> {scheme.howToApply}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
