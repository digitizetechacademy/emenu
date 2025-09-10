'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { MenuItem } from '@/lib/types';
import { CustomizeOrderDialog } from './customize-order-dialog';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Plus } from 'lucide-react';

interface MenuItemCardProps {
  item: MenuItem;
}

export function MenuItemCard({ item }: MenuItemCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const placeholder = PlaceHolderImages.find((p) => p.id === item.imageId);

  return (
    <>
      <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
        <CardHeader className="p-0">
          {placeholder && (
            <div className="aspect-[4/3] relative">
              <Image
                src={placeholder.imageUrl}
                alt={item.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                data-ai-hint={placeholder.imageHint}
              />
            </div>
          )}
        </CardHeader>
        <CardContent className="flex-1 p-4">
          <CardTitle className="text-xl mb-2 font-headline">{item.name}</CardTitle>
          <CardDescription>{item.description}</CardDescription>
        </CardContent>
        <CardFooter className="p-4 flex justify-between items-center">
          <p className="text-lg font-bold text-primary">
            ${item.price.toFixed(2)}
          </p>
          <Button onClick={() => setIsDialogOpen(true)} aria-label={`Add ${item.name} to order`}>
            <Plus className="mr-2 h-4 w-4" /> Add
          </Button>
        </CardFooter>
      </Card>
      <CustomizeOrderDialog
        item={item}
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
      />
    </>
  );
}
