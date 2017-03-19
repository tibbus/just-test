import { Component } from '@angular/core';
import { TimelineService, ApiService, CarService } from '../../../services/index';

@Component({
    selector: 'feed',
    templateUrl: './feed.component.html',
    styleUrls: ['./feed.component.scss']
})

export class FeedComponent {
    public cars: any[] = [];

    constructor(
        private timelineService: TimelineService,
        private apiService: ApiService,
        private carService: CarService
    ) { }

    ngOnInit() {
        this.timelineService.actor = {
            actorType: 'user',
            actorId: this.apiService.getUserId()
        };

        this.carService.getCars(false).subscribe(
            cars => {
                this.cars = cars;
            },
            // @TODO If you don't catch the error it breaks the router (???)
            error => console.log(error)
        );
    }
}
