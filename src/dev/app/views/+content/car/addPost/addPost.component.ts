import { Component, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';

import {
    ModalService,
    CarService,
    TimelineService,
    PostService
} from '../../../../services/index';
import { LoadingComponent } from '../../../../common/loading/loading.component';
import { RegNumberPipe } from './regNumber.pipe'
import { UploadFileDirective } from './uploadFile.directive';

@Component({
    selector: 'add-post',
    styleUrls: ['src/dist/app/views/+content/car/addPost/addPost.component.css'],
    templateUrl: 'src/dev/app/views/+content/car/addPost/addPost.component.html',
    directives: [
        LoadingComponent,
        UploadFileDirective
    ],
    pipes: [RegNumberPipe]
})

export class AddPostComponent {
    currentStatus: string = '';
    loading: boolean = false;
    carInfo: any;
    carRegNumber: string;
    uris: string[] = [];
    files: any[] = [];
    postType: string;
    allTopics: string[] = ['Video', 'Image', 'Document', 'Toyota', 'Yamaha', 'Volkswagen'];
    topics: string[] = ['Video', 'Image', 'Document', 'Toyota', 'Yamaha', 'Volkswagen'];
    selectedTopics: string[] = [];

    constructor(
        private _carService: CarService,
        private timelineService: TimelineService,
        private ref: ChangeDetectorRef,
        private postService: PostService
    ) {}

    ngOnInit() {
        this.carInfo = this._carService.selectedCar.car;
        this.carRegNumber = this._carService.selectedCar.registrationNumber.toUpperCase();

        this.postType = 'status';
    }

    clickUriRemove(index: number) {
        this.uris.splice(index, 1);
        this.files.splice(index, 1);

        if (this.files.length === 0) {
            this.postType = 'status';
        }
    }

    clickAddImages(file) {
        if (!file) {
            return false;
        }

        this.files.push(file);

        this.postType = 'image';

        const reader = new FileReader();

        reader.onload = (e: any) => {
            this.uris.push(e.target.result);

            this.ref.detectChanges();
        }

        reader.readAsDataURL(file);
    }

    clickAddVideos(file) {
        if (!file) {
            return false;
        }

        this.files.push(file);

        this.postType = 'video';

        const reader = new FileReader();

        reader.onload = (e: any) => {
            console.log('loaded');
            this.uris.push(e.target.result);

            this.ref.detectChanges();
        }

        reader.readAsDataURL(file);
    }

    clickAddStatus() {
        this.loading = true;
        this.postService.topics = this.selectedTopics;

        if (this.postType === 'image') {
            this.addPostImage();
        } else if (this.postType === 'video') {
            this.addPostVideo();
        } else {
            this.addPostStatus();
        }
    }

    clickAddTopics(topic: string) {
        const currentTopicIndex = this.topics.indexOf(topic);

        this.selectedTopics.push(topic);

        this.topics.splice(currentTopicIndex, 1);
    }

    clickRemoveTopics(topic: string) {
        const currentTopicIndex = this.selectedTopics.indexOf(topic);

        this.topics.push(topic);

        this.selectedTopics.splice(currentTopicIndex, 1);
    }

    addPostStatus() {
        this.postService.addPost(null, this.currentStatus, 'status').subscribe(
            res => {
                this.afterPostRequest();
            },
            error => this.handleError(error)
        );
    }

    addPostImage() {
        this.postService.addPost(this.files, this.currentStatus, 'image').subscribe(
            res => {
                this.afterPostRequest();
            },
            error => this.handleError(error)
        );
    }

    addPostVideo() {
        this.postService.addPost(this.files, this.currentStatus, 'video').subscribe(
            res => {
                this.afterPostRequest();
            },
            error => this.handleError(error)
        );
    }

    afterPostRequest() {
        // Clear add Post
        this.currentStatus = '';
        this.uris = [];
        this.files = [];
        this.loading = false;
        this.postType = 'status';

        this.topics = this.allTopics;
        this.selectedTopics = [];

        // Refresh the TimeLine
        this.timelineService.getPosts(true);
    }

    handleError(error: Error) {
        this.loading = false;

        console.log(error);
    }
}