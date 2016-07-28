import { Component, OnInit } from '@angular/core';
import { PostService, ModalService, TimelineService } from '../../../services/index';

@Component({
    selector: 'content',
    templateUrl: 'src/dev/app/common/timeline/editModal/editModalContent.component.html',
    styleUrls: ['src/dist/app/common/timeline/editModal/editModalContent.component.css'],
})

export class EditModalContentComponent implements OnInit {
    status: any;

    constructor(
        private postService: PostService,
        private modalService: ModalService,
        private timelineService: TimelineService
    ) { }

    ngOnInit() {
        this.status = this.timelineService.selectedPost.details.description;

        this.modalService.clickSave.subscribe(
            () => {
                this.savePost();
            }
        )
    }

    savePost() {
        this.modalService.setLoading();

        this.postService.updatePost(this.status).subscribe(
            () => {
                // update the Model
                this.timelineService.selectedPost.details.description = this.status;

                this.modalService.sendModalClose();
            }
        );
    }
}