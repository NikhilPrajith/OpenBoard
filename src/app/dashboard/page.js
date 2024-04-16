'use client'
import DashboardLayout from '@/components/Dashboard/DashboardLayout';
import React, { useEffect, useContext, useState } from 'react';
import useAuth from '@/context/Authentication/AuthProvider';
import { useRouter } from 'next/navigation';

export default function ProtectedPage() {
  const { user, initialLoading } = useAuth();
  const router = useRouter();
  const [showPage, setShowPage] = useState(null);

  useEffect(() => {
    if (initialLoading) {
      return;
    }
    if (!user) {
      router.push('/');
    } else {
      setShowPage(true);
    }
  }, [user, initialLoading, router]);

  return (
    <div>
      {showPage &&
      <DashboardLayout>
        {/* Content of the page */}
        <p>This is a protected page content visible only to authenticated users.</p>
      </DashboardLayout>}
    </div>
  );
}
