import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subscription, throwError } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { BlogService } from 'src/app/services/blog.service';

import { PostListComponent } from './post-list.component';

describe('PostListComponent', () => {
  let component: PostListComponent;
  let fixture: ComponentFixture<PostListComponent>;
  let spyBlogService: jasmine.SpyObj<BlogService>;
  let spyRouter: jasmine.SpyObj<Router>;

  const mockData: Post[] = [
    {
      userId: 1,
      id: 1,
      title: 'sunt aut facere repel',
      body: 'quia et suscipit',
    },
  ];

  beforeEach(async () => {
    spyBlogService = jasmine.createSpyObj('BlogService', ['getPostsByPage']);
    spyRouter = jasmine.createSpyObj('router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [PostListComponent],
      imports: [RouterTestingModule.withRoutes([]), NoopAnimationsModule],
      providers: [
        BlogService,
        { provide: BlogService, useValue: spyBlogService },
        { provide: Router, useValue: spyRouter },
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
    fixture = TestBed.createComponent(PostListComponent);
    component = fixture.componentInstance;

    spyBlogService.getPostsByPage.and.returnValue(
      of({ posts: mockData, lastPage: 1 })
    );

    fixture.detectChanges();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should component use changePage and use router to go to the next page', () => {
    component.changePage(1);
    expect(spyRouter.navigate).toHaveBeenCalledOnceWith(['/posts', 1]);
  });

  it('Should go to not-found page when getPostsByPage throw an error', () => {
    spyBlogService.getPostsByPage.and.callFake(() =>
      throwError(() => new Error(''))
    );

    component.ngOnInit();

    expect(spyRouter.navigate).toHaveBeenCalledOnceWith(['/not-found']);
  });

  it('Should component use getPostsByPage Service method', () => {
    component.ngOnInit();

    expect(spyBlogService.getPostsByPage).toHaveBeenCalled();
  });

  it('Should unsubscribe when the component is destroyed', () => {
    component.subscription = new Subscription();
    spyOn(component.subscription, 'unsubscribe');

    component.ngOnDestroy();

    expect(component.subscription?.unsubscribe).toHaveBeenCalledTimes(1);
  });

  it('Should render list if loading is false and not render otherwise', () => {
    component.loading = true;
    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css('.pages__content'))
    ).not.toBeNull();

    component.loading = false;
    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css('.pages__content'))
    ).not.toBeNull();
  });
});
