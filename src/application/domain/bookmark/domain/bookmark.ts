export class Bookmark {
    id: number;
    userId: number;
    foodId: number;

    constructor(userId: number, foodId: number, id?: number) {
        this.id = id;
        this.userId = userId;
        this.foodId = foodId;
    }
}