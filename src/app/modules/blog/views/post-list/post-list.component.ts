import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Subscription, switchMap } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
  animations: [
    trigger('out', [
      transition(':leave', [
        style({ opacity: 0 }),
        animate('200ms', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  actualPage: number = 1;
  lastPage: number = 1;
  limit: number = 10;
  subscription: Subscription | undefined;
  constructor(
    private blogService: BlogService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  loading: boolean = true;

  ngOnInit(): void {
    this.subscription = this.activatedRoute.paramMap
      .pipe(
        map((params) => parseInt(params.get('id') ?? '1')),
        switchMap((id) => {
          this.loading = true;
          this.actualPage = id;
          return this.blogService.getPostsByPage(this.actualPage, this.limit);
        })
      )
      .subscribe({
        next: (content) => {
          this.posts = content.posts;
          this.lastPage = content.lastPage;
          this.loading = false;
        },
        error: () => {
          this.posts = [];
          this.router.navigate(['/not-found']);
        },
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  changePage(value: number) {
    this.router.navigate(['/posts', value]);
  }
}
