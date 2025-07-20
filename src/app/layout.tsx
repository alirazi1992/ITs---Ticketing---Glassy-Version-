import './globals.css';
import { UserSettingsProvider } from '@/app/context/UserSettingsContext';
import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'ITS Support Ticketing',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa">
      <body>
        <UserSettingsProvider>
          {children}
          <Toaster position="top-center" reverseOrder={false} />
        </UserSettingsProvider>
      </body>
    </html>
  );
}
