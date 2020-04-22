import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit, OnDestroy {
  // @Input() posts = [
  //   { title: 'firstPost', content: ' this is your first post' },
  //   { title: 'secondPost', content: ' this is your second post' },
  //   { title: 'thirdPost', content: ' this is your third post' },
  // ];
  posts: Post[] = [];
  private subs: Subscription;

  constructor(public ps: PostService) {}

  ngOnInit(): void {
    this.ps.getPosts().subscribe((data) => {
      this.posts = data.posts;
    });
    this.subs = this.ps.updatedPost.subscribe((data) => {
      this.posts = this.posts.concat(data);

      console.log(this.posts);
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
