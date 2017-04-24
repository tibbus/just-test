import { Component, ChangeDetectorRef, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';

import {
    ModalService,
    CarService,
    TimelineService,
    PostService,
    ProfileService
} from '../../../../services/index';

@Component({
    selector: 'add-post',
    styleUrls: ['./addPost.component.scss'],
    templateUrl: './addPost.component.html'
})

export class AddPostComponent {
    @Input() cars: any[];

    public currentStatus: string = '';
    public loading: boolean = false;
    public uris: string[] = [];
    public files: any[] = [];
    public postType: string = 'status';
    public topics: string[];
    public selectedTopics: string[] = [];
    public activeCar;
    public user: any;

    private carActiveIndex: number = 0;

    constructor(
        private carService: CarService,
        private timelineService: TimelineService,
        private postService: PostService,
        private ref: ChangeDetectorRef,
        private profileService: ProfileService
    ) { }

    ngOnInit() {
        this.profileService.getProfile().subscribe(user => this.user = user);

        this.activeCar = this.cars[this.carActiveIndex];
        this.topics = this.getTopics(this.activeCar);
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

    public clickCar(index: number) {
        this.carActiveIndex = index;

        this.activeCar = this.cars[index];
        this.topics = this.getTopics(this.activeCar);
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

        // Refresh the TimeLine
        //this.timelineService.getPosts();
    }

    private handleError(error: Error) {
        this.loading = false;

        console.log(error);
    }

    private getTopics(car) {
        return [car.info.car.make, car.info.car.model, car.info.car.yearOfManufacture];
    }
}