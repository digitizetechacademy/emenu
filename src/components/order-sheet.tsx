'use client';

import { useRouter } from 'next/navigation';
import { useOrder } from '@/context/order-provider';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Minus, Plus, Trash2, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { AIRecommendation } from './ai-recommendation';
import { useToast } from '@/hooks/use-toast';

export function OrderSheet({ children }: { children: React.ReactNode }) {
  const { items, updateItemQuantity, totalPrice, clearOrder } = useOrder();
  const router = useRouter();
  const { toast } = useToast();

  const handleOrderSubmit = () => {
    if (items.length === 0) {
      toast({
        title: 'Empty Order',
        description: 'Please add items to your order before submitting.',
        variant: 'destructive'
      });
      return;
    }
    // In a real app, you'd send this to a backend.
    // For this demo, we'll store it in session storage for the confirmation page.
    sessionStorage.setItem('submittedOrder', JSON.stringify(items));
    sessionStorage.setItem('orderTotal', totalPrice.toFixed(2));
    
    // Clear the current order
    clearOrder();

    // Navigate to confirmation page
    router.push('/confirmation');
  };

  const tax = totalPrice * 0.08;
  const totalWithTax = totalPrice + tax;

  return (
    <Sheet>
      {children}
      <SheetContent className="flex w-full flex-col sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="font-headline text-2xl">Your Order</SheetTitle>
          <SheetDescription>
            Review your items and proceed to submit your order.
          </SheetDescription>
        </SheetHeader>
        <Separator />
        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
            <ShoppingCart className="h-16 w-16 text-muted-foreground" />
            <p className="text-muted-foreground">Your order is empty.</p>
            <p className="text-sm text-muted-foreground">Add items from the menu to get started.</p>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 -mx-6">
              <div className="px-6">
                {items.map((item) => {
                  const placeholder = PlaceHolderImages.find((p) => p.id === item.imageId);
                  return (
                    <div key={item.id} className="flex items-start gap-4 py-4">
                      {placeholder && (
                        <Image
                          src={placeholder.imageUrl}
                          alt={item.name}
                          width={64}
                          height={64}
                          className="rounded-md object-cover"
                          data-ai-hint={placeholder.imageHint}
                        />
                      )}
                      <div className="flex-1">
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          ${item.price.toFixed(2)}
                        </p>
                        {item.specialInstructions && <p className="text-xs text-muted-foreground italic mt-1">"{item.specialInstructions}"</p>}
                        <div className="flex items-center gap-2 mt-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <Input
                            type="number"
                            value={item.quantity}
                            readOnly
                            className="h-7 w-12 text-center"
                          />
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground mt-2"
                          onClick={() => updateItemQuantity(item.id, 0)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
            <Separator className="my-4" />
            <AIRecommendation />
          </>
        )}
        <SheetFooter className="mt-auto">
          <div className="w-full space-y-4">
             <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                    <span>Tax (8%)</span>
                    <span>${tax.toFixed(2)}</span>
                </div>
                <Separator className="my-2"/>
                 <div className="flex justify-between font-bold text-base">
                    <span>Total</span>
                    <span>${totalWithTax.toFixed(2)}</span>
                </div>
             </div>
            <Button
              size="lg"
              className="w-full"
              onClick={handleOrderSubmit}
              disabled={items.length === 0}
            >
              Submit Order
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
