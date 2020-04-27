import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Post } from '../post.model';
import { NgForm } from '@angular/forms';
import { PostService } from '../post.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  // enteredTitle = '';
  // enteredContent = '';

  // @Output() postCreated = new EventEmitter<Post>();
  public post: Post;
  private mode = 'create';
  private result: boolean;
  private postID: string;
  public buttonName = 'Save Post';
  constructor(
    public ps: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  // onAddPost(post: HTMLTextAreaElement) {
  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    // const post: Post = {
    //   id: null,
    //   title: form.value.title,
    //   content: form.value.content,
    // };
    if (this.mode === 'create') {
      const post: Post = {
        id: null,
        title: form.value.title,
        content: form.value.content,
      };
      this.ps.addPost(post);
    } else {
      console.log(this.post); // post before editing
      // changing the value of post as per editing
      this.post.title = form.value.title;
      this.post.content = form.value.content;
      console.log(this.post); // post after editing
      this.ps.updatePost(this.post);
      this.router.navigate(['/']); // this function of router will navigate to posts page once updation is complete
    }
    form.resetForm();

    // this.postCreated.emit(post);
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((pm: ParamMap) => {
      if (pm.has('postID')) {
        this.mode = 'edit';
        this.post = this.ps.getEditablePost(pm.get('postID')); // pm.get('id') will fetch the post id in the route parameters
        // console.log(this.post);
        this.buttonName = 'Update';
      } else {
        this.mode = 'create';
      }
    });
  }
}
