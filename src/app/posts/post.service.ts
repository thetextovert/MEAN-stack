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
    // console.log(this.posts);
    this.getPosts()
      .pipe(
        map((data) => {
          return data.posts.map((post) => {
            return {
              id: post._id,
              title: post.title,
              content: post.content,
              image: post.imagePath,
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
    const postData = new FormData();
    postData.append('title', post.title);
    postData.append('content', post.content);
    postData.append('image', post.image, post.title);

    this.http
      .post<{ message: string; backendPost: Post }>(
        'http://localhost:1001/api/posts',
        postData
      )
      .subscribe((obj) => {
        alert(obj.message);
        // console.log(obj.id);
        post.id = obj.backendPost.id;
        post.image = obj.backendPost.image;
        this.posts.push(post);
        this.updatedPosts.next(this.posts);
      });
  }
  updatePost(post: Post) {
    const postData = new FormData();
    postData.append('title', post.title);
    postData.append('content', post.content);
    postData.append('image', post.image, post.title);

    this.http
      .put<{ message: string; imageUrl: string }>(
        'http://localhost:1001/api/posts/' + post.id,
        postData
      )
      .subscribe((obj) => {
        alert(obj.message);
        this.posts.forEach((eachPost) => {
          if (eachPost.id === post.id) {
            eachPost.image = obj.imageUrl;
          }
        });
        // console.log(updatedPostsArray);
        // this.posts = updatedPostsArray;
        this.updatedPosts.next(this.posts);
      });
  }

  deletePost(id: string) {
    this.http
      .delete<{ message: string }>('http://localhost:1001/api/posts/' + id)
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
  getEditablePost(id: string) {
    return this.posts.find((p) => p.id === id);
  }
}
