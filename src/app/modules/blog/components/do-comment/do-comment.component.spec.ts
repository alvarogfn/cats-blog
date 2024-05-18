import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of, Subscription, throwError } from 'rxjs';
import { Comment } from 'src/app/models/comment.model';
import { Post } from 'src/app/models/post.model';
import { BlogService } from 'src/app/services/blog.service';

import { DoCommentComponent } from './do-comment.component';

describe('DoCommentComponent', () => {
  let component: DoCommentComponent;
  let fixture: ComponentFixture<DoCommentComponent>;
  let spyBlogService: jasmine.SpyObj<BlogService>;

  const mockDataComment: Comment = {
    postId: 1,
    id: 1,
    name: 'Something',
    email: 'abla@abla.com',
    body: 'Excepteur proident excepteur in sunt proident',
  };

  const mockDataPost: Post = {
    id: 1,
    body: 'Excepteur proident excepteur in sunt proident',
    title: 'Minim non ut qui',
    userId: 1,
  };

  beforeEach(async () => {
    spyBlogService = jasmine.createSpyObj('BlogService', ['doComment']);

    await TestBed.configureTestingModule({
      declarations: [DoCommentComponent],
      imports: [NoopAnimationsModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        BlogService,
        { provide: BlogService, useValue: spyBlogService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoCommentComponent);
    component = fixture.componentInstance;

    spyBlogService.doComment.and.callFake(() => of());

    component.postId = undefined;
    component.title = '';

    component.comment = new UntypedFormGroup({
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

    component.subscription = undefined;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test that close emit true', () => {
    const spyToClose = spyOn(component.toClose, 'emit');
    component.close();
    expect(spyToClose).toHaveBeenCalledOnceWith(true);
  });

  it('should ensure that DoComment will call Service method', () => {
    component.postId = 1;

    spyOn(component, 'close');

    component.submit();

    expect(spyBlogService.doComment).toHaveBeenCalled();
    expect(component.close).toHaveBeenCalled();
  });

  it('Should render form if loading is false and render otherwise', () => {
    component.loading = false;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('form'))).not.toBeNull();

    component.loading = true;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('form'))).toBeNull();
  });

  it('Should error to be true when DoComment Throw an error', () => {
    spyBlogService.doComment.and.callFake(() =>
      throwError(() => new Error(''))
    );

    component.postId = 1;

    component.submit();

    expect(spyBlogService.doComment).toHaveBeenCalled();
    expect(component.error).toBeTrue();
    expect(component.loading).toBeFalse();
  });

  it("Should error to be true when postId isn't defined and service not be called", () => {
    component.postId = undefined;
    component.submit();

    expect(component.error).toBeTrue();
    expect(spyBlogService.doComment).not.toHaveBeenCalled();
  });

  it('should subscribe to check if the form is valid for each change', () => {
    component.ngOnInit();
    component.comment.clearValidators();
    component.comment.updateValueAndValidity();

    expect(component.subscription).toBeDefined();
    expect(component.isValid).toEqual(component.comment.valid);
  });

  it('should test if @input set the properties corretly', () => {
    component.post = mockDataPost;
    expect(component.title).toEqual(mockDataPost.title);
    expect(component.postId).toEqual(mockDataPost.id);
  });

  it('should test if subscription are unsubscribed after onDestroy', () => {
    component.subscription = new Subscription();

    spyOn(component.subscription, 'unsubscribe');

    component.ngOnDestroy();

    expect(component.subscription.unsubscribe).toHaveBeenCalled();
  });
});
