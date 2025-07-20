'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Ticket } from '@/app/types/ticket';

const dummyTickets: Ticket[] = [
  {
    id: '1',
    title: 'مشکل نرم‌افزار',
    type: 'software',
    status: 'pending',
    createdAt: '2025-07-20T12:00:00Z',
  },
  {
    id: '2',
    title: 'خرابی سخت‌افزار',
    type: 'hardware',
    status: 'in_progress',
    createdAt: '2025-07-19T09:30:00Z',
  },
  {
    id: '3',
    title: 'عدم اتصال به شبکه',
    type: 'network',
    status: 'resolved',
    createdAt: '2025-07-18T14:45:00Z',
  },
];

const statusColors = {
  pending: 'bg-yellow-500',
  in_progress: 'bg-blue-500',
  resolved: 'bg-green-600',
};

export default function AdminPage() {
  const [tickets] = useState<Ticket[]>(dummyTickets);

  return (
    <div className="p-6 text-white space-y-6">
      <h1 className="text-2xl font-bold">داشبورد ادمین - لیست تیکت‌ها</h1>

      {tickets.map((ticket) => (
        <Link key={ticket.id} href={`/admin/tickets/${ticket.id}`}>
          <div className="cursor-pointer p-4 rounded-xl bg-white/10 backdrop-blur-md hover:bg-white/20 transition flex justify-between items-center">
            <div>
              <h3 className="font-bold">{ticket.title}</h3>
              <p className="text-sm text-gray-300">{ticket.type}</p>
            </div>
            <span className={`text-xs px-3 py-1 rounded-full ${statusColors[ticket.status]}`}>
              {ticket.status === 'pending'
                ? 'در انتظار'
                : ticket.status === 'in_progress'
                ? 'در حال بررسی'
                : 'حل شده'}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
