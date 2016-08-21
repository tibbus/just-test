import { Injectable } from '@angular/core';

@Injectable()
export class ApiService {
    // Hardcoded user :
    get user(): string {
        return '/user/1';
    }

    get userCars(): string {
        return `${this.user}${API.userCars}`;
    }

    get userRegisterCar(): string {
        return `${this.user}${API.userRegisterCar}`;
    }

    get profile(): string {
        return this.user;
    }

    get userRemoveCar(): string {
        return `${this.user}${API.userRemoveCar}`;
    }
}

export const API = {
    // **DEV** Enviroment
    //root: 'http://amilatestapi-dev.azurewebsites.net/api/v1',
    // **PROD** Enviroment
    root: 'http://amilatestapi-prod.azurewebsites.net/api/v1',
    // **Local** FAKE Service Enviroment 
    //root: `${window.location.origin}/api/v1`,
    userCars: '/usercar/details=true',
    userRegisterCar: '/usercar/registration/',
    userRemoveCar: '/usercar/',
    user: '/user/1',
    timeline: '/timeline/'
}