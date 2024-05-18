import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subscription, throwError } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { BlogService } from 'src/app/services/blog.service';

import { PostComponent } from './post.component';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;

  let spyBlogService: jasmine.SpyObj<BlogService>;

  const mockData: Post = {
    userId: 1,
    id: 1,
    title: 'sunt aut facere repel',
    body: 'quia et suscipit',
  };

  beforeEach(async () => {
    spyBlogService = jasmine.createSpyObj('BlogService', ['getPostById']);

    await TestBed.configureTestingModule({
      declarations: [PostComponent],
      imports: [RouterTestingModule.withRoutes([]), NoopAnimationsModule],
      providers: [
        BlogService,
        { provide: BlogService, useValue: spyBlogService },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ get: (key: string) => 1 }),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;

    spyBlogService.getPostById.and.returnValue(of(mockData));
    fixture.detectChanges();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should defined', () => {
    expect(component).toBeDefined();
  });

  it('Should component call getPostById with id', () => {
    expect(spyBlogService.getPostById).toHaveBeenCalled();
    expect(spyBlogService.getPostById).toHaveBeenCalledOnceWith(1);
  });

  it('Should unsubscribe when the component is destroyed', () => {
    component.subscription = new Subscription();
    spyOn(component.subscription, 'unsubscribe');

    component.ngOnDestroy();

    expect(component.subscription?.unsubscribe).toHaveBeenCalledTimes(1);
  });

  it('Should error be true when getPostbyId throw an error', () => {
    spyBlogService.getPostById.and.callFake(() =>
      throwError(() => new Error(''))
    );
    component.ngOnInit();
    expect(component.error).toBeTrue();
  });

  it('Should post be populated when component init', () => {
    expect(component.post).toEqual(mockData);
  });
});
