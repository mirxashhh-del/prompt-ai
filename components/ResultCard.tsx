import React, { useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';
import { Button } from './Button';

interface ResultCardProps {
  content: string;
}

export const ResultCard: React.FC<ResultCardProps> = ({ content }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="w-full animate-fade-in-up">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2 text-gray-300">
          <Terminal className="w-4 h-4 text-indigo-400" />
          <h3 className="text-sm font-semibold uppercase tracking-wider">Generated System Prompt</h3>
        </div>
        <Button 
          variant="secondary" 
          size="sm" 
          onClick={handleCopy}
          className="text-xs py-1 h-8"
          icon={copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
        >
          {copied ? 'Copied!' : 'Copy to Clipboard'}
        </Button>
      </div>
      
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl opacity-20 group-hover:opacity-40 transition duration-500 blur"></div>
        <div className="relative bg-gray-950 rounded-xl border border-gray-800 shadow-2xl overflow-hidden">
          <div className="flex space-x-1.5 px-4 py-3 bg-gray-900 border-b border-gray-800">
            <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
          </div>
          <div className="p-4 md:p-6 overflow-x-auto">
            <pre className="font-mono text-sm md:text-base text-gray-300 whitespace-pre-wrap break-words leading-relaxed selection:bg-indigo-500/30 selection:text-indigo-200">
              {content}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};