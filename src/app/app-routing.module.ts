import { PostCreateComponent } from './posts/post-create/post-create.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: PostListComponent },
  { path: 'create', component: PostCreateComponent },
  { path: 'edit/:postID', component: PostCreateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // informing appmodule and angular router about our routes
  exports: [RouterModule],
})
export class AppRoutingModule {}
