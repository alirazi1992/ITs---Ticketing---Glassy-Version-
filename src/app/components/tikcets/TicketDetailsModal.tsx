'use client';

import { TicketWithNotes } from '@/app/types/ticket';

export default function TicketDetailsModal({
  ticket,
  onClose,
}: {
  ticket: TicketWithNotes;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white text-black p-6 rounded shadow-lg w-[90%] max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-lg"
        >
          ✕
        </button>
        <h2 className="text-xl font-bold mb-2">{ticket.title}</h2>
        <p className="mb-2">{ticket.description}</p>
        <p className="text-sm text-gray-600">وضعیت: {ticket.status}</p>
        <div className="mt-4">
          <h3 className="font-semibold">یادداشت‌ها:</h3>
          <ul className="list-disc ml-5 mt-1">
            {ticket.notes.map((note, idx) => (
              <li key={idx}>{note}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
