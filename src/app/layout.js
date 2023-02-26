import Nav from '@/components/nav';
import './globals.css';

export const metadata = {
  title: 'Dataphyte election watch',
  description: 'Dataphyte election watch',
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
