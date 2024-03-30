import { Food } from '../domain/food';

export interface FoodPort {
    queryFoodByKeywordId(keywordId: number): Promise<Food>
}
export const FoodPort = Symbol('IFoodPort')