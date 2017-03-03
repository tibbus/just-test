import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TimelineService } from '../../../../services/index';

@Component({
    selector: 'showcase',
    styleUrls: ['./showcase.component.scss'],
    templateUrl: './showcase.component.html'
})

export class ShowcaseComponent {
    public posts: any = {};

    constructor(private route: ActivatedRoute, private timelineService: TimelineService) { }

    ngOnInit() {
        this.route.parent.params.subscribe(params => {
            const carRoute = params['id'];
            const parsedRoute = carRoute.split('-');
            const carId = parsedRoute[parsedRoute.length - 1];

            this.timelineService.actor = {
                actorId: carId,
                actorType: 'car'
            };

            this.getPosts();
        });
    }

    private getPosts() {
        this.posts = {
            images: [],
            videos: [],
            docs: []
        };

        return this.timelineService.getPosts().subscribe(
            (posts: any[]) => {
                posts.forEach(item => {
                    if (item.type === 'Image') {
                        this.posts.images = this.posts.images.concat(item.activityData.contentUris)
                    } else if (item.type === 'Video') {
                        this.posts.videos = this.posts.videos.concat(item.activityData.contentUris)
                    } else if (item.type === 'Document') {
                        this.posts.docs = this.posts.docs.concat(item.activityData.contentUris)
                    }
                });
            }
        );
    }
}