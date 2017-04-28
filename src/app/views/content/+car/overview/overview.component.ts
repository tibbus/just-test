import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TimelineService, CarService } from '../../../../services/';

@Component({
    selector: 'overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
    public posts: any[] = [];
    public videos: any[] = [];
    public photos: any[] = [];
    public loading: boolean = true;
    public car;

    constructor(private timelineService: TimelineService, private route: ActivatedRoute, private carService: CarService) { }

    ngOnInit() {
        this.route.parent.params.subscribe(params => {
            const route = params['id'];
            this.car = this.carService.getCarByRoute(route);

            const actor = {
                actorId: this.car.id,
                actorType: 'car'
            };

            this.timelineService.getOverview(actor).subscribe((overview: any) => {
                this.posts = overview.posts;
                this.videos = overview.videos;
                this.photos = overview.images;

                this.loading = false;
            });
        });
    }
}