// 'use client'

// import React, { createContext, useState, useEffect, ReactNode } from "react";

// interface NotificationData {
//     message: string;
//     status: string;
// }

// interface ContextType {
//     notification: NotificationData | null;
//     showNotification: (notificationData: NotificationData) => void;
//     hideNotification: () => void;
// }

// const initialContext: ContextType = {
//     notification: null,
//     showNotification: () => {},
//     hideNotification: () => {}
// };

// const NotificationContext = createContext<ContextType>(initialContext);

// export default NotificationContext;

// interface NotificationProviderProps {
//     children: ReactNode;
// }

// export function NotificationContextProvider(props: NotificationProviderProps) {
//     const [activeNotification, setActiveNotification] = useState<NotificationData | null>(null);
//     function showNotificationHandler(notificationData: NotificationData) {
//         console.log("notificationData:", notificationData)
//         setActiveNotification(notificationData);
//     }
//     function hideNotificationHandler() {
//         setActiveNotification(null);
//     }
//     const context: ContextType = {
//         notification: activeNotification,
//         showNotification: showNotificationHandler,
//         hideNotification: hideNotificationHandler
//     };
//     return (
//         <NotificationContext.Provider value={context}>
//             {props.children}
//         </NotificationContext.Provider>
//     );
// }

'use client'
// src/context/NotificationContext.tsx
import React, { createContext, useState, ReactNode, useContext } from 'react';

interface NotificationContextType {
  notification: { status: string; message: string };
  setNotification: (notification: { status: string; message: string }) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [notification, setNotification] = useState<{ status: string; message: string }>({
    status: 'none',
    message: '',
    });

    return (
    <NotificationContext.Provider value={{ notification, setNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
