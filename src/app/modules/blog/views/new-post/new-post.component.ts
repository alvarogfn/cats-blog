import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/post.model';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss'],
  animations: [
    trigger('pop', [
      transition(':enter', [
        style({ transform: 'scale(0.1)' }),
        animate('200ms ease-in-out'),
      ]),
    ]),
  ],
})
export class NewPostComponent implements OnInit {
  post = new UntypedFormGroup({
    title: new UntypedFormControl('', { validators: [Validators.required] }),
    content: new UntypedFormControl('', { validators: [Validators.required] }),
  });

  isValid: boolean = false;
  loading: boolean = false;
  error: boolean = false;

  constructor(private blogService: BlogService, private router: Router) {}

  ngOnInit(): void {
    this.post.valueChanges.subscribe((_) => (this.isValid = this.post.valid));
  }

  submit() {
    this.loading = true;

    const post: Post = {
      body: this.post.get('content')?.value,
      title: this.post.get('title')?.value,
      userId: 1,
    };

    this.blogService.doPost(post).subscribe({
      next: () => {
        this.router.navigate(['']);
      },
      error: (_) => {
        this.error = true;
        this.loading = false;
      },
    });
  }
}
