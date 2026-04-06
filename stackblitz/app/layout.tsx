import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Pasquale Imparato',
  description: 'Portfolio Personale di Pasquale Imparato',
  openGraph: {
    images: [
      {
        url: 'https://www.dropbox.com/scl/fi/sp1hn08ryozihyjqd8tnm/Avatar.png?rlkey=zhtov2tq3tpojnsm0740n68tw&st=b2zmkq2w&dl=0',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: [
      {
        url: 'https://www.dropbox.com/scl/fi/sp1hn08ryozihyjqd8tnm/Avatar.png?rlkey=zhtov2tq3tpojnsm0740n68tw&st=b2zmkq2w&dl=0',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
