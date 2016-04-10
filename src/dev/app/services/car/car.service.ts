import {Injectable}     from 'angular2/core';
import {Http} from 'angular2/http';
import {ReplaySubject}    from 'rxjs/subject/ReplaySubject';
import {HttpService} from './../../common/httpService/http.service';

@Injectable()
export class CarService extends HttpService {
    constructor(private http: Http) {
        super(http, 'http://amilatestapi-dev.azurewebsites.net/api/v1/user/1/usercar/details=false');
    }

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

    getCarById(id: string) {
        const car = _.find(this.dataObject, (item: any) => {
            return item.UserCar.Id == id;
        });

        return car;
    }
}