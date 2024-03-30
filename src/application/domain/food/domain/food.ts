export class Food {
    id: number;
    name: string;
    description: string;
    image: string;
    keywordId: number;

    constructor(id: number, name: string, description: string, image: string, keywordId: number) {
        this.id = id
        this.name = name
        this.description = description
        this.image = image
        this.keywordId = keywordId
    }
}