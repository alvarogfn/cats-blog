import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Comment } from '../models/comment.model';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private END_POINT = new URL('https://jsonplaceholder.typicode.com');

  constructor(private http: HttpClient) {}
  getPostsByPage(
    page: number = 1,
    limitPerPage: number = 10
  ): Observable<{ posts: Post[]; lastPage: number }> {
    if (page < 1) throw new Error('');
    const URLParams = new URL(this.END_POINT.href + 'posts');
    URLParams.searchParams.append('_page', page.toString());
    URLParams.searchParams.append('_limit', limitPerPage.toString());

    return this.http
      .get<Post[]>(URLParams.href, {
        observe: 'response',
      })
      .pipe(
        // The API only returns the last page in the 'link' headers of the request.
        // https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Headers/Link
        map((response) => {
          const body = response.body;
          if (body === null) throw new Error('500');

          const link = response.headers.get('link');
          if (link === null) return { posts: body, lastPage: page };

          const lastPage = this.getLastPageNumberFromHeaderLink(link);
          if (lastPage === null) return { posts: body, lastPage: page };

          return { posts: body, lastPage: parseInt(lastPage) };
        })
      );
  }

  getPostById(id: number | string): Observable<Post> {
    return this.http.get<Post>(`${this.END_POINT.href}posts/${id}`);
  }

  doPost(post: Post): Observable<Post> {
    return this.http.post<Post>(`${this.END_POINT.href}posts`, post);
  }

  doComment(comment: Comment) {
    return this.http.post(
      `${this.END_POINT.href}posts/${comment.postId}/comments`,
      comment
    );
  }

  updatePost(post: Post) {
    return this.http.put(`${this.END_POINT.href}posts/${post.id}`, post);
  }

  deletePost(id: number) {
    return this.http.delete(`${this.END_POINT.href}posts/${id}`);
  }

  getPostComments(postId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(
      `${this.END_POINT.href}posts/${postId}/comments`
    );
  }

  private getLastPageNumberFromHeaderLink(headerLink: string) {
    const arrHeaderLink = headerLink.split(',');

    const objHeaderLink = arrHeaderLink.map((link) => {
      const match = link.match(/<(.*)>; rel="(\w*)"/);
      const url = new URL(match?.[1] ?? '');
      const rel = match?.[2] ?? '';
      return { url, rel };
    });

    const lastHeaderLink = objHeaderLink.find((item) => item.rel === 'last');

    const lastPage = lastHeaderLink?.url.searchParams.get('_page');

    return lastPage ?? null;
  }
}
