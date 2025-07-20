'use client';

import { useRole } from '@/app/context/RoleContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedRoute({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles: string[]; // e.g., ['admin', 'engineer']
}) {
  const { role } = useRole();
  const router = useRouter();

  useEffect(() => {
    if (!role) return; // You can show loading state if needed
    if (!allowedRoles.includes(role)) {
      router.replace('/unauthorized'); // You can create a better unauthorized page later
    }
  }, [role, allowedRoles, router]);

  if (!role) {
    return <div className="text-white p-6">در حال بررسی دسترسی...</div>;
  }

  return <>{children}</>;
}
