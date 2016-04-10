import {Injectable}     from 'angular2/core';
import {Http, Response, Headers, RequestOptions} from 'angular2/http';
import {ReplaySubject}    from 'rxjs/subject/ReplaySubject';

@Injectable()
export class CarService {
    constructor(private http: Http) { }

    private _url: string = 'http://amilatestapi-dev.azurewebsites.net/api/v1/user/1/usercar/details=false';
    private _carsObs = new ReplaySubject(1);
    private _firstTimeRequest: boolean = true;
    private _carObject; 

    private getCarsFromHttp() {
        return this.http
            .get(this._url)
            .map(res => res.json())
            .do(data => {
                console.log(data);
            });
    }

    getCars(forceRefresh?: boolean) {
        if (this._firstTimeRequest || forceRefresh) {
            this.getCarsFromHttp().subscribe(
                cars => {
                    this._firstTimeRequest = false;

                    this._carObject = cars;

                    this._carsObs.next(cars);
                },
                error => {
                    console.log(error);

                    this._carsObs.error(error);
                });
        }

        return this._carsObs.map(res => {
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

    getCarById(id: string) {
        const car = _.find(this._carObject, (item: any) => {
            return item.UserCar.Id == id;
        });

        return car;
    }
}