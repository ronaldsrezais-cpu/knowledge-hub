import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Home & Heart Digital Knowledge Hub',
  description: 'Open digital platform for inclusive family sport resources, learning, replication and the European Family Festival livestream.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
