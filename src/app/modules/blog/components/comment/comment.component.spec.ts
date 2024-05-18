import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Comment } from 'src/app/models/comment.model';

import { CommentComponent } from './comment.component';

describe('CommentComponent', () => {
  let component: CommentComponent;
  let fixture: ComponentFixture<CommentComponent>;
  const mockComment: Comment = {
    postId: 1,
    id: 1,
    name: 'id labore ex et quam laborum',
    email: 'Eliseo@gardner.biz',
    body: 'laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommentComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentComponent);
    component = fixture.componentInstance;
    component.comment = null;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should render comment content when defined', () => {
    component.comment = mockComment;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.comment'))).not.toBeNull();
  });

  it('Should not render component when data is null', () => {
    component.comment = null;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.comment'))).toBeNull();
  });

  it('should render the elements on the view correctly', () => {
    component.comment = mockComment;

    fixture.detectChanges();

    const nameElement = fixture.debugElement.query(By.css('.comment__name'))
      .nativeElement as HTMLElement;

    const emailElement = fixture.debugElement.query(By.css('.comment__email'))
      .nativeElement as HTMLElement;

    const contentElement = fixture.debugElement.query(
      By.css('.comment__content')
    ).nativeElement as HTMLElement;

    expect(nameElement.textContent).toBe(mockComment.name);
    expect(emailElement.textContent).toBe(mockComment.email);
    expect(contentElement.textContent).toBe(mockComment.body);
  });
});
