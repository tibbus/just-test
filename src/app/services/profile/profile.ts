import { RequestInterface } from '../http/request.interface';

export interface Profile extends RequestInterface {
    title?: string,
    name?: string,
    email?: string,
    mobileNumber?: string,
    homeNumber?: string,
    town?: string,
    userType: string
}