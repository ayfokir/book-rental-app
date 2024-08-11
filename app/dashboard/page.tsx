'use client'
import Dashboard from '@/components/dashboard/Dashboard'
import { NotificationProvider } from '@/context/NotificationContext';
import { AuthProvider } from '@/context/AuthContext';
const page = () => {
  return (
    <>
    <AuthProvider  >
      <NotificationProvider  >
    < Dashboard  />
      </NotificationProvider>
      </AuthProvider>
    </>
  )
}

export default page