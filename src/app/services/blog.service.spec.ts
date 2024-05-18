import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { BlogService } from './blog.service';
import { Post } from '../models/post.model';
import { Comment } from '../models/comment.model';

describe('BlogService', () => {
  let service: BlogService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  const END_POINT = new URL('https://jsonplaceholder.typicode.com');

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BlogService],
    });
    service = TestBed.inject(BlogService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it("Should test the httpclient call in the 'getPostsByPage' method", () => {
    const testData: Post[] = [
      {
        userId: 1,
        id: 1,
        title:
          'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
        body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
      },
      {
        userId: 1,
        id: 2,
        title: 'qui est esse',
        body: 'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla',
      },
      {
        userId: 1,
        id: 3,
        title: 'ea molestias quasi exercitationem repellat qui ipsa sit aut',
        body: 'et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut',
      },
      {
        userId: 1,
        id: 4,
        title: 'eum et est occaecati',
        body: 'ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit',
      },
      {
        userId: 1,
        id: 5,
        title: 'nesciunt quas odio',
        body: 'repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque',
      },
      {
        userId: 1,
        id: 6,
        title: 'dolorem eum magni eos aperiam quia',
        body: 'ut aspernatur corporis harum nihil quis provident sequi\nmollitia nobis aliquid molestiae\nperspiciatis et ea nemo ab reprehenderit accusantium quas\nvoluptate dolores velit et doloremque molestiae',
      },
      {
        userId: 1,
        id: 7,
        title: 'magnam facilis autem',
        body: 'dolore placeat quibusdam ea quo vitae\nmagni quis enim qui quis quo nemo aut saepe\nquidem repellat excepturi ut quia\nsunt ut sequi eos ea sed quas',
      },
      {
        userId: 1,
        id: 8,
        title: 'dolorem dolore est ipsam',
        body: 'dignissimos aperiam dolorem qui eum\nfacilis quibusdam animi sint suscipit qui sint possimus cum\nquaerat magni maiores excepturi\nipsam ut commodi dolor voluptatum modi aut vitae',
      },
      {
        userId: 1,
        id: 9,
        title: 'nesciunt iure omnis dolorem tempora et accusantium',
        body: 'consectetur animi nesciunt iure dolore\nenim quia ad\nveniam autem ut quam aut nobis\net est aut quod aut provident voluptas autem voluptas',
      },
      {
        userId: 1,
        id: 10,
        title: 'optio molestias id quia eum',
        body: 'quo et expedita modi cum',
      },
    ];

    const URLParams = new URL(END_POINT.href + 'posts');
    URLParams.searchParams.append('_page', '1');
    URLParams.searchParams.append('_limit', '10');

    service.getPostsByPage(1, 10).subscribe((value) => {
      expect(value.posts.length).toBe(10);
      expect(value.posts).toBe(testData);
      expect(value.lastPage).not.toBeNaN();
    });

    const req = httpTestingController.expectOne(URLParams.href);
    expect(req.request.responseType).toEqual('json');
    expect(req.request.method).toEqual('GET');

    req.flush(testData);
  });

  it("Should test the httpclient call in the 'getPostsByPage' method with default parameters", () => {
    const testData: Post[] = [
      {
        userId: 1,
        id: 1,
        title:
          'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
        body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
      },
      {
        userId: 1,
        id: 2,
        title: 'qui est esse',
        body: 'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla',
      },
      {
        userId: 1,
        id: 3,
        title: 'ea molestias quasi exercitationem repellat qui ipsa sit aut',
        body: 'et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut',
      },
      {
        userId: 1,
        id: 4,
        title: 'eum et est occaecati',
        body: 'ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit',
      },
      {
        userId: 1,
        id: 5,
        title: 'nesciunt quas odio',
        body: 'repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque',
      },
      {
        userId: 1,
        id: 6,
        title: 'dolorem eum magni eos aperiam quia',
        body: 'ut aspernatur corporis harum nihil quis provident sequi\nmollitia nobis aliquid molestiae\nperspiciatis et ea nemo ab reprehenderit accusantium quas\nvoluptate dolores velit et doloremque molestiae',
      },
      {
        userId: 1,
        id: 7,
        title: 'magnam facilis autem',
        body: 'dolore placeat quibusdam ea quo vitae\nmagni quis enim qui quis quo nemo aut saepe\nquidem repellat excepturi ut quia\nsunt ut sequi eos ea sed quas',
      },
      {
        userId: 1,
        id: 8,
        title: 'dolorem dolore est ipsam',
        body: 'dignissimos aperiam dolorem qui eum\nfacilis quibusdam animi sint suscipit qui sint possimus cum\nquaerat magni maiores excepturi\nipsam ut commodi dolor voluptatum modi aut vitae',
      },
      {
        userId: 1,
        id: 9,
        title: 'nesciunt iure omnis dolorem tempora et accusantium',
        body: 'consectetur animi nesciunt iure dolore\nenim quia ad\nveniam autem ut quam aut nobis\net est aut quod aut provident voluptas autem voluptas',
      },
      {
        userId: 1,
        id: 10,
        title: 'optio molestias id quia eum',
        body: 'quo et expedita modi cum',
      },
    ];

    const URLParams = new URL(END_POINT.href + 'posts');
    URLParams.searchParams.append('_page', '1');
    URLParams.searchParams.append('_limit', '10');

    service.getPostsByPage().subscribe((value) => {
      expect(value.posts.length).toBe(10);
      expect(value.posts).toBe(testData);
      expect(value.lastPage).not.toBeNaN();
    });

    const req = httpTestingController.expectOne(URLParams.href);
    expect(req.request.responseType).toEqual('json');
    expect(req.request.method).toEqual('GET');

    req.flush(testData);
  });

  it("Should test the httpclient call in the 'GetPostsById' method", () => {
    const testData: Post = {
      userId: 1,
      id: 10,
      title: 'optio molestias id quia eum',
      body: 'quo et expedita modi cum',
    };

    service.getPostById(1).subscribe((value) => {
      expect(value).toBe(testData);
    });

    const req = httpTestingController.expectOne(END_POINT.href + 'posts/' + 1);
    expect(req.request.responseType).toEqual('json');
    expect(req.request.method).toEqual('GET');

    req.flush(testData);
  });

  it("Should test the httpclient call in the 'DoPost' method", () => {
    const testData: Post = {
      userId: 1,
      title: 'optio molestias id quia eum',
      body: 'quo et expedita modi cum',
    };

    service.doPost(testData).subscribe((value) => {
      expect(value).toBe(testData);
    });

    const req = httpTestingController.expectOne(END_POINT.href + 'posts');
    expect(req.request.responseType).toEqual('json');
    expect(req.request.method).toEqual('POST');

    req.flush(testData);
  });

  it("Should test the httpclient call in the 'DoComment' method", () => {
    const testData: Comment = {
      postId: 1,
      name: 'id labore ex et quam laborum',
      email: 'Eliseo@gardner.biz',
      body: 'laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium',
    };

    service.doComment(testData).subscribe((value) => {
      expect(value).toBe(testData);
    });

    const req = httpTestingController.expectOne(
      END_POINT.href + 'posts/' + testData.postId + '/comments'
    );

    expect(req.request.responseType).toEqual('json');
    expect(req.request.method).toEqual('POST');

    req.flush(testData);
  });

  it("Should test the httpclient call in the 'updatePost' method", () => {
    const testData: Post = {
      userId: 1,
      id: 1,
      title: 'optio molestias id quia eum',
      body: 'quo et expedita modi cum',
    };

    service.updatePost(testData).subscribe((value) => {
      expect(value).toBe(testData);
    });

    const req = httpTestingController.expectOne(
      END_POINT.href + 'posts/' + testData.id
    );

    expect(req.request.responseType).toEqual('json');
    expect(req.request.method).toEqual('PUT');

    req.flush(testData);
  });

  it("Should test the httpclient call in the 'deletePost' method", () => {
    service.deletePost(1).subscribe((value) => {
      expect(value).toBeTruthy();
    });

    const req = httpTestingController.expectOne(END_POINT.href + 'posts/' + 1);
    expect(req.request.method).toEqual('DELETE');
  });

  it("Should test the httpclient call in the 'getPostComments' method", () => {
    service.getPostComments(1).subscribe((value) => {
      expect(value).toBeTruthy();
    });

    const req = httpTestingController.expectOne(
      END_POINT.href + 'posts/' + 1 + '/comments'
    );

    expect(req.request.method).toEqual('GET');
  });
});
