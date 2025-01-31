/**
 * Fetches a contact by ID - this is just a mock fetcher
 *
 * @param id - The ID of the contact to fetch.
 * @returns A promise that resolves to the contact data.
 */
export const getContact = async (id: string) =>
  await new Promise((resolve: (value: string) => void) =>
    setTimeout(
      () =>
        resolve({
          id: 1,
          name: 'John Doe',
          email: 'john.doe@example.com',
          phone: '+1234567890',
          address: '123 Main St, Anytown, USA',
          city: 'Anytown',
        }),
      600,
    ),
  );
