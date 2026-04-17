import { Footer } from '@/components/common/Footer';
import { Header } from '@/components/common/Header';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#content"
        className="sr-only absolute left-4 top-4 z-60 rounded-full bg-white px-4 py-2 text-sm font-medium text-(--primary) shadow-lg focus:not-sr-only"
      >
        Skip to content
      </a>
      <Header />
      <main
        id="content"
        className="pt-20 md:pt-24"
      >
        {children}
      </main>
      <Footer />
    </>
  );
}
