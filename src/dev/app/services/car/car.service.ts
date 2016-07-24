import { Injectable }     from '@angular/core';
import { Http } from '@angular/http';
import { ReplaySubject }    from 'rxjs/ReplaySubject';

import { HttpService } from '../http/http.service';
import { ApiService } from '../api/api.service';
import { Car, CarInfo, Mot, Tax } from './car';
import * as _ from 'lodash';

@Injectable()
export class CarService extends HttpService {
    constructor(private http: Http, private apiService: ApiService) {
        super(http, apiService.userCars);
    }

    private _selectedCarId: string;

    getCars(forceRefresh?: boolean) {
        return this.getData(forceRefresh).map((res: Car[]) => {
            return _.map(res, (carObject: Car) => {
                const carMake: string = _.get(carObject, 'carInfo.car.make', null);
                const carModel: string = _.get(carObject, 'carInfo.car.model', null);
                const carName: string = `${carMake} ${carModel}`;
                const carId: string = carObject.id;

                return {
                    name: carName,
                    route: carName.replace(/ /g, '-').toLocaleLowerCase(),
                    id: carId
                }
            });
        });
    }

    addCar(regNumber: string) {
        const apiUrl: string = `${this.apiService.userRegisterCar}${regNumber}`;

        return this.http.request(apiUrl, {
            body: null,
            method: 'POST'
        });
    }

    removeCar(id: string) {
        const apiUrl: string = `${this.apiService.userRemoveCar}${id}`;

        return this.http.request(apiUrl, {
            body: null,
            method: 'DELETE'
        });
    }

    getCarById(id: string): Car {
        const currentCar: Car = _.find(this.dataObject, (car: Car) => {
            return car.id == id;
        });

        return currentCar;
    }

    set selectedCarId(carId: string) {
        this._selectedCarId = carId;
    }

    get selectedCar(): CarInfo {
        if (this.getCarById(this._selectedCarId)) {
            return this.getCarById(this._selectedCarId).carInfo;
        } else {
            return null;
        }
    }

    get userCarId(): string {
        const car: Car = this.getCarById(this._selectedCarId);

        if (car) {
            return car.carInfo.id;
        } else {
            return null;
        }
    }

    get selectedCarMot(): Mot[] {
        return this.getCarById(this._selectedCarId).mot;
    }

    get selectedCarTax(): Tax {
        return this.getCarById(this._selectedCarId).tax;
    }
}