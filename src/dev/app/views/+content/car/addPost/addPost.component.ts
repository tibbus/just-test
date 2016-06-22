import { Component, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';

import { ModalService, CarService, StatusService, TimelineService, ImageService, VideoService } from '../../../../services/index';
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

    constructor(
        private _carService: CarService,
        private statusService: StatusService,
        private timelineService: TimelineService,
        private imageService: ImageService,
        private videoService: VideoService,
        private ref: ChangeDetectorRef
    ) {}

    ngOnInit() {
        this.carInfo = this._carService.selectedCar.car;
        this.carRegNumber = this._carService.selectedCar.registrationNumber.toUpperCase();
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

        this.postType = 'Image';

        const reader = new FileReader();

        reader.onload = (e: any) => {
            console.log('loaded');
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

        this.postType = 'Video';

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

        if (this.postType === 'Image') {
            this.addPostImage();
        } else if (this.postType === 'Video') {
            this.addPostVideo();
        } else {
            this.addPostStatus();
        }
    }

    addPostStatus() {
        this.statusService.addStatus(this.currentStatus).delay(1000).subscribe(
            res => {
                this.afterPostRequest();
            },
            error => this.handleError(error)
        );
    }

    addPostImage() {
        this.imageService.addStatus(this.files, this.currentStatus).subscribe(
            res => {
                this.afterPostRequest();
            },
            error => this.handleError(error)
        );
    }

    addPostVideo() {
        this.videoService.addStatus(this.files, this.currentStatus).subscribe(
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

        // Refresh the TimeLine
        this.timelineService.getPosts(true);
    }

    handleError(error: Error) {
        this.loading = false;

        console.log(error);
    }
}