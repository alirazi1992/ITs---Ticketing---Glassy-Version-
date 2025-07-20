'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import { TicketWithNotes, TicketStatus } from '@/app/types/ticket';

const statusOptions: TicketStatus[] = ['pending', 'in_progress', 'resolved'];
const engineers = ['مهندس کریمی', 'مهندس رضایی', 'مهندس اسدی', 'بدون مسئول'];

export default function AdminTicketDetailPage() {
  const { id } = useParams<{ id: string }>();

  const [ticket, setTicket] = useState<TicketWithNotes>({
    id: id || '',
    title: 'جزئیات تیکت',
    description: 'این یک تیکت آزمایشی است.',
    type: 'software',
    status: 'pending',
    createdAt: new Date().toISOString(),
    notes: ['در حال بررسی'],
    assignedTo: 'بدون مسئول',
  });

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as TicketStatus;
    setTicket((prev) => ({ ...prev, status: newStatus }));
  };

  const handleEngineerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newEngineer = e.target.value;
    setTicket((prev) => ({ ...prev, assignedTo: newEngineer }));
  };

  return (
    <div className="p-6 text-white space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-2">{ticket.title}</h2>
        <p className="mb-2">{ticket.description}</p>
      </div>

      <div>
        <label className="block mb-1 font-medium">وضعیت تیکت:</label>
        <select
          value={ticket.status}
          onChange={handleStatusChange}
          className="bg-white/10 text-white px-3 py-2 rounded w-full max-w-xs"
        >
          {statusOptions.map((status) => (
            <option key={status} value={status} className="text-black">
              {status === 'pending'
                ? 'در انتظار'
                : status === 'in_progress'
                ? 'در حال بررسی'
                : 'حل شده'}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-1 font-medium">اختصاص مسئول رسیدگی:</label>
        <select
          value={ticket.assignedTo}
          onChange={handleEngineerChange}
          className="bg-white/10 text-white px-3 py-2 rounded w-full max-w-xs"
        >
          {engineers.map((engineer) => (
            <option key={engineer} value={engineer} className="text-black">
              {engineer}
            </option>
          ))}
        </select>
      </div>

      <div>
        <h3 className="font-semibold mb-1">یادداشت‌ها:</h3>
        <ul className="list-disc ml-6 space-y-1">
          {ticket.notes.map((note, index) => (
            <li key={index}>{note}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
