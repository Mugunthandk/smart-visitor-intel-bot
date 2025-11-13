
import type { Visitor, Company, ChatMessage, ActivityLog } from '../types';

export const mockVisitorData: Visitor = {
  id: 'vis_12345',
  name: 'Alex Johnson',
  email: 'alex.j@acmeinc.com',
  avatarUrl: 'https://picsum.photos/seed/alex/100/100',
  location: 'San Francisco, CA',
  ip: '203.0.113.10',
  firstSeen: '3 weeks ago',
  visits: 5,
  social: {
    linkedin: 'https://linkedin.com/in/alexjohnson',
    twitter: 'https://twitter.com/alexj'
  }
};

export const mockCompanyData: Company = {
  name: 'Acme Inc.',
  domain: 'acmeinc.com',
  logoUrl: 'https://picsum.photos/seed/acme/100/100',
  industry: 'Enterprise Software',
  employees: '1,001-5,000',
  revenue: '$50M-$100M',
  description: 'Acme Inc. provides cutting-edge solutions for enterprise resource planning and cloud infrastructure management.'
};

export const mockChatTranscript: ChatMessage[] = [
  { id: 1, sender: 'visitor', text: 'Hi, I was looking at your pricing page and had a few questions about the Enterprise plan.', timestamp: '10:30 AM' },
  { id: 2, sender: 'bot', text: 'Hello Alex! I can certainly help with that. What specific questions do you have about the Enterprise plan?', timestamp: '10:31 AM' },
  { id: 3, sender: 'visitor', text: 'Does it include premium support and an uptime SLA?', timestamp: '10:31 AM' },
  { id: 4, sender: 'bot', text: 'Yes, it does! The Enterprise plan includes 24/7 premium support via phone and email, plus a 99.99% uptime SLA. Would you like to see a detailed feature comparison?', timestamp: '10:32 AM' },
  { id: 5, sender: 'visitor', text: 'That would be great. Also, can I book a demo with a sales rep?', timestamp: '10:33 AM' },
  { id: 6, sender: 'bot', text: 'Of course. I can connect you with our sales team right now or help you book a time on their calendar. What works best for you?', timestamp: '10:34 AM' },
];

export const mockActivityFeed: ActivityLog[] = [
    { id: 1, type: 'page_view', description: 'Viewed Pricing Page', url: '/pricing', timestamp: '2 minutes ago' },
    { id: 2, type: 'page_view', description: 'Viewed Enterprise Solutions', url: '/solutions/enterprise', timestamp: '5 minutes ago' },
    { id: 3, type: 'page_view', description: 'Viewed Homepage', url: '/', timestamp: '8 minutes ago' },
    { id: 4, type: 'form_fill', description: 'Downloaded "Cloud Security" Whitepaper', timestamp: 'Yesterday' },
];
