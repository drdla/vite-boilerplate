import type {
  Contact,
  ContactsResponse,
  GetContactsParams,
} from '~/modules/contacts/types';
import { mockContacts } from './mockContacts';

export const departmentOptions = [
  {
    value: '',
    label: 'All Departments',
  },
  {
    value: 'Sales',
    label: 'Sales',
  },
  {
    value: 'Marketing',
    label: 'Marketing',
  },
  {
    value: 'Engineering',
    label: 'Engineering',
  },
  {
    value: 'HR',
    label: 'HR',
  },
  {
    value: 'Support',
    label: 'Support',
  },
];

export const statusOptions = [
  {
    value: '',
    label: 'All Status',
  },
  {
    value: 'true',
    label: 'Active',
  },
  {
    value: 'false',
    label: 'Inactive',
  },
];

/**
 * Get filtered contacts count - this is a mock API endpoint
 * @param params - Filter parameters
 * @returns Total count of contacts matching the filters
 */
export const getContactsCount = async (
  params?: Omit<GetContactsParams, 'page' | 'limit'>,
): Promise<number> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  return filterContacts(mockContacts, params).length;
};

/**
 * Get paginated and filtered contacts - this is a mock API endpoint
 * @param params - Pagination and filter parameters
 * @returns Paginated contacts response
 */
export const getContacts = async (
  params?: GetContactsParams,
): Promise<ContactsResponse> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const filteredContacts = filterContacts(mockContacts, params);
  const page = params?.page || 1;
  const limit = params?.limit || 5;
  const start = (page - 1) * limit;
  const end = start + limit;

  return {
    contacts: filteredContacts.slice(start, end),
    pagination: {
      total: filteredContacts.length,
      page,
      limit,
      totalPages: Math.ceil(filteredContacts.length / limit),
    },
  };
};

/**
 * Helper function to filter contacts based on parameters
 */
const filterContacts = (
  contacts: Contact[],
  params?: Partial<GetContactsParams>,
): Contact[] => {
  return contacts.filter((contact) => {
    // Search filter
    if (params?.search) {
      const searchLower = params.search.toLowerCase();
      const searchableText = `${contact.name} ${contact.email}`.toLowerCase();
      if (!searchableText.includes(searchLower)) {
        return false;
      }
    }

    // Department filter
    if (params?.department && contact.department !== params.department) {
      return false;
    }

    // Active status filter
    if (
      params?.isActive !== undefined &&
      contact.isActive !== params.isActive
    ) {
      return false;
    }

    return true;
  });
};
