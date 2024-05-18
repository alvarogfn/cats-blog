import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subscription, throwError } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { BlogService } from 'src/app/services/blog.service';

import { PostEditorComponent } from './post-editor.component';

describe('PostEditorComponent', () => {
  let component: PostEditorComponent;
  let fixture: ComponentFixture<PostEditorComponent>;
  let spyBlogService: jasmine.SpyObj<BlogService>;
  let spyRouter: jasmine.SpyObj<Router>;
  let spyActivatedRoute;

  const mockData: Post = {
    userId: 1,
    id: 1,
    title: 'sunt aut facere repel',
    body: 'quia et suscipit',
  };

  beforeEach(async () => {
    spyBlogService = jasmine.createSpyObj('BlogService', [
      'getPostById',
      'updatePost',
    ]);
    spyRouter = jasmine.createSpyObj('router', ['navigate']);

    spyActivatedRoute = {
      paramMap: of({ get: (key: string) => 1 }),
      snapshot: {
        params: {
          id: 1,
        },
      },
    };

    await TestBed.configureTestingModule({
      declarations: [PostEditorComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [RouterTestingModule.withRoutes([]), NoopAnimationsModule],
      providers: [
        BlogService,
        { provide: BlogService, useValue: spyBlogService },
        { provide: Router, useValue: spyRouter },
        {
          provide: ActivatedRoute,
          useValue: spyActivatedRoute,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostEditorComponent);
    component = fixture.componentInstance;
    spyBlogService.getPostById.and.returnValue(of(mockData));
    spyBlogService.updatePost.and.returnValue(of(mockData));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should define', () => {
    expect(component).toBeDefined();
  });

  it('Should redirect when submit have been called', () => {
    component.submit();
    expect(spyRouter.navigate).toHaveBeenCalledOnceWith(['post', mockData.id]);
  });

  it('Should component call getPostById with id', () => {
    expect(spyBlogService.getPostById).toHaveBeenCalled();
    expect(spyBlogService.getPostById).toHaveBeenCalledOnceWith(1);
  });

  it("Should error be true when userId and Id isn't defined", () => {
    component.userId = null;
    component.id = null;

    component.submit();

    expect(component.error).toBeTrue();
    expect(spyBlogService.updatePost).not.toHaveBeenCalled();
  });

  it('Should unsubscribe when the component is destroyed', () => {
    component.subscription = new Subscription();
    spyOn(component.subscription, 'unsubscribe');

    component.ngOnDestroy();

    expect(component.subscription?.unsubscribe).toHaveBeenCalledTimes(1);
  });

  it('Should error to be true when updatePost Throw an error', () => {
    spyBlogService.updatePost.and.callFake(() =>
      throwError(() => new Error(''))
    );
    component.submit();
    expect(component.error).toBeTrue();
  });

  it('should component use UpdatePost Service method', () => {
    component.post = new UntypedFormGroup({
      title: new UntypedFormControl(mockData.title),
      content: new UntypedFormControl(mockData.body),
    });

    component.submit();

    expect(spyBlogService.updatePost).toHaveBeenCalledOnceWith(mockData);
  });

  it('Should render form if loading is false and render otherwise', () => {
    expect(fixture.debugElement.query(By.css('.editor__form'))).not.toBeNull();
    component.loading = true;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.editor__form'))).toBeNull();
  });
});
