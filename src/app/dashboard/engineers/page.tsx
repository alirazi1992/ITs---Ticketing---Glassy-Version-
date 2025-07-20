'use client';
import { useRole } from '@/app/context/RoleContext';

export default function EngineerDashboard() {
  const { role } = useRole();

  return (
    <div className="p-6 text-white">
      <h1>داشبورد کارشناس</h1>
      <p>نقش شما: {role}</p>
    </div>
  );
}
