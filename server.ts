import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// Helper for system prompt language instructions
const getLanguageInstruction = (lang: string) => {
  const languageNames: Record<string, string> = {
    hi: "Hindi (हिंदी)",
    bn: "Bengali (বাংলা)",
    te: "Telugu (తెలుగు)",
    ta: "Tamil (தமிழ்)",
    mr: "Marathi (मराठी)",
    gu: "Gujarati (ગુજરાતી)",
    kn: "Kannada (ಕನ್ನಡ)",
    ml: "Malayalam (മലയാളം)",
    pa: "Punjabi (ਪੰਜਾਬੀ)",
    or: "Odia (ଓଡ଼ିଆ)",
    en: "English"
  };
  const targetLang = languageNames[lang] || "English";
  return `IMPORTANT: Respond in ${targetLang}. Use simple, clear, compassionate, and culturally appropriate language that is easy to understand for women in both rural and urban areas. Avoid overly complex medical jargon, or explain medical terms simply if used. Always include a short, respectful disclaimer encouraging consultation with a qualified medical professional for diagnosis and treatment.`;
};

// 1. Health Assistant Chat API
app.post("/api/health-chat", async (req, res) => {
  try {
    const { message, history = [], language = "en", userContext = {} } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const langInstruction = getLanguageInstruction(language);

    const systemInstruction = `You are "SheCare AI", a compassionate, knowledgeable, and empathetic Women's Health & Wellness Assistant tailored for women across India (including rural and semi-urban communities).
${langInstruction}

User Profile Context:
- Cycle Day/Phase: ${userContext.cyclePhase || 'Not specified'}
- Life Stage/Condition: ${userContext.lifeStage || 'General Women Health'}

Your Guidelines:
1. Provide accurate, supportive, non-judgmental guidance on menstrual health, reproductive wellness, pregnancy, nutrition, hygiene, mental well-being, PCOS, anemia, and preventive care.
2. Structure your response with clear bullet points or short paragraphs.
3. Highlight any "Warning Signs / Red Flags" in a dedicated section if the user mentions symptoms that require urgent medical care (e.g. heavy soaking bleeding, severe lower abdominal pain, high fever during pregnancy, lumps with skin changes).
4. Suggest practical, low-cost, locally available home remedies or nutrition where safe (e.g., iron-rich jaggery and spinach for anemia, warm compress for menstrual cramps), but ALWAYS clarify these do not replace medical treatment.
5. Remind the user kindly to visit a doctor or nearby Primary Health Center (PHC) when needed.`;

    const contents = [];
    if (Array.isArray(history) && history.length > 0) {
      for (const msg of history.slice(-6)) {
        contents.push({
          role: msg.sender === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }]
        });
      }
    }
    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    const replyText = response.text || "I apologize, I am unable to process your request at the moment. Please consult a healthcare professional for urgent health queries.";

    res.json({ reply: replyText });
  } catch (error: any) {
    console.error("Error in /api/health-chat:", error);
    res.status(500).json({ error: error?.message || "Failed to generate AI response" });
  }
});

