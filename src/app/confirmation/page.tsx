import { AppHeader } from '@/components/app-header';
import { ConfirmationDetails } from '@/components/confirmation-details';

export default function ConfirmationPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <AppHeader />
      <main className="flex-1">
        <ConfirmationDetails />
      </main>
    </div>
  );
}
