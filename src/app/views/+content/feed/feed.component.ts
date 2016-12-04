import { Component } from '@angular/core';
import { TimelineService, ApiService, FollowService } from '../../../services/index';

@Component({
    selector: 'feed',
    template: '<timeline isFeed="true"></timeline>'
})

export class FeedComponent {
    constructor(
        private timelineService: TimelineService,
        private apiService: ApiService,
        private followService: FollowService
    ) { }

    ngOnInit() {
        this.timelineService.actor = {
            actorType: 'user',
            actorId: this.apiService.getUserId()
        };

        this.followService.setFollowState(false);
    }
}