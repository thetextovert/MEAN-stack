import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Post } from '../post.model';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { PostService } from '../post.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  // changes related to reactive form
  form: FormGroup;
  imagePreview: string;
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
  onAddPost() {
    if (this.form.invalid) {
      return;
    }

    if (this.mode === 'create') {
      const post: Post = {
        id: null,
        title: this.form.value.title,
        content: this.form.value.content,
        image: this.form.value.image,
      };
      console.log('+++++++++++++++++++');
      console.log(this.form.value.image.name);
      this.ps.addPost(post);
      // console.log(this.form.get('image').value);
      this.router.navigate(['/']); // this function of router will navigate to posts page once updation is complete
    } else {
      console.log(this.post); // post before editing
      this.post.title = this.form.value.title;
      this.post.content = this.form.value.content;
      console.log(this.post); // post after editing
      this.ps.updatePost(this.post);
      this.router.navigate(['/']); // this function of router will navigate to posts page once updation is complete
    }
    this.form.reset();

    // this.postCreated.emit(post);
  }
  onImagePicked(event: Event) {
    // we mention event target as html input element as typescript is not aware that it is an html element
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file }); // this will map the image file to image field of form
    this.form.get('image').updateValueAndValidity(); // this will update the value of image field after validating it as per validations
    // here we use fileReader feature of javascript
    const reader = new FileReader();
    reader.onload = () => {
      // console.log(reader.result);
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      content: new FormControl(null, {
        validators: [Validators.required],
      }),
      image: new FormControl(null, {
        validators: [Validators.required],
      }),
    });
    this.route.paramMap.subscribe((pm: ParamMap) => {
      if (pm.has('postID')) {
        this.mode = 'edit';
        this.post = this.ps.getEditablePost(pm.get('postID')); // pm.get('id') will fetch the post id in the route parameters
        this.buttonName = 'Update';
        this.form.setValue({
          title: this.post.title,
          content: this.post.content,
        });
      } else {
        this.mode = 'create';
      }
    });
  }
}
