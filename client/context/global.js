// hook for global context

// Path: client/context/global.js

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { messagesAdapter } from '../adapters/message';
import { getMessages, dimissMessage } from '../services/messages';

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children, globalData: initialGlobalData }) => {
  const [globalData, setGlobalData] = useState(initialGlobalData);
  const queryClient = useQueryClient();

  const { data: unreadMessages = [] } = useQuery(['messages'], () =>
    getMessages()
  );

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (unreadMessages.length) {
      setMessages([...messagesAdapter(unreadMessages)]);
    }
  }, [unreadMessages]);

  const mutation = useMutation(
    async (id) => {
      const data = await dimissMessage(id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('messages');
      },
    }
  );

  const dimissMessageHandler = (id) => {
    mutation.mutate(id);
    //const newMessages = messages.filter((message) => message.id !== id);
    //setMessages(newMessages);
  };

  return (
    <GlobalContext.Provider
      value={{
        messages,
        dimissMessage: dimissMessageHandler,
        globalData,
        setGlobalData,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
