import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { GoogleAnalytics } from '@next/third-parties/google'
import { Metadata } from 'next';
import SideNav from './ui/dashboard/sidenav';
export const metadata: Metadata = {
  title: 'Kudo Squad',
  description: 'Organize cycling event in GTA area',
  // metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <GoogleAnalytics gaId="G-0K53J8VR1L" />
      <body className={`${inter.className} antialiased`}> <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
        <div className="w-full flex-none md:w-64">
          <SideNav />
        </div>
        <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
      </div></body>
    </html>
  );
}