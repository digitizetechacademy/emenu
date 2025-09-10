'use server';

import { recommendAdditionalItem } from '@/ai/flows/recommend-additional-item';
import { POPULAR_ITEMS } from '@/lib/data';

type RecommendationState = {
  status: 'initial' | 'loading' | 'success' | 'error';
  data: {
    recommendedItem: string;
    reason: string;
  } | null;
  error: string | null;
};

export async function getAIRecommendation(
  currentState: RecommendationState,
  currentOrder: string[]
): Promise<RecommendationState> {
  if (currentOrder.length === 0) {
    return {
      status: 'error',
      data: null,
      error: 'Your order is empty. Add items to get a recommendation.',
    };
  }

  try {
    const recommendation = await recommendAdditionalItem({
      currentOrder,
      popularItems: POPULAR_ITEMS,
    });
    return { status: 'success', data: recommendation, error: null };
  } catch (e) {
    console.error(e);
    return {
      status: 'error',
      data: null,
      error: 'Could not get a recommendation at this time. Please try again.',
    };
  }
}
