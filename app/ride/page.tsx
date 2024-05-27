import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
export default async function Page() {
  // const revenue = await fetchRevenue();

  // ...
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        HI
      </h1>
     
    </main>
  );
}