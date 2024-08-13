'use client'
import Dashboard from '@/components/dashboard/Dashboard'
import { NotificationProvider } from '@/context/NotificationContext';
import { AuthProvider } from '@/context/AuthContext';
import { Provider } from 'react-redux';
import store from '@/redux/store/Store';
const page = () => {
  return (
    <Provider store={store}>
    <AuthProvider  >
      <NotificationProvider  >
    < Dashboard  />
      </NotificationProvider>
      </AuthProvider>
    </Provider>
  )
}

export default page