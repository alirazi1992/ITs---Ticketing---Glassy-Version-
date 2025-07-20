'use client';

import { useRouter } from 'next/navigation';
import { useRole } from '@/app/context/RoleContext';

export default function LoginPage() {
  const { setRole } = useRole();
  const router = useRouter();

  const handleSelect = (role: 'client' | 'engineer' | 'admin') => {
    setRole(role);
    router.push(`/dashboard/${role}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-2xl mb-4">ورود به سامانه پشتیبانی</h1>
      <div className="space-y-3">
        <button onClick={() => handleSelect('client')} className="btn-glass">ورود کاربر</button>
        <button onClick={() => handleSelect('engineer')} className="btn-glass">ورود کارشناس</button>
        <button onClick={() => handleSelect('admin')} className="btn-glass">ورود مدیر</button>
      </div>
    </div>
  );
}
