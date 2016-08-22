import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { PostService, ModalService, TimelineService } from '../../../services/index';
import { UploadFileDirective } from '../../../directives/uploadFile.directive';

import * as _ from 'lodash';

@Component({
    selector: 'content',
    templateUrl: 'src/dev/app/components/timeline/editModal/editModalContent.component.html',
    styleUrls: ['src/dist/app/components/timeline/editModal/editModalContent.component.css'],
    directives: [
        UploadFileDirective
    ],
})

export class EditModalContentComponent implements OnInit {
    postDescription: string;
    post: any;
    files: any = [];
    postType: string;
    uris: any = [];
    topics: string[] = ['Video', 'Image', 'Document', 'Toyota', 'Yamaha', 'Volkswagen'];
    selectedTopics: string[] = [];

    constructor(
        private postService: PostService,
        private modalService: ModalService,
        private timelineService: TimelineService,
        private ref: ChangeDetectorRef
    ) { }

    ngOnInit() {
        this.post = this.timelineService.selectedPost;
        this.postDescription = this.post.details.description;
        this.postType = this.post.type;
        
        this.selectedTopics = this.post.details.topics;
        this.topics = _.filter(this.topics, (topic): boolean => {
            return this.selectedTopics.indexOf(topic) === -1;
        });

        this.modalService.clickSave.subscribe(
            () => {
                this.savePost();
            }
        )
    }

    savePost() {
        this.modalService.setLoading();

        this.postService.updatePost(this.postDescription, this.files, this.selectedTopics).subscribe(
            () => {
                // update the TimeLine
                this.timelineService.getPosts(true);

                this.modalService.sendModalClose();
            }
        );
    }

    clickAddMedia(file: any) {
        if (!file) {
            return false;
        }

        this.files.push(file);

        const reader = new FileReader();

        reader.onload = (e: any) => {
            this.uris.push(e.target.result);

            this.ref.detectChanges();
        }

        reader.readAsDataURL(file);
    }

    clickUriRemove(index: number) {
        this.uris.splice(index, 1);
        this.files.splice(index, 1);
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
}