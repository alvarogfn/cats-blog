import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';
import { Comment } from 'src/app/models/comment.model';
import { ErrorComponent } from 'src/app/modules/layout/components/error/error.component';
import { BlogService } from 'src/app/services/blog.service';

import { PostCommentsComponent } from './post-comments.component';

describe('PostCommentsComponent', () => {
  let component: PostCommentsComponent;
  let fixture: ComponentFixture<PostCommentsComponent>;
  let spyBlogService: jasmine.SpyObj<BlogService>;
  let mockComment: Comment[] = [
    {
      postId: 1,
      id: 1,
      name: 'id labore ex et quam laborum',
      email: 'Eliseo@gardner.biz',
      body: 'laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium',
    },
  ];

  beforeEach(async () => {
    spyBlogService = jasmine.createSpyObj('BlogService', ['getPostComments']);
    await TestBed.configureTestingModule({
      declarations: [PostCommentsComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [NoopAnimationsModule],
      providers: [
        BlogService,
        { provide: BlogService, useValue: spyBlogService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostCommentsComponent);
    component = fixture.componentInstance;
    spyBlogService.getPostComments.and.callFake(() => of(mockComment));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should error be true when postId isn't defined ", () => {
    component.postId = undefined;

    component.ngOnInit();

    expect(component.error).toBeTrue();
    expect(spyBlogService.getPostComments).not.toHaveBeenCalled();
  });

  it('should error be true when getPosts throw an error ', () => {
    component.postId = 1;

    spyBlogService.getPostComments.and.callFake(() =>
      throwError(() => {
        throw new Error();
      })
    );

    component.ngOnInit();

    expect(component.error).toBeTrue();
    expect(spyBlogService.getPostComments).toHaveBeenCalled();
  });

  it('should call getPostsById on init', () => {
    component.postId = 1;

    component.ngOnInit();

    expect(spyBlogService.getPostComments).toHaveBeenCalledOnceWith(
      component.postId
    );

    expect(component.comments).toEqual(mockComment);
  });
});
