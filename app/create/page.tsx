import Form from '@/app/ui/invoices/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomers } from '@/app/lib/data';
import EventFormComponent from '../ui/ride/EventForm';
 
export default async function Page() {
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Activity', href: '/' },
          {
            label: 'Create Activity',
            href: '/create',
            active: true,
          },
        ]}
      />
      <EventFormComponent></EventFormComponent>
    </main>
  );
}