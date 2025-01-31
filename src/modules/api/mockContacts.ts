import { Contact } from "../contacts";
import { Activity } from "../contacts/types";

// Generate mock contacts with realistic data
export const mockContacts: Contact[] = Array.from({ length: 40 }, (_, index) => ({
  id: index + 1,
  name: `${['John', 'Jane', 'Mike', 'Sarah', 'David', 'Emma', 'James', 'Emily'][index % 8]} ${
    [
      'Smith',
      'Johnson',
      'Williams',
      'Brown',
      'Jones',
      'Garcia',
      'Miller',
      'Davis',
    ][index % 8]
  }`,
  email: `${['john', 'jane', 'mike', 'sarah', 'david', 'emma', 'james', 'emily'][index % 8]}.${
    [
      'smith',
      'johnson',
      'williams',
      'brown',
      'jones',
      'garcia',
      'miller',
      'davis',
    ][index % 8]
  }@example.com`,
  phone: `+1${Math.floor(Math.random() * 9000000000) + 1000000000}`,
  address: `${index + 1} ${['Main', 'Oak', 'Maple', 'Cedar', 'Pine'][index % 5]} St`,
  city: ['New York', 'London', 'Berlin', 'Paris', 'Tokyo'][index % 5],
  country: ['USA', 'UK', 'Germany', 'France', 'Japan'][index % 5],
  department: ['Sales', 'Marketing', 'Engineering', 'Support', 'HR'][index % 5],
  isActive: index % 3 === 0,
  avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${index}`,
  activeSinceDate: new Date(2020, index % 12, (index % 28) + 1)
    .toISOString()
    .split('T')[0],
  recentActivity: [
    {
      id: 0,
      type: 'call',
      date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      description: 'Latest call with client',
    },
    {
      id: 1,
      type: 'email',
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      description: 'Email response to inquiry',
    },
    {
      id: 2,
      type: 'meeting',
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      description: 'Team meeting discussion',
    },
  ] satisfies Activity[],
  statistics: {
    totalCalls: Math.floor(Math.random() * 50) + 10,
    totalEmails: Math.floor(Math.random() * 100) + 20,
    totalMeetings: Math.floor(Math.random() * 30) + 5,
    responseRate: Math.floor(Math.random() * 40) + 60,
  },
}));
