import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
  animations: [
    trigger('push', [
      transition(
        ':enter',
        [
          style({ transform: 'translateX(-20px)', opacity: 0 }),
          animate('{{delay}}ms 200ms ease-in-out'),
        ],
        { params: { delay: 100 } }
      ),
    ]),
    trigger('drop', [
      transition(':enter', [
        style({ marginTop: '-10px', opacity: 0 }),
        animate('200ms ease-in', style({ marginTop: '10px', opacity: 1 })),
      ]),
      transition(':leave', [
        style({ marginTop: '10px', opacity: 1, zIndex: -1 }),
        animate(
          '200ms ease-out',
          style({ marginTop: '-10px', opacity: 0, zIndex: 1 })
        ),
      ]),
    ]),
  ],
})
export class PostCardComponent {
  @Input() post: Post | null = null;
  @Input() index: number | null = null;
  commentOpen: boolean = false;

  constructor() {}

  comment() {
    this.commentOpen = true;
  }

  close() {
    this.commentOpen = false;
  }
}
