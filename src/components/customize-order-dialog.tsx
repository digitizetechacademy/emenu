'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { MenuItem } from '@/lib/types';
import { useOrder } from '@/context/order-provider';
import { useToast } from '@/hooks/use-toast';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Minus, Plus } from 'lucide-react';

interface CustomizeOrderDialogProps {
  item: MenuItem;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function CustomizeOrderDialog({
  item,
  isOpen,
  setIsOpen,
}: CustomizeOrderDialogProps) {
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const { addItem } = useOrder();
  const { toast } = useToast();
  const placeholder = PlaceHolderImages.find((p) => p.id === item.imageId);

  const handleAddToOrder = () => {
    addItem(item, quantity, specialInstructions);
    toast({
      title: 'Added to Order',
      description: `${quantity}x ${item.name} has been added to your order.`,
    });
    setIsOpen(false);
    // Reset state for next time
    setQuantity(1);
    setSpecialInstructions('');
  };

  const handleQuantityChange = (amount: number) => {
    setQuantity((prev) => Math.max(1, prev + amount));
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          {placeholder && (
             <div className="relative aspect-[16/9] w-full overflow-hidden rounded-t-lg mb-4">
                <Image
                    src={placeholder.imageUrl}
                    alt={item.name}
                    fill
                    className="object-cover"
                    data-ai-hint={placeholder.imageHint}
                />
            </div>
          )}
          <DialogTitle className="font-headline text-2xl">{item.name}</DialogTitle>
          <DialogDescription>{item.description}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="quantity" className="text-right">
              Quantity
            </Label>
            <div className="col-span-3 flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Input
                id="quantity"
                type="number"
                value={quantity}
                readOnly
                className="w-16 text-center"
              />
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => handleQuantityChange(1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="instructions" className="text-right self-start pt-2">
              Instructions
            </Label>
            <Textarea
              id="instructions"
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="Any special requests? (e.g., no onions)"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="ghost"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
          <Button type="submit" onClick={handleAddToOrder}>
            Add for ${(item.price * quantity).toFixed(2)}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
