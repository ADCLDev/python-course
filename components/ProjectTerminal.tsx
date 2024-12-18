'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  type: 'system' | 'input' | 'output';
  content: string;
}

export default function ProjectTerminal() {
  const [messages, setMessages] = useState<Message[]>([
    { type: 'system', content: 'Welcome to Band Name Generator!' },
    { type: 'system', content: 'What is your name?' }
  ]);
  const [input, setInput] = useState('');
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
    inputRef.current?.focus();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessages = [...messages, { type: 'input', content: input }];

    if (step === 0) {
      setName(input);
      newMessages.push({ type: 'system', content: 'What is your pet name?' });
      setStep(1);
    } else if (step === 1) {
      const bandName = `${name} ${input}`;
      newMessages.push({ type: 'output', content: `Your Band name is ${bandName}` });
      newMessages.push({ type: 'system', content: 'Would you like to try again? (yes/no)' });
      setStep(2);
    } else if (step === 2) {
      if (input.toLowerCase() === 'yes') {
        setMessages([
          { type: 'system', content: 'Welcome to Band Name Generator!' },
          { type: 'system', content: 'What is your name?' }
        ]);
        setStep(0);
        setName('');
        setInput('');
        return;
      } else {
        newMessages.push({ type: 'system', content: 'Thank you for using Band Name Generator!' });
      }
    }

    setMessages(newMessages as Message[]);
    setInput('');
  };

  return (
    <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm h-[400px] flex flex-col">
      <div 
        ref={terminalRef}
        className="flex-1 overflow-y-auto mb-4 space-y-2"
      >
        {messages.map((message, index) => (
          <div key={index} className={`${
            message.type === 'system' ? 'text-yellow-400' :
            message.type === 'input' ? 'text-green-400' : 'text-white'
          }`}>
            {message.type === 'input' ? '> ' : ''}
            {message.content}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <span className="text-green-400">{'>'}</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent outline-none text-green-400"
          autoFocus
        />
      </form>
    </div>
  );
} 