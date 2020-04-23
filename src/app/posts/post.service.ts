import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostService {
  constructor(public http: HttpClient) {}
  private posts: Post[] = [];
  public updatedPost = new Subject<Post>();

  getPosts(): Observable<{ message: string; posts: any }> {
    // return this.posts;
    return this.http.get<{ message: string; posts: any }>(
      'http://localhost:1001/api/posts'
    );
  }
  // getUpdatedPosts() {
  //   return this.updatedPost.asObservable();
  // }

  addPost(post: Post) {
    // const obj: Post = { title: post.title, content: post.content };
    this.http
      .post<{ message: string; id: string }>(
        'http://localhost:1001/api/addposts',
        post
      )
      .subscribe(
        (obj) => {
          console.log(obj.message);
          const id = obj.id;
          post.id = id;
          console.log(post);
          this.posts.push(post);
          this.updatedPost.next(post);
        },
        (err) => console.error('Observer got an error: ' + err),
        () => {
          console.log('Observer got a complete notification');
        }
      );
  }
}
