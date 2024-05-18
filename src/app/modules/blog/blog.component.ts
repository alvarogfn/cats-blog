import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  animations: [
    trigger('push', [
      transition(':enter', [
        style({ transform: 'translateY(-30px)', opacity: 0 }),
        animate(
          '200ms ease-in-out',
          style({ transform: 'translateY(0px)', opacity: 1 })
        ),
      ]),
    ]),
  ],
})
export class BlogComponent {}
