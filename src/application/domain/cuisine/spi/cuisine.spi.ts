import { Cuisine } from '../domain/cuisine';

export interface CuisinePort {
    queryCuisineByFoodId(foodId: number): Promise<Cuisine[]>;
}

export const CuisinePort = Symbol('ICuisinePort');