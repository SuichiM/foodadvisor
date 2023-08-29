import { getStrapiURL } from '../../utils';

export async function getMessages() {
  const options = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
    },
  };

  const res = await fetch(
    getStrapiURL(`/messages-users?populate=*&filters[readed][$eq]=false`),
    options
  );
  const { data } = await res.json();

  return data;
}

export const dimissMessage = async (id) => {
  // Send a request to the API to update the message as readed
  const res = await fetch(getStrapiURL(`/messages-users/${id}`), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
    },
    body: JSON.stringify({ data: { readed: true } }),
  });

  const { data } = await res.json();

  return data;
};

//
// export async function getMessagesUsers() {
//   const options = {
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
//     },
//   };
//
//   const res = await fetch(
//     getStrapiURL(`/messages-users?populate=*&filters[readed][$eq]=false`),
//     options
//   );
//   const { data } = await res.json();
//
//   return data;
// }
//
