'use client';

import { Ticket } from '@/app/types/ticket';
import { useState } from 'react';
import Link from 'next/link';
import clsx from 'clsx';

type Props = {
  tickets: Ticket[];
  basePath?: 'dashboard/ticket' | 'admin/tickets'; // Default is 'dashboard/ticket'
};

const statusColors = {
  pending: 'bg-yellow-500',
  in_progress: 'bg-blue-500',
  resolved: 'bg-green-600',
};

const statusOptions = ['all', 'pending', 'in_progress', 'resolved'] as const;
type FilterType = typeof statusOptions[number];

export default function TicketFeed({ tickets, basePath = 'dashboard/ticket' }: Props) {
  const [filter, setFilter] = useState<FilterType>('all');

  const filtered = filter === 'all' ? tickets : tickets.filter((t) => t.status === filter);

  return (
    <div className="p-4 max-w-4xl mx-auto space-y-4">
      <h2 className="text-xl font-bold text-white">تیکت‌های ثبت‌شده</h2>

      <div className="flex gap-2 flex-wrap mb-4">
        {statusOptions.map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={clsx(
              'px-3 py-1 rounded text-sm',
              filter === status ? 'bg-white text-black' : 'bg-white/10 hover:bg-white/20 text-white'
            )}
          >
            {status === 'all'
              ? 'همه'
              : status === 'pending'
              ? 'در انتظار'
              : status === 'in_progress'
              ? 'در حال بررسی'
              : 'حل شده'}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((ticket) => (
          <Link key={ticket.id} href={`/${basePath}/${ticket.id}`}>
            <div className="cursor-pointer p-4 rounded-xl bg-white/10 backdrop-blur-md text-white flex justify-between items-center hover:bg-white/20 transition">
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
    </div>
  );
}
