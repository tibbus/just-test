import { HttpInterface } from '../http/http.interface';

export interface Profile extends HttpInterface {
    title?: string,
    name?: string,
    email?: string,
    mobileNumber?: string,
    homeNumber?: string,
    town?: string,
    userType: string
}