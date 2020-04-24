import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import { Subscription, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
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
  onDeletePost(id: string) {
    this.ps.deletePost(id);
  }
  ngOnInit(): void {
    this.ps.getCentralisedPost();
    this.ps
      .getPosts()
      .pipe(
        map((data) => {
          return data.posts.map((post) => {
            return {
              id: post._id,
              title: post.title,
              content: post.content,
            };
          });
        })
      )
      .subscribe((transformedData) => {
        // transformedData is the result of pipe,map operation
      this.posts = transformedData;
    });
    this.subs = this.ps.updatedPost.subscribe((data) => {
      this.posts = this.posts.concat(data);

      // console.log(this.posts);
    });
    this.ps.updatedPosts.subscribe((postsArray) => {
      this.posts = postsArray;
      console.log(this.posts);
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
