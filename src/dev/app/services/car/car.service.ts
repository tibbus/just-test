import { Injectable }     from '@angular/core';
import { Http } from '@angular/http';
import { ReplaySubject }    from 'rxjs/ReplaySubject';
import { HttpService } from '../http/http.service';
import { ApiService } from '../api/api.service';
import * as _ from 'lodash';

@Injectable()
export class CarService extends HttpService {
    constructor(private http: Http, private apiService: ApiService) {
        super(http, apiService.userCars);
    }

    private _selectedCarId: string;

    getCars(forceRefresh?: boolean) {
        return this.getData(forceRefresh).map(res => {
            return _.map(res, (carObject: any) => {
                const carMake: string = _.get(carObject, 'CarInfo.Car.Make', null);
                const carModel: string = _.get(carObject, 'CarInfo.Car.Model', null);
                const carName: string = `${carMake} ${carModel}`;
                const carId: string = carObject.Id;

                return {
                    name: carName,
                    route: carName.replace(/ /g, '-').toLocaleLowerCase(),
                    id: carId
                }
            });
        });
    }

    addCar(regNumber: string) {
        const apiUrl = `${this.apiService.userRegisterCar}${regNumber}`;

        return this.http.request(apiUrl, {
            body: null,
            method: 'POST'
        });
    }

    removeCar(id: string) {
        const apiUrl = `${this.apiService.userRemoveCar}${id}`;

        return this.http.request(apiUrl, {
            body: null,
            method: 'DELETE'
        });
    }

    getCarById(id: string): any {
        const car = _.find(this.dataObject, (item: any) => {
            return item.Id == id;
        });

        return car;
    }

    set selectedCarId(carId: string) {
        this._selectedCarId = carId;
    }

    get selectedCar(): any {
        if (this.getCarById(this._selectedCarId)) {
            return this.getCarById(this._selectedCarId).CarInfo;
        } else {
            return null;
        }
    }

    get userCarId(): string {
        return this.getCarById(this._selectedCarId).CarInfo.Id;
    }

    get selectedCarMot(): any {
        return this.getCarById(this._selectedCarId).MOT;
    }

    get selectedCarTax(): any {
        return this.getCarById(this._selectedCarId).Tax;
    }
}