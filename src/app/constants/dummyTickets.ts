import { Ticket } from '@/app/types/ticket';

export const dummyTickets: Ticket[] = [
  {
    id: 't1',
    title: 'مشکل نرم‌افزار حسابداری',
    type: 'software',
    status: 'in_progress',
    createdAt: new Date().toISOString(),
  },
  {
    id: 't2',
    title: 'خرابی صفحه‌نمایش لپ‌تاپ',
    type: 'hardware',
    status: 'pending',
    createdAt: new Date().toISOString(),
  },
  {
    id: 't3',
    title: 'قطعی شبکه طبقه دوم',
    type: 'network',
    status: 'resolved',
    createdAt: new Date().toISOString(),
  },
];
