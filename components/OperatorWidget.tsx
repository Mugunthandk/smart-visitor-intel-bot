
import React, { useState, useEffect, useCallback } from 'react';
import type { Visitor, Company, ActivityLog, ChatMessage } from '../types';
import { mockCompanyData, mockActivityFeed } from '../services/mockData';
import { summarizeTranscript } from '../services/geminiService';
import { UserIcon, BuildingIcon, MapPinIcon, SparklesIcon, PlusCircleIcon, CalendarIcon, TicketIcon } from './icons';

interface OperatorWidgetProps {
  visitor: Visitor;
  transcript: ChatMessage[];
}

interface InfoRowProps {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}

const InfoRow: React.FC<InfoRowProps> = ({ icon, label, value }) => (
  <div className="flex items-start text-sm">
    <div className="w-6 h-6 flex-shrink-0 text-slate-400">{icon}</div>
    <div className="ml-2">
      <div className="font-semibold text-slate-700">{label}</div>
      <div className="text-slate-500">{value}</div>
    </div>
  </div>
);

const OperatorWidget: React.FC<OperatorWidgetProps> = ({ visitor, transcript }) => {
  const [company, setCompany] = useState<Company | null>(null);
  const [activity, setActivity] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<string>('');
  const [isSummarizing, setIsSummarizing] = useState<boolean>(false);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  useEffect(() => {
    const fetchWidgetData = () => {
      setLoading(true);
      // Simulate API calls to Clearbit, IPInfo, etc.
      setTimeout(() => {
        setCompany(mockCompanyData);
        setActivity(mockActivityFeed);
        setLoading(false);
      }, 500);
    };
    fetchWidgetData();
  }, [visitor.id]);

  const handleSummarize = useCallback(async () => {
    setIsSummarizing(true);
    const result = await summarizeTranscript(transcript);
    setSummary(result);
    setIsSummarizing(false);
  }, [transcript]);

  const handleActionClick = (action: string) => {
    setActionFeedback(`${action} action triggered!`);
    setTimeout(() => setActionFeedback(null), 2000);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md h-[75vh] flex flex-col">
      <div className="p-4 border-b border-slate-200">
        <h2 className="font-bold text-lg">Visitor Intelligence</h2>
      </div>
      <div className="flex-1 p-4 overflow-y-auto space-y-6">
        {/* Visitor Profile */}
        <div className="space-y-3">
          <div className="flex items-center space-x-4">
            <img src={visitor.avatarUrl} alt={visitor.name} className="w-16 h-16 rounded-full" />
            <div>
              <h3 className="font-bold text-xl text-slate-800">{visitor.name}</h3>
              <p className="text-sm text-slate-500">{visitor.email}</p>
            </div>
          </div>
          <InfoRow icon={<MapPinIcon />} label="Location" value={visitor.location} />
          <InfoRow icon={<UserIcon />} label="Visits" value={`${visitor.visits} (First seen: ${visitor.firstSeen})`} />
        </div>

        {/* Company Info */}
        {company && (
          <div className="border-t pt-4 space-y-3">
            <div className="flex items-center space-x-4">
              <img src={company.logoUrl} alt={company.name} className="w-12 h-12 rounded-md border" />
              <div>
                <h4 className="font-bold text-lg text-slate-800">{company.name}</h4>
                <a href={`http://${company.domain}`} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-500 hover:underline">{company.domain}</a>
              </div>
            </div>
            <InfoRow icon={<BuildingIcon />} label="Industry" value={`${company.industry} (${company.employees} employees)`} />
            <p className="text-sm text-slate-600 pl-8">{company.description}</p>
          </div>
        )}
        
        {/* AI Summary */}
        <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between items-center">
                <h4 className="font-bold text-slate-800">AI-Powered Summary</h4>
                <button 
                    onClick={handleSummarize}
                    disabled={isSummarizing}
                    className="flex items-center space-x-1 text-sm text-blue-500 hover:text-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <SparklesIcon className="w-4 h-4" />
                    <span>{isSummarizing ? 'Generating...' : 'Generate'}</span>
                </button>
            </div>
            {isSummarizing ? (
                <div className="h-20 bg-slate-100 rounded-md animate-pulse"></div>
            ) : summary ? (
                <p className="text-sm text-slate-600 bg-blue-50 border border-blue-200 rounded-md p-3">{summary}</p>
            ) : (
                <p className="text-sm text-slate-400 italic">Click "Generate" to get an AI summary of the chat.</p>
            )}
        </div>

        {/* Activity Feed */}
        <div className="border-t pt-4">
          <h4 className="font-bold text-slate-800 mb-2">Recent Activity</h4>
          <ul className="space-y-2">
            {activity.map(item => (
              <li key={item.id} className="text-sm flex justify-between">
                <span className="text-slate-600">{item.description}</span>
                <span className="text-slate-400">{item.timestamp}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* Actions Panel */}
      <div className="p-4 border-t border-slate-200 bg-slate-50 space-y-2">
         {actionFeedback && (
          <div className="text-center text-sm text-green-700 bg-green-100 p-2 rounded-md">
            {actionFeedback}
          </div>
        )}
        <div className="grid grid-cols-2 gap-2 text-sm">
            <button onClick={() => handleActionClick('Create CRM Lead')} className="flex items-center justify-center space-x-2 bg-white border border-slate-300 rounded-md p-2 hover:bg-slate-100 transition-colors">
                <PlusCircleIcon /><span>Create Lead</span>
            </button>
            <button onClick={() => handleActionClick('Book Meeting')} className="flex items-center justify-center space-x-2 bg-white border border-slate-300 rounded-md p-2 hover:bg-slate-100 transition-colors">
                <CalendarIcon /><span>Book Meeting</span>
            </button>
            <button onClick={() => handleActionClick('Assign Ticket')} className="flex items-center justify-center space-x-2 bg-white border border-slate-300 rounded-md p-2 hover:bg-slate-100 transition-colors">
                <TicketIcon /><span>Assign Ticket</span>
            </button>
            <button onClick={() => handleActionClick('Send Discount')} className="flex items-center justify-center space-x-2 bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600 transition-colors">
                <SparklesIcon /><span>Send Discount</span>
            </button>
        </div>
      </div>
    </div>
  );
};

export default OperatorWidget;
