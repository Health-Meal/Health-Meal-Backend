import { QueryFoodUseCase } from '../../../../src/application/domain/food/usecase/query-food.usecase';
import { FoodPort } from '../../../../src/application/domain/food/spi/food.spi';
import { NotFoundException } from '@nestjs/common';
import { Food } from '../../../../src/application/domain/food/domain/food';

const keywordIdStub = 1
const foodStub = new Food(
    1,
    'testFood',
    'testDescription',
    'testImage',
    1
)
const foodResponseStub = {
    foodId: 1,
    name: 'testFood',
    description: 'testDescription',
    image: 'testImage'
}

describe('queryFoodUseCase(keywordId를 통해 음식에 대한 정보를 알아오는 경우)', () => {
    let queryFoodUseCase: QueryFoodUseCase
    let mockFoodPort: FoodPort

    beforeEach(() => {
        mockFoodPort = {
            queryFoodByKeywordId: jest.fn()
        }
        queryFoodUseCase = new QueryFoodUseCase(mockFoodPort)
    })

    it('keywordId가 존재하지 않으면', async () => {
        jest.spyOn(mockFoodPort, 'queryFoodByKeywordId').mockResolvedValue(null)

        await expect(queryFoodUseCase.execute(keywordIdStub)).rejects.toThrowError(
            new NotFoundException('Food Not Found')
        )

        expect(mockFoodPort.queryFoodByKeywordId).toHaveBeenCalled()
    })

    it('keywordId가 존재하면', async () => {
        jest.spyOn(mockFoodPort, 'queryFoodByKeywordId').mockResolvedValue(foodStub)

        await expect(queryFoodUseCase.execute(keywordIdStub)).resolves.toEqual(foodResponseStub)

        expect(mockFoodPort.queryFoodByKeywordId).toHaveBeenCalledWith(keywordIdStub)
    })
})