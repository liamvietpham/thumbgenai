import { AccountSettingsCard } from '@/components/profile/AccountSettingsCard';
import { BillingHistory } from '@/components/profile/BillingHistory';
import { CreationsSection } from '@/components/profile/CreationsSection';
import { PreferencesCard } from '@/components/profile/PreferencesCard';
import { MY_ITEMS } from '@/components/profile/profile-data';
import { StatsSection } from '@/components/profile/StatsSection';
import { UsageHistory } from '@/components/profile/UsageHistory';

export default function ProfilePage() {
  return (
    <div className="mx-auto max-w-7xl px-6 pb-16 md:px-12 md:pb-24">

      {/* Header */}
      <section className="mb-12 pt-10">
        <h1 className="font-headline mb-3 text-5xl font-bold tracking-tight text-(--on-surface)">
          Account Studio
        </h1>
        <p className="max-w-2xl text-lg font-medium text-(--on-surface-variant)">
          Manage your preferences, security, and AI integrations in your private creator workspace.
        </p>
      </section>

      {/* Settings grid */}
      <section className="mb-16 grid grid-cols-1 items-start gap-8 lg:grid-cols-[1.5fr_1fr]">
        <AccountSettingsCard />
        <PreferencesCard />
      </section>

      <StatsSection />

      {/* History */}
      <section className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <BillingHistory />
        <UsageHistory />
      </section>

      <CreationsSection items={MY_ITEMS} />

    </div>
  );
}
