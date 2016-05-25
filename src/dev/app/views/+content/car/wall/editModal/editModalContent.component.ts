import { Component, OnInit } from '@angular/core';
import { StatusService, ModalService } from '../../../../../services/index';

@Component({
    selector: 'content',
    templateUrl: 'src/dev/app/views/+content/car/wall/editModal/editModalContent.component.html',
    styleUrls: ['src/dist/app/views/+content/car/wall/editModal/editModalContent.component.css'],
})

export class EditModalContentComponent implements OnInit {
    status: any;

    constructor(private statusService: StatusService, private modalService: ModalService) { }

    ngOnInit() {
        this.status = this.statusService.selectedStatus.description;

        this.modalService.clickSave.subscribe(
            () => {
                this.savePost();
            }
        )
    }

    savePost() {
        this.modalService.setLoading();

        this.statusService.updateStatus(this.status).subscribe(
            () => {
                // update the Model
                this.statusService.selectedStatus.description = this.status;

                this.modalService.sendModalClose();
            }
        );
    }
}