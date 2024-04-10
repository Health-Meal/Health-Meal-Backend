import { QueryCuisineUseCase } from '../../../../src/application/domain/cuisine/usecase/query-cuisine.usecase';
import { CuisinePort } from '../../../../src/application/domain/cuisine/spi/cuisine.spi';
import { NotFoundException } from '@nestjs/common';
import { Cuisine } from '../../../../src/application/domain/cuisine/domain/cuisine';

const foodIdStub = 1
const cuisineEntityListStub = [
    new Cuisine(1, 'testCuisine1', 1),
    new Cuisine(2, 'testCuisine2', 2)
]
const cuisineResponseStub = {
    cuisines: [
        'testCuisine1',
        'testCuisine2'
    ]
}

describe('queryCuisineUseCase(foodId를 통해 요리에 대한 정보를 알아오는 경우)', () => {
    let queryCuisineUseCase: QueryCuisineUseCase
    let mockCuisinePort: CuisinePort

    beforeEach(() => {
        mockCuisinePort = {
            queryCuisineByFoodId: jest.fn()
        }
        queryCuisineUseCase = new QueryCuisineUseCase(mockCuisinePort)
    })

    it('foodId가 존재하지 않으면', async () => {
        jest.spyOn(mockCuisinePort, 'queryCuisineByFoodId').mockResolvedValue([])

        await expect(queryCuisineUseCase.execute(foodIdStub)).rejects.toThrowError(
            new NotFoundException('Cuisine Not Found')
        )

        expect(mockCuisinePort.queryCuisineByFoodId).toHaveBeenCalled()
    })

    it('foodId가 존재하면', async () => {
        jest.spyOn(mockCuisinePort, 'queryCuisineByFoodId').mockResolvedValue(cuisineEntityListStub)

        await expect(queryCuisineUseCase.execute(foodIdStub)).resolves.toEqual(cuisineResponseStub)

        expect(mockCuisinePort.queryCuisineByFoodId).toHaveBeenCalledWith(foodIdStub)
    })
})