import { LanguageCode, LanguageOption } from './types';

export const LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ਿଆ' }
];

export interface TranslationDict {
  appName: string;
  tagline: string;
  emergencySos: string;
  tabCycle: string;
  tabAiChat: string;
  tabSymptomCheck: string;
  tabWellness: string;
  tabFacilities: string;
  disclaimer: string;
  
  // Cycle tracker
  currentPhase: string;
  cycleDay: string;
  nextPeriodIn: string;
  days: string;
  logToday: string;
  fertileWindow: string;
  ovulationDate: string;
  lastPeriodDate: string;
  cycleLength: string;
  periodDuration: string;
  saveSettings: string;
  symptoms: string;
  flow: string;
  mood: string;
  phaseDietTipTitle: string;
  phaseExerciseTipTitle: string;

  // AI Assistant
  aiChatPlaceholder: string;
  send: string;
  listening: string;
  voiceInput: string;
  listenAudio: string;
  quickQuestions: string;

  // Symptom Checker
  warningCheckTitle: string;
  warningCheckSubtitle: string;
  checkNow: string;
  riskUrgent: string;
  riskDoctor: string;
  riskSelfCare: string;

  // Wellness
  wellnessTitle: string;
  lifeStage: string;
  healthGoal: string;
  dietPref: string;
  regionPref: string;
  generatePlanBtn: string;

  // Facilities & Schemes
  facilityTitle: string;
  searchLocation: string;
  searchBtn: string;
  govtSchemesTitle: string;
  nearbyHospitalsTitle: string;
}

