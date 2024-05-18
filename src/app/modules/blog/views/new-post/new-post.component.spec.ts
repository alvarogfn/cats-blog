import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { BlogService } from 'src/app/services/blog.service';

import { NewPostComponent } from './new-post.component';

describe('NewPostComponent', () => {
  let component: NewPostComponent;
  let fixture: ComponentFixture<NewPostComponent>;
  let spyBlogService: jasmine.SpyObj<BlogService>;
  let spyRouter: jasmine.SpyObj<Router>;

  const mockData: Post = {
    userId: 1,
    title: 'sunt aut facere repellat provident',
    body: 'quia et suscipit\nsuscipit recusandae',
  };

  beforeEach(async () => {
    spyBlogService = jasmine.createSpyObj('BlogService', ['doPost']);
    spyRouter = jasmine.createSpyObj('router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [NewPostComponent],
      imports: [RouterTestingModule.withRoutes([]), NoopAnimationsModule],
      providers: [
        BlogService,
        { provide: BlogService, useValue: spyBlogService },
        { provide: Router, useValue: spyRouter },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPostComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  beforeEach(() => {
    spyBlogService.doPost.and.returnValue(of(mockData));

    component.post = new UntypedFormGroup({
      content: new UntypedFormControl(mockData.body),
      title: new UntypedFormControl(mockData.title),
      userId: new UntypedFormControl(1),
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should component use DoPost Service method', () => {
    component.submit();
    expect(spyBlogService.doPost).toHaveBeenCalledWith(mockData);
  });

  it('Should redirect when submit have been called', () => {
    component.submit();
    expect(spyRouter.navigate).toHaveBeenCalledWith(['']);
  });

  it('Should error to be true when DoPost Throw an error', () => {
    spyBlogService.doPost.and.callFake(() => throwError(() => new Error('')));
    component.submit();
    expect(component.error).toBeTrue();
  });
});
