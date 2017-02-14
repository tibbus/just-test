import { Injectable }     from '@angular/core';
import { Http } from '@angular/http';
import { ReplaySubject }    from 'rxjs/ReplaySubject';

import { HttpService } from '../http/http.service';
import { ApiService } from '../api/api.service';
import { API } from '../api/api';
import { Car, CarInfo, Mot, Tax } from './car.model';
import * as _ from 'lodash';

@Injectable()
export class CarService extends HttpService {
    private cars: any[];
    public selectedCarName;
    public selectedCar;

    constructor(private http: Http, private apiService: ApiService) {
        super(http, apiService.getUserCarsUrl());
    }

    public getCars(forceRefresh?: boolean) {
        return this.getData(forceRefresh).map((res: Car[]) => {
            this.cars = _.map(res, (carObject: Car) => {
                const carMake: string = _.get(carObject, 'carInfo.car.make', null);
                const carModel: string = _.get(carObject, 'carInfo.car.model', null);
                const carName: string = `${carMake} ${carModel}`;
                const carId: string = carObject.carInfo.id;

                return {
                    name: carName,
                    route: `${carName.replace(/ /g, '-').toLocaleLowerCase()}-${carId}`,
                    id: carId,
                    userCarId: carObject.id,
                    info: carObject.carInfo
                }
            });

            return this.cars;
        });
    }

    public addCar(carInfoId: string) {
        const apiUrl: string = this.apiService.getUserAddCarUrl(carInfoId);

        return this.http.post(apiUrl, null);
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

    public setCarByRoute(route: string, carInfoId: string): void {
        const userSelectedCar = _.find(this.cars, (car) => {
            return route === car.route.toLowerCase();
        });

        if (userSelectedCar) {
            this.selectedCar = userSelectedCar;
            this.selectedCar.isUserCar = true;
        } else {
            this.selectedCar = {
                id: carInfoId,
                isUserCar: false
            };
        }
    }

    public uploadProfileImage(car: any) {
        const apiUrl: string = this.apiService.getCarImageUploadUrl(car.info.id);
        const formData = new FormData();

        formData.append('image', car.info.pictureData);

        return this.http.post(apiUrl, formData);
    }
}