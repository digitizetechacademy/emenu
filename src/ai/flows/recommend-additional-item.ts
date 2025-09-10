'use server';

/**
 * @fileOverview A flow to recommend an additional item based on the current order and popular items.
 *
 * - recommendAdditionalItem - A function that recommends an additional item.
 * - RecommendAdditionalItemInput - The input type for the recommendAdditionalItem function.
 * - RecommendAdditionalItemOutput - The return type for the recommendAdditionalItem function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendAdditionalItemInputSchema = z.object({
  currentOrder: z.array(z.string()).describe('The list of items currently in the order.'),
  popularItems: z.array(z.string()).describe('The list of popular items in the restaurant.'),
});
export type RecommendAdditionalItemInput = z.infer<
  typeof RecommendAdditionalItemInputSchema
>;

const RecommendAdditionalItemOutputSchema = z.object({
  recommendedItem: z.string().describe('The recommended additional item.'),
  reason: z.string().describe('The reason for recommending this item.'),
});
export type RecommendAdditionalItemOutput = z.infer<
  typeof RecommendAdditionalItemOutputSchema
>;

export async function recommendAdditionalItem(
  input: RecommendAdditionalItemInput
): Promise<RecommendAdditionalItemOutput> {
  return recommendAdditionalItemFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendAdditionalItemPrompt',
  input: {schema: RecommendAdditionalItemInputSchema},
  output: {schema: RecommendAdditionalItemOutputSchema},
  prompt: `You are a recommendation engine for a restaurant.

  Based on the customer's current order and the restaurant's popular items, recommend one additional item that the customer might enjoy.
  Explain your reasoning for the recommendation.

Current Order: {{currentOrder}}
Popular Items: {{popularItems}}`,
});

const recommendAdditionalItemFlow = ai.defineFlow(
  {
    name: 'recommendAdditionalItemFlow',
    inputSchema: RecommendAdditionalItemInputSchema,
    outputSchema: RecommendAdditionalItemOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
