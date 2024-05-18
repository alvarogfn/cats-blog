import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageMovement } from 'src/app/enums/page-movement';

import { PaginatorComponent } from './paginator.component';

describe('PaginatorComponent', () => {
  let component: PaginatorComponent;
  let fixture: ComponentFixture<PaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginatorComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit value with plus one when changePage is called with NEXT', () => {
    const changePage = spyOn(component.changePage, 'emit');
    component.page = 1;
    component.change(PageMovement.NEXT);
    expect(changePage).toHaveBeenCalledOnceWith(1 + 1);
  });

  it('should emit value with minor one when changePage is called with PREVIOUS', () => {
    const changePage = spyOn(component.changePage, 'emit');
    component.page = 1;
    component.change(PageMovement.PREVIOUS);
    expect(changePage).toHaveBeenCalledOnceWith(1 - 1);
  });
});
