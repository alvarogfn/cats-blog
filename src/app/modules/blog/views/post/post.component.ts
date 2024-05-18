import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Subscription, switchMap, throwError } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit, OnDestroy {
  post: Post | undefined;
  error: boolean = false;
  subscription: Subscription | undefined;

  constructor(
    private blogService: BlogService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscription = this.activatedRoute.paramMap
      .pipe(
        map((paramMap) => paramMap.get('id')),
        switchMap((id) => {
          if (!id) throwError(() => new Error(''));
          return this.blogService.getPostById(id!);
        })
      )
      .subscribe({
        next: (value) => (this.post = value),
        error: (_) => (this.error = true),
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
