export interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  department: string;
  isActive: boolean;
  avatarUrl: string;
  activeSinceDate: string;
  recentActivity: Activity[];
  statistics: ContactStatistics;
}

export interface Activity {
  id: number;
  type: 'call' | 'email' | 'meeting';
  date: string;
  description: string;
}

export interface ContactStatistics {
  totalCalls: number;
  totalEmails: number;
  totalMeetings: number;
  responseRate: number;
}

export interface GetContactsParams {
  page?: number;
  limit?: number;
  search?: string;
  countries?: string[];
  department?: string;
  isActive?: boolean;
}

export interface ContactsResponse {
  contacts: Contact[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
