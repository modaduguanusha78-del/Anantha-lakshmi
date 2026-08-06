import React, { useState } from 'react';
import { Utensils, Activity, Sparkles, Check, Heart, Loader2, RefreshCw, Leaf, Sun, Dumbbell } from 'lucide-react';
import { GeneratedPlan, LanguageCode } from '../types';
import { TRANSLATIONS } from '../translations';

interface WellnessPlannerProps {
  currentLanguage: LanguageCode;
}

export const WellnessPlanner: React.FC<WellnessPlannerProps> = ({ currentLanguage }) => {
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;

  const [lifeStage, setLifeStage] = useState('PCOS / PCOD Management');
  const [healthGoal, setHealthGoal] = useState('Hormonal Balance & Energy');
  const [dietPref, setDietPref] = useState('Vegetarian');
  const [regionalCuisine, setRegionalCuisine] = useState('South Indian');

  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<GeneratedPlan | null>({
    planTitle: "PCOS & Hormonal Balance Routine",
    overview: "A nutrient-dense, low-GI meal and exercise routine using affordable local ingredients to improve insulin sensitivity, reduce inflammation, and boost energy.",
    dietPlan: {
      breakfast: "Sprouted Moong & Ragi Dosa / Cheela with mint coriander chutney and 1 cup herbal cinnamon tea.",
      lunch: "1 bowl Brown Rice / Jowar Roti with Palak Dal (spinach lentils), cucumber salad, and 1 glass fresh buttermilk (chaas).",
      eveningSnack: "Handful of roasted chana (chickpeas) with 1 teaspoon flaxseeds and 1 amla (Indian gooseberry) for Vitamin C.",
      dinner: "Methi (fenugreek) Dal khichdi with mixed vegetables (carrots, beans) and 1 bowl curd.",
      keyNutrientsFocus: ["Complex Fiber", "Iron & Vitamin C", "Omega-3 Fatty Acids", "Zinc"],
      affordableSuperfoods: ["Ragi (Finger Millet)", "Jaggery (Gud)", "Spinach / Moringa", "Amla", "Flaxseeds"]
    },
    exercisePlan: {
      recommendedExercises: [
        { name: "Brisk Walking", duration: "30 Mins Daily", benefits: "Helps lower blood sugar levels and improves insulin sensitivity." },
        { name: "Pelvic Strengthening Exercises", duration: "15 Mins", benefits: "Strengthens core and improves blood circulation to pelvic organs." }
      ],
      yogaPoses: ["Baddha Konasana (Butterfly Pose)", "Bhujangasana (Cobra Pose)", "Supta Baddha Konasana", "Anulom Vilom Pranayama"]
    },
    lifestyleTips: [
      "Drink at least 8-10 glasses of water daily.",
      "Get 7-8 hours of restful night sleep to stabilize cortisol.",
      "Avoid refined sugar and white bread; choose millets like ragi, bajra, and jowar."
    ]
  });

  const handleGenerate = async () => {
    setLoading(true);

    try {
      const response = await fetch('/api/generate-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lifeStage,
          healthGoal,
          dietPreference: dietPref,
          regionalCuisine,
          language: currentLanguage,
        }),
      });

      const data = await response.json();
      setPlan(data);
    } catch (err) {
      console.error('Plan generation error:', err);
      alert('Error generating plan. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Title Card */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-rose-900 text-white rounded-3xl p-6 sm:p-8 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
            <Utensils className="w-6 h-6 text-emerald-100" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">{t.wellnessTitle}</h2>
            <p className="text-xs sm:text-sm text-emerald-100 mt-1 max-w-xl">
              Nutrition, local superfoods & yoga routines tailored for Indian women's health needs.
            </p>
          </div>
        </div>
      </div>

      {/* Input Filters Grid */}
      <div className="bg-white rounded-3xl p-6 border border-rose-100 shadow-xs space-y-5">
        <h3 className="font-bold text-base text-slate-900 border-b border-rose-100 pb-2">
          Customize Your Wellness Profile
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Life Stage */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5">{t.lifeStage}</label>
            <select
              value={lifeStage}
              onChange={(e) => setLifeStage(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 font-medium focus:outline-none focus:border-rose-500"
              id="life-stage-select"
            >
              <option value="Regular Cycle">Regular Cycle (General Wellness)</option>
              <option value="PCOS / PCOD Management">PCOS / PCOD Care</option>
              <option value="Anemia & Low Hemoglobin">Anemia (Low Hb & Iron Deficiency)</option>
              <option value="Thyroid Support">Thyroid Care (Metabolism)</option>
              <option value="Pregnancy Trimester 1">Pregnancy - 1st Trimester</option>
              <option value="Pregnancy Trimester 2/3">Pregnancy - 2nd/3rd Trimester</option>
              <option value="Postpartum Recovery">Postpartum & Lactation</option>
              <option value="Perimenopause / Menopause">Menopause & Bone Health</option>
            </select>
          </div>

          {/* Health Goal */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5">{t.healthGoal}</label>
            <input
              type="text"
              value={healthGoal}
              onChange={(e) => setHealthGoal(e.target.value)}
              placeholder="e.g. Weight management, cramp reduction..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-rose-500"
            />
          </div>

          {/* Diet Preference */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5">{t.dietPref}</label>
            <select
              value={dietPref}
              onChange={(e) => setDietPref(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 font-medium focus:outline-none focus:border-rose-500"
              id="diet-pref-select"
            >
              <option value="Vegetarian">Vegetarian (शाकाहारी)</option>
              <option value="Non-Vegetarian">Non-Vegetarian (मांसाहारी)</option>
              <option value="Eggetarian">Eggetarian (अंडा/Egg)</option>
              <option value="Vegan">Vegan (Plant Based)</option>
            </select>
          </div>

          {/* Regional Cuisine */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5">{t.regionPref}</label>
            <select
              value={regionalCuisine}
              onChange={(e) => setRegionalCuisine(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 font-medium focus:outline-none focus:border-rose-500"
              id="region-pref-select"
            >
              <option value="South Indian">South Indian (दक्कन/दक्षिण)</option>
              <option value="North Indian">North Indian (उत्तर भारतीय)</option>
              <option value="East Indian">East Indian (पूर्व/बंगाल/ओडिशा)</option>
              <option value="West Indian">West Indian (महाराष्ट्र/गुजरात)</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading}
          id="generate-plan-btn"
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-rose-600 hover:brightness-110 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Generating Customized Plan with AI...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{t.generatePlanBtn}</span>
            </>
          )}
        </button>
      </div>

      {/* Plan Results Section */}
      {plan && (
        <div className="space-y-6 animate-fade-in">
          {/* Overview Banner */}
          <div className="bg-emerald-50 rounded-3xl p-6 border border-emerald-200 space-y-2">
            <div className="flex items-center gap-2 text-emerald-900 font-bold text-base">
              <Leaf className="w-5 h-5 text-emerald-600" />
              <span>{plan.planTitle}</span>
            </div>
            <p className="text-xs text-emerald-950 leading-relaxed">{plan.overview}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Diet Plan Column */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-rose-100 shadow-xs space-y-5">
              <div className="flex items-center gap-2 border-b border-rose-100 pb-3">
                <Utensils className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-base text-slate-900">Daily Diet & Superfood Chart</h3>
              </div>

              {/* Meals List */}
              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-2xl bg-amber-50/80 border border-amber-200">
                  <span className="font-bold text-amber-900 uppercase tracking-wider block mb-1">
                    🌅 Breakfast (प्रातःकाल आहार)
                  </span>
                  <p className="text-slate-800 font-medium">{plan.dietPlan.breakfast}</p>
                </div>

                <div className="p-3 rounded-2xl bg-emerald-50/80 border border-emerald-200">
                  <span className="font-bold text-emerald-900 uppercase tracking-wider block mb-1">
                    ☀️ Lunch (दोपहर का भोजन)
                  </span>
                  <p className="text-slate-800 font-medium">{plan.dietPlan.lunch}</p>
                </div>

                <div className="p-3 rounded-2xl bg-orange-50/80 border border-orange-200">
                  <span className="font-bold text-orange-900 uppercase tracking-wider block mb-1">
                    ☕ Evening Snack (सायंकालीन नाश्ता)
                  </span>
                  <p className="text-slate-800 font-medium">{plan.dietPlan.eveningSnack}</p>
                </div>

                <div className="p-3 rounded-2xl bg-indigo-50/80 border border-indigo-200">
                  <span className="font-bold text-indigo-900 uppercase tracking-wider block mb-1">
                    🌙 Dinner (रात्रि भोजन)
                  </span>
                  <p className="text-slate-800 font-medium">{plan.dietPlan.dinner}</p>
                </div>
              </div>

              {/* Affordable Superfoods */}
              <div className="pt-2">
                <span className="font-bold text-xs text-slate-900 block mb-2">
                  Key Budget-Friendly Superfoods Included:
                </span>
                <div className="flex flex-wrap gap-2">
                  {plan.dietPlan.affordableSuperfoods.map((food, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold"
                    >
                      ✓ {food}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Exercise & Lifestyle Column */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-rose-100 shadow-xs space-y-5">
              <div className="flex items-center gap-2 border-b border-rose-100 pb-3">
                <Dumbbell className="w-5 h-5 text-rose-600" />
                <h3 className="font-bold text-base text-slate-900">Exercise, Yoga & Lifestyle</h3>
              </div>

              {/* Exercise Routines */}
              <div className="space-y-3">
                {plan.exercisePlan.recommendedExercises.map((ex, i) => (
                  <div key={i} className="p-3.5 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-1">
                    <div className="flex items-center justify-between font-bold text-xs text-rose-950">
                      <span>{ex.name}</span>
                      <span className="text-[10px] bg-rose-200 px-2 py-0.5 rounded-full text-rose-800">
                        {ex.duration}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-700">{ex.benefits}</p>
                  </div>
                ))}
              </div>

              {/* Yoga Poses */}
              <div className="space-y-2">
                <span className="font-bold text-xs text-slate-900 block">Recommended Yoga Poses:</span>
                <div className="flex flex-wrap gap-1.5">
                  {plan.exercisePlan.yogaPoses.map((pose, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-xl bg-purple-50 text-purple-900 border border-purple-200 text-xs font-semibold">
                      🧘 {pose}
                    </span>
                  ))}
                </div>
              </div>

              {/* Lifestyle Tips */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                <span className="font-bold text-slate-900 block">Essential Habits:</span>
                <ul className="list-disc list-inside space-y-1 text-slate-700">
                  {plan.lifestyleTips.map((tip, i) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
