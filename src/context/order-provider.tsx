'use client';

import type { OrderItem, MenuItem } from '@/lib/types';
import React, { createContext, useContext, useState, useMemo } from 'react';

interface OrderContextType {
  items: OrderItem[];
  addItem: (item: MenuItem, quantity: number, specialInstructions: string) => void;
  updateItemQuantity: (itemId: string, quantity: number) => void;
  removeItem: (itemId: string) => void;
  clearOrder: () => void;
  totalPrice: number;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<OrderItem[]>([]);

  const addItem = (
    item: MenuItem,
    quantity: number,
    specialInstructions: string
  ) => {
    setItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (i) =>
          i.id === item.id && i.specialInstructions === specialInstructions
      );
      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        return updatedItems;
      } else {
        return [...prevItems, { ...item, quantity, specialInstructions }];
      }
    });
  };

  const updateItemQuantity = (itemId: string, quantity: number) => {
    setItems((prevItems) => {
      return prevItems
        .map((item) => {
          if (item.id === itemId) {
            return { ...item, quantity };
          }
          return item;
        })
        .filter((item) => item.quantity > 0);
    });
  };

  const removeItem = (itemId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };
  
  const clearOrder = () => {
    setItems([]);
  };

  const totalPrice = useMemo(() => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [items]);

  const value = useMemo(
    () => ({
      items,
      addItem,
      updateItemQuantity,
      removeItem,
      clearOrder,
      totalPrice,
    }),
    [items, totalPrice]
  );

  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
}
