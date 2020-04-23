import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Post } from '../post.model';
import { NgForm } from '@angular/forms';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  // enteredTitle = '';
  // enteredContent = '';

  // @Output() postCreated = new EventEmitter<Post>();
  constructor(public ps: PostService) {}
  // onAddPost(post: HTMLTextAreaElement) {
  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const post: Post = {
      id: null,
      title: form.value.title,
      content: form.value.content,
    };
    this.ps.addPost(post);
    form.resetForm();
    // this.postCreated.emit(post);
  }
  ngOnInit(): void {}
}
