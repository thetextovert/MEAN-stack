import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PostService {
  constructor(public http: HttpClient) {}
  private posts: Post[] = [];
  public updatedPosts = new Subject<Post[]>();

  getPosts(): Observable<{ message: string; posts: any }> {
    return this.http.get<{ message: string; posts: any }>(
      'http://localhost:1001/api/posts'
    );
  }
  // getUpdatedPosts() {
  //   return this.updatedPost.asObservable();
  // }
  getCentralisedPost() {
    console.log(this.posts);
    this.getPosts()
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
        console.log('from centralized array method :');
        console.log(this.posts);
        this.updatedPosts.next(this.posts);
      });
  }

  addPost(post: Post) {
    // const obj: Post = { title: post.title, content: post.content };
    this.http
      .post<{ message: string; id: string }>(
        'http://localhost:1001/api/addposts',
        post
      )
      .subscribe(
        (obj) => {
          alert(obj.message);
          console.log(obj.id);
          post.id = obj.id;

          this.posts.push(post);
          this.updatedPosts.next(this.posts);

        },
      );
  }

  deletePost(id: string) {
    this.http
      .delete<{ message: string }>('http://localhost:1001/api/addposts/' + id)
      .subscribe((obj) => {
        alert(obj.message);
        console.log(this.posts);
        console.log(id);
        // tslint:disable-next-line: no-unused-expression
        const updatedPostsArray = this.posts.filter((post) => post.id !== id);
        console.log(updatedPostsArray);
        this.posts = updatedPostsArray;
        this.updatedPosts.next(this.posts);
      });
  }
}
