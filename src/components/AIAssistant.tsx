import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff, Volume2, Sparkles, AlertCircle, Heart, User, Bot, Loader2, RefreshCw, VolumeX } from 'lucide-react';
import { ChatMessage, CyclePhase, LanguageCode } from '../types';
import { TRANSLATIONS } from '../translations';

interface AIAssistantProps {
  currentLanguage: LanguageCode;
  cyclePhase: CyclePhase;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({
  currentLanguage,
  cyclePhase,
}) => {
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: `Hello! I am SheCare AI, your dedicated health assistant. How can I support you today? You can ask me about menstrual symptoms, PCOS, pregnancy care, nutrition, or when to consult a doctor.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [inputPrompt, setInputPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  // Quick Prompt Chips in local language context
  const quickPrompts = [
    "How to relieve heavy period cramps at home?",
    "What are early signs of PCOS and how to manage it?",
    "Best iron-rich local foods for Anemia during period?",
    "What to eat in the 1st trimester of pregnancy?",
    "Normal vs abnormal vaginal discharge signs",
  ];

  const handleSendMessage = async (queryText?: string) => {
    const textToSend = queryText || inputPrompt;
    if (!textToSend.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!queryText) setInputPrompt('');
    setLoading(true);

    try {
      const response = await fetch('/api/health-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          history: messages,
          language: currentLanguage,
          userContext: { cyclePhase },
        }),
      });

      const data = await response.json();

      if (data.reply) {
        const assistantMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          text: data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, assistantMsg]);
      } else {
        throw new Error('Invalid response');
      }
    } catch (err) {
      console.error('Chat error:', err);
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: 'I am sorry, I experienced a network issue. Please check your connection or try again shortly. For urgent symptoms, please consult a nearby clinic.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  // Web Speech Recognition toggle
  const toggleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser. Please type your message.');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();

      // Language code mapping
      const langMap: Record<string, string> = {
        hi: 'hi-IN', te: 'te-IN', ta: 'ta-IN', bn: 'bn-IN', mr: 'mr-IN',
        gu: 'gu-IN', kn: 'kn-IN', ml: 'ml-IN', pa: 'pa-IN', or: 'or-IN', en: 'en-IN'
      };

      recognition.lang = langMap[currentLanguage] || 'en-IN';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputPrompt(transcript);
        setIsListening(false);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);

      recognition.start();
    } catch (e) {
      console.error('Speech recognition error:', e);
      setIsListening(false);
    }
  };

  // Text-to-Speech (Audio Readout)
  const handleReadoutAudio = async (msgId: string, text: string) => {
    if (playingAudioId === msgId) {
      window.speechSynthesis.cancel();
      setPlayingAudioId(null);
      return;
    }

    // Try server TTS endpoint first, or fallback to Web Speech API
    window.speechSynthesis.cancel();
    setPlayingAudioId(msgId);

    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      const langMap: Record<string, string> = {
        hi: 'hi-IN', te: 'te-IN', ta: 'ta-IN', bn: 'bn-IN', mr: 'mr-IN',
        gu: 'gu-IN', kn: 'kn-IN', ml: 'ml-IN', pa: 'pa-IN', or: 'or-IN', en: 'en-IN'
      };
      utterance.lang = langMap[currentLanguage] || 'en-US';
      utterance.rate = 0.95;

      utterance.onend = () => setPlayingAudioId(null);
      utterance.onerror = () => setPlayingAudioId(null);

      window.speechSynthesis.speak(utterance);
    } else {
      alert('Speech audio is not available in this browser.');
      setPlayingAudioId(null);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-rose-100 shadow-md overflow-hidden flex flex-col h-[78vh] animate-fade-in">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-rose-700 via-pink-700 to-purple-800 text-white p-4 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-base flex items-center gap-2">
              SheCare AI Health Assistant
              <span className="text-[10px] bg-emerald-500/30 border border-emerald-300/40 text-emerald-100 px-2 py-0.5 rounded-full font-medium">
                Active
              </span>
            </h2>
            <p className="text-xs text-rose-100">Simple language guidance in 11 Indian languages</p>
          </div>
        </div>

        {/* Phase Context Indicator */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/10 text-xs font-medium">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Phase: {cyclePhase}</span>
        </div>
      </div>

      {/* Quick Prompts Carousel */}
      <div className="bg-rose-50/60 p-3 border-b border-rose-100 overflow-x-auto flex gap-2 text-xs scrollbar-none">
        <span className="text-slate-500 font-bold shrink-0 my-auto pl-1">
          {t.quickQuestions}
        </span>
        {quickPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(prompt)}
            className="px-3 py-1.5 rounded-full bg-white border border-rose-200 text-rose-900 font-medium whitespace-nowrap hover:bg-rose-100 hover:border-rose-300 transition-colors shadow-2xs text-[11px]"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Messages Feed */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 max-w-[88%] sm:max-w-[80%] ${
              msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
            }`}
          >
            {/* Avatar */}
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold text-white ${
                msg.sender === 'user'
                  ? 'bg-rose-600'
                  : 'bg-gradient-to-tr from-purple-700 to-rose-600'
              }`}
            >
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            {/* Bubble */}
            <div
              className={`rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-2xs space-y-2 ${
                msg.sender === 'user'
                  ? 'bg-rose-600 text-white rounded-tr-none'
                  : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none'
              }`}
            >
              <div className="whitespace-pre-wrap font-sans font-normal">
                {msg.text}
              </div>

              {/* Timestamp & Voice Readout for AI */}
              <div className="flex items-center justify-between gap-3 text-[10px] opacity-80 pt-1 border-t border-slate-100/20">
                <span>{msg.timestamp}</span>
                {msg.sender === 'assistant' && (
                  <button
                    onClick={() => handleReadoutAudio(msg.id, msg.text)}
                    className="flex items-center gap-1 font-bold text-rose-700 hover:text-rose-900 transition-colors bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200"
                    title="Listen to response (TTS)"
                  >
                    {playingAudioId === msg.id ? (
                      <>
                        <VolumeX className="w-3 h-3 text-red-600 animate-pulse" />
                        <span>Stop Audio</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-3 h-3 text-rose-600" />
                        <span>{t.listenAudio}</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-slate-500 text-xs p-2">
            <Loader2 className="w-4 h-4 animate-spin text-rose-600" />
            <span>SheCare AI is thinking...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Medical Disclaimer Strip */}
      <div className="px-4 py-2 bg-amber-50 border-t border-amber-100 text-[11px] text-amber-900 flex items-center gap-2">
        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
        <span className="truncate">{t.disclaimer}</span>
      </div>

      {/* Input Box */}
      <div className="p-3 bg-white border-t border-slate-200">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          {/* Speech-to-Text Button */}
          <button
            type="button"
            onClick={toggleVoiceInput}
            className={`p-2.5 rounded-2xl border transition-all ${
              isListening
                ? 'bg-red-600 text-white border-red-700 animate-pulse'
                : 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
            }`}
            title={t.voiceInput}
            id="voice-speech-to-text-btn"
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          {/* Textarea Input */}
          <input
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            placeholder={isListening ? t.listening : t.aiChatPlaceholder}
            className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-rose-500 focus:bg-white"
            id="ai-chat-input-field"
          />

          {/* Send Button */}
          <button
            type="submit"
            disabled={!inputPrompt.trim() || loading}
            className="p-2.5 rounded-2xl bg-rose-600 hover:bg-rose-700 disabled:bg-slate-200 text-white transition-all shadow-xs"
            id="send-ai-chat-btn"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};
