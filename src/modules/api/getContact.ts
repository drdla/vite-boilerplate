/**
 * Fetches a contact by ID - this is just a mock fetcher
 *
 * @param id - The ID of the contact to fetch.
 * @returns A promise that resolves to the contact data as a string.
 */
export const getContact = async (id: string): Promise<string> =>
  await new Promise((resolve: (value: string) => void) =>
    setTimeout(() => resolve(`Contact ${id}`), 1000),
  );
