import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Sajon® — Independent Graphic Designer',
  description: 'Independent graphic designer building thoughtful identities, visual systems and digital experiences.',
  metadataBase: new URL('https://example.com'),
  openGraph: { title: 'Sajon® — Independent Graphic Designer', description: 'Thoughtful identities. Distinctive visuals. Made to matter.', type: 'website' }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
