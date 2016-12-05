import { RequestInterface } from '../http/request.model';

export interface Timeline {
    results: Post[],
    totalCount: number
}

export interface Post {
    details: any,
    type: string
}