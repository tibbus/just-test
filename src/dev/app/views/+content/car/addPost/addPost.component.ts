import { Component, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';

import { ModalService, CarService, StatusService, TimelineService, MediaService } from '../../../../services/index';
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
    images: string[] = [];
    files: any[] = [];
    postType: string;

    constructor(
        private _carService: CarService,
        private statusService: StatusService,
        private timelineService: TimelineService,
        private mediaService: MediaService,
        private ref: ChangeDetectorRef
    ) {}

    ngOnInit() {
        this.carInfo = this._carService.selectedCar.car;
        this.carRegNumber = this._carService.selectedCar.registrationNumber.toUpperCase();
    }

    clickImageRemove(index: number) {
        this.images.splice(index, 1);
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

        this.postType = 'images';

        const reader = new FileReader();

        reader.onload = (e: any) => {
            console.log('loaded');
            this.images.push(e.target.result);

            this.ref.detectChanges();
        }

        reader.readAsDataURL(file);
    }

    clickAddStatus() {
        this.loading = true;

        if (this.postType === 'images') {
            this.addPostImage();
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
        this.mediaService.addStatus(this.files, this.currentStatus).subscribe(
            res => {
                this.afterPostRequest();
            },
            error => this.handleError(error)
        );
    }

    afterPostRequest() {
        // Clear add Post
        this.currentStatus = '';
        this.images = [];
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