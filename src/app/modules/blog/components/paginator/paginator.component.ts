import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageMovement } from 'src/app/enums/page-movement';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent {
  @Input() page: number = 1;
  @Input() lastPage: number = 1;

  @Output() changePage: EventEmitter<number> = new EventEmitter<number>();
  @Input() disabled: boolean = false;

  PageMovement = PageMovement;

  constructor() {}

  change(value: PageMovement) {
    if (value === PageMovement.NEXT) this.changePage.emit(this.page + 1);
    if (value === PageMovement.PREVIOUS) this.changePage.emit(this.page - 1);
  }
}
