import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostService {
  constructor(public http: HttpClient) {}
  private posts: Post[] = [];
  public updatedPost = new Subject<Post>();


  getPosts(): Observable<{ message: string; posts: Post[] }> {
    // return this.posts;
    return this.http.get<{ message: string; posts: Post[] }>(
      'http://localhost:1001/api/posts'
    );
  }
  // getUpdatedPosts() {
  //   return this.updatedPost.asObservable();
  // }

  addPost(post: Post) {
    // const obj: Post = { title: post.title, content: post.content };
    this.http
      .post<{ message: string }>('http://localhost:1001/api/addposts', post)
      .subscribe(
        (msg) => {
          // i have to call get post message is successfull
          console.log(msg);
        },
        (err) => console.error('Observer got an error: ' + err),
        () => {
          console.log('Observer got a complete notification');
          this.posts.push(post);

          this.updatedPost.next(post);
        }
      );
  }
}
