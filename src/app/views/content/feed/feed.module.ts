import { NgModule } from '@angular/core';

import { SharedModule } from '../../../shared/shared.module';

import { FeedComponent } from './feed.component';
import { RegNumberPipe } from './addPost/regNumber.pipe';
import { HoverAddDirective } from './addPost/hoverAdd.directive';
import { AddPostComponent } from './addPost/addPost.component';
import { PostService } from '../../../services/';

@NgModule({
    imports: [SharedModule],
    declarations: [
        FeedComponent,
        RegNumberPipe,
        HoverAddDirective,
        AddPostComponent
    ]
})

export class FeedModule {}

