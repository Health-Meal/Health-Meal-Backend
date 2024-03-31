export class Cuisine {
    id: number;
    name: string;
    foodId: number;

    constructor(id: number, name: string, foodId: number) {
        this.id = id;
        this.name = name;
        this.foodId = foodId;
    }
}