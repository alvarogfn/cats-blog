import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-post-editor',
  templateUrl: './post-editor.component.html',
  styleUrls: ['./post-editor.component.scss'],
  animations: [
    trigger('pop', [
      transition(':enter', [
        style({ transform: 'scale(0.1)' }),
        animate('200ms ease-in-out'),
      ]),
    ]),
  ],
})
export class PostEditorComponent implements OnInit, OnDestroy {
  post = new UntypedFormGroup({
    title: new UntypedFormControl(null, {}),
    content: new UntypedFormControl(null, {}),
  });

  id: number | null = null;
  userId: number | null = null;
  subscription: Subscription | undefined;

  error: boolean = false;
  success: boolean = false;
  loading: boolean = true;

  constructor(
    private blogService: BlogService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loading = true;
    const id = this.activatedRoute.snapshot.params['id'] ?? '';

    this.subscription = this.blogService.getPostById(id).subscribe({
      next: (post) => {
        this.post.get('title')?.setValue(post.title);
        this.post.get('content')?.setValue(post.body);
        this.userId = post.userId;
        this.id = post.id ?? null;
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      },
    });
  }

  submit() {
    if (this.id === null || this.userId === null) {
      this.error = true;
      return;
    }

    const { content, title }: { [key: string]: string } = this.post.value;

    const post: Post = {
      id: this.id,
      body: content,
      title: title,
      userId: this.userId,
    };

    this.loading = true;

    this.blogService.updatePost(post).subscribe({
      next: () => {
        this.success = true;
        this.router.navigate(['post', post.id]);
      },
      error: (_) => {
        this.error = true;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
