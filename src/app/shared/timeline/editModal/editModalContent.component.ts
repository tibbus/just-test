import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { PostService, ModalService, TimelineService } from '../../../services/index';
import { UploadFileDirective } from '../../uploadFile.directive';

import * as _ from 'lodash';

@Component({
    //moduleId: module.id,
    selector: 'content',
    templateUrl: './editModalContent.component.html',
    styleUrls: ['./editModalContent.component.scss']
})

export class EditModalContentComponent implements OnInit, OnDestroy {
    public postDescription: string;
    public files: any = [];
    public postType: string;
    public uris: any = [];
    public selectedTopics: string[] = [];
    private post: any;
    private modalSaveSub: Subscription;
    private topics: string[] = ['Video', 'Image', 'Document', 'Toyota', 'Yamaha', 'Volkswagen'];

    constructor(
        private postService: PostService,
        private modalService: ModalService,
        private timelineService: TimelineService,
        private ref: ChangeDetectorRef
    ) { }

    ngOnInit() {
        this.post = this.timelineService.getSelectedPost();
        this.postDescription = this.post.activityData.description;
        this.postType = this.post.type;

        this.selectedTopics = this.post.activityData.topics;
        this.topics = _.filter(this.topics, (topic): boolean => {
            return this.selectedTopics.indexOf(topic) === -1;
        });

        this.modalSaveSub = this.modalService.getModalSave().subscribe(
            () => {
                this.savePost();
            }
        )
    }

    ngOnDestroy() {
        this.modalSaveSub.unsubscribe();
    }

    public clickAddMedia(file: any) {
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

    public clickUriRemove(index: number) {
        this.uris.splice(index, 1);
        this.files.splice(index, 1);
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

    private savePost() {
        this.modalService.setModalLoading();

        this.postService.updatePost(this.postDescription, this.files, this.selectedTopics, this.post).subscribe(
            () => {
                this.modalService.setModalClose();
            }
        );
    }
}