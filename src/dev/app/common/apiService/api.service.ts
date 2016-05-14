import { Injectable } from '@angular/core';

@Injectable()
export class ApiService {
    // Hardcoded user :
    get user(): string {
        return '/user/1';
    }

    get userCars(): string {
        return `${this.user}${API.userCars}`
    }

    get userRegisterCar(): string {
        return `${this.user}${API.userRegisterCar}`
    }

    get profile(): string {
        return this.user;
    }
}

const API = {
    userCars: '/usercar/details=true',
    userRegisterCar: '/usercar/registration/',
    user: '/user/1'
}