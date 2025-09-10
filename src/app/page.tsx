import Image from 'next/image';
import { AppHeader } from '@/components/app-header';
import { MenuItemCard } from '@/components/menu-item-card';
import { OrderSheet } from '@/components/order-sheet';
import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';
import { MENU_DATA, RESTAURANT_INFO } from '@/lib/data';
import { ShoppingCart } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { OrderBadge } from '@/components/order-badge';

export default function Home() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'restaurant-interior');

  return (
    <div className="flex min-h-screen w-full flex-col">
      <AppHeader />
      <main className="flex-1">
        <section className="relative w-full h-[40vh] md:h-[50vh]">
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover"
              data-ai-hint={heroImage.imageHint}
              priority
            />
          )}
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center text-white p-4">
            <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tight">
              {RESTAURANT_INFO.name}
            </h1>
            <p className="mt-2 text-lg md:text-xl max-w-2xl">
              {RESTAURANT_INFO.description}
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8 md:py-12">
          {MENU_DATA.map((category) => (
            <section key={category.name} className="mb-12">
              <h2 className="text-3xl font-bold font-headline mb-6 border-b-2 border-primary pb-2">
                {category.name}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {category.items.map((item) => (
                  <MenuItemCard key={item.id} item={item} />
                ))}
              </div>
            </section>
          ))}
        </div>

        <section className="bg-secondary/50 py-12">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-2xl font-bold font-headline mb-2">
              Our Information
            </h3>
            <p>{RESTAURANT_INFO.address}</p>
            <p>{RESTAURANT_INFO.contact}</p>
            <p>Hours: {RESTAURANT_INFO.hours}</p>
          </div>
        </section>
      </main>
      <OrderSheet>
        <SheetTrigger asChild>
          <div className="fixed bottom-4 right-4 z-50">
            <Button
              size="lg"
              className="relative rounded-full shadow-2xl h-16 w-16"
              aria-label="View Order"
            >
              <ShoppingCart className="h-7 w-7" />
              <OrderBadge />
            </Button>
          </div>
        </SheetTrigger>
      </OrderSheet>
    </div>
  );
}
