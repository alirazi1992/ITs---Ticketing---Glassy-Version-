'use client';

import TicketFeed from '@/app/components/tikcets/TicketFeed';
import { TicketWithNotes } from '@/app/types/ticket';
import { useEffect, useState } from 'react';
import useWebSocket from '@/app/hooks/useWebSocket';
import ProtectedRoute from '@/app/components/auth/ProtectedRoute';

export default function DashboardPage() {
  const [tickets, setTickets] = useState<TicketWithNotes[]>([]);

  useWebSocket((message: TicketWithNotes) => {
    setTickets((prev) => [message, ...prev]);
  });

  useEffect(() => {
    console.log('WebSocket connected, waiting for new tickets...');
  }, []);

  return (
    <ProtectedRoute allowedRoles={['admin', 'engineer']}>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4 text-white">لیست تیکت‌ها</h1>
        <TicketFeed tickets={tickets} />
      </div>
    </ProtectedRoute>
  );
}
