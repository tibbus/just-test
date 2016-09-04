import { Component, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';

import {
    ModalService,
    CarService,
    TimelineService,
    PostService
} from '../../../../../services/index';

import { RegNumberPipe } from './regNumber.pipe'
//import { UploadFileDirective } from '../../../../../directives/uploadFile.directive';

@Component({
    selector: 'add-post',
    styleUrls: ['src/dist/app/views/+content/cars/car/addPost/addPost.component.css'],
    templateUrl: 'src/dev/app/views/+content/cars/car/addPost/addPost.component.html',
    directives: [
        //UploadFileDirective
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

    clickAddMedia(file: any, postType: string) {
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

    clickAddStatus() {
        this.loading = true;
        this.postService.topics = this.selectedTopics;

        if (this.postType !== 'status') {
            this.addPostMedia();
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
               // this.afterPostRequest();
            },
            error => this.handleError(error)
        );
    }

    addPostMedia() {
        this.postService.addPost(this.files, this.currentStatus, this.postType).subscribe(
            res => {
               // this.afterPostRequest();
            },
            error => this.handleError(error)
        );
    }

    handleError(error: Error) {
        this.loading = false;

        console.log(error);
    }
}