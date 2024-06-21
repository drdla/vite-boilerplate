import { useQuery } from '@tanstack/react-query';
import type { QueryClient } from '@tanstack/react-query';
import { useLoaderData, useParams } from 'react-router-dom';

import { getContact } from '~/modules/api';

const contactDetailQuery = (id: string) => ({
  queryKey: ['contacts', 'detail', id],
  queryFn: async () => getContact(id),
});

export const contactLoader =
  (queryClient: QueryClient) =>
  async ({ params }: { params: { contactId: string } }) => {
    const query = contactDetailQuery(params.contactId);

    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };

function Contact() {
  const params = useParams();
  const initialData = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof loader>>
  >;

  const { data: contact } = useQuery({
    ...contactDetailQuery(params?.contactId ?? ''),
    initialData,
  });

  return <div>- {contact}</div>;
}

export default Contact;
