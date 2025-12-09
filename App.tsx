import React, { useState } from 'react';
import { Sparkles, Wand2, Zap, MessageSquare, Terminal } from 'lucide-react';
import { generateEnhancedPrompt } from './services/geminiService';
import { Button } from './components/Button';
import { ResultCard } from './components/ResultCard';
import { AppStatus } from './types';

export default function App() {
  const [userInput, setUserInput] = useState('');
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const handleEnhance = async () => {
    if (!userInput.trim()) return;
    
    setStatus(AppStatus.LOADING);
    setError('');
    setResult('');

    try {
      const enhanced = await generateEnhancedPrompt(userInput);
      setResult(enhanced);
      setStatus(AppStatus.SUCCESS);
    } catch (err) {
      console.error(err);
      setError('Something went wrong generating the prompt. Please check your API key or try again.');
      setStatus(AppStatus.ERROR);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans selection:bg-indigo-500/30">
      
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl translate-y-1/2"></div>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 py-12 md:py-20 flex flex-col items-center">
        
        {/* Header */}
        <header className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center justify-center p-2 bg-gray-900/50 border border-gray-800 rounded-full mb-4 shadow-xl backdrop-blur-sm">
            <span className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-indigo-400 uppercase tracking-widest">
              <Zap className="w-3 h-3 fill-indigo-400" />
              Powered by Gemini 2.5
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
            AI Prompt Architect
          </h1>
          <p className="text-lg text-gray-400 max-w-lg mx-auto leading-relaxed">
            Transform simple ideas into professional-grade system prompts engineered for maximum precision.
          </p>
        </header>

        {/* Main Interface */}
        <div className="w-full space-y-8">
          
          {/* Input Section */}
          <div className="bg-gray-900/50 border border-gray-800 p-1 rounded-2xl shadow-xl backdrop-blur-sm">
            <div className="bg-gray-950 border border-gray-800/50 rounded-xl p-6 md:p-8">
              <label htmlFor="idea-input" className="block text-sm font-medium text-gray-300 mb-3 ml-1">
                Your Simple Idea
              </label>
              <div className="relative group">
                <textarea
                  id="idea-input"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="e.g., Create a snake game in Python, or Write a blog post about coffee..."
                  className="w-full h-32 md:h-40 bg-gray-900 text-gray-100 placeholder-gray-500 p-4 rounded-xl border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none outline-none font-mono text-sm leading-relaxed"
                />
                <div className="absolute bottom-4 right-4 text-xs text-gray-600 pointer-events-none">
                  {userInput.length} chars
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <Button 
                  onClick={handleEnhance} 
                  isLoading={status === AppStatus.LOADING}
                  disabled={!userInput.trim()}
                  className="w-full md:w-auto text-base px-8 py-3"
                  icon={<Wand2 className="w-5 h-5" />}
                >
                  Enhance Prompt
                </Button>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {status === AppStatus.ERROR && (
            <div className="p-4 bg-red-900/20 border border-red-800/50 text-red-200 rounded-xl text-center text-sm">
              {error}
            </div>
          )}

          {/* Result Section */}
          {status === AppStatus.SUCCESS && result && (
            <ResultCard content={result} />
          )}

          {/* Empty State / Features */}
          {status === AppStatus.IDLE && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 text-gray-400">
              <div className="p-6 bg-gray-900/30 border border-gray-800/50 rounded-xl hover:bg-gray-900/50 transition duration-300">
                <Sparkles className="w-8 h-8 text-indigo-500 mb-4" />
                <h3 className="font-semibold text-gray-200 mb-2">Smart Role Detection</h3>
                <p className="text-sm">Automatically assigns the perfect persona (Engineer, Copywriter, etc.) for your task.</p>
              </div>
              <div className="p-6 bg-gray-900/30 border border-gray-800/50 rounded-xl hover:bg-gray-900/50 transition duration-300">
                <MessageSquare className="w-8 h-8 text-purple-500 mb-4" />
                <h3 className="font-semibold text-gray-200 mb-2">Context Expansion</h3>
                <p className="text-sm">Expands vague inputs into detailed context statements to reduce AI hallucination.</p>
              </div>
              <div className="p-6 bg-gray-900/30 border border-gray-800/50 rounded-xl hover:bg-gray-900/50 transition duration-300">
                <Terminal className="w-8 h-8 text-emerald-500 mb-4" />
                <h3 className="font-semibold text-gray-200 mb-2">Structured Output</h3>
                <p className="text-sm">Formats the final prompt with clear constraints, tasks, and output requirements.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}