import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Comment } from 'src/app/models/comment.model';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-post-comments',
  templateUrl: './post-comments.component.html',
  styleUrls: ['./post-comments.component.scss'],
  animations: [
    trigger('drop', [
      transition(
        ':enter',
        [
          style({ transform: 'translateY(-50px)', opacity: 0 }),
          animate('{{delay}}ms ease-in'),
        ],
        { params: { delay: 100 } }
      ),
    ]),
  ],
})
export class PostCommentsComponent implements OnInit {
  @Input() postId: number | undefined;
  comments: Comment[] = [];
  error: boolean = false;

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    if (this.postId === undefined) {
      this.error = true;
      return;
    }

    this.blogService.getPostComments(this.postId).subscribe({
      next: (comments) => (this.comments = comments),
      error: () => (this.error = true),
    });
  }
}
