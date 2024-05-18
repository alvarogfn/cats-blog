import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from './blog.component';
import { LayoutModule } from '../layout/layout.module';
import { PostEditorComponent } from './views/post-editor/post-editor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostListComponent } from './views/post-list/post-list.component';
import { PostListCardComponent } from './components/post-list-card/post-list-card.component';
import { PostCardComponent } from './components/post-card/post-card.component';
import { PostComponent } from './views/post/post.component';
import { SubstringPipe } from 'src/app/pipes/substring.pipe';
import { PostCommentsComponent } from './components/post-comments/post-comments.component';
import { DoCommentComponent } from './components/do-comment/do-comment.component';
import { CommentComponent } from './components/comment/comment.component';
import { NewPostCardComponent } from './components/new-post-card/new-post-card.component';
import { NewPostComponent } from './views/new-post/new-post.component';
import { PaginatorComponent } from './components/paginator/paginator.component';

@NgModule({
  declarations: [
    BlogComponent,
    PostEditorComponent,
    PostListComponent,
    PostListCardComponent,
    PostCardComponent,
    PostComponent,
    SubstringPipe,
    PostCommentsComponent,
    DoCommentComponent,
    CommentComponent,
    NewPostCardComponent,
    NewPostComponent,
    PaginatorComponent,
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    LayoutModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class BlogModule {}
