import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import EventList from '../ui/invoices/eventList';
export default async function Page() {
  // const revenue = await fetchRevenue();

  // ...
  return (
    <main>
    <EventList/>
  </main>
  );
}