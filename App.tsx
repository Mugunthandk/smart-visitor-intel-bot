
import React, { useState, useEffect } from 'react';
import ChatView from './components/ChatView';
import OperatorWidget from './components/OperatorWidget';
import { mockChatTranscript, mockVisitorData } from './services/mockData';
import type { Visitor, ChatMessage } from './types';

const App: React.FC = () => {
  const [visitor, setVisitor] = useState<Visitor | null>(null);
  const [transcript, setTranscript] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulate fetching initial data
    const timer = setTimeout(() => {
      setVisitor(mockVisitorData);
      setTranscript(mockChatTranscript);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen font-sans text-slate-800">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-xl font-bold text-slate-900">Smart Visitor Intelligence</h1>
            <div className="text-sm text-slate-500">Operator: Jane Doe</div>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        {loading ? (
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ChatView transcript={transcript} visitorName={visitor?.name || 'Visitor'} />
            </div>
            <div className="lg:col-span-1">
              {visitor && <OperatorWidget visitor={visitor} transcript={transcript} />}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
