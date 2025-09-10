'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import type { OrderItem } from '@/lib/types';
import { PartyPopper } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export function ConfirmationDetails() {
  const [order, setOrder] = useState<OrderItem[] | null>(null);
  const [total, setTotal] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const savedOrder = sessionStorage.getItem('submittedOrder');
    const savedTotal = sessionStorage.getItem('orderTotal');

    if (savedOrder && savedTotal) {
      setOrder(JSON.parse(savedOrder));
      setTotal(savedTotal);
      // Clean up session storage after reading
      sessionStorage.removeItem('submittedOrder');
      sessionStorage.removeItem('orderTotal');
    } else {
      // Redirect if no order is found, e.g., on page refresh
      router.replace('/');
    }
  }, [router]);

  if (!order || !total) {
    return (
        <div className="container mx-auto max-w-2xl px-4 py-12 text-center">
            <Skeleton className="h-12 w-1/2 mx-auto mb-4" />
            <Skeleton className="h-8 w-3/4 mx-auto mb-8" />
            <Card>
                <CardHeader>
                    <Skeleton className="h-8 w-1/4" />
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Skeleton className="h-6 w-full" />
                        <Skeleton className="h-6 w-5/6" />
                    </div>
                     <Skeleton className="h-10 w-full" />
                </CardContent>
            </Card>
        </div>
    );
  }

  const tax = parseFloat(total) * 0.08;
  const totalWithTax = parseFloat(total) + tax;

  return (
    <div className="container mx-auto max-w-2xl px-4 py-12 text-center">
      <div className="flex justify-center items-center mb-6">
        <PartyPopper className="h-16 w-16 text-primary" />
      </div>
      <h1 className="text-3xl md:text-4xl font-bold font-headline mb-2">
        Order Confirmed!
      </h1>
      <p className="text-muted-foreground text-lg mb-8">
        Your order has been sent to the kitchen. It will be ready in approximately{' '}
        <span className="font-bold text-foreground">15-20 minutes</span>.
      </p>

      <Card className="text-left">
        <CardHeader>
          <CardTitle className="font-headline">Order Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {order.map((item) => (
              <div key={item.id} className="flex justify-between items-start">
                <div>
                    <p className="font-semibold">
                    {item.quantity}x {item.name}
                    </p>
                    {item.specialInstructions && <p className="text-xs text-muted-foreground italic">"{item.specialInstructions}"</p>}
                </div>
                <p>${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
          <Separator className="my-4" />
          <div className="space-y-2">
            <div className="flex justify-between">
              <p>Subtotal</p>
              <p>${parseFloat(total).toFixed(2)}</p>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <p>Tax (8%)</p>
              <p>${tax.toFixed(2)}</p>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between font-bold text-lg">
              <p>Total</p>
              <p>${totalWithTax.toFixed(2)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Button
        size="lg"
        onClick={() => router.push('/')}
        className="mt-8"
      >
        Place Another Order
      </Button>
    </div>
  );
}
