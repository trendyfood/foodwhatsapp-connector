
import { riceItems } from './rice-items';
import { soupItems } from './soup-items';
import { swallowItems } from './swallow-items';
import { proteinItems } from './protein-items';
import { drinksItems } from './drinks-items';
import { combosItems } from './combos-items';
import { FoodItem } from '../types';

// Combine all food items into a single array
export const foodItems: FoodItem[] = [
  ...combosItems,
  ...riceItems,
  ...soupItems,
  ...swallowItems,
  ...proteinItems,
  ...drinksItems,
];
