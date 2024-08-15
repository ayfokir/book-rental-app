'use client'
import Dashboard from '@/components/dashboard/Dashboard'
import { NotificationProvider } from '@/context/NotificationContext';
import { AuthProvider } from '@/context/AuthContext';
import { Provider } from 'react-redux';
import store from '@/redux/store/Store';
import { Notification } from '@/components/notification/Notification';
const page = () => {
  return (
    <Provider store={store}>
    <AuthProvider  >
      <NotificationProvider  >
        <Notification />
    < Dashboard  />
      </NotificationProvider>
      </AuthProvider>
    </Provider>
  )
}

export default page