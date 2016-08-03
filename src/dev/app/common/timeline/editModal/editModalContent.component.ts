import { Component, OnInit } from '@angular/core';
import { PostService, ModalService, TimelineService } from '../../../services/index';

@Component({
    selector: 'content',
    templateUrl: 'src/dev/app/common/timeline/editModal/editModalContent.component.html',
    styleUrls: ['src/dist/app/common/timeline/editModal/editModalContent.component.css'],
})

export class EditModalContentComponent implements OnInit {
    postDescription: string;

    constructor(
        private postService: PostService,
        private modalService: ModalService,
        private timelineService: TimelineService
    ) { }

    ngOnInit() {
        this.postDescription = this.timelineService.selectedPost.details.description;

        this.modalService.clickSave.subscribe(
            () => {
                this.savePost();
            }
        )
    }

    savePost() {
        this.modalService.setLoading();

        this.postService.updatePost(this.postDescription).subscribe(
            () => {
                // update the Model
                this.timelineService.selectedPost.details.description = this.postDescription;

                this.modalService.sendModalClose();
            }
        );
    }
}