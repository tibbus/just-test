import {Injectable}     from '@angular/core';
import {Http} from '@angular/http';
import {ReplaySubject}    from 'rxjs/ReplaySubject';
import {HttpService} from './../../common/httpService/http.service';

@Injectable()
export class CarService extends HttpService {
    constructor(private http: Http) {
        super(http, '/user/1/usercar/details=true');
    }

    private _selectedCarId: string;

    getCars(forceRefresh?: boolean) {
        return this.getData().map(res => {
            return _.map(res, (carObject: any) => {
                const carName: string = _.get(carObject, 'UserCar.Car.Model', '');
                const carId: string = _.get(carObject, 'UserCar.Car.Id', '');

                return {
                    name: carName,
                    route: carName.replace(/ /g, '').toLocaleLowerCase(),
                    id: carId
                }
            });
        });
    }

    getCarById(id: string): any {
        const car = _.find(this.dataObject, (item: any) => {
            return item.UserCar.Id == id;
        });

        return car;
    }

    set selectedCarId(carId: string) {
        this._selectedCarId = carId;
    }

    get selectedCar(): any {
        if (this.getCarById(this._selectedCarId)) {
            return this.getCarById(this._selectedCarId).UserCar;
        } else {
            return null;
        }
    }

    get selectedCarMot(): any {
        return this.getCarById(this._selectedCarId).MOT;
    }

    get selectedCarTax(): any {
        return this.getCarById(this._selectedCarId).Tax;
    }
}