// 2. Symptom Warning Screener API (Structured Analysis)
app.post("/api/symptom-checker", async (req, res) => {
  try {
    const { symptoms = [], additionalNotes = "", age, isPregnant = false, language = "en" } = req.body;

    const langInstruction = getLanguageInstruction(language);

    const prompt = `Analyze the following symptoms for a woman (Age: ${age || 'Not specified'}, Pregnant: ${isPregnant ? 'Yes' : 'No'}):
Symptoms selected: ${symptoms.join(', ')}
Additional Notes: ${additionalNotes}

Evaluate if these symptoms indicate a medical emergency or warning sign for women's health (e.g., severe hemorrhage/heavy bleeding, ectopic pregnancy, preeclampsia, severe infection/pelvic inflammatory disease, severe anemia, breast/cervical warning signs).

Provide a structured evaluation in JSON format matching this schema.
${langInstruction}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            riskLevel: {
              type: Type.STRING,
              description: "Must be one of: 'URGENT_EMERGENCY', 'DOCTOR_CONSULT_NEEDED', 'MILD_SELF_CARE'"
            },
            summary: {
              type: Type.STRING,
              description: "A gentle, simple overview of the symptoms in the requested language."
            },
            redFlagsDetected: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of warning signs identified if any."
            },
            immediateActions: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Step by step recommended immediate actions."
            },
            questionsToAskDoctor: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of 3-4 specific questions the user can ask their doctor."
            },
            emergencyHelplines: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Helpline numbers to call (e.g. 108 Ambulance, 181 Women Helpline, 102 Pregnant Women Hotline)."
            }
          },
          required: ["riskLevel", "summary", "redFlagsDetected", "immediateActions", "questionsToAskDoctor"]
        }
      }
    });

    const jsonText = response.text || "{}";
    const data = JSON.parse(jsonText);
    res.json(data);
  } catch (error: any) {
    console.error("Error in /api/symptom-checker:", error);
    res.status(500).json({ error: "Failed to evaluate symptoms." });
  }
});

// 3. Personalized Diet & Exercise Plan Generator API
app.post("/api/generate-plan", async (req, res) => {
  try {
    const {
      lifeStage = "General Wellness",
      healthGoal = "Balanced Hormones & Energy",
      dietPreference = "Vegetarian",
      regionalCuisine = "Indian",
      cyclePhase = "Follicular Phase",
      language = "en"
    } = req.body;

    const langInstruction = getLanguageInstruction(language);

    const prompt = `Create a customized daily/weekly wellness, nutrition, and exercise plan for an Indian woman with the following profile:
- Life Stage / Condition: ${lifeStage} (e.g. PCOS, Anemia, Pregnancy Trimester, Menopause, Regular Cycle)
- Primary Health Goal: ${healthGoal}
- Diet Preference: ${dietPreference}
- Regional Cuisine: ${regionalCuisine}
- Current Cycle Phase: ${cyclePhase}

Requirements:
1. Meal recommendations using affordable, easily available Indian ingredients rich in essential nutrients (e.g., iron, calcium, folate, protein, fiber like spinach, jaggery, ragi, lentils, seeds, curd, amla).
2. Daily gentle exercise or yoga routines suited for her condition (with clear precautions).
3. Self-care & hydration tips.
Format in JSON following the schema.
${langInstruction}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            planTitle: { type: Type.STRING },
            overview: { type: Type.STRING },
            dietPlan: {
              type: Type.OBJECT,
              properties: {
                breakfast: { type: Type.STRING },
                lunch: { type: Type.STRING },
                eveningSnack: { type: Type.STRING },
                dinner: { type: Type.STRING },
                keyNutrientsFocus: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                affordableSuperfoods: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                }
              },
              required: ["breakfast", "lunch", "eveningSnack", "dinner", "affordableSuperfoods"]
            },
            exercisePlan: {
              type: Type.OBJECT,
              properties: {
                recommendedExercises: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      name: { type: Type.STRING },
                      duration: { type: Type.STRING },
                      benefits: { type: Type.STRING },
                      precautions: { type: Type.STRING }
                    },
                    required: ["name", "duration", "benefits"]
                  }
                },
                yogaPoses: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                }
              },
              required: ["recommendedExercises", "yogaPoses"]
            },
            lifestyleTips: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["planTitle", "overview", "dietPlan", "exercisePlan", "lifestyleTips"]
        }
      }
    });

    const data = JSON.parse(response.text || "{}");
    res.json(data);
  } catch (error: any) {
    console.error("Error in /api/generate-plan:", error);
    res.status(500).json({ error: "Failed to generate plan." });
  }
});

// 4. Nearby Healthcare Facilities & Government Schemes Finder API
app.post("/api/find-facilities", async (req, res) => {
  try {
    const { locationQuery = "India", facilityType = "all", language = "en" } = req.body;

    const langInstruction = getLanguageInstruction(language);

    const prompt = `Find and list women's healthcare facilities, Primary Health Centers (PHC), Community Health Centers (CHC), Maternity Hospitals, or Government Health Scheme enrollment centers in or near "${locationQuery}", India.

Provide 4-5 real or typical healthcare centers in that district/state along with standard government schemes available (e.g. Pradhan Mantri Matru Vandana Yojana PMMVY, Janani Suraksha Yojana JSY, Ayushman Bharat PMJAY, Anemia Mukt Bharat).

Return a JSON object following the schema.
${langInstruction}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            locationName: { type: Type.STRING },
            facilities: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  type: { type: Type.STRING, description: "PHC, CHC, District Hospital, Maternity Clinic, Anganwadi Center" },
                  address: { type: Type.STRING },
                  servicesProvided: { type: Type.ARRAY, items: { type: Type.STRING } },
                  contactOrHelpline: { type: Type.STRING }
                },
                required: ["name", "type", "address", "servicesProvided"]
              }
            },
            applicableSchemes: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  schemeName: { type: Type.STRING },
                  description: { type: Type.STRING },
                  financialBenefit: { type: Type.STRING },
                  howToApply: { type: Type.STRING }
                },
                required: ["schemeName", "description", "financialBenefit"]
              }
            }
          },
          required: ["locationName", "facilities", "applicableSchemes"]
        }
      }
    });

    const data = JSON.parse(response.text || "{}");
    res.json(data);
  } catch (error: any) {
    console.error("Error in /api/find-facilities:", error);
    res.status(500).json({ error: "Failed to find facilities." });
  }
});

// 5. Text-to-Speech API (for low-literacy voice output)
app.post("/api/tts", async (req, res) => {
  try {
    const { text, language = "en" } = req.body;
    if (!text) {
      return res.status(400).json({ error: "Text is required for TTS" });
    }

    // Try Gemini TTS model
    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-tts-preview",
      contents: [{ parts: [{ text: `Speak in a warm, friendly voice: ${text.slice(0, 500)}` }] }],
      config: {
        responseModalities: ["AUDIO"],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' }
          }
        }
      }
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (base64Audio) {
      return res.json({ audio: base64Audio, format: "audio/pcm" });
    } else {
      return res.status(404).json({ error: "No audio generated, use client fallback" });
    }
  } catch (error: any) {
    console.error("Error in /api/tts:", error);
    res.status(500).json({ error: "TTS generation failed, fallback to browser speech" });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`SheCare AI Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
