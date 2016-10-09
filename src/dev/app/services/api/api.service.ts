import { Injectable } from '@angular/core';
// todo : move it to typings/typescript
declare const stream: any;

@Injectable()
export class ApiService {
    // Hardcoded user :
    public userId: string = '1';
    private _streamClient: any;

    get user(): string {
        return `${API.user}${this.userId}`;
    }

    getCarTimelineUrl(carId: string): string {
        return `${API.root}${API.timeline}${carId}`;
    }

    getUserCarsUrl(): string {
        return `${API.root}${this.user}${API.userCars}`;
    }

    getProfileUrl(): string {
        return `${API.root}${this.user}`;;
    }

    getRegisterCarUrl(regNumber: string): string {
        return `${API.root}${this.user}${API.userRegisterCar}${regNumber}`;
    }

    getRemoveCarUrl(id: string): string {
        return `${API.root}${this.user}${API.userRemoveCar}${id}`;
    }

    getAddPostUrl(userCarId: string, postType: string): string {
        return `${API.root}${API.post}${userCarId}/${postType}`;
    }

    getUpdatePostUrl(userCarId: string, postType: string, postId: string): string {
        return `${API.root}${API.post}${userCarId}/${postType}/${postId}`;
    }

    getSearchUrl(term: string) {
        return `${API.search}${term}*`;
    }

    getTokenUrl() {
        return `${API.root}${API.token}`;
    }

    getFollowUrl(carId: string) {
        return `${API.root}${this.user}${API.follow}${carId}`;
    }

    getUnFollowUrl(carId: string) {
        return `${API.root}${this.user}${API.unFollow}${carId}`;
    }

    getCommentsUrl(postId: string) {
        return `${API.root}${API.timeline}${postId}${API.comment}`;
    }

    getChangeCommentsUrl(postId: string, commentId: string) {
        return `${API.root}${API.timeline}${postId}${API.comment}/${commentId}`;
    }

    set streamClient(streamClient: any) {
        this._streamClient = streamClient;
    }

    get streamClient() {
        return this._streamClient;
    }
}

const API = {
    fakeServiceEnabled: false,
    /* **DEV** Enviroment */
    root: 'http://mycarbioservice-api.azurewebsites.net/api/v1',

    userCars: '/usercar/details=true',
    userRegisterCar: '/usercar/registration/',
    userRemoveCar: '/usercar/',
    user: '/user/',
    timeline: '/timeline/',
    post: '/car/',
    search: 'https://mycarbiosearch.search.windows.net/indexes/carinfostaging/docs?api-version=2015-02-28&search=',
    token: '/feeds/token',
    follow: '/follow/',
    unFollow: '/unfollow/',
    comment: '/comment'
}

// SWITCH the FAKE service from here :
API.fakeServiceEnabled = false;

if (API.fakeServiceEnabled) {
    API.root = `${window.location.origin}/api/v1`;

    API.search = '/search?';
}

export  { API };