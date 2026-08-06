import { CycleCalculationResult, CyclePhase, CycleSettings } from '../types';

export function calculateCycleStats(settings: CycleSettings): CycleCalculationResult {
  const { lastPeriodDate, cycleLengthDays, periodDurationDays } = settings;
  const today = new Date();
  const lastPeriod = new Date(lastPeriodDate);

  // Calculate difference in days between today and last period start
  const diffTime = Math.abs(today.getTime() - lastPeriod.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  // Current cycle day (1-indexed)
  const currentCycleDay = (diffDays % cycleLengthDays) + 1;

  // Next period date
  const cyclesCompleted = Math.floor(diffDays / cycleLengthDays);
  const nextPeriod = new Date(lastPeriod);
  nextPeriod.setDate(lastPeriod.getDate() + (cyclesCompleted + 1) * cycleLengthDays);

  const daysUntilNextPeriod = Math.max(0, Math.ceil((nextPeriod.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));

  // Estimated Ovulation Date (typically 14 days before next period)
  const ovulation = new Date(nextPeriod);
  ovulation.setDate(nextPeriod.getDate() - 14);

  // Fertile Window: 5 days before ovulation to 1 day after ovulation
  const fertileStart = new Date(ovulation);
  fertileStart.setDate(ovulation.getDate() - 5);

  const fertileEnd = new Date(ovulation);
  fertileEnd.setDate(ovulation.getDate() + 1);

  // Determine current phase
  let currentPhase: CyclePhase = 'Follicular';
  let phaseDescription = '';
  let phaseDietTip = '';
  let phaseExerciseTip = '';

  if (currentCycleDay <= periodDurationDays) {
    currentPhase = 'Menstrual';
    phaseDescription = 'During menstruation, your estrogen and progesterone levels are low. Focus on resting, warm hydration, and iron replenishment.';
    phaseDietTip = 'Iron-rich foods (spinach, jaggery/gud, lentils, beetroot, dates, amla for Vitamin C), warm soups, herbal ginger tea, and plenty of water.';
    phaseExerciseTip = 'Light stretching, gentle pelvic yoga poses (Cat-Cow, Child’s Pose, Supta Baddha Konasana), and short slow walks. Avoid strenuous lifting.';
  } else if (currentCycleDay < (cycleLengthDays - 14) - 2) {
    currentPhase = 'Follicular';
    phaseDescription = 'Estrogen rises as your body prepares an egg. Energy and mood naturally increase during this phase.';
    phaseDietTip = 'Fresh vibrant vegetables, fermented foods (curd, buttermilk), sprouted moong, protein-rich pulses, nuts, and flaxseeds.';
    phaseExerciseTip = 'Great time for moderate cardio, brisk walking, light strength exercises, dynamic yoga, and active daily routines.';
  } else if (Math.abs(currentCycleDay - (cycleLengthDays - 14)) <= 2) {
    currentPhase = 'Ovulatory';
    phaseDescription = 'Peak estrogen and LH surge. Ovulation occurs. High energy, clear skin, and maximum fertility window.';
    phaseDietTip = 'Antioxidant-rich berries, pomegranates, green leafy vegetables, hydrating fruits (watermelon, cucumber), seeds (chia, sesame), and light grains.';
    phaseExerciseTip = 'Peak energy! High-intensity workouts, aerobics, dancing, jogging, or challenging yoga flows.';
  } else {
    currentPhase = 'Luteal';
    phaseDescription = 'Progesterone increases. As period approaches, you may notice PMS signs like bloating, mild cramps, or mood changes.';
    phaseDietTip = 'Magnesium & B6 rich foods (banana, dark leafy greens, pumpkin seeds, roasted chana, millets/ragi), warm home-cooked meals. Reduce salt & caffeine.';
    phaseExerciseTip = 'Moderate to low intensity exercises, pilates, calming pranayama (Anulom Vilom, Bhramari), and restorative walking.';
  }

  const formatDateStr = (d: Date) => d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  return {
    currentPhase,
    currentCycleDay,
    daysUntilNextPeriod,
    nextPeriodDate: formatDateStr(nextPeriod),
    ovulationDate: formatDateStr(ovulation),
    fertileWindowStart: formatDateStr(fertileStart),
    fertileWindowEnd: formatDateStr(fertileEnd),
    phaseDescription,
    phaseDietTip,
    phaseExerciseTip
  };
}