export const TRANSLATIONS: Record<LanguageCode, TranslationDict> = {
  en: {
    appName: "SheCare AI",
    tagline: "Women's Health & Wellness Companion",
    emergencySos: "Emergency Helpline 108 / 181",
    tabCycle: "Cycle Tracker",
    tabAiChat: "AI Health Chat",
    tabSymptomCheck: "Warning Signs Check",
    tabWellness: "Diet & Exercise",
    tabFacilities: "Hospitals & Schemes",
    disclaimer: "Disclaimer: SheCare AI provides educational wellness guidance only and is not a substitute for professional medical advice. Always consult a qualified doctor.",
    
    currentPhase: "Current Phase",
    cycleDay: "Cycle Day",
    nextPeriodIn: "Next Period In",
    days: "Days",
    logToday: "Log Today's Symptoms",
    fertileWindow: "Fertile Window",
    ovulationDate: "Estimated Ovulation",
    lastPeriodDate: "Start Date of Last Period",
    cycleLength: "Cycle Length (Days)",
    periodDuration: "Period Duration (Days)",
    saveSettings: "Update Cycle Details",
    symptoms: "Symptoms",
    flow: "Flow Level",
    mood: "Mood",
    phaseDietTipTitle: "Recommended Nutrition for this Phase",
    phaseExerciseTipTitle: "Recommended Exercise & Activity",

    aiChatPlaceholder: "Ask anything about your health, period, pregnancy, or nutrition in simple words...",
    send: "Send",
    listening: "Listening...",
    voiceInput: "Voice Search",
    listenAudio: "Read Out Advice",
    quickQuestions: "Frequently Asked Health Questions:",

    warningCheckTitle: "Symptom & Emergency Warning Checker",
    warningCheckSubtitle: "Identify critical warning signs early and know when to seek immediate medical attention.",
    checkNow: "Evaluate Symptoms Now",
    riskUrgent: "URGENT MEDICAL ATTENTION RECOMMENDED",
    riskDoctor: "DOCTOR CONSULTATION RECOMMENDED",
    riskSelfCare: "MILD SYMPTOMS - SELF CARE GUIDANCE",

    wellnessTitle: "Personalized Diet & Exercise Planner",
    lifeStage: "Life Stage / Condition",
    healthGoal: "Primary Goal",
    dietPref: "Dietary Preference",
    regionPref: "Regional Indian Cuisine",
    generatePlanBtn: "Generate Customized Plan",

    facilityTitle: "Find Nearby Health Centers & Government Schemes",
    searchLocation: "Enter District, Pincode or City in India...",
    searchBtn: "Find Centers & Schemes",
    govtSchemesTitle: "Government Health Schemes for Women",
    nearbyHospitalsTitle: "Nearby Primary Health Centers & Hospitals"
  },
  hi: {
    appName: "शीकेयर एआई (SheCare AI)",
    tagline: "महिला स्वास्थ्य और कल्याण सहायक",
    emergencySos: "आपत्कालीन हेल्पलाइन 108 / 181",
    tabCycle: "पीरियड ट्रैकर",
    tabAiChat: "एआई स्वास्थ्य चैट",
    tabSymptomCheck: "गंभीर लक्षण जांच",
    tabWellness: "आहार और व्यायाम",
    tabFacilities: "अस्पताल और योजनाएं",
    disclaimer: "अस्वीकरण: शीकेयर एआई केवल स्वास्थ्य शिक्षा प्रदान करता है। यह डॉक्टरी सलाह का विकल्प नहीं है। गंभीर स्थिति में तुरंत डॉक्टर से संपर्क करें।",

    currentPhase: "वर्तमान चरण",
    cycleDay: "चक्र का दिन",
    nextPeriodIn: "अगला पीरियड",
    days: "दिन में",
    logToday: "आज के लक्षण दर्ज करें",
    fertileWindow: "गर्भधारण का समय",
    ovulationDate: "ओव्यूलेशन की तारीख",
    lastPeriodDate: "पिछली अवधि की पहली तारीख",
    cycleLength: "चक्र की लंबाई (दिन)",
    periodDuration: "पीरियड के दिन",
    saveSettings: "जानकारी अपडेट करें",
    symptoms: "लक्षण",
    flow: "रक्तस्राव का स्तर",
    mood: "मनोदशा (मूड)",
    phaseDietTipTitle: "इस चरण के लिए आहार सुझाव",
    phaseExerciseTipTitle: "उपयुक्त व्यायाम और योग",

    aiChatPlaceholder: "स्वास्थ्य, पीरियड, गर्भावस्था या पोषण के बारे में सरल भाषा में पूछें...",
    send: "भेजें",
    listening: "सुन रहा है...",
    voiceInput: "बोलकर पूछें",
    listenAudio: "उत्तर सुनें",
    quickQuestions: "अक्सर पूछे जाने वाले सवाल:",

    warningCheckTitle: "आपातकालीन चेतावनी और लक्षण जांच",
    warningCheckSubtitle: "खतरे के संकेतों की तुरंत पहचान करें और जानें कि डॉक्टर के पास कब जाना है।",
    checkNow: "लक्षणों का मूल्यांकन करें",
    riskUrgent: "तत्काल चिकित्सा सहायता की आवश्यकता है",
    riskDoctor: "डॉक्टर से परामर्श की सलाह दी जाती है",
    riskSelfCare: "सामान्य लक्षण - घरेलू देखभाल",

    wellnessTitle: "व्यक्तिगत आहार और व्यायाम योजना",
    lifeStage: "जीवन का चरण / स्थिति",
    healthGoal: "मुख्य लक्ष्य",
    dietPref: "खान-पान की पसंद",
    regionPref: "क्षेत्रीय भारतीय व्यंजन",
    generatePlanBtn: "योजना तैयार करें",

    facilityTitle: "निकटतम स्वास्थ्य केंद्र और सरकारी योजनाएं",
    searchLocation: "अपना जिला, पिनकोड या शहर दर्ज करें...",
    searchBtn: "खोजें",
    govtSchemesTitle: "महिलाओं के लिए प्रमुख सरकारी स्वास्थ्य योजनाएं",
    nearbyHospitalsTitle: "निकटतम प्राथमिक स्वास्थ्य केंद्र और अस्पताल"
  },
  te: {
    appName: "షీకేర్ AI (SheCare AI)",
    tagline: "మహిళల ఆరోగ్యం & సంక్షేమ సహాయకుడు",
    emergencySos: "అత్యవసర హెల్ప్‌లైన్ 108 / 181",
    tabCycle: "పీరియడ్ ట్రాకర్",
    tabAiChat: "AI హెల్త్ ఛాట్",
    tabSymptomCheck: "ప్రమాద సంకేతాల తనిఖీ",
    tabWellness: "ఆహారం & వ్యాయామం",
    tabFacilities: "ఆసుపత్రులు & పథకాలు",
    disclaimer: "గమనిక: ఈ అప్లికేషన్ సాధారణ ఆరోగ్య సమాచారాన్ని మాత్రమే అందిస్తుంది. ఇది వైద్య సలహాకు ప్రత్యామ్నాయం కాదు. వైద్యుడిని సంప్రదించండి.",

    currentPhase: "ప్రస్తుత దశ",
    cycleDay: "సైకిల్ రోజు",
    nextPeriodIn: "తదుపరి పీరియడ్",
    days: "రోజులలో",
    logToday: "నేటి లక్షణాలు నమోదు చేయండి",
    fertileWindow: "సంతానోత్పత్తి సమయం",
    ovulationDate: "అంచనా అండ విడుదల (Ovulation)",
    lastPeriodDate: "చివరి పీరియడ్ ప్రారంభ తేది",
    cycleLength: "సైకిల్ నిడివి (రోజులు)",
    periodDuration: "పీరియడ్ రోజుల సంఖ్య",
    saveSettings: "వివరాలు సేవ్ చేయండి",
    symptoms: "లక్షణాలు",
    flow: "రక్తస్రావం స్థాయి",
    mood: "మూడ్",
    phaseDietTipTitle: "ఈ దశలో తీసుకోవాల్సిన ఆహారం",
    phaseExerciseTipTitle: "సూచించిన వ్యాయామాలు & యోగా",

    aiChatPlaceholder: "ఆరోగ్యం, పీరియడ్స్, గర్భధారణ లేదా పోషకాహారం గురించి ప్రశ్నించండి...",
    send: "పంపు",
    listening: "వింటోంది...",
    voiceInput: "వాయిస్ ద్వారా అడగండి",
    listenAudio: "సమాధానం వినండి",
    quickQuestions: "తరచుగా అడిగే ప్రశ్నలు:",

    warningCheckTitle: "అత్యవసర ప్రమాద సంకేతాల తనిఖీ",
    warningCheckSubtitle: "ప్రమాదకర లక్షణాలను వెంటనే గుర్తించి, వైద్య సహాయం పొందండి.",
    checkNow: "లక్షణాలను తనిఖీ చేయండి",
    riskUrgent: "వెంటనే అత్యవసర వైద్య సహాయం తీసుకోండి",
    riskDoctor: "వైద్యుడిని సంప్రదించడం మంచిది",
    riskSelfCare: "సాధారణ లక్షణాలు - ఇంటి వద్ద జాగ్రత్తలు",

    wellnessTitle: "ఆహారం & వ్యాయామ ప్రణాళిక",
    lifeStage: "జీవిత దశ / పరిస్థితి",
    healthGoal: "ముఖ్య లక్ష్యం",
    dietPref: "ఆహార అలవాట్లు",
    regionPref: "ప్రాంతీయ వంటకాలు",
    generatePlanBtn: "ప్లాన్ సిద్ధం చేయి",

    facilityTitle: "సమీప ఆరోగ్య కేంద్రాలు & ప్రభుత్వ పథకాలు",
    searchLocation: "మీ జిల్లా, పిన్‌కోడ్ లేదా నగరాన్ని టైప్ చేయండి...",
    searchBtn: "వెతకండి",
    govtSchemesTitle: "మహిళల కోసం ప్రభుత్వ ఆరోగ్య పథకాలు",
    nearbyHospitalsTitle: "సమీప ప్రాథమిక ఆరోగ్య కేంద్రాలు (PHC) & ఆసుపత్రులు"
  },
  ta: {
    appName: "ஷீகரே AI (SheCare AI)",
    tagline: "பெண்கள் ஆரோக்கியம் மற்றும் நலன் உதவி",
    emergencySos: "அவசர உதவி எண் 108 / 181",
    tabCycle: "மாதவிடாய் கண்காணிப்பு",
    tabAiChat: "AI சுகாதார அரட்டை",
    tabSymptomCheck: "அவசர அறிகுறி சோதனை",
    tabWellness: "உணவு & உடற்பயிற்சி",
    tabFacilities: "மருத்துவமனைகள் & திட்டங்கள்",
    disclaimer: "பொறுப்புத் துறப்பு: இது பொதுவான சுகாதார தகவல்களை மட்டுமே வழங்குகிறது. மருத்துவ ஆலோசனைகளுக்கு மருத்துவரை அணுகவும்.",

    currentPhase: "தற்போதைய நிலை",
    cycleDay: "சுழற்சி நாள்",
    nextPeriodIn: "அடுத்த மாதவிடாய்",
    days: "நாட்களில்",
    logToday: "இன்றைய அறிகுறிகளைப் பதிவு செய்க",
    fertileWindow: "கருவுறுதல் காலம்",
    ovulationDate: "கருமுட்டை வெளிவரும் நாள்",
    lastPeriodDate: "கடைசி மாதவிடாய் தொடக்க நாள்",
    cycleLength: "சுழற்சி காலம் (நாட்கள்)",
    periodDuration: "மாதவிடாய் நாட்கள்",
    saveSettings: "விவரங்களைச் சேமிக்கவும்",
    symptoms: "அறிகுறிகள்",
    flow: "ரத்தப்போக்கு அளவு",
    mood: "மனநிலை",
    phaseDietTipTitle: "இந்த நிலைக்கான உணவுப் பரிந்துரை",
    phaseExerciseTipTitle: "பரிந்துரைக்கப்பட்ட உடற்பயிற்சிகள்",

    aiChatPlaceholder: "உங்கள் ஆரோக்கியம், மாதவிடாய் அல்லது கர்ப்பம் குறித்து எளிமையாகக் கேளுங்கள்...",
    send: "அனுப்பு",
    listening: "கேட்கிறது...",
    voiceInput: "குரல் மூலம் கேட்க",
    listenAudio: "பதிலைக் கேட்க",
    quickQuestions: "அடிக்கடி கேட்கப்படும் கேள்விகள்:",

    warningCheckTitle: "அவசர அறிகுறி பரிசோதனை",
    warningCheckSubtitle: "ஆபத்தான அறிகுறிகளை முன்கூட்டியே கண்டறிந்து மருத்துவ உதவியைப் பெறுங்கள்.",
    checkNow: "அறிகுறிகளைச் சோதிக்கவும்",
    riskUrgent: "உடனடி அவசர மருத்துவ உதவி தேவை",
    riskDoctor: "மருத்துவர் ஆலோசனையைப் பெறவும்",
    riskSelfCare: "சாதாரண அறிகுறிகள் - வீட்டுப் பராமரிப்பு",

    wellnessTitle: "உணவு மற்றும் உடற்பயிற்சி திட்டம்",
    lifeStage: "வாழ்க்கை நிலை / நிலைமை",
    healthGoal: "முக்கிய இலக்கு",
    dietPref: "உணவு விருப்பம்",
    regionPref: "பிராந்திய உணவு முறை",
    generatePlanBtn: "திட்டத்தை உருவாக்கவும்",

    facilityTitle: "அருகிலுள்ள அரசு மருத்துவமனைகள் & திட்டங்கள்",
    searchLocation: "மாவட்ட பெயர் அல்லது பின்கோடு உள்ளிடவும்...",
    searchBtn: "தேடுக",
    govtSchemesTitle: "பெண்களுக்கான அரசு சுகாதாரத் திட்டங்கள்",
    nearbyHospitalsTitle: "அருகிலுள்ள அரசு ஆரம்ப சுகாதார நிலையங்கள் (PHC)"
  },
  bn: {
    appName: "শিকেয়ার এআই (SheCare AI)",
    tagline: "নারী স্বাস্থ্য ও কল্যাণ সহকারী",
    emergencySos: "জরুরি হেল্পলাইন ১০৮ / ১৮১",
    tabCycle: "পিরিয়ড ট্র্যাকার",
    tabAiChat: "এআই হেলথ চ্যাট",
    tabSymptomCheck: "ঝুঁকি লক্ষণ পরীক্ষা",
    tabWellness: "ডায়েট ও ব্যায়াম",
    tabFacilities: "হাসপাতাল ও প্রকল্প",
    disclaimer: "দাবি ত্যাগ: শিকেয়ার এআই কেবল স্বাস্থ্য সচেতনতামূলক তথ্য প্রদান করে। চিকিৎসার জন্য চিকিৎসকের পরামর্শ নিন।",

    currentPhase: "বর্তমান পর্যায়",
    cycleDay: "সাইকেল দিন",
    nextPeriodIn: "পরবর্তী পিরিয়ড",
    days: "দিনের মধ্যে",
    logToday: "আজকের লক্ষণ লিখুন",
    fertileWindow: "গর্ভধারণের উপযুক্ত সময়",
    ovulationDate: "আনুমানিক ডিম্বস্ফোটন",
    lastPeriodDate: "শেষ পিরিয়ডের শুরুর তারিখ",
    cycleLength: "সাইকেলের দৈর্ঘ্য (দিন)",
    periodDuration: "পিরিয়ডের স্থায়িত্ব (দিন)",
    saveSettings: "তথ্য সংরক্ষণ করুন",
    symptoms: "লক্ষণসমূহ",
    flow: "রক্তস্রাবের পরিমাণ",
    mood: "মন মেজাজ",
    phaseDietTipTitle: "এই পর্যায়ের খাদ্য তালিকা",
    phaseExerciseTipTitle: "উপযুক্ত ব্যায়াম ও যোগাসন",

    aiChatPlaceholder: "স্বাস্থ্য, পিরিয়ড বা গর্ভাবস্থা নিয়ে সহজ ভাষায় প্রশ্ন করুন...",
    send: "পাঠান",
    listening: "শুনছে...",
    voiceInput: "ভয়েস অনুসন্ধান",
    listenAudio: "উত্তর শুনুন",
    quickQuestions: "সাধারণ প্রশ্নাবলী:",

    warningCheckTitle: "জরুরি লক্ষণ ও ঝুঁকি পরীক্ষা",
    warningCheckSubtitle: "বিপদচিহ্ন সময়মতো শনাক্ত করুন এবং ডাক্তারের পরামর্শ নিন।",
    checkNow: "লক্ষণ মূল্যায়ন করুন",
    riskUrgent: "অবিলম্বে জরুরি চিকিৎসা সহায়তা প্রয়োজন",
    riskDoctor: "ডাক্তারের পরামর্শ নেওয়ার সুপারিশ করা হচ্ছে",
    riskSelfCare: "সাধারণ লক্ষণ - পারিবারিক যত্ন",

    wellnessTitle: "ব্যক্তিগত ডায়েট ও ব্যায়াম পরিকল্পনা",
    lifeStage: "জীবনের পর্যায় / অবস্থা",
    healthGoal: "মূল লক্ষ্য",
    dietPref: "খাবারের পছন্দ",
    regionPref: "আঞ্চলিক খাবার",
    generatePlanBtn: "প্ল্যান তৈরি করুন",

    facilityTitle: "নিকটস্থ স্বাস্থ্যকেন্দ্র ও সরকারি সুবিধা",
    searchLocation: "আপনার জিলা, পিনকোড বা শহর লিখুন...",
    searchBtn: "খুঁজুন",
    govtSchemesTitle: "নারীদের জন্য সরকারি স্বাস্থ্য প্রকল্প",
    nearbyHospitalsTitle: "নিকটস্থ প্রাথমিক স্বাস্থ্যকেন্দ্র ও হাসপাতাল"
  },
  mr: {
    appName: "शीकेअर एआय (SheCare AI)",
    tagline: "महिला आरोग्य आणि कल्याण सहाय्यक",
    emergencySos: "आणीबाणी हेल्पलाइन १०८ / १८१",
    tabCycle: "मासिक पाळी ट्रॅकर",
    tabAiChat: "एआय आरोग्य चॅट",
    tabSymptomCheck: "धोक्याची लक्षणे तपासा",
    tabWellness: "आहार आणि व्यायाम",
    tabFacilities: "रुग्णालये आणि योजना",
    disclaimer: "टीप: ही माहिती केवळ मार्गदर्शनासाठी आहे. वैद्यकीय सल्ल्यासाठी डॉक्टरांशी संपर्क साधा.",

    currentPhase: "सध्याचा टप्पा",
    cycleDay: "चक्राचा दिवस",
    nextPeriodIn: "पुढील पाळी",
    days: "दिवसांत",
    logToday: "आजची लक्षणे नोंदवा",
    fertileWindow: "गर्भधारणेचा काळ",
    ovulationDate: "ओव्ह्युलेशनची तारीख",
    lastPeriodDate: "शेवटच्या पाळीची सुरुवात",
    cycleLength: "चक्राचा कालावधी (दिवस)",
    periodDuration: "पाळीचे दिवस",
    saveSettings: "माहिती जतन करा",
    symptoms: "लक्षणे",
    flow: "रक्तस्त्राव प्रमाण",
    mood: "मनःस्थिती (मूड)",
    phaseDietTipTitle: "या टप्प्यासाठी पोषण आहार",
    phaseExerciseTipTitle: "योग्य व्यायाम व योगासने",

    aiChatPlaceholder: "आरोग्य, मासिक पाळी किंवा गर्भावस्थेबद्दल सोप्या भाषेत विचारा...",
    send: "पाठवा",
    listening: "ऐकत आहे...",
    voiceInput: "बोलून विचारा",
    listenAudio: "उत्तर ऐका",
    quickQuestions: "सतत विचारले जाणारे प्रश्न:",

    warningCheckTitle: "धोक्याची लक्षणे व आणीबाणी तपासणी",
    warningCheckSubtitle: "धोक्याची लक्षणे ओळखा आणि त्वरित वैद्यकीय मदत घ्या.",
    checkNow: "लक्षणे तपासा",
    riskUrgent: "तात्काळ वैद्यकीय मदतीची गरज आहे",
    riskDoctor: "डॉक्टरांचा सल्ला घेणे आवश्यक आहे",
    riskSelfCare: "सामान्य लक्षणे - घरगुती काळजी",

    wellnessTitle: "आहार आणि व्यायाम प्लॅन",
    lifeStage: "आयुष्याचा टप्पा / स्थिती",
    healthGoal: "मुख्य ध्येय",
    dietPref: "आहार पद्धत",
    regionPref: "प्रादेशिक भारतीय जेवण",
    generatePlanBtn: "प्लॅन तयार करा",

    facilityTitle: "जवळची आरोग्य केंद्रे आणि सरकारी योजना",
    searchLocation: "तुमचा जिल्हा, पिनकोड किंवा शहर टाका...",
    searchBtn: "शोधा",
    govtSchemesTitle: "महिलांसाठी सरकारी आरोग्य योजना",
    nearbyHospitalsTitle: "जवळची प्राथमिक आरोग्य केंद्रे (PHC) व रुग्णालये"
  },
  gu: {
    appName: "શીકેર AI (SheCare AI)",
    tagline: "મહિલા સ્વાસ્થ્ય અને કલ્યાણ સહાયક",
    emergencySos: "ઇમરજન્સી હેલ્પલાઇન 108 / 181",
    tabCycle: "પીરિયડ ટ્રેકર",
    tabAiChat: "AI હેલ્થ ચેટ",
    tabSymptomCheck: "ગંભીર લક્ષણ તપાસ",
    tabWellness: "આહાર અને કસરત",
    tabFacilities: "હોસ્પિટલ અને યોજનાઓ",
    disclaimer: "અસ્વીકરણ: આ એપ્લિકેશન માત્ર સામાન્ય માહિતી પૂરી પાડે છે. ડોક્ટરની સલાહ જરૂર લો.",

    currentPhase: "હાલનો તબક્કો",
    cycleDay: "ચક્રનો દિવસ",
    nextPeriodIn: "આગામી પીરિયડ",
    days: "દિવસમાં",
    logToday: "આજના લક્ષણો નોંધો",
    fertileWindow: "ગર્ભધારણનો સમય",
    ovulationDate: "ઓવ્યુલેશનની તારીખ",
    lastPeriodDate: "છેલ્લા પીરિયડની શરૂઆતની તારીખ",
    cycleLength: "ચક્રની લંબાઈ (દિવસ)",
    periodDuration: "પીરિયડના દિવસો",
    saveSettings: "માહિતી સેવ કરો",
    symptoms: "લક્ષણો",
    flow: "રક્તસ્રાવનું પ્રમાણ",
    mood: "મૂડ",
    phaseDietTipTitle: "આ તબક્કા માટે ખોરાકની સલાહ",
    phaseExerciseTipTitle: "યોગ્ય કસરત અને યોગા",

    aiChatPlaceholder: "તમારા સ્વાસ્થ્ય કે પીરિયડ્સ વિશે સરળ ભાષામાં પૂછો...",
    send: "મોકલો",
    listening: "સાંભળી રહ્યું છે...",
    voiceInput: "બોલીને પૂછો",
    listenAudio: "જવાબ સાંભળો",
    quickQuestions: "વારંવાર પૂછાતા પ્રશ્નો:",

    warningCheckTitle: "ઇમરજન્સી અને ગંભીર લક્ષણ તપાસ",
    warningCheckSubtitle: "ચેતવણીના સંકેતો ઓળખો અને તરત જ ડોક્ટરની સલાહ લો.",
    checkNow: "લક્ષણો ચકાસો",
    riskUrgent: "તાત્કાલિક તબીબી સારવારની જરૂર છે",
    riskDoctor: "ડોક્ટરની સલાહ લેવાની ભલામણ કરવામાં આવે છે",
    riskSelfCare: "સામાન્ય લક્ષણો - ઘરગથ્થુ સંભાળ",

    wellnessTitle: "વ્યક્તિગત આહાર અને કસરત પ્લાન",
    lifeStage: "જીવનનો તબક્કો / સ્થિતિ",
    healthGoal: "મુખ્ય ધ્યેય",
    dietPref: "ખોરાકની પસંદગી",
    regionPref: "પ્રાદેશિક ભારતીય વાનગીઓ",
    generatePlanBtn: "પ્લાન બનાવો",

    facilityTitle: "નજીકના આરોગ્ય કેન્દ્રો અને સરકારી યોજનાઓ",
    searchLocation: "તમારો જિલ્લો, પિનકોડ અથવા શહેર લખો...",
    searchBtn: "શોધો",
    govtSchemesTitle: "મહિલાઓ માટે સરકારી આરોગ્ય યોજનાઓ",
    nearbyHospitalsTitle: "નજીકના પ્રાથમિક આરોગ્ય કેન્દ્રો (PHC) અને હોસ્પિટલો"
  },
  kn: {
    appName: "ಶೀಕೇರ್ AI (SheCare AI)",
    tagline: "ಮಹಿಳೆಯರ ಆರೋಗ್ಯ ಮತ್ತು ಕ್ಷೇಮ ಸಹಾಯಕ",
    emergencySos: "ತುರ್ತು ಸಹಾಯವಾಣಿ 108 / 181",
    tabCycle: "ಋತುಚಕ್ರ ಟ್ರ್ಯಾಕರ್",
    tabAiChat: "AI ಹೆಲ್ತ್ ಚಾಟ್",
    tabSymptomCheck: "ಅಪಾಯ ಲಕ್ಷಣಗಳ ಪರಿಶೀಲನೆ",
    tabWellness: "ಆಹಾರ ಮತ್ತು ವ್ಯಾಯಾಮ",
    tabFacilities: "ಆಸ್ಪತ್ರೆಗಳು & ಯೋಜನೆಗಳು",
    disclaimer: "ಗಮನಿಸಿ: ಈ ಮಾಹಿತಿಯು ಜಾಗೃತಿಗಾಗಿ ಮಾತ್ರ. ವೈದ್ಯಕೀಯ ಚಿಕಿತ್ಸೆಗೆ ವೈದ್ಯರನ್ನು ಸಂಪರ್ಕಿಸಿ.",

    currentPhase: "ಪ್ರಸ್ತುತ ಹಂತ",
    cycleDay: "ಚಕ್ರದ ದಿನ",
    nextPeriodIn: "ಮುಂದಿನ ಋತುಚಕ್ರ",
    days: "ದಿನಗಳಲ್ಲಿ",
    logToday: "ಇಂದಿನ ಲಕ್ಷಣಗಳನ್ನು ನಮೂದಿಸಿ",
    fertileWindow: "ಫಲವತ್ತತೆಯ ಸಮಯ",
    ovulationDate: "ಅಂಡೋತ್ಪತ್ತಿ ದಿನಾಂಕ (Ovulation)",
    lastPeriodDate: "ಕೊನೆಯ ಋತುಚಕ್ರದ ಮೊದಲ ದಿನ",
    cycleLength: "ಚಕ್ರದ ಅವಧಿ (ದಿನಗಳು)",
    periodDuration: "ಋತುಚಕ್ರದ ದಿನಗಳು",
    saveSettings: "ಮಾಹಿತಿ ಉಳಿಸಿ",
    symptoms: "ಲಕ್ಷಣಗಳು",
    flow: "ರಕ್ತಸ್ರಾವದ ಪ್ರಮಾಣ",
    mood: "ಮನಸ್ಥಿತಿ (ಮೂಡ್)",
    phaseDietTipTitle: "ಈ ಹಂತಕ್ಕೆ ಸೂಕ್ತವಾದ ಪೌಷ್ಟಿಕ ಆಹಾರ",
    phaseExerciseTipTitle: "ಸೂಕ್ತ ವ್ಯಾಯಾಮ ಮತ್ತು ಯೋಗ",

    aiChatPlaceholder: "ಆರೋಗ್ಯ, ಋತುಚಕ್ರ ಅಥವಾ ಗರ್ಭಧಾರಣೆಯ ಬಗ್ಗೆ ಸರಳವಾಗಿ ಕೇಳಿ...",
    send: "ಕಳುಹಿಸಿ",
    listening: "ಆಲಿಸುತ್ತಿದೆ...",
    voiceInput: "ಧ್ವನಿ ಮೂಲಕ ಕೇಳಿ",
    listenAudio: "ಉತ್ತರ ಆಲಿಸಿ",
    quickQuestions: "ಪದೇ ಪದೇ ಕೇಳಲಾಗುವ ಪ್ರಶ್ನೆಗಳು:",

    warningCheckTitle: "ತುರ್ತು ಅಪಾಯದ ಲಕ್ಷಣಗಳ ತಪಾಸಣೆ",
    warningCheckSubtitle: "ಅಪಾಯದ ಲಕ್ಷಣಗಳನ್ನು ತಕ್ಷಣವೇ ಗುರುತಿಸಿ ಸೂಕ್ತ ವೈದ್ಯಕೀಯ ನೆರವು ಪಡೆಯಿರಿ.",
    checkNow: "ಲಕ್ಷಣ ಪರಿಶೀಲಿಸಿ",
    riskUrgent: "ತಕ್ಷಣದ ತುರ್ತು ವೈದ್ಯಕೀಯ ಚಿಕಿತ್ಸೆ ಅಗತ್ಯವಿದೆ",
    riskDoctor: "ವೈದ್ಯರ ಸಲಹೆ ಪಡೆಯುವುದು ಸೂಕ್ತ",
    riskSelfCare: "ಸಾಮಾನ್ಯ ಲಕ್ಷಣಗಳು - ಗೃಹ ಆರೈಕೆ",

    wellnessTitle: "ಆಹಾರ ಮತ್ತು ವ್ಯಾಯಾಮ ಯೋಜನೆ",
    lifeStage: "ಜೀವನದ ಹಂತ / ಸ್ಥಿತಿ",
    healthGoal: "ಮುಖ್ಯ ಗುರಿ",
    dietPref: "ಆಹಾರ ಪದ್ಧತಿ",
    regionPref: "ಪ್ರಾದೇಶಿಕ ಆಹಾರ ಶೈಲಿ",
    generatePlanBtn: "ಯೋಜನೆ ರೂಪಿಸಿ",

    facilityTitle: "ಸಮೀಪದ ಆರೋಗ್ಯ ಕೇಂದ್ರಗಳು ಮತ್ತು ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು",
    searchLocation: "ನಿಮ್ಮ ಜಿಲ್ಲೆ, ಪಿನ್‌ಕೋಡ್ ಅಥವಾ ನಗರ ನಮೂದಿಸಿ...",
    searchBtn: "ಹುಡುಕಿ",
    govtSchemesTitle: "ಮಹಿಳೆಯರಿಗಾಗಿ ಸರ್ಕಾರಿ ಆರೋಗ್ಯ ಯೋಜನೆಗಳು",
    nearbyHospitalsTitle: "ಸಮೀಪದ ಪ್ರಾಥಮಿಕ ಆರೋಗ್ಯ ಕೇಂದ್ರಗಳು (PHC) & ಆಸ್ಪತ್ರೆಗಳು"
  },
  ml: {
    appName: "ഷീകെയർ AI (SheCare AI)",
    tagline: "സ്ത്രീകളുടെ ആരോഗ്യ സഹായി",
    emergencySos: "അടിയന്തര ഹെൽപ്പ് ലൈൻ 108 / 181",
    tabCycle: "ആർത്തവ ട്രാക്കർ",
    tabAiChat: "AI ഹെൽത്ത് ചാറ്റ്",
    tabSymptomCheck: "അപകട ലക്ഷണ പരിശോധന",
    tabWellness: "ഭക്ഷണവും വ്യായാമവും",
    tabFacilities: "ആശുപത്രികളും പദ്ധതികളും",
    disclaimer: "ശ്രദ്ധിക്കുക: ഇത് പൊതുവായ വിവരങ്ങൾ മാത്രമാണ് നൽകുന്നത്. ആരോഗ്യപ്രശ്നങ്ങൾക്ക് ഡോക്ടറെ കാണുക.",

    currentPhase: "നിലവിലെ ഘട്ടം",
    cycleDay: "ചക്രത്തിലെ ദിവസം",
    nextPeriodIn: "അടുത്ത ആർത്തവം",
    days: "ദിവസത്തിനുള്ളിൽ",
    logToday: "ഇന്നത്തെ ലക്ഷണങ്ങൾ രേഖപ്പെടുത്തുക",
    fertileWindow: "ഗർഭധാരണ സമയം",
    ovulationDate: "അണ്ഡോത്പാദന ദിവസം",
    lastPeriodDate: "അവസാന ആർത്തവം തുടങ്ങിയ തീയതി",
    cycleLength: "ചക്ര ദൈർഘ്യം (ദിവസം)",
    periodDuration: "ആർത്തവ ദിവസങ്ങൾ",
    saveSettings: "വിവരങ്ങൾ സേവ് ചെയ്യുക",
    symptoms: "ലക്ഷണങ്ങൾ",
    flow: "രക്തസ്രാവത്തിന്റെ അളവ്",
    mood: "മാനസികാവസ്ഥ (മൂഡ്)",
    phaseDietTipTitle: "ഈ ഘട്ടത്തിന് അനുയോജ്യമായ ഭക്ഷണം",
    phaseExerciseTipTitle: "നിർദ്ദേശിച്ച വ്യായാമങ്ങളും യോഗയും",

    aiChatPlaceholder: "ആരോഗ്യം, ആർത്തവം അല്ലെങ്കിൽ ഗർഭധാരണത്തെക്കുറിച്ച് ലളിതമായി ചോദിക്കൂ...",
    send: "അയക്കുക",
    listening: "ശ്രദ്ധിക്കുന്നു...",
    voiceInput: "ശബ്ദത്തിലൂടെ ചോദിക്കുക",
    listenAudio: "ഉത്തരം കേൾക്കുക",
    quickQuestions: "സാധാരണ ചോദ്യങ്ങൾ:",

    warningCheckTitle: "അടിയന്തര അപകട ലക്ഷണ പരിശോധന",
    warningCheckSubtitle: "അപകട ലക്ഷണങ്ങൾ മുൻകൂട്ടി തിരിച്ചറിഞ്ഞ് ഉടനടി വൈദ്യസഹായം തേടുക.",
    checkNow: "ലക്ഷണങ്ങൾ പരിശോധിക്കുക",
    riskUrgent: "ഉടനടി അടിയന്തര വൈദ്യസഹായം ആവശ്യമാണ്",
    riskDoctor: "ഡോക്ടറുടെ ഉപദേശം തേടുന്നത് ഉചിതമാണ്",
    riskSelfCare: "സാധാരണ ലക്ഷണങ്ങൾ - വീട്ടിലെ പരിചരണം",

    wellnessTitle: "ഭക്ഷണക്രമവും വ്യായാമ പ്ലാനും",
    lifeStage: "ജീവിത ഘട്ടം / അവസ്ഥ",
    healthGoal: "പ്രധാന ലക്ഷ്യം",
    dietPref: "ഭക്ഷണ രീതി",
    regionPref: "പ്രാദേശിക ഭക്ഷണങ്ങൾ",
    generatePlanBtn: "പ്ലാൻ തയ്യാറാക്കുക",

    facilityTitle: "അടുത്തുള്ള ആരോഗ്യ കേന്ദ്രങ്ങളും സർക്കാർ പദ്ധതികളും",
    searchLocation: "നിങ്ങളുടെ ജില്ല, പിൻകോഡ് അല്ലെങ്കിൽ നഗരം ടൈപ്പ് ചെയ്യുക...",
    searchBtn: "തിരയുക",
    govtSchemesTitle: "സ്ത്രീകൾക്കായുള്ള സർക്കാർ ആരോഗ്യ പദ്ധതികൾ",
    nearbyHospitalsTitle: "അടുത്തുള്ള പ്രാഥമിക ആരോഗ്യ കേന്ദ്രങ്ങളും (PHC) ആശുപത്രികളും"
  },
  pa: {
    appName: "ਸ਼ੀਕੇਅਰ AI (SheCare AI)",
    tagline: "ਮਹਿਲਾ ਸਿਹਤ ਅਤੇ ਭਲਾਈ ਸਹਾਇਕ",
    emergencySos: "ਐਮਰਜੈਂਸੀ ਹੈਲਪਲਾਈਨ 108 / 181",
    tabCycle: "ਮਹਾਵਾਰੀ ਟ੍ਰੈਕਰ",
    tabAiChat: "AI ਸਿਹਤ ਚੈਟ",
    tabSymptomCheck: "ਖਤਰੇ ਦੇ ਲੱਛਣਾਂ ਦੀ ਜਾਂਚ",
    tabWellness: "ਖੁਰਾਕ ਅਤੇ ਕਸਰਤ",
    tabFacilities: "ਹਸਪਤਾਲ ਅਤੇ ਯੋਜਨਾਵਾਂ",
    disclaimer: "ਬੇਦਾਅਵਾ: ਇਹ ਐਪ ਸਿਰਫ਼ ਜਾਣਕਾਰੀ ਪ੍ਰਦਾਨ ਕਰਦੀ ਹੈ। ਡਾਕਟਰੀ ਸਲਾਹ ਲਈ ਡਾਕਟਰ ਨਾਲ ਸੰਪਰਕ ਕਰੋ।",

    currentPhase: "ਮੌਜੂਦਾ ਪੜਾਅ",
    cycleDay: "ਚੱਕਰ ਦਾ ਦਿਨ",
    nextPeriodIn: "ਅਗਲੀ ਮਹਾਵਾਰੀ",
    days: "ਦਿਨਾਂ ਵਿੱਚ",
    logToday: "ਅੱਜ ਦੇ ਲੱਛਣ ਦਰਜ ਕਰੋ",
    fertileWindow: "ਗਰਭਧਾਰਨ ਦਾ ਸਮਾਂ",
    ovulationDate: "ਓਵੂਲੇਸ਼ਨ ਦੀ ਮਿਤੀ",
    lastPeriodDate: "ਆਖਰੀ ਮਹਾਵਾਰੀ ਦੀ ਪਹਿਲੀ ਮਿਤੀ",
    cycleLength: "ਚੱਕਰ ਦੀ ਲੰਬਾਈ (ਦਿਨ)",
    periodDuration: "ਮਹਾਵਾਰੀ ਦੇ ਦਿਨ",
    saveSettings: "ਜਾਣਕਾਰੀ ਸੰਭਾਲੋ",
    symptoms: "ਲੱਛਣ",
    flow: "ਖੂਨ ਵਹਿਣ ਦਾ ਪੱਧਰ",
    mood: "ਮੂਡ",
    phaseDietTipTitle: "ਇਸ ਪੜਾਅ ਲਈ ਖੁਰਾਕ ਦੀ ਸਲਾਹ",
    phaseExerciseTipTitle: "ਢੁਕਵੀਂ ਕਸਰਤ ਅਤੇ ਯੋਗਾ",

    aiChatPlaceholder: "ਸਿਹਤ, ਮਹਾਵਾਰੀ ਜਾਂ ਗਰਭ ਅਵਸਥਾ ਬਾਰੇ ਸਰਲ ਭਾਸ਼ਾ ਵਿੱਚ ਪੁੱਛੋ...",
    send: "ਭੇਜੋ",
    listening: "ਸੁਣ ਰਿਹਾ ਹੈ...",
    voiceInput: "ਬੋਲ ਕੇ ਪੁੱਛੋ",
    listenAudio: "ਜਵਾਬ ਸੁਣੋ",
    quickQuestions: "ਅਕਸਰ ਪੁੱਛੇ ਜਾਣ ਵਾਲੇ ਸਵਾਲ:",

    warningCheckTitle: "ਐਮਰਜੈਂਸੀ ਅਤੇ ਖਤਰੇ ਦੇ ਲੱਛਣਾਂ ਦੀ ਜਾਂਚ",
    warningCheckSubtitle: "ਖਤਰੇ ਦੇ ਸੰਕੇਤਾਂ ਦੀ ਪਛਾਣ ਕਰੋ ਅਤੇ ਤੁਰੰਤ ਡਾਕਟਰੀ ਸਹਾਇਤਾ ਲਓ।",
    checkNow: "ਲੱਛਣਾਂ ਦੀ ਜਾਂਚ ਕਰੋ",
    riskUrgent: "ਤੁਰੰਤ ਐਮਰਜੈਂਸੀ ਡਾਕਟਰੀ ਸਹਾਇਤਾ ਦੀ ਲੋੜ ਹੈ",
    riskDoctor: "ਡਾਕਟਰ ਦੀ ਸਲਾਹ ਲੈਣ ਦੀ ਸਿਫਾਰਸ਼ ਕੀਤੀ ਜਾਂਦੀ ਹੈ",
    riskSelfCare: "ਆਮ ਲੱਛਣ - ਘਰੇਲੂ ਦੇਖਭਾਲ",

    wellnessTitle: "ਖੁਰਾਕ ਅਤੇ ਕਸਰਤ ਯੋਜਨਾ",
    lifeStage: "ਜੀਵਨ ਦਾ ਪੜਾਅ / ਸਥਿਤੀ",
    healthGoal: "ਮੁੱਖ ਮਕਸਦ",
    dietPref: "ਖਾਣ-ਪੀਣ ਦੀ ਪਸੰਦ",
    regionPref: "ਖੇਤਰੀ ਭਾਰਤੀ ਖਾਣਾ",
    generatePlanBtn: "ਯੋਜਨਾ ਬਣਾਓ",

    facilityTitle: "ਨੇੜਲੇ ਸਿਹਤ ਕੇਂਦਰ ਅਤੇ ਸਰਕਾਰੀ ਯੋਜਨਾਵਾਂ",
    searchLocation: "ਆਪਣਾ ਜ਼ਿਲ੍ਹਾ, ਪਿੰਨ ਕੋਡ ਜਾਂ ਸ਼ਹਿਰ ਦਰਜ ਕਰੋ...",
    searchBtn: "ਖੋਜੋ",
    govtSchemesTitle: "ਔਰਤਾਂ ਲਈ ਸਰਕਾਰੀ ਸਿਹਤ ਯੋਜਨਾਵਾਂ",
    nearbyHospitalsTitle: "ਨੇੜਲੇ ਪ੍ਰਾਇਮਰੀ ਸਿਹਤ ਕੇਂਦਰ (PHC) ਅਤੇ ਹਸਪਤਾਲ"
  },
  or: {
    appName: "ଶୀକେୟାର AI (SheCare AI)",
    tagline: "ମହିଳା ସ୍ୱାସ୍ଥ୍ୟ ଓ କଲ୍ୟାଣ ସହାୟକ",
    emergencySos: "ଜରୁରୀକାଳୀନ ହେଲ୍ପଲାଇନ ୧୦୮ / ୧୮୧",
    tabCycle: "ପିରିୟଡ୍ ଟ୍ରାକର",
    tabAiChat: "AI ସ୍ୱାସ୍ଥ୍ୟ ଚାଟ୍",
    tabSymptomCheck: "ବିପଦ ଲକ୍ଷଣ ଯାଞ୍ଚ",
    tabWellness: "ଆହାର ଓ ବ୍ୟାୟାମ",
    tabFacilities: "ଡାକ୍ତରଖାନା ଓ ଯୋଜନା",
    disclaimer: "ସୂଚନା: ଏହା କେବଳ ସଚେତନତା ପାଇଁ। ଡାକ୍ତରୀ ଚିକିତ୍ସା ପାଇଁ ଡାକ୍ତରଙ୍କ ପରାମର୍ଶ ନିଅନ୍ତୁ।",

    currentPhase: "ବର୍ତ୍ତମାନର ପର୍ଯ୍ୟାୟ",
    cycleDay: "ଚକ୍ରର ଦିନ",
    nextPeriodIn: "ପରବର୍ତ୍ତୀ ପିରିୟଡ୍",
    days: "ଦିନ ମଧ୍ୟରେ",
    logToday: "ଆଜିର ଲକ୍ଷଣ ଲେଖନ୍ତୁ",
    fertileWindow: "ଗର୍ଭଧାରଣର ସମୟ",
    ovulationDate: "ଓଭ୍ୟୁଲେସନ୍ ତାରିଖ",
    lastPeriodDate: "ଶେଷ ପିରିୟଡ୍ ଆରମ୍ଭ ତାରିଖ",
    cycleLength: "ଚକ୍ରର ଅବଧି (ଦିନ)",
    periodDuration: "ପିରିୟଡ୍ ଦିନ",
    saveSettings: "ତଥ୍ୟ ସଂରକ୍ଷଣ କରନ୍ତୁ",
    symptoms: "ଲକ୍ଷଣ ସମୂହ",
    flow: "ରକ୍ତସ୍ରାବର ପରିମାଣ",
    mood: "ମନୋଭାବ (ମୁଡ୍)",
    phaseDietTipTitle: "ଏହି ପର୍ଯ୍ୟାୟ ପାଇଁ ଆହାର ପରାମର୍ଶ",
    phaseExerciseTipTitle: "ଉପଯୁକ୍ତ ବ୍ୟାୟାମ ଓ ୟୋଗ",

    aiChatPlaceholder: "ସ୍ୱାସ୍ଥ୍ୟ, ପିରିୟଡ୍ କିମ୍ବା ଗର୍ଭାବସ୍ଥା ବିଷୟରେ ସହଜ ଭାଷାରେ ପଚାରନ୍ତୁ...",
    send: "ପଠାନ୍ତୁ",
    listening: "ଶୁଣୁଛି...",
    voiceInput: "ଭଏସ ମାଧ୍ୟମରେ ପଚାରନ୍ତୁ",
    listenAudio: "ଉତ୍ତର ଶୁଣନ୍ତୁ",
    quickQuestions: "ସାଧାରଣ ପ୍ରଶ୍ନୋତ୍ତର:",

    warningCheckTitle: "ଜରୁରୀକାଳୀନ ବିପଦ ଲକ୍ଷଣ ଯାଞ୍ଚ",
    warningCheckSubtitle: "ବିପଦ ସଙ୍କେତ ଶୀଘ୍ର ଚିହ୍ନଟ କରନ୍ତୁ ଏବଂ ଡାକ୍ତରୀ ସାହାଯ୍ୟ ନିଅନ୍ତୁ।",
    checkNow: "ଲକ୍ଷଣ ଯାଞ୍ଚ କରନ୍ତୁ",
    riskUrgent: "ତୁରନ୍ତ ଜରୁରୀକାଳୀନ ଡାକ୍ତରୀ ସାହାଯ୍ୟ ଆବଶ୍ୟକ",
    riskDoctor: "ଡାକ୍ତରଙ୍କ ପରାମର୍ଶ ନେବା ଆବଶ୍ୟକ",
    riskSelfCare: "ସାଧାରଣ ଲକ୍ଷଣ - ଘରୋଇ ଯତ୍ନ",

    wellnessTitle: "ବ୍ୟକ୍ତିଗତ ଆହାର ଓ ବ୍ୟାୟାମ ଯୋଜନା",
    lifeStage: "ଜୀବନର ପର୍ଯ୍ୟାୟ / ସ୍ଥିତି",
    healthGoal: "ମୁଖ୍ୟ ଲକ୍ଷ୍ୟ",
    dietPref: "ଖାଦ୍ୟ ପସନ୍ଦ",
    regionPref: "ଆଞ୍ଚଳିକ ଭାରତୀୟ ଖାଦ୍ୟ",
    generatePlanBtn: "ଯୋଜନା ପ୍ରସ୍ତୁତ କରନ୍ତୁ",

    facilityTitle: "ନିକଟସ୍ଥ ସ୍ୱାସ୍ଥ୍ୟ କେନ୍ଦ୍ର ଓ ସରକାରୀ ଯୋଜନା",
    searchLocation: "ଆପଣଙ୍କ ଜିଲ୍ଲା, ପିନକୋଡ୍ କିମ୍ବା ସହର ଲେଖନ୍ତୁ...",
    searchBtn: "ଖୋଜନ୍ତୁ",
    govtSchemesTitle: "ମହିଳାଙ୍କ ପାଇଁ ସରକାରୀ ସ୍ୱାସ୍ଥ୍ୟ ଯୋଜନା",
    nearbyHospitalsTitle: "ନିକଟସ୍ଥ ପ୍ରାଥମିକ ସ୍ୱାସ୍ଥ୍ୟ କେନ୍ଦ୍ର (PHC) ଓ ଡାକ୍ତରଖାନା"
  }
};
