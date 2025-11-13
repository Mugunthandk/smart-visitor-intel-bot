
import React from 'react';
import type { ChatMessage } from '../types';

interface ChatViewProps {
  transcript: ChatMessage[];
  visitorName: string;
}

const ChatView: React.FC<ChatViewProps> = ({ transcript, visitorName }) => {
  return (
    <div className="bg-white rounded-lg shadow-md h-[75vh] flex flex-col">
      <div className="p-4 border-b border-slate-200">
        <h2 className="font-bold text-lg">Chat with {visitorName}</h2>
      </div>
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {transcript.map((msg) => (
          <div key={msg.id} className={`flex items-end gap-2 ${msg.sender === 'visitor' ? 'justify-start' : 'justify-end'}`}>
            {msg.sender === 'visitor' && (
              <div className="w-8 h-8 rounded-full bg-slate-300 flex-shrink-0"></div>
            )}
            <div className={`max-w-xs md:max-w-md lg:max-w-lg rounded-xl px-4 py-2 ${
                msg.sender === 'visitor' 
                ? 'bg-slate-200 text-slate-800 rounded-bl-none' 
                : 'bg-blue-500 text-white rounded-br-none'
            }`}>
              <p className="text-sm">{msg.text}</p>
              <p className={`text-xs mt-1 ${
                  msg.sender === 'visitor' ? 'text-slate-500' : 'text-blue-100'
              }`}>{msg.timestamp}</p>
            </div>
             {msg.sender !== 'visitor' && (
              <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold">B</span>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-slate-200 bg-slate-50">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Type your message..." 
            className="w-full px-4 py-2 pr-12 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full text-slate-500 hover:bg-slate-200">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatView;
