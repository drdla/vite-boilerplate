import { useState } from 'react';
import Select from 'react-select';
import { useQueries } from '@tanstack/react-query';

import { departmentOptions, getContacts, getContactsCount, statusOptions } from '~/modules/api/getContacts';

import { ContactDetailsModal } from './ContactDetailsModal';
import type { Contact } from './types';

interface FilterState {
  search: string;
  department: string;
  isActive: boolean | undefined;
}

export const Contacts = () => {

  return (
    <div className="p-4">
      {/* Filters */}
      <div className="">
      </div>

      {/* Contact Grid */}
      <div className="">
      </div>

      {/* Pagination */}
      <div className="">
        <div>
          Showing contacts X - Y of Z
        </div>
        <div className="">
          <button
            className="px-4 py-2 border rounded-lg disabled:opacity-50"
          >
            Previous
          </button>
          <button
            className="px-4 py-2 border rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* Contact Details Modal */}
      <ContactDetailsModal
        contact={null}
        isOpen={false}
        onClose={() => {}}
      />
    </div>
  );
};
