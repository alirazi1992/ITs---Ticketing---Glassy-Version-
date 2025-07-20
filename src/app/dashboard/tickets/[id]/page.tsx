'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import useWebSocket from '@/app/hooks/useWebSocket';
import { TicketWithNotes } from '@/app/types/ticket';

export default function TicketDetailPage() {
  const params = useParams();
  const id = typeof params?.id === 'string' ? params.id : '';

  const [ticket, setTicket] = useState<TicketWithNotes | null>(null);

  // Only receive messages – removed unused sendMessage
  useWebSocket((message: TicketWithNotes) => {
    if (message.id === id) {
      setTicket((prevTicket) => ({
        ...prevTicket!,
        notes: [message.notes[0], ...(prevTicket?.notes || [])],
      }));
    }
  });

  useEffect(() => {
    // Simulated ticket fetch (replace with real API call)
    const fetchTicket = async () => {
      const dummyTicket: TicketWithNotes = {
        id,
        title: 'جزئیات تیکت',
        description: 'در حال بارگیری...',
        status: 'pending',
        createdAt: new Date().toISOString(),
        type: 'software',
        softwareName: 'نرم‌افزار تست',
        version: '1.0.0',
        notes: [],
      };
      setTicket(dummyTicket);
    };

    fetchTicket();
  }, [id]);

  if (!ticket) {
    return <div className="text-white">در حال بارگیری تیکت...</div>;
  }

  return (
    <div className="p-6 text-white">
      <h2 className="text-xl font-bold mb-2">{ticket.title}</h2>
      <p className="mb-2">{ticket.description}</p>

      <div className="mt-4">
        <h3 className="font-semibold">یادداشت‌ها:</h3>
        <ul className="list-disc ml-6">
          {ticket.notes.map((note, index) => (
            <li key={index}>{note}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
