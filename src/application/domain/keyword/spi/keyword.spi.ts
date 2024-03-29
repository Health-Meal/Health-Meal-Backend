import { Keyword } from '../domain/keyword';

export interface KeywordPort {
    queryKeywordByString(keyword: string): Promise<Keyword[]>;
}
export const KeywordPort = Symbol('IKeywordPort')