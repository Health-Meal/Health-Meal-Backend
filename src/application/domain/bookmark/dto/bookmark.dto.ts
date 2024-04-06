export class QueryBookmarkListResponse {
    bookmarks: BookMarkListResponse[]
}

export class BookMarkListResponse {
    bookmarkId: number
    foodId: number
    food: string
    description: string
    image: string
}