'use client';

import { useTransition } from 'react';
import { useFormState } from 'react-dom';
import { useOrder } from '@/context/order-provider';
import { getAIRecommendation } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ChefHat, Lightbulb, Plus, Sparkles } from 'lucide-react';
import { ALL_MENU_ITEMS } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';

const initialState = {
  status: 'initial' as const,
  data: null,
  error: null,
};

export function AIRecommendation() {
  const { items, addItem } = useOrder();
  const [state, formAction] = useFormState(getAIRecommendation, initialState);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleGetRecommendation = () => {
    const currentOrderNames = items.map((item) => item.name);
    startTransition(() => {
      formAction(currentOrderNames);
    });
  };

  const handleAddRecommendation = () => {
    if (state.status === 'success' && state.data) {
      const recommendedItemData = ALL_MENU_ITEMS.find(
        (item) => item.name === state.data.recommendedItem
      );

      if (recommendedItemData) {
        addItem(recommendedItemData, 1, '');
        toast({
          title: 'Added to Order!',
          description: `Enjoy your ${recommendedItemData.name}.`,
        });
      } else {
        toast({
            title: "Item not found",
            description: `Could not find "${state.data.recommendedItem}" in the menu.`,
            variant: "destructive"
        })
      }
    }
  };

  return (
    <div className="space-y-4">
      <Button
        variant="outline"
        className="w-full border-accent text-accent-foreground hover:bg-accent/10 hover:text-accent-foreground border-dashed"
        onClick={handleGetRecommendation}
        disabled={isPending || items.length === 0}
      >
        {isPending ? (
          'Thinking...'
        ) : (
          <>
            <Lightbulb className="mr-2 h-4 w-4" /> Get a Recommendation
          </>
        )}
      </Button>

      {state.status === 'error' && state.error && (
        <Alert variant="destructive">
          <AlertTitle>Oops!</AlertTitle>
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}

      {state.status === 'success' && state.data && (
        <Alert className="bg-accent/10 border-accent">
          <ChefHat className="h-4 w-4 !text-accent-foreground" />
          <AlertTitle className="font-headline text-accent-foreground flex items-center gap-2">
            <Sparkles className="h-4 w-4"/> AI Suggestion
          </AlertTitle>
          <AlertDescription className="text-accent-foreground/90 mt-2">
            <p className="font-semibold">
              How about adding a <span className="font-bold">{state.data.recommendedItem}</span>?
            </p>
            <p className="text-xs mt-1">"{state.data.reason}"</p>
          </AlertDescription>
          <Button
            size="sm"
            className="mt-4 w-full"
            variant="default"
            onClick={handleAddRecommendation}
          >
            <Plus className="mr-2 h-4 w-4" /> Add to Order
          </Button>
        </Alert>
      )}
    </div>
  );
}
