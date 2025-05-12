
import { riceItems } from './rice-items';
import { soupItems } from './soup-items';
import { swallowItems } from './swallow-items';
import { proteinItems } from './protein-items';
import { chickenItems } from './chicken-items';
import { FoodItem } from '../types';

// Combine all food items into a single array
export const foodItems: FoodItem[] = [
  ...riceItems,
  ...soupItems,
  ...swallowItems,
  ...proteinItems,
  ...chickenItems,
];
