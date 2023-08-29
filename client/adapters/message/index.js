export const messageAdapter = ({ id, attributes = {} }) => {
  const { readed, message } = attributes;
  const { data: { attributes: { content, type, title } = {} } = {} } = message;
  console.log(message);
  return {
    id,
    readed,
    content,
    type,
    title,
  };
};

export const messagesAdapter = (messages) => {
  return messages.map((message) => messageAdapter({ ...message }));
};
