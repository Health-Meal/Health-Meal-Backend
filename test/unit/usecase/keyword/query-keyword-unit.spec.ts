import { QueryKeywordUseCase } from '../../../../src/application/domain/keyword/usecase/query-keyword.usecase';
import { KeywordPort } from '../../../../src/application/domain/keyword/spi/keyword.spi';
import { NotFoundException } from '@nestjs/common';
import { Keyword } from '../../../../src/application/domain/keyword/domain/keyword';

let keywordStub = 'testKeyword';
let keywordEntityListStub = [
    new Keyword(1, 'testKeyword1'),
    new Keyword(2, 'testKeyword2')
];
let keywordResponseStub = {
    keywords: [
        {
            keywordId: 1,
            name: 'testKeyword1'
        },
        {
            keywordId: 2,
            name: 'testKeyword2'
        }
    ]
};

describe('queryKeywordUseCase(키워드를 검색하는 경우)', () => {
    let queryKeywordUseCase: QueryKeywordUseCase;
    let mockKeywordPort: KeywordPort;

    beforeEach(() => {
        mockKeywordPort = {
            queryKeywordByString: jest.fn()
        };
        queryKeywordUseCase = new QueryKeywordUseCase(mockKeywordPort);
    });

    it('검색한 글자에 대한 키워드가 존재하지 않는다면', async () => {
        jest.spyOn(mockKeywordPort, 'queryKeywordByString').mockResolvedValue([]);

        await expect(queryKeywordUseCase.execute(keywordStub)).rejects.toThrowError(
            new NotFoundException('Keyword Not Found')
        );

        expect(mockKeywordPort.queryKeywordByString).toHaveBeenCalled();
    });

    it('검색한 글자에 대한 키워드가 존재한다면', async () => {
        jest.spyOn(mockKeywordPort, 'queryKeywordByString').mockResolvedValue(keywordEntityListStub);

        await expect(queryKeywordUseCase.execute(keywordStub)).resolves.toEqual(keywordResponseStub);

        expect(mockKeywordPort.queryKeywordByString).toHaveBeenCalled();
    });
});