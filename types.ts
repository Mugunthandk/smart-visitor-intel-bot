
export interface Visitor {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  location: string;
  ip: string;
  firstSeen: string;
  visits: number;
  social: {
    linkedin: string;
    twitter: string;
  };
}

export interface Company {
  name: string;
  domain: string;
  logoUrl: string;
  industry: string;
  employees: string;
  revenue: string;
  description: string;
}

export interface ChatMessage {
  id: number;
  sender: 'visitor' | 'bot' | 'operator';
  text: string;
  timestamp: string;
}

export interface ActivityLog {
  id: number;
  type: 'page_view' | 'form_fill' | 'button_click';
  description: string;
  timestamp: string;
  url?: string;
}
