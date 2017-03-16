import { Component, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';

import {
    ModalService,
    CarService,
    TimelineService,
    PostService,
} from '../../../../services/index';

@Component({
    selector: 'add-post',
    styleUrls: ['./addPost.component.scss'],
    templateUrl: './addPost.component.html'
})

export class AddPostComponent {
    public currentStatus: string = '';
    public loading: boolean = false;
    public uris: string[] = [];
    public files: any[] = [];
    public postType: string = 'status';
    public topics: string[] = ['Video', 'Image', 'Document', 'Toyota', 'Yamaha', 'Volkswagen'];
    public selectedTopics: string[] = [];
    public cars: any[];
    public carActiveIndex: number;
    // clone topics
    private allTopics: string[] = this.topics.slice();

    constructor(
        private carService: CarService,
        private timelineService: TimelineService,
        private ref: ChangeDetectorRef,
        private postService: PostService
    ) { }

    ngOnInit() {
        this.carService.getCars(false).subscribe(cars => {
            this.cars = cars;
            this.carActiveIndex = 0;
        })
    }

    public clickUriRemove(index: number) {
        this.uris.splice(index, 1);
        this.files.splice(index, 1);

        if (this.files.length === 0) {
            this.postType = 'status';
        }
    }

    public clickAddMedia(file: any, postType: string) {
        if (!file) {
            return false;
        }
        this.files.push(file);

        this.postType = postType;

        const reader = new FileReader();
        reader.onload = (e: any) => {
            this.uris.push(e.target.result);

            this.ref.detectChanges();
        }
        reader.readAsDataURL(file);
    }

    public clickAddPost() {
        this.loading = true;
        this.postService.setTopics(this.selectedTopics);

        if (this.postType !== 'status') {
            this.addPostMedia();
        } else {
            this.addPostStatus();
        }
    }

    public clickAddTopics(topic: string) {
        const currentTopicIndex = this.topics.indexOf(topic);

        this.selectedTopics.push(topic);

        this.topics.splice(currentTopicIndex, 1);
    }

    public clickRemoveTopics(topic: string) {
        const currentTopicIndex = this.selectedTopics.indexOf(topic);

        this.topics.push(topic);

        this.selectedTopics.splice(currentTopicIndex, 1);
    }

    public clickCar(index: number) {
        this.carActiveIndex = index;
    }

    private addPostStatus() {
        this.postService.addPost(null, this.currentStatus, 'status', this.cars[this.carActiveIndex]).subscribe(
            res => {
                this.afterPostRequest();
            },
            error => this.handleError(error)
        );
    }

    private addPostMedia() {
        this.postService.addPost(this.files, this.currentStatus, this.postType, this.cars[this.carActiveIndex]).subscribe(
            res => {
                this.afterPostRequest();
            },
            error => this.handleError(error)
        );
    }

    private afterPostRequest() {
        // Clear add Post
        this.currentStatus = '';
        this.uris = [];
        this.files = [];
        this.loading = false;
        this.postType = 'status';

        this.topics = this.allTopics;
        this.selectedTopics = [];

        // Refresh the TimeLine
        //this.timelineService.getPosts();
    }

    private handleError(error: Error) {
        this.loading = false;

        console.log(error);
    }
}