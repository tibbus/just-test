import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ReplaySubject, Subject } from 'rxjs';

import { HttpService } from '../http/http.service';
import { ApiService } from '../api/api.service';
import { API } from '../api/api';
import { Car, CarInfo, Mot, Tax } from './car.model';

@Injectable()
export class CarService extends HttpService {
    private cars: any[] = [];
    private addCar$: Subject<boolean> = new Subject();

    constructor(private http: Http, private apiService: ApiService) {
        super(http, apiService.getUserCarsUrl());
    }

    public getCars(forceRefresh?: boolean) {
        return this.getData(forceRefresh).map((res: Car[]) => {
            this.cars = res.map(this.formatCars);

            return this.cars;
        });
    }

    public getUserCars(userId: string) {
        return this.http.get(`${API.root}/user/${userId}/usercar/details=false`).map(res => {
            return res.json().map(this.formatCars);
        });
    }

    public addCar(carInfoId: string) {
        const apiUrl: string = this.apiService.getUserAddCarUrl(carInfoId);

        return this.http.post(apiUrl, null).map(res => res.json());
    }

    public searchCarByRegNumber(regNumber: string) {
        const apiUrl: string = this.apiService.getRegisterCarUrl(regNumber);

        return this.http.get(apiUrl).map(response => response.json());
    }

    public removeCar(id: string) {
        const apiUrl: string = this.apiService.getRemoveCarUrl(id);

        return this.http.request(apiUrl, {
            body: '',
            method: 'DELETE'
        });
    }

    public getCarById(id: string) {
        return this.http.get(`${API.root}/car/${id}/details`)
            .map(response => response.json());
    }

    public getCarByRoute(route: string) {
        const parsedRoute = route.split('-');
        const carId = parsedRoute.slice(-1)[0];
        const userCar = this.cars.find(car => {
            return route === car.route.toLowerCase();
        });

        if (userCar) {
            userCar.isUserCar = true;
            return userCar;
        }

        return {
            id: carId,
            isUserCar: false
        };
    }

    public uploadProfileImage(carId: string, imageData: any) {
        const apiUrl: string = this.apiService.getCarImageUploadUrl(carId);
        const formData = new FormData();

        formData.append('image', imageData);

        return this.http.post(apiUrl, formData);
    }

    public getCarRoute(carMake: string, carModel: string, carId: string): string {
        const carName = this.getCarName(carMake, carModel);

        return `${carName.replace(/ /g, '-').toLocaleLowerCase()}-${carId}`;
    }

    public getAddCar() {
        return this.addCar$;
    }

    public setAddCar() {
        this.addCar$.next(true);
    }

    public getCarName(carMake: string, carModel: string): string {
        return `${carMake} ${carModel}`;
    }

    private formatCars = (carObject: Car) => {
        const carMake = carObject.carInfo.car.make;
        const carModel = carObject.carInfo.car.model;
        const carId = carObject.carInfo.id;

        return {
            name: this.getCarName(carMake, carModel),
            route: this.getCarRoute(carMake, carModel, carId),
            id: carId,
            userCarId: carObject.id,
            info: carObject.carInfo
        }
    }
}