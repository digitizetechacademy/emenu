'use client';

import { useOrder } from '@/context/order-provider';
import { Badge } from '@/components/ui/badge';

export function OrderBadge() {
  const { items } = useOrder();
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  if (itemCount === 0) return null;

  return (
    <Badge
      variant="destructive"
      className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full p-0"
    >
      {itemCount}
    </Badge>
  );
}
