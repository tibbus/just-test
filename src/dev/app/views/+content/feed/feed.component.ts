import { Component } from '@angular/core';
import { TimelineService, ApiService } from '../../../services/index';

@Component({
    selector: 'feed',
    template: '<timeline></timeline>'
})

export class FeedComponent {
    constructor(private timelineService: TimelineService, private apiService: ApiService) { }

    ngOnInit() {
        this.timelineService.actor = {
            actorType: 'user',
            actorId: this.apiService.userId
        };
    }
}