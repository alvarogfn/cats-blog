import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './blog.component';
import { NewPostComponent } from './views/new-post/new-post.component';
import { PostEditorComponent } from './views/post-editor/post-editor.component';
import { PostListComponent } from './views/post-list/post-list.component';
import { PostComponent } from './views/post/post.component';

const routes: Routes = [
  {
    path: '',
    component: BlogComponent,
  },
  {
    path: 'post/:id',
    component: PostComponent,
  },
  {
    path: 'new',
    component: NewPostComponent,
  },
  {
    path: 'editor/:id',
    component: PostEditorComponent,
  },
  {
    path: 'posts',
    redirectTo: 'posts/1',
  },
  {
    path: 'posts/:id',
    component: PostListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogRoutingModule {}
