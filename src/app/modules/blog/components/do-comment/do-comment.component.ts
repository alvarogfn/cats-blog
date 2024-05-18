import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Comment } from 'src/app/models/comment.model';
import { Post } from 'src/app/models/post.model';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-do-comment',
  templateUrl: './do-comment.component.html',
  styleUrls: ['./do-comment.component.scss'],
})
export class DoCommentComponent implements OnInit, OnDestroy {
  @Input() set post(value: Post) {
    this.title = value.title;
    this.postId = value.id;
  }
  subscription: Subscription | undefined;

  @Output() toClose: EventEmitter<boolean> = new EventEmitter<boolean>();

  title: string = '';
  postId: number | undefined;
  isValid: boolean = false;
  error: boolean = false;
  loading: boolean = false;

  comment = new UntypedFormGroup({
    content: new UntypedFormControl(null, {
      validators: [Validators.required],
    }),
    name: new UntypedFormControl(null, {
      validators: [Validators.required],
    }),
    email: new UntypedFormControl(null, {
      validators: [Validators.required, Validators.email],
    }),
  });

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.subscription = this.comment.valueChanges.subscribe(
      () => (this.isValid = this.comment.valid)
    );
  }

  submit() {
    if (this.postId === undefined) {
      this.error = true;
      return;
    }

    this.loading = true;

    const { content, name, email }: { [key: string]: string } =
      this.comment.value;

    const comment: Comment = {
      postId: this.postId,
      body: content,
      name: name,
      email: email,
    };

    this.blogService.doComment(comment).subscribe({
      complete: () => this.close(),
      error: () => {
        this.error = true;
        this.loading = false;
      },
    });
  }

  close() {
    this.toClose.emit(true);
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
