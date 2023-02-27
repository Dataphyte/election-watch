import Nav from '@/components/nav';
import './globals.css';

export const metadata = {
  title: 'Election Result Watch',
  description: 'Election Result Watch',
  icons: { icon: [{ url: '/favicon.png' }] },
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className='bg-gray-100'>
        <Nav />
        {children}
      </body>
    </html>
  );
}